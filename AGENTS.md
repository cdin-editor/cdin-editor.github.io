# AGENTS.md

## Commands

- `pnpm install` — Node `>=22.12.0` required (`engines` in `package.json`).
- `pnpm dev` — dev server at `localhost:4321`; in OpenCode use `astro dev --background` and manage with `astro dev stop` / `status` / `logs`.
- `pnpm build` → `dist/` | `pnpm preview` — static site, no SSR.
- `pnpm astro ...` — CLI passthrough (`astro add`, `astro check`).

## Stack

- Astro 7 + `@astrojs/react` (React 19 islands) + Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config.*`).
- shadcn `base-nova` — config in `components.json`, CSS entry `src/styles/global.css` (`@import "tailwindcss"` + `@import "shadcn/tailwind.css"`).

## Conventions

- Path alias `@/*` → `src/*` (`tsconfig.json` `paths` + `components.json` aliases: `components`, `lib`, `ui`, `hooks`).
- `src/lib/utils.ts` re-exports `cn` from the `cn` package — don't replace with local `clsx`/`twMerge` impl.
- Add shadcn components with `pnpm dlx shadcn@latest add <component>`; style/CSS vars live in `src/styles/global.css`.
- Theme: `src/layouts/BaseLayout.astro` inline `<script is:inline>` reads `localStorage.theme` / `prefers-color-scheme`, toggles `document.documentElement` `.dark`, and `MutationObserver` syncs back to `localStorage`. `src/components/ModeToggle.tsx` must mutate the same class — keep in sync.
- Static assets in `public/cdin-icons/` served at `/cdin-icons/...` — reference as `/cdin-icons/...` never `/public/...` (build breaks otherwise).

## Build

- `dist/` and `.astro/` are generated and gitignored — don't edit or commit.
- GitHub Pages repo (`cdin-editor/cdin-editor.github.io`) — `pnpm build` must pass, no server/env to configure.
