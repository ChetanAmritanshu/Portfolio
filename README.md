# Chetan Amritanshu — Portfolio

A static-first engineering portfolio built with Next.js static export, React, TypeScript, and Tailwind CSS.

## Requirements

- Node.js 24 LTS
- npm 11+

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run build:pages
```

The standard build targets a root or custom-domain deployment. `build:pages` validates a repository-subpath deployment at `/Portfolio`.

## Deployment configuration

`BASE_PATH` is empty for root hosting and `/repository-name` for repository hosting. `SITE_URL` is reserved for canonical and social metadata once the final domain is known.

Next.js prerenders the homepage and all approved project paths into `out` as static HTML. GitHub Pages can serve each route directly without a runtime server or SPA fallback.

Pushes to `main` run lint, typecheck, tests, and the repository-subpath export before the generated `out` directory is deployed through GitHub Pages.

## Content integrity

All factual profile and project content lives in `app/content`. Unknown external URLs and assets remain explicit placeholders rather than fabricated values.

## Audio architecture

Phase 4 uses a lazy native Web Audio engine with master, ambient, UI, transition, and system channels. Sound is off by default, preference storage is failure-safe, and no audio context or ambient layer is created before consent or a subsequent valid interaction. Current cues and ambience are deliberately restrained procedural placeholders; the interface ships no third-party audio assets or music.

## Boot sequence development

The cinematic initialization layer runs once, followed by a short returning-visit micro-boot. Append `?intro=replay` to the homepage URL to replay the full sequence without clearing unrelated browser state. Reduced-motion visitors receive a short reveal instead of the cinematic sequence.
