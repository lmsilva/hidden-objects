# Deployment — GitHub Pages (recommended)

The Lost Line is a **static site**. GitHub Pages is **free** and sufficient for this game.

## One-time GitHub setup

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment**
   - Source: **GitHub Actions**
3. Push to `main` (or `master`). The workflow `.github/workflows/deploy-github-pages.yml` builds and deploys automatically.
4. Your game will be at:

   `https://<username>.github.io/<repo-name>/`

   Example: `https://you.github.io/hidden-objects/`

### If your repo name is not `hidden-objects`

The build uses the actual repo name automatically in CI. For **local** production builds that match GitHub:

```bash
set GITHUB_PAGES=true
set VITE_GITHUB_PAGES=true
set GITHUB_REPOSITORY_NAME=Your-Repo-Name
npm run build
```

## How routing works on GitHub Pages

Project pages use a sub-path (`/repo-name/`). The production build uses:

- **Hash routing** (`#/map`, `#/play/...`) so every screen works without server rewrite rules
- **Asset base path** `/repo-name/` so JS/CSS/images load correctly

Local `npm run dev` uses normal paths (no hash) at `http://localhost:5173/`.

## Soundtrack in CI

The deploy workflow runs `npm run download:soundtrack` (theme + first 3 stations) before build. Run locally:

```bash
npm run download:soundtrack        # MVP tracks
npm run download:soundtrack:all    # all 26 tracks (~large download)
```

## Self-hosting on Apache

Still supported — see `deploy/apache.htaccess`. Copy `dist/` to your server; use normal BrowserRouter build (without `GITHUB_PAGES` env).

## What you do not need

- Paid hosting
- Database or backend
- Node.js on the server (only for building, not serving)
