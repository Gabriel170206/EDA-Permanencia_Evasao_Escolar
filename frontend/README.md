# Frontend

Este diretório concentra a interface web do projeto SIMPE.

**Responsável:** Gabriel Rodrigues.

## Tecnologia usada

A interface foi implementada com HTML, CSS e JavaScript puro, sem framework, utilizando arquivos estáticos.

## Organização

As páginas do frontend foram separadas em arquivos HTML dentro da pasta `html/`.
O estilo visual compartilhado foi centralizado em um único arquivo global de CSS, localizado em `css/styles.css`.
A lógica reutilizável de interação e renderização foi centralizada em um único arquivo JavaScript global, localizado em `js/app.js`.

## Separação prática

- `html/`: contém as páginas web do sistema, como dashboard, alertas, alunos, frequência, notas, intervenções e relatórios.
- `css/`: contém o arquivo global `styles.css`, responsável por todos os estilos visuais compartilhados entre as páginas.
- `js/`: contém o arquivo global `app.js`, responsável por funções de exibição de alunos, filtro, relatório e outras interações comuns.

## Motivo da separação

A separação entre HTML, CSS e JavaScript foi feita para melhorar a organização, a manutenção e a reutilização de recursos.
O CSS e o JavaScript foram tratados como globais porque as páginas possuem uma estética simples e reaproveitável, o que evita duplicação de código e melhora a eficiência de acesso e organização do frontend.

## Como instalar

Não é necessário instalar dependências. Basta manter a estrutura de arquivos do frontend com as pastas `html`, `css` e `js` e acessar os arquivos com um servidor local.

## Como executar

Você pode executar o frontend com um servidor HTTP simples, por exemplo:

```bash
cd frontend
python3 -m http.server 8000
```

Depois, abra no navegador:

```text
http://127.0.0.1:8000/html/index.html
```

O backend deve estar rodando em outro terminal na porta `3000`:

```bash
cd ../backend
npm install
node server.js
```

O JavaScript do frontend consome a API em `http://localhost:3000/api`. Iniciar apenas o servidor HTTP permite abrir as páginas, mas não carregar os dados do banco.

## Fluxos disponíveis

- `index.html`: indicadores e alunos em risco;
- `alunos.html`: busca, filtro e cadastro de alunos;
- `alertas.html`: consulta e conclusão de alertas;
- `frequencia.html`: lançamento diário de presença e falta;
- `notas.html`: lançamento e consulta de notas;
- `intervencoes.html`: registro e consulta de intervenções;
- `relatorios.html`: relatório por turma e exportação.

## Telas implementadas

- Dashboard
- Alertas
- Relatórios
- Frequência
- Notas
- Intervenções
- Alunos
