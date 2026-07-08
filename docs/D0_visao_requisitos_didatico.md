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
**Turma:** [INFO200-SUBSEQUENTE]  
**Grupo:** [Gabriel Rodrigues, Pedro Eduardo, Marcus Antônio, Ryan Corrêa]  
**Trilha:** EDA e Permanência Estudantil  
**Nome do projeto:** Sistema Inteligente de Monitoramento da Permanência Escolar (SIMPE)  
**Data:** 02/07/2026  
**Versão:** D0  

---

## Controle do Documento

| Versão | Data | Responsáveis | Descrição da alteração |
|---|---|---|---|
| D0 | 02/07/2026 | Gabriel Rodrigues, Pedro Eduardo, Marcus Antônio, Ryan Corrêa | Primeira versão com visão do projeto e requisitos iniciais. |

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

Este documento apresenta a versão inicial da visão e dos requisitos do projeto **Sistema Inteligente de Monitoramento da Permanência Escolar (SIMPE)**.  
Ele registra o problema real investigado, o objetivo do sistema, os stakeholders, o escopo inicial, os requisitos levantados até o momento e as pendências que ainda precisam de validação.

## 1.2 Fontes usadas para elaborar esta versão

| Fonte ou atividade | O que foi aproveitado no documento |
|---|---|
| Aula 1 — Problema real e trilha | Definição do tema evasão escolar e da trilha EDA/Permanência. |
| Aula 2 — Entrada, processamento e saída | Identificação das entradas, como frequência, notas e registros de acompanhamento. |
| Aula 4 — Uso de IA e log | Registro do uso da IA para organização e revisão do conteúdo. |
| Aula 5 — Stakeholders, objetivo, escopo e 5W1H | Definição dos stakeholders, do objetivo do sistema, do escopo inicial e do canvas de delimitação do projeto. |
| Aula 6 — Plano de coleta e ética | Considerações sobre privacidade, segurança e tratamento dos dados conforme a LGPD. |
| Aula 8 — Primeira lista rastreável | Primeiros requisitos funcionais e não funcionais escritos a partir dos achados. |
| Aula 9 — Documento de Visão e Documento de Requisitos | Estruturação do documento de visão e dos requisitos iniciais. |

---

# 2. Documento de Visão

## 2.1 Identificação do projeto

| Campo | Preenchimento |
|---|---|
| Nome do projeto | Sistema Inteligente de Monitoramento da Permanência Escolar (SIMPE) |
| Trilha escolhida | EDA e Permanência Estudantil |
| Problema central | A evasão escolar, entendida não apenas como abandono dos estudos, mas como resultado de fatores que se acumulam ao longo da vida acadêmica do estudante. |
| Público principal | Estudantes em risco de evasão, gestores escolares, coordenação pedagógica, professores, assistentes sociais, psicólogos escolares, secretaria da instituição e responsáveis pelos estudantes. |
| Produto esperado | Um sistema inteligente de monitoramento da permanência escolar que identifique precocemente estudantes em risco de evasão e auxilie intervenções. |

## 2.2 Problema real

**Problema real identificado:**  
A evasão escolar. Em muitos casos, o aluno não deixa a escola de forma repentina; antes disso, apresenta sinais como faltas frequentes, baixo rendimento, desmotivação, dificuldades de aprendizagem e pouco envolvimento com as atividades escolares. Muitos estudantes precisam conciliar os estudos com o trabalho para complementar a renda familiar. Outras questões como violência, gravidez precoce, problemas de saúde mental, bullying e falta de transporte dificultam a permanência na escola.

**Quem é afetado pelo problema:**  
Os principais afetados são os próprios estudantes. As famílias, os professores, as instituições de ensino, o governo, o mercado de trabalho e a sociedade também são afetados.

**Por que o problema importa:**  
A evasão escolar reduz as oportunidades de qualificação profissional, aumenta a vulnerabilidade social, compromete o desenvolvimento econômico e social e limita o exercício pleno da cidadania.

## 2.3 Justificativa

**Justificativa:**  
Combater a evasão escolar significa investir no desenvolvimento sustentável da sociedade. O sistema pode apoiar gestores, professores e equipes multidisciplinares a identificar precocemente estudantes em risco e organizar intervenções mais rápidas e eficientes.

## 2.4 Objetivo do sistema

**Objetivo geral:**  
Apoiar gestores, professores e equipes multidisciplinares a identificar precocemente estudantes em risco de evasão e organizar intervenções para aumentar a taxa de permanência e conclusão escolar, reduzindo as desigualdades sociais e fortalecendo o desenvolvimento educacional.

## 2.5 Stakeholders

| Tipo | Stakeholder | Interesse ou necessidade | Relação com o sistema |
|---|---|---|---|
| Usuário direto | Gestores escolares | Identificar estudantes em risco e apoiar decisões institucionais | Utilizam o sistema para acompanhar indicadores e acompanhar intervenções |
| Usuário direto | Coordenação pedagógica | Acompanhar estudantes em risco e orientar ações pedagógicas | Utiliza o sistema para consultar alertas, relatórios e histórico de acompanhamento |
| Usuário direto | Professores | Registrar frequência, notas e ocorrências | Alimentam o sistema com dados acadêmicos e disciplinares |
| Usuário direto | Assistentes sociais e psicólogos escolares | Acompanhar situações de vulnerabilidade e apoiar intervenções | Utilizam o sistema para registrar e acompanhar atendimentos |
| Fornecedor de dados | Secretaria da instituição | Organizar cadastros e registros acadêmicos | Fornece dados de estudantes, turmas e registros administrativos |
| Validador | Gestores e coordenação pedagógica | Validar alertas e decisões de intervenção | Avaliam os dados e orientam as ações a serem realizadas |
| Impactado | Estudantes | Permanecer na escola e concluir sua formação | São afetados pelas decisões e intervenções apoiadas pelo sistema |
| Impactado | Responsáveis pelos estudantes | Acompanhar a permanência e o desenvolvimento escolar | Acessam informações restritas sobre o estudante |

## 2.6 Sistema como transformação

| Elemento | Descrição |
|---|---|
| Entradas | Dados do estudante, turma, frequência, notas, ocorrências disciplinares, histórico escolar, registros de acompanhamento e intervenções. |
| Processamento | Organizar os dados, identificar padrões de risco, emitir alertas automáticos, registrar intervenções e acompanhar evolução dos casos. |
| Saídas | Painel com indicadores de evasão, alertas, relatórios, histórico acadêmico e evolução dos casos. |
| Usuários das saídas | Gestores escolares, coordenação pedagógica, professores, assistentes sociais, psicólogos escolares e responsáveis pelos estudantes. |

## 2.7 Escopo inicial

| ID | Dentro do escopo | Justificativa |
|---|---|---|
| E01 | Cadastrar estudantes | É a base para o acompanhamento da permanência escolar. |
| E02 | Registrar frequência e integrar notas e desempenho acadêmico | Esses dados são fundamentais para identificar sinais de risco. |
| E03 | Registrar ocorrências disciplinares e intervenções realizadas | Permite acompanhar ações e evolução dos casos. |
| E04 | Identificar padrões de risco, emitir alertas automáticos e gerar relatórios gerenciais | São as principais funcionalidades de apoio à decisão. |

## 2.8 Fora do escopo

| ID | Fora do escopo | Motivo |
|---|---|---|
| FE01 | Substituir a análise humana e as ações pedagógicas ou assistenciais | O software apoia a decisão, mas não elimina sozinho a evasão escolar. |
| FE02 | Identificar sozinho todas as causas da evasão escolar | Situações familiares, emocionais e socioeconômicas muitas vezes não aparecem nos registros acadêmicos. |
| FE03 | Garantir que todos os alertas sejam totalmente precisos | Alertas automáticos podem gerar falsos positivos ou deixar de identificar casos específicos. |

## 2.9 Fronteira do sistema

| Elemento externo | O que envia ao sistema | O que recebe do sistema |
|---|---|---|
| Professores | Frequência, notas e ocorrências | Alertas, histórico e relatórios de acompanhamento |
| Secretaria da instituição | Dados cadastrais e registros administrativos | Informações organizadas para gestão e acompanhamento |
| Coordenação e gestores | Critérios de acompanhamento e decisões de intervenção | Painel de indicadores, relatórios gerenciais e evolução dos casos |
| Responsáveis pelos estudantes | Solicitações de acompanhamento e acesso restrito | Informações do próprio estudante, com acesso restrito |

## 2.10 Limites e compromissos do projeto

| Compromisso | Como será respeitado |
|---|---|
| Proteger os dados pessoais e educacionais | O sistema deve seguir medidas de segurança, autenticação segura, criptografia, controle de permissões e tratamento conforme a LGPD. |
| Apoiar a permanência, sem substituir a análise humana | As informações produzidas pelo sistema devem servir como apoio à decisão e não substituir a análise humana realizada por professores, gestores e equipes multiprofissionais. |
| Usar dados para prevenção e apoio | Os relatórios e alertas devem ser usados para apoiar intervenções e ações de permanência estudantil. |

---

# 3. Documento de Requisitos

## 3.1 Requisitos funcionais iniciais

| ID | Requisito funcional | Ator principal | Prioridade | Fonte ou evidência |
|---|---|---|---|---|
| RF001 | O sistema deve cadastrar estudantes com dados como nome, matrícula, turma, curso e informações de contato. | Secretaria | Alta | Requisitos funcionais do sistema |
| RF002 | O sistema deve registrar frequência, notas e desempenho acadêmico por disciplina. | Professores | Alta | Requisitos funcionais do sistema |
| RF003 | O sistema deve registrar ocorrências disciplinares e intervenções realizadas com data, descrição e responsável. | Professores/Coordenação | Alta | Requisitos funcionais do sistema |
| RF004 | O sistema deve identificar padrões de risco e emitir alertas automáticos quando os critérios definidos forem atingidos. | Sistema/Coordenação | Alta | Fluxo básico e funcionalidades principais |
| RF005 | O sistema deve gerar relatórios e exibir um painel com indicadores como alunos em risco, frequência média, desempenho e evolução mensal. | Gestores/Coordenação | Alta | Relatórios e painel de indicadores |
| RF006 | O sistema deve controlar níveis de acesso por perfil de usuário (gestor, coordenação, professor e responsável). | Sistema | Alta | Níveis de acesso |
| RF007 | O sistema deve importar arquivos CSV com dados de estudantes, frequência e notas. | Secretaria | Média | Requisitos funcionais do sistema |
| RF008 | O sistema deve acompanhar a evolução dos casos registrados, mostrando histórico de intervenções e mudanças nos indicadores. | Coordenação/Gestores | Alta | Fluxo básico |

## 3.2 Requisitos não funcionais iniciais

| ID | Categoria | Requisito não funcional | Como verificar | Prioridade |
|---|---|---|---|---|
| RNF001 | Segurança | O sistema deve garantir autenticação segura com criptografia das informações sensíveis. | Validar a criptografia de dados no banco e a complexidade da autenticação. | Alta |
| RNF002 | Privacidade | Os relatórios e painéis não devem exibir nome, matrícula, CPF ou qualquer identificador direto dos estudantes. | Revisar relatórios e telas geradas e confirmar ausência de dados identificáveis. | Alta |
| RNF003 | Conformidade | O sistema deve tratar os dados conforme a Lei Geral de Proteção de Dados (LGPD). | Realizar auditoria de conformidade com a LGPD. | Alta |
| RNF004 | Segurança | O sistema deve controlar permissões e registrar logs de acesso e ações dos usuários. | Testar acessos com diferentes perfis e verificar logs de auditoria. | Alta |
| RNF005 | Usabilidade | A interface deve ser acessível, compatível com leitores de tela, navegação por teclado e contraste adequado. | Testar com ferramentas de acessibilidade e usuários com necessidades específicas. | Alta |
| RNF006 | Desempenho | O processamento da base de dados deve ser concluído em no máximo 5 minutos. | Medir tempo de processamento com bases de dados representativas. | Alta |
| RNF007 | Ética e transparência | Todo insight gerado por IA deve ser marcado como hipótese até validação humana e deve indicar a base usada. | Verificar a rotulagem de insights e a documentação das evidências. | Alta |

## 3.3 Regras de negócio iniciais

| ID | Regra de negócio | Justificativa | Fonte ou validação |
|---|---|---|---|
| RN001 | Um aluno é classificado em "Risco de Evasão" quando sua frequência acumulada é inferior a 75% ou possui mais de 3 notas abaixo de 6.0. | Define critério objetivo para identificação de risco. | Aula 8 — Exemplo EDA/Permanência |
| RN002 | Os critérios para emissão de alertas devem ser configuráveis pela instituição. | Evita decisões baseadas apenas em um único indicador. | Notificações inteligentes |
| RN003 | As informações produzidas pelo sistema devem servir como apoio à decisão e não substituir a análise humana. | O software não elimina sozinho a evasão escolar. | Limitações do sistema |
| RN004 | Resultados de análise não podem ser usados para punição individual de estudantes. | O objetivo do projeto é apoiar permanência, não responsabilizar individualmente. | Aula 8 — Compromisso ético |
| RN005 | A evasão é caracterizada após 15 dias consecutivos de falta sem justificativa legal. | Define marco temporal para caracterização de evasão. | Aula 8 — Exemplo EDA/Permanência |
| RN006 | A base de dados utilizada deve ser fictícia ou anonimizada. | Protege a privacidade dos estudantes e cumpre a LGPD. | Aula 8 — Exemplo EDA/Permanência |
| RN007 | O tratamento dos dados pessoais e educacionais deve respeitar a LGPD. | Os dados tratados pelo sistema são sensíveis e necessitam de proteção adequada. | Segurança e LGPD |

## 3.4 Critérios de aceitação

| Requisito relacionado | Dado que | Quando | Então |
|---|---|---|---|
| RF001 | o usuário está na tela de cadastro de estudante | ele preenche os campos obrigatórios e confirma o cadastro | o sistema deve salvar o registro e exibir mensagem de confirmação |
| RF002 | o professor está na tela de registro de frequência e notas | ele seleciona a turma e registra as informações | o sistema deve armazenar os dados e atualizar o histórico do estudante |
| RF004 | o sistema possui registros de frequência, notas e ocorrências | um estudante atingir os critérios de risco definidos pela instituição | o sistema deve identificar o estudante como em risco e gerar alerta |
| RF005 | o gestor solicita um relatório ou painel de acompanhamento | o relatório é gerado | o sistema deve exibir indicadores como alunos em risco, frequência e evolução mensal |
| RNF002 | o gestor solicita um relatório de alunos em risco | o relatório é gerado | o relatório não deve exibir nome, matrícula, CPF ou identificador direto |
| RF006 | um usuário tenta acessar uma funcionalidade do sistema | ele está autenticado com seu perfil | o sistema deve controlar o acesso de acordo com os níveis de permissão |

## 3.5 Matriz de rastreabilidade inicial

| Evidência ou achado | Necessidade identificada | Requisito relacionado | Status |
|---|---|---|---|
| A evasão escolar é um problema multidimensional e exige acompanhamento contínuo | Organizar informações para apoiar a permanência escolar | RF004, RF005, RF008 | Validado |
| O sistema deve registrar frequência, notas, ocorrências e intervenções | Acompanhar sinais de risco acadêmico, disciplinar e assistencial | RF002, RF003 | Validado |
| O sistema trata dados pessoais e educacionais | Proteger a privacidade e cumprir a LGPD | RNF001, RNF002, RNF003, RNF004 | Validado |
| Alertas devem ser configuráveis pela instituição | Evitar decisões baseadas em um único indicador | RF004, RN001, RN002 | Validado |
| "Preciso saber quais alunos estão em risco de abandonar o semestre para agir preventivamente" | Emitir alertas semanais para coordenação | RF004, RF005 | Aula 8 — Necessidade do gestor |
| "Correlação não implica causalidade" | Garantir que IA seja apoio, não decisão | RNF007 | Aula 2 — Exemplo EDA/Permanência |

---

# 4. Registro de Uso da IA

| Data | Ferramenta | Prompt usado | O que foi aproveitado | O que foi corrigido ou descartado | Responsável pela revisão |
|---|---|---|---|---|---|
| 02/07/2026 | ChatGPT | "Atue como um analista de dados educacionais. Estamos criando um sistema de alerta precoce para evasão escolar no IFMA. Sugira 5 indicadores-chave (KPIs) que podem prever a evasão com base em frequência e notas." | Sugestão de indicadores como frequência abaixo de 75% e múltiplas notas baixas. | Ajustamos os indicadores para a realidade do IFMA e removemos sugestões que envolviam dados sensíveis. | Gabriel Rodrigues |
| 03/07/2026 | ChatGPT | "Atue como um engenheiro de requisitos. Organize esta lista de necessidades em requisitos funcionais e não funcionais." | Estruturação inicial dos RFs e RNFs. | Removemos requisitos que envolviam uso punitivo de dados e ajustamos a redação técnica. | Pedro Eduardo |
| 08/07/2026 | ChatGPT | "Separe o conteúdo em Documento de Visão e Documento de Requisitos." | Organização geral do documento e estruturação das seções. | Ajustamos stakeholders, escopo e objetivos conforme o Canvas de Delimitação preenchido pelo grupo. | Marcus Antônio |
| 08/07/2026 | ChatGPT | "Atue como um engenheiro de requisitos sênior. Com base no texto fornecido, gere uma lista de requisitos funcionais e não funcionais para o sistema de permanência escolar. Não invente dados. Marque dúvidas como pendentes." | Revisão e complementação dos RFs, RNFs e regras de negócio. | Validamos cada sugestão com o conteúdo fornecido e descartamos alucinações. | Ryan Corrêa |

---

# 5. Espaço Reservado para Próximas Etapas

As seções abaixo serão preenchidas nas próximas aulas. Por enquanto, deixem apenas os títulos.

## 5.1 Atores do sistema

[preencher nas próximas aulas]

## 5.2 Casos de uso

[preencher nas próximas aulas]

## 5.3 Descrição detalhada dos casos de uso

[preencher nas próximas aulas]

## 5.4 Diagramas

| Diagrama | Status | Arquivo previsto |
|---|---|---|
| Diagrama de casos de uso | Pendente | `diagramas/casos_de_uso.puml` |
| Diagrama de atividades | Pendente | `diagramas/atividades.puml` |
| Diagrama de classes | Pendente | `diagramas/classes.puml` |
| Diagrama de sequência | Pendente | `diagramas/sequencia.puml` |

---

# 6. Pendências Gerais

| ID | Pendência ou dúvida | Quem deve validar | Prazo previsto |
|---|---|---|---|
| P001 | Definir os critérios específicos que serão configuráveis para alertas de risco | Gestores/Coordenação | Próxima reunião com stakeholders |
| P002 | Confirmar a infraestrutura disponível para hospedagem do sistema | Área de TI da instituição | Próximas aulas |
| P003 | Validar as regras de negócio com a coordenação pedagógica e assistência estudantil | Coordenação/Assistentes sociais | Próxima reunião |
| P004 | Confirmar se a base usada será fictícia ou anonimizada | Professor/Grupo | Próxima aula prática |
| P005 | Definir quais integrações com sistemas acadêmicos existentes serão realizadas | Equipe de TI/Gestão | Próximas aulas |
| P006 | Validar os requisitos de acessibilidade com usuários reais | Equipe pedagógica | Próximas aulas |

---

## Declaração do grupo

Declaramos que esta versão D0 foi elaborada com base nas atividades realizadas em sala, nas discussões do grupo e no uso responsável de IA generativa. O grupo revisou o conteúdo, corrigiu sugestões inadequadas e assume responsabilidade pelas informações registradas.

**Integrantes:**  
- Gabriel Rodrigues  
- Pedro Eduardo  
- Marcus Antônio  
- Ryan Corrêa  

**Data:** 02/07/2026


