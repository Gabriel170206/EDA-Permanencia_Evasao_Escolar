# Documentação Unificada do Banco de Dados - SIMPE

Este documento reúne os artefatos e o status do banco de dados do **SIMPE (Sistema Inteligente de Monitoramento da Permanência Escolar)**[cite: 2].

---

## 1. Schema DBML (`diagrams/database/schema.dbml`)

*(Código DBML omitido conforme solicitado)*

---

## 2. README do Banco de Dados (`database/README.md`)

# Visão Geral do Banco de Dados - SIMPE

Este diretório contém os artefatos e a definição da estrutura do banco de dados do **Sistema Inteligente de Monitoramento da Permanência Escolar (SIMPE)**[cite: 2].

## O que cada tabela representa

As 13 tabelas do sistema estão divididas em 4 grupos funcionais principais[cite: 2]:

### Acesso e Perfis
- **`Perfil`**: Define os papéis e permissões de acesso no sistema (ex.: gestor, coordenador, professor)[cite: 2].
- **`Usuario`**: Usuários cadastrados no sistema para acesso administrativo e pedagógico[cite: 2]. Cada usuário possui um e-mail único e vinculação obrigatória a um perfil[cite: 2].

### Estrutura Escolar
- **`Curso`**: Cursos ofertados pela instituição de ensino[cite: 2].
- **`Turma`**: Turmas associadas a um curso específico e a um ano letivo[cite: 2].
- **`Aluno`**: Cadastro principal dos estudantes, contendo número de matrícula único, turma vinculada e responsável[cite: 2].
- **`Responsavel`**: Contato principal (telefone/e-mail) do responsável legal pelo aluno[cite: 2].
- **`Disciplina`**: Disciplinas/matérias escolares ministradas[cite: 2].

### Acompanhamento Pedagógico
- **`Frequencia`**: Registro diário de presença/falta do aluno em cada turma, incluindo indicação de falta justificada (0 para não, 1 para sim) e justificativa opcional[cite: 2].
- **`Nota`**: Avaliações dos alunos por disciplina e período[cite: 2]. O valor da nota não pode ser negativo[cite: 2].

### Gestão de Risco e Acompanhamento
- **`Ocorrencia`**: Registros comportamentais ou eventos relevantes do aluno no cotidiano escolar, apontados por um usuário[cite: 2].
- **`Intervencao`**: Ações preventivas ou corretivas planejadas/executadas por um usuário para apoiar o aluno (status: `planejada`, `em andamento` ou `concluída`)[cite: 2].
- **`Alerta`**: Notificações automáticas geradas pelo sistema com base em fatores de risco (ex.: faltas consecutivas ou notas abaixo da média)[cite: 2]. Possui marcação de leitura (0 ou 1) e data de geração[cite: 2].
- **`Configuracao_Risco`**: Parâmetros do algoritmo de identificação de risco escolar (ex.: limite de 5 faltas consecutivas, nota mínima 6.0)[cite: 2].

---

## Principais Relacionamentos

- `Perfil` (1) <---> (N) `Usuario` (campo `perfil_id`)[cite: 2]
- `Curso` (1) <---> (N) `Turma` (campo `curso_id`)[cite: 2]
- `Turma` (1) <---> (N) `Aluno` (campo `turma_id`)[cite: 2]
- `Responsavel` (1) <---> (N) `Aluno` (campo `responsavel_id`)[cite: 2]
- `Aluno` (1) <---> (N) `Frequencia` (campo `id_aluno`)[cite: 2]
- `Turma` (1) <---> (N) `Frequencia` (campo `id_turma`)[cite: 2]
- `Aluno` (1) <---> (N) `Nota` (campo `aluno_id`)[cite: 2]
- `Disciplina` (1) <---> (N) `Nota` (campo `disciplina_id`)[cite: 2]
- `Aluno` (1) <---> (N) `Ocorrencia` / `Intervencao` / `Alerta`[cite: 2]
- `Usuario` (1) <---> (N) `Ocorrencia` / `Intervencao`[cite: 2]

---

## Decisões Importantes de Projeto

1. **Padronização do SGBD (SQLite):**
   - Havia uma divergência anterior no repositório onde o arquivo DBML citava `PostgreSQL`, enquanto o arquivo de banco executável e script utilizavam `SQLite`[cite: 2]. Mantivemos e oficializamos o **SQLite** para preservar a tecnologia já existente no repositório (`simpe.db` e `simpe_sqlite.sql`)[cite: 2].

2. **Chaves Estrangeiras e Integridade Referencial:**
   - Ativação obrigatória de `PRAGMA foreign_keys = ON;`[cite: 2].
   - Todos os relacionamentos primários foram marcados como obrigatórios (`NOT NULL`), garantindo que um aluno não exista sem turma ou responsável, e um usuário não exista sem perfil[cite: 2].

3. **Validações de Campo:**
   - Valores booleanos representados numericamente por `0` ou `1` via restrição `CHECK` (`presente`, `falta_justificada`, `lido`)[cite: 2].
   - Restrição `CHECK (valor >= 0)` na tabela de `Nota`[cite: 2].
   - Restrição `CHECK (status IN ('planejada', 'em andamento', 'concluída'))` na tabela `Intervencao`[cite: 2].
   - Restrições `UNIQUE` para `Usuario.email`, `Aluno.matricula` e `Configuracao_Risco.parametro`[cite: 2].

---

## Dúvidas e Pontos de Atenção

1. **Comprimentos Exatos de Texto:** Como o SQLite possui tipagem dinâmica, o tipo `TEXT` atende a todas as colunas[cite: 2]. Caso o Backend venha a utilizar um ORM com validações estritas de tamanho de string (ex.: `VARCHAR(255)`), precisaremos ajustar essas definições de DTO[cite: 2].
2. **Carga Inicial de Dados (Seed):** Necessário confirmar com a equipe de Backend quais parâmetros de risco adicionais deverão vir pré-carregados além dos atuais (limite de 5 faltas e nota mínima 6.0)[cite: 2].

---

## 3. Script SQL do Schema (`database/schema.sql`)

*(Código SQL omitido conforme solicitado)*

---

## 4. Status do Banco de Dados (`database/BANCO_STATUS.md`)

# Status do Banco de Dados - SIMPE

**Status Geral:** `DONE` (Com itens de alinhamento listados em `PARTIAL`)[cite: 2]

---

### DONE (Concluído)

- [x] Mapeamento completo e modelagem conceitual/lógica das 13 tabelas do sistema[cite: 2].
- [x] Padronização e unificação do SGBD como **SQLite** (resolvendo incoerência do DBML legado que citava PostgreSQL)[cite: 2].
- [x] Criação do arquivo DBML (`schema.dbml`) compatível para visualização gráfica no dbdiagram.io[cite: 2].
- [x] Criação do script DDL (`schema.sql`) com suporte total a chaves estrangeiras (`PRAGMA foreign_keys = ON`)[cite: 2].
- [x] Definição de restrições de integridade e regras de negócio no banco (`CHECK` para notas, booleanos e enums de status; `UNIQUE` para matrículas, emails e parâmetros de risco)[cite: 2].
- [x] Garantia de obrigatoriedade (`NOT NULL`) nos relacionamentos essenciais[cite: 2].
- [x] Documentação simples e direta das decisões arquiteturais[cite: 2].

---

### PARTIAL (Em Verificação)

- [ ] **Integração com Backend (ORM/Queries):** Confirmar se o Backend usará SQLite nativo, Prisma, Sequelize ou SQLAlchemy, e validar se o formato das colunas `DATE` / `DATETIME` atende ao padrão esperado pela API[cite: 2].
- [ ] **Formato de Criptografia de Senha:** O campo `Usuario.senha` está preparado para receber hashes (ex.: BCrypt / Argon2)[cite: 2]. Validar tamanho/formato com o time de Backend[cite: 2].
- [ ] **Massa de Dados Inicial (Seeds):** Confirmar os valores definitivos de `Configuracao_Risco` com a coordenação pedagógica e Backend[cite: 2].

---

### BLOCKED (Bloqueado)

- *Nenhum item bloqueado no momento.* O banco de dados está funcional e pronto para consumo do Backend[cite: 2].