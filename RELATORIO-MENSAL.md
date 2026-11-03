# Relatório Mensal de Proteção de Conteúdo — Addicted to Ana

Gerado mensalmente pela **Impulse Digital Marketing** · Conta Branditscan #32428

---

## Arquivos gerados

| Mês | Arquivo HTML |
|-----|-------------|
| Outubro 2026 | `relatorio-takedowns-nov2026.html` |

Convenção de nome: `relatorio-takedowns-MES-ANO.html`  
Exemplo próximo mês: `relatorio-takedowns-dez2026.html`

---

## Fontes de dados necessárias por mês

### 1. Takedowns CSV — Branditscan
- **Origem:** painel Branditscan → exportar CSV mensal
- **Exemplo:** `monthly-takedowns-32428-YYYYMMDD.csv`
- **Colunas:** `month, brandit, count_found, count_source_removed, count_delisted`
- **Filtrar:** apenas o mês de referência (`2026-10`, `2026-11`, etc.)

### 2. Analytics — Cloudflare
- **Origem:** painel Cloudflare → Analytics → exportar PDF (30 dias)
- **Exemplo:** `report-30-addictedtoana.pdf`
- **Dados extraídos:** total requests, visits, data transfer, países, dispositivos, status codes, cache hit rate

### 3. Registro de serviços
- Ocorrências atendidas no mês (suporte Meta, X, Telegram, Discord, etc.)
- Links recebidos para takedown manual
- Resultado de cada ação (resolvido / aguardando)

---

## Estrutura do relatório (seções fixas)

| # | Seção | Fonte | Atualizar mensalmente |
|---|-------|-------|-----------------------|
| 01 | Resumo Executivo | CSV Branditscan | Sim |
| 02 | Top Sites Infratores | CSV Branditscan | Sim |
| 03 | Análise de Efetividade | CSV Branditscan | Sim |
| 04 | Analytics do Site | Cloudflare PDF | Sim |
| 05 | Registro de Serviços e Ocorrências | Manual | Sim |
| 06 | Perfis Oficiais Monitorados | Fixo | Apenas se mudar |
| 07 | Responsabilidade e Segurança (Impulse) | Fixo | Apenas se mudar |

---

## Perfis protegidos (fixos)

| Plataforma | Handle | URL |
|-----------|--------|-----|
| Instagram | @add1ctedtoana | instagram.com/add1ctedtoana |
| Instagram | @thatcringygal | instagram.com/thatcringygal |
| Reddit | u/Addictedtoana | reddit.com/user/Addictedtoana |
| TikTok | @addictiveanna | tiktok.com/@addictiveanna |
| X / Twitter | @pancakeenergy | x.com/pancakeenergy |
| Fansly | addictveanna | fansly.com/addictveanna |
| OnlyFans | anattraction | onlyfans.com/anattraction |

---

## Como gerar o relatório do próximo mês

1. Baixar o CSV atualizado do Branditscan (filtrar mês desejado)
2. Baixar o PDF de analytics do Cloudflare (últimos 30 dias)
3. Abrir `relatorio-takedowns-nov2026.html` como base
4. Atualizar todas as seções marcadas como "Sim" na tabela acima
5. Salvar como `relatorio-takedowns-MES-ANO.html`
6. Abrir no Chrome → Ctrl+P → Salvar como PDF para entrega

---

## Processos e ferramentas utilizados

- **Branditscan** — monitoramento automatizado de vazamentos
- **Suporte X (Twitter)** — derrubada de perfis e links infratores
- **Suporte OnlyFans** — proteção de conteúdo na plataforma
- **Suporte Telegram / Discord** — derrubada de canais e grupos
- **Contato direto com DMCA** de sites que hospedam conteúdo vazado
- **Extra-Judiciais** — para conteúdo privado vazado sem cooperação

---

## Observações técnicas

- Sites como **Erome** operam com múltiplos servidores globais e redirecionamento de TLDs (.fr → .us → etc.). A delistagem é a estratégia mais efetiva nesses casos.
- **fapello.com** e **cums.net** são os maiores infratores recorrentes — zero cooperação com remoção na fonte.
- Taxa de delistagem esperada: >99%. Taxa de remoção na fonte: 1–7% dependendo do mês.
