
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const databasePath = path.join(__dirname, '..', 'data', 'db', 'simpe.db');
const schemaPath = path.join(__dirname, '..', 'schema', 'simpe_schema.sql');
const database = new sqlite3.Database(databasePath);

database.run('PRAGMA foreign_keys = ON');

const databaseReady = new Promise((resolve, reject) => {
    database.get(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'Perfil'",
        (error, table) => {
            if (error) {
                reject(error);
                return;
            }

            if (table) {
                database.run(
                    `INSERT OR IGNORE INTO Configuracao_Risco (parametro, valor, descricao)
                     VALUES ('frequencia_minima', 75.0, 'Percentual mínimo de frequência para risco')`,
                    migrationError => migrationError ? reject(migrationError) : resolve()
                );
                return;
            }

            const schema = fs.readFileSync(schemaPath, 'utf8');
            database.exec(schema, execError => {
                if (execError) {
                    reject(execError);
                    return;
                }

                resolve();
            });
        }
    );
});

async function getRiskConfig() {
    const rows = await queryAll('SELECT parametro, valor FROM Configuracao_Risco');
    const config = Object.fromEntries(rows.map(row => [row.parametro, Number(row.valor)]));
    return {
        consecutiveAbsences: config.limite_faltas_consecutivas || 5,
        minimumGrade: config.nota_minima || 6,
        minimumAttendance: config.frequencia_minima || 75
    };
}

async function getAlunoRisk(alunoId, config) {
    const frequencias = await queryAll(
        `SELECT data, presente, falta_justificada
         FROM Frequencia WHERE id_aluno = ? ORDER BY data DESC`,
        [alunoId]
    );
    const notas = await queryAll('SELECT valor FROM Nota WHERE aluno_id = ?', [alunoId]);
    const faltas = frequencias.filter(registro => !registro.presente).length;
    const media = notas.length ? notas.reduce((total, nota) => total + Number(nota.valor), 0) / notas.length : null;
    const frequenciaPercentual = frequencias.length
        ? (frequencias.filter(registro => registro.presente).length / frequencias.length) * 100
        : 100;
    let faltasConsecutivas = 0;

    for (let index = 0; index < frequencias.length; index += 1) {
        const registro = frequencias[index];
        if (registro.presente || registro.falta_justificada) break;
        if (index > 0) {
            const anterior = new Date(frequencias[index - 1].data);
            const atual = new Date(registro.data);
            const dias = (anterior - atual) / 86400000;
            if (dias !== 1) break;
        }
        faltasConsecutivas += 1;
    }

    const riscoCritico =
        faltasConsecutivas >= config.consecutiveAbsences ||
        frequenciaPercentual < config.minimumAttendance ||
        (media !== null && media < config.minimumGrade);
    const emAtencao =
        faltasConsecutivas >= Math.max(1, config.consecutiveAbsences - 2) ||
        frequenciaPercentual < 90 ||
        (media !== null && media < config.minimumGrade + 1);

    return { faltas, media, frequenciaPercentual, faltasConsecutivas, riscoCritico, emAtencao };
}

async function getAlunos(filters) {
    const rows = await queryAll(`
        SELECT a.id_aluno AS id, a.id_aluno, a.nome, a.matricula,
               a.turma_id, t.nome AS turma
        FROM Aluno a
        INNER JOIN Turma t ON t.id = a.turma_id
        ORDER BY a.id_aluno
    `);
    const config = await getRiskConfig();
    let result = [];

    for (const aluno of rows) {
        const risk = await getAlunoRisk(aluno.id_aluno, config);
        result.push({
            ...aluno,
            faltas: risk.faltas,
            media: risk.media === null ? 0 : Number(risk.media.toFixed(2)),
            frequencia: `${risk.frequenciaPercentual.toFixed(1)}%`,
            faltasConsecutivas: risk.faltasConsecutivas,
            status: risk.riscoCritico ? 'crítico' : risk.emAtencao ? 'atenção' : 'ok'
        });
    }

    if (filters.busca) {
        const search = filters.busca.toLowerCase();
        result = result.filter(aluno =>
            aluno.nome.toLowerCase().includes(search) || aluno.matricula.includes(filters.busca)
        );
    }

    if (filters.filtro && filters.filtro !== 'todos') {
        result = result.filter(aluno => aluno.status === filters.filtro);
    }

    return result;
}

function queryAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.all(sql, params, (error, rows) => error ? reject(error) : resolve(rows));
    });
}

function execute(sql, params = []) {
    return new Promise((resolve, reject) => {
        database.run(sql, params, function (error) {
            if (error) {
                reject(error);
                return;
            }

            resolve({ id: this.lastID, changes: this.changes });
        });
    });
}

function csvValue(value) {
    return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

async function createRiskAlert(alunoId) {
    const config = await getRiskConfig();
    const risk = await getAlunoRisk(alunoId, config);
    let motivo = null;

    if (risk.faltasConsecutivas >= config.consecutiveAbsences) {
        motivo = `${risk.faltasConsecutivas} faltas consecutivas sem justificativa`;
    } else if (risk.frequenciaPercentual < config.minimumAttendance) {
        motivo = `Frequência abaixo de ${config.minimumAttendance}%`;
    } else if (risk.media !== null && risk.media < config.minimumGrade) {
        motivo = `Média abaixo de ${config.minimumGrade}`;
    }

    if (motivo) {
        const alertasPendentes = await queryAll(
            'SELECT id FROM Alerta WHERE aluno_id = ? AND lido = 0 ORDER BY id LIMIT 1',
            [alunoId]
        );
        if (alertasPendentes.length) {
            await execute('UPDATE Alerta SET motivo = ?, data_geracao = CURRENT_TIMESTAMP WHERE id = ?', [motivo, alertasPendentes[0].id]);
        } else {
            await execute('INSERT INTO Alerta (aluno_id, motivo) VALUES (?, ?)', [alunoId, motivo]);
        }
    }
}

function createAluno(aluno) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Aluno (nome, matricula, turma_id, responsavel_id) VALUES (?, ?, ?, ?)';
        database.run(sql, [aluno.nome, aluno.matricula, aluno.turma_id, aluno.responsavel_id], function (error) {
            if (error) {
                reject(error);
                return;
            }

            resolve(this.lastID);
        });
    });
}

app.use(cors());
app.use(express.json());

app.get('/api/opcoes', async (req, res) => {
    try {
        await databaseReady;
        const [turmas, disciplinas, usuarios, responsaveis] = await Promise.all([
            queryAll('SELECT id, nome FROM Turma ORDER BY nome'),
            queryAll('SELECT id, nome FROM Disciplina ORDER BY nome'),
            queryAll('SELECT id, nome FROM Usuario ORDER BY nome'),
            queryAll('SELECT id, nome FROM Responsavel ORDER BY nome')
        ]);
        res.json({ turmas, disciplinas, usuarios, responsaveis });
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível carregar as opções.', detalhe: error.message });
    }
});

// ==========================================
// DADOS SIMULADOS (MOCK)
// ==========================================
let alunos = [
    { matricula: '2024001', nome: 'João Silva', turma: 'INFO-01', faltas: 8, media: 5.2, status: 'crítico' },
    { matricula: '2024002', nome: 'Maria Santos', turma: 'INFO-01', faltas: 2, media: 7.5, status: 'ok' },
    { matricula: '2024003', nome: 'Pedro Oliveira', turma: 'INFO-02', faltas: 1, media: 8.0, status: 'ok' },
    { matricula: '2024004', nome: 'Ana Souza', turma: 'INFO-02', faltas: 6, media: 4.8, status: 'crítico' },
    { matricula: '2024005', nome: 'Carlos Lima', turma: 'INFO-01', faltas: 4, media: 5.5, status: 'atenção' },
    { matricula: '2024006', nome: 'Mariana Costa', turma: 'INFO-01', faltas: 3, media: 6.2, status: 'atenção' },
    { matricula: '2024007', nome: 'Rafael Souza', turma: 'INFO-02', faltas: 0, media: 9.0, status: 'ok' },
    { matricula: '2024008', nome: 'Juliana Ferreira', turma: 'INFO-02', faltas: 7, media: 5.0, status: 'crítico' },
    { matricula: '2024009', nome: 'José Almeida', turma: 'INFO-01', faltas: 5, media: 4.5, status: 'crítico' },
    { matricula: '2024010', nome: 'Carla Pereira', turma: 'ADM-01', faltas: 2, media: 6.8, status: 'ok' }
];

let alertas = [
    { id: 1, aluno: 'João Silva', turma: 'INFO-01', motivo: '5 faltas consecutivas', nivel: 'crítico', status: 'Pendente', data: '09/09/2026' },
    { id: 2, aluno: 'Maria Oliveira', turma: 'INFO-02', motivo: '5 faltas consecutivas', nivel: 'crítico', status: 'Concluído', data: '08/09/2026' },
    { id: 3, aluno: 'Carlos Souza', turma: 'INFO-01', motivo: '4 faltas consecutivas', nivel: 'atenção', status: 'Pendente', data: '09/09/2026' }
];

let notas = [
    { matricula: '2024001', aluno: 'João Silva', n1: 5.0, n2: 5.5, media: 5.2, status: 'Reprovado' },
    { matricula: '2024002', aluno: 'Maria Santos', n1: 7.0, n2: 8.0, media: 7.5, status: 'Aprovado' },
    { matricula: '2024003', aluno: 'Pedro Oliveira', n1: 6.5, n2: 7.5, media: 7.0, status: 'Aprovado' },
    { matricula: '2024004', aluno: 'Ana Souza', n1: 4.0, n2: 5.0, media: 4.5, status: 'Reprovado' }
];

let intervencoes = [
    { data: '09/09/2026', aluno: 'João Silva', descricao: 'Reunião com pais', responsavel: 'Coordenação', status: 'Em andamento' },
    { data: '08/09/2026', aluno: 'Maria Oliveira', descricao: 'Encaminhamento psicológico', responsavel: 'Assistente Social', status: 'Concluída' },
    { data: '07/09/2026', aluno: 'Carlos Souza', descricao: 'Monitoria de reforço', responsavel: 'Professor', status: 'Planejada' }
];

let dadosRelatorio = [
    { turma: 'INFO-01', total: 12, faltas: 45, media: 6.8, notasBaixas: 8, risco: 5 },
    { turma: 'INFO-02', total: 10, faltas: 38, media: 7.2, notasBaixas: 6, risco: 3 },
    { turma: 'ADM-01', total: 15, faltas: 22, media: 7.5, notasBaixas: 4, risco: 2 },
    { turma: 'ADM-02', total: 14, faltas: 30, media: 6.5, notasBaixas: 7, risco: 4 },
    { turma: 'ELET-01', total: 8, faltas: 18, media: 7.8, notasBaixas: 2, risco: 1 }
];

// ==========================================
// ENDPOINTS REST
// ==========================================

app.get('/api/dashboard', async (req, res) => {
    try {
        await databaseReady;
        const alunos = await getAlunos({});
        const alertasHoje = await queryAll("SELECT id FROM Alerta WHERE date(data_geracao) = date('now', 'localtime')");
        const alunosEmRisco = alunos.filter(aluno => aluno.status !== 'ok').length;
        const taxaEvasao = alunos.length ? ((alunosEmRisco / alunos.length) * 100).toFixed(1) : '0.0';
        const totalFrequencias = await queryAll('SELECT presente FROM Frequencia');
        const presentes = totalFrequencias.filter(registro => registro.presente).length;
        const frequenciaMedia = totalFrequencias.length ? Math.round((presentes / totalFrequencias.length) * 100) : 0;

        res.json({
            alunosEmRisco,
            frequenciaMedia: `${frequenciaMedia}%`,
            alertasHoje: alertasHoje.length,
            taxaEvasao: `${taxaEvasao}%`,
            alunosRisco: alunos.filter(aluno => aluno.status !== 'ok').slice(0, 10),
            evolucao: []
        });
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível carregar o dashboard.', detalhe: error.message });
    }
});

app.get('/api/alunos', async (req, res) => {
    try {
        await databaseReady;
        res.json(await getAlunos(req.query));
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível consultar os alunos.', detalhe: error.message });
    }
});

app.post('/api/alunos', async (req, res) => {
    const { nome, matricula, turma_id, responsavel_id } = req.body;

    if (!nome || !matricula || !turma_id || !responsavel_id) {
        res.status(400).json({ erro: 'nome, matricula, turma_id e responsavel_id são obrigatórios.' });
        return;
    }

    try {
        await databaseReady;
        const id = await createAluno({ nome, matricula, turma_id, responsavel_id });
        const alunosCriados = await getAlunos({ busca: matricula });
        res.status(201).json(alunosCriados.find(aluno => aluno.id === id));
    } catch (error) {
        const status = error.message.includes('UNIQUE constraint') || error.message.includes('FOREIGN KEY constraint') ? 409 : 500;
        res.status(status).json({ erro: 'Não foi possível salvar o aluno.', detalhe: error.message });
    }
});

app.patch('/api/alunos/:id', async (req, res) => {
    const { nome, matricula, turma_id, responsavel_id } = req.body;
    if (!nome || !matricula || !turma_id || !responsavel_id) {
        res.status(400).json({ erro: 'nome, matricula, turma_id e responsavel_id são obrigatórios.' });
        return;
    }
    try {
        await databaseReady;
        const resultado = await execute(
            'UPDATE Aluno SET nome = ?, matricula = ?, turma_id = ?, responsavel_id = ? WHERE id_aluno = ?',
            [nome, matricula, turma_id, responsavel_id, req.params.id]
        );
        if (!resultado.changes) {
            res.status(404).json({ erro: 'Aluno não encontrado.' });
            return;
        }
        res.json((await getAlunos({})).find(aluno => String(aluno.id_aluno) === String(req.params.id)));
    } catch (error) {
        res.status(409).json({ erro: 'Não foi possível atualizar o aluno.', detalhe: error.message });
    }
});

app.get('/api/alertas', async (req, res) => {
    try {
        await databaseReady;
        const resultado = await queryAll(`
            SELECT al.id, a.nome AS aluno, t.nome AS turma, al.motivo,
                   CASE WHEN al.lido = 1 THEN 'Concluído' ELSE 'Pendente' END AS status,
                   al.data_geracao AS data
            FROM Alerta al
            INNER JOIN Aluno a ON a.id_aluno = al.aluno_id
            INNER JOIN Turma t ON t.id = a.turma_id
            ORDER BY al.data_geracao DESC
        `);
        res.json(resultado.map(alerta => ({ ...alerta, nivel: 'crítico' })));
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível consultar os alertas.', detalhe: error.message });
    }
});

app.patch('/api/alertas/:id', async (req, res) => {
    try {
        await databaseReady;
        const resultado = await execute('UPDATE Alerta SET lido = 1 WHERE id = ?', [req.params.id]);
        if (!resultado.changes) {
            res.status(404).json({ erro: 'Alerta não encontrado.' });
            return;
        }
        res.json({ mensagem: 'Alerta marcado como concluído.' });
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível atualizar o alerta.', detalhe: error.message });
    }
});

app.get('/api/frequencia', async (req, res) => {
    try {
        await databaseReady;
        const registros = await queryAll(`
            SELECT f.id, f.id_aluno, f.id_turma, f.data, f.presente,
                   f.falta_justificada, a.nome AS aluno, a.matricula
            FROM Frequencia f
            INNER JOIN Aluno a ON a.id_aluno = f.id_aluno
            ORDER BY f.data DESC, a.nome
        `);
        res.json(registros);
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível consultar a frequência.', detalhe: error.message });
    }
});

app.post('/api/frequencia', async (req, res) => {
    const registros = Array.isArray(req.body)
        ? req.body
        : Array.isArray(req.body.registros) ? req.body.registros : [req.body];
    if (!Array.isArray(registros) || registros.length === 0) {
        res.status(400).json({ erro: 'Envie uma lista de registros de frequência.' });
        return;
    }

    try {
        await databaseReady;
        for (const registro of registros) {
            if (!registro.id_aluno || !registro.id_turma || !registro.data || registro.presente === undefined) {
                res.status(400).json({ erro: 'Cada registro exige id_aluno, id_turma, data e presente.' });
                return;
            }
            await execute(
                `INSERT INTO Frequencia (id_aluno, id_turma, data, presente, falta_justificada)
                 VALUES (?, ?, ?, ?, ?)`,
                [registro.id_aluno, registro.id_turma, registro.data, registro.presente ? 1 : 0, registro.falta_justificada ? 1 : 0]
            );
            await createRiskAlert(registro.id_aluno);
        }
        res.status(201).json({ mensagem: 'Frequência registrada com sucesso!', dados: registros });
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível salvar a frequência.', detalhe: error.message });
    }
});

app.get('/api/notas', async (req, res) => {
    try {
        await databaseReady;
        const resultado = await queryAll(`
            SELECT n.id, a.matricula, a.nome AS aluno, n.aluno_id,
                   n.disciplina_id, d.nome AS disciplina, n.valor,
                   n.periodo, n.valor AS media,
                   CASE WHEN n.valor < 6 THEN 'Reprovado' ELSE 'Aprovado' END AS status
            FROM Nota n
            INNER JOIN Aluno a ON a.id_aluno = n.aluno_id
            INNER JOIN Disciplina d ON d.id = n.disciplina_id
            ORDER BY a.nome, n.periodo, d.nome
        `);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível consultar as notas.', detalhe: error.message });
    }
});

app.post('/api/notas', async (req, res) => {
    const { aluno_id, disciplina_id, valor, periodo } = req.body;
    if (!aluno_id || !disciplina_id || valor === undefined) {
        res.status(400).json({ erro: 'aluno_id, disciplina_id e valor são obrigatórios.' });
        return;
    }

    try {
        await databaseReady;
        const resultado = await execute(
            'INSERT INTO Nota (aluno_id, disciplina_id, valor, periodo) VALUES (?, ?, ?, ?)',
            [aluno_id, disciplina_id, valor, periodo || null]
        );
        await createRiskAlert(aluno_id);
        res.status(201).json({ mensagem: 'Nota cadastrada com sucesso!', id: resultado.id });
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível salvar a nota.', detalhe: error.message });
    }
});

app.get('/api/intervencoes', async (req, res) => {
    try {
        await databaseReady;
        const resultado = await queryAll(`
            SELECT i.id, i.data, a.nome AS aluno, i.descricao,
                   p.nome AS responsavel, i.status, i.resultado_esperado
            FROM Intervencao i
            INNER JOIN Aluno a ON a.id_aluno = i.aluno_id
            INNER JOIN Usuario u ON u.id = i.usuario_id
            INNER JOIN Perfil p ON p.id = u.perfil_id
            ORDER BY i.data DESC, i.id DESC
        `);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível consultar as intervenções.', detalhe: error.message });
    }
});

app.post('/api/intervencoes', async (req, res) => {
    const { aluno_id, usuario_id, data, descricao, status, resultado_esperado } = req.body;
    if (!aluno_id || !usuario_id || !data || !descricao) {
        res.status(400).json({ erro: 'aluno_id, usuario_id, data e descricao são obrigatórios.' });
        return;
    }

    try {
        await databaseReady;
        const resultado = await execute(
            `INSERT INTO Intervencao (aluno_id, usuario_id, data, descricao, status, resultado_esperado)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [aluno_id, usuario_id, data, descricao, status || 'planejada', resultado_esperado || null]
        );
        res.status(201).json({ mensagem: 'Intervenção registrada!', id: resultado.id });
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível salvar a intervenção.', detalhe: error.message });
    }
});

app.get('/api/configuracao-risco', async (req, res) => {
    try {
        await databaseReady;
        res.json(await queryAll('SELECT parametro, valor, descricao FROM Configuracao_Risco ORDER BY parametro'));
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível consultar a configuração de risco.', detalhe: error.message });
    }
});

app.patch('/api/configuracao-risco', async (req, res) => {
    const permitidas = ['limite_faltas_consecutivas', 'nota_minima', 'frequencia_minima'];
    const parametros = permitidas.filter(parametro => req.body?.[parametro] !== undefined);
    if (!parametros.length || parametros.some(parametro => !Number.isFinite(Number(req.body[parametro])) || Number(req.body[parametro]) < 0)) {
        res.status(400).json({ erro: 'Informe parâmetros de risco numéricos válidos.' });
        return;
    }
    try {
        await databaseReady;
        for (const parametro of parametros) {
            await execute('UPDATE Configuracao_Risco SET valor = ? WHERE parametro = ?', [Number(req.body[parametro]), parametro]);
        }
        res.json(await queryAll('SELECT parametro, valor, descricao FROM Configuracao_Risco ORDER BY parametro'));
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível atualizar a configuração de risco.', detalhe: error.message });
    }
});

app.get('/api/ocorrencias', async (req, res) => {
    try {
        await databaseReady;
        const resultado = await queryAll(`
            SELECT o.id, o.data, o.tipo, o.descricao,
                   a.id_aluno AS aluno_id, a.nome AS aluno,
                   u.id AS usuario_id, u.nome AS usuario
            FROM Ocorrencia o
            INNER JOIN Aluno a ON a.id_aluno = o.aluno_id
            INNER JOIN Usuario u ON u.id = o.usuario_id
            ORDER BY o.data DESC, o.id DESC
        `);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível consultar as ocorrências.', detalhe: error.message });
    }
});

app.post('/api/ocorrencias', async (req, res) => {
    const { aluno_id, usuario_id, data, tipo, descricao } = req.body;
    if (!aluno_id || !usuario_id || !data || !descricao) {
        res.status(400).json({ erro: 'aluno_id, usuario_id, data e descricao são obrigatórios.' });
        return;
    }

    try {
        await databaseReady;
        const resultado = await execute(
            `INSERT INTO Ocorrencia (aluno_id, usuario_id, data, tipo, descricao)
             VALUES (?, ?, ?, ?, ?)`,
            [aluno_id, usuario_id, data, tipo || null, descricao]
        );
        res.status(201).json({ mensagem: 'Ocorrência registrada!', id: resultado.id });
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível salvar a ocorrência.', detalhe: error.message });
    }
});

app.get('/api/relatorios', async (req, res) => {
    const { turma } = req.query;
    try {
        await databaseReady;
        const config = await getRiskConfig();
        const alunos = await getAlunos({});
        const notasBaixas = await queryAll(
            'SELECT aluno_id, 1 AS total FROM Nota WHERE valor < ? GROUP BY aluno_id',
            [config.minimumGrade]
        );
        const notasPorAluno = Object.fromEntries(notasBaixas.map(nota => [nota.aluno_id, nota.total]));
        const grupos = new Map();

        for (const aluno of alunos) {
            if (turma && turma !== 'todas' && aluno.turma !== turma) continue;
            const grupo = grupos.get(aluno.turma) || { turma: aluno.turma, total: 0, faltas: 0, somaMedias: 0, alunosComMedia: 0, notasBaixas: 0, risco: 0 };
            grupo.total += 1;
            grupo.faltas += aluno.faltas;
            grupo.somaMedias += aluno.media;
            grupo.alunosComMedia += aluno.media ? 1 : 0;
            grupo.notasBaixas += notasPorAluno[aluno.id_aluno] || 0;
            grupo.risco += aluno.status === 'ok' ? 0 : 1;
            grupos.set(aluno.turma, grupo);
        }

        res.json([...grupos.values()].map(grupo => ({
            turma: grupo.turma,
            total: grupo.total,
            faltas: grupo.faltas,
            media: grupo.alunosComMedia ? Number((grupo.somaMedias / grupo.alunosComMedia).toFixed(2)) : 0,
            notasBaixas: grupo.notasBaixas,
            risco: grupo.risco
        })));
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível gerar os relatórios.', detalhe: error.message });
    }
});

app.get('/api/relatorios.csv', async (req, res) => {
    try {
        await databaseReady;
        const relatorios = await queryAll(`
            SELECT t.nome AS turma, COUNT(DISTINCT a.id_aluno) AS total,
                   COALESCE(SUM(CASE WHEN f.presente = 0 THEN 1 ELSE 0 END), 0) AS faltas
            FROM Turma t
            LEFT JOIN Aluno a ON a.turma_id = t.id
            LEFT JOIN Frequencia f ON f.id_aluno = a.id_aluno
            WHERE ? = 'todas' OR t.nome = ?
            GROUP BY t.id, t.nome ORDER BY t.nome
        `, [req.query.turma || 'todas', req.query.turma || 'todas']);
        const linhas = [
            ['Turma', 'Total de alunos', 'Total de faltas'],
            ...relatorios.map(relatorio => [relatorio.turma, relatorio.total, relatorio.faltas])
        ];
        res.attachment('relatorio-simpe.csv').type('text/csv').send(`\ufeff${linhas.map(linha => linha.map(csvValue).join(';')).join('\n')}`);
    } catch (error) {
        res.status(500).json({ erro: 'Não foi possível exportar o relatório.', detalhe: error.message });
    }
});

const PORT = 3000;
databaseReady.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Falha ao inicializar o banco de dados:', error);
    process.exitCode = 1;
});
