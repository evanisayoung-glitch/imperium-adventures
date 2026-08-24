# Imperium Adventures — web

Next.js site for **Imperium Adventures LLC**: a studio for commissioned websites, with a cabinet of live studies and a private lab.

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

- `/` — void hero with a live study, three offers, inquire close
- `/yours` — type a brand word, pick a first-screen atmosphere, see what ships
- `/engage` — process, $5k / $18k / $50k investment, CRM as an Estate add-on
- `/inquire` — brief form (prefill `?study=` `?band=` `?word=` `?need=`)
- `/atelier` — private Three.js cabinet (live studies, filters)
- `/atelier/[slug]` — a single study with finishes
- `/crm` — custom CRM builds showcase (Finti Sales OS)
- `/crm/[pillar]` — detailed Find / Close / Grow / Win feature pages
- `/playground` — private lab index
- `/playground/[slug]` — interactive labs (wordmark, compass, mist, typeforge)
