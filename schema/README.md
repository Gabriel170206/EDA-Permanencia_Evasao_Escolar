# schema

Diretório responsável por manter o esquema de banco de dados e os artefatos de modelagem relacional do projeto SIMPE.

Objetivo:
- centralizar o esquema SQL e a referência para a criação de um banco funcional;
- manter a estrutura de dados em um lugar separado da API e do frontend;
- facilitar o consumo do modelo por backend e integrações futuras.

Arquivos esperados:
- `simpe_sqlite.sql` ou arquivo equivalente de criação de banco;
- cópias de diagramas e documentação de relacionamento.

Regras:
- manter nomes de tabelas e campos consistentes com a convenção do projeto;
- usar o arquivo de schema como fonte de verdade para criação do banco.
