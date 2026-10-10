# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are Marvel Cinematic Universe fans, enthusiasts, and lore researchers who want to explore Earth-616 heroes through an immersive, interactive digital terminal. They arrive seeking high-impact character artwork, power ratings, combat statistics, and verified continuity dossiers.

## Product Purpose

Deliver a premier, tactile digital archive of Earth-616 heroes that feels like accessing an in-universe Stark Industries or S.H.I.E.L.D. classified tactical interface. Success is defined by visceral cinematic immersion, instant responsiveness, and engaging hero discovery.

## Positioning

In-universe tactical archive with live 3D depth. Unlike flat fan wikis or static catalog pages, this hub pairs real-time Three.js WebGL particle physics and 3D card tilt perspective with dynamic per-character thematic environments, cross-fading backdrops, and dedicated REST API dossiers.

## Operating Context

- Platforms: Modern desktop and mobile web browsers (Chrome, Edge, Safari, Firefox).
- Execution modes:
  - Full-stack live mode powered by Node.js and Express backend on `http://localhost:3000` with RESTful hero endpoints (`/api/heroes`).
  - Standalone local web archive via `index.html` with built-in client fallbacks.
- Input models: Mouse parallax, keyboard shortcuts (Left/Right arrows), mobile touch swipes, and tactile dock buttons.

## Capabilities and Constraints

- Capabilities:
  - Live Three.js WebGL particle system and rotating geometric orbital rings that respond to mouse motion.
  - Real-time 3D card tilt effect responding to cursor coordinates over hero posters.
  - Character roster dock allowing instant hero switching with coordinated cross-fading backdrops, ambient color orbs, and CSS custom property theme transitions.
  - REST API endpoints for hero records (`/api/heroes`, `/api/heroes/:id`, `/api/heroes/index/:index`).
  - Dedicated character dossiers with tactical threat tiers, dual attribute gauges, and lore summaries.
  - Ambient audio soundscape toggle and keyboard navigation.
- Constraints:
  - Curated Earth-616 cinematic continuity scope.
  - Vanilla HTML5 / CSS3 / JavaScript frontend architecture paired with an Express.js backend.
  - Offline resilience: Must render fully even if the backend API is temporarily disconnected.

## Brand Commitments

- Official MARVEL styling cues, Earth-616 continuity designations, and authentic S.H.I.E.L.D. / Stark Industries classification stamps.
- Canonical hero identities, verified alter-egos (Tony Stark, Peter Parker, Thor Odinson, Bruce Banner, Steve Rogers, Stephen Strange, James "Logan" Howlett), and tactical threat classifications.

## Evidence on Hand

- Verified hero assets and high-resolution character artwork loaded in `server.js`, `public/index.html`, and `index.html`.
- Custom character-specific backdrops (Stark Arc Reactor Malibu theme, Queens web skyline, Asgard Bifrost tempest, Culver Labs gamma specimen, Brooklyn shield, Sanctum Sanctorum mystic arts, Weapon X adamantium claws).
- Active Node.js backend server with Express API endpoints.

## Product Principles

1. **In-Universe Tactical Authenticity**: Every UI element, badge, and attribute bar must read like a high-clearance tactical terminal rather than a generic promotional site.
2. **Cinematic Multisensory Immersion**: Visual atmosphere, ambient glows, dynamic wallpapers, and particle behaviors adapt in real time to the selected hero's aura.
3. **Dual Execution Resilience**: The application must run seamlessly whether launched via the live Node.js server or opened directly in a local browser.
4. **Scannable Depth**: Balance dense tactical specifications with clean typographical hierarchy so users can browse rapidly or dive deep into hero lore.

## Accessibility & Inclusion

- Semantic HTML5 structure with accessible navigation landmarks and button labels.
- Dual navigation modes: mouse, keyboard arrow keys, and touch swipe gestures.
- High-contrast typography on dark slate/carbon surfaces adhering to readable contrast ratios.
