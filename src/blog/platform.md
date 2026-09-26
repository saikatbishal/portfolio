---
title: "Platform: Designing a Train Journey App Around One Honest Reward"
date: "2026-09-26"
description: "How I designed and built Platform, a map of every train journey I've taken across India: the product decisions, the design system underneath it, and the bugs that were really data problems."
tags: ["product", "design-systems", "design-tokens", "react", "case-study"]
image: "/project-platform.png"
---
I travel long distances by train. Some of those journeys matter. Going to Vellore for a checkup, with my mother coming to meet me there, is not the same kind of event as a commute. Yet both leave exactly the same trace: a PDF in my inbox and a PNR number I will never look at again.

IRCTC has my booking history. It is a table. It knows I bought a ticket; it has no idea I went somewhere.

**Platform** is my answer to that. It is a record of every train journey I've taken across India, drawn as a map that fills in as I travel. You can [open it here](https://www.saikatbishal.com/platform), and the code, design system and decision log are [on GitHub](https://github.com/saikatbishal/platform).

This post covers what I decided, what I reversed, and the system that keeps the whole thing looking like one product.

---

## Three sentences that do the most work

Before any screen existed, I wrote down what Platform is *not*:

- **Not** a booking app.
- **Not** a live-tracking app.
- **Not** a social network.

Those three lines have settled more arguments than any feature list. Every time an idea showed up, such as live train status, friends, leaderboards or photos, the question was not "is this good?" but "does this turn Platform into one of those three things?" Usually it did, so it went into a v2 note and nowhere else. Scope creep is the most likely way a side project dies, and a written "no" list is the cheapest defence I know.

## Who it's for, and what wins when they disagree

It's for me first. I'm not pretending it's a market opportunity.

If it turns out to be for anyone else, it's two groups. **Students and workers who go home by train** several times a year want logging to be *fast*. **Railfans** want it to be *accurate*: correct zone codes, correct stations, correct routes.

When those two conflict, fast wins in v1, because I'm the student. That became a hard rule: **adding a journey must take under fifteen seconds.** It is not an aspiration. If it takes longer, that's a v1-severity bug, because if logging takes a minute I will stop doing it in week two, and then the product is dead however good it looks.

## The reward has to be honest

The core loop is simple. You log a journey, and the map redraws with a new line on it. That redraw *is* the reward, which is why animation got a real library (Motion) instead of a few CSS transitions.

What I avoided mattered as much. There are no points, no streaks and no badges to farm. Milestones are plain numbers, like "4,182 km — past 1,000". You can't earn anything without actually having gone somewhere. I was reading about dopamine loops while planning this, and the difference between applying those ideas and being used by them came down to one question: does the reward only ever measure something real?

## Decision 11: I took the sign-in wall down

The first version put everything behind a Google sign-in. A station-name board sat over the map with a Google button on it.

It was the loudest thing on the screen, and it asked for a decision before anyone had seen what they were deciding about. For a consumer product, that is the standard way to lose most visitors. The drop-off doesn't happen after sign-up; it happens at the sight of it.

So I reversed it. Now the map, the journey log, milestones and the rail pass all work **without an account**. Signing in saves your journeys; it doesn't unlock anything. The labelled sign-in button only appears in a save prompt that states the count:

> *"3 journeys, saved in this browser only. Sign in and they follow you to any device."*

The number is the argument.

The reversal wasn't free, and I wrote down what it cost:

- **A merge path that has to be right first time.** Signed-out journeys live in the browser and get merged into the account on first sign-in. A bug there doesn't throw an error, it silently eats somebody's travel history. So the merge has its own check script, and on any collision the account's copy wins, because a stale device must never overwrite the server.
- **Clearing your browser loses anonymous journeys**, with no way to recover them. The save prompt says so rather than hiding it.
- **Milestones and the rail pass stay hidden at zero journeys.** A pass reading "0 km / 0 stations / 0 states" doesn't look empty, it looks broken.

Platform's decision log has 15 entries like this one, each with what was decided and what it costs. Two of them reverse something I had written down earlier. That is the point of writing things down.

---

## The design system: a palette read off real paint

The part of Platform I'm proudest of is that it looks like Indian Railways without copying anything.

Indian Railways already has a palette. It's painted on every coach and station in the country. So instead of inventing colours, I **sampled them from photographs**. The navy is the lower panel of coach 00296 (`#0D2242`). The yellow is the Alwar Junction station board (`#EAB143`). The vermillion is the IR roundel. The cream is the stencilled coach numerals.

Two things came out of the photographs that shaped everything else:

- **Every neutral on the railway is warm.** The ballast and the rail steel both sit near amber. A pure grey looked wrong next to them, so the system has no neutral grey at all.
- **The blues are unusually saturated for dark colours**, at 74–80%. That's what stops the background reading as generic dark-mode navy.

The palette started dark-first, for a reason that sounds poetic but is really just measurement. The visual direction was "the view from a night-train window", and the coach navy is already dark enough to be a background. So the dark theme isn't a designed dark. It's the actual paint on the actual coach, with station-board yellow glowing on it the way signage does at a station after dark.

### Rules, not just swatches

A palette only stays consistent if it comes with rules. Platform's has four traps, written down with contrast numbers:

1. **Yellow is a fill, not a text colour.**
2. **Vermillion is not a second accent.** It means errors and "you are here".
3. **Cream is for large numerals only.**
4. **Never use a neutral grey.**

Every text token has its contrast measured against the background: body text is 14.9:1, secondary text 8.3:1, and the yellow accent 8.9:1. When a colour changes, the ratios get re-measured, not adjusted by eye.

### From tokens to components

All of this lives in one file, `tokens.css`, the single source of truth. Tailwind 4 reads it through `@theme inline`, so a utility class and a token can never drift apart.

On top of the tokens sits a packaged design system: **13 components**, each with a typed props contract and a usage note, **21 guideline pages** covering colour, type, spacing, voice and brand marks, and a lint config that flags code breaking the rules. Voice gets the same treatment as colour, with "Not this / This" examples, because an app that looks consistent but talks in three different tones isn't consistent.

### The one colour I chose instead of sampling

Decision 14 is where the system pushed back on me. The light theme was warm cream with amber accents, and it read as machine-made. Warm off-white plus amber plus beige is the house palette of nearly every AI-built app right now. It doesn't look designed; it looks default.

The fix wasn't a better warm. It was *not* warm: a pale blue-grey background, with the board yellow left exactly as it is. The yellow is declared as "paint, not palette", identical in both themes, because the Alwar Junction board is the same yellow at noon and at 2 a.m. On cream it blends in. On cool grey it's the most arresting thing on the page.

It cost something, and the decision says so. It's the first colour in the system that was chosen rather than sampled, and every contrast ratio has to be measured again. The light theme is the next piece of design work on the roadmap.

---

## A journey is never a line between two dots

The first map drew each journey as a straight line through its stations. On the Vijayawada → Chennai leg, that line went straight across the Bay of Bengal.

It wasn't a rendering bug. It's what you get from only two points: India's east coast is concave, so a chord between two points on it cuts the corner, and the corner is sea. I measured it by sampling points along the line and testing each against 760 district polygons. **75% of that leg was over water.** Worse, straight lines undercounted distance by about 10%, and the kilometre total is the headline number in the whole app.

The obvious fix, snapping journeys to the rail geometry I was already drawing, failed in an instructive way. That dataset is built for drawing maps, not for routing. It had a gap on the final approach to Chennai, so the router detoured 500 km inland and reported **877 km instead of about 430**. The data was almost right, which is the worst kind of wrong: it looks like it works until one specific journey is nonsense.

The fix that worked was to **build the network from the timetable, not the geometry.** Every pair of consecutive stops on every train is an edge. A network made from real services can't have gaps, because a train that runs has to call at a continuous sequence of stops. 5,208 trains collapse into 9,895 unique edges, which is 70 KB gzipped. That's small enough to ship to the browser, and finding a route takes 2–19 ms, with no backend.

The whole Howrah → Katpadi route now follows the track for 0% of its length over water, and distances land within a few percent of real rail distances.

Chasing that bug also turned up two data problems that had nothing to do with maps. A filter that dropped stations whose name equals their code had thrown away 202 real stations (MOGA, REWA, DURG, GUNA…). And Mumbai Central sits on reclaimed land outside the census boundary, so it had been dropped entirely. Fixing both took the station file from 8,455 to 8,696 stations.

The UI is also honest about how certain it is. If you logged a train number, the route is *exact*: the stops that train actually calls at. If you didn't, it's *plausible*: the shortest path over the network, shown more quietly, because it may not be the line you rode.

---

## What's honestly missing

- **One user.** Platform has been used by me. I haven't run usability tests yet, and that's the next thing I'm doing.
- **The cool light theme** from decision 14 is decided but not built yet.
- **Between adjacent stops the line is still straight.** At country zoom you can't see it, and it never leaves land, but at street zoom it will cut corners. Real track geometry is a v2 project.
- **The timetable data is several years old**, so newer lines are missing.

## What I'd measure if more people used it

The fifteen-second rule is the first metric: median time to log a journey. After that, how many signed-out visitors log a first journey, which tests whether removing the sign-in wall actually worked. Then how many people who log one journey come back to log a second, which is the only real test of whether the map is a reward worth returning for.

---

If you want to go deeper, the [decision log, the design system and the routing notes are all in the repo](https://github.com/saikatbishal/platform). Or just [open Platform](https://www.saikatbishal.com/platform) and log a journey. It should take you less than fifteen seconds. If it doesn't, that's a bug, and I'd like to hear about it.
