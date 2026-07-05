# EDA-Permanência-Evasao-Escolar-Trabalho

# SIMPE — Sistema Inteligente de Monitoramento da Permanência Escolar

Este repositório contém a modelagem e o desenvolvimento do **SIMPE**, uma plataforma de software projetada para combater a evasão escolar por meio de inteligência analítica e monitoramento preventivo.

---

## 1. Visão Geral

### O Problema e o Impacto no Território

A evasão escolar é um problema multidimensional e cumulativo que afeta diretamente o desenvolvimento socioeconômico regional. O abandono dos estudos não acontece de forma repentina; ele é precedido por sinais claros, como faltas frequentes, queda acentuada de rendimento, desmotivação e dificuldades de aprendizagem.

No território social e econômico, o impacto se desdobra em diversas camadas:

* **Estudantes e Famílias:** Diminuição da qualificação profissional, aumento da vulnerabilidade social e interrupção de projetos de ascensão social.
* **Instituições de Ensino e Professores:** Dificuldades pedagógicas devido à rotatividade, frustração profissional e piora nos indicadores institucionais que afetam avaliações governamentais.
* **Governo e Sociedade:** Desperdício de recursos públicos investidos na educação básica/técnica, aumento da demanda por programas sociais e políticas compensatórias, redução da produtividade econômica e ampliação das desigualdades sociais.

### Solução Proposta

O **SIMPE** atua como uma ferramenta estratégica de apoio à decisão humana. Ele centraliza dados de frequência, notas e ocorrências para identificar precocemente estudantes em risco e emitir alertas automáticos configuráveis para a equipe multidisciplinar (gestores, pedagogos, psicólogos e assistentes sociais), viabilizando intervenções rápidas e eficazes antes que o abandono se consume.

> **Frase Guia do Projeto:**
> Apoiar gestores, professores e equipes multidisciplinares a identificar precocemente estudantes em risco de evasão e organizar intervenções para aumentar a taxa de permanência e conclusão escolar, reduzindo as desigualdades sociais e fortalecendo o desenvolvimento educacional.

---

## 2. Estrutura do Repositório

Organização de pastas padronizada para facilitar a navegação de desenvolvedores humanos e a leitura contextual por agentes de Inteligência Artificial (IA):

```text
simpe-project/
├── .github/                  # Templates de Pull Request, Issues e Workflows de CI/CD
├── backend/                  # API RESTful (Lógica de negócios e regras de alertas)
│   ├── src/                  # Camadas do Sistema (Controllers, Services, Repositories, Models)
│   ├── config/               # Configurações de segurança (JWT/OAuth 2.0) e LGPD
│   └── pom.xml / package.json
├── frontend/                 # Interface Web Responsiva e Acessível (React)
│   ├── src/                  # Componentes, Páginas, Hooks e Contextos de Acessibilidade
│   └── package.json
├── database/                 # Modelagem e evolução do Banco de Dados
│   ├── migrations/           # Scripts SQL (PostgreSQL) para versionamento de tabelas
│   └── seeds/                # Dados populacionais iniciais para testes de ambiente
└── docs/                     # Documentação de Engenharia e Modelagem de Sistemas
    ├── canvas/               # Canvas de Delimitação do Projeto
    └── requisitos/           # Detalhamento de Requisitos Funcionais e Não Funcionais

```

---

## 3. Como Executar

### Pré-requisitos Técnicos

Antes de iniciar, certifique-se de ter instalado em seu ambiente local:

* **Runtime:** Node.js (v18+) ou Java JDK 17 (dependendo do ambiente backend escolhido).
* **Banco de Dados:** PostgreSQL (v14 ou superior).
* **Gerenciador de Dependências:** NPM ou Maven.

### Passo a Passo para Inicialização

#### 1. Clonar o Repositório e Configurar o Banco de Dados

```bash
git clone https://github.com/seu-usuario/simpe.git
cd simpe

```

* Crie um banco de dados PostgreSQL chamado `simpe_db`.
* Execute as migrações contidas na pasta `/database/migrations/` para estruturar as tabelas relacionais de alunos, frequência, responsáveis e alertas.

#### 2. Executar o Backend

Navegue até a pasta do servidor e configure o arquivo de propriedades/ambiente (`.env` ou `application.properties`) com as credenciais do banco e chaves criptográficas.

```bash
cd backend
npm install   # Caso use Node.js
npm run dev

```

#### 3. Executar o Frontend

Em um novo terminal, inicialize o servidor de desenvolvimento da interface React:

```bash
cd frontend
npm install
npm start

```

A aplicação estará disponível em `http://localhost:3000`.

---

## 4. Como Contribuir

Para manter a consistência do código, a conformidade com a LGPD e a segurança dos dados educacionais, siga as diretrizes abaixo:

### Política de Branches (Git Flow)

* `main`: Código estável homologado em produção.
* `develop`: Integração contínua de novas funcionalidades prontas para teste.
* `feature/*`: Desenvolvimento de novos requisitos (ex: `feature/alerta-frequencia`).
* `hotfix/*`: Correções críticas imediatas feitas a partir da `main`.

### Regras de Pull Request (PR)

1. Crie uma branch específica a partir da `develop`.
2. Garanta que novas implementações de formulários incluam atributos de acessibilidade (leitores de tela e navegação por teclado).
3. Nunca insira chaves de API ou credenciais de banco hardcoded; utilize o gerenciador de variáveis de ambiente.
4. Abra o PR para a branch `develop`, descrevendo as alterações realizadas e vinculando-o à respectiva Issue. Todo PR exige revisão e aprovação de código (Code Review).

---

## 5. Licença e Créditos

### Autoria e Contexto

Este repositório e sua respectiva modelagem de sistemas foram desenvolvidos como produto de engenharia de software da **Atividade em Grupo – Trilha EDA/Permanência** focada no combate à Evasão Escolar.

* **Equipe de Desenvolvimento:** Alunos da Trilha de TI.
* **Data do Planejamento:** Quinta-feira, 02 de Julho de 2026.

### Fontes de Dados e Referências

* Critérios analíticos baseados em indicadores clássicos de evasão (frequência regulamentar e rendimento escolar).
* Regras de privacidade e níveis de acesso projetadas estritamente em conformidade com a **Lei Geral de Proteção de Dados (LGPD)**.

### Licença

Este projeto é licenciado sob a **Licença MIT** - consulte o arquivo `LICENSE` para obter mais detalhes.