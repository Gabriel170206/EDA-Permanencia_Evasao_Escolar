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