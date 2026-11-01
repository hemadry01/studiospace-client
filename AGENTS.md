# AGENTS.md

## What this is

Next.js 16.4.3 App Router client app for "StudioSpace". Early stage — currently just a landing page (`src/app/page.tsx`), `/sign-up`, and a shared `Navbar`. No backend, no tests, no CI.

## Commands

- `npm run dev` — dev server on :3000. Turbopack is the default (build uses it too); the Tailwind CSS pipeline is wired through `turbopack.rules` in `next.config.ts`, so config changes need a dev-server restart.
- `npm run lint` — ESLint over the whole repo (flat config in `eslint.config.mjs`; no separate formatter).
- `npx tsc --noEmit` — typecheck (no `typecheck` npm script exists).
- `npm run build` — production build; also typechecks, so it is the strongest single verification step.

No test runner is installed; don't invent one.

## Gotchas

- **Generated route types:** pages/layouts use the Next-generated globals `PageProps` and `LayoutProps` (see `layout.tsx`). They live in `.next/types/` and `.next/dev/types/`, which are gitignored — on a fresh clone `tsc --noEmit` fails until you've run `npm run dev` or `npm run build` once.
- **Tailwind v4, CSS-first:** there is no `tailwind.config.js`. Theme customization goes in `@theme` blocks in `src/app/globals.css`, which also imports `@heroui/styles` — HeroUI's component styling comes from that import, so don't remove it.
- **UI stack:** forms and components use HeroUI v3 (`@heroui/react`), icons from `@gravity-ui/icons`, images via `next/image` with static imports from `src/assets/`.
- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`); components follow the Rules of React strictly.
- **Path alias:** `@/*` → `src/*`.
- Structure: routes in `src/app/<route>/page.tsx`, interactive client components (`"use client"`) in `src/components/`. The Navbar links to `/login`, `/explore`, `/about`, `/how-it-works` — pages that don't exist yet; create them rather than assuming they are missing by accident.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
