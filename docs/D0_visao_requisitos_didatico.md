
<!--
INSTRUÇÕES GERAIS AO GRUPO
1. Substituam todos os campos entre [colchetes].
2. Os exemplos servem apenas como modelo. Não copiem sem adaptar ao projeto de vocês.
3. Apaguem esta caixa de instruções antes da entrega final, se o professor solicitar.
4. Este documento é a versão D0: ele será ampliado nas próximas aulas com casos de uso e diagramas.
-->

# Documento Inicial do Projeto — D0  
## Documento de Visão e Documento de Requisitos

**Instituição:** Instituto Federal do Maranhão — Campus Itapecuru-Mirim  
**Disciplina:** Modelagem de Sistemas com IA Generativa  
**Professor:** Prof. Dr. Thales Levi Azevedo Valente  
**Turma:** Técnico Subsequente  
**Grupo:** Gabriel Rodrigues, Marcus Antônio, Ryan Corrêa, Pedro Eduardo  
**Trilha:** EDA e Permanência Estudantil  
**Nome do projeto:** SIMPE - Sistema Inteligente de Monitoramento da Permanência Escolar  
**Data:** 08/07/2026  
**Versão:** D0  

---

## Controle do Documento

| Versão | Data | Responsáveis | Descrição da alteração |
|---|---|---|---|
| D0 | 02/07/2026 | Marcus, Gabriel, Ryan, Pedro | Primeira versão com visão do projeto e requisitos iniciais. |

---

# Sumário

1. [Introdução](#1-introdução)  
2. [Documento de Visão](#2-documento-de-visão)  
3. [Documento de Requisitos](#3-documento-de-requisitos)  
4. [Registro de Uso da IA](#4-registro-de-uso-da-ia)  
5. [Espaço Reservado para Próximas Etapas](#5-espaço-reservado-para-próximas-etapas)  
6. [Pendências Gerais](#6-pendências-gerais)  

---

# 1. Introdução

## 1.1 Finalidade do documento

Este documento apresenta a versão inicial da visão e dos requisitos do projeto SIMPE - Sistema Inteligente de Monitoramento da Permanência Escolar.  
Ele registra o problema real investigado, o objetivo do sistema, os stakeholders, o escopo inicial, os requisitos levantados até o momento e as pendências que ainda precisam de validação.

## 1.2 Fontes usadas para elaborar esta versão

| Fonte ou atividade | O que foi aproveitado no documento |
|---|---|
| Aula 1 — Problema real e trilha | Definição da trilha EDA/Permanência e identificação do problema da evasão escolar |
| Aula 2 — Entrada, processamento e saída | Mapeamento do fluxo IPO do sistema SIMPE |
| Aula 4 — Uso de IA e log | Registro do uso da IA e validações realizadas |
| Aula 5 — Stakeholders, objetivo, escopo e 5W1H | Identificação de stakeholders, objetivo, escopo e perguntas 5W1H |
| Aula 6 — Plano de coleta e ética | Roteiro de perguntas e plano de coleta com cuidados éticos |
| Aula 8 — Primeira lista rastreável | RFs, RNFs, regras de negócio e critérios de aceitação |
| Aula 9 — Documento de Visão e Documento de Requisitos | Organização final da visão e requisitos em documento único |

---

# 2. Documento de Visão

## 2.1 Identificação do projeto

| Campo | Preenchimento |
|---|---|
| Nome do projeto | SIMPE - Sistema Inteligente de Monitoramento da Permanência Escolar |
| Trilha escolhida | EDA e Permanência Estudantil |
| Problema central | Dificuldade em identificar, em tempo suficiente, padrões de risco de evasão escolar para intervenção pedagógica |
| Público principal | Gestores pedagógicos, professores, equipe de assistência estudantil e coordenação |
| Produto esperado | Dashboard com gráficos, indicadores, alertas automáticos e relatórios EDA |

## 2.2 Problema real

Descreva o problema real que motivou o projeto. O problema deve estar ligado a pessoas, comunidade, escola, território ou gestão.

**Problema real identificado:**  
O principal problema identificado é a evasão escolar, que ocorre quando os alunos deixam de frequentar a escola antes de concluir seus estudos. A dificuldade em identificar, em tempo suficiente, padrões de risco de evasão escolar impede intervenções pedagógicas precoces e efetivas.

**Quem é afetado pelo problema:**  
Estudantes, familiares, professores, gestores escolares e a sociedade.

**Por que o problema importa:**  
É importante reduzir a evasão para aumentar as oportunidades de emprego, melhorar a qualidade de vida e diminuir problemas sociais, como desemprego e desigualdade.

## 2.3 Justificativa

Explique por que vale a pena construir ou modelar esse sistema.

**Justificativa:**  
O projeto é importante porque transforma informações dispersas em conhecimento organizado, ajudando estudantes, professores, gestores e equipes multidisciplinares a compreender melhor o problema da evasão e tomar decisões com mais responsabilidade, promovendo a permanência estudantil e reduzindo desigualdades sociais.

## 2.4 Objetivo do sistema

Use a estrutura:

> Apoiar **[público]** a **[ação]** para **[resultado]**.

**Objetivo geral:**  
Apoiar **gestores, professores e equipes multidisciplinares** a **identificar precocemente estudantes em risco de evasão e organizar intervenções** para **aumentar a taxa de permanência e conclusão escolar, reduzindo as desigualdades sociais e fortalecendo o desenvolvimento educacional.**

## 2.5 Stakeholders

| Tipo | Stakeholder | Interesse ou necessidade | Relação com o sistema |
|---|---|---|---|
| Usuário direto | Gestores Escolares | Utilizar relatórios e dashboards para decisões estratégicas | Acessa o sistema para consultar indicadores e gerar relatórios |
| Usuário direto | Coordenação Pedagógica | Receber alertas e planejar intervenções | Recebe notificações e registra ações |
| Usuário direto | Professores | Alimentar e consultar dados de frequência e notas | Lança frequência, notas e consulta histórico dos alunos |
| Usuário direto | Assistentes Sociais e Psicólogos | Registrar e acompanhar intervenções | Registra atendimentos e visitas |
| Fornecedor de dados | Secretaria da Instituição | Fornecer dados cadastrais dos alunos | Envia dados de matrícula e turmas |
| Validador | Direção e Gestão Escolar | Validar decisões baseadas em dados | Aprova políticas de permanência |
| Gestor ou responsável | Coordenação Pedagógica | Planejar ações de combate à evasão | Define limites e critérios de risco |
| Impactado | Estudantes | Ter seus dados protegidos e receber apoio | São beneficiários finais do sistema |
| Impactado | Responsáveis pelos Estudantes | Acompanhar frequência e rendimento | Acessam notificações restritas |
| Impactado | Sociedade em geral | Ser impactada pelos indicadores sociais | Utiliza relatórios agregados |

## 2.6 Sistema como transformação

Descreva o sistema usando a lógica entrada → processamento → saída.

| Elemento | Descrição |
|---|---|
| Entradas | Dados cadastrais do estudante, turma e responsáveis; registros diários de frequência; notas e médias; ocorrências disciplinares; registros de visitas e atendimentos; credenciais de acesso |
| Processamento | Autenticação e controle de permissões; análise analítica de risco; validação de gatilhos; cálculo de indicadores; atualização da linha do tempo; segurança |
| Saídas | Painel de indicadores (Dashboard); alertas visuais; histórico escolar consolidado; relatórios gerenciais |
| Usuários das saídas | Gestores escolares, coordenação pedagógica, professores, equipe multidisciplinar, responsáveis pelos estudantes e formuladores de políticas públicas |

## 2.7 Escopo inicial

Liste apenas o que será considerado nesta primeira versão.

| ID | Dentro do escopo | Justificativa |
|---|---|---|
| E01 | Cadastro e gestão de dados dos estudantes | Essencial para manter a base de dados do sistema |
| E02 | Registro de frequência, notas e ocorrências disciplinares | Permite monitorar indicadores de risco |
| E03 | Identificação de padrões de risco baseada em regras configuráveis | Viabiliza a detecção precoce de evasão |
| E04 | Geração de alertas e notificações automáticas | Permite intervenção rápida da equipe |
| E07 | Controle de níveis de acesso e permissões | Garante segurança e conformidade |
| E08 | Conformidade com a Lei Geral de Proteção de Dados (LGPD) | Protege dados sensíveis dos estudantes |

## 2.8 Fora do escopo

Liste o que não será feito agora. Isso ajuda a evitar escopo infinito.

| ID | Fora do escopo | Motivo |
|---|---|---|
| FE01 | Integração em tempo real com sistemas acadêmicos oficiais | Complexidade; fica para versão futura |
| FE02 | Aplicativo móvel completo | Versão 1.0 será web responsiva |
| FE05 | Recomendações automáticas de intervenção | Decisões pedagógicas devem ser humanas |

## 2.9 Fronteira do sistema

Explique onde o sistema começa, onde termina e com quais elementos externos ele interage.

| Elemento externo | O que envia ao sistema | O que recebe do sistema |
|---|---|---|
| Professores e Secretaria | Dados de frequência, notas e cadastro de alunos | Confirmação de lançamento e alertas |
| Equipe Multidisciplinar | Registros de intervenções e ocorrências | Histórico consolidado do aluno |
| Coordenação e Gestão | Critérios de risco definidos | Dashboards e relatórios gerenciais |
| Responsáveis pelos estudantes | Não envia dados | Notificações restritas |

## 2.10 Limites e compromissos do projeto

| Compromisso | Como será respeitado |
|---|---|
| Proteger estudantes — não serão usados nomes, matrículas, CPFs ou qualquer identificador direto nos relatórios | Anonimização rigorosa; relatórios agregados sem identificadores individuais |
| Respeitar a LGPD — dados sensíveis devem ser tratados com segurança | Controle de permissões; dados protegidos |
| Alertas devem apoiar, não punir | Alertas são para apoio pedagógico; não geram rankings individuais |
| Correlação não é causalidade | Todo insight gerado deve ser marcado como hipótese até validação humana |
| Dependência de qualidade dos dados | Validar entradas; manter dicionário de dados |

---

# 3. Documento de Requisitos

## 3.1 Requisitos funcionais iniciais

Requisitos funcionais descrevem o que o sistema deve fazer. Use a forma:  
O sistema deve [ação] [objeto/informação].

| ID | Requisito funcional | Ator principal | Prioridade | Fonte ou evidência |
|---|---|---|---|---|
| RF001 | O sistema deve permitir o cadastro e gestão de alunos, turmas, professores e responsáveis. | Secretaria | Alta | Aula 2 — Entrada/Processamento/Saída |
| RF002 | O sistema deve permitir o registro diário de frequência (presença/falta) por aluno e turma. | Professores | Alta | Aula 2 — Entrada/Processamento/Saída |
| RF003 | O sistema deve permitir o lançamento e consulta de notas e médias por aluno e disciplina. | Professores | Alta | Aula 2 — Entrada/Processamento/Saída |
| RF004 | O sistema deve emitir um alerta automático quando um aluno acumular 5 ou mais dias consecutivos de falta sem justificativa. | Coordenação | Alta | Fala 1 — Coordenador (Aula 8) |
| RF005 | O sistema deve permitir visualizar o alerta em forma de notificação na tela e/ou por e-mail. | Coordenação | Alta | Fala 1 — Coordenador (Aula 8) |
| RF006 | O sistema deve gerar um relatório consolidado mensal que cruze dados de faltas e notas baixas agrupadas por turma. | Gestores | Média | Fala 3 — Gestor (Aula 8) |
| RF007 | O sistema deve permitir o registro e acompanhamento do histórico de intervenções realizadas com cada aluno. | Equipe Multidisciplinar | Média | Aula 2 — Entrada/Processamento/Saída |
| RF008 | O sistema deve exibir um dashboard com indicadores de evasão (taxa de evasão, alunos em risco, frequência média). | Gestores | Alta | Aula 2 — Entrada/Processamento/Saída |
| RF009 | O sistema deve permitir a exportação de relatórios em formatos PDF e CSV. | Gestores | Média | Aula 2 — Entrada/Processamento/Saída |
| RF010 | O sistema deve controlar níveis de acesso e permissões por perfil de usuário (Gestor, Professor, Coordenador, etc.). | Todos | Alta | Aula 2 — Entrada/Processamento/Saída |

## 3.2 Requisitos não funcionais iniciais

Requisitos não funcionais descrevem como o sistema deve funcionar ou quais qualidades/restrições ele deve atender.

| ID | Categoria | Requisito não funcional | Como verificar | Prioridade |
|---|---|---|---|---|
| RNF001 | Desempenho | O sistema deve carregar a lista de alunos em no máximo 5 segundos em conexões de 3G. | Teste com simulação de rede 3G | Alta |
| RNF002 | Disponibilidade | O sistema deve sincronizar dados automaticamente quando detectar conexão com a internet após período offline. | Testar em modo offline e verificar sincronização | Média |
| RNF003 | Privacidade | Os relatórios não devem exibir nome, CPF ou qualquer identificador direto do aluno. | Revisar relatório final e confirmar ausência de identificadores | Alta |
| RNF004 | Ética | As análises não devem gerar ranking individual nem recomendação punitiva. | Revisar dashboards e relatórios | Alta |
| RNF005 | Usabilidade | A interface deve ser responsiva e funcionar em dispositivos móveis (celular/tablet). | Testar em diferentes tamanhos de tela | Alta |
| RNF006 | Segurança | O sistema deve proteger dados sensíveis armazenados em banco de dados. | Verificar proteção no banco de dados | Alta |
| RNF007 | Rastreabilidade | O sistema deve manter registros de acesso para auditoria e conformidade com LGPD. | Verificar registro de logs de acesso | Alta |

## 3.3 Regras de negócio iniciais

Regras de negócio são normas do domínio. Elas existem mesmo sem o software.

| ID | Regra de negócio | Justificativa | Fonte ou validação |
|---|---|---|---|
| RN001 | Um aluno é classificado em "Risco de Evasão" quando sua frequência acumulada é inferior a 75% ou possui mais de 3 faltas consecutivas sem justificativa. | Padroniza a identificação de alunos em risco | Fala 1 — Coordenador (Aula 8) |
| RN002 | Apenas coordenadores e gestores podem visualizar a lista completa de alunos em risco. | Protege dados sensíveis | Aula 5 — Stakeholders |
| RN003 | Relatórios consolidados devem ser gerados automaticamente ao fim de cada mês para revisão da política de permanência. | Garante periodicidade na análise | Fala 3 — Gestor (Aula 8) |
| RN004 | Cada intervenção registrada deve ter: data, descrição, responsável e status (planejada/em andamento/concluída). | Garante rastreabilidade das ações | Aula 2 — Processamento |
| RN005 | A nota é considerada "baixa" quando inferior a 6,0 (seis) em qualquer disciplina. | Padroniza a identificação de desempenho insuficiente | Aula 8 — Regras de negócio |

## 3.4 Critérios de aceitação

Use o formato Dado que / Quando / Então para indicar como saber se o requisito foi atendido.

| Requisito relacionado | Dado que | Quando | Então |
|---|---|---|---|
| RF004 | a coordenação está acompanhando as frequências dos alunos | um aluno completar 5 dias seguidos de falta sem justificativa | o sistema deve emitir um alerta em vermelho na tela e enviar notificação imediata para coordenadores cadastrados |
| RF006 | o mês chegou ao fim | o usuário solicita um relatório mensal | o sistema deve exibir uma tabela/gráfico mostrando: turma, total de faltas, alunos com notas < 6.0, e alunos em risco de evasão |
| RF008 | o usuário está logado com perfil de gestor ou coordenador | acessa a página inicial do sistema | deve visualizar: taxa de evasão geral, lista de alunos em risco, frequência média da instituição e evolução mensal dos indicadores |

## 3.5 Matriz de rastreabilidade inicial

A matriz mostra de onde veio cada requisito.

| Evidência ou achado | Necessidade identificada | Requisito relacionado | Status |
|---|---|---|---|
| Fala 1 — Coordenador: "Preciso receber um alerta automático sempre que um aluno faltar muitos dias seguidos" | Emitir alerta automático para intervenção precoce | RF004, RF005 | Validado |
| Fala 2 — Professor: "O sistema precisa abrir a lista de alunos rapidamente no meu celular, em no máximo 5 segundos" | Garantir desempenho em conexões lentas | RNF001, RNF005 | Validado |
| Fala 3 — Gestor: "Gostaria de extrair um relatório consolidado no fim do mês cruzando faltas e notas baixas" | Gerar relatórios mensais consolidados | RF006 | Validado |
| Achado: dados educacionais podem identificar estudantes | Impedir exposição individual | RNF003, RNF004 | Validado |
| Achado: internet da escola oscila | Garantir funcionamento offline | RNF002 | Pendente |

---

# 4. Registro de Uso da IA

Registre como a IA foi usada. A IA pode sugerir, revisar e organizar, mas o grupo deve validar e assumir a responsabilidade pelo conteúdo.

| Data | Ferramenta | Prompt usado | O que foi aproveitado | O que foi corrigido ou descartado | Responsável pela revisão |
|---|---|---|---|---|---|
| 02/07/2026 | ChatGPT | Atue como analista de dados educacionais. Sugira 5 indicadores-chave que podem prever a evasão com base em frequência e notas. | Sugestão de indicadores: frequência inferior a 75%, notas abaixo da média, faltas consecutivas | Ajustamos os limites dos indicadores com base na realidade da escola | Gabriel Rodrigues |
| 03/07/2026 | ChatGPT | Com base nas 3 falas abaixo, classifique como RF, RNF ou Regra de Negócio e escreva os requisitos estruturados. | Classificação correta das falas e estruturação dos requisitos | Ajustamos a redação de dois requisitos para maior clareza | Pedro Eduardo |
| 08/07/2026 | ChatGPT | Organize a lista de requisitos em Documento de Visão e Documento de Requisitos. | Separação do conteúdo em dois blocos | Ajustamos itens do escopo que estavam fora do prazo da versão 1.0 | Marcus Antônio |
| 08/07/2026 | ChatGPT | Revise a consistência entre os requisitos funcionais e não funcionais com o escopo definido. | Identificação de possíveis conflitos entre RFs e RNFs | Ajustamos a prioridade de dois requisitos para melhor alinhamento com o escopo | Ryan Corrêa |

---

# 5. Espaço Reservado para Próximas Etapas

## 5.1 Atores do sistema

| Ator | Descrição | Papel no sistema |
|---|---|---|
| Gestor Escolar | Responsável pela gestão institucional e tomada de decisões estratégicas | Visualiza painéis e relatórios gerenciais, define critérios de alerta e acompanha indicadores gerais de permanência |
| Coordenador Pedagógico | Responsável pelo acompanhamento pedagógico dos estudantes | Consulta alertas de risco, acompanha histórico de intervenções e orienta ações com professores |
| Professor | Responsável pelo registro de frequência, notas e ocorrências em sala de aula | Alimenta o sistema com dados acadêmicos e disciplinares |
| Assistente Social / Psicólogo Escolar | Profissional de apoio que atua em situações de vulnerabilidade | Registra e acompanha atendimentos, visualiza casos com indicadores sociais e emocionais |
| Secretaria da Instituição | Responsável pelos registros administrativos e cadastrais | Cadastra e mantém dados de estudantes, turmas e cursos |
| Responsável pelo Estudante | Familiar ou responsável legal do estudante | Acessa informações restritas sobre frequência, desempenho e evolução do estudante |
| Sistema (Ator não humano) | Módulo automatizado de processamento e análise de dados | Executa a identificação de padrões de risco, gera alertas automáticos e processa os dados recebidos |

---

## 5.2 Casos de uso

| ID | Caso de Uso | Ator principal | Descrição resumida |
|---|---|---|---|
| UC01 | Cadastrar estudante | Secretaria | Registrar um novo estudante no sistema com dados pessoais, matrícula e turma |
| UC02 | Registrar frequência | Professor | Lançar a frequência diária ou semanal dos estudantes por disciplina |
| UC03 | Registrar notas | Professor | Lançar notas de avaliações por disciplina e período letivo |
| UC04 | Registrar ocorrência disciplinar | Professor / Coordenação | Registrar ocorrências como advertências, suspensões ou outros eventos disciplinares |
| UC05 | Registrar intervenção | Coordenação / Assistente Social | Registrar ações realizadas para apoiar o estudante em risco (reuniões, encaminhamentos, etc.) |
| UC06 | Visualizar painel de indicadores | Gestor / Coordenação | Visualizar um painel com indicadores como alunos em risco, frequência média, desempenho e evolução mensal |
| UC07 | Gerar relatório | Gestor / Coordenação | Gerar relatórios com dados de frequência, notas, ocorrências e intervenções |
| UC08 | Emitir alerta automático | Sistema | Identificar estudantes que atingiram os critérios de risco e emitir alerta para a coordenação |
| UC09 | Configurar critérios de alerta | Gestor / Coordenação | Definir ou ajustar os parâmetros que disparam os alertas de risco |
| UC10 | Acompanhar evolução do caso | Coordenação / Assistente Social | Visualizar o histórico de intervenções e a evolução dos indicadores do estudante |
| UC11 | Controlar acesso | Sistema | Gerenciar perfis de usuário e permissões de acesso conforme o papel de cada ator |
| UC12 | Importar dados CSV | Secretaria | Importar arquivos CSV com dados de estudantes, frequência e notas |

---

## 5.3 Descrição detalhada dos casos de uso

### UC01 — Cadastrar estudante

| Elemento | Descrição |
|---|---|
| *Ator principal* | Secretaria |
| *Pré-condições* | O ator está autenticado com perfil de acesso permitido. |
| *Fluxo principal* | 1. O ator acessa a tela de cadastro de estudante. 2. Preenche os campos obrigatórios (nome, matrícula, turma, curso, contato). 3. Confirma o cadastro. 4. O sistema valida os dados e salva o registro. 5. O sistema exibe mensagem de confirmação. |
| *Fluxo alternativo* | Se algum campo obrigatório estiver vazio, o sistema exibe mensagem de erro e solicita o preenchimento. |
| *Pós-condições* | O estudante é cadastrado no sistema e pode ser vinculado a registros de frequência, notas e ocorrências. |
| *Regras de negócio* | CPF e matrícula devem ser únicos no sistema. |

---

### UC02 — Registrar frequência

| Elemento | Descrição |
|---|---|
| *Ator principal* | Professor |
| *Pré-condições* | O professor está autenticado e possui turmas vinculadas ao seu perfil. |
| *Fluxo principal* | 1. O ator seleciona a turma e a disciplina. 2. Seleciona a data ou período. 3. Registra a frequência de cada estudante (presente/ausente). 4. Confirma o lançamento. 5. O sistema armazena os dados e atualiza o histórico do estudante. |
| *Pós-condições* | A frequência é registrada e passa a compor os indicadores de risco do estudante. |

---

### UC03 — Registrar notas

| Elemento | Descrição |
|---|---|
| *Ator principal* | Professor |
| *Pré-condições* | O professor está autenticado e possui turmas vinculadas ao seu perfil. |
| *Fluxo principal* | 1. O ator seleciona a turma e a disciplina. 2. Seleciona a avaliação (bimestre, trimestre, etc.). 3. Lança as notas de cada estudante. 4. Confirma o lançamento. 5. O sistema armazena os dados e atualiza o histórico do estudante. |
| *Pós-condições* | As notas são registradas e passam a compor os indicadores de risco do estudante. |

---

### UC04 — Registrar ocorrência disciplinar

| Elemento | Descrição |
|---|---|
| *Ator principal* | Professor / Coordenação |
| *Pré-condições* | O ator está autenticado com perfil de acesso permitido. |
| *Fluxo principal* | 1. O ator busca o estudante. 2. Acessa o registro de ocorrências. 3. Preenche os campos (tipo de ocorrência, data, descrição, responsável). 4. Confirma o registro. 5. O sistema salva a ocorrência e a vincula ao histórico do estudante. |
| *Pós-condições* | A ocorrência é registrada e fica disponível para consulta em relatórios e indicadores. |

---

### UC05 — Registrar intervenção

| Elemento | Descrição |
|---|---|
| *Ator principal* | Coordenação / Assistente Social |
| *Pré-condições* | O ator está autenticado com perfil de acesso permitido. |
| *Fluxo principal* | 1. O ator busca o estudante. 2. Acessa o registro de intervenções. 3. Preenche os campos (tipo de intervenção, data, descrição, responsável, resultado esperado). 4. Confirma o registro. 5. O sistema salva a intervenção e a vincula ao histórico do estudante. |
| *Pós-condições* | A intervenção é registrada e passa a compor o histórico de acompanhamento do estudante. |

---

### UC06 — Visualizar painel de indicadores

| Elemento | Descrição |
|---|---|
| *Ator principal* | Gestor / Coordenação |
| *Pré-condições* | O ator está autenticado com perfil de acesso permitido. |
| *Fluxo principal* | 1. O ator acessa o painel principal. 2. O sistema exibe os indicadores (alunos em risco, frequência média, desempenho, evolução mensal). 3. O ator pode aplicar filtros (curso, turma, período). 4. O sistema atualiza os dados conforme os filtros aplicados. |
| *Regras de negócio* | Os dados exibidos não devem conter identificadores diretos (nome, matrícula, CPF) — conforme RNF002. |

---

### UC07 — Gerar relatório

| Elemento | Descrição |
|---|---|
| *Ator principal* | Gestor / Coordenação |
| *Pré-condições* | O ator está autenticado com perfil de acesso permitido. |
| *Fluxo principal* | 1. O ator acessa a tela de relatórios. 2. Seleciona o tipo de relatório (risco, frequência, desempenho, intervenções). 3. Aplica filtros (período, turma, curso). 4. O sistema gera o relatório e exibe para visualização ou exportação. |
| *Pós-condições* | O relatório é gerado e pode ser exportado em formato PDF ou CSV. |

---

### UC08 — Emitir alerta automático

| Elemento | Descrição |
|---|---|
| *Ator principal* | Sistema (ator não humano) |
| *Pré-condições* | O sistema possui dados de frequência, notas e ocorrências atualizados. |
| *Fluxo principal* | 1. O sistema executa a rotina de verificação de risco (diária ou semanal). 2. Identifica estudantes que atingiram os critérios configurados. 3. Gera alertas para a coordenação e gestores. 4. Registra o alerta no histórico do estudante. |
| *Fluxo alternativo* | Se nenhum estudante atingir os critérios, o sistema não gera alertas. |
| *Regras de negócio* | Os critérios de alerta são configuráveis (RN002). O alerta é uma hipótese até validação humana (RNF007). |

---

### UC09 — Configurar critérios de alerta

| Elemento | Descrição |
|---|---|
| *Ator principal* | Gestor / Coordenação |
| *Pré-condições* | O ator está autenticado com perfil de acesso permitido. |
| *Fluxo principal* | 1. O ator acessa a tela de configuração de alertas. 2. Define ou ajusta os parâmetros (ex: frequência mínima, quantidade de notas baixas, etc.). 3. Confirma as alterações. 4. O sistema valida e salva as novas configurações. |
| *Pós-condições* | Os novos critérios passam a ser aplicados nas próximas execuções da rotina de alerta. |

---

### UC10 — Acompanhar evolução do caso

| Elemento | Descrição |
|---|---|
| *Ator principal* | Coordenação / Assistente Social |
| *Pré-condições* | O ator está autenticado com perfil de acesso permitido. |
| *Fluxo principal* | 1. O ator busca o estudante. 2. Acessa o histórico do estudante. 3. Visualiza a evolução dos indicadores (frequência, notas, ocorrências, intervenções). 4. O sistema exibe os dados organizados em linha do tempo. |
| *Pós-condições* | O ator tem uma visão consolidada do acompanhamento do estudante. |

---

### UC11 — Controlar acesso

| Elemento | Descrição |
|---|---|
| *Ator principal* | Sistema |
| *Pré-condições* | O usuário está autenticado. |
| *Fluxo principal* | 1. O sistema identifica o perfil do usuário autenticado. 2. Libera ou restringe o acesso a funcionalidades conforme o nível de permissão. 3. Registra logs de acesso e ações realizadas (RNF004). |
| *Regras de negócio* | Cada perfil (gestor, coordenação, professor, responsável) tem níveis de acesso distintos. |

---

### UC12 — Importar dados CSV

| Elemento | Descrição |
|---|---|
| *Ator principal* | Secretaria |
| *Pré-condições* | O ator está autenticado com perfil de acesso permitido. |
| *Fluxo principal* | 1. O ator acessa a tela de importação. 2. Seleciona o tipo de dado (estudantes, frequência, notas). 3. Seleciona o arquivo CSV. 4. O sistema valida o formato e processa os dados. 5. O sistema exibe mensagem de confirmação. |
| *Fluxo alternativo* | Se o arquivo estiver com formato inválido, o sistema exibe mensagem de erro. |
| *Pós-condições* | Os dados são importados e integrados ao sistema. |

---

## 5.4 Diagramas

[preencher nas próximas aulas]

| Diagrama | Status | Arquivo previsto |
|---|---|---|
| Diagrama de casos de uso | Pendente | diagramas/casos_de_uso.puml |
| Diagrama de atividades | Pendente | diagramas/atividades.puml |
| Diagrama de classes | Pendente | diagramas/classes.puml |
| Diagrama de sequência | Pendente | diagramas/sequencia.puml |

---

# 6. Pendências Gerais

| ID | Pendência ou dúvida | Quem deve validar | Prazo previsto |
|---|---|---|---|
| P001 | Validar com a coordenação se o critério de 5 faltas consecutivas é o mais adequado | Coordenação Pedagógica | 15/07/2026 |
| P002 | Confirmar disponibilidade de base de dados fictícia para testes | Professor | 15/07/2026 |
| P003 | Definir fluxo exato de notificações | Grupo + Stakeholder | 15/07/2026 |
| P004 | Validar com a equipe pedagógica os campos obrigatórios para registro de intervenção | Equipe Multidisciplinar | 15/07/2026 |

---

## Declaração do grupo

Declaramos que esta versão D0 foi elaborada com base nas atividades realizadas em sala, nas discussões do grupo e no uso responsável de IA generativa. O grupo revisou o conteúdo, corrigiu sugestões inadequadas e assume responsabilidade pelas informações registradas.

**Integrantes:**  
- Gabriel  Rodrigues
- Marcus  Antônio
- Ryan  Corrêa 
- Pedro  Eduardo

**Data:** 08/07/2026
