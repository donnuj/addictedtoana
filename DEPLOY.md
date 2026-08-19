# Checklist de Deploy — VPS Ubuntu + nginx + PM2 + Cloudflare

## Segurança do .env

**Regra principal:** o arquivo `.env` nunca vai ao servidor e nunca entra no git.

```bash
# Confirme que está no .gitignore (já está por padrão no Next.js)
cat .gitignore | grep .env
```

No servidor, crie o arquivo manualmente:

```bash
# No VPS, só uma vez por projeto
nano /var/www/nome-cliente/.env
# Cole as variáveis e salve (Ctrl+X → Y → Enter)
chmod 600 /var/www/nome-cliente/.env   # Apenas o dono lê/escreve
```

Variáveis sem `NEXT_PUBLIC_` (apenas servidor, nunca vão ao browser):

```env
# Exemplo de variáveis privadas — sem NEXT_PUBLIC_
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=sua_chave_secreta
```

Variáveis com `NEXT_PUBLIC_` são **intencionalmente públicas** (GTM ID, Clarity ID, WhatsApp)
e aparecem no HTML de qualquer site que os usa — isso é normal e esperado.

---

## Setup do VPS (Ubuntu 22.04 LTS)

### 1. Node.js + PM2

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### 2. Clonar e buildar

```bash
cd /var/www
git clone https://github.com/seu-org/nome-cliente.git
cd nome-cliente
npm install
nano .env          # cole as variáveis
npm run build
```

### 3. PM2 — manter o processo vivo

```bash
pm2 start npm --name "nome-cliente" -- start
pm2 save
pm2 startup        # gera o comando systemd — execute o output
```

### 4. nginx — proxy reverso

```nginx
# /etc/nginx/sites-available/nome-cliente
server {
    listen 80;
    server_name exemplo.com.br www.exemplo.com.br;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/nome-cliente /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 5. SSL com Cloudflare (recomendado) ou Let's Encrypt

#### Opção A — Cloudflare (recomendado)

**Fluxo:**
```
Usuário → Cloudflare (SSL + firewall + CDN + bot protection) → nginx no VPS → PM2 → Next.js
```

**Passo a passo:**

1. No registrador do domínio, troque os nameservers para os do Cloudflare
2. Cloudflare → SSL/TLS → modo **Full (strict)**
3. Cloudflare → SSL/TLS → Origin Server → **Create Certificate**
   - Validade: 15 anos
   - Baixe o `.pem` (certificado) e a `.key` (chave privada)
4. No VPS, salve os arquivos:
   ```bash
   sudo mkdir -p /etc/ssl/cloudflare
   sudo nano /etc/ssl/cloudflare/cert.pem   # cole o certificado
   sudo nano /etc/ssl/cloudflare/key.pem    # cole a chave
   sudo chmod 600 /etc/ssl/cloudflare/*.pem
   ```
5. Atualize o nginx para usar HTTPS com o Origin Certificate:
   ```nginx
   # /etc/nginx/sites-available/nome-cliente
   server {
       listen 80;
       server_name exemplo.com.br www.exemplo.com.br;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       server_name exemplo.com.br www.exemplo.com.br;

       ssl_certificate     /etc/ssl/cloudflare/cert.pem;
       ssl_certificate_key /etc/ssl/cloudflare/key.pem;
       ssl_protocols       TLSv1.2 TLSv1.3;

       # Bloquear acesso direto ao VPS — só aceita do Cloudflare
       # (adicione os IPs do Cloudflare: https://www.cloudflare.com/ips/)
       allow 103.21.244.0/22;
       allow 103.22.200.0/22;
       allow 103.31.4.0/22;
       allow 104.16.0.0/13;
       allow 104.24.0.0/14;
       allow 108.162.192.0/18;
       allow 131.0.72.0/22;
       allow 141.101.64.0/18;
       allow 162.158.0.0/15;
       allow 172.64.0.0/13;
       allow 173.245.48.0/20;
       allow 188.114.96.0/20;
       allow 190.93.240.0/20;
       allow 197.234.240.0/22;
       allow 198.41.128.0/17;
       deny all;

       location / {
           proxy_pass         http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header   Upgrade $http_upgrade;
           proxy_set_header   Connection 'upgrade';
           proxy_set_header   Host $host;
           proxy_set_header   X-Real-IP $remote_addr;
           proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header   X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

**Configurações essenciais no painel Cloudflare:**

| Seção | Configuração | Valor |
|---|---|---|
| SSL/TLS | Modo de criptografia | Full (strict) |
| SSL/TLS | Always Use HTTPS | ON |
| SSL/TLS | HSTS | Habilitado (max-age 1 ano) |
| Security | Bot Fight Mode | ON |
| Security | Security Level | Medium |
| Speed | Auto Minify | JS + CSS + HTML |
| Speed | Brotli | ON |
| Caching | Cache Level | Standard |
| Rules | Page Rule | Cache estático (`/public/*`) |

**Benefícios extras do Cloudflare:**
- Proteção contra bots e scraping (complementa o `proxy.ts`)
- DDoS mitigation automático
- CDN global (assets servidos do ponto mais próximo do visitante)
- Analytics básico de tráfego (independente do GA4)
- Renovação do SSL automática e infinita (sem expirar a cada 90 dias)

---

#### Opção B — Let's Encrypt (sem Cloudflare)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d exemplo.com.br -d www.exemplo.com.br
# Renova automaticamente a cada 90 dias via cron
```

---

## Checklist pré-deploy

- [ ] `.env` preenchido no servidor (nunca no git)
- [ ] `NEXT_PUBLIC_GTM_ID` configurado — **é o hub de todos os pixels**
- [ ] `NEXT_PUBLIC_CLARITY_ID` configurado
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` no formato `5511999999999`
- [ ] `NEXT_PUBLIC_ALERT_CONTACTS` com e-mails do cliente
- [ ] `og-image.jpg` adicionado em `public/` (1200×630px)
- [ ] Favicon substituído em `public/favicon.ico`
- [ ] `NEXT_PUBLIC_SITE_URL` com domínio final (sem barra no final)
- [ ] SSL ativo e HTTPS funcionando
- [ ] Cloudflare → SSL/TLS → modo **Full (strict)** ativado
- [ ] Cloudflare → Bot Fight Mode **ON**
- [ ] `npm run build` sem erros

## Checklist pós-deploy

- [ ] Acessar `/sitemap.xml` e confirmar que lista as URLs corretas
- [ ] Acessar `/robots.txt` e verificar o conteúdo
- [ ] Google Search Console → Adicionar propriedade → Verificar via meta tag
- [ ] Bing Webmaster Tools → Verificar via `msvalidate.01`
- [ ] GTM → Preview mode → Confirmar que GA4, Meta Pixel e Bing tag disparam
- [ ] Clarity → aguardar 30min e verificar primeiras sessões
- [ ] Testar formulário de lead → confirmar chegada no e-mail do cliente
- [ ] Testar botão WhatsApp → confirmar evento no GTM Preview
- [ ] Cookie consent → aceitar → confirmar evento `consent_accepted` no dataLayer
- [ ] Abrir DevTools → Network → confirmar que nenhuma variável privada aparece

## LGPD

- [ ] Página `/politica-de-privacidade` acessível
- [ ] Banner de cookies aparece na primeira visita
- [ ] Analytics **não** dispara antes de aceitar (GTM configurado com Consent Mode)
- [ ] SSL ativo (obrigatório pela LGPD para coleta de dados)
- [ ] Cloudflare → modo Full (strict) — evita downgrade de HTTPS para HTTP entre Cloudflare e VPS

## Reports mensais

Configure no Google Looker Studio:
1. Conecte ao GA4 do cliente
2. Adicione métricas: sessões por canal (orgânico, pago, social, WhatsApp), taxa de conversão de leads, engajamento, taxa de abandono
3. Compartilhe o link do report com o cliente no início de cada mês
4. GA4 → Configure alertas automáticos em "Insights" para anomalias de tráfego

## Atualização do site (deploy contínuo)

```bash
cd /var/www/nome-cliente
git pull
npm install
npm run build
pm2 restart nome-cliente
```

## Nota sobre o Claude/IA

Nenhum dado do Claude Code, da API da Anthropic ou de qualquer IA aparece
nos servidores ou no código deployado. O template é puro Next.js — o Claude
só participou do desenvolvimento local.
