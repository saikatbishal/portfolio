# saikatbishal.com — Portfolio Critique & Improvement Plan

> Reviewed: March 2026 | Full page scroll + Games + Blogs + CSS to Tailwind

---

## 🔴 Critical Bugs (Fix Immediately)

### 1. Perf Monitor Widget Visible on Production
**Problem:** The black dev performance overlay (FPS, MEM, Web Vitals) renders in the top-left corner on the live site, partially overlapping the logo. Visitors see it on first load.  
**Solution:** Gate it behind an env variable or keyboard shortcut. In Vite:
```js
// Only show in dev
if (import.meta.env.DEV) {
  renderPerfMonitor();
}
```
Or toggle it with `Ctrl+Shift+P` using a `keydown` listener.

---

### 2. CSS to Tailwind Page Renders Blank
**Problem:** Navigating to `/css-to-tailwind` shows a completely empty white page — no content, no error, just the nav and hatch columns. This is a critical failure. Anyone who finds it via the "More" dropdown hits a dead end.  
**Solution:** Check if it's a lazy-loaded component with a missing `Suspense` boundary, or a broken dynamic import. Add an error boundary:
```jsx
<ErrorBoundary fallback={<div>Something went wrong. <a href="/">Go home</a></div>}>
  <CssToTailwind />
</ErrorBoundary>
```
Also add a loading state so it doesn't flash blank.

---

### 3. Stats Counter Shows Wrong Values on First Load
**Problem:** The counter animation fires on scroll, so on first render it shows `2+ years / 11 projects / 53 contributions` — then jumps to `4+ years / 20+ projects / 100+` as you scroll past. This means the first impression is factually wrong and looks like a bug.  
**Solution:** Set the initial DOM value to the final target value, and animate *how* it gets there (count-up from 0), not from a wrong static fallback. Or use an IntersectionObserver that triggers only once, initialised with `0` as start.

---

## 🟡 Design Issues

### 4. Side Hatch Columns Too Wide
**Problem:** The diagonal stripe decorations on both sides consume ~15–20% of horizontal width each on large screens, making content feel pinched.  
**Solution:** Cap them at `max-width: 80px` each, or switch to a subtle border/shadow instead. The content area should breathe more.

---

### 5. Hero Role is Too Abstract
**Problem:** `role = "Architect of invisible cities"` is poetic but communicates nothing to a recruiter or client scanning for 10 seconds. They won't know you're a frontend developer.  
**Solution:** Add a plain secondary line beneath the code block:
```
Frontend Engineer · React · TypeScript · 4+ Years
```
Keep the poetic line — it's your brand — but give people the factual anchor too.

---

### 6. "Initiate Handshake" CTA is Ambiguous
**Problem:** Clever to devs, confusing to everyone else. Clients and hiring managers may not click it.  
**Solution:** Rename to `Say Hello →` or `Contact Me →`. You don't need to sacrifice personality — the rest of the site has enough of it.

---

### 7. Typewriter Effect is Dated
**Problem:** `I'm a JavaScript Expl|` (rotating text) is a pattern that peaked in 2019. It also undersells — "Explorer" doesn't match someone who shipped production systems at LTIMindtree and Ramco.  
**Solution:** Replace with a single confident static line. Examples:
- *"I build interfaces that think and tools that teach."*
- *"Frontend engineer. I care about the gap between design and code."*

---

### 8. Games Page — 4 of 6 Games Are "Coming Soon"
**Problem:** Half the page is placeholder cards with a generic dice emoji. Coming Soon on a portfolio reads as "didn't finish."  
**Solution (Option A):** Remove placeholders. Only show what's live.  
**Solution (Option B):** Ship one more game (Memory Match is the easiest — pure JS, no backend). Target having 3 live, 0 placeholders.  
**Also:** Replace the dice emoji `🎲` for unrelated games (Snake, Space Invaders). It's a visual non-sequitur. Use thematic icons: `🐍` for Snake, `👾` for Space Invaders, etc.

---

## 🔴 Content/Intent Mismatches

### 9. Brand Claims "Architect" but Projects Show "Beginner Padded List"
**Problem:** The hero positions you as a systems thinker. Then the projects section includes a Task Management Tool (Vue + Express + MySQL) — the most bootcamp-adjacent project imaginable. Ledgerflow has no live link or case study. The React Performance Dashboard is clever but the thumbnail is your own perf monitor widget, which is confusing without context.  
**Solution:**
- Write 2–3 sentence **outcomes** for each project. Not what it is — what it *did*. "Reduced review cycle time by 40%" beats "A collaborative task management app."
- Move the strongest 3 projects to the top and either cut or push weak ones to a secondary "More projects" link.
- Ledgerflow needs either a live link or a case study writeup. Without one, it's just a screenshot.

---

### 10. Blog Posts Use Portfolio Screenshots as Cover Images
**Problem:** Both blog posts use screenshots of your own portfolio as their cover thumbnails. The first post thumbnail literally shows the perf monitor widget. It looks like a mistake.  
**Solution:** Create proper cover images — even simple dark-background typography cards work. Figma template, 1200×630px, consistent style.

---

### 11. Blogs Are Raw README Files — Major Credibility Problem
**Problem:** You write genuinely on Medium (`@saikat.bishal786`) with narrative depth and a real voice. What's on the site are README-style markdown files about your own portfolio. This is the worst version of your writing ability on display, positioned as a "Blog."  
**Solution:** See the Static Blog Backend Strategy section below.

---

### 12. Your Real Story Is Missing Entirely
**Problem:** The most compelling thing about you — Metallurgy engineer who self-taught frontend, helped his family build a house, moved from Jamshedpur to Chennai — is nowhere on the portfolio. The Education section just lists NIT Jamshedpur as a dry fact. You're hiding the most human and memorable thing about yourself.  
**Solution:** Add a short "Origin" paragraph to a dedicated About section or beneath the hero. 3–4 sentences max. You already wrote it beautifully on Medium — adapt it. It will make you unforgettable to any interviewer.

---

### 13. CSS to Tailwind Tool Is Hidden in "More" Dropdown
**Problem:** A working, useful developer tool is buried behind a dropdown that most visitors won't open. This is arguably stronger portfolio evidence than your listed projects.  
**Solution:** Add it to the Projects grid as a card, tagged `TOOL`. Give it a proper description: "Paste raw CSS, get Tailwind class equivalents instantly."

---

### 14. "Tom Riddle's Diary" AI Widget Has No Context
**Problem:** There's a floating chat button labeled "Tom Riddle's Diary" in the bottom-right. Without a tooltip or onboarding hint, most visitors won't know what it does or that it's an AI assistant for your portfolio.  
**Solution:** Add a small tooltip on hover: *"Ask me anything about Saikat →"* and show a pulse animation on first load to draw attention. This is a unique feature — make visitors notice it.

---

## 💡 Games — New Ideas That Show Intent

Your two live games (Terminal Hacker, CSS Detective) work because they're **directly tied to your identity as a developer**. New games should follow the same rule: they should teach or demo something frontend-relevant.

| Game | Mechanic | Why It Works |
|---|---|---|
| **Regex Racer** | Type a regex that matches the shown string before time runs out | Shows you understand developer tools deeply |
| **Flexbox Froggy / Grid Gardener (your version)** | Drag elements to correct positions using CSS layout | Directly relevant to your frontend skills; shows teaching instinct |
| **Lighthouse Score Optimizer** | Given a broken page config, pick fixes to raise the score | Ties to your perf monitor project |
| **JS Type Coercion Quiz** | `[] + {}` → What does this return? Multiple choice with explanations | Every JS dev finds this funny; it's viral-shareable |
| **Selector Showdown** | Given HTML, write a CSS selector that targets the highlighted element | Classic frontend interview prep wrapped as a game |

**Rule:** Every game should be playable in under 2 minutes and teachable — games that make visitors *learn something* are the ones they share.

---

## 💡 Projects — What Would Actually Show Intent

Replace or augment weaker projects with things that align with your "Architect" brand:

| Project | What It Shows |
|---|---|
| **Design Token CLI** | You understand the design-to-code pipeline at a systems level |
| **React Component Diff Visualizer** | You think about developer experience |
| **Accessible Component Audit Tool** | You care about the craft beyond aesthetics |
| **Bundle Size Analyzer Dashboard** | Performance thinking — ties to your perf monitor work |
| **Your Coding Institute Website** | Real client work, real stakes, real design decisions (you're already building this) |
| **CSS to Tailwind (already built)** | Promote it properly — this is a legitimate tool |

The pattern: **tools that other developers would actually use** > CRUD apps with a fresh coat of paint.

---

## 📦 Static Blog Backend Strategy

You want to write in markdown, commit to a repo, and serve it from the frontend — without a CMS, without a server. Here's the clean way to do it.

### Architecture

```
/content
  /blogs
    building-react-perf-monitor.md
    css-to-tailwind-story.md
    notes-from-underground-and-code.md   ← your Medium voice, on your domain
  /index.json   ← auto-generated manifest
```

### Step 1 — Frontmatter standard for every post

Every `.md` file starts with:
```yaml
---
title: "Building a Zero-Dependency React Performance Monitor"
date: "2025-12-19"
tags: ["react", "performance", "web-vitals"]
excerpt: "How I built the perf overlay you're staring at right now."
coverImage: "/blog-covers/react-perf.png"
published: true
---
```

### Step 2 — Auto-generate an index at build time

In your `vite.config.ts` or a pre-build script (`scripts/generate-blog-index.ts`):

```ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // npm i gray-matter

const blogsDir = path.join(process.cwd(), 'content/blogs');
const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

const index = files.map(file => {
  const raw = fs.readFileSync(path.join(blogsDir, file), 'utf-8');
  const { data } = matter(raw);
  return {
    slug: file.replace('.md', ''),
    ...data,
  };
}).filter(p => p.published)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(
  path.join(process.cwd(), 'public/blog-index.json'),
  JSON.stringify(index, null, 2)
);
```

Add to `package.json`:
```json
"prebuild": "ts-node scripts/generate-blog-index.ts",
"predev": "ts-node scripts/generate-blog-index.ts"
```

### Step 3 — Fetch and render in React

**Blog list page:**
```ts
// On mount
const posts = await fetch('/blog-index.json').then(r => r.json());
```

**Individual post page (`/blogs/:slug`):**
```ts
import { marked } from 'marked'; // npm i marked
import matter from 'gray-matter';

const raw = await fetch(`/content/blogs/${slug}.md`).then(r => r.text());
const { data: frontmatter, content } = matter(raw);
const html = marked(content);
```

Render with:
```jsx
<article
  className="prose prose-invert max-w-2xl"
  dangerouslySetInnerHTML={{ __html: html }}
/>
```
Use `@tailwindcss/typography` (`prose` classes) for instant beautiful rendering.

### Step 4 — For your existing Medium posts

Don't abandon Medium — cross-post. Write on your site first (owns the canonical URL), then publish on Medium with `canonical_url` set to your domain. This gives you SEO benefit + Medium reach.

You can also write a one-time script to import your existing Medium posts as markdown files using `medium-to-markdown` npm package.

### Step 5 — Deploy

Since it's all static (JSON + MD files in `/public`), it works with **Vercel / Netlify / GitHub Pages** with zero config changes. Commit a new `.md` file → push → deploy → blog post is live. No CMS login, no database, no backend.

---

## ✅ Priority Order

| Priority | Task |
|---|---|
| 🔴 P0 | Hide perf monitor on production |
| 🔴 P0 | Fix CSS to Tailwind blank page |
| 🔴 P0 | Fix blog cover images (not portfolio screenshots) |
| 🔴 P1 | Fix stats counter initial values |
| 🟡 P1 | Add plain role/tech line to hero |
| 🟡 P1 | Add your origin story to About section |
| 🟡 P1 | Ship at least 1 more game OR remove all Coming Soon cards |
| 🟡 P2 | Replace typewriter with a static confident line |
| 🟡 P2 | Rename "Initiate Handshake" CTA |
| 🟡 P2 | Add hover tooltip to Tom Riddle's Diary widget |
| 🟢 P2 | Promote CSS to Tailwind into projects grid |
| 🟢 P3 | Implement static blog backend (frontmatter + JSON index) |
| 🟢 P3 | Import Medium posts as markdown files |
| 🟢 P3 | Write outcome-driven descriptions for each project |
| 🟢 P4 | Narrow the side hatch columns |
| 🟢 P4 | Add new intent-showing game (Regex Racer or JS Coercion Quiz) |
