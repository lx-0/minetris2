# CI/CD Pipeline

## Pipeline Overview

Minetris uses **GitHub Actions** for continuous integration and deployment. The pipeline runs automatically on every push to `main` and on all pull requests targeting `main`.

Workflow file: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

## CI Workflow

Runs on: PRs to `main` and direct pushes to `main`

| Stage      | Trigger              | What it does                                      |
| ---------- | -------------------- | ------------------------------------------------- |
| Lint       | PR, push to `main`   | ESLint — enforces code style and catches errors   |
| Type Check | PR, push to `main`   | `tsc --noEmit` — validates TypeScript types       |
| Build      | PR, push to `main`   | `vite build` — compiles the app into `dist/`      |

> **Note:** There is currently no automated test suite. Unit/integration tests should be added under a `test` script in `package.json` and integrated into the workflow when ready.

## CD Workflow

Runs on: push to `main` only (not on PRs)

| Stage        | Trigger          | What it does                                              |
| ------------ | ---------------- | --------------------------------------------------------- |
| Upload pages | Push to `main`   | Uploads `dist/` as a GitHub Pages artifact                |
| Deploy       | After CI passes  | Deploys the artifact to GitHub Pages via `deploy-pages`   |

The `deploy` job requires the `ci` job to succeed and uses the `github-pages` environment.

## Deployment Target

- **Production**: GitHub Pages — URL configured in the repository's GitHub Pages settings (e.g., `https://<owner>.github.io/minetris2/`)

No staging environment is currently configured.

## Environment Variables / Secrets

No secrets are required. GitHub Pages deployment uses the built-in `GITHUB_TOKEN` permissions (`pages: write`, `id-token: write`).

## Rollback Procedure

1. Identify the failing deployment via the GitHub Actions run log or the GitHub Pages environment history.
2. Find the last known-good commit on `main` (`git log --oneline`).
3. Revert the bad commit with `git revert <sha>` and push to `main` — this triggers a new CI/CD run that redeploys the previous state.
4. Verify the live site is healthy after the revert deploys.
5. Investigate the root cause before re-introducing the reverted change.

## Local Commands

```bash
# Install dependencies
npm ci

# Run lint
npm run lint

# Type check
npx tsc --noEmit

# Build (output goes to dist/)
npm run build

# Preview the built output locally
npm run preview
```
