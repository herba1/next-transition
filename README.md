# Next.js Page Transitions 

A simple page transition system for Next.js App Router. Provides transition states you can use with CSS or any animation library.

## Usage

### 1. Wrap your app with the provider

```tsx
// app/layout.tsx
import { PageTransitionProvider } from "./context/pageTransition";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PageTransitionProvider enterDuration={300} exitDuration={300}>
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}
```

### 2. Use TransitionLink instead of Link

```tsx
import { TransitionLink } from "./context/pageTransition";

<TransitionLink href="/about">About</TransitionLink>
```

### 3. Add TransitionSignaler to each page

This signals the page has mounted so the transition can continue.

```tsx
// app/about/page.tsx
import { TransitionSignaler } from "../context/pageTransition";

export default function AboutPage() {
  return (
    <div>
      <TransitionSignaler />
      About Page
    </div>
  );
}
```

### 4. Use the states for animations

```tsx
"use client";
import { usePageTransition } from "./context/pageTransition";

function MyOverlay() {
  const { isLeaving, isEntering, isPending, enterDuration, exitDuration } = usePageTransition();

  // Use duration values directly - no need to hardcode them
  return (
    <div
      style={{
        transitionDuration: isLeaving ? `${exitDuration}ms` : `${enterDuration}ms`
      }}
      className={`overlay ${isLeaving || isPending || isEntering ? "visible" : ""}`}
    />
  );
}
```

## States

| State | Description |
|-------|-------------|
| `isLeaving` | Exit animation playing |
| `isPending` | Waiting for new page to mount |
| `isEntering` | Enter animation playing |
| `isReady` | Transition complete |
| `enterDuration` | Enter duration in ms (from config) |
| `exitDuration` | Exit duration in ms (from config) |

Use `enterDuration` and `exitDuration` directly in your animations - change it once in the provider, and it updates everywhere.
