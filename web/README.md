# Imperium Adventures — web

Next.js site for **Imperium Adventures LLC**: a public playground for experiments and a client-facing showcase of web craft.

## Develop

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Vercel root directory should be `web`. Production and preview deploy from this app.

## Structure

- `/` — brand hero, atelier teaser, playground preview, craft, hire CTA
- `/atelier` — private Three.js cabinet (live studies, filters, commission)
- `/atelier/[slug]` — a single study with finishes
- `/crm` — custom CRM builds showcase (Finti Sales OS)
- `/crm/[pillar]` — detailed Find / Close / Grow / Win feature pages
- `/playground` — experiment index
- `/playground/[slug]` — interactive labs (wordmark, compass, mist, typeforge)
