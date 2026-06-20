# Technical decision document: francanete.dev GEO site

## Recommendation

Use **Astro + MDX + Astro Content Collections**.

Keep the site **static-first**, git-authored, crawlable, fast, and machine-readable. Do **not** add a database or CMS for v1.

Reason: this project is primarily a research publishing site, not an app. `geo-research.md` emphasizes crawlability, semantic structure, evidence density, freshness, dated facts, tables, methodology, and repeatable experiments. Astro’s default model fits that better than an app-first framework.

The current Next.js app is only a placeholder and can be wiped. The only file to preserve is `geo-research.md`.

---

## Repository findings

Current repo is a minimal placeholder Next.js app:

- `package.json`: Next 16, React 19, TypeScript, ESLint only.
- `app/page.tsx`: client-rendered typing animation for `francanete.dev`.
- `app/pollas/page.tsx`: placeholder page.
- `README.md`: default create-next-app README.
- `geo-research.md`: the real strategic source material and should drive the rebuild.

Nothing in the current app architecture is worth preserving except maybe TypeScript conventions.

---

## Stack comparison

### 1. Next.js + MDX/content files

**Pros**

- Already installed.
- Can statically render pages.
- Good metadata, sitemap, RSS support.
- Good if future interactive React experiments become important.

**Cons**

- App-router complexity is unnecessary for a static research site.
- Easier to accidentally introduce client-rendered content.
- MDX/content setup is less content-native than Astro Content Collections.

**Verdict:** acceptable, but not the best fit.

---

### 2. Next.js + database-backed content

**Pros**

- Useful later for large experiment datasets, dashboards, filtering, scheduled prompt runs, or admin workflows.

**Cons**

- Adds migrations, hosting complexity, data modeling, backups, APIs, and operational work.
- Encourages dashboard/SaaS thinking too early.
- Not needed for publishing research.

**Verdict:** reject for v1.

---

### 3. Astro + MDX/content collections

**Pros**

- Static-first by default.
- Excellent for long-form MDX research.
- Built-in content collections with typed frontmatter.
- Minimal client JavaScript.
- Clean HTML output.
- Strong fit for semantic, evidence-dense pages.
- Easy sitemap/RSS/canonical/JSON-LD generation.
- Good enough for light interactive islands later.

**Cons**

- Requires replacing the existing Next placeholder.
- Slightly less familiar if the project later becomes a full web app.

**Verdict:** recommended.

---

### 4. Simpler static-site option: Eleventy/Hugo/plain HTML

**Pros**

- Very fast and simple.
- Excellent static output.

**Cons**

- Less ergonomic TypeScript/content schema story.
- More manual metadata/schema handling.
- We may still want small interactive experiment components later.

**Verdict:** viable, but Astro is the better balance.

---

## Architecture

Static Astro site with:

- MDX research articles.
- MDX experiment writeups.
- JSON/CSV files for small experiment datasets.
- Typed frontmatter schemas.
- Generated index pages.
- Generated sitemap, RSS, canonical URLs, and JSON-LD.
- No auth.
- No dashboard.
- No CMS.
- No database.

Deployment target can be Vercel, Netlify, Cloudflare Pages, or any static host.

---

## What should be static

For v1, everything:

- Homepage.
- Research articles.
- Experiment protocols.
- Experiment result summaries.
- Prompt panels.
- Glossary.
- Methodology pages.
- Source/bibliography pages.
- Sitemap.
- RSS feed.
- JSON-LD structured data.
- Robots policy.

---

## What should be database-backed

Nothing now.

A database may become useful later for:

- High-volume prompt-run observations.
- Scheduled experiment ingestion.
- Filtering/querying results by engine, date, prompt, cited URL, or claim.
- Private admin workflows.
- Public interactive dashboards.

Until then, store small structured experiment data as versioned files in git.

---

## CMS decision

No CMS now.

Use git-authored MDX. This keeps the publishing workflow simple, reviewable, and durable.

Consider a CMS later only if:

- non-technical editors need to publish,
- publishing frequency becomes high,
- editorial review workflows become painful,
- or content needs remote editing outside git.

---

## Proposed folder structure

```txt
francanete-dev/
  geo-research.md

  src/
    content/
      config.ts

      research/
        how-ai-search-systems-select-and-cite-sources.mdx
        geo-evidence-baseline.mdx

      experiments/
        crawlability-audit.mdx
        evidence-container-rewrite-test.mdx
        freshness-test.mdx
        primary-source-format-test.mdx

      datasets/
        prompt-panels/
          geo-baseline-prompts.json

        experiments/
          crawlability-audit/
            runs/
              2026-06-20.json

    pages/
      index.astro
      research/
        index.astro
        [slug].astro
      experiments/
        index.astro
        [slug].astro
      glossary.astro
      methodology.astro
      rss.xml.ts
      sitemap.xml.ts
      robots.txt.ts

    layouts/
      BaseLayout.astro
      ArticleLayout.astro
      ExperimentLayout.astro

    components/
      EvidenceBadge.astro
      CitationList.astro
      ExperimentStatus.astro
      MetadataTable.astro
      EngineMatrix.astro

    lib/
      site.ts
      schema.ts
      content.ts
      dates.ts

  public/
    favicon.svg
```

---

## Content model

Research articles should be stored as MDX in `src/content/research`.

Suggested frontmatter:

```yaml
title: "How AI Search Systems Select and Cite Sources"
description: "Evidence-based summary of how ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews discover and cite sources."
date: "2026-06-20"
updated: "2026-06-20"
status: "published"
evidenceGrade: "strong-evidence"
engines:
  - ChatGPT
  - Perplexity
  - Gemini
  - Claude
  - Google AI Overviews
tags:
  - GEO
  - citations
  - AI search
canonical: "https://francanete.dev/research/how-ai-search-systems-select-and-cite-sources/"
```

Research pages should use:

- clear H1/H2/H3 structure,
- summary at the top,
- dated claims,
- evidence-grade labels,
- tables,
- definitions,
- citations,
- methodology notes,
- “unknowns” sections.

---

## Experiment model

Experiments should be stored as MDX in `src/content/experiments`.

Suggested frontmatter:

```yaml
title: "Evidence-container Rewrite Test"
description: "Testing whether structured, evidence-dense pages are cited more often by AI search systems."
date: "2026-06-20"
updated: "2026-06-20"
status: "planned" # planned | running | complete
hypothesis: "Evidence-dense pages with clear structure will be cited or reused more often."
engines:
  - ChatGPT
  - Perplexity
  - Gemini
  - Google AI Overviews
metrics:
  - citation incidence
  - cited URL position
  - answer-text overlap
  - source reuse
promptPanel: "geo-baseline-prompts"
```

Raw experiment observations can start as JSON:

```txt
src/content/datasets/experiments/evidence-container-rewrite-test/runs/2026-06-20.json
```

Only move to a database if JSON/CSV becomes painful.

---

## GEO baseline features

Implement from the beginning:

- Static HTML for all important content.
- Semantic headings and landmarks.
- Canonical URLs.
- Sitemap with `lastmod`.
- RSS feed for research and experiments.
- JSON-LD:
  - `WebSite`
  - `Article` or `ScholarlyArticle`
  - `Dataset` where relevant
  - `BreadcrumbList`
- Open Graph/Twitter metadata.
- Clear author/date/updated metadata.
- Human-readable citations.
- Evidence-grade badges.
- Robots policy that does not accidentally block search crawlers.
- Optional crawler policy page explaining bot access choices.
- No reliance on speculative “AI schema” tricks.
- Treat `llms.txt` as optional/experimental, not core strategy.

---

## What not to build yet

Do **not** build:

- auth,
- dashboard,
- SaaS features,
- CMS,
- database,
- comments,
- user submissions,
- payment flows,
- automated prompt runner,
- scheduled crawlers,
- vector search,
- admin UI,
- elaborate design system,
- speculative GEO hacks.

Focus first on publishing useful, structured, citable research.

---

## Implementation phases

### Phase 1 — Static foundation

- Replace placeholder Next app with Astro.
- Preserve `geo-research.md`.
- Add content collections.
- Add homepage, research index, experiment index.
- Add base layouts and metadata helpers.

### Phase 2 — First research content

- Convert `geo-research.md` into one or more publishable MDX articles.
- Add evidence-grade labels.
- Add citation/source structure.
- Add glossary/methodology pages.

### Phase 3 — First experiments

- Publish initial experiment protocols:
  - crawlability audit,
  - evidence-container rewrite test,
  - freshness test,
  - primary-source format test.
- Add prompt panel JSON.
- Add manual result-entry format.

### Phase 4 — Measurement improvements

- Add analytics only if needed.
- Add experiment result summaries.
- Add RSS/sitemap refinements.
- Add optional `llms.txt` as an explicit experiment.

### Phase 5 — Later database decision

Only revisit database/CMS if static files stop scaling.

---

## First concrete coding task

If you approve the stack, the first coding task should be:

> Wipe the placeholder Next.js app, initialize a minimal Astro + TypeScript + MDX project in the same repo, preserve `geo-research.md`, and create the first static content architecture: homepage, research index, experiment index, content collections, sitemap, robots, RSS, and base metadata helpers.
