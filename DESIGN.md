# Design Brief — Foodie

## Purpose & Context
Mobile-first food delivery platform inspired by Zomato/Swiggy. Users search restaurants, browse menus, add items to cart, and place orders. Design emphasizes speed, trust, and food appeal through vibrant gradients, clean typography, and smooth animations.

## Tone & Aesthetic
Vibrant, premium, energetic. Warm gradient accents signal action and energy. Cool secondary palette provides contrast. Design feels fast, trustworthy, and delightful without being playful. Food cards and restaurant listings are the centerpiece — all UI elements support their prominence.

## Color Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| **Primary** (warm orange-red) | `0.58 0.18 27` | `0.68 0.18 27` | CTAs: Add to Cart, Checkout, Order Now |
| **Secondary** (deep blue) | `0.42 0.15 262` | `0.68 0.15 262` | Links, secondary actions, navigation highlights |
| **Accent** (vibrant warm) | `0.62 0.2 32` | `0.72 0.2 32` | Highlights, active states, ratings, badges |
| **Destructive** (red) | `0.56 0.22 22` | `0.65 0.22 22` | Cancel, remove, delete actions |
| **Muted** (light grey) | `0.94 0 0` | `0.22 0 0` | Disabled states, secondary text, borders |
| **Background** | `0.98 0 0` | `0.11 0 0` | Page background |
| **Card** | `1.0 0 0` | `0.15 0 0` | Card surfaces |
| **Border** | `0.88 0 0` | `0.25 0 0` | Input borders, dividers |

## Typography

| Role | Font | Scale | Usage |
|------|------|-------|-------|
| **Display** | Bricolage Grotesque (400–900) | 28–48px | Hero titles, section headings, restaurant names |
| **Body** | DM Sans (400–700) | 14–16px | Paragraph text, descriptions, price labels |
| **Mono** | Geist Mono (400–700) | 12–13px | Code blocks, order IDs, tracking numbers |

Leading: 1.5x for body, 1.3x for display. Weight hierarchy: Regular (400) for body, Semibold (600) for emphasis, Bold (700) for CTAs.

## Structural Zones

| Zone | Background | Border | Elevation | Purpose |
|------|-----------|--------|-----------|---------|
| **Header** | `bg-card` | `border-b border-border` | `shadow-sm` | Logo, search, cart, account nav |
| **Hero** | `bg-background` | None | None | Search bar, category chips with gradient accents |
| **Content Grid** | `bg-background` | None | None | Restaurant cards, menu items, order history |
| **Cards** | `bg-card` | `border border-border/50` | `shadow-md` hover:`shadow-lg` | Individual restaurants, food items, order items |
| **Footer** | `bg-muted/10` | `border-t border-border` | None | Links, social, compliance |

## Component Patterns

- **Buttons**: Gradient primary (`btn-gradient`), gradient secondary (`btn-gradient-secondary`), outlined (border + text-primary)
- **Cards**: `.card-elevated` — `shadow-md`, smooth hover lift (`hover:-translate-y-1`), hover shadow increase
- **Inputs**: `border border-border bg-input rounded-lg` — no shadow, focus ring in primary color
- **Modals**: `bg-card` with `shadow-lg`, border-t in primary for visual anchor
- **Badges**: `bg-accent text-accent-foreground rounded-full px-3 py-1` for ratings, tags
- **Skeleton**: `bg-muted animate-pulse-soft` for loading states on cards and text

## Motion & Animation

- **Fade-in**: `.fade-in` — 400ms ease-out for page loads, modal opens
- **Slide-up**: `.slide-up` — 400ms ease-out for card stacks, list items
- **Hover lift**: `.card-elevated` — `-translate-y-1` + shadow increase on hover
- **Pulse-soft**: `animate-pulse-soft` — 2s ease-in-out for skeleton loaders, reservation indicators
- **Transition default**: `.transition-smooth` — 300ms cubic-bezier(0.4, 0, 0.2, 1) for all interactive elements

## Spacing & Rhythm

- **Gap density**: `gap-4` (16px) between card columns, `gap-3` (12px) within cards
- **Padding hierarchy**: `p-4` (16px) standard card padding, `p-6` (24px) for spacious sections, `p-2` (8px) for compact inputs
- **Margin rhythm**: `my-6` between sections, `mb-4` after headings

## Signature Detail
Gradient buttons on all primary CTAs ("Add to Cart", "Checkout", "Order Now") using `btn-gradient` utility. Gradient shifts 135deg from warm orange-red to deeper red, creating motion and energy. Cards subtly lift on hover with shadow increase. Skeleton loaders use soft pulse animation, never harsh opacity shifts.

## Responsive Breakpoints
Mobile-first: base styles apply to 320px+. `sm:` (640px) for tablet layout adjustments. `md:` (768px) for desktop multi-column grids. `lg:` (1024px) for wide layouts.

## Dark Mode Behavior
Dark theme shifts backgrounds darker (`bg: 0.11 L`), increases text lightness for contrast (`fg: 0.93 L`), and lifts primary color to maintain vibrancy (`primary: 0.68 L` vs light `0.58 L`). Card elevation uses deeper shadows with adjusted alpha. Gradients remain consistent hue, adjust lightness per theme.

## Constraints & Anti-Patterns
- ❌ No rainbow palettes — max 5 colors (primary, secondary, accent, destructive, muted)
- ❌ No default Tailwind shadows — use defined hierarchy only (sm, md, lg, elevated)
- ❌ No rounded-full on non-badge elements — use `rounded-lg` (12px) as standard
- ❌ No arbitrary color values — all colors resolved via CSS variables
- ❌ No color function mixing — OKLCH values live in OKLCH functions only
- ✅ Gradient buttons on CTAs — establishes visual energy
- ✅ Skeleton loaders on async content — shows loading intent
- ✅ Smooth fade/slide animations — 300–400ms easing
- ✅ Card elevation hierarchy — shadow + hover lift creates depth
