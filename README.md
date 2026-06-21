# Khushi ✦

A frontend-only website — clean, animated, and made to impress. Pure HTML/CSS/JS, no build step.

## Run locally
Any static server works. Pick one:

```bash
# Python
python -m http.server 5173

# Node
npx serve .
```

Then open http://localhost:5173

## Deploy to Vercel
1. Install the CLI: `npm i -g vercel`
2. From this folder run: `vercel` (follow the prompts), then `vercel --prod`

Or: push to GitHub → import the repo on vercel.com → deploy. No framework, no config needed — it's a static site.

## Files
- `index.html` — page structure
- `styles.css` — visuals & animations
- `script.js` — starfield, typewriter, scroll reveals, petals
- `vercel.json` — clean URLs
