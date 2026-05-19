# Weather App

A React + TypeScript application that shows current weather and a 5-day forecast for any city. Built as a test assignment.

**Live demo:** <https://weather-app-henna-nine-36.vercel.app/>

## Features

- City search with autocomplete and 300ms debounce
- Current weather: temperature, condition, humidity, wind, feels-like
- Forecast with two modes: next 24 hours and 5 days, with a temperature chart
- Favorite cities saved to `localStorage`
- Selected city persisted in the URL (shareable links, survives refresh)
- Loading skeletons, error states with retry, responsive layout

## Tech stack

- **Vite** + **React 19** + **TypeScript**
- **TanStack Query** for data fetching, caching, and request cancellation
- **Recharts** for the forecast temperature chart
- **CSS Modules** + **SCSS** for styling
- **Vitest** + **Testing Library** for unit tests
- **ESLint** + **Prettier** + **Husky** + **lint-staged** for code quality
- **OpenWeather API** as the data source

## Getting started

### Prerequisites

- Node.js 20+
- npm
- An OpenWeather API key — register at <https://openweathermap.org/api> (free tier is enough; the key activates ~10 minutes after registration)

### Setup

```bash
git clone <repo-url>
cd weather-app
npm install
```

Create `.env.local` in the project root:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org
```

### Run

```bash
npm run dev          # start dev server at http://localhost:5173
npm run build        # production build
npm run preview      # preview the production build locally
npm run test         # run tests in watch mode
npm run test:run     # run tests once
npm run lint         # lint
npm run format       # format with Prettier
```

## Project structure

```
src/
  app/                       application shell (layout, providers)
  features/
    weather/                 current weather + forecast (API, hooks, components)
    city-search/             search with autocomplete + reverse geocoding
    favorites/               localStorage-backed favorites
    geolocation/             browser geolocation hook
  shared/
    config/                  env config
    lib/                     api client, hooks, formatters
    styles/                  global SCSS and variables
    ui/                      reusable UI primitives (Spinner, ErrorMessage, Skeleton)
```

Each feature folder is self-contained (`api/`, `hooks/`, `components/`) and exposes a barrel `index.ts`. The `app/` layer composes features; `shared/` holds anything not tied to a specific domain.
