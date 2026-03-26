# Claude Agents – DynamoHome

Agent definitions have moved to individual files in `.claude/agents/`. Each file uses YAML frontmatter with `name`, `description`, `model`, and `tools`, followed by a detailed system prompt.

## Available agents

| Agent | File | Use when |
|---|---|---|
| **frontend-agent** | `agents/frontend-agent.md` | Implementing/modifying React components, UI features, localization, unit tests |
| **testing-agent** | `agents/testing-agent.md` | Writing or maintaining Playwright e2e tests, building Page Object classes |
| **build-agent** | `agents/build-agent.md` | Modifying webpack config, tsconfig, jest config, npm scripts, CI pipelines |
| **code-review-agent** | `agents/code-review-agent.md` | Reviewing PRs for correctness, test coverage, localization, Dynamo integration |

## Agent selection guide

- **New React component or UI change** → `frontend-agent`
- **Bug in a component's rendering or interaction** → `frontend-agent`
- **Missing or broken unit tests** → `frontend-agent`
- **New e2e test scenario or Playwright POM class** → `testing-agent`
- **Build failure, webpack change, tsconfig change** → `build-agent`
- **PR review or code quality assessment** → `code-review-agent`
