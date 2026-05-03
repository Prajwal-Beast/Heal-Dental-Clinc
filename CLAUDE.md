# Heal Dental Clinic — Project Guide

- **Project:** Heal Dental Clinic Website
- **Live URL:** https://prajwal-beast.github.io/Heal-Dental-Clinc/
- **Stack:** Plain HTML, CSS, JavaScript (no frameworks, no build tools)

## File Structure

```
/
├── index.html              ← Thin shell: loads CSS, JS, injects sections via fetch
├── CLAUDE.md
├── css/
│   ├── global.css          ← Tokens, reset, utility classes, all media queries
│   ├── header.css          ← Nav + mobile nav
│   ├── hero.css            ← Hero, floating teeth, sparkles, stat bar, buttons
│   ├── about.css           ← Philosophy section + image grid + gallery
│   ├── services.css        ← Service cards grid
│   ├── team.css            ← Team cards
│   ├── testimonials.css    ← Google reviews section
│   └── contact.css         ← Booking form, contact info, map, footer
├── js/
│   ├── main.js             ← Section loader, GSAP animations, scroll reveals, counters
│   ├── nav.js              ← Nav scroll + mobile nav toggle (defines closeMob globally)
│   ├── testimonials.js     ← Review star entrance animations
│   └── contact.js          ← Booking form submit handler
└── sections/
    ├── header.html         ← Mobile nav overlay + main nav
    ├── hero.html           ← Hero + floating teeth + sparkles + stat bar
    ├── about.html          ← Philosophy + image feature + gallery
    ├── services.html       ← Services grid (6 cards)
    ├── team.html           ← Team cards (3 members)
    ├── testimonials.html   ← Google reviews (6 cards + rating badge)
    └── contact.html        ← Booking form + Google calendar + contact + map + footer
```

## How It Works

`index.html` fetches each HTML fragment from `/sections/` and injects it into its placeholder `<div>`. After all sections are injected, it calls `initNav()`, `initAnimations()`, `initTestimonials()`, and `initContact()`.

## Editing Rule

**When asked to change something, only read and edit the specific file for that section.**

| Want to change...          | Edit these files                  |
|----------------------------|-----------------------------------|
| Navigation / logo          | `sections/header.html`, `css/header.css` |
| Hero banner or heading     | `sections/hero.html`, `css/hero.css` |
| Philosophy / gallery       | `sections/about.html`, `css/about.css` |
| Services cards             | `sections/services.html`, `css/services.css` |
| Team members               | `sections/team.html`, `css/team.css` |
| Google reviews             | `sections/testimonials.html`, `css/testimonials.css` |
| Booking / contact / footer | `sections/contact.html`, `css/contact.css` |
| GSAP animations            | `js/main.js` |
| Nav scroll / mobile menu   | `js/nav.js` |
| Colours, fonts, tokens     | `css/global.css` |

## Key Details

- Phone: 976-5051614
- Address: Tokha Road (Opp. Kumari Bank), Kathmandu 44600
- Hours: Every day 8:00 AM – 8:00 PM
- Google rating: 5.0 ★
- Logo file: `logo.jpg` (not logo.png)
- Local images: `storefront.webp`, `interior.jpg`, `staff.webp`, `logo.jpg`
- All other photos are Unsplash URLs embedded directly in HTML
