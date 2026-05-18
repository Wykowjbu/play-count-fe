# Build Mock Data & Service Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a robust mock data and service layer for the PlayCourt FE migration, mimicking the C# Backend logic.

**Architecture:** JSON data files acting as a database, and JavaScript service modules providing asynchronous access to this data.

**Tech Stack:** JavaScript (ES6+), JSON, Vitest (for TDD).

---

### Task 2.1: Setup Testing Environment

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`

- [ ] **Step 1: Install Vitest**
Run: `pnpm add -D vitest`

- [ ] **Step 2: Create Vitest config**
Create `vitest.config.js` to handle basic test configuration.

- [ ] **Step 3: Commit**

---

### Task 2.2: Create Mock JSON Data

**Files:**
- Create: `src/services/mock/data/venues.json`
- Create: `src/services/mock/data/matches.json`
- Create: `src/services/mock/data/auth.json`

- [ ] **Step 1: Create venues.json**
Add 6 venues with full schema (name, rating, district, etc.).
- [ ] **Step 2: Create matches.json**
Add 4 matches with full schema (title, sport, spots left, etc.).
- [ ] **Step 3: Create auth.json**
Add player and owner profiles.
- [ ] **Step 4: Commit**

---

### Task 2.3: Implement Venue Service with TDD

**Files:**
- Create: `src/services/mock/venueService.js`
- Create: `src/services/mock/__tests__/venueService.test.js`

- [ ] **Step 1: Write failing tests for venueService**
Test `getRecommendedVenues`, `getVenueDetails`, `getLiveMatches`.
- [ ] **Step 2: Run tests to verify they fail**
Run: `pnpm vitest run src/services/mock/__tests__/venueService.test.js`
Expected: FAIL.
- [ ] **Step 3: Implement venueService.js**
- [ ] **Step 4: Run tests to verify they pass**
Run: `pnpm vitest run src/services/mock/__tests__/venueService.test.js`
Expected: PASS.
- [ ] **Step 5: Commit**

---

### Task 2.4: Implement Auth Service with TDD

**Files:**
- Create: `src/services/mock/authService.js`
- Create: `src/services/mock/__tests__/authService.test.js`

- [ ] **Step 1: Write failing tests for authService**
Test `login`, `logout`, `getCurrentUser`.
- [ ] **Step 2: Run tests to verify they fail**
Run: `pnpm vitest run src/services/mock/__tests__/authService.test.js`
Expected: FAIL.
- [ ] **Step 3: Implement authService.js**
- [ ] **Step 4: Run tests to verify they pass**
Run: `pnpm vitest run src/services/mock/__tests__/authService.test.js`
Expected: PASS.
- [ ] **Step 5: Commit**

---

### Task 2.5: Final Verification & Cleanup

- [ ] **Step 1: Run all tests**
Run: `pnpm vitest run`
- [ ] **Step 2: Commit**
