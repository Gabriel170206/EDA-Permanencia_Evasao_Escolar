# Dados e Banco de Dados

Esta pasta reúne os artefatos de dados do SIMPE (Sistema Inteligente de Monitoramento da Permanência Escolar). O subdiretório `db` contém o modelo conceitual/visual, o script de criação e carga e uma cópia do banco SQLite.

## Arquivos em `db`

| Arquivo | Tipo | Finalidade |
| --- | --- | --- |
| `dataBase.dbdiagram` | JSON de projeto do dbdiagram.io | Armazena a configuração visual do diagrama, a posição das tabelas e os caminhos dos relacionamentos. Não é o script de criação do banco. |
| `dataBase.dbml` | DBML | Define o modelo lógico do projeto, com 13 tabelas, campos, chaves, referências e anotações. Declara o tipo de banco como PostgreSQL. |
| `simpe_sqlite.sql` | SQL | Script executável para SQLite. Ativa chaves estrangeiras, recria as tabelas, aplica validações e insere dados de referência e exemplos. |
| `simpe.db` | Banco SQLite | Arquivo binário do banco materializado. Possui 77.824 bytes na última verificação. A inspeção detalhada de seu conteúdo depende de um cliente SQLite. |

## Visão geral do modelo

O banco organiza o acompanhamento escolar em quatro grupos principais:

- **Acesso e perfis:** `Perfil` e `Usuario`.
- **Estrutura escolar:** `Curso`, `Turma`, `Aluno`, `Responsavel` e `Disciplina`.
- **Acompanhamento pedagógico:** `Frequencia` e `Nota`.
- **Gestão de risco e acompanhamento:** `Ocorrencia`, `Intervencao`, `Alerta` e `Configuracao_Risco`.

### Tabelas e finalidade

| Tabela | Finalidade | Chave principal |
| --- | --- | --- |
| `Perfil` | Perfis de acesso, como gestor, coordenador e professor. | `id` |
| `Usuario` | Usuários do sistema e seus perfis. | `id` |
| `Responsavel` | Dados de contato dos responsáveis pelos alunos. | `id` |
| `Curso` | Cursos ofertados pela instituição. | `id` |
| `Turma` | Turmas por curso e ano letivo. | `id` |
| `Aluno` | Cadastro do aluno, matrícula, turma e responsável. | `id_aluno` |
| `Disciplina` | Disciplinas avaliadas. | `id` |
| `Frequencia` | Presença diária, falta e justificativa do aluno. | `id` |
| `Nota` | Notas do aluno por disciplina e período. | `id` |
| `Ocorrencia` | Registros de ocorrências associados a alunos e usuários. | `id` |
| `Intervencao` | Ações de acompanhamento, responsável pela ação, status e resultado esperado. | `id` |
| `Alerta` | Alertas de risco gerados para alunos e controle de leitura. | `id` |
| `Configuracao_Risco` | Parâmetros usados na identificação de risco escolar. | `id` |

## Relacionamentos

- `Perfil` 1:N `Usuario` por `Usuario.perfil_id`.
- `Curso` 1:N `Turma` por `Turma.curso_id`.
- `Turma` 1:N `Aluno` por `Aluno.turma_id`.
- `Responsavel` 1:N `Aluno` por `Aluno.responsavel_id`.
- `Aluno` 1:N `Frequencia` por `Frequencia.id_aluno`.
- `Turma` 1:N `Frequencia` por `Frequencia.id_turma`.
- `Aluno` 1:N `Nota` por `Nota.aluno_id`.
- `Disciplina` 1:N `Nota` por `Nota.disciplina_id`.
- `Aluno` 1:N `Ocorrencia`, `Intervencao` e `Alerta`.
- `Usuario` 1:N `Ocorrencia` e `Intervencao`.

## Regras e validações do SQLite

O script `simpe_sqlite.sql` aplica `PRAGMA foreign_keys = ON` e recria as tabelas na ordem correta. Entre as regras implementadas estão:

- nomes, matrículas, e-mails, descrições e parâmetros não podem ser vazios quando obrigatórios;
- `Usuario.email`, `Aluno.matricula` e `Configuracao_Risco.parametro` são únicos;
- `presente`, `falta_justificada` e `lido` aceitam apenas `0` ou `1`;
- `Nota.valor` não pode ser negativa;
- `Intervencao.status` aceita `planejada`, `em andamento` ou `concluída`;
- `Alerta.data_geracao` usa a data/hora atual por padrão.

## Dados iniciais do script

O carregamento de exemplo insere 4 perfis, 4 usuários, 3 responsáveis, 2 cursos, 2 turmas, 3 alunos, 3 disciplinas, 4 registros de frequência, 4 notas, 1 ocorrência, 1 intervenção, 1 alerta e 2 configurações de risco. Os parâmetros incluídos são o limite de 5 faltas consecutivas e a nota mínima de 6,0.

## Observações de consistência

- `dataBase.dbml` informa `PostgreSQL`, mas `simpe_sqlite.sql` e `simpe.db` representam a implementação SQLite. O tipo de banco deve ser padronizado antes de uma implantação definitiva.
- O SQLite exige alguns relacionamentos como obrigatórios (`Usuario.perfil_id`, `Turma.curso_id`, `Aluno.turma_id`, `Aluno.responsavel_id` e outros), enquanto o DBML deixa parte deles opcional. O modelo lógico e o script devem ser alinhados para evitar comportamentos diferentes entre ambientes.
- `dataBase.dbdiagram` é um arquivo de configuração do diagrama e não substitui o DBML nem o script SQL.

## Integrante requisitado

Ryan Corrêa