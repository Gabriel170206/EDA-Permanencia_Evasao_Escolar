const API_URL = 'http://localhost:3000/api';

// ==========================================
// 1. DASHBOARD (index.html)
// ==========================================
async function carregarDashboard() {
    try {
        const resposta = await fetch(`${API_URL}/dashboard`);
        const dados = await resposta.json();

        const cards = document.querySelectorAll('.card h2');
        if (cards.length >= 4) {
            cards[0].textContent = dados.alunosEmRisco;
            cards[1].textContent = dados.frequenciaMedia;
            cards[2].textContent = dados.alertasHoje;
            cards[3].textContent = dados.taxaEvasao;
        }
    } catch (erro) {
        console.error('Erro ao carregar Dashboard:', erro);
    }
}

async function api(path, options = {}) {
    const resposta = await fetch(`${API_URL}${path}`, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options
    });
    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.erro || 'Não foi possível concluir a operação.');
    return dados;
}

function preencherSelect(select, itens, placeholder) {
    if (!select) return;
    select.innerHTML = `<option value="">${placeholder}</option>${itens.map(item => `<option value="${item.id}">${item.nome}</option>`).join('')}`;
}

async function carregarOpcoes() {
    const opcoes = await api('/opcoes');
    preencherSelect(document.getElementById('turma_id'), opcoes.turmas, 'Selecione a turma');
    preencherSelect(document.getElementById('responsavel_id'), opcoes.responsaveis, 'Selecione o responsável');
    preencherSelect(document.getElementById('disciplina_id'), opcoes.disciplinas, 'Selecione a disciplina');
    preencherSelect(document.getElementById('aluno_id'), opcoes.usuarios ? [] : [], 'Selecione o aluno');
    const alunos = await api('/alunos');
    preencherSelect(document.getElementById('aluno_id'), alunos, 'Selecione o aluno');
    preencherSelect(document.getElementById('usuario_id'), opcoes.usuarios, 'Selecione o responsável');
    const filtroTurma = document.getElementById('filtroTurma');
    if (filtroTurma) {
        filtroTurma.innerHTML = '<option value="todas">Todas as turmas</option>' + opcoes.turmas.map(turma => `<option value="${turma.nome}">${turma.nome}</option>`).join('');
    }
}

async function carregarDashboard() {
    try {
        const dados = await api('/dashboard');
        const cards = document.querySelectorAll('#cardsDashboard h2');
        if (cards.length >= 4) {
            cards[0].textContent = dados.alunosEmRisco;
            cards[1].textContent = dados.frequenciaMedia;
            cards[2].textContent = dados.alertasHoje;
            cards[3].textContent = dados.taxaEvasao;
        }
        const risco = document.getElementById('alunosRiscoDashboard');
        if (risco) risco.innerHTML = dados.alunosRisco.map(aluno => `<tr><td>${aluno.nome}</td><td>${aluno.turma}</td><td>${aluno.faltas}</td><td>${aluno.status}</td></tr>`).join('') || '<tr><td colspan="4">Nenhum aluno em risco.</td></tr>';
    } catch (erro) { console.error(erro); }
}

async function buscarAlunos() {
    try {
        const busca = document.getElementById('busca')?.value || '';
        const filtro = document.getElementById('filtroRisco')?.value || 'todos';
        const alunos = await api(`/alunos?busca=${encodeURIComponent(busca)}&filtro=${encodeURIComponent(filtro)}`);
        const tbody = document.getElementById('corpoTabela');
        if (tbody) tbody.innerHTML = alunos.map(aluno => `<tr><td>${aluno.matricula}</td><td>${aluno.nome}</td><td>${aluno.turma}</td><td>${aluno.faltas}</td><td>${aluno.media}</td><td>${aluno.status}</td></tr>`).join('') || '<tr><td colspan="6">Nenhum aluno encontrado.</td></tr>';
        const titulo = document.getElementById('tituloLista');
        if (titulo) titulo.textContent = `Lista de Alunos (${alunos.length})`;
    } catch (erro) { console.error(erro); }
}

async function carregarAlertas() {
    try {
        const alertas = await api('/alertas');
        const lista = document.getElementById('listaAlertas');
        if (lista) lista.innerHTML = alertas.map(alerta => `<div class="${alerta.nivel === 'atenção' ? 'alert-warning' : 'alert-critical'}"><strong>${alerta.nivel}</strong>: ${alerta.aluno} - ${alerta.motivo}<br><small>${alerta.data} | ${alerta.turma}</small><button onclick="concluirAlerta(${alerta.id})">Concluir</button></div>`).join('') || '<p>Nenhum alerta encontrado.</p>';
        const historico = document.querySelector('#historicoAlertas tbody');
        if (historico) historico.innerHTML = alertas.map(alerta => `<tr><td>${alerta.data}</td><td>${alerta.aluno}</td><td>${alerta.motivo}</td><td>${alerta.status}</td></tr>`).join('');
    } catch (erro) { console.error(erro); }
}

async function carregarNotas() {
    try {
        const notas = await api('/notas');
        const tabela = document.querySelector('#tabelaNotas tbody');
        if (tabela) tabela.innerHTML = notas.map(nota => `<tr><td>${nota.aluno}</td><td>${nota.disciplina}</td><td>${nota.valor}</td><td>${nota.periodo || '-'}</td><td>${nota.status}</td></tr>`).join('') || '<tr><td colspan="5">Nenhuma nota encontrada.</td></tr>';
    } catch (erro) { console.error(erro); }
}

async function carregarIntervencoes() {
    try {
        const intervencoes = await api('/intervencoes');
        const tabela = document.querySelector('#tabelaIntervencoes tbody');
        if (tabela) tabela.innerHTML = intervencoes.map(intervencao => `<tr><td>${intervencao.data}</td><td>${intervencao.aluno}</td><td>${intervencao.descricao}</td><td>${intervencao.responsavel}</td><td>${intervencao.status}</td></tr>`).join('') || '<tr><td colspan="5">Nenhuma intervenção encontrada.</td></tr>';
    } catch (erro) { console.error(erro); }
}

async function salvarFrequencia() {
    const registros = [...document.querySelectorAll('#tabelaFrequencia tbody tr[data-aluno-id]')].map(linha => ({
        id_aluno: Number(linha.dataset.alunoId), id_turma: Number(linha.dataset.turmaId), data: linha.dataset.data, presente: linha.querySelector('select').value === 'presente'
    }));
    try { await api('/frequencia', { method: 'POST', body: JSON.stringify(registros) }); alert('Frequência registrada.'); }
    catch (erro) { const pendentes = JSON.parse(localStorage.getItem('simpe-frequencias') || '[]'); localStorage.setItem('simpe-frequencias', JSON.stringify([...pendentes, ...registros])); alert('Sem conexão. Dados guardados para sincronização.'); }
}

async function sincronizarFrequencias() {
    const pendentes = JSON.parse(localStorage.getItem('simpe-frequencias') || '[]');
    if (!pendentes.length) return;
    try { await api('/frequencia', { method: 'POST', body: JSON.stringify(pendentes) }); localStorage.removeItem('simpe-frequencias'); } catch (erro) { console.error(erro); }
}
window.salvarFrequencia = salvarFrequencia;
window.addEventListener('online', sincronizarFrequencias);

async function carregarFrequencia() {
    try {
        const alunos = await api('/alunos');
        const data = new Date().toISOString().slice(0, 10);
        document.querySelector('#tabelaFrequencia tbody').innerHTML = alunos.map(aluno => `<tr data-aluno-id="${aluno.id_aluno}" data-turma-id="${aluno.turma_id}" data-data="${data}"><td>${aluno.matricula}</td><td>${aluno.nome}</td><td><select><option value="presente">Presente</option><option value="falta">Falta</option></select></td></tr>`).join('');
    } catch (erro) { console.error(erro); }
}

async function exibirRelatorio() {
    try {
        const filtro = document.getElementById('filtroTurma')?.value || 'todas';
        const dados = await api(`/relatorios?turma=${encodeURIComponent(filtro)}`);
        document.getElementById('corpoRelatorio').innerHTML = dados.map(item => `<tr><td>${item.turma}</td><td>${item.total}</td><td>${item.faltas}</td><td>${item.media}</td><td>${item.notasBaixas}</td><td>${item.risco}</td><td>${item.risco >= 4 ? 'Alto' : item.risco >= 2 ? 'Médio' : 'Baixo'}</td></tr>`).join('') || '<tr><td colspan="7">Nenhum dado encontrado.</td></tr>';
    } catch (erro) { console.error(erro); }
}
function exportarCSV() { const filtro = document.getElementById('filtroTurma')?.value || 'todas'; window.location.href = `${API_URL}/relatorios.csv?turma=${encodeURIComponent(filtro)}`; }
window.exibirRelatorio = exibirRelatorio;
window.exportarCSV = exportarCSV;

async function enviarFormulario(id, endpoint, mensagem) {
    const formulario = document.getElementById(id);
    if (!formulario) return;
    formulario.addEventListener('submit', async evento => {
        evento.preventDefault();
        try { await api(endpoint, { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(formulario))) }); formulario.reset(); alert(mensagem); location.reload(); }
        catch (erro) { alert(erro.message); }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try { await carregarOpcoes(); } catch (erro) { console.error(erro); }
    if (document.getElementById('cardsDashboard')) carregarDashboard();
    if (document.getElementById('corpoTabela')) buscarAlunos();
    if (document.getElementById('listaAlertas')) carregarAlertas();
    if (document.getElementById('tabelaNotas')) carregarNotas();
    if (document.getElementById('tabelaIntervencoes')) carregarIntervencoes();
    if (document.getElementById('tabelaFrequencia')) carregarFrequencia();
    if (document.getElementById('corpoRelatorio')) exibirRelatorio();
    enviarFormulario('formAluno', '/alunos', 'Aluno cadastrado.');
    enviarFormulario('formNota', '/notas', 'Nota cadastrada.');
    enviarFormulario('formIntervencao', '/intervencoes', 'Intervenção registrada.');
    sincronizarFrequencias();
});

// ==========================================
// 2. ALUNOS (alunos.html)
// ==========================================
async function buscarAlunos() {
    const busca = document.getElementById('busca')?.value || '';
    const filtro = document.getElementById('filtroRisco')?.value || 'todos';

    try {
        const resposta = await fetch(`${API_URL}/alunos?busca=${encodeURIComponent(busca)}&filtro=${encodeURIComponent(filtro)}`);
        const alunos = await resposta.json();
        exibirAlunos(alunos);
    } catch (erro) {
        console.error('Erro ao buscar alunos:', erro);
    }
}

function exibirAlunos(lista) {
    const tbody = document.getElementById('corpoTabela');
    const titulo = document.getElementById('tituloLista');
    if (!tbody || !titulo) return;

    if (lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum aluno encontrado.</td></tr>';
        titulo.textContent = '📋 Lista de Alunos (0)';
        return;
    }

    titulo.textContent = `📋 Lista de Alunos (${lista.length})`;
    tbody.innerHTML = lista.map(a => `
        <tr>
            <td>${a.matricula}</td>
            <td>${a.nome}</td>
            <td>${a.turma}</td>
            <td>${a.faltas}</td>
            <td>${a.media}</td>
            <td style="font-weight:bold;color:${a.status === 'crítico' ? '#c62828' : a.status === 'atenção' ? '#e65100' : '#2e7d32'}">
                ${a.status === 'crítico' ? '⚠️ Crítico' : a.status === 'atenção' ? '🔍 Atenção' : '✅ OK'}
            </td>
        </tr>
    `).join('');
}
window.filtrarAlunos = buscarAlunos;

// ==========================================
// 3. ALERTAS (alertas.html)
// ==========================================
async function carregarAlertas() {
    try {
        const resposta = await fetch(`${API_URL}/alertas`);
        const alertas = await resposta.json();
        const lista = document.getElementById('listaAlertas');
        const historico = document.querySelector('#historicoAlertas tbody');
        if (lista) {
            lista.innerHTML = alertas.map(alerta => `
                <div class="${alerta.nivel === 'atenção' ? 'alert-warning' : 'alert-critical'}">
                    <strong>${alerta.nivel === 'atenção' ? '🟡 ATENÇÃO' : '🔴 CRÍTICO'}:</strong>
                    ${alerta.aluno} - ${alerta.motivo}<br><small>${alerta.data} | ${alerta.turma}</small>
                </div>
            `).join('') || '<p>Nenhum alerta encontrado.</p>';
        }
        if (historico) {
            historico.innerHTML = alertas.map(alerta => `
                <tr><td>${alerta.data}</td><td>${alerta.aluno}</td><td>${alerta.motivo}</td><td>${alerta.status}</td></tr>
            `).join('');
        }
    } catch (erro) {
        console.error('Erro ao carregar alertas:', erro);
    }
}

// ==========================================
// 4. NOTAS (notas.html)
// ==========================================
async function carregarNotas() {
    try {
        const resposta = await fetch(`${API_URL}/notas`);
        const notas = await resposta.json();
        const tabela = document.querySelector('#tabelaNotas tbody');
        if (tabela) {
            tabela.innerHTML = notas.map(nota => `
                <tr><td>${nota.aluno}</td><td>${nota.valor}</td><td>${nota.periodo || '-'}</td>
                <td>${nota.media}</td><td>${nota.status}</td></tr>
            `).join('');
        }
    } catch (erro) {
        console.error('Erro ao carregar notas:', erro);
    }
}

// ==========================================
// 5. INTERVENÇÕES (intervencoes.html)
// ==========================================
async function carregarIntervencoes() {
    try {
        const resposta = await fetch(`${API_URL}/intervencoes`);
        const intervencoes = await resposta.json();
        const tabela = document.querySelector('#tabelaIntervencoes tbody');
        if (tabela) {
            tabela.innerHTML = intervencoes.map(intervencao => `
                <tr><td>${intervencao.data}</td><td>${intervencao.aluno}</td>
                <td>${intervencao.descricao}</td><td>${intervencao.responsavel}</td><td>${intervencao.status}</td></tr>
            `).join('');
        }
    } catch (erro) {
        console.error('Erro ao carregar intervenções:', erro);
    }
}

async function salvarFrequencia() {
    const registros = [...document.querySelectorAll('#tabelaFrequencia tbody tr')].map(linha => ({
        id_aluno: Number(linha.dataset.alunoId),
        id_turma: Number(linha.dataset.turmaId),
        data: linha.dataset.data,
        presente: linha.querySelector('select').value === 'presente'
    }));

    try {
        const resposta = await fetch(`${API_URL}/frequencia`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registros)
        });
        const resultado = await resposta.json();
        if (!resposta.ok) throw new Error(resultado.erro);
        alert(resultado.mensagem);
    } catch (erro) {
        console.error('Erro ao salvar frequência:', erro);
        alert('Não foi possível salvar a frequência.');
    }
}
window.salvarFrequencia = salvarFrequencia;

// ==========================================
// 6. RELATÓRIOS (relatorios.html)
// ==========================================
async function exibirRelatorio() {
    const filtro = document.getElementById('filtroTurma')?.value || 'todas';
    const tbody = document.getElementById('corpoRelatorio');
    const resumo = document.getElementById('resumoGeral');

    if (!tbody || !resumo) return;

    try {
        const resposta = await fetch(`${API_URL}/relatorios?turma=${filtro}`);
        const dadosFiltrados = await resposta.json();

        if (dadosFiltrados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Nenhum dado encontrado.</td></tr>';
        } else {
            tbody.innerHTML = dadosFiltrados.map(d => {
                const risco = d.risco >= 4 ? 'Alto' : d.risco >= 2 ? 'Médio' : 'Baixo';
                const cor = d.risco >= 4 ? '#c62828' : d.risco >= 2 ? '#e65100' : '#2e7d32';
                return `<tr>
                    <td>${d.turma}</td>
                    <td>${d.total}</td>
                    <td>${d.faltas}</td>
                    <td>${d.media}</td>
                    <td>${d.notasBaixas}</td>
                    <td>${d.risco}</td>
                    <td style="color:${cor};font-weight:bold">${risco}</td>
                </tr>`;
            }).join('');
        }

        const totalAlunos = dadosFiltrados.reduce((s, d) => s + d.total, 0);
        const totalRisco = dadosFiltrados.reduce((s, d) => s + d.risco, 0);
        const totalFaltas = dadosFiltrados.reduce((s, d) => s + d.faltas, 0);
        const taxaEvasao = totalAlunos > 0 ? ((totalRisco / totalAlunos) * 100).toFixed(1) : 0;
        const mediaGeral = dadosFiltrados.length > 0 ? (dadosFiltrados.reduce((s, d) => s + d.media, 0) / dadosFiltrados.length).toFixed(1) : 0;

        resumo.innerHTML = `
            <p><strong>Total de Alunos:</strong> ${totalAlunos}</p>
            <p><strong>Total de Faltas:</strong> ${totalFaltas}</p>
            <p><strong>Média Geral:</strong> ${mediaGeral}</p>
            <p><strong>Alunos em Risco:</strong> ${totalRisco} (${taxaEvasao}%)</p>
            <p><strong>Taxa de Evasão:</strong> ${taxaEvasao}%</p>
        `;
    } catch (erro) {
        console.error('Erro ao carregar relatórios:', erro);
    }
}
window.exibirRelatorio = exibirRelatorio;

// ==========================================
// INICIALIZAÇÃO AUTOMÁTICA POR TELA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.card h2')) carregarDashboard();
    if (document.getElementById('corpoTabela')) buscarAlunos();
    if (document.getElementById('corpoRelatorio')) exibirRelatorio();
    if (window.location.pathname.includes('alertas.html')) carregarAlertas();
    if (window.location.pathname.includes('notas.html')) carregarNotas();
    if (window.location.pathname.includes('intervencoes.html')) carregarIntervencoes();
});