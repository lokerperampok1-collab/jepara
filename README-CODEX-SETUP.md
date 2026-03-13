# Codex setup notes

Modern Codex uses:
- `AGENTS.md` for project instructions
- `SKILL.md` inside a skill folder for reusable workflows
- `.codex/config.toml` for Codex config and MCP servers

It does not require an `mcp.json` file for normal MCP setup.

## Suggested usage
1. Put these files in the root of your new repo.
2. Place your real `products.json` in the project root.
3. Start Codex in that repo.
4. Paste the contents of `00-codex-master-prompt.txt`.

## Optional MCP setup via CLI
- `codex mcp list`
- `codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp`
- `codex mcp add context7 -- npx -y @upstash/context7-mcp`
