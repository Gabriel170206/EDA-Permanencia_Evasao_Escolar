# EDA-Permanência-Evasao-Escolar-Trabalho

# SIMPE — Sistema Inteligente de Monitoramento da Permanência Escolar

Este repositório contém a modelagem e o desenvolvimento do **SIMPE**, uma plataforma de software projetada para combater a evasão escolar por meio de inteligência analítica e monitoramento preventivo.

---

## 1. Visão Geral

### O Problema e o Impacto no Território

A evasão escolar é um problema que afeta diretamente o desenvolvimento socioeconômico regional. O abandono dos estudos não acontece de forma repentina; ele é precedido por sinais claros, como faltas frequentes, queda acentuada de rendimento, desmotivação e dificuldades de aprendizagem.

No território social e econômico, o impacto se desdobra em diversas camadas:

* **Estudantes e Famílias:** Diminuição da qualificação profissional, aumento da vulnerabilidade social e interrupção de projetos de ascensão social.
* **Instituições de Ensino e Professores:** DFrustração profissional e piora nos indicadores institucionais que afetam avaliações governamentais.
* **Governo e Sociedade:** Desperdício de recursos públicos investidos na educação básica/técnica, aumento da demanda por programas sociais e políticas compensatórias, redução da produtividade econômica e ampliação das desigualdades sociais.

### Solução Proposta

O **SIMPE** atua como uma ferramenta estratégica de apoio à decisão humana. Ele centraliza dados de frequência, notas e ocorrências para identificar com antencedência estudantes em risco de evasão e emitir alertas automáticos configuráveis para a equipe multidisciplinar (gestores, pedagogos, psicólogos e assistentes sociais), viabilizando intervenções rápidas e eficazes antes que o abandono ocorra.

> **Frase Guia do Projeto:**
> Apoiar gestores, professores e equipes multidisciplinares a identificar com antencedência estudantes em risco de evasão e organizar intervenções para aumentar a taxa de permanência e conclusão escolar, reduzindo as desigualdades sociais e fortalecendo o desenvolvimento educacional.

---

## 2. Estrutura do Repositório

```text
EDA-Permanencia_Evasao/
├── data/                     # Dados brutos e processados para análise
│   └── (arquivos de dados)
├── diagrams/                 # Diagramas do projeto (arquitetura, fluxos, etc.)
│   └── (diagramas em formato .png, .drawio, etc.)
├── docs/                     # Documentação geral do projeto
│   └── (documentos, manuais, atividades)
├── Equipe/                   # Integrantes do projeto
│   └── README.md
├── outputs/                  # Resultados gerados pelas análises
│   └── (relatórios, gráficos, tabelas, etc.)
├── src/                      # Código-fonte principal do projeto
│   └── (fontes.)
├── tests/                    # Testes automatizados
│   └── (scripts de teste, fixtures)
└── README.md                 # Documentação principal do projeto
```

---

## 3. Como executar o sistema

### Requisitos

- Linux Mint ou outro sistema compatível com Node.js;
- Node.js 22 LTS;
- npm;
- Python 3 para servir os arquivos estáticos do frontend.

O banco usado pelo projeto é SQLite. O backend utiliza `data/db/simpe.db` e cria o schema inicial quando necessário.

### Terminal 1: backend

```bash
cd "/seu/caminho/diretório/para/EDA-Permanencia_Evasao_Escolar/backend"
npm install
node server.js
```

A API fica disponível em `http://localhost:3000`.

### Terminal 2: frontend

```bash
cd "/seu/caminho/diretório/para/EDA-Permanencia_Evasao_Escolar/frontend"
python3 -m http.server 8000
```

Abra `http://localhost:8000/html/index.html`. A porta `3000` serve a API; a porta `8000` serve as páginas.

### Fluxo e verificação

O frontend HTML/CSS/JavaScript envia requisições para `http://localhost:3000/api`. O backend aplica as regras, acessa o SQLite e devolve os dados para dashboard, alunos, alertas, frequência, notas, intervenções e relatórios.

Com o backend ligado, estes endereços devem retornar JSON:

```text
http://localhost:3000/api/alunos
http://localhost:3000/api/dashboard
http://localhost:3000/api/relatorios
```

O SQLite Viewer pode confirmar os registros nas tabelas `Aluno`, `Frequencia`, `Nota`, `Intervencao` e `Alerta`.

### Solução de problemas

Se o `sqlite3` apresentar erro de binding nativo, use Node 22 e reinstale as dependências:

```bash
nvm install 22
nvm use 22
cd "/seu/caminho/diretório/para/EDA-Permanencia_Evasao_Escolar/backend"
rm -rf node_modules package-lock.json
npm install
node server.js
```

## 4. Como Contribuir

### Certificação de Arquivos

Antes de adicionar ou modificar qualquer arquivo no repositório, siga estas regras simples:

1. **Verifique dados sensíveis**: Nunca commit arquivos com:
   - Nomes, CPF ou dados pessoais de alunos
   - Senhas, chaves de API ou credenciais
   - Informações que possam identificar pessoas

2. **Anonimize os dados**: Se for usar dados reais, remova ou ofusque informações que identifiquem indivíduos.

3. **Revise antes de commitar**: Confira se o arquivo está correto e se não contém informações indevidas.

### Checklist Rápido

- [ ] Dados anonimizados?
- [ ] Sem credenciais ou senhas?
- [ ] Origem documentada?
- [ ] Revisão realizada?

**Dúvidas?** Consulte a equipe antes de fazer o commit.
---

## 5. Licença e Créditos

### Autoria

Este projeto foi desenvolvido como parte da **Atividade em Grupo – Trilha EDA/Permanência**, com foco no combate à Evasão Escolar.

**Equipe de Desenvolvimento:**
- Gabriel Rodrigues
- Marcus Antônio
- Ryan Corrêa 
- Pedro Eduardo
- Irislene Mendes

**Orientação:** Thales

**Data do Planejamento:** 02 de Julho de 2026

### Fontes de Dados e Referências

- Indicadores de evasão baseados em frequência e rendimento escolar
- Conformidade com a **Lei Geral de Proteção de Dados (LGPD)**

### Licença
Este projeto está sob a **Licença MIT** - consulte o arquivo `LICENSE` para mais informações.
