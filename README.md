Viewed PRODUCT.md:1-66
Ran command: `Test-Path README.md`
Created README.md

Here is the complete [`README.md`](file:///c:/Users/hi/OneDrive/Desktop/Marvel/README.md) content, which has also been created directly in your project root:

```markdown
# ⚡ MARVEL CINEMATIC UNIVERSE — Heroes Archive

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

An immersive, 3D interactive tactical archive of Earth-616 heroes from the Marvel Cinematic Universe. Designed as an in-universe S.H.I.E.L.D. / Stark Industries tactical terminal featuring real-time WebGL particle physics, 3D card tilt dynamics, bespoke per-character atmospheric backgrounds, and a full REST API.

---

## 🌟 Key Features

- **🌐 Interactive 3D WebGL Particle System**: Powered by Three.js with real-time mouse parallax, particle physics, and orbital depth rings tailored to each hero's energy field.
- **🎴 3D Card Tilt & Holographic Lighting**: Realistic pointer-following physics and specular glare effects over high-resolution character posters.
- **🌌 Dynamic Cinematic Themed Environments**: Coordinated cross-fading wallpapers, custom radial vignettes, and ambient lighting tailored to each character:
  - **Iron Man**: Triangular Mark VI Arc Reactor core with Stark crimson ambiance.
  - **Captain America**: Brooklyn boxing gym scene (*"I Can Do This All Day"*) with tactical vibranium blue and red rim lighting.
  - **Thor**: Golden Realm of Asgard, mountain ranges, and Bifrost Bridge with cosmic storm tempest glows.
  - **Doctor Strange**: Sanctum Sanctorum Window of the Worlds (Seal of the Vishanti) with Eldritch amber and astral teal energy.
  - **Wolverine**: Gleaming Adamantium Claws over the X-Men steel emblem paired with Logan's masked battle suit.
  - **Spider-Man & Hulk**: Dedicated Queens web-slinger and Gamma radiation bio-dossier themes.
- **📊 Tactical Dossiers & Combat Analytics**: Power factor, threat tiers (e.g., *Omega Defender*, *Sorcerer Supreme*, *Cosmic Saviour*), combat gauges, and continuity archives.
- **🚀 Dual-Mode Resilience**:
  - **Full-Stack Mode**: Node.js & Express REST API server.
  - **Standalone Static Mode**: Works directly in the browser via `index.html` with built-in client fallbacks.
- **🎧 Ambient Soundscape & Hotkeys**: Integrated audio toggle and keyboard arrow key navigation (`←` / `→`) for seamless roster browsing.

---

## 📸 Hero Showcase

| Hero | Threat Classification | Characteristic Theme |
| :--- | :--- | :--- |
| **Iron Man** | `OMEGA DEFENDER` | Mark VI Arc Reactor Core & Stark Crimson |
| **Captain America** | `COMMANDER PRIME` | Brooklyn Boxing Gym (*"I Can Do This All Day"*) |
| **Thor** | `COSMIC SAVIOUR` | Asgard Golden Spire & Bifrost Lightning |
| **Doctor Strange** | `SORCERER Supreme` | Sanctum Sanctorum Window & Mystic Runes |
| **Wolverine** | `ALPHA PREDATOR` | Adamantium Claws & Weapon X Gold/Amber |
| **Spider-Man** | `OMEGA PROTECTOR` | Queens Skyline & Stark Web-Shooters |
| **The Hulk** | `WORLD BREAKER` | Culver Labs Synthetic Gamma Radiance |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/glennpinto2006-crypto/Marvel.git
   cd Marvel
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running Locally

#### Option 1: Express Server (Recommended)
```bash
npm run dev
# or
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

#### Option 2: Standalone Static File
Double-click `index.html` or open it with VS Code **Live Server**.

---

## 📡 REST API Documentation

The Express server exposes the following RESTful endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/heroes` | Retrieve dossiers and metadata for all heroes |
| `GET` | `/api/heroes/:id` | Fetch specific hero by ID (e.g., `/api/heroes/ironman`) |
| `GET` | `/api/heroes/index/:index` | Fetch hero by numerical index (`0` through `6`) |
| `POST` | `/api/heroes/search` | Search heroes by name, alter-ego, or continuity |

### Sample Response (`GET /api/heroes/ironman`)
```json
{
  "status": "success",
  "data": {
    "id": "ironman",
    "name": "IRON MAN",
    "realName": "ANTHONY EDWARD STARK",
    "hashtag": "#IRONMAN",
    "badge": "EARTH-616 // STARK INDUSTRIES ARCHIVE",
    "threat": "OMEGA DEFENDER",
    "image": "assets/ironman_card.jpg",
    "backgroundImage": "assets/ironman_arc_reactor.jpg",
    "stat1": { "label": "INTELLECT / TECH", "value": 100 },
    "stat2": { "label": "WEAPONS / REPULSOR", "value": 98 }
  }
}
```

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), Vanilla CSS3 (Custom Design System, Glassmorphism & Animations)
- **3D Graphics & Physics**: [Three.js (r128)](https://threejs.org/)
- **Typography & Icons**: [Google Fonts (Bebas Neue, Manrope, Space Grotesk)](https://fonts.google.com/), [Font Awesome 6](https://fontawesome.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [CORS](https://www.npmjs.com/package/cors)

---

## ⌨️ Keyboard Shortcuts & Controls

- `←` (Left Arrow): Select Previous Hero
- `→` (Right Arrow): Select Next Hero
- `Mouse Move`: Parallax 3D particle shift & Card Tilt
- `Click Audio Button`: Toggle Ambient Synth Soundscape

---

