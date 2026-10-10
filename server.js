const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── HERO DATA ──────────────────────────────────────────────────
const heroes = [
  {
    id: 'ironman',
    name: 'IRON MAN',
    realName: 'ANTHONY EDWARD STARK',
    hashtag: '#IRONMAN',
    badge: 'EARTH-616 // STARK INDUSTRIES ARCHIVE',
    tagline: 'GENIUS. BILLIONAIRE. PHILANTHROPIST.',
    description: "Wounded, captured, and forced to build a weapon by his enemies, industrialist Tony Stark instead created an advanced titanium-gold powered armor to save his life and escape. Upgraded to state-of-the-art nanotechnology Mark LXXXV, the Invincible Iron Man became founding leader of Earth's Mightiest Heroes, defending the cosmos through sheer will, intellect, and unmatched engineering precision.",
    stat1: { label: 'INTELLECT / TECH', value: 100 },
    stat2: { label: 'WEAPONS / REPULSOR', value: 98 },
    threat: 'OMEGA DEFENDER',
    ctaPrimary: 'ARMOR SCHEMATICS',
    ctaSecondary: 'J.A.R.V.I.S. UPLINK',
    legal: 'STARK INDUSTRIES // TONY STARK FOUNDATION // ALL RIGHTS RESERVED',
    posterTag: 'MK-LXXXV NANO-TECH',
    posterSubject: 'SUBJECT: TONY STARK // MALIBU',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_ndz-YJdhLllNlTFDwLVmMc-ROotxPCVCNCZuoHX2PZdoVtK3HZN6wibOBLFoNotX6jV8pTCGfFihatwPRFt94ST1P-3i_TX-AGC5AlOWMz5NWWzCHBbn1x3mlxgcJhhWgvNsVWjQrqg4EwmvwkYeTl17sw1yjF2FVFgXwAD-0i43PBSnWlc9g8GN8Li_bdqSiYx5NSd_YsQPHpK4UjLhwrWQdi4CN-xafc7y2DUexRmMJ-jkv7gMvRiiqOpRIKqxyuM',
    backgroundImage: 'assets/ironman_arc_reactor.jpg',
    theme: {
      primary: '#E62429',
      secondary: '#38bdf8',
      glow: 'rgba(230, 36, 41, 0.4)',
      gradient: 'radial-gradient(circle at 75% 45%, rgba(185, 28, 28, 0.45) 0%, rgba(136, 19, 55, 0.25) 30%, rgba(8, 8, 8, 0.95) 75%)',
      particleColor: '#ff4444',
      ambientOrb1: 'rgba(230, 36, 41, 0.2)',
      ambientOrb2: 'rgba(56, 189, 248, 0.12)'
    }
  },
  {
    id: 'spiderman',
    name: 'SPIDER-MAN',
    realName: 'PETER BENJAMIN PARKER',
    hashtag: '#SPIDERMAN',
    badge: 'EARTH-616 // QUEENS, NEW YORK',
    tagline: 'FRIENDLY NEIGHBORHOOD HERO',
    description: "Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City. A young Peter Parker begins to navigate his newfound identity as the web-slinging superhero Spider-Man.",
    stat1: { label: 'POWER FACTOR', value: 96 },
    stat2: { label: 'AGILITY / REFLEX', value: 99 },
    threat: 'OMEGA PROTECTOR',
    ctaPrimary: 'EXPLORE ABILITIES',
    ctaSecondary: 'VOICE LOG',
    legal: 'MARVEL ENTERTAINMENT // ALL RIGHTS RESERVED',
    posterTag: 'WEB-SHOOTER MK IV',
    posterSubject: 'SUBJECT: PETER PARKER // QUEENS',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1t1lJrVk3JaADdkRzXqiVGqIuyPRGK6FTm-gVYoZKNL9WHsrujjGhbzsu4o23FXU8O4MXfSf0v359zVxHNkq3WJjjVFH81DjHi44fdFzaA1t7IL22nNjFpG1r9tDMitMn9fRIsPvvkLJN3zJCstkQZ-Aql_cxi5hisPl0O4TGTezQY3BkrGw4wdvLCkvK_Qhv-SBz463sK8QUK1-Cv0ycmgUJWRG1SoKWeB8NPPAOaLvKsa7Jd5khUWOiVunLNAgShQ4',
    backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUQJHCoDXf1eX0iNX-_J19wJnBGPJBnOGgX5Rnt1NMc-2ZCMuGYXPuZuIYxmHgWRgqYFej1DZzBD6ndV_EP7A9rU1SETfIyG6OueE1pBrydMscUfY3ToGHiVwgQMN1Y2ol3wVbBST0KSNox6qEJLf7su6bhzmzIxCk-2gUU1w8v87tQUwRilGB42Ns4uPTvw0QSg2vRvn6CAt_SGISdS4LITiTP7DkrLaRbH8NwLh2NzBYdxvPJEaPUQ',
    theme: {
      primary: '#E62429',
      secondary: '#ff6666',
      glow: 'rgba(230, 36, 41, 0.5)',
      gradient: 'radial-gradient(ellipse at top, rgba(58,9,19,0.9) 0%, rgba(20,4,7,0.95) 60%, rgba(8,3,5,1) 100%)',
      particleColor: '#ff3344',
      ambientOrb1: 'rgba(255, 60, 75, 0.2)',
      ambientOrb2: 'rgba(200, 20, 35, 0.1)'
    }
  },
  {
    id: 'thor',
    name: 'THOR',
    realName: 'THOR ODINSON',
    hashtag: '#THOR',
    badge: 'REALM-001 // ASGARD CONTINUITY',
    tagline: 'GOD OF THUNDER & PROTECTOR OF NINE REALMS',
    description: "Prince of Asgard and rightful heir to Odin's throne, Thor Odinson commands the raw fury of cosmic tempest and primordial lightning. Wielding Mjolnir and Stormbreaker across the cosmic sea, he bridges realms and shatters existential threats to preserve mortal life across Midgard and the greater universe.",
    stat1: { label: 'ENERGY EMISSION', value: 97 },
    stat2: { label: 'GODLIKE STRENGTH', value: 99 },
    threat: 'COSMIC SAVIOUR',
    ctaPrimary: 'LIGHTNING MANIFEST',
    ctaSecondary: 'BIFROST CHRONICLES',
    legal: 'ASGARD CROWN ARCHIVE // ALL RIGHTS RESERVED',
    posterTag: 'STORMBREAKER ACTIVE',
    posterSubject: 'SUBJECT: THOR ODINSON // NEW ASGARD',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQqs4vNQCpE44D0PEGSUaN5BPh4QevthvMEYM7nvFCOGl7aqed8yI6GVhAEnSUDm7KNt9_zXeqnDkTCvve33p1WrFAREMyYdUKyhjMGqmywQXkJlPIWnyDQNi3ZIK5hynC_FZUluo6xIrtkMA3xrl1xS2u8UHntLF5aGNCENYKOqDPPKWibWdlYO14nlMBYKWgFOGz4Vp8FYmMyqPd_bC_I4LQLPb68b4LofizsJ5yQkp8TIg2J5YqbVL3UgHtxOyQ2cY',
    backgroundImage: 'assets/thor_asgard.jpg',
    theme: {
      primary: '#38bdf8',
      secondary: '#0ea5e9',
      glow: 'rgba(56, 189, 248, 0.4)',
      gradient: 'radial-gradient(ellipse at 60% 40%, rgba(14,40,80,0.9) 0%, rgba(3,7,18,0.95) 60%, rgba(3,7,18,1) 100%)',
      particleColor: '#38bdf8',
      ambientOrb1: 'rgba(56, 189, 248, 0.18)',
      ambientOrb2: 'rgba(14, 165, 233, 0.1)'
    }
  },
  {
    id: 'hulk',
    name: 'THE HULK',
    realName: 'ROBERT BRUCE BANNER',
    hashtag: '#HULK',
    badge: 'EARTH-616 // CULVER UNIVERSITY INCIDENT',
    tagline: 'STRONGEST THERE IS // TITAN ALPHA',
    description: "Dr. Robert Bruce Banner balances his fractured existence as a genius nuclear physicist with his towering alter-ego: The Hulk. Exposed to extreme lethal doses of synthetic gamma radiation, Banner awakens an indestructible force fueled by raw adrenaline and rage. With seismic thunderclaps capable of shattering tank divisions and boundless physical stamina, he stands as the world's most terrifying protector.",
    stat1: { label: 'STRENGTH', value: 100 },
    stat2: { label: 'RESILIENCE', value: 100 },
    threat: 'WORLD BREAKER',
    ctaPrimary: 'SEISMIC DOSSIER',
    ctaSecondary: 'BANNER AUDIO LOG',
    legal: 'CLASSIFIED DATABASE // SULLIVAN BASE RECORD #0492-GREEN',
    posterTag: 'BIO-SPECIMEN // 004',
    posterSubject: 'SUBJECT: BRUCE BANNER // CULVER LABS',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC59Guje7ZxEzeaR5NSqeAwAoQQXlFOD2IgUlAmaNeepcELZVNfGKAwIXQnxbp_mpvg9gMpngqyO0vG-LX26h8BzLS8DQC2xGQLqSpG1gJhqdvl-3TAX0oSU9zmryRftmVXN_NtPhtPPF2VdPax4KZ6HXOF0e306j-sKcMXJyJfIfHiQp53bflNQR8QCuxQ2AApzbaz6owczgd4SxjjgeMprJCOlJLYBR8grRD5FD4qkGIqgQcwMK4vXiDlYtB_p2JvR6Y',
    backgroundImage: '',
    theme: {
      primary: '#22c55e',
      secondary: '#4ade80',
      glow: 'rgba(34, 197, 94, 0.4)',
      gradient: 'radial-gradient(ellipse at 55% 50%, rgba(5,40,15,0.9) 0%, rgba(5,10,5,0.95) 60%, rgba(5,5,3,1) 100%)',
      particleColor: '#22c55e',
      ambientOrb1: 'rgba(34, 197, 94, 0.18)',
      ambientOrb2: 'rgba(22, 163, 74, 0.08)'
    }
  },
  {
    id: 'captain',
    name: 'CAPTAIN AMERICA',
    realName: 'STEVEN GRANT ROGERS',
    hashtag: '#CAPTAINAMERICA',
    badge: 'EARTH-616 // S.H.I.E.L.D. FILE #1941',
    tagline: 'FIRST AVENGER & SENTINEL OF LIBERTY',
    description: "From the streets of Brooklyn to becoming the pinnacle of human capability through the Super-Soldier Serum, Steve Rogers stands as the indestructible shield against tyranny. Wielding his circular vibranium shield and unyielding moral resolve, he inspires both humanity and fellow champions, spearheading the Avengers through every cosmic and earthly extinction threat with timeless courage.",
    stat1: { label: 'TACTICAL LEADERSHIP', value: 100 },
    stat2: { label: 'PHYSICAL ENDURANCE', value: 98 },
    threat: 'COMMANDER PRIME',
    ctaPrimary: 'TACTICAL MATRIX',
    ctaSecondary: 'DEPUTY LOG',
    legal: 'AVENGERS FACILITY // COMMAND OVERRIDE // CLASSIFIED 0-8-4',
    posterTag: 'VIBRANIUM MK II',
    posterSubject: 'SUBJECT: STEVE ROGERS // BROOKLYN, NY',
    image: 'assets/captain_america_card.jpg',
    backgroundImage: 'assets/captain_america_gym.jpg',
    theme: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      glow: 'rgba(59, 130, 246, 0.45)',
      gradient: 'radial-gradient(circle at 50% 48%, rgba(13,35,71,0.2) 0%, rgba(8,21,46,0.45) 45%, rgba(4,9,20,0.85) 75%, #040914 100%)',
      particleColor: '#3b82f6',
      ambientOrb1: 'rgba(59, 130, 246, 0.32)',
      ambientOrb2: 'rgba(220, 38, 38, 0.2)'
    }
  },
  {
    id: 'strange',
    name: 'DOCTOR STRANGE',
    realName: 'DR. STEPHEN VINCENT STRANGE',
    hashtag: '#DOCTORSTRANGE',
    badge: 'EARTH-616 // SANCTUM SANCTORUM',
    tagline: 'MASTER OF THE MYSTIC ARTS',
    description: "Once a prodigal yet arrogant neurosurgeon, Stephen Strange unlocked the pathways of dimensional sorcery following a fateful crash. Wielding the Eye of Agamotto and Cloak of Levitation, he ascends as Earth's primary guardian against cosmic entities, interdimensional anomalies, and eldritch powers tearing across the fabric of the Multiverse.",
    stat1: { label: 'MYSTIC POTENCY', value: 99 },
    stat2: { label: 'ASTRAL PROJECTION', value: 98 },
    threat: 'SORCERER SUPREME',
    ctaPrimary: 'SPELL COMPENDIUM',
    ctaSecondary: 'SANCTUM LOG',
    legal: 'MASTERS OF THE MYSTIC ARTS // ALL REALMS SECURED',
    posterTag: 'EYE OF AGAMOTTO',
    posterSubject: 'SUBJECT: STEPHEN STRANGE // BLEECKER ST',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8F06oybu-A47eNacednrV5mgp2XAoJV9FfJ-uAn9A7Jcg0CnkZ8pLgmiGIb4DqpPGFNrEdCLqkjXfaYOrvEoEXopExrWAaGk7nJnu3hyY2vZxSmQTMuX4z2MpV9PvhI97zm-d5GMinV545-DUAflazavEgeSjbSJtb08Berl5s31jHDEwdBmfrLvvJETbLcdBcV6SNfs9w9hbgprmQnm62rvutaIkJN39VgYpZtAJv9kvHPu5x4kYCvi3X263lzt8sk',
    backgroundImage: 'assets/doctor_strange_sanctum.jpg',
    theme: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      glow: 'rgba(245, 158, 11, 0.4)',
      gradient: 'radial-gradient(ellipse at 40% 40%, rgba(60,30,8,0.8) 0%, rgba(20,12,5,0.9) 50%, rgba(10,8,6,1) 100%)',
      particleColor: '#f59e0b',
      ambientOrb1: 'rgba(245, 158, 11, 0.15)',
      ambientOrb2: 'rgba(234, 88, 12, 0.08)'
    }
  },
  {
    id: 'wolverine',
    name: 'WOLVERINE',
    realName: 'JAMES "LOGAN" HOWLETT',
    hashtag: '#WOLVERINE',
    badge: 'EARTH-616 // WEAPON X PROGRAM',
    tagline: 'THE BEST THERE IS AT WHAT HE DOES',
    description: "Born James Howlett, the mutant known as Logan carries within him an unbreakable adamantium skeleton and a devastating set of retractable claws. With a healing factor that borders on immortality and centuries of combat experience, Wolverine serves as one of the X-Men's most lethal and complex warriors — torn between his feral nature and the hero he chooses to be.",
    stat1: { label: 'HEALING FACTOR', value: 100 },
    stat2: { label: 'COMBAT MASTERY', value: 99 },
    threat: 'ALPHA PREDATOR',
    ctaPrimary: 'WEAPON X FILES',
    ctaSecondary: 'BERSERKER PROTOCOL',
    legal: 'WEAPON X // XAVIER INSTITUTE // CLASSIFIED',
    posterTag: 'ADAMANTIUM GRADE',
    posterSubject: 'SUBJECT: LOGAN // WEAPON X',
    image: 'assets/wolverine_card.jpg',
    backgroundImage: 'assets/wolverine_backdrop.jpg',
    theme: {
      primary: '#facc15',
      secondary: '#eab308',
      glow: 'rgba(250, 204, 21, 0.4)',
      gradient: 'radial-gradient(ellipse at 65% 48%, rgba(60,45,5,0.8) 0%, rgba(15,12,3,0.95) 55%, rgba(8,8,5,1) 100%)',
      particleColor: '#facc15',
      ambientOrb1: 'rgba(250, 204, 21, 0.18)',
      ambientOrb2: 'rgba(202, 138, 4, 0.08)'
    }
  }
];

// ─── API ROUTES ─────────────────────────────────────────────────

// GET all heroes
app.get('/api/heroes', (req, res) => {
  res.json({
    status: 'success',
    count: heroes.length,
    data: heroes
  });
});

// GET single hero by id
app.get('/api/heroes/:id', (req, res) => {
  const hero = heroes.find(h => h.id === req.params.id);
  if (!hero) {
    return res.status(404).json({ status: 'error', message: 'Hero not found' });
  }
  res.json({ status: 'success', data: hero });
});

// GET hero by index
app.get('/api/heroes/index/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index < 0 || index >= heroes.length) {
    return res.status(404).json({ status: 'error', message: 'Invalid hero index' });
  }
  res.json({ status: 'success', data: heroes[index] });
});

// POST search heroes
app.post('/api/heroes/search', (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.json({ status: 'success', data: heroes });
  }
  const q = query.toLowerCase();
  const results = heroes.filter(h =>
    h.name.toLowerCase().includes(q) ||
    h.realName.toLowerCase().includes(q) ||
    h.id.toLowerCase().includes(q)
  );
  res.json({ status: 'success', count: results.length, data: results });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'MCU Active Archive',
    version: '1.0.0',
    heroCount: heroes.length,
    uptime: process.uptime()
  });
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── SERVER LAUNCH ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ⚡ MARVEL CINEMATIC UNIVERSE HUB`);
  console.log(`  ─────────────────────────────────`);
  console.log(`  🌐 Server running at http://localhost:${PORT}`);
  console.log(`  📡 API available at http://localhost:${PORT}/api/heroes`);
  console.log(`  🟢 Status: ONLINE\n`);
});
