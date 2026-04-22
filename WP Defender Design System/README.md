# WP Defender Design System

A design system extracted from **WPMU DEV's** *Product 2025_26* Figma file, focused on **WP Defender** — their WordPress security plugin (https://wpmudev.com/project/wp-defender/).

**Parent company:** WPMU DEV (https://wpmudev.com/) — a suite of WordPress plugins (Defender, Smush, Hummingbird, SmartCrawl, Forminator, Hustle, Branda…) sold as a single membership.

**Product in scope:** *WP Defender* — security scanning, file integrity, malware detection, firewalls, login protection (2FA / limits / masking), hardening recommendations, audit log, scheduled scans, quarantine, notifications.

## Sources

- **Figma (virtual mount):** `Product 2025_26.fig` — pages:
  - `/Global-UX` — buttons, toggles, inputs, tags, tooltips (global UI kit)
  - `/Defender-Ready-to-developed` — the final Dashboard flows
  - `/Defender6-WIP` — Hardening, Firewalls, Issues, Settings, Login & Access
  - `/Defender-UX-Animation` — scan-in-progress animations
  - `/Defender-Playground` — explorations
  - `/Smush*` — sister product (same design vocabulary, different color)
- **Website:** https://wpmudev.com/
- **Product page:** https://wpmudev.com/project/wp-defender/

## Index (what's in this folder)

| Path | Purpose |
|---|---|
| `README.md` | **this file** — brand, content rules, visual foundations, iconography |
| `colors_and_type.css` | CSS variables for colors, type, radius, shadows, spacing, motion |
| `SKILL.md` | Skill manifest (Claude Code compatible) |
| `assets/` | Defender shield, WPMU DEV wordmark, generic icons (Lucide-matched) |
| `preview/` | Design System tab cards — colors, type, components |
| `ui_kits/defender/` | Hi-fi React recreation of the WP Defender plugin UI |

## Content fundamentals

**Voice.** Utility-first, WordPress-practitioner voice. Direct, imperative, technical-but-not-jargony. Feels like docs written by someone who runs WordPress sites for a living.

- **Second person ("you", "your site")** when addressing the user.
- **Imperative** for actions: "Scan site", "Run scan", "Activate", "Quarantine file", "Ignore", "Revert", "Update".
- **Sentence case** for buttons and labels; **Title Case** reserved for proper nouns / product names ("Defender", "WPMU DEV", "Pro").
- **No emoji** — their design language does not use them; icons do the work.
- **No exclamation points**, no marketing fluff inside the plugin UI. The marketing site on wpmudev.com is more effusive but the product itself is steady.
- Numbers and thresholds speak loudly: "**9** known vulnerabilities", "**Last scanned** 2 hours ago", "**1m ago**".
- **Time/relative-ago** in short form: `1m ago`, `2h ago`, `Last scanned 12:04 PM`.
- **Status words** are short and absolute: *Enabled / Disabled*, *On / Off*, *Active*, *Ignored*, *Quarantined*, *Resolved*, *Required*.
- **Pro teasing** uses a plain "Pro" tag — purple gradient capsule. No "Upgrade to unlock ✨" — just a locked row with a Pro tag.
- Copy examples lifted from the Figma:
  - "Welcome to Defender"
  - "Security actions required"
  - "Activity log"
  - "Suspicious"
  - "Known vulnerability"
  - "Last scanned"
  - "Scan site"
  - "Quarantine / Ignore / Revert"

## Visual foundations

**Overall vibe.** *WordPress admin, upgraded.* The plugin lives inside the WP admin shell (black chrome + left sidebar), so the product consciously inherits those neutrals and then applies a cleaner, softer surface on top.

- **Canvas.** `#F8F8F8` (ink-50) workspace with a `25px` border-radius wrapper — feels like a tray floating inside WP. Surfaces sit on `white`.
- **Chrome.** Solid black (`#000`) for the plugin sub-nav; near-black `#222` for the WP top bar. Active sub-nav item uses an **indigo** accent (`rgb(71,99,228)`) — that's the WordPress-admin blue, NOT the Pro purple.
- **Pro / premium.** A single purple `rgb(87,30,231)` — radial gradient capsule with a `rgba(87,30,231,0.2)` border. Used ONLY on the "Pro" tag and pro-locked rows. Don't sprinkle purple elsewhere.
- **Type.** Roboto everywhere (14/22 body), with **Roboto Mono** for counts, scan logs, and big display numbers (a very distinctive move — large mono numerals for scan progress / counts). No serifs.
- **Backgrounds.** Never illustrations, never photography inside the plugin. Just solid ink neutrals + the single cream-yellow "note paper" swatch (`#FFFDC1`) used for scan-log / callout cards, and a deep cream-brown `#4A1300` bubble for premium-tease bubbles.
- **Borders.** `1px solid rgb(230,230,230)` is the universal divider. Inputs use `1px solid rgba(26,26,26,0.15)` for a softer edge.
- **Corners.** 2-tier: `10px` for buttons & inputs, `20–25px` for cards and workspace wrappers. Toggles / tags / avatars are fully round (`1020px` pill or `100%`).
- **Shadows.** Very restrained. `0 0 4px 0 rgba(0,0,0,0.1)` is the one you'll see most — a soft ambient halo on note-paper cards and bubbles. No big drop shadows. No inner shadows. No glow.
- **Gradients.** Only two: (a) the Pro purple radial on the Pro tag, (b) a very subtle `rgb(188,188,188) → rgb(163,163,163)` on small product-icon tiles in notifications. Do NOT invent new gradients.
- **Transparency & blur.** `backdrop-filter: blur(10px)` on floating note-paper cards and bubbles, paired with warm opaque fills. Otherwise opaque.
- **Layout.** Fixed-width product at 1800px inside a 2000px stage; a 160px black sidebar + 340px right rail ("What's New") + 1300px main content. 30–60px outer padding. Very grid-disciplined, no overlapping.
- **Cards.** White, `20px` radius, `1px` light grey border, no shadow. Titles in 18px Roboto (non-bold), body in 14px. Internal padding 15–20px.
- **Buttons.**
  - Solid (B) — `#1A1A1A` fill, white text, 10px radius, 18px Roboto (large) or 14px (small). Height 40px (L) / 30px (S).
  - Line (B) — transparent, `1px rgba(26,26,26,0.15)` border, 14px Roboto 500.
  - Text (B) — no bg, no border, black text, underline on hover.
  - Solid (Red) — `#D70015` fill for destructive.
  - Glass (B) — translucent dark for use on warm/tinted backgrounds.
- **Hover.** Default is a shade darker (e.g. white → `#F8F8F8`; or solid black → slightly lighter grey). Circle nav buttons go from transparent → `#F8F8F8` pill. Never scale, never glow.
- **Press.** No shrink. Color darkens one step.
- **Toggles.** 40×20 pill. ON = `rgb(0,228,72)` (a very saturated pure green). OFF = `rgb(204,204,204)` grey. White knob, 16×16, 2px offset.
- **Tooltip.** Black `#1A1A1A` bubble, 15px radius, little pointer triangle, 11px white text.
- **Tags.** 18px tall pill at `1020px` radius. "Pro" = purple gradient; generic = black fill; status tags use semantic color at 10–20% opacity fill + full-color text.
- **Animation.** Subtle, fast (120–200ms), std-easing. Scan-in-progress pages use rotating ring loaders (see `/Defender-UX-Animation`) — no bouncing, no springs. The plugin animates state, not personality.

## Iconography

**Primary system:** WPMU DEV's own `dev-ui-icon` font (1300+ usages) plus SVG glyphs for the Defender shield and product logos. I don't have access to the font file, so icons in this kit are **Lucide-matched SVG substitutes** (same stroke weight, same metaphor) stored in `assets/icons/` — `shield-check`, `warning-triangle`, `lock`, `firewall`, `scan`, `dashboard`, `info-circle`, `caret-down`, `arrow-right`, `check`, `user`, `bell`, `clock`, `activity`, `settings-cog`. The **Defender shield** (`assets/defender-shield.svg`) and **WPMU DEV wordmark** (`assets/wpmudev-logo.svg`) are copied 1:1 from the Figma.

- Size tokens: `12px`, `14px`, `16px` (dominant), `18px`, `20px`, `24px`.
- Stroke: 2px, round caps.
- Fill: inherits `color:` — icons are currentColor-driven.
- Emoji: **not used**.
- Unicode glyphs: the Figma uses a couple of SF Symbols private-area glyphs (e.g. `􀈐`) on iOS-style mocks — ignore these in web.

> **⚠️ Substitution flag:** I substituted Lucide SVGs for WPMU DEV's proprietary `dev-ui-icon` / `dev-ui-icon-sandbox` / `wpmudev-plugin-icons` fonts. If you have the icon font TTF/WOFF, drop it in `fonts/` and I'll rewire.

## Known gaps / asks

1. **Icon font files** — I don't have `dev-ui-icon.woff`. Lucide substitutes are close, not pixel-perfect.
2. **Large binary screenshots** (e.g. `60e41ce599f1.jpg` 8.5MB) weren't copied — they look like reference photography that isn't used inside the plugin UI itself.
3. **Roboto font files** — using Google Fonts CDN (matches the Figma spec exactly).
