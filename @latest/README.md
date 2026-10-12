# Cineva

A responsive, dark-mode movie and series discovery hub built with React, Vite, Tailwind CSS, Framer Motion, and Lucide.

## Getting started

```bash
npm install
npm run dev
```

Create a production build with `npm run build`; run the project checks with `npm run lint`.

## Features

- Movie and series catalog with trending, top-rated, and genre filters.
- Live title search with selectable suggestions.
- Featured title, YouTube trailer details, cast and production information.
- Personal watchlist saved in browser local storage.
- Random movie roulette and Kyrgyz, Russian, and English interface language.

## Catalog data

The demo catalog lives in `src/data/moviesData.js`. Posters and backdrops use remote image URLs, and trailers are embedded from YouTube. Replace the sample records with data from your preferred movie API to connect a live catalog.
