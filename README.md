# 🐱 Casa dos Gatinhos — Site + Painel Admin

**Site público:** [casadosgatinhos.vercel.app](https://casadosgatinhos.vercel.app)
**Painel admin:** [casadosgatinhos.vercel.app/admin](https://casadosgatinhos.vercel.app/admin)

## Estrutura

- `/` — Site público (gatos, memorial, loja, apadrinhamento, transparência)
- `/admin` — Painel administrativo protegido por senha

## Funcionalidades do Site Público

- 59 gatos cadastrados com dados reais
- In Memoriam (Vitória, Sucrilhos, Ozzy, Chico, Bernardo)
- Loja solidária com pedidos via WhatsApp e e-mail
- QR Code PIX para doações
- Programa de apadrinhamento com 3 planos
- Prestação de contas com dados financeiros reais
- Eventos e campanhas

## Funcionalidades do Painel Admin

- Dashboard com KPIs em tempo real
- CRUD completo: gatos, padrinhos, lançamentos financeiros
- Despesas por categoria com gráficos visuais
- Exportação/importação de backup JSON
- Dados persistidos via localStorage

## Deploy

Push para `main` → Vercel faz deploy automático.

## Senha Admin

Senha padrão: `gatinhos2026` (alterar em `pages/admin.jsx`, constante `ADMIN_PASSWORD`)
