# Relacionamento do banco de dados ao sistema SIMPE no Packet Tracer

A topologia do Packet Tracer deve representar o SIMPE como uma arquitetura distribuída com pelo menos quatro serviços de rede:

## Rede proposta

- Rede: `192.168.1.0/24`
- Gateway: `192.168.1.1`
- Máscara: `255.255.255.0`

## Endereços estáticos

1. Servidor de aplicação
   - Executa o backend do SIMPE e expõe a API web ou o módulo de dashboard.
   - IP fixo: `192.168.1.10`.
   - Máscara: `255.255.255.0`.
   - Gateway: `192.168.1.1`.
   - Serviço: app SIMPE.

2. Cliente/usuário
   - PC de gestor, professor, coordenador e assistente social.
   - IPs fixos:
     - `192.168.1.11` → PC0-Gestor
     - `192.168.1.12` → PC1-Coordenador
     - `192.168.1.13` → PC2-Professor
     - `192.168.1.14` → PC3-Assistente_Social
   - Cada PC deve receber IP fixo, sem sobreposição.

3. Servidor de banco de dados
   - Armazena o arquivo SQLite gerado em `src/db/simpe.db`.
   - IP fixo: `192.168.1.15`.
   - Máscara: `255.255.255.0`.
   - Gateway: `192.168.1.1`.
   - Serviço: banco de dados SIMPE.
   - Conexão: o servidor de aplicação consulta o banco por via de rede interna, usando o serviço do SQLite em arquivo representado em um servidor de persistência. A rota direta do arquivo físico é mantida em `src/db/simpe.db`.

## Fluxo de comunicação

```text
PC Gestor --> Switch --> Servidor de Aplicação SIMPE (192.168.1.10)
                                      |
                                      | HTTP/HTTPS 80/443
                                      v
                            Servidor de Banco (192.168.1.15)
```

## Regras recomendadas no Packet Tracer

- Conecte todos os nós em uma switch central.
- Configure o servidor de aplicação com a interface de rede em `192.168.1.10/24`.
- Configure o servidor de banco com a interface de rede em `192.168.1.15/24`.
- Use o gateway `192.168.1.1` para dispersar o tráfego fora da LAN local.
- Os clientes devem ser atribuídos com IPs específicos e únicos `192.168.1.11` a `192.168.1.14`.
- Não repetir `192.168.1.10`, `192.168.1.15` e a sequência de PCs em nenhuma outra máquina.
- Se a camada de rede for reproduzida no Packet Tracer, a comunicação deve seguir este fluxo: PC → App Server → DB Server.

## Mapeamento funcional

| Dispositivo no Packet Tracer | Papel | Relacionamento |
|---|---|---|
| PC0-Gestor / PC1-Coordenador / PC2-Professor / PC3-Assistente_Social | Frontend / acesso ao SIMPE | Envia requisições ao servidor de aplicação |
| Server Web/API | Backend SIMPE | Recebe as requisições e aplica regras de negócio |
| Server DB | Armazenamento SIMPE | Persiste as tabelas do modelo: Perfil, Usuario, Aluno, Frequencia, Nota, Ocorrencia, Intervencao, Alerta, Configuracao_Risco |

## Observação de IP

A referência lógica do projeto cria a base em SQLite em [src/db/simpe.db](src/db/simpe.db). No Packet Tracer, o banco precisa ser representado como servidor conectado à rede `192.168.1.0/24` com IP estático `192.168.1.15`. Nunca use IPs fora dessa faixa ou duplicados em servidores e clientes, porque isso quebraria a comunicação local e o desenho da arquitetura.
