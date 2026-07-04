# Aula 8 — Requisitos, Regras de Negócio, Critérios e Rastreabilidade

**Projeto:** Sistema de Alerta Precoce para Combate à Evasão Escolar  
**Data:** 03/07/2026  
**Disciplina:** Modelagem de Sistemas com IA Generativa  
**Turma:** Técnico Subsequente

---

## Análise das 3 Falas Coletadas

### **Fala 1 (Coordenação)**
> "Eu preciso receber um alerta automático sempre que um aluno faltar muitos dias seguidos, para que a coordenação possa ligar para a família antes que ele desista de vez."

**Classificação:** ✅ **REQUISITO FUNCIONAL (RF)**
- **Por quê?** Define uma ação/funcionalidade que o sistema deve executar: emitir alertas
- **Estrutura:** O sistema deve [emitir alerta] [quando aluno faltar muitos dias]
- **Prioridade:** **ALTA** - Essencial para resolver o problema de evasão

---

### **Fala 2 (Professor/Coordenador - Contexto de Uso)**
> "O sistema precisa funcionar bem e abrir a lista de alunos rapidamente no meu celular, em no máximo 5 segundos, porque a internet da escola oscila bastante."

**Classificação:** ✅ **REQUISITO NÃO FUNCIONAL (RNF)**
- **Por quê?** Define uma restrição de qualidade/desempenho, não uma função
- **Categoria:** Desempenho e Usabilidade
- **Estrutura:** O sistema deve [carregar lista de alunos] [em no máximo 5 segundos]
- **Prioridade:** **ALTA** - Sem isso, o sistema fica inutilizável em contexto real

---

### **Fala 3 (Gestor/Coordenador)**
> "Gostaria de poder extrair um relatório consolidado no fim do mês mostrando o cruzamento de faltas e notas baixas por turma."

**Classificação:** ✅ **REQUISITO FUNCIONAL (RF)**
- **Por quê?** Define uma nova ação do sistema: gerar relatórios
- **Estrutura:** O sistema deve [gerar relatório] [consolidado mensal com faltas e notas]
- **Prioridade:** **MÉDIA** - Agrega valor significativo para análise, mas o sistema pode operar sem isso inicialmente

---

## Tabela de Requisitos Estruturados

| ID | DESCRIÇÃO DO REQUISITO | TIPO | PRIORIDADE |
|:--:|---|:--:|:--:|
| **RF01** | O sistema deve emitir um alerta automático quando um aluno acumular 5 ou mais dias consecutivos de falta sem justificativa. | RF | **ALTA** |
| **RF02** | O sistema deve permitir que o usuário visualize o alerta em forma de notificação na tela e/ou por e-mail. | RF | **ALTA** |
| **RF03** | O sistema deve gerar um relatório consolidado mensal que cruze dados de faltas e notas baixas agrupadas por turma. | RF | **MÉDIA** |
| **RNF01** | O sistema deve carregar a lista de alunos em no máximo 5 segundos em conexões de 3G. | RNF | **ALTA** |
| **RNF02** | O aplicativo deve sincronizar dados automaticamente quando detectar conexão com a internet após período offline. | RNF | **MÉDIA** |

---

## Detalhamento de Cada Requisito

### **RF01 - Alerta Automático de Faltas**

**O que é?** O sistema deve emitir um alerta automático quando um aluno acumular 5 ou mais dias consecutivos de falta sem justificativa.

**Critério de Aceitação:**
- **DADO QUE** a coordenação está acompanhando as frequências do aluno;
- **QUANDO** um aluno completar 5 dias seguidos de falta sem justificativa;
- **ENTÃO** o sistema deve emitir um alerta em vermelho na tela e enviar notificação imediata.

**Rastreabilidade:**
- **Fala Original:** Fala 1 (Coordenador)
- **Evidência:** Necessidade de intervenção precoce
- **Regra de Negócio:** "Um aluno é considerado em risco após 5 faltas consecutivas injustificadas"

---

### **RF02 - Canais de Notificação**

**O que é?** O sistema deve permitir que o usuário visualize o alerta em forma de notificação na tela e/ou por e-mail.

**Critério de Aceitação:**
- **DADO QUE** um alerta foi acionado;
- **QUANDO** o sistema processa o critério de 5 faltas consecutivas;
- **ENTÃO** deve notificar via interface visual (na tela) E enviar e-mail para coordenadores cadastrados.

**Rastreabilidade:**
- **Fala Original:** Fala 1 (Coordenador)
- **Evidência:** Necessidade de múltiplos canais de comunicação
- **Regra de Negócio:** "Coordenadores devem ser informados em tempo real"

---

### **RF03 - Relatório Consolidado Mensal**

**O que é?** O sistema deve gerar um relatório consolidado mensal que cruze dados de faltas e notas baixas agrupadas por turma.

**Critério de Aceitação:**
- **DADO QUE** o mês chegou ao fim;
- **QUANDO** o usuário solicita um relatório mensal;
- **ENTÃO** o sistema deve exibir uma tabela/gráfico mostrando: turma, total de faltas, alunos com notas < 6.0, e alunos em risco de evasão.

**Formato de Saída:**
```
TURMA | TOTAL FALTAS | ALUNOS COM NOTA BAIXA | EM RISCO DE EVASÃO
------|--------------|----------------------|-------------------
INFO-01 | 45         | 8                    | 5
INFO-02 | 38         | 6                    | 3
```

**Rastreabilidade:**
- **Fala Original:** Fala 3 (Gestor)
- **Evidência:** Necessidade de análise agregada para tomada de decisão
- **Regra de Negócio:** "Relatórios devem ser gerados ao fim de cada mês para revisão de política de permanência"

---

### **RNF01 - Desempenho em Conexões Lentas**

**O que é?** O sistema deve carregar a lista de alunos em no máximo 5 segundos em conexões de 3G.

**Justificativa:** A escola possui internet oscilante; o sistema deve funcionar mesmo em condições de conectividade limitada.

**Métrica:**
- Tempo de resposta: < 5 segundos
- Testado em: simulação de rede 3G (velocidade média de 1-2 Mbps)

**Rastreabilidade:**
- **Fala Original:** Fala 2 (Professor)
- **Evidência:** Contexto de uso real (internet escola oscila)
- **Categoria:** Desempenho / Usabilidade

---

### **RNF02 - Sincronização Offline/Online**

**O que é?** O aplicativo deve sincronizar dados automaticamente quando detectar conexão com a internet após período offline.

**Justificativa:** Para garantir que dados coletados em campo (sem internet) não sejam perdidos.

**Comportamento Esperado:**
1. Usuário está offline → dados são armazenados localmente
2. Conexão é restaurada → sincronização automática acontece em < 30 segundos
3. Usuário recebe confirmação de sucesso/erro

**Rastreabilidade:**
- **Fala Original:** Fala 2 (implícito - contexto de campo)
- **Evidência:** Realidade do funcionamento em territórios sem cobertura estável

---

## Critérios de Priorização

### **Por que RF01 e RNF01 = ALTA?**

✅ **Valor para o usuário:** Ambos resolvem o problema principal (evasão)
✅ **Impacto no negócio:** Essenciais para o IFMA identificar alunos em risco
✅ **Riscos de não implementar:** Sem alertas, o sistema não cumpre seu objetivo; sem desempenho, ninguém usa
✅ **Viabilidade técnica:** Ambos são viáveis em 2-3 semanas

### **Por que RF03 e RNF02 = MÉDIA?**

⚠️ **Valor agregado:** Importantes para análise, mas o sistema funciona sem eles na primeira versão
⚠️ **Impacto no negócio:** Melhoram a tomada de decisão, mas não são críticos
⚠️ **Prazo:** Podem ser implementados na versão 2.0

---

## Matriz de Rastreabilidade

```
FALA → ACHADO → REQUISITO → CRITÉRIO DE ACEITAÇÃO → VALIDAÇÃO
 ↓       ↓         ↓              ↓                      ↓
Fala 1  Need     RF01           Dado/Quando/Então      Coordenador testa
        Alerta   + RF02         com 5 faltas           Funciona? ✓
        
Fala 2  Perf     RNF01          Lista < 5seg           Teste com 3G
        Mobile   + RNF02        em 3G + offline        Funciona? ✓
        
Fala 3  Relat    RF03           Relatório mensal       Gestor testa
        Analys   (Med)          com cruzamento         Análise? ✓
```

---

## Próximos Passos

1. **Validação com Stakeholders:**
   - Apresentar estes 5 requisitos aos coordenadores e gestores
   - Coletar feedback: "Faltou algo?"

2. **Regras de Negócio a Formalizar:**
   - Quantos dias de falta = risco? (sugerido: 5)
   - Qual nota é considerada "baixa"? (sugerido: < 6.0)
   - Quem recebe os alertas? (coordenação + orientador)

3. **Critérios de Aceitação Detalhados:**
   - Cada requisito precisa de testes específicos na fase de Teste

4. **Estimativa de Esforço:**
   - RF01: 2 semanas
   - RF02: 1 semana
   - RNF01: 1.5 semanas
   - RF03: 2 semanas (v2.0)
   - RNF02: 1 semana (v2.0)

---

## Referências

SOMMERVILLE, I. *Engenharia de Software*. 8. ed. São Paulo: Addison-Wesley, 2007.

PRESSMAN, R. S. *Engenharia de Software: uma abordagem profissional*. 7. ed. Porto Alegre: AMGH, 2011.

WIEGERS, K.; BEATTY, J. *Software Requirements*. 3. ed. Microsoft Press, 2013.

---

**Criado em:** 03/07/2026  
**Versão:** 1.0  
**Status:** Pronto para Validação

