# 🎂 Birthday Website — Product Requirements Document

**Version:** 1.0
**Date:** February 2026
**Status:** Ready for Development
**Audience:** Engineering + Design

---

## 1. Project Overview

### Vision

The Birthday Website is a fully interactive, emotionally engaging single-page web application that transforms a simple "Happy Birthday" into an immersive digital experience. It's not a generic e-card generator — it's a bespoke, hand-crafted journey that combines modern animation technology with deeply personal content to create a moment the recipient will genuinely remember.

### Problem Statement

Traditional digital birthday wishes — texts, emails, social media posts — feel impersonal and forgettable. People who care deeply about their loved ones lack an accessible, beautiful, and emotionally resonant way to celebrate birthdays online without hiring a developer or designer.

### Solution

A React-based birthday website that guides the recipient through a carefully designed emotional arc: surprise and delight at the landing, nostalgia through the memories timeline, joy in the gift cards and mini-game, and genuine emotion in the closing message. Every interaction is intentional. Every animation serves the story.

### Success Metrics

| Metric | Definition | Target |
|---|---|---|
| Emotional Engagement | User reaches Final Message section | ≥ 80% of visitors |
| Interaction Rate | Gift cards flipped per session | ≥ 4 out of total cards |
| Game Completion | Mini-game won and final message unlocked | ≥ 60% of players |
| Session Duration | Average time on site | ≥ 3 minutes |
| Mobile Usability | Full experience on mobile devices | 100% feature parity |

---

## 2. User Personas

### Persona A — The Thoughtful Sender

| Field | Detail |
|---|---|
| Name | Alex, 26 |
| Relationship | Best friend / partner |
| Goal | Create something that feels genuinely personal and special |
| Pain Point | Doesn't know how to code; generic e-cards feel cheap and lazy |
| Motivation | Make recipient feel truly seen and celebrated |
| Device | Desktop (building) → Mobile (sharing) |

### Persona B — The Birthday Recipient

| Field | Detail |
|---|---|
| Name | Jamie, 24 |
| Expectation | A surprise; something different from the usual texts |
| Emotional State | Hopeful, curious, nostalgic on birthdays |
| Device | Mobile (first open), then Desktop |
| Desired Outcome | Feel loved, seen, and celebrated — not just acknowledged |

### Core Use Cases

1. Sender customizes names, memories, gift messages, and game target score via data files.
2. Recipient opens the shared link on their birthday and experiences the full emotional journey.
3. Recipient shares moments from the site on social media.
4. Sender reviews and updates content each year for recurring use.

---

## 3. UX Flow & Emotional Journey

### The Six-Act Emotional Arc

| Act | Section | Emotional Beat |
|---|---|---|
| 1 | 🎁 Landing Surprise | Curiosity → Delight |
| 2 | 🎂 Birthday Hero | Joy → Celebration |
| 3 | 📸 Memories Timeline | Nostalgia → Warmth |
| 4 | 💝 Gift Flip Cards | Anticipation → Love |
| 5 | 🎮 Mini Game | Playfulness → Achievement |
| 6 | 💖 Final Message | Emotion → Connection |

### Interaction Flow

```
Open Website
    ↓
[Landing Page]  ── Click 'Open Gift' Button ──→  Confetti Blast 🎉
    ↓
[Birthday Hero]  ── Auto-scroll reveal, balloons ──→  Confetti Rain 🎊
    ↓
[Memories Timeline]  ── Scroll down ──→  Cards animate in one-by-one 📸
    ↓
[Gift Flip Cards]  ── Tap each card ──→  Message revealed 💝
                   ── Last card flipped ──→  Confetti Blast 🎉
    ↓
[Mini Game]  ── Click hearts ──→  Score increases 💕
             ── Target score reached ──→  Unlock Final Section 🔓
    ↓
[Final Message]  ── Slow fade in ──→  Emotional climax 💖 + Confetti 🎉
```

---

## 4. Feature Specifications

### 4.1 Landing Page `LandingPage.jsx`

> **Priority: P0 — Core Feature**

The landing page is the gateway to the experience. It must be visually arresting and immediately communicate that something special is about to happen.

**Functional Requirements**

- Display a centered gift box icon with subtle bounce animation on page load.
- Show a brief teaser text (e.g. "Something special is waiting for you... 🎁").
- Render a prominent "Open Your Gift" CTA button with hover + pulse animation.
- On button click: trigger canvas-confetti burst, then animate transition to BirthdayHero section.
- Button click must be the only way to advance — no auto-scroll.
- Optionally display recipient's name in the teaser text (data-driven).

**Non-Functional Requirements**

- Page must load and be interactive in under 2 seconds on a 4G mobile connection.
- Confetti must render within 100ms of button click.
- The full viewport must be occupied — no visible scroll on landing.

**Acceptance Criteria**

1. Gift box animates on page load without user interaction.
2. CTA button is visible above the fold on all screen sizes.
3. Confetti fires on click and transitions to next section within 1.5s.

---

### 4.2 Birthday Hero `BirthdayHero.jsx`

> **Priority: P0 — Core Feature**

**Functional Requirements**

- Full-viewport hero section with animated birthday headline ("Happy Birthday, [Name]! 🎂").
- Floating balloon SVGs or Lottie animation in the background.
- Auto-trigger confetti burst on section entry (Intersection Observer).
- Display age or year milestone (e.g. "Celebrating 25 incredible years") — data-driven.
- Smooth scroll CTA ("Let's Relive the Memories →") links to Memories Timeline.

**Animation Specifications**

| Element | Animation |
|---|---|
| Headline Text | Fade in + slide up, 0.8s ease-out |
| Subtitle | Fade in, 0.4s delay after headline |
| Balloons | Float upward with randomized speed (1.5s–3s loops) |
| Confetti | 150 particles, spread 70, origin `{ y: 0.6 }` |
| CTA Button | Pulse scale animation, 2s loop |

---

### 4.3 Memories Timeline `MemoriesTimeline.jsx`

> **Priority: P1 — High Value Feature**

**Functional Requirements**

- Vertical timeline with alternating left/right cards on desktop, single column on mobile.
- Each memory card contains: date/year label, photo or emoji, caption text, optional tag.
- Cards animate into view as user scrolls using Framer Motion + Intersection Observer.
- Supports 4–12 memory entries without layout degradation.
- All memory data sourced from `memoriesData.js` — zero hardcoding in JSX.

**Memory Card Data Schema**

```js
// src/data/memoriesData.js
export const memories = [
  {
    id: 1,
    year: "2019",
    date: "March 15, 2019",
    caption: "The day we met at the café and talked for 6 hours.",
    emoji: "☕",
    image: "/images/memory-1.jpg",  // optional
    tag: "First Meeting"
  },
  // ... more entries
];
```

**Scroll Animation Spec**

- Cards start: `opacity: 0`, `translateY: +40px`
- Cards end: `opacity: 1`, `translateY: 0`
- Duration: `0.6s`, stagger: `0.15s` per card
- Trigger: when card is 20% into viewport

---

### 4.4 Gift Flip Cards `GiftSection.jsx` + `GiftFlipCard.jsx`

> **Priority: P0 — Core Feature**

**Functional Requirements**

- Grid of 3–6 flip cards; each has a front face and a back face.
- Front face: wrapped gift icon + title text (e.g. "Tap to Open 😄").
- Back face: personal message text + decorative heart/star icons.
- Clicking a card flips it with a 3D `rotateY` animation (0.6s).
- Cards cannot be unflipped once opened — state is one-way.
- When the final card is flipped: trigger a canvas-confetti blast.
- All card data sourced from `giftsData.js` — zero hardcoding.

**Component API**

```jsx
<GiftFlipCard
  title="Tap to Open 😄"
  message="Your smile is my daily happiness..."
  icon="🎁"
  accentColor="#ffb6c1"
  isLast={false}
/>
```

**Flip Animation Implementation**

```js
// Framer Motion flip
const [isFlipped, setIsFlipped] = useState(false);

// Front face
animate={{ rotateY: isFlipped ? 180 : 0 }}
transition={{ duration: 0.6, ease: 'easeInOut' }}
style={{ backfaceVisibility: 'hidden' }}

// Back face
animate={{ rotateY: isFlipped ? 0 : -180 }}
transition={{ duration: 0.6, ease: 'easeInOut' }}
style={{ backfaceVisibility: 'hidden' }}
```

**Gift Card Data Schema**

```js
// src/data/giftsData.js
export const gifts = [
  { title: "Tap to Open 😄", message: "Your smile is my daily happiness...", icon: "🎁", accentColor: "#ffb6c1", isLast: false },
  { title: "A Special Gift 💕", message: "Having you as a friend is the greatest gift.", icon: "💝", accentColor: "#cdb4db", isLast: true },
];
```

---

### 4.5 Mini Game `MiniGame.jsx`

> **Priority: P1 — High Value Feature**

**Game Concept: "Catch the Hearts" 💕**

Hearts fall from the top of the game container at randomized positions and speeds. The player clicks or taps hearts to collect them, increasing their score. Reaching the target score wins the game and unlocks the Final Message.

**Game Parameters**

| Parameter | Specification |
|---|---|
| Hearts per wave | 3–5 hearts spawned every 1.2 seconds |
| Fall duration | Randomized 2s–4s per heart |
| Click target size | Minimum 44×44px (WCAG touch target) |
| Target score | Configurable via `gameConfig.js`; default: 20 |
| Miss penalty | None — missed hearts disappear silently |
| Win condition | Score ≥ target → win animation → unlock Final Message |
| Time limit | Optional; default: off (casual mode) |
| Difficulty scaling | Heart speed increases every 5 points (optional) |

**State Shape**

```js
const [score, setScore] = useState(0);
const [hearts, setHearts] = useState([]);
const [gameWon, setGameWon] = useState(false);
const [gameStarted, setGameStarted] = useState(false);

// Each heart object:
{ id, x: randomPercent, speed: random(2, 4), caught: false }
```

**Win Flow**

1. Score reaches target → `setGameWon(true)`
2. Win animation plays (Framer Motion scale + fade)
3. Confetti blast fires
4. "Unlock Your Special Message 💖" button appears
5. Click → smooth scroll to Final Message section

---

### 4.6 Final Message `FinalMessage.jsx`

> **Priority: P0 — Core Feature, Emotional Climax**

**Functional Requirements**

- Section is visually locked (blurred / hidden) until mini-game is won.
- On unlock: full-page fade-in with soft warm background gradient.
- Message appears word-by-word using Framer Motion stagger (~30ms per word).
- Large decorative hearts animate around the message continuously.
- Canvas-confetti fires in celebratory mode (slower, larger, rainbow particles).
- Optional "Play it again" button to restart from the top.
- Message content fully data-driven via `finalMessageData.js`.

**Animation Sequence**

1. Background gradient fades in — `0.8s`
2. Main heading slides in from below — `0.6s`, delay `0.4s`
3. Message paragraphs appear word-by-word — stagger `0.03s` per word
4. Sender name fades in — delay `2s` after message starts
5. Floating hearts loop continuously in background
6. Confetti fires once at peak — after message is fully revealed

**Confetti Config for Finale**

```js
confetti({
  particleCount: 200,
  spread: 160,
  scalar: 1.4,
  colors: ['#ffb6c1', '#cdb4db', '#ffd6a5', '#ff69b4', '#ffffff']
});
```

---

### 4.7 Music Controller `MusicController.jsx`

> **Priority: P2 — Nice to Have**

**Functional Requirements**

- Floating toggle button in bottom-right corner, always visible.
- Uses HTML5 Audio API with `/public/music/birthday-song.mp3`.
- Music is OFF by default (browser autoplay policy compliance).
- User can toggle on/off at any time; state persists through the session.
- Visual indicator: animated equalizer bars when playing, static icon when paused.
- Default volume: 40% (non-intrusive).

---

## 5. Data Architecture

### Philosophy

All content — names, messages, memories, and game settings — must be editable by a non-developer by modifying data files only. No JSX or component code should ever need to change for content customization.

### Data Files Map

| File | Controls |
|---|---|
| `siteConfig.js` | Recipient name, sender name, age/year, theme color overrides |
| `memoriesData.js` | Array of memory objects with date, caption, image, emoji |
| `giftsData.js` | Array of gift card objects with title, message, icon, color |
| `finalMessageData.js` | Paragraphs of the final emotional message |
| `gameConfig.js` | Target score, heart speed range, time limit toggle |

### `siteConfig.js` Schema

```js
// src/data/siteConfig.js
export const config = {
  recipientName: "Jamie",
  senderName: "Alex",
  age: 25,
  year: 2026,
  landingTeaser: "Something magical is waiting for you...",
  theme: {
    primary: "#ffb6c1",    // Pink
    secondary: "#cdb4db",  // Lavender
    accent: "#ffd6a5",     // Peach
    bg: "#fff9fc",
  }
};
```

---

## 6. Technical Specifications

### Tech Stack

| Library | Purpose | Rationale |
|---|---|---|
| React 18 (Vite) | Core frontend framework | Fast HMR, ESM-native builds |
| Tailwind CSS v3 | Utility-first styling | Rapid, consistent UI |
| Framer Motion v11 | Page + component animations | Production-quality motion |
| canvas-confetti | Confetti effects | Lightweight, canvas-based |
| Lottie React | Cute vector animations | Smooth, scalable illustrations |
| HTML5 Audio API | Background music | No external dependencies |
| Intersection Observer | Scroll-triggered reveals | Native browser API |

### Folder Structure

```
birthday-website/
│
├── public/
│   ├── music/
│   │   └── birthday-song.mp3
│   ├── images/
│   │   ├── memory-1.jpg
│   │   └── memory-2.jpg
│   └── lottie/
│       ├── balloon.json
│       └── hearts.json
│
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx        # Act 1: Gift box + CTA
│   │   ├── BirthdayHero.jsx       # Act 2: Hero + balloons + confetti
│   │   ├── MemoriesTimeline.jsx   # Act 3: Scroll-reveal timeline
│   │   ├── GiftSection.jsx        # Act 4: Grid of flip cards
│   │   ├── GiftFlipCard.jsx       # Act 4: Individual flip card
│   │   ├── MiniGame.jsx           # Act 5: Catch the hearts
│   │   ├── FinalMessage.jsx       # Act 6: Emotional finale
│   │   └── MusicController.jsx   # Global: Floating music toggle
│   │
│   ├── data/
│   │   ├── siteConfig.js          # Names, age, theme colors
│   │   ├── memoriesData.js        # Timeline memory entries
│   │   ├── giftsData.js           # Gift card content
│   │   ├── finalMessageData.js    # Closing message paragraphs
│   │   └── gameConfig.js          # Mini-game parameters
│   │
│   ├── App.jsx                    # Root: section orchestration
│   ├── main.jsx                   # React DOM entry point
│   └── index.css                  # Global styles + font imports
│
└── package.json
```

### Component Tree

```
App.jsx
 ├── MusicController.jsx           [Global floating button]
 ├── LandingPage.jsx               [Section 1 — Full viewport]
 ├── BirthdayHero.jsx              [Section 2 — Hero]
 │    └── Lottie balloons + confetti
 ├── MemoriesTimeline.jsx          [Section 3 — Timeline]
 │    └── MemoryCard × N           (mapped from memoriesData)
 ├── GiftSection.jsx               [Section 4 — Gift grid]
 │    └── GiftFlipCard × N         (mapped from giftsData)
 ├── MiniGame.jsx                  [Section 5 — Game]
 │    └── Heart × N                (interval-spawned)
 └── FinalMessage.jsx              [Section 6 — Finale]
      └── Staggered text + confetti
```

### State Management

Only three pieces of state need to be shared across components. `gameWon` is a boolean lifted to `App.jsx` and passed as a prop to `FinalMessage` to control whether it's locked or unlocked. `musicPlaying` lives inside `MusicController` and doesn't need to leave it. `allCardsFlipped` is computed inside `GiftSection` when every card's flipped state is true. Everything else is entirely self-contained within each component.

### Confetti Implementation

```js
import confetti from 'canvas-confetti';

// Burst — landing button click + last gift card flip
confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });

// Rain — birthday hero entrance
const duration = 3000;
const end = Date.now() + duration;
(function frame() {
  confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
  confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
  if (Date.now() < end) requestAnimationFrame(frame);
})();

// Finale — final message reveal
confetti({ particleCount: 200, spread: 160, scalar: 1.4,
           colors: ['#ffb6c1', '#cdb4db', '#ffd6a5', '#ff69b4', '#ffffff'] });
```

---

## 7. Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#ffb6c1` | CTAs, accents, gift card fronts |
| `--color-secondary` | `#cdb4db` | Timeline, section backgrounds |
| `--color-accent` | `#ffd6a5` | Highlights, final message |
| `--color-bg` | `#fff9fc` | Global page background |
| `--color-text` | `#3A3A5C` | All body text |
| `--color-heading` | `#8B2FC9` | Section headings |

### Typography

| Element | Font | Notes |
|---|---|---|
| Headings (h1–h3) | Pacifico | Google Fonts — warm, playful |
| Body / UI Text | Poppins | Google Fonts — modern, readable |
| Base font size | 16px | Scales with rem throughout |
| Line height | 1.6 body / 1.2 headings | |

### Animation Tokens

| Token | Value | Used For |
|---|---|---|
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Gift card flip snap |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Page transitions |
| `--duration-fast` | `0.2s` | Hover states, small UI feedback |
| `--duration-med` | `0.6s` | Flip cards, scroll reveals |
| `--duration-slow` | `0.8s–1.2s` | Page entrances, hero animations |
| `--stagger-gap` | `0.15s` | Delay between staggered children |

### Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| Mobile `< 640px` | Single column, touch-first, stacked timeline |
| Tablet `640px–1024px` | Two-column memory timeline |
| Desktop `≥ 1024px` | Alternating timeline, 3-column gift grid |
| Touch targets | Minimum 44×44px on all interactive elements |

---

## 8. Non-Functional Requirements

### Performance

- Lighthouse Performance score ≥ 90 on mobile.
- First Contentful Paint (FCP) ≤ 1.5s on 4G connection.
- Total bundle size ≤ 500KB gzipped (excluding media assets).
- Images must be lazy-loaded with proper `width`/`height` to prevent layout shift.
- Lottie animations must be loaded lazily and paused when off-screen.

### Accessibility

- All interactive elements must have visible focus states.
- `aria-label` provided for icon-only buttons (music toggle).
- Color contrast ratio ≥ 4.5:1 for all text on backgrounds (WCAG AA).
- Flip cards must be keyboard-accessible via Enter / Space.
- All animations must respect `prefers-reduced-motion` — disable or reduce when set.
- Mini-game must have a keyboard fallback (press Enter to catch nearest heart).

### Browser & Device Support

| Browser / OS | Support Level |
|---|---|
| Chrome 90+ | Full support — primary target |
| Safari 14+ | Full support — critical for iOS |
| Firefox 88+ | Full support |
| Edge 90+ | Full support |
| iOS Safari 14+ | Full support — touch interactions required |
| Android Chrome 90+ | Full support |
| IE 11 | Not supported |

### Deployment

- Static site — deployable to Vercel, Netlify, or GitHub Pages with zero configuration.
- No backend, database, or server required.
- `vite build` must complete without errors or warnings.
- All asset paths must use relative URLs for portable deployment.

---

## 9. Development Phases

| Phase | Name | Deliverables |
|---|---|---|
| 1 | Project Setup | Vite scaffold, Tailwind config, fonts, color tokens, all data files |
| 2 | Landing + Hero | `LandingPage.jsx`, `BirthdayHero.jsx`, confetti, Lottie balloons |
| 3 | Memories Timeline | `MemoriesTimeline.jsx`, scroll reveal, `memoriesData.js` |
| 4 | Gift Flip Cards | `GiftSection.jsx`, `GiftFlipCard.jsx`, 3D flip animation, `giftsData.js` |
| 5 | Mini Game | `MiniGame.jsx`, heart spawning, score tracking, win condition |
| 6 | Final Message + Music | `FinalMessage.jsx`, word-by-word animation, `MusicController.jsx` |
| 7 | Polish + QA | Mobile testing, a11y audit, performance optimization, Lighthouse |
| 8 | Deployment | Vercel/Netlify deploy, URL sharing, final review |

---

## 10. Open Questions

| ID | Topic | Question |
|---|---|---|
| OQ-1 | Photo handling | Real uploaded photos vs emoji/illustration placeholders? Real photos are more personal but require asset management. |
| OQ-2 | Music licensing | What song plays as background? Must be royalty-free. Suggestion: Creative Commons birthday instrumental. |
| OQ-3 | Game difficulty | Selectable difficulty levels (easy/medium/hard) or single fixed target score for simplicity? |
| OQ-4 | Lottie vs CSS | If no suitable Lottie files are found on LottieFiles.com, CSS keyframe animations are the fallback. Decision needed before Phase 2. |
| OQ-5 | Multi-recipient | Support multiple recipients via URL params (`?name=Shreya`), or single-recipient per deployment? |
| OQ-6 | Analytics | Should anonymous session analytics (visits, game completions) be tracked via Plausible or similar? |

---

## 11. Out of Scope — Version 1.0

The following are explicitly excluded from V1 to keep the first release focused and shippable.

- User authentication or account creation
- Admin dashboard for non-developers to edit content via a UI
- Real-time collaborative features
- Video support in the memories timeline
- Open Graph social sharing card generation
- Email delivery or scheduled sending of the birthday link
- Dark mode
- Multi-language / internationalization support
- Backend API of any kind

---

## 12. Glossary

| Term | Definition |
|---|---|
| Flip Card | A UI element with two faces that rotates 180° on click to reveal the back |
| Framer Motion | Production-ready animation library for React |
| canvas-confetti | Lightweight JS library rendering confetti particles on HTML5 canvas |
| Lottie | Library that renders After Effects animations as JSON in the browser |
| Intersection Observer | Native browser API that fires callbacks when elements enter the viewport |
| Stagger Animation | Technique of animating multiple elements in sequence with a small delay between each |
| P0 / P1 / P2 | Priority levels: P0 = must-have, P1 = high value, P2 = nice-to-have |

---

*💖 Built with love. Shipped with joy. 🎂*
*Birthday Website PRD — Version 1.0 — February 2026*
