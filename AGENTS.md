# Agent instructions

You're working on an open-source Astro + Tailwind static site that replicates
[publicworship.life](https://www.publicworship.life). Live at
<https://lilseyi.github.io/public-worship/>.

The owner's #1 ask is **exact visual parity with the source homepage** — close
isn't good enough. Your job is to keep that bar high while shipping changes the
owner asks for.

## How the site is built

- **Astro 5** static output. No React/Vue. Vanilla TS only, in `src/scripts/`.
- **Tailwind** for styling, with brand colors and tokens pinned in `tailwind.config.mjs`.
- **Editable data** lives in `src/content/*.yaml` with schemas in `src/content/config.ts`.
- **Routes** map 1:1 to files under `src/pages/` (`index.astro` = `/`, etc.).
- **Deploys** auto-run on push to `main` via `.github/workflows/deploy.yml`.

Pages render at `/public-worship/...` on GitHub Pages (project subpath), not at
the root, until the custom domain ships.

## Hard rules — break these and the site 404s or looks wrong

1. **Always wrap public-asset paths and internal hrefs in `asset()`** from
   `src/lib/asset.ts`. Astro does NOT auto-prefix `<img src="/foo.png">` or
   `<a href="/about">` with the GitHub Pages base path.

   ```astro
   ---
   import { asset } from "../lib/asset";
   ---
   <img src={asset("/images/event-1.png")} alt="" />
   <a href={asset("/beliefs")}>Beliefs</a>
   ```

   After edits, sanity check:

   ```bash
   grep -rn 'src="/' src/   # should return nothing
   grep -rn 'href="/' src/  # should return nothing
   ```

2. **`astro.config.mjs` `redirects` destinations also need manual `${basePath}`
   prefixing.** Already wired — don't break the existing pattern when adding
   new redirects.

3. **Corben (the display font) ships only 400 and 700.** `font-semibold` and
   `font-medium` silently round up to 700, producing a heavier look that
   doesn't match source. Use `font-normal` everywhere on `font-display`
   elements; `font-bold` only for the rare uppercase logo label.

4. **Brand colors are pinned in `tailwind.config.mjs`** (ink `#210909`, cream
   `#FDF6F6`, red.500 `#D23B3A`, pink.soft `#F2D2D2`, pink.softer `#F9DFDF`,
   peach `#F5E5C7`, link-blue `#4A6BC0`). Use the named tokens — don't
   hard-code hexes elsewhere.

5. **No emojis in code or copy unless the owner asks for them.**

## Local dev workflow

```bash
pnpm install
pnpm dev                 # http://localhost:4321/public-worship/
pnpm build               # outputs dist/ at /public-worship/ base
PW_DEPLOY_TARGET=custom-domain pnpm build  # for the future custom domain
```

The dev server hot-reloads on file changes. Test there before pushing.

## Updating the site

### Updating editable content (no code change needed)

| File                          | What it controls                            |
| ----------------------------- | ------------------------------------------- |
| `src/content/links.yaml`      | Homepage Important Links cards              |
| `src/content/faqs.yaml`       | Homepage FAQ accordion                      |
| `src/content/impact.yaml`     | Homepage stats (700K+, 15+, etc.)           |
| `src/content/beliefs.yaml`    | `/beliefs` Statement of Beliefs list        |

Each file is a YAML list. Each entry needs a unique `id`. Order in file =
order on page. Schemas in `src/content/config.ts` will fail the build if a
required field is missing.

For images referenced from YAML, drop the file in the matching `public/`
subfolder (e.g. thumbnails for links go in `public/links/`).

### Updating an existing section

Sections are in `src/components/sections/`:

```
About.astro           BeliefsList.astro    DonateCta.astro
FaqList.astro         GeAbout.astro        Hero.astro
HeroVideo.astro       ImpactStats.astro    ImportantLinks.astro
JesusSection.astro    MidVideo.astro       ServeNeeds.astro
```

Each section is a self-contained `.astro` file. Edit in place. Reuse the
shared UI primitives in `src/components/ui/`:

- `Container` — page-width wrapper, `size="default" | "wide"`
- `SectionHeading` — h2 + optional eyebrow, handles size variants
- `Eyebrow` — the small pill above headings; `size="chip" | "sm"`
- `Button` — primary/outline buttons with consistent sizes
- `LinkCard` — card used in Important Links; `bgImage` prop suppresses text overlay (poster mode)

For decoration:

- `public/decor/` — flag, heart, idea, sunny, wavy-texture(s), background-lines-pattern
- `public/icons/` — pencil, medal, react, comment-bubble, sandtimer, unknown (Saturn), microphone, etc.

### Hero pulse animation (gotcha)

The four hero decor icons (`flag`, `idea`, `heart`, `sunny`) carry
`data-animate="hero-object"`. They're wired up in two places:

- **Per-element CSS variables** on each `<img>` in `Hero.astro`:
  - `--rot: <Ndeg>` — resting rotation (preserved across the pulse)
  - `--pulse-delay: -<N>s` — negative delay starts the cycle mid-stride so
    the four icons pulse out of sync, not in lockstep
- **Keyframes** in `src/styles/global.css` (`@keyframes pw-float`).
  Duration is 0.9s alternate, scale `0.8 → 1.0`. Peak is at natural size —
  don't push past 1.0 (the owner has been clear icons shouldn't overshoot).

If you change durations or scale, eyeball it on the source first. Faster +
smaller is the established direction.

## Adding a new page

1. **Create the route file**: `src/pages/<slug>.astro`. The filename becomes
   the URL path (`src/pages/contact.astro` → `/contact`).

2. **Use `BaseLayout` and pull in section components**:

   ```astro
   ---
   import BaseLayout from "../layouts/BaseLayout.astro";
   import Container from "../components/ui/Container.astro";
   import SectionHeading from "../components/ui/SectionHeading.astro";
   ---

   <BaseLayout
     title="Page title — Public Worship"
     description="One-sentence description for SEO + social previews."
   >
     <section class="py-20 sm:py-28">
       <Container size="default">
         <SectionHeading eyebrow="Optional" align="center">
           Heading copy
         </SectionHeading>
         <!-- page body -->
       </Container>
     </section>
   </BaseLayout>
   ```

3. **For internal links to the new page elsewhere on the site**, always use
   `asset("/<slug>")` — the `asset()` helper handles the base path:

   ```astro
   <a href={asset("/contact")}>Contact</a>
   ```

4. **If the new page should appear in the header or footer nav**, edit
   `src/components/layout/Header.astro` and/or
   `src/components/layout/Footer.astro` directly.

5. **If the page needs editable content**, add a new YAML file under
   `src/content/` AND register a schema for it in `src/content/config.ts`
   (copy an existing collection block and adjust). Then in the page:

   ```astro
   ---
   import { getCollection } from "astro:content";
   const entries = await getCollection("yourCollection");
   ---
   ```

6. **Run `pnpm build` locally before pushing**. Astro will fail loudly on
   schema mismatches or invalid frontmatter — fix those first; don't push
   broken builds.

## Visual parity workflow

The owner's standing complaint is "looks similar, not exact." When making
visual changes:

- **Compare via `getComputedStyle` dumps + element-level screenshots**, not
  Playwright `fullPage` captures of the source. The original is Webflow with
  scroll-triggered animations; content sits at `opacity:0` until scrolled
  into view, so a static fullPage capture of the source is misleading.
- Drive the source with programmatic `scrollIntoView` + waits before
  screenshotting, or capture section-by-section.
- Always test the **live deploy**, not just `pnpm preview` — only the live
  deploy at `/public-worship/` catches asset-prefix bugs.
- Don't claim "exact match" without evidence. Quote the matched property
  ("matches at fontSize=68px, max-w 768px"), not the vibe.

## Testing locally before pushing

The owner has explicitly asked: **show that it works locally before
pushing.** Open `http://localhost:4321/public-worship/`, take a viewport
screenshot of any section you changed, and confirm visually. For animation
changes, sample the bounding box repeatedly to confirm motion + spec
(duration, scale range, out-of-sync delays).

## Deploying

Push to `main` triggers `.github/workflows/deploy.yml`. It typically takes
30–45 seconds.

```bash
git add <files>
git commit -m "<imperative tense subject — match recent commits>"
git push origin main

gh run list --repo lilseyi/public-worship --limit 1
gh run watch <id> --repo lilseyi/public-worship --exit-status
```

The owner prefers **one section per commit** with a descriptive body, and
will scrub the live URL between commits. After deploy, share the live URL
with a fresh cache-busting query string (`?cb=20260505a`) so they can verify
without a hard reload.

## Communication style

- Concise, direct, no preamble.
- Show concrete diffs, measurements, and live URLs.
- Don't claim "exact match" without evidence — say "matches at X computed
  property."
- Front-load questions before implementing. Ask all clarifying questions in
  one batch, then execute.
- Use subagents for: large searches, broad codebase reading, parallel
  implementations. Keep the main thread focused on decisions.

## Authorization scope

The owner (lilseyi) owns publicworship.life and has authorized copying its
visual design and assets into this repo. The text content and assets in the
repo were placed there by the owner or with their direction. Treat the
repo's existing YAML/components as the authoritative content; **do not pull
additional creative content from the source site without an explicit owner
instruction.**
