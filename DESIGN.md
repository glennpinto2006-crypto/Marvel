---
name: Marvel Cinematic Universe Archive
description: Immersive Earth-616 tactical character archive with 3D depth and dynamic atmosphere
colors:
  primary: "#E62429"
  primary-hover: "#FF3439"
  accent-gold: "#F5C518"
  canvas: "#080808"
  surface-1: "#0D0D0D"
  surface-2: "#151515"
  hairline: "#242424"
  hairline-bright: "#2A2A2A"
  text-dominant: "#FFFFFF"
  text-secondary: "#D0D0D0"
  text-muted: "#8A8A8A"
typography:
  display:
    fontFamily: "'Bebas Neue', sans-serif"
    fontSize: "clamp(60px, 8vw, 100px)"
    fontWeight: 400
    lineHeight: "0.92"
    letterSpacing: "0.06em"
  headline:
    fontFamily: "'Bebas Neue', sans-serif"
    fontSize: "clamp(36px, 5vw, 56px)"
    fontWeight: 400
    lineHeight: "1.05"
    letterSpacing: "0.05em"
  title:
    fontFamily: "'Manrope', sans-serif"
    fontSize: "18px"
    fontWeight: 800
    lineHeight: "1.2"
    letterSpacing: "0.08em"
  body:
    fontFamily: "'Manrope', sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "1.75"
    letterSpacing: "normal"
  label:
    fontFamily: "'Space Grotesk', monospace"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: "1.4"
    letterSpacing: "0.15em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  pill: "100px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "60px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-dominant}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.text-dominant}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
  card-character:
    backgroundColor: "{colors.surface-1}"
    rounded: "{rounded.md}"
    padding: "20px"
---

# Design System: Marvel Cinematic Universe Archive

## Overview

**Creative North Star: "Stark Classified Holoterminal"**

The Marvel Cinematic Universe Archive is an in-universe tactical intelligence interface built for Earth-616 hero reconnaissance. The aesthetic fuses aerospace carbon composite density, high-contrast dark-mode surfaces, classified military typography stamps, and reactive WebGL particle illumination. It delivers the sensation of accessing Tony Stark's personal Malibu workshop terminal or S.H.I.E.L.D. Helicarrier command console.

Surfaces remain grounded in near-absolute black canvas voids (#080808) and matte carbon substrates (#0D0D0D, #151515). High-energy chromatic radiation—anchored by iconic Marvel Crimson (#E62429) and restrained Sovereign Gold (#F5C518)—is reserved for tactical state changes, attribute gauges, and classified security badges. 

**Key Characteristics:**
- **In-Universe Tactical Atmosphere**: Precision gridlines, scanline textures, HUD coordinates, and authentic classification identifiers.
- **Volumetric Holo-Depth**: Three.js WebGL particle systems and 3D card tilt physics create tangible physical weight.
- **Disciplined Palette Restraint**: Pure carbon canvas, vivid scarlet accents, and golden rank marks without color pollution.
- **Kinetic Micro-Interactions**: Pill docks, laser stat meters, glowing hairline borders, and smooth hero cross-fades.

## Colors

The palette is a disciplined triad dominated by carbon neutrals (85%), punctuated by Marvel Crimson (10%) and Sovereign Gold (5%).

### Primary
- **Marvel Crimson** (#E62429): Used exclusively for primary action triggers, the canonical MARVEL emblem, progress indicators, and threat alerts.
- **Crimson Highlight** (#FF3439): Hover illumination and glow saturation for active states.

### Secondary
- **Sovereign Gold** (#F5C518): Reserved for elite hero alter-egos, legendary threat classifications, and verified security metadata pills.

### Neutral
- **Deep Void Canvas** (#080808): Root background canvas; provides endless cosmic contrast.
- **Carbon Substrate Level 1** (#0D0D0D): Primary surface container for cards, docks, and HUD modules.
- **Carbon Substrate Level 2** (#151515): Elevated card backing and interactive states.
- **Hairline Border** (#242424): Subdued 1px structural gridlines separating modules.
- **Hairline Bright** (#2A2A2A): Focused borders, card rims, and divider bars.
- **Stark Dominant White** (#FFFFFF): High-impact hero titles, active tabs, and primary numerical readouts.
- **Dossier Text Secondary** (#D0D0D0): Character descriptions, body copy, and secondary labels.
- **Telemetry Muted** (#8A8A8A): Sub-headings, metadata stamps, and inactive dock icons.

### Named Rules
**The Rarity of Red Rule.** Marvel Crimson is never used as background wallpaper or large decorative fills; its power stems strictly from high-contrast focus on actionable controls, key stamps, and pulse indicators.

**The Sovereign Gold Rule.** Gold is strictly decorative and hierarchical—it denotes tier, clearance, and alter-ego identity, never arbitrary UI borders or buttons.

## Typography

**Display Font:** Bebas Neue (Google Fonts, with fallback sans-serif)  
**Body Font:** Manrope (Google Fonts, with fallback sans-serif)  
**Label/Mono Font:** Space Grotesk (Google Fonts, with fallback monospace)  

**Character:** A pairing of towering cinematic display lettering (Bebas Neue) with crisp aerospace telemetry type (Space Grotesk) and warm human editorial narrative (Manrope).

### Hierarchy
- **Display** (Regular 400, `clamp(60px, 8vw, 100px)`, line-height 0.92, letter-spacing 0.06em, uppercase): Hero character titles and loading logo.
- **Headline** (Regular 400, `clamp(36px, 5vw, 56px)`, line-height 1.05, letter-spacing 0.05em, uppercase): Section headers ("THE ROSTER").
- **Title** (ExtraBold 800, 18px, line-height 1.2, letter-spacing 0.08em, uppercase): Real hero identity names (e.g. ANTHONY EDWARD STARK).
- **Body** (Regular 400 / Medium 500, 15px, line-height 1.75, letter-spacing normal): Tactical intelligence narrative and character origins; optimal line length 55–65ch.
- **Label** (Bold 700, 11px, line-height 1.4, letter-spacing 0.15em, uppercase): Classified badges, attribute keys, HUD tags, and navigation links.

### Named Rules
**The Monospace Telemetry Rule.** Every data point, attribute metric, security clearance, and technical tag must be rendered in Space Grotesk with letter-spacing >= 0.1em and uppercase styling.

## Layout

The spatial model uses an aerospace grid layout anchored by a 1440px max-width central container, 72px fixed top navigation, and floating 20px-radius bottom roster dock.

- **Grid System**: 12-column responsive layout; hero showcase splits into a 50/50 two-column asymmetric split (left narrative dossier, right 3D poster card).
- **Character Grid**: Responsive auto-fill grid (`minmax(280px, 1fr)`) with 24px gap.
- **Spacing Scale**: 4px micro, 8px compact, 16px standard, 24px component, 40px section inner, 60px section gap, 100px macro rhythm.
- **Breakpoints**: Desktop (>1024px), Tablet (768px–1024px), Mobile (<768px). Mobile transitions from split columns to single-column stacking with docked roster hiding in favor of swipe controls.

## Elevation & Depth

Depth is established through physical layering, Three.js WebGL particle suspension, and directional multi-layered glass shadows rather than generic blur.

### Shadow Vocabulary
- **Carbon Resting** (`box-shadow: 0 0 0 1px #242424`): Default resting state for tactical cards and HUD panels.
- **Interactive Lift** (`box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px var(--theme-glow)`): Applied to hovered character cards and focused hero posters.
- **Dock Levitation** (`box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6), 0 0 30px var(--theme-glow)`): Floating bottom roster dock creating permanent z-axis elevation.

### Named Rules
**The Layered Holo-Depth Rule.** Surfaces rest flush on carbon grids; elevation is triggered dynamically by pointer proximity, unleashing 3D perspective rotation, border gradient illumination, and particle refraction.

## Shapes

- **Corner Radii**:
  - `2px`: Marvel logo badge and classified security tags.
  - `4px`: Tactical buttons, stat cards, and threat pills.
  - `8px`: Hero character cards and poster card wrapper.
  - `12px`: Roster dock hero buttons.
  - `20px`: Floating roster dock shell.
  - `100px`: Circular navigation icons, carousel chevrons, and status pills.
- **Form Geometry**: Pure rectilinear discipline for data panels; gentle radius softens interactive click surfaces without feeling toy-like.
- **Borders**: Razor-sharp 1px hairlines (`#242424`) with dual gradient masks on hover.

## Components

### Buttons
- **Shape**: Subtle chamfer/radius (4px).
- **Primary**: Background `{colors.primary}`, color `#FFF`, padding `14px 28px`, uppercase Space Grotesk 12px/700, letter-spacing `0.15em`. Hover scales 1.03 with brightness 1.2 and intense crimson halo.
- **Secondary**: Background `{colors.surface-1}` (80% alpha blur), border 1px `{colors.hairline-bright}`, color `{colors.text-secondary}`. Hover transitions border to `{colors.primary}` with 15px glow.

### Character Poster (3D Tilt)
- **Shape**: 8px radius, aspect ratio 3:4, max-width 420px.
- **Behavior**: Real-time cursor parallax tilt (`rotateX`, `rotateY`), interior specular shine wipe, and dual-layer ambient color flare matching the active hero.

### Character Grid Cards
- **Shape**: 8px radius, overflow hidden, surface-1 background.
- **Content**: 16:10 top artwork with linear gradient bottom mask, uppercase Bebas title, gold alter-ego label, 3-line clamped synopsis, and pulsing threat pill.
- **Hover**: Transforms -8px with 2-degree tilt and crimson border bloom.

### Roster Dock
- **Shape**: Pill container (`border-radius: 20px`), backdrop-filter blur 24px, positioned fixed at `bottom: 24px`.
- **Hero Tabs**: 30px avatar thumbnail, bold name, hashtag telemetry tag, and active indicator glow.

### Navigation Header
- **Shape**: Fixed 72px banner, 60% black canvas with 20px backdrop blur, bottom 1px hairline border.
- **Elements**: Circular glowing arc-reactor emblem, brand title, mono route links with sliding underline indicators, gold active hashtag, and soundscape button.

## Do's and Don'ts

### Do:
- **Do** preserve the `#080808` canvas to maintain infinite contrast for Three.js particles and neon glows.
- **Do** format all telemetry data, badges, and metrics in uppercase Space Grotesk with letter-spacing >= `0.1em`.
- **Do** maintain smooth cross-fade transitions when switching between heroes (coordinated text, backdrops, and particles).
- **Do** keep gold `#F5C518` strictly confined to alter-egos, ratings, and threat tiers.
- **Do** ensure all interactions provide keyboard accessibility and touch swipe equivalents.

### Don't:
- **Don't** introduce solid colored background sections; all surfaces must be dark carbon substrates.
- **Don't** use generic rounded buttons or playful bubbly shapes; maintain tactical aerospace geometry.
- **Don't** dilute Marvel Crimson with secondary competing warm tones (e.g. orange or magenta).
- **Don't** use standard browser fonts or unstyled serif typefaces.
- **Don't** block user interactions during 3D particle rendering or background cross-fades.
