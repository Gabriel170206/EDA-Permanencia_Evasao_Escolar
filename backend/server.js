
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

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

app.get('/api/dashboard', (req, res) => {
    res.json({
        alunosEmRisco: 12,
        frequenciaMedia: '87%',
        alertasHoje: 3,
        taxaEvasao: '8.5%'
    });
});

app.get('/api/alunos', (req, res) => {
    const { busca, filtro } = req.query;
    let resultado = alunos;

    if (busca) {
        const buscaLower = busca.toLowerCase();
        resultado = resultado.filter(a => 
            a.nome.toLowerCase().includes(buscaLower) || 
            a.matricula.includes(busca)
        );
    }

    if (filtro && filtro !== 'todos') {
        resultado = resultado.filter(a => a.status === filtro);
    }

    res.json(resultado);
});

app.get('/api/alertas', (req, res) => {
    res.json(alertas);
});

app.post('/api/frequencia', (req, res) => {
    const registros = req.body;
    res.status(201).json({ mensagem: 'Frequência registrada com sucesso!', dados: registros });
});

app.get('/api/notas', (req, res) => {
    res.json(notas);
});

app.post('/api/notas', (req, res) => {
    const novaNota = req.body;
    notas.push(novaNota);
    res.status(201).json({ mensagem: 'Nota cadastrada com sucesso!' });
});

app.get('/api/intervencoes', (req, res) => {
    res.json(intervencoes);
});

app.post('/api/intervencoes', (req, res) => {
    const novaIntervencao = req.body;
    intervencoes.push(novaIntervencao);
    res.status(201).json({ mensagem: 'Intervenção registrada!' });
});

app.get('/api/relatorios', (req, res) => {
    const { turma } = req.query;
    let resultado = dadosRelatorio;

    if (turma && turma !== 'todas') {
        resultado = resultado.filter(d => d.turma === turma);
    }

    res.json(resultado);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
