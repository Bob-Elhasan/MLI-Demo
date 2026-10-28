# MLI Digital Ecosystem

Demo build for Misr Life Insurance by Lynkrs: the main website, the MLI Connect landing page, and the MLI Connect app rendered in a phone frame. Everything behind the UI is mocked.

Brief: `CLAUDE.md`. Plan and status: `docs/PLAN.md`.

## Run It

```bash
npm install
npm run dev        # http://localhost:3000
```

- `/` main website (skeleton)
- `/connect` MLI Connect landing page (skeleton)
- `/app` MLI Connect demo, with presenter controls beside the phone on a laptop

The ID scan and selfie use the webcam. Without one, every camera step offers a sample image so the demo never dead-ends.

## Build

```bash
npm run build      # static export to out/
```

Pushing to `main` deploys to GitHub Pages under `/MLI-Demo/`. The previous single-file prototype stays at `legacy/index.html` and is published at `/MLI-Demo/legacy/`.
