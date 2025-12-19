---
title: "Building a Glassmorphic Portfolio"
date: "2025-12-19"
author: "M3galodon"
image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop"
excerpt: "Exploring the intersection of glassmorphism and bento-grid layouts in modern web design."
tags: [React, Tailwind, Design]
---

# The Art of Glassmorphism

Glassmorphism is a UI trend that relies on transparency, background blur, and subtle borders to create a "frosted glass" effect. When combined with a **Bento Grid** layout, it creates a clean, organized, and futuristic aesthetic.

## Why use Glassmorphism?

1. **Hierarchy**: It creates a clear sense of depth.
2. **Aesthetics**: It looks modern and sleek.
3. **Readability**: With the right backdrop-blur, text remains readable over complex backgrounds.

### Sample Code Block

Here is how we define the glass effect in our `helper.ts`:

```typescript
export const uiGlass = "bg-white/15 dark:bg-black/40 backdrop-blur-[20px]";
export const uiBorder = "rounded-[20px] border border-white/30 dark:border-white/10";

```

> **Note:** Always ensure your contrast ratios meet accessibility standards when using semi-transparent backgrounds!

### Future Plans

I plan to integrate more interactive elements into these bento cards, perhaps adding some subtle **framer-motion** animations to make the "glass" feel even more interactive when hovered.

Stay tuned for more updates on this dev log!

---

### How it will look

* **List View**: The `BlogList` will parse this file, show the Unsplash cover image, the title, and the "excerpt" in a bento card.

* **Post View**: Clicking the card will take you to `/blog/sample-post`, where the `BlogPost` component will render the full header, the date, and the Markdown content inside your large glass container.
