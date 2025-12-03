---
title: "Building a Portfolio with React and Vite"
date: "2025-12-05"
description: "A deep dive into how I built this portfolio website using modern web technologies."
tags: ["react", "vite", "tailwindcss", "webdev"]
---

# Building a Portfolio

Creating a personal portfolio is a rite of passage for every developer. In this post, I'll share my journey of building this site.

## The Tech Stack

I chose a modern stack to ensure performance and developer experience:

1.  **React**: For component-based UI architecture.
2.  **Vite**: For lightning-fast build times and HMR.
3.  **Tailwind CSS**: For rapid styling without leaving the JSX.
4.  **TypeScript**: For type safety and better tooling.

## Key Challenges

### Dark Mode

Implementing a robust dark mode required careful planning of CSS variables and Tailwind classes.

```css
:root {
  --background-light: #ffffff;
  --background-dark: #121212;
}
```

### Animations

I used **GSAP** for complex animations and **Framer Motion** for simple transitions.

## Conclusion

Building this portfolio was a great learning experience. I hope you enjoy exploring it!
