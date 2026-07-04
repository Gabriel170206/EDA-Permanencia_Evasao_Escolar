# Documentação do Fluxo do Sistema (IPO)

## 1. Qual é o sistema?
O sistema proposto é o **SIMPE (Sistema Inteligente de Monitoramento da Permanência Escolar)**, desenvolvido no contexto da Trilha EDA / Permanência para o combate à evasão escolar.

---

## 2. Quais são as entradas?
As entradas do sistema correspondem aos dados brutos armazenados e alimentados pelos usuários ou sistemas integrados:
* Dados cadastrais do estudante, de sua respectiva turma e informações sobre os responsáveis.
* Registros diários de frequência e assiduidade (presenças e faltas).
* Notas, médias parciais e histórico de desempenho acadêmico.
* Registro de ocorrências disciplinares na instituição.
* Registros de visitas domiciliares e atendimentos (realizados por psicólogos e assistentes sociais).
* Parâmetros e critérios de risco configurados manualmente pela própria instituição.
* Dados históricos de alunos importados de sistemas acadêmicos legados via API REST.
* Credenciais de acesso e autenticação para login dos usuários.

---

## 3. O que será processado?
O processamento envolve as regras de negócio, rotinas automáticas e transformações executadas pela aplicação:
* **Autenticação e Controle de Permissões:** Verificação de segurança (OAuth 2.0 ou JWT) para aplicar os níveis de acesso específicos de cada perfil de usuário.
* **Análise Analítica de Risco:** Monitoramento contínuo e cruzamento dos dados acadêmicos recebidos para identificar padrões que indiquem risco de evasão.
* **Validação de Gatilhos:** Avaliação em background para verificar se o estudante atingiu os critérios configurados pela instituição (ex: excesso de faltas consecutivas ou queda de rendimento).
* **Cálculo de Indicadores:** Agregação e consolidação estatística de dados para calcular taxas de evasão, frequência média e evolução mensal.
* **Atualização da Linha do Tempo:** Rastreamento e evolução do caso do aluno a partir do registro de cada intervenção prática efetuada.
* **Segurança e Auditoria:** Criptografia de dados pessoais sensíveis e geração de logs de acesso para conformidade com a LGPD.

---

## 4. Quais são as saídas?
As saídas representam os resultados processados, relatórios e telas disponibilizadas pelo software:
* **Painel de Indicadores (Dashboard):** Telas gráficas contendo taxas de evasão, lista de estudantes em risco, frequência média, evolução mensal e comparações entre turmas e cursos.
* **Alertas Visuais:** Notificações automáticas emitidas dentro da plataforma para sinalizar casos críticos à equipe escolar.
* **Notificações Externas:** Mensagens de aviso (E-mail ou SMS) disparadas diretamente para os responsáveis pelos estudantes.
* **Histórico Escolar Consolidado:** Relatório unificado unindo notas, frequência e registros de acompanhamento do aluno.
* **Relatórios Gerenciais:** Documentos estruturados sobre o histórico de intervenções, desempenho acadêmico geral e evolução dos indicadores institucionais.
* **Dados Exportados:** Arquivos de dados gerados para exportação no sistema.

---

## 5. Quem usará essas saídas?
As informações geradas pelas saídas do sistema serão consumidas pelos seguintes perfis:
* **Gestores Escolares (Direção e Secretaria):** Utilizam os relatórios institucionais e dashboards para decisões estratégicas, avaliações institucionais e planejamento acadêmico.
* **Coordenação Pedagógica:** Utiliza os alertas e relatórios de alunos em risco para elaborar planos de ação e organizar intervenções rápidas.
* **Professores:** Consultam o histórico e o acompanhamento dos casos para gerenciar as dificuldades pedagógicas em sala de aula.
* **Equipe Multidisciplinar (Assistentes Sociais e Psicólogos):** Consomem os históricos de atendimento e relatórios de alunos em risco para direcionar visitas e acolhimentos.
* **Responsáveis pelos Estudantes:** Acessam as notificações restritas para acompanhar a frequência e o rendimento direto de seus dependentes.
* **Formuladores de Políticas Públicas:** Utilizam os relatórios estatísticos agregados (Secretarias de Educação) para subsidiar programas sociais e políticas compensatórias.


# Ticket de saída

## Identificação
* **Nome:** Gabriel, Marcus, Pedro, Ryan
* **Grupo:** Trilha EDA / Permanência

## Detalhes do Sistema
* **Sistema escolhido:** SIMPE (Sistema Inteligente de Monitoramento da Permanência Escolar)

## Fluxo de Informação
* **Uma entrada importante do sistema é:** Registros diários de frequência e notas acadêmicas lançados pelos professores.
* **Um processamento importante é:** Análise analítica de risco e cruzamento automatizado de dados para identificar padrões de evasão escolar.
* **Uma saída importante é:** Painel de indicadores (Dashboard) com alertas automáticos de estudantes em situação de risco.

## Observações
* **Uma coisa que ainda ficou confusa:** Como padronizar o registro das intervenções humanas (atendimentos e visitas) para que o sistema consiga gerar medidas precisas sobre a eficácia de cada ação?