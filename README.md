# The MET — Metropolitan Museum of Art Explorer

A Next.js web application for browsing and searching artwork from the [Metropolitan Museum of Art Collection API](https://metmuseum.github.io/), with user authentication, favourites, and search history powered by a custom REST API.

![Homepage](documentation/image/homepage.png)

## Features

### Browsing & Search
- **Home page** — Hero banner introduction with a link to the full collection.
- **Quick search** — Search artwork by title directly from the navigation bar; saved to search history when logged in.
- **Advanced search** — Filter artwork by title, tags, geographic location, medium, on-view status, and highlight status; also saved to search history when logged in.
- **Artwork gallery** — Paginated grid of results (12 per page) fetched from the Met Collection API.
- **Artwork detail page** — Full details for a single artwork: image, artist, date, classification, medium, credit line, and dimensions, with a link to the artist's Wikidata page.

### Authentication & User Features
- **Register / Login** — JWT-based authentication backed by a custom Express API (hosted on Vercel).
- **Favourites** — Add or remove artworks from a personal favourites list, persisted to the backend.
- **Search history** — Every quick and advanced search is recorded and viewable on the History page.
- **Route guard** — `/favourites` and `/history` redirect unauthenticated users to the login page.
- **Sign-in alert** — Attempting to favourite an artwork while logged out shows an inline alert.

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | React framework (Pages Router) |
| [React 19](https://react.dev) | UI library |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [shadcn/ui](https://ui.shadcn.com) | UI component primitives (Radix UI) |
| [SWR](https://swr.vercel.app) | Data fetching and caching |
| [Jotai](https://jotai.org) | Global client state (favourites, history, alerts) |
| [React Hook Form](https://react-hook-form.com) | Form handling and validation |
| [jwt-decode](https://github.com/auth0/jwt-decode) | Decoding JWT tokens client-side |
| [react-icons](https://react-icons.github.io/react-icons/) | Hamburger / close icons in mobile nav |
| [Met Collection API](https://metmuseum.github.io/) | Artwork data source |

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root and set the API URL, You can find the backend at [Express_Backend_Museum](https://github.com/Yuhan-Zhao-Aiden/Express_Backend_Museum)

```env
NEXT_PUBLIC_API_URL=<your-backend-url>
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
pages/
  index.jsx             # Home page
  search.jsx            # Advanced search form
  login.jsx             # Login page
  register.jsx          # Registration page
  favourites.jsx        # Saved favourites (protected)
  history.jsx           # Search history (protected)
  artwork/
    index.jsx           # Paginated artwork results grid
    [objectId].jsx      # Individual artwork detail page
components/
  Hero.jsx              # Hero image banner
  MainNav.jsx           # Top navigation with quick search and auth-aware links
  NavLink.jsx           # Active-aware navigation link
  UserNav.jsx           # Dropdown menu for logged-in users
  RouteGuard.jsx        # Redirects unauthenticated users from protected routes
  SigninAlert.jsx       # Alert banner for unauthenticated actions
  ArtworkCard.jsx       # Artwork thumbnail card
  ArtworkCardDetail.jsx # Full artwork detail card with favourite toggle
  ArtworkPagination.jsx # Pagination controls
  ui/                   # shadcn/ui components
lib/
  authenticate.js       # JWT helpers and auth API calls (register, login)
  userData.js           # User data API calls (favourites, history)
store.js                # Jotai atoms for global state
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

