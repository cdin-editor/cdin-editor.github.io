# CDIN Website

The CDIN website is built with [Astro](https://astro.build/) and deployed to GitHub Pages using GitHub Actions.

## Requirements

- Node.js 22.22.0 or newer
- pnpm 9.15.4 (pinned in `package.json` via `packageManager`, following the Gland website setup)

## Local development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Production build

```sh
pnpm build
pnpm preview
```

Astro writes the static site to `dist/`. The site uses the root URL as its base, so pages and public assets resolve from `/` rather than a repository subpath.

## GitHub Pages deployment

This project is configured as the **organization site** for `cdin-editor`. To publish at `https://cdin-editor.github.io/`, the repository itself must be named **`cdin-editor.github.io`**. Rename the current repository from `cdin.github.io` to `cdin-editor.github.io` in **Settings → General → Repository name** before deploying.

The workflow in `.github/workflows/deploy.yml` runs on pushes to `main` and can also be started manually from the Actions tab. It installs the locked dependencies, runs the regular Astro build, uploads `dist/`, and deploys it to GitHub Pages. No post-build URL rewriting script is needed.

For the first deployment, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
