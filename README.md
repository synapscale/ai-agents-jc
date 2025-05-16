# Monorepo AI Agents JC

## Estrutura

- `ai-agents-sidebar/` — App Next.js para gerenciamento de agentes
- `chat-interativo/` — App Next.js para chat interativo
- `node-sidebar/` — App Next.js para visualização e manipulação de nodes
- `shared/` — Código compartilhado entre os projetos (componentes, hooks, utils, etc)

## Como rodar

1. Instale as dependências na raiz e nos projetos:
   ```bash
   pnpm install
   ```
2. Rode o projeto desejado:
   ```bash
   cd ai-agents-sidebar && pnpm dev
   # ou
   cd chat-interativo && pnpm dev
   # ou
   cd node-sidebar && pnpm dev
   ```

## Boas práticas
- Sempre que criar algo reutilizável, coloque em `shared/`.
- Use o alias `@shared` para importar do compartilhado.
- Mantenha cada app isolado, mas aproveite o máximo de código comum.

---

Dúvidas? Consulte os READMEs de cada projeto ou abra uma issue.
