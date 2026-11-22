# Gateleven — Governance & Compliance HUB

Entrada GitHub Pages da Academia existente, com autenticação e recursos privados no Supabase atual.

**Estado:** adaptador testado; publicação GitHub Pages por ativar.

O repositório pode ser público. Não contém RH, palavras-passe, tokens de sessão, documentos internos ou apresentações pessoais. A chave no cliente é apenas a publishable key, com acesso sujeito a RLS.

Em Settings → Pages escolher Deploy from a branch, main, /docs. Em GitHub Free o repositório tem de ser público. O endereço previsto é https://academiagateleven-ship-it.github.io/academia-g11-compliance/ — confirmar deployment antes de distribuir.

A documentação técnica está em [integracao/github-pages/README.md](integracao/github-pages/README.md). A migração inicial em supabase/migrations é histórica, sem dados; não a reaplicar.

A versão Sites continua preservada. A mudança de endereço pede nova autenticação e não transfere automaticamente preparações guardadas apenas num navegador.
