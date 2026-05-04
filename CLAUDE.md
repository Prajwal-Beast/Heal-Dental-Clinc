# Heal Dental Clinic — Project Guide

- **Project:** Heal Dental Clinic Website
- **Live URL:** https://prajwal-beast.github.io/Heal-Dental-Clinc/
- **Stack:** Plain HTML, CSS, JavaScript (no frameworks, no build tools)
- **Design reference:** Dribbble shot 21958171 (Dental Clinic Landing Page) — clean split-hero, light backgrounds, numbered service cards

---

## File Structure

```
/
├── index.html              ← Shell: loads CSS, JS, injects sections via fetch
├── CLAUDE.md               ← This file
├── screenshots/            ← Section screenshots for design review
│   └── README.md
├── css/
│   ├── global.css          ← Brand tokens, reset, utilities, buttons, responsive
│   ├── header.css          ← Nav + mobile nav overlay
│   ├── hero.css            ← Hero split layout + stat bar
│   ├── about.css           ← About section + image grid
│   ├── services.css        ← Numbered service cards
│   ├── team.css            ← Team cards
│   ├── testimonials.css    ← Google review cards
│   └── contact.css         ← CTA strip + booking form + info + footer
├── js/
│   ├── main.js             ← Section loader, GSAP scroll animations, counters
│   ├── nav.js              ← Scroll nav + mobile toggle (closeMob global)
│   ├── testimonials.js     ← Star entrance animation
│   └── contact.js          ← Form submit handler
└── sections/
    ├── header.html         ← Mobile overlay + main nav
    ├── hero.html           ← Hero + stat bar
    ├── about.html          ← About + image grid
    ├── services.html       ← 6 numbered service cards
    ├── team.html           ← 3 team cards
    ├── testimonials.html   ← 6 Google review cards
    └── contact.html        ← CTA + booking form + info + map + footer
```

---

## Brand Tokens (from Brand Guidelines v1.0)

### Colors
| Token | Hex | Use |
|-------|-----|-----|
| `--deep` | `#0E2A4A` | Primary dark — dark sections, deep text |
| `--deep-600` | `#143761` | Nav, headings on dark |
| `--deep-800` | `#0A2038` | Footer background |
| `--sky` | `#3FA9D9` | Primary CTA, links, rule accents |
| `--sky-100` | `#BCE0F2` | Light sky tint backgrounds |
| `--leaf` | `#7BC36A` | Hover state on primary buttons |
| `--leaf-100` | `#C9E5BF` | Light green tint |
| `--ink` | `#0A1A2E` | Main body text |
| `--ink-700` | `#1F3550` | Secondary body text |
| `--slate` | `#8FAAC4` | Muted/placeholder text |
| `--line` | `#D9E3EC` | Borders, dividers |
| `--surface` | `#EAF1F7` | Card backgrounds |
| `--paper` | `#F4F8FB` | Section backgrounds |
| `--white` | `#FFFFFF` | Pure white |

### Typography
| Role | Font | Size | Weight |
|------|------|------|--------|
| Display h1 | Fraunces | 64px | 400, italic em = sky |
| Heading h2 | Fraunces | 40px | 400 |
| Heading h3 | Fraunces | 24px | 400 |
| Lede | Plus Jakarta Sans | 18px | 400 |
| Body | Plus Jakarta Sans | 14.5px | 400 |
| Eyebrow | JetBrains Mono | 11px | ALL CAPS tracking +22% |

### Buttons
- **Primary:** `--sky` bg → `--leaf` hover, white text, pill radius, 13px semibold
- **Secondary:** 2px solid `--deep` outline → deep fill hover
- **On dark:** white outline → white fill hover

### Motion
- fast: `180ms ease-out`
- base: `320ms cubic-bezier(.6,.05,.2,.95)`

### Elevation
- SM: `0 1px 2px rgba(14,42,74,.08)`
- MD: `0 8px 24px rgba(14,42,74,.10)`
- LG: `0 18px 48px rgba(14,42,74,.16)`

---

## How It Works

`index.html` fetches each HTML fragment from `/sections/` and injects it into placeholder `<div>` elements. After all sections load, calls `initNav()`, `initAnimations()`, `initTestimonials()`, `initContact()`.

**Requires a local HTTP server** — use Live Server, `python -m http.server`, or `npx serve`.

---

## Screenshots System

Screenshots live in `screenshots/` numbered by section:
```
01-nav-desktop.png   02-hero.png     03-stats.png
04-about.png         05-services.png 06-team.png
07-reviews.png       08-contact.png  09-footer.png
mobile-hero.png      mobile-nav.png
```
Take screenshots after running the site and save here. Future Claude sessions read these images directly to catch layout issues or suggest improvements.

---

## Editing Rule

| Want to change... | Edit these files |
|---|---|
| Navigation / logo | `sections/header.html`, `css/header.css` |
| Hero banner | `sections/hero.html`, `css/hero.css` |
| About section | `sections/about.html`, `css/about.css` |
| Services cards | `sections/services.html`, `css/services.css` |
| Team members | `sections/team.html`, `css/team.css` |
| Google reviews | `sections/testimonials.html`, `css/testimonials.css` |
| Booking / contact / footer | `sections/contact.html`, `css/contact.css` |
| GSAP animations | `js/main.js` |
| Nav scroll / mobile menu | `js/nav.js` |
| Colors, fonts, tokens | `css/global.css` |

---

## Clinic Details

- **Name:** Heal Dental Clinic Pvt. Ltd.
- **Phone:** 976-5051614
- **Address:** Tokha Road (Opp. Kumari Bank), Kathmandu 44600
- **Hours:** Every day 8:00 AM – 8:00 PM
- **Google Rating:** 5.0 ★
- **WhatsApp:** https://wa.me/9779765051614

## Local Images
- `logo.jpg` — Brand mark (NOT logo.png)
- `storefront.webp` — Clinic exterior, daylight
- `interior.jpg` — Reception interior
- `staff.webp` — Team at reception desk
