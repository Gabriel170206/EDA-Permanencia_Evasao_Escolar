# Atividade em Grupo

## Integrantes
- Marcus
- Gabriel
- Ryan
- Pedro
- Irislene 

---

## Miniatividade: Casos de Uso Detalhados

**Disciplina:** Modelagem de Sistemas  
**Projeto:** SIMPE - Sistema Inteligente de Monitoramento da Permanência Escolar  
**Data:** 09/07/2026

---

### 1. Escolha do RF Prioritário

Com base na Primeira Lista Rastreável do documento D0, selecionamos:

> **RF004:** O sistema deve emitir um alerta automático quando um aluno acumular 5 ou mais dias consecutivos de falta sem justificativa.

**Justificativa:**  
Este RF atende diretamente à necessidade expressa pelo coordenador na **Fala 1 (Aula 8)** : *"Preciso receber um alerta automático sempre que um aluno faltar muitos dias seguidos"*. É prioritário para intervenção precoce.

---

### 2. Identificação dos Dados Utilizados pelo RF004

Com base no RF004 e nas regras de negócio, os dados necessários são:

| Campo | Descrição | Fonte no documento |
| :--- | :--- | :--- |
| Aluno | Identificação do estudante | RF001 - Cadastro de alunos |
| Frequência diária | Presença/falta por aluno e turma | RF002 |
| Justificativa de falta | Indica se a falta foi justificada | RN001 (faltas sem justificativa) |
| Critério de alerta | Limite de 5 faltas consecutivas | RF004 / RN001 |
| Turma | Turma do aluno | RF001 |

---

### 3. Dicionário de Dados v1

Baseado nos requisitos funcionais RF001, RF002 e RF004:

#### Entidade: `frequencia`

| Atributo | Tipo | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `id_aluno` | Inteiro | Identificador do aluno | Chave estrangeira, NOT NULL |
| `id_turma` | Inteiro | Identificador da turma | Chave estrangeira, NOT NULL |
| `data` | Data | Data da aula | NOT NULL |
| `presente` | Booleano | Indica se o aluno estava presente | NOT NULL |
| `falta_justificada` | Booleano | Indica se a falta foi justificada | NOT NULL, Default = falso |

#### Entidade: `aluno`

| Atributo | Tipo | Descrição | Restrições |
| :--- | :--- | :--- | :--- |
| `id_aluno` | Inteiro | Identificador único | Chave primária |
| `nome` | Texto | Nome do estudante | NOT NULL |
| `matricula` | Texto | Número de matrícula | Único, NOT NULL |
| `turma` | Texto | Turma do aluno | NOT NULL |

---

### 4. Lista de Casos de Uso Candidatos

| ID | Caso de Uso | Ator Principal | Descrição |
| :--- | :--- | :--- | :--- |
| **UC08** | Emitir alerta automático | Sistema | Verifica faltas consecutivas e gera alerta para coordenação |
| **UC09** | Configurar critérios de alerta | Gestor/Coordenação | Ajusta parâmetros como número de faltas para disparo |
| **UC13** | Justificar falta | Coordenação/Secretaria | Registra justificativa para impedir contagem no alerta |

---

### 5. Caso de Uso Detalhado

**UC08 — Emitir alerta automático**

| Elemento | Descrição |
| :--- | :--- |
| **Ator principal** | Sistema (ator não humano) |
| **Objetivo** | Identificar alunos com 5 faltas consecutivas sem justificativa e notificar a coordenação |
| **RF relacionado** | RF004, RF005 |
| **Pré-condição** | Frequências do dia estão registradas (RF002) |
| **Fluxo principal** | 1. Sistema executa rotina diária de verificação <br> 2. Para cada aluno, consulta os últimos 5 dias de frequência <br> 3. Se todas as 5 faltas forem sem justificativa, o sistema gera um alerta <br> 4. Sistema registra o alerta no histórico do aluno (RF007) <br> 5. Sistema exibe notificação na tela e envia e-mail (RF005) |
| **Fluxo alternativo** | **FA01 - Nenhum aluno em risco:** Se nenhum aluno atingir 5 faltas consecutivas, o sistema encerra sem gerar alertas. <br><br> **FA02 - Faltas justificadas:** Se alguma falta entre as 5 consecutivas tiver justificativa, o alerta não é gerado. |
| **Pós-condição** | Alerta é registrado e coordenação é notificada para intervenção |
| **Dados usados** | Frequência (presença, justificativa), aluno, turma, critério de 5 faltas |
| **Regra de negócio** | **RN001:** Um aluno é classificado em "Risco de Evasão" quando possui frequência inferior a 75% ou mais de 3 faltas consecutivas sem justificativa. <br> **RN004:** Cada intervenção registrada deve ter data, descrição, responsável e status. |
| **Critério de aceitação** | **Dado que** um aluno complete 5 dias seguidos de falta sem justificativa, **quando** o sistema executar a rotina de verificação, **então** o sistema deve emitir um alerta em vermelho na tela e enviar notificação imediata para coordenadores cadastrados. |

---

### 6. Registro de Uso da IA (Log)

| Data | Ferramenta | Prompt | Entregável / Aproveitamento | Correções Humanas |
| :--- | :--- | :--- | :--- | :--- |
| 09/07/2026 | ChatGPT | "Com base no documento D0, identifique quais dados são necessários para o sistema verificar se um aluno tem 5 faltas consecutivas." | Lista de campos como aluno, frequência diária e justificativa | Ajustamos os nomes dos campos para o padrão do grupo |
| 09/07/2026 | ChatGPT | "Crie a estrutura do dicionário de dados v1 para a entidade frequência, com tipos e restrições." | Estrutura da tabela `frequencia` com campos e restrições | Incluímos o campo `turma` para melhor rastreabilidade |
| 09/07/2026 | ChatGPT | "Descreva o fluxo principal do caso de uso para o sistema emitir um alerta de faltas." | Roteiro passo a passo para verificação diária e geração do alerta | Adicionamos fluxo alternativo para faltas justificadas |
| 09/07/2026 | ChatGPT | "Gere um critério de aceitação para o RF004 usando o formato Dado que/Quando/Então." | Estrutura do critério de aceitação | Ajustamos para seguir exatamente o formato do documento D0 |

---