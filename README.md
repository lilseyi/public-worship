# Public Worship

The website for [Public Worship](https://publicworship.life), a non-profit
bringing bold, public Jesus worship into the streets, parks, and trains of
New York City — and the [Global Echo Charitable](/ge) 501(c)(3) that funds it.

Open-source, MIT-licensed. Built with [Astro](https://astro.build) +
[Tailwind CSS](https://tailwindcss.com), deployed to GitHub Pages.

## Quick edits — no terminal required

The two things you'll edit most live in **`src/content/`** and can be
modified directly on github.com using the pencil icon.

### Add a link to the homepage Links section

1. Open `src/content/links.yaml` on github.com.
2. Click the pencil icon to edit.
3. Copy an existing block, paste it at the position you want the new link
   to appear, and edit the fields.
4. Drop the thumbnail image into `/public/links/` (drag it onto the folder
   in the repo browser).
5. Commit. The site rebuilds and deploys in ~30 seconds.

```yaml
- id: my-new-link
  title: My new link
  subtitle: Optional description
  url: https://example.com
  thumbnail: /links/my-new-link.png
  cta: Learn more
  featured: false
```

### Other editable content

- `src/content/faqs.yaml` — homepage FAQ accordion
- `src/content/impact.yaml` — homepage impact stats
- `src/content/beliefs.yaml` — Statement of Beliefs page

All four files have the same shape: a YAML list of entries. Each entry
needs a unique `id` (any short slug). The on-page order matches the file
order.

## Local development

```bash
pnpm install
pnpm dev
# open http://localhost:4321
```

## Project structure

```
public-worship/
├── public/                # Static assets served as-is
│   ├── decor/             # Decorative SVG icons (flag, heart, sun, lightbulb)
│   ├── images/            # Photos and large illustrations
│   ├── links/             # Thumbnails for the Links section
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── icons/         # Inline SVG components (Logo, Menu, Close, Chevron)
│   │   ├── layout/        # Header, Footer, MobileMenu
│   │   ├── sections/      # Page-section components (Hero, About, ImpactStats, …)
│   │   └── ui/            # Primitives: Button, Eyebrow, SectionHeading, Container
│   ├── content/
│   │   ├── config.ts      # Astro Content Collections schema
│   │   └── *.yaml         # Editable data files (see above)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── markdown.ts    # Tiny markdown helper for FAQ answers
│   ├── pages/             # One file per route
│   │   ├── index.astro    # /
│   │   ├── beliefs.astro  # /beliefs
│   │   ├── ge.astro       # /ge — Global Echo Charitable
│   │   ├── jesus.astro    # /jesus — gospel page
│   │   └── serve.astro    # /serve — volunteer
│   ├── scripts/
│   │   └── mobile-menu.ts # Vanilla TS controller for the mobile menu
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Tech stack

- **[Astro 5](https://astro.build)** — outputs pure static HTML, ships
  zero JS by default
- **[Tailwind CSS](https://tailwindcss.com)** — utility CSS, tree-shaken
- **TypeScript** — strict mode for the few `.ts` files
- **GitHub Pages** — hosting (deployed via GitHub Actions)
- **No client-side framework** — no React, no Vue, no hydration. Two tiny
  bits of vanilla JS power the mobile menu and the FAQ accordion.

## Deploy

The GitHub Actions workflow at `.github/workflows/deploy.yml` builds and
deploys on every push to `main`. To enable:

1. Go to **Settings → Pages** on the GitHub repo.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow will run automatically.

When you're ready to use the custom domain `publicworship.life`:

1. Set repo variable `PW_DEPLOY_TARGET` to `custom-domain`.
2. Drop a `CNAME` file in `/public/` containing `publicworship.life`.
3. Point your DNS at the GitHub Pages servers (see GitHub docs).

## License

MIT — see [LICENSE](./LICENSE).
