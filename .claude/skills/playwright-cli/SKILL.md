---
name: playwright-cli
description: Automates browser interactions for web testing, form filling, screenshots, and data extraction. Use when the user needs to navigate websites, interact with web pages, fill forms, take screenshots, test web applications, or extract information from web pages.
allowed-tools: Bash(playwright-cli:*)
---

# Browser Automation with playwright-cli

Used in DynamoHome for **exploratory testing** — navigating the live dev server, discovering `data-testid` gaps, and validating interactions before writing formal Playwright tests.

## Typical DynamoHome workflow

```bash
# 1. Start the dev server first
npm run start

# 2. Open the app
playwright-cli open http://localhost:8080

# 3. Take a snapshot to see the current state and element refs
playwright-cli snapshot

# 4. Interact with elements using refs from the snapshot
playwright-cli click e5
playwright-cli snapshot

# 5. Close when done
playwright-cli close
```

## Core commands

```bash
playwright-cli open http://localhost:8080   # open the app
playwright-cli goto http://localhost:8080   # navigate to a URL
playwright-cli snapshot                     # capture page state + element refs
playwright-cli click e3                     # click element by ref
playwright-cli hover e4                     # hover over element
playwright-cli press Enter                  # keyboard press
playwright-cli eval "document.title"        # run JS on the page
playwright-cli screenshot                   # take a screenshot
playwright-cli console                      # view console output
playwright-cli network                      # view network requests
playwright-cli close                        # close the browser
```

## Snapshots

After each command, playwright-cli returns a snapshot of the current page with element refs (e.g. `e5`, `e12`). Use these refs to interact with specific elements. Snapshots are saved under `.playwright-cli/` — this folder is git-ignored.

## What to do with findings

Once you have identified the interactions and selectors needed:
1. Add any missing `data-testid` attributes to the source components (via the `frontend-agent`)
2. Create Page Object classes in `tests/e2e/pages/` or `tests/e2e/components/`
3. Write formal test cases in the appropriate `tests/e2e/*.spec.ts` file

Do not leave raw `playwright-cli` findings as permanent tests — convert them into the POM structure defined in the `end-to-end-testing` skill.
