# efobi.dev

Portfolio and services website for Efobi.

## 🚀 Deployment

Deployed via [Alchemy.run](https://alchemy.run) - auto-deploys on push to `main`.

## 🛠️ Tech Stack

- **Framework:** Astro 5 (SSR mode)
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI + shadcn/ui patterns
- **Content:** Sanity CMS
- **Animations:** Motion (Framer Motion)
- **Hosting:** Cloudflare Pages (via Alchemy.run)

## 📁 Structure

```
/
├── astro/          # Main Astro application
│   ├── src/
│   │   ├── pages/      # Routes
│   │   ├── components/ # React components
│   │   └── styles/     # Global styles
│   └── dist/       # Build output
└── studio/         # Sanity Studio (CMS)
```

## 🧑‍💻 Development

```bash
cd astro
bun install
bun run dev
```

Build:
```bash
bun run build
```

## 🔧 Services

The `/services` page showcases our AI-augmented virtual services:
- Data Entry
- Virtual Assistance  
- Specialized BPO Services

Design follows editorial/magazine aesthetic principles with dramatic typography and asymmetric layouts.

---

Built with care by Jarvis 🧙
