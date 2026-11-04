# AGENTS.md

## What this is

Next.js 16.4.3 App Router client app for "StudioSpace" — a studio rental/browsing/booking UI. Routes under `src/app` (`/`, `/browse-categories`, `/studio`, `/studio/[studioId]`, `/add-studio`, `/my-booking`, `/login`, `/sign-up`) plus a better-auth endpoint at `/api/auth/[...all]`. No tests, no CI.

## Commands

- `npm run dev` — dev server on :3000. Turbopack is the default (build uses it too); the Tailwind CSS pipeline is wired through `turbopack.rules` in `next.config.ts`, so config changes need a dev-server restart.
- `npm run lint` — ESLint over the whole repo (flat config in `eslint.config.mjs`; no separate formatter).
- `npx tsc --noEmit` — typecheck (no `typecheck` npm script exists).
- `npm run build` — production build; also typechecks, so it is the strongest single verification step.

No test runner is installed; don't invent one.

## Gotchas

- **Backend = better-auth + MongoDB, and that's it.** `src/lib/auth.ts` creates `betterAuth` with the MongoDB adapter; `/api/auth/[...all]/route.ts` exposes it via `toNextJsHandler`. Client side uses `src/lib/auth-client.ts`. Don't look for other API routes or a separate server.
- **`MONGODB_URL` is required.** `src/lib/auth.ts` throws at import time without it, and no `.env` is committed. Create one locally (DB name is hardcoded to `studiospace`) or the dev server fails on any route that touches auth.
- **Generated route types:** pages/layouts use the Next-generated globals `PageProps` and `LayoutProps` (see `layout.tsx`). They live in `.next/types/` and `.next/dev/types/`, which are gitignored — on a fresh clone `tsc --noEmit` fails until you've run `npm run dev` or `npm run build` once.
- **Tailwind v4, CSS-first:** there is no `tailwind.config.js`. Theme customization goes in `@theme` blocks in `src/app/globals.css`, which also imports `@heroui/styles` — HeroUI's component styling comes from that import, so don't remove it.
- **Two UI component kits coexist:** `src/components/ui/` is shadcn-generated (dozens of primitives), while pages also use HeroUI v3 (`@heroui/react`). Prefer existing primitives over writing new ones; icons come from `@gravity-ui/icons` and `lucide-react`.
- **`cn` is imported from its own package** (`import { cn } from "cn"` — a real npm package named `cn`), not the usual `@/lib/utils`.
- **Lint includes React Compiler rules** (`reactCompiler: true` in `next.config.ts`). `react-hooks/set-state-in-effect` errors out (not just warns): never call `setState` synchronously inside an effect body — defer it (e.g. in the event callback or via `queueMicrotask`) or use `useSyncExternalStore`. Existing shadcn-generated files in `src/components/ui/` must pass this too.
- **Path alias:** `@/*` → `src/*`.
- Structure: routes in `src/app/<route>/page.tsx`, interactive client components (`"use client"`) in `src/components/`.

## Known lint state (baseline)

`npm run lint` passes with 3 pre-existing `no-unused-vars` warnings (unused `StudioFature` import in `src/app/studio/[studioId]/page.tsx`, unused `handleBook` in `src/components/StudioDetails.tsx`, unused `CardHeader` in `src/components/StudioFature.tsx`). Zero errors — keep it that way; don't "fix" these warnings by removing app logic without checking whether the unused code is pending feature work.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
