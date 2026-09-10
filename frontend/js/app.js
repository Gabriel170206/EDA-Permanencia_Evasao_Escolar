const alunos = [
    { matricula: '2024001', nome: 'João Silva', turma: 'INFO-01', faltas: 8, media: 5.2, status: 'crítico' },
    { matricula: '2024002', nome: 'Maria Santos', turma: 'INFO-01', faltas: 2, media: 7.5, status: 'ok' },
    { matricula: '2024003', nome: 'Pedro Oliveira', turma: 'INFO-02', faltas: 1, media: 8.0, status: 'ok' },
    { matricula: '2024004', nome: 'Ana Souza', turma: 'INFO-02', faltas: 6, media: 4.8, status: 'crítico' },
    { matricula: '2024005', nome: 'Carlos Lima', turma: 'INFO-01', faltas: 4, media: 5.5, status: 'atenção' },
    { matricula: '2024006', nome: 'Mariana Costa', turma: 'INFO-01', faltas: 3, media: 6.2, status: 'atenção' },
    { matricula: '2024007', nome: 'Rafael Souza', turma: 'INFO-02', faltas: 0, media: 9.0, status: 'ok' },
    { matricula: '2024008', nome: 'Juliana Ferreira', turma: 'INFO-02', faltas: 7, media: 5.0, status: 'crítico' },
    { matricula: '2024009', nome: 'José Almeida', turma: 'INFO-01', faltas: 5, media: 4.5, status: 'crítico' },
    { matricula: '2024010', nome: 'Carla Pereira', turma: 'ADM-01', faltas: 2, media: 6.8, status: 'ok' },
];

function exibirAlunos(lista) {
    const tbody = document.getElementById('corpoTabela');
    const titulo = document.getElementById('tituloLista');

    if (!tbody || !titulo) {
        return;
    }

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

function filtrarAlunos() {
    const busca = document.getElementById('busca')?.value.toLowerCase() || '';
    const filtro = document.getElementById('filtroRisco')?.value || 'todos';
    const buscaSemAcento = busca.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const filtrados = alunos.filter(a => {
        const nomeSemAcento = a.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        const matchBusca = nomeSemAcento.includes(buscaSemAcento) || a.matricula.includes(busca);
        const matchStatus = filtro === 'todos' || a.status === filtro;
        return matchBusca && matchStatus;
    });

    exibirAlunos(filtrados);
}

const dados = [
    { turma: 'INFO-01', total: 12, faltas: 45, media: 6.8, notasBaixas: 8, risco: 5 },
    { turma: 'INFO-02', total: 10, faltas: 38, media: 7.2, notasBaixas: 6, risco: 3 },
    { turma: 'ADM-01', total: 15, faltas: 22, media: 7.5, notasBaixas: 4, risco: 2 },
    { turma: 'ADM-02', total: 14, faltas: 30, media: 6.5, notasBaixas: 7, risco: 4 },
    { turma: 'ELET-01', total: 8, faltas: 18, media: 7.8, notasBaixas: 2, risco: 1 },
];

function exibirRelatorio() {
    const filtro = document.getElementById('filtroTurma')?.value || 'todas';
    const dadosFiltrados = filtro === 'todas' ? dados : dados.filter(d => d.turma === filtro);

    const tbody = document.getElementById('corpoRelatorio');
    const resumo = document.getElementById('resumoGeral');

    if (!tbody || !resumo) {
        return;
    }

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
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('corpoTabela')) {
        exibirAlunos(alunos);
    }

    if (document.getElementById('corpoRelatorio')) {
        exibirRelatorio();
    }
});
