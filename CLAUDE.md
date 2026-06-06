# A la Carte — Project Context

## What it is
Mobile app (Android + iOS) for managing everyday meals and recipes.

## Core features
- **Recipe library** — create, store, browse recipes with ingredients and steps
- **Collaborative** — sharable library, multiple users can contribute and edit
- **Online resources** — attach links to Instagram posts/reels, external recipe URLs
- **Ingredient summary** — select N recipes → generate merged shopping list of all ingredients

## GitHub
- Repo: `https://github.com/mamak-le-fameux/a-la-carte`
- Owner account: `mamak-le-fameux` (personal)

---

## Tech Stack

### Framework — Quasar v2
- Built on Vue 3
- Single codebase → Android, iOS (Capacitor), PWA, Electron
- Docs: https://v2.quasar.dev
- CLI commands:
  - `quasar dev` — dev server (web)
  - `quasar dev -m capacitor -T android` — Android dev
  - `quasar dev -m capacitor -T ios` — iOS dev
  - `quasar build -m capacitor -T android` — Android build
  - `quasar build -m pwa` — PWA build

### Mobile — Capacitor
- Configured in `quasar.config.ts` under `capacitor`
- Splash screen hidden on start (`hideSplashscreen: true`)
- Native plugins: add via `npm install @capacitor/<plugin>`

### Language — TypeScript (strict)
- Strict mode enabled in `quasar.config.ts` → `typescript.strict: true`
- Vue shim enabled (`vueShim: true`)

### State — Pinia
- Store files in `src/stores/`
- Use Composition API style (`defineStore` with `setup` function)

### Routing — Vue Router v5
- Config in `src/router/`
- Hash mode (`vueRouterMode: 'hash'`) — required for Capacitor

### i18n — vue-i18n v11
- Locale files in `src/i18n/`
- Boot file: `src/boot/i18n.ts`
- Add new languages by creating `src/i18n/<locale>/index.ts`

### Styling — SCSS + Quasar design system
- Global styles: `src/css/app.scss`
- Quasar variables (colors, breakpoints): `src/css/quasar.variables.scss`
- Use Quasar components (`QBtn`, `QCard`, `QList`, etc.) — auto-imported

### Icons
- Material Icons (loaded via `@quasar/extras`)
- Usage: `<q-icon name="restaurant" />`

### Linting / Formatting
- ESLint flat config: `eslint.config.js`
- Prettier: `.prettierrc.json`
- Run lint: `pnpm lint`
- Run format: `pnpm format`

### Package manager — pnpm
- Always use `pnpm`, not npm or yarn
- Workspace config: `pnpm-workspace.yaml`

---

## Project structure

```
src/
  boot/         # App initialization (i18n, plugins)
  components/   # Reusable Vue components
  css/          # Global styles and Quasar variables
  i18n/         # Translation files
  layouts/      # Page layouts (MainLayout.vue)
  pages/        # Route-level page components
  router/       # Vue Router config and routes
  stores/       # Pinia stores
  assets/       # Static assets
```

---

## Git identity
- Local git user set to `mamak-le-fameux` (name: Mamak, email: mamak-le-fameux@users.noreply.github.com)
- Remote uses HTTPS — `GH_TOKEN` env var (set via direnv in `~/devs/mamak/.envrc`) handles auth
