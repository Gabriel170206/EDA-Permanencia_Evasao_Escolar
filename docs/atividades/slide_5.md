# Aula 5 — Atividade: Quem, por quê e até onde?

## 1. STAKEHOLDERS (Atores Envolvidos)

* **Usuários Diretos (quem opera o sistema):**
    * Gestores Escolares
    * Coordenação Pedagógica
    * Professores
    * Assistentes Sociais
    * Psicólogos Escolares
    * Secretaria da Instituição

* **Fornecedores de Dados (quem alimenta o sistema):**
    * Professores (frequência e notas)
    * Secretaria (cadastro de alunos)
    * Sistema Acadêmico existente (para integração de dados históricos)
    * Equipe Multidisciplinar (registro de intervenções e ocorrências)

* **Validadores e Gestores (quem usa os dados para decisão):**
    * Direção e Gestão Escolar (para decisões estratégicas)
    * Coordenação Pedagógica (para planos de intervenção)
    * Políticas Públicas (secretarias de educação, usando relatórios agregados)

* **Outros Afetados (indiretamente):**
    * Estudantes em risco de evasão (beneficiários finais)
    * Responsáveis pelos estudantes (com acesso restrito)
    * Mercado de trabalho (afetado pela formação de profissionais)
    * Sociedade em geral (impactada pelos indicadores sociais)

## 2. OBJETIVO DO SISTEMA

**Frase Guia do Projeto:**
> Apoiar **gestores, professores e equipes multidisciplinares** a **identificar precocemente estudantes em risco de evasão e organizar intervenções** para **aumentar a taxa de permanência e conclusão escolar, reduzindo as desigualdades sociais e fortalecendo o desenvolvimento educacional.**

## 3. ESCOPO E FRONTEIRA

* **Dentro do Escopo (O que o sistema faz):**
    * Cadastro e gestão de dados dos estudantes.
    * Registro de frequência, notas e ocorrências disciplinares.
    * Integração com sistemas acadêmicos existentes.
    * Identificação de padrões de risco (ex: faltas excessivas, queda de rendimento) baseada em regras configuráveis.
    * Geração de alertas e notificações automáticas para a equipe.
    * Registro e acompanhamento do histórico de intervenções realizadas.
    * Geração de relatórios gerenciais e painéis de indicadores (Dashboards).
    * Controle de níveis de acesso e permissões (Gestor, Professor, etc.).
    * Conformidade com a Lei Geral de Proteção de Dados (LGPD).

* **Foras do Escopo (O que o sistema NÃO faz):**
    * Não resolve o problema da evasão por si só (não substitui a ação humana).
    * Não identifica causas subjetivas ou não registradas (ex: problemas emocionais ou familiares que não são inseridos no sistema).
    * Não realiza intervenções pedagógicas, psicológicas ou sociais automaticamente (apenas sugere e registra).
    * Não substitui a análise crítica de professores e gestores.
    * Não elimina a necessidade de políticas públicas, apoio psicológico ou ações comunitárias.

* **Interações Externas (Fronteira):**
    * **Usuários:** Interagem via interface web/mobile para inserir dados e consultar relatórios.
    * **Sistemas Externos:** O SIMPE se integra com outros sistemas acadêmicos (via API REST) para importar dados históricos de alunos.
    * **Dispositivos de Comunicação:** Envia notificações (e-mails/SMS) para responsáveis e equipes.
    * **Ambiente de Nuvem:** Para hospedagem e escalabilidade.

## 4. PERGUNTAS 5W1H (Detalhamento Inicial)

* **Quem?**
    * **Desenvolve?** Equipe de desenvolvimento de software (Frontend, Backend, Banco de Dados).
    * **Utiliza?** Gestores, coordenadores, professores, assistentes sociais, psicólogos e responsáveis pelos alunos (com acesso restrito).
    * **É afetado?** Estudantes, famílias, professores, institutions de ensino, governo, mercado de trabalho e a sociedade.

* **O quê?**
    * Será desenvolvido o **Sistema Inteligente de Monitoramento da Permanência Escolar (SIMPE)**, uma plataforma tecnológica que visa auxiliar na identificação e acompanhamento de estudantes com risco de evasão através de alertas, dashboards e relatórios.

* **Onde?**
    * O sistema será utilizado em **instituições de ensino**, desde escolas individuais até redes estaduais ou federais de educação, sendo acessado pela internet.

* **Quando?**
    * O sistema operará **em tempo real (contínuo)** ao longo do ano letivo, permitindo o acompanhamento diário da frequência e o monitoramento constante dos indicadores de risco para intervenções ágeis.

* **Por quê?**
    * Para combater a **evasão escolar**, um problema multidimensional que afeta o desenvolvimento pessoal dos alunos, a eficiência das instituições, a economia e a igualdade social. O sistema visa apoiar a tomada de decisão baseada em dados para reduzir esse problema.

* **Como?**
    * Através de uma aplicação web com:
        * **Frontend:** React (interface amigável e acessível).
        * **Backend:** Java (Spring Boot) ou Node.js (lógica de negócio e alertas).
        * **Banco de Dados:** PostgreSQL (armazenamento seguro de dados).
        * **API:** REST para comunicação.
        * **Autenticação:** OAuth 2.0 ou JWT para segurança e níveis de acesso.
        * **Infraestrutura:** Hospedagem em nuvem (para escalabilidade e alta disponibilidade).
