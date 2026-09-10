# 📄 Documentação Técnica - Módulo Backend

## 1. Visão Geral
O módulo de Backend (v1.0.0) atua como o núcleo lógico do sistema, fornecendo uma API RESTful para comunicação com o front-end. Ele é responsável por processar requisições, aplicar regras de negócio e fornecer os dados necessários para as interfaces de painéis, relatórios e gestão de alunos.

* **Equipe Responsável:** Ryan Corrêa e Marcus Antônio
* **Status Atual:** Protótipo Funcional (Dados em memória / Mock)

## 2. Tecnologias e Dependências
O ambiente foi construído utilizando o ecossistema JavaScript/Node.js, com as seguintes bibliotecas principais:
* **Express (v5.2.1):** Framework principal utilizado para a criação do servidor, roteamento de endpoints e processamento de requisições JSON (`express.json()`).
* **CORS (v2.8.6):** Middleware integrado para permitir requisições seguras de diferentes origens (Cross-Origin Resource Sharing), facilitando a comunicação com a interface de usuário.

## 3. Arquitetura de Dados (Fase de Prototipagem)
Atualmente, para viabilizar testes rápidos e a integração com o front-end, o banco de dados foi simulado utilizando estruturas de dados em memória (arrays locais). As entidades mapeadas são:

* **Alunos:** Registros de estudantes contendo matrícula, nome, turma, total de faltas, média de notas e status de risco (ex: *ok, atenção, crítico*).
* **Alertas:** Avisos gerados pelo sistema indicando alunos com excesso de faltas ou em situação de risco.
* **Notas:** Histórico de avaliações, incluindo as notas parciais (n1, n2), média final e status de aprovação.
* **Intervenções:** Ações tomadas pela equipe multidisciplinar (professores, coordenação, assistentes sociais) para auxiliar alunos em risco.
* **Relatórios:** Estatísticas consolidadas por turma (frequência, notas baixas, nível de risco global).

## 4. Referência da API (Endpoints REST)
A API responde no prefixo `/api` e padroniza a troca de informações no formato JSON.

### 📊 Dashboard e Relatórios
| Método | Endpoint | Descrição | Parâmetros (Query) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Retorna os KPIs principais (alunos em risco, frequência média, alertas de hoje, taxa de evasão). | - |
| `GET` | `/api/relatorios` | Retorna estatísticas consolidadas por turma. | `turma` (Opcional: filtra por turma específica). |

### 🎓 Gestão de Alunos
| Método | Endpoint | Descrição | Parâmetros (Query) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/alunos` | Lista alunos matriculados. | `busca` (nome ou matrícula), `filtro` (status do risco). |

### ⚠️ Alertas e Frequência
| Método | Endpoint | Descrição | Corpo da Requisição (Body) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/alertas` | Lista os alertas de evasão ou risco. | - |
| `POST` | `/api/frequencia` | Registra a lista de chamada/frequência. | Array de presença/falta. |

### 📝 Notas e Avaliações
| Método | Endpoint | Descrição | Corpo da Requisição (Body) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/notas` | Retorna o boletim e médias dos alunos. | - |
| `POST` | `/api/notas` | Cadastra uma nova nota para um aluno. | Objeto contendo matrícula e valores (n1, n2). |

### 🤝 Intervenções
| Método | Endpoint | Descrição | Corpo da Requisição (Body) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/intervencoes` | Lista as ações corretivas/preventivas realizadas. | - |
| `POST` | `/api/intervencoes` | Registra uma nova intervenção. | Objeto com dados do aluno, descrição, responsável e data. |

## 5. Configuração e Execução
O servidor é inicializado através do arquivo principal `server.js`.

**Passo a passo para rodar localmente:**
1. Certifique-se de ter o Node.js instalado.
2. Na raiz da pasta `backend`, instale as dependências:
   ```bash
   npm install
