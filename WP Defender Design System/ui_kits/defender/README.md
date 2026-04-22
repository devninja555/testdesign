# WP Defender UI Kit

Hi-fi recreation of the WP Defender plugin UI — dashboard, issues, firewalls, hardening, settings.

## Files

- `index.html` — interactive click-through demo
- `Shell.jsx` — WP admin chrome (black top-bar, black left sidebar, Defender sub-nav, top toolbar)
- `Dashboard.jsx` — scan status card + issues summary + Pro tease
- `Issues.jsx` — table of detected issues with quarantine / ignore actions
- `Firewalls.jsx` — firewall rules list with toggles
- `Hardening.jsx` — hardening recommendations list
- `Primitives.jsx` — Button, Toggle, Tag, Card, Toolbar (shared atoms)

## Behaviour

- Left sidebar routes between Dashboard / Hardening / Audit Log / Firewalls / Login & Access / Settings.
- "Run scan" cycles the dashboard through: idle → scanning (ring loader) → complete.
- Hardening / firewall rows can be toggled on/off live.
- Issues table lets you quarantine or ignore; rows disappear / move to Ignored tab.

## Design sources

All visuals pulled from `/Defender-Ready-to-developed/Dashboard`, `/Defender6-WIP/Hardening`, `/Defender6-WIP/Firewalls`, `/Defender6-WIP/Issues-Layout---Responsive`, `/Global-UX/UI-components` in the mounted `Product 2025_26.fig`.
