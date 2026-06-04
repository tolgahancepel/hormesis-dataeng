# Hormesis

A personal data-engineering knowledge base for leveling up from mid- to senior-level.

The name *hormesis* refers to the biological principle that controlled, repeated stressors produce stronger adaptation. The site is structured the same way: small, focused study sessions accumulating into senior-level mastery.

## Stack

- [Astro](https://astro.build) + MDX
- Static site, content collections, zero client-side JS by default

## Run locally

```bash
npm install
npm run dev
```

The site runs at `http://localhost:4321`.

## Structure

- `src/data/domains.ts` — single source of truth for the 13 study domains
- `src/content/topics/` — one MDX file per subtopic
- `src/layouts/` — page layouts (Home, Domain hub, Topic)
- `src/components/` — Header, Sidebar, DomainCard, ThemeToggle, TOC, Breadcrumbs
- `src/pages/` — Astro routes
- `src/styles/global.css` — design tokens, typography, dark/light mode
