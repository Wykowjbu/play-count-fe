# PlayCourt FE Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the PlayCourt FE from C# Razor Pages to React + Vite + Tailwind CSS v4, keeping the same UI and using mock data.

**Architecture:** React SPA with React Router v6. Layout-based architecture (Public, Auth, Business, PlayerProfile) mirroring C# structure. Centralized mock service layer for data.

**Tech Stack:** React 18, Vite, Tailwind CSS v4, React Router v6, Lucide React, Google Material Symbols.

---

### Task 1: Setup Theme & Dependencies

**Files:**
- Modify: `package.json`
- Modify: `src/index.css`
- Modify: `vite.config.js`

- [ ] **Step 1: Install necessary dependencies**
Run: `pnpm add react-router-dom lucide-react`
Run: `pnpm add -D @tailwindcss/vite`

- [ ] **Step 2: Configure Tailwind v4 Theme**
Update `src/index.css` with the theme colors and fonts from the C# project.
```css
@import "tailwindcss";

@theme {
  --color-primary: #22c55e;
  --color-background-light: #f8fafc;
  --color-background-dark: #0f172a;
  --font-display: Lexend, sans-serif;
}

@layer base {
  body {
    font-family: 'Lexend', sans-serif;
  }
}
```

- [ ] **Step 3: Setup Google Material Symbols**
Add link tag to `index.html`: `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />`

- [ ] **Step 4: Commit**

---

### Task 2: Build Mock Data & Service Layer

**Files:**
- Create: `src/services/mock/data/venues.json`
- Create: `src/services/mock/data/matches.json`
- Create: `src/services/mock/data/auth.json`
- Create: `src/services/mock/venueService.js`
- Create: `src/services/mock/authService.js`

- [ ] **Step 1: Create mock JSON data**
Based on `Index.cshtml.cs` and `PlayCourtDbContext.cs`, create data for venues (name, rating, price, image) and matches (title, sport, time).

- [ ] **Step 2: Implement Mock Services**
Create `venueService.js` with `getRecommendedVenues()`, `getVenueDetails(id)`, and `getLiveMatches()`.

- [ ] **Step 3: Commit**

---

### Task 3: Implement Layouts & Base Routing

**Files:**
- Create: `src/layouts/PublicLayout.jsx`
- Create: `src/layouts/AuthLayout.jsx`
- Create: `src/layouts/BusinessLayout.jsx`
- Create: `src/App.jsx`

- [ ] **Step 1: Implement PublicLayout**
Mirror `PublicLayout.cshtml`. Include the Navbar with "Find Courts", "Join Matches", etc.

- [ ] **Step 2: Setup React Router in App.jsx**
Define routes: `/`, `/login`, `/venues/:id`, `/matches`, `/business/revenue`.

- [ ] **Step 3: Commit**

---

### Task 4: Migrate Home Page (Index.cshtml)

**Files:**
- Create: `src/pages/Home.jsx`

- [ ] **Step 1: Convert Hero Section & Search Form**
Migrate the search form (Pickleball, Tennis selection) and the Hero image section.

- [ ] **Step 2: Convert Recommended Venues & Live Matches**
Map through `venueService` data to render venue cards and match cards exactly as in `Index.cshtml`.

- [ ] **Step 3: Commit**

---

### Task 5: Migrate Venue Details Page

**Files:**
- Create: `src/pages/Venues/VenueDetails.jsx`

- [ ] **Step 1: Implement Image Gallery & About Section**
Mirror the grid of 4 images and the description section from `Details.cshtml`.

- [ ] **Step 2: Implement Booking Sidebar**
Migrate the date picker, court selection buttons, and the time slot list.

- [ ] **Step 3: Commit**

---

### Task 6: Migrate Auth & Business Pages

**Files:**
- Create: `src/pages/Auth/Login.jsx`
- Create: `src/pages/Business/Revenue.jsx`

- [ ] **Step 1: Migrate Login Form**
Mirror the design of `Login.cshtml` using `AuthLayout`.

- [ ] **Step 2: Migrate Revenue Dashboard**
Implement the stats cards (Total Revenue, Avg Daily Income) and the SVG-based chart from `Revenue.cshtml`.

- [ ] **Step 3: Commit**

---

### Task 7: Final Verification

- [ ] **Step 1: Test all navigation links**
- [ ] **Step 2: Verify responsive design on mobile/desktop**
- [ ] **Step 3: Run production build**
Run: `pnpm build`
Expected: Build succeeds without errors.
