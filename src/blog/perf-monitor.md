---
title: "Building a Zero-Dependency React Performance Monitor"
date: "2025-12-19"
description: ""
tags: ["react", "performance", "core-web-vitals", "web-vitals", "monitoring"]
image: "/performance-monitor.png"
---
Picture this: You are deep in the flow state, debugging a complex React component. The UI feels slightly sluggish. Is it a re-render loop? A memory leak? A slow network request?

To find out, you open Chrome DevTools, navigate to the Performance tab, hit record, replicate the action, stop recording, and then spend five minutes decrypting a flame chart. By the time you find the issue, you’ve lost your flow.

This was my daily struggle. I wanted a "heads-up display" (HUD) for my application—something that would tell me **right now** if my frame rate dropped or if my memory usage spiked, without me ever leaving the viewport.

That frustration was the catalyst for **`@saikat786/react-perf-dashboard`** —a lightweight, open-source performance monitoring library I built to keep React apps fast.

## The Problem: Why Another Tool?

The React ecosystem is vast, but I found a gap in developer tooling:

1. **Chrome DevTools is powerful but "heavy":** It requires context switching and intent. You have to _look_ for a problem to find it.
2. **Production tools are overkill:** Sentry and LogRocket are great, but they are designed for post-deployment analytics, not real-time development feedback.
3. **Existing dev tools were bloated:** I didn't want to add 500KB of dependencies just to measure FPS.

I needed a solution that adhered to a strict philosophy: **Zero dependencies, minimal setup, and non-intrusive monitoring.**

---

## Let's talk about the Core Web Vitals

To make this dashboard truly useful, I couldn't just guess at performance. I had to align with the industry standard: **Core Web Vitals** .

Integrating these wasn't just about reading documentation; it was about understanding the browser's rendering lifecycle. Here is how I broke them down:

### 1. LCP (Largest Contentful Paint)

This measures loading performance. specifically, the time it takes to render the largest image or text block.

- **Why it matters:** If the main content isn't visible within **2.5 seconds** , the user perceives the site as slow.
- **The Tech:** I utilized the **web-vital** library's  *onLCP()* function, which uses the `PerformanceObserver` API under the hood to watch for `largest-contentful-paint` entries.

#### The Theory Behind LCP

LCP is deceptively complex. The browser does not pick a random element and freeze it as "largest"; it actively tracks and updates the LCP candidate during load.

**What counts as an LCP element?**

- `<img>` elements
- `<image>` elements inside an `<svg>`
- `<video>` elements (specifically the poster image)
- Elements with background images loaded via `url()`
- Block-level elements containing text nodes or inline-level text children

**What does not count?**

- Elements removed from the DOM (even if they were briefly the largest)
- Elements with `opacity: 0` or `visibility: hidden`
- Elements occupying the entire viewport (treated as placeholders)

LCP can change multiple times. A skeleton might be the initial LCP, then a hero image replaces it, and finally a headline might win. Tracking stops after user input (click, scroll, tap) or when the page is backgrounded.

**Critical rendering path impact:**

1. **Server Response Time** — If HTML takes 3s to arrive, LCP cannot be under 2.5s.
2. **Render-Blocking Resources** — Sync `<script>` tags and non-async CSS pause parsing.
3. **Resource Load Time** — That hero image on slow 3G dominates LCP.

I added a simple diagnosis rubric:

- `TTFB > 0.8s` points to server-side latency.
- `LCP - TTFB < 1s` but `LCP > 2.5s` points to resource loading bottlenecks.
- Delayed `FCP` hints at render-blocking assets.

### 2. FCP (First Contentful Paint)

The first moment _anything_ (text, image, non-white canvas) is painted on the screen.

- **The Logic:** While LCP is about value, FCP is about reassurance—telling the user, "Hang on, we are working."
- **Threshold:** Anything under **1.8s** is green.

#### FCP vs FP: The Subtle Gap

There is a metric before FCP: **FP (First Paint)**, which fires when the browser paints anything different from the prior page (like a background color). **FCP** is stricter: it fires when the first _content_ is painted from one of:

- Text
- An image (including background images)
- A `<canvas>` element
- An SVG

**Why React cares:** In a typical SPA shell:

```html
<body>
  <div id="root"></div>
  <script src="bundle.js"></script>
</body>
```

No content exists until React hydrates and renders. Two fixes:

1. **SSR/SSG** — ship HTML with real content so FCP fires immediately.
2. **Skeletons in HTML** — render placeholders in the initial document.

I expose a debug delta (FP to FCP). If it exceeds ~500ms, your bundle is heavy or synchronous work blocks first render.

### 3. CLS (Cumulative Layout Shift)

We've all been there—about to click a button, and suddenly an ad loads, pushing the button down, and you click the wrong thing. That is CLS.

- Calculation: It’s a score, not a time.
  $$
  Score = Impact Fraction \times Distance Fraction
  $$
- **Implementation:** The dashboard tracks every `layout-shift` entry and sums them up. A score above **0.1** triggers a warning in the UI.

#### The Math Behind CLS

CLS is unitless because it measures instability. Break down the formula:

**Impact Fraction:** Portion of the viewport impacted by the shift. An element covering 50% of the viewport has impact 0.5.

**Distance Fraction:** How far it moved relative to the viewport. A 25% viewport shift means 0.25.

Single shift example:

$$
0.5 \times 0.25 = 0.125
$$

CLS accumulates across session windows. A session window:

- Starts at the first layout shift
- Includes shifts within 1s of the previous shift
- Capped at 5s duration

The worst session window is reported. This prevents infinite scroll pages from infinite penalties.

**Common React culprits:**

1. Images without width/height — set intrinsic dimensions or aspect-ratio boxes.
2. Web fonts causing FOIT/FOUT — use `font-display: swap` and preload critical fonts.
3. Injected ads or widgets — reserve space with `min-height`.
4. Animating with `top/left` — prefer `transform` to avoid reflow.

I log which element caused each shift by inspecting `layout-shift` entries and deriving readable identifiers from `id`, `className`, and `nodeName`.

### 4. INP (Interaction to Next Paint)

This is the new standard, replacing the deprecated FID (First Input Delay).

- **The Upgrade:** FID only measured the _first_ interaction. INP monitors _all_ interactions (clicks, taps, key presses) throughout the session.
- **Goal:** We want visual feedback in under **200ms** .

#### Why FID Fell Short

FID measured only input delay of the first interaction. It ignored:

1. Handler execution time
2. Rendering time after the handler
3. Every subsequent interaction

Great first-click scores could hide a sluggish UI afterward.

#### INP: Full Lifecycle

INP captures three phases for _each_ interaction:

1. **Input Delay** — time until the handler starts (blocked by long tasks)
2. **Processing Time** — your JavaScript work
3. **Presentation Delay** — browser time to render the result

The reported INP is effectively the 98th percentile (worst meaningful interaction) of the session.

Example timeline:

```
User Click -> [Input Delay] -> Handler Start -> [Processing] -> Handler End -> [Presentation] -> Next Paint
```

**INP killers in React:**

1. Synchronous heavy state updates in handlers — offload with `startTransition` or `useDeferredValue`.
2. Unthrottled expensive renders — debounce user-driven updates.
3. Blocking third-party scripts — load async/defer.
4. Missing optimistic or loading states — users perceive lag without feedback.

My dashboard tags interactions:

- Good: <200ms
- Needs improvement: 200–500ms
- Poor: >500ms

It also records interaction types (click, keyboard, drag) because tolerance differs by gesture.

### 5. TTFB (Time to First Byte)

This is pure backend/network latency. It measures the time from the request start to the first byte received.

- **Debugging:** If TTFB is high (>800ms) but FCP is low, I know the issue is my database or server logic, not my React code.

#### The Network Stack Decomposed

TTFB is the sum of:

1. Redirect time (if any)
2. DNS lookup
3. TCP connect
4. TLS handshake (HTTPS)
5. Server processing
6. First byte transfer

Navigation Timing breaks this down:

```javascript
const ttfb = performance.timing.responseStart - performance.timing.requestStart;
const dns =
  performance.timing.domainLookupEnd - performance.timing.domainLookupStart;
const tcp = performance.timing.connectEnd - performance.timing.connectStart;
const serverTime =
  performance.timing.responseStart -
  performance.timing.requestStart -
  dns -
  tcp;
```

**Reading the tea leaves:**

- High DNS share? Add prefetch, fix DNS provider, ensure HTTP/3 where possible.
- High serverTime? Add caching, indexes, reduce cold starts, push logic to edge.
- CDN assets should show TTFB <100ms; if not, you have cache misses or poor PoP proximity.

#### TTFB in SSR/Edge Land

In SSR/SSG frameworks (Next.js, Remix, Astro), TTFB directly delays meaningful content. Edge renders shrink this by running closer to users. Pure SPAs suffer too: slow TTFB means a longer white screen before hydration even begins.

I surface a TTFB waterfall grouped by HTML, assets, and API calls. It helped me catch a slow serverless API cold start while CDN assets were fine.

### Bonus Metric: FID (First Input Delay)

Deprecated but historically relevant.

**What it measured:** Time from first user input to when the browser could start handling it.

**Limits:**

- Only first interaction
- Ignores handler runtime and paint
- Misses later sluggishness

**Why 100ms mattered:** Humans perceive <100ms as instant; 100–300ms feels sluggish; >300ms feels broken. FID mainly exposed long tasks blocking the main thread during initial load.

### The Interplay Between Metrics

These metrics interact:

**TTFB → FCP → LCP**

- Slow TTFB drags FCP and LCP; fast TTFB alone cannot save LCP if assets are slow.

**CLS ↔ LCP**

- Late hero images both shift layout and delay LCP; reserving space improves both.

**INP ↔ FPS**

- Low FPS often correlates with poor INP; heavy rendering during input hurts both.

I added a correlation view that surfaces shared root causes, e.g.,

- "High CLS from late-loading hero image; it is also your LCP candidate. Preload it."
- "INP spikes line up with FPS drops; likely heavy render work during interaction."

---

## Beyond Vitals: The "Live" Metrics

Core Web Vitals are great for summary data, but for real-time debugging, I needed to see the heartbeat of the application.

### FPS (Frames Per Second)

This is the most direct indicator of "jank." To track this, I utilized the browser's `requestAnimationFrame` loop.

The Implementation Challenge:

You can't just count frames; you have to calculate the delta time between them to get an accurate average.

**TypeScript**

```
// Simplified FPS Logic
const useFPS = () => {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let frameId: number;

    const loop = (time: number) => {
      frameCount.current++;
      if (time - lastTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime.current = time;
      }
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return fps;
};
```

### Network Monitoring via Monkey-Patching

This was the riskiest part of the build. To capture network requests without a service worker, I had to "monkey-patch" the global `window.fetch`.

> **Warning:** Monkey-patching native APIs is dangerous if done poorly. You must ensure you _always_ return the original functionality.

I wrapped the native fetch to intercept the request, start a timer, await the response, and then log the duration and status code before returning the data to the app.

### Memory Usage

Chrome exposes a non-standard API: `window.performance.memory`.

- **The Metric:** Used JS Heap Size.
- **The Utility:** If I see this number climbing steadily while navigating between routes without dropping, I know I have a memory leak (likely an unmounted component listener).

---

## Technical Challenges & Solutions

Building a library is very different from building an app. Here were my biggest hurdles:

### Challenge 1: The "Zero Dependency" Mandate

I wanted to avoid dependency hell. This meant I couldn't use `styled-components`, `emotion`, or `framer-motion`.

- **Solution:** Inline styles. Yes, they are verbose. Yes, they don't support pseudo-selectors easily. But they guarantee that my styles never bleed into the host application, and the host's CSS doesn't break my dashboard.

### Challenge 2: TypeScript Type Safety

Performance APIs often return generic types. To make this library DX-friendly, I had to define custom interfaces for every metric.

- **Lesson:** providing strictly typed interfaces (like `LCPEntry`) makes the library self-documenting for consumers using modern IDEs.

### Challenge 3: The Draggable UI

I wanted the dashboard to be movable so it wouldn't cover important UI elements.

- **The Math:** I used `useRef` to track the initial mouse click coordinates and calculated the `delta` (change in position) on `mousemove`.
- **The Edge Case:** I had to explicitly disable `user-select` during the drag operation; otherwise, the user would accidentally highlight text all over their app while trying to move the widget.

---

## Architecture & Design Decisions

I settled on a **Hook-Based Architecture** .

The UI component `<PerfDashboard />` is actually just a shell. The logic lives in isolated hooks:

- `useFps()`
- `useMemory()`
- `useNetworkMonitor()`
- `useWebVitals()`

**Why?** Extensibility. If a developer doesn't want the UI but wants the data, they can import `@saikat786/react-perf-dashboard/hooks` and use the logic headless in their own components.

### Development Workflow

- **Bundler:** Vite (for speed) + Rollup (for generating ESM and UMD builds).
- **Testing:** `npm link`. I created a dummy React app and linked the local package to test real-world scenarios, which caught several bugs regarding `window` availability (SSR compatibility issues).

---

## Real-World Usage

The package is designed for **Development and Staging** environments.

**JavaScript**

```
// Implementation is as simple as this
import { PerfDashboard } from '@saikat786/react-perf-dashboard';

const App = () => {
  return (
    <>
      <PerfDashboard />
      <RestOfYourApp />
    </>
  );
};
```

When NOT to use it:

Do not ship this to production (unless hidden behind a feature flag). Even though it is lightweight, the requestAnimationFrame loop and network interception add a non-zero overhead that you don't want strictly for end-users.

---

## Key Learnings & Future Roadmap

This journey taught me that browser Performance APIs are incredibly powerful but fragmented. Relying on Google's `web-vitals` library for the standardized metrics was a crucial pivot from my initial attempt to write raw `PerformanceObserver` code.

**What's Next?**

1. **Data Export:** A button to download the session's performance metrics to JSON/CSV.
2. **Timeline Visualization:** A mini-graph showing FPS trends over time.
3. **React DevTools Bridge:** Tighter integration with React's internal fiber tree.

## Conclusion

Creating `react-perf-dashboard` bridged the gap between "it feels slow" and "I know exactly why it's slow." It was a deep dive into the browser's engine and a lesson in writing clean, minimal, third-party code.

I invite you to try it out, break it, and contribute.

- **GitHub:** [github.com/saikat786/react-perf-dashboard](https://www.google.com/search?q=%23&authuser=1)
- **NPM:** [npmjs.com/package/@saikat786/react-perf-dashboard](https://www.google.com/search?q=%23&authuser=1)

Let's make the web faster, one frame at a time. 🚀
