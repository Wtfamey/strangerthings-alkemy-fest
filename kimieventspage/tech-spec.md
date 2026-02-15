# Alchemy Fest - Technical Specification

## 1. Tech Stack Overview

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Google Fonts (Inter, custom Benguiat-style) |

## 2. Tailwind Configuration Extensions

```javascript
// tailwind.config.js extensions
{
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#0d1117',
        'neon-red': '#ff0040',
        'neon-purple': '#b829dd',
        'neon-pink': '#ff2a6d',
        'neon-cyan': '#00d4aa',
        'neon-green': '#39ff14',
        'neon-orange': '#ff5e00',
      },
      fontFamily: {
        'benguiat': ['"ITC Benguiat"', 'Georgia', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 2s infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'noise': 'noise 0.5s steps(10) infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.95 },
          '52%': { opacity: 0.7 },
          '54%': { opacity: 0.95 },
        },
        'glow-pulse': {
          '0%, 100%': { textShadow: '0 0 10px #ff0040, 0 0 20px #ff0040, 0 0 30px #ff0040' },
          '50%': { textShadow: '0 0 20px #ff0040, 0 0 40px #ff0040, 0 0 60px #ff0040' },
        },
      },
    },
  },
}
```

## 3. Component Inventory

### Shadcn/UI Components (Pre-installed)
- `Button` - For REGISTER buttons (customized)
- `Switch` - For "Flip to Upside Down" toggle

### Custom Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Navbar` | `onToggleUpsideDown: () => void` | Fixed navigation with logo, links, toggle |
| `NeonTitle` | `text: string, color?: string` | Flickering neon text effect |
| `EventCard` | `event: EventData` | Individual event card with arcade image |
| `EventsGrid` | `events: EventData[]` | Grid container for event cards |
| `GlitchBackground` | - | Animated noise/scanline background |
| `NeonButton` | `children, color, onClick` | Glowing border button with fill hover |

### Type Definitions

```typescript
interface EventData {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  imageSrc: string;
}

type NeonColor = 'purple' | 'pink' | 'red' | 'green' | 'cyan' | 'orange';
```

## 4. Animation Implementation Plan

| Interaction Name | Tech Choice | Implementation Logic |
|------------------|-------------|---------------------|
| Page Load Stagger | Framer Motion | `staggerChildren: 0.1` on container, `y: 20 -> 0, opacity: 0 -> 1` on items |
| Title Flicker | CSS Animation | `@keyframes flicker` with random opacity changes, 2s infinite |
| Title Glow Pulse | CSS Animation | `@keyframes glow-pulse` with text-shadow intensity changes |
| Nav Link Hover | Tailwind + CSS | `hover:text-neon-red hover:drop-shadow-[0_0_8px_#ff0040]` |
| Card Hover Lift | Framer Motion | `whileHover: { y: -4, transition: { duration: 0.3 } }` |
| Card Glow Intensify | Tailwind | `hover:shadow-[0_0_30px_rgba(255,0,64,0.3)]` |
| Button Fill | Tailwind | `hover:bg-current hover:text-bg-primary` transition |
| Arcade Image Scale | Framer Motion | `whileHover: { scale: 1.05 }` on image container |
| Background Noise | CSS/SVG | Animated SVG noise filter or CSS random pattern |
| Toggle Switch | Framer Motion | `layout` prop for smooth thumb movement |

### Animation Timing Specifications

| Animation | Duration | Easing | Delay |
|-----------|----------|--------|-------|
| Page load fade in | 0.5s | ease-out | 0s |
| Nav stagger | 0.3s | ease-out | 0.1s each |
| Card stagger | 0.4s | cubic-bezier(0.4, 0, 0.2, 1) | 0.15s each |
| Hover transitions | 0.3s | cubic-bezier(0.4, 0, 0.2, 1) | 0s |
| Button fill | 0.3s | ease | 0s |
| Flicker cycle | 2s | steps(5) | 0s |

## 5. Project File Structure

```
/mnt/okcomputer/output/app/
├── public/
│   ├── arcade-purple.png
│   ├── arcade-pink.png
│   ├── arcade-red.png
│   ├── arcade-green.png
│   ├── arcade-cyan.png
│   └── arcade-orange.png
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── NeonTitle.tsx
│   │   ├── EventCard.tsx
│   │   ├── EventsGrid.tsx
│   │   ├── GlitchBackground.tsx
│   │   └── NeonButton.tsx
│   ├── hooks/
│   │   └── useScrollPosition.ts
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   └── events.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 6. Package Installation Commands

```bash
# Initialize project (already done via skill script)
# bash /app/.kimi/skills/webapp-building/scripts/init-webapp.sh "Alchemy Fest"

# Install animation library
npm install framer-motion

# Install additional dependencies (if needed)
npm install lucide-react
```

## 7. Implementation Notes

### Neon Glow Effect Strategy
- Use multiple text-shadow layers for depth
- Example: `text-shadow: 0 0 10px #ff0040, 0 0 20px #ff0040, 0 0 40px #ff0040`
- Combine with CSS animations for flicker/pulse

### Background Effects Strategy
- Base: Dark gradient background
- Overlay 1: SVG noise filter (animated)
- Overlay 2: CSS scanline gradients
- Use `mix-blend-mode: overlay` for subtle effects

### Responsive Breakpoints
- Mobile: < 640px (1 column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)

### Performance Considerations
- Use `will-change: transform` on animated elements
- Lazy load arcade images
- Use CSS animations where possible (GPU accelerated)
- Minimize re-renders with React.memo on cards
