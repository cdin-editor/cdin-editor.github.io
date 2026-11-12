# AGENTS.md

## Commands

- `pnpm install` — Node `>=22.12.0` (`engines`); pnpm only (`pnpm-lock.yaml`).
- `pnpm dev` — `localhost:4321`. In OpenCode prefer `pnpm astro dev --background`; manage with `pnpm astro dev status|logs|stop`.
- `pnpm build` → `dist/` — static site, no SSR. This is the only verification step: there is no test, lint, typecheck, or CI config.
- `pnpm preview` — serve the build. `pnpm astro ...` is the CLI passthrough; `astro check` would require installing `@astrojs/check` (not present).

## Scope

- This is the cdin marketing + documentation site. The editor source (C/Lua) is `cdin-editor/cdin`, not this repo.
- `README.md` is the untouched Astro starter — don't rely on it.
- `CLAUDE.md` is a symlink to this file; edit `AGENTS.md`.

## Structure

- Routes live in `src/pages/`: `/`, `/about`, `/download`, `/docs`, `/docs/[...slug]`, 404.
- Docs content lives in `src/docs/**/*.md`, not `src/content/`; the `docs` collection in `src/content.config.ts` globs `./src/docs`.
- To add a doc, create `src/docs/<section>/<slug>.md` starting with `# Title` (frontmatter `title` is not rendered). `src/lib/docs.ts` uses the first path segment as the sidebar section and the rest as the label, so routes/nav update automatically. Existing sections: `architecture`, `guides`, `others`.
- `src/pages/docs.astro` is the docs landing page and imports `src/data/README.md` directly — that README is page content, unlike the other `src/data/*.ts` copy/link modules.
- `src/components/ui/` is generated shadcn UI; `src/components/{layout,sections}/` are site components; `src/lib/` holds shared helpers.

## Conventions

- Path alias `@/*` → `src/*` (`tsconfig.json`, `components.json`).
- Tailwind v4 via `@tailwindcss/vite`; there is no `tailwind.config.*`. Theme tokens/variants live in `src/styles/global.css` (`@theme`, `@custom-variant`).
- shadcn style `base-nova` is built on `@base-ui/react`, not Radix: compose with the `render` prop, not `asChild`. Add components with `pnpm dlx shadcn@latest add <component>`.
- `cn` comes from the `cn` package (re-exported by `src/lib/utils.ts`); don't replace it with local `clsx`/`twMerge`.
- Global `* { border-radius: 0 }` and the Fira Code body font are intentional; don't "fix" the square corners.
- Theme: `src/components/layout/ThemeScript.astro` applies `localStorage.theme` / `prefers-color-scheme`, toggles `.dark` on `<html>`, and syncs storage via `MutationObserver`. `ModeToggle.tsx` toggles the same class — keep both paths consistent.
- `public/` is served at root: use `/cdin-icons/...`, never `/public/...`.
- No formatter/linter config; don't introduce tooling or reformat unrelated files.

## Build / deploy

- Builds call the GitHub API for the release tag (`src/lib/getRelease.ts`) and contributors (`src/components/sections/Contributors.astro`). Both have fallbacks (`v0.2`, `src/data/contributors.json`); offline warnings are not build failures.
- `dist/` and `.astro/` are generated and gitignored — don't edit or commit.

- GitHub Pages repo (`cdin-editor/cdin-editor.github.io`) — `pnpm build` must pass, no server/env to configure.
