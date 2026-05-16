# Design Brief

## Direction

Stallo.in — Premium marketplace for booking verified wedding food stalls with trust-first visuals, transparent pricing, and luxury hospitality mood.

## Tone

Luxury enterprise meets local hospitality — refined, trustworthy, modern, food-focused without being casual.

## Differentiation

Verified vendor badges, transparent pricing cards, food-rich hero imagery, and dark mode support position Stallo as the premium choice for wedding food sourcing.

## Color Palette

| Token      | OKLCH           | Role                              |
| ---------- | --------------- | --------------------------------- |
| background | 0.985 0.001 0   | Light mode default surface        |
| foreground | 0.18 0.005 0    | Text on background                |
| card       | 0.995 0 0       | Card/panel background             |
| primary    | 0.62 0.20 45    | Burnt orange: CTAs, badges, links |
| secondary  | 0.55 0.08 160   | Sage green: success, trust marks  |
| muted      | 0.92 0.002 0    | Subtle backgrounds, dividers      |
| accent     | 0.62 0.20 45    | Same as primary                   |

## Typography

- Display: Fraunces — hero titles, section headers, premium positioning
- Body: GeneralSans — all body text, labels, UI copy; excellent readability at all weights
- Scale: hero H1 `text-5xl/6xl font-display font-bold`, h2 `text-3xl font-display font-semibold`, label `text-sm font-body font-medium`, body `text-base font-body`

## Elevation & Depth

Soft shadow hierarchy creates depth without drama — cards lift with `shadow-sm` (subtle) to `shadow-md` (elevated), focused sections use `shadow-lg`, never glow or neon shadows.

## Structural Zones

| Zone    | Background         | Border           | Notes                                              |
| ------- | ------------------ | ---------------- | -------------------------------------------------- |
| Header  | bg-card border-b   | border-border    | Navigation, logo, search; elevated above content  |
| Hero    | bg-background      | —                | Large imagery, brand tagline, primary CTA         |
| Content | bg-background      | —                | Alternates bg-background and bg-muted/30 sections |
| Sidebar | bg-sidebar         | border-sidebar   | Dashboard nav; soft darker shade for focus        |
| Footer  | bg-muted/10        | border-t         | Trust info, links, legal; subtle background       |

## Spacing & Rhythm

Section gaps `4rem` (lg) to `6rem` (xl), content grouping `2rem`, card padding `1.5rem` to `2rem`, micro-spacing `0.5rem` to `1rem` — creates visual rhythm without grid monotony.

## Component Patterns

- **Buttons**: Rounded `rounded-md`, primary `bg-primary text-primary-foreground` with `hover:opacity-90`, secondary `border border-border bg-background` with `hover:bg-muted/50`
- **Cards**: Roundness `rounded-lg`, background `bg-card`, shadow `shadow-sm` with `hover:shadow-md`, border `border border-border/50`
- **Badges**: Roundness `rounded-full`, primary `bg-primary text-primary-foreground px-3 py-1 text-xs`, verified `bg-secondary text-secondary-foreground`
- **Inputs**: Roundness `rounded-md`, background `bg-input`, border `border border-border`, focus `ring-2 ring-primary/50`

## Motion

- **Entrance**: Fade + scale (opacity 0→1, scale 0.98→1) over 300ms on page load for cards and sections
- **Hover**: Button color shift `transition-smooth`, card shadow lift `shadow-sm→shadow-md` over 200ms
- **Decorative**: Subtle pulse on verified badges, smooth transitions on tab switches

## Constraints

- No generic brand colors — every color serves the wedding/food hospitality story
- OKLCH only; never mix in hex, RGB, or CSS color names
- Shadows only via Tailwind `shadow-*`, never box-shadow inline or custom glow effects
- Dark mode must maintain contrast: AA+ luminance difference on all interactive elements
- Typography: Fraunces for hierarchy only, GeneralSans for all body/UI

## Signature Detail

Verified vendor badges use gradient underline from primary to secondary — a subtle detail signaling trust and premium positioning across all vendor cards and listings.
