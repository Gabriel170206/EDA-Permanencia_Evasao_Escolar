# Aula 3 — Processo de Software: Combate à Evasão Escolar

## Grupo: [Nome do Grupo]
**Data:** 01/07/2026  
**Disciplina:** Modelagem de Sistemas com IA Generativa  
**Tema Central:** Combate e Monitoramento da Evasão Escolar

---

## 1. Três Soluções Tecnológicas Propostas

### **Solução 1: Sistema de Monitoramento e Alerta Precoce (Early Warning System)**

**Descrição:** Plataforma que coleta dados de frequência, notas, engajamento em atividades e comportamento dos alunos. Utiliza analytics para identificar padrões de risco de evasão e gera alertas automáticos para professores e coordenadores.

**Vantagens:**
- Detecção precoce de alunos em risco
- Intervenção rápida baseada em dados
- Reduz evasão por falta de acompanhamento

**Desvantagens:**
- Depende da qualidade dos dados
- Requer capacitação dos educadores
- Possíveis questões de privacidade

---

### **Solução 2: Aplicativo Móvel de Orientação e Mentoria (Mentoring App)**

**Descrição:** App mobile que conecta alunos em risco com mentores (professores, profissionais da área, ex-alunos). Oferece suporte emocional, orientação profissional, apoio acadêmico e recursos de bem-estar mental.

**Vantagens:**
- Aumenta engajamento do aluno
- Oferece suporte humanizado e personalizado
- Cria senso de comunidade

**Desvantagens:**
- Requer disponibilidade de mentores
- Impacto depende da qualidade do mentoring
- Escalabilidade limitada

---

### **Solução 3: Dashboard de Gestão Educacional Integrado (Educational Management Dashboard)**

**Descrição:** Sistema web centralizado que integra dados acadêmicos, socioeconômicos e psicológicos dos alunos. Oferece relatórios, predições de risco, sugestões de ações pedagógicas e ferramentas de comunicação entre escola-família-aluno.

**Vantagens:**
- Visão holística do aluno
- Suporta decisões pedagógicas baseadas em dados
- Integração com sistemas existentes
- Facilita comunicação escola-família

**Desvantagens:**
- Maior complexidade de implementação
- Pode ser mais custoso
- Exige governança de dados

---

## 2. Solução Escolhida: **Sistema de Monitoramento e Alerta Precoce (Early Warning System)**

### Justificativa da Escolha

A **Solução 1** foi selecionada porque:
1. ✅ Maior impacto imediato na redução de evasão
2. ✅ Viável tecnicamente com prototipação rápida
3. ✅ Atende à metodologia ágil proposta
4. ✅ Pode ser validada rapidamente com usuários (professores e coordenadores)
5. ✅ Escalável e adaptável para melhorias futuras

---

## 3. Linha do Tempo do Projeto

```
┌─────────────────────────────────────────────────────────────────┐
│          SISTEMA DE ALERTA PRECOCE PARA EVASÃO ESCOLAR          │
│                                                                   │
│  MARCO 1              MARCO 2              MARCO 3              MARCO 4
│  ANÁLISE              PROJETO              IMPLEMENTAÇÃO        TESTE
│  (Semanas 1-2)        (Semanas 3-4)        (Semanas 5-6)       (Semanas 7)
│
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Plano de Projeto — Cinco Etapas

| ETAPA | O QUE FAREMOS? | PRAZO |
|-------|---|---|
| **Análise** | Levantar requisitos com professores, coordenadores e orientadores. Definir indicadores de risco (ausências, notas baixas, desengajamento). Documentar necessidades técnicas e regras de negócio. | **2 semanas** |
| **Projeto** | Desenhar arquitetura do sistema (Backend, Frontend, DB). Mapear interface de usuário (telas do dashboard). Criar diagramas de fluxo de dados. Especificar integração com sistemas existentes da escola. | **2 semanas** |
| **Implementação** | Gerar protótipo funcional com IA. Montar mockups interativos do dashboard. Simular coleta e processamento de dados. Criar base de dados simulada com dados de exemplo. | **2 semanas** |
| **Teste** | Validar requisitos com usuários (professores e coordenadores). Testar usabilidade da interface. Validar se os alertas funcionam corretamente. Coletar feedback para ajustes. | **1 semana** |
| **Manutenção** | Documentar lições aprendidas. Propor melhorias evolutivas (novos indicadores, integração com psicólogo). Planejar próxima iteração do projeto. | **Em andamento** |

---

## 5. Detalhamento por Etapa

### **ETAPA 1: ANÁLISE (2 semanas)**

**Objetivos:**
- Entender o problema de evasão na instituição
- Identificar indicadores de risco
- Levantar requisitos funcionais e não funcionais

**Atividades:**
- Entrevistas com coordenadores, professores e orientadores
- Análise de dados históricos de evasão
- Documentação de fluxos existentes

**Requisitos Funcionais:**
- ✓ O sistema deve coletar dados de frequência
- ✓ O sistema deve monitorar notas e desempenho
- ✓ O sistema deve gerar alertas automáticos
- ✓ O sistema deve permitir ações registradas sobre o aluno

**Requisitos Não Funcionais:**
- Desempenho: Carregar dashboard em <3 segundos
- Segurança: Dados protegidos e criptografados
- Usabilidade: Interface intuitiva para professores sem treinamento extenso

---

### **ETAPA 2: PROJETO (2 semanas)**

**Arquitetura em 3 Camadas:**

```
┌─────────────────────────────────┐
│   FRONTEND (Apresentação)       │
│  - Dashboard de Alertas          │
│  - Lista de Alunos em Risco      │
│  - Relatórios Visuais            │
└────────────┬────────────────────┘
             │ HTTP/API
┌────────────▼────────────────────┐
│   BACKEND (Regras de Negócio)    │
│  - Motor de Detecção de Risco    │
│  - Processamento de Dados        │
│  - Autenticação                  │
└────────────┬────────────────────┘
             │ SQL
┌────────────▼────────────────────┐
│   BANCO DE DADOS (Persistência)  │
│  - Alunos                        │
│  - Frequência                    │
│  - Notas                         │
│  - Alertas Gerados               │
└─────────────────────────────────┘
```

**Telas Principais:**
- Dashboard Principal (visão geral de alertas)
- Detalhe do Aluno (histórico e indicadores)
- Configuração de Limites de Risco
- Relatórios e Análises

---

### **ETAPA 3: IMPLEMENTAÇÃO (2 semanas)**

**Abordagem:** Prototipação Rápida com IA

**Atividades:**
- Gerar interface visual com prompt estruturado
- Criar mockups clicáveis de todas as telas
- Simular carga de dados e alertas
- Documentar o fluxo completo

**Tecnologias a Utilizar:**
- Frontend: React ou Vue (ou ferramenta visual com IA)
- Backend: Node.js, Python ou similar
- Banco: PostgreSQL ou MySQL
- Hospedagem: Nuvem (AWS, Azure, Google Cloud)

---

### **ETAPA 4: TESTE (1 semana)**

**Testes a Realizar:**

1. **Validação de Requisitos:**
   - ✓ O sistema coleta os dados conforme especificado?
   - ✓ Os alertas são gerados corretamente?

2. **Teste de Usabilidade:**
   - ✓ Professores conseguem usar sem dificuldade?
   - ✓ A interface é intuitiva?
   - ✓ Os alertas são claros e acionáveis?

3. **Teste Funcional:**
   - ✓ Os botões funcionam?
   - ✓ Os cálculos de risco estão corretos?
   - ✓ As transições entre telas funcionam?

**Feedback Esperado:**
- Validação com 3-5 professores/coordenadores
- Registro de sugestões de melhoria
- Priorização de ajustes

---

### **ETAPA 5: MANUTENÇÃO (Contínua)**

**Tipos de Manutenção:**

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **Corretiva** | Corrigir bugs encontrados | Se um alerta não dispara corretamente |
| **Adaptativa** | Ajustar a novos contextos | Nova metodologia de cálculo de risco |
| **Evolutiva** | Adicionar novas funcionalidades | Integração com psicólogo escolar, app mobile |

---

## 6. Próximos Passos

### Na Próxima Aula (Aula 4):
- Criar o **primeiro prompt oficial** para gerar as telas do sistema
- Aplicar técnicas de **Engenharia de Prompts**
- Documentar decisões e validações críticas
- Criar **Log de Uso** da IA no projeto

### Antes da Próxima Aula:
- Revisar este plano em grupo
- Coletar informações sobre indicadores de risco específicos da sua escola
- Preparar lista de stakeholders para entrevistas (Análise)

---

## 7. Referências

SOMMERVILLE, I. *Engenharia de Software*. 8. ed. São Paulo: Pearson Addison-Wesley, 2007.

PRESSMAN, R. S. *Engenharia de Software: uma abordagem profissional*. 7. ed. Porto Alegre: AMGH, 2011.

BECK, K. et al. *Manifesto para Desenvolvimento Ágil de Software*. 2001. Disponível em: http://agilemanifesto.org/iso/ptbr/manifesto.html

---

**Data de Criação:** 01/07/2026  
**Versão:** 1.0  
**Status:** Em Planejamento

