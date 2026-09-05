# Finna

A personal finance dashboard for students and young professionals to track spending, set budgets, and stay on top of savings goals.

**[Live demo →](https://usefinna.vercel.app/)**

![Finna overview screenshot](./docs/overview-screenshot.png)

## Overview

Built to practice real product thinking: picking a differentiator, designing before touching code, and shipping a working demo end to end.

Data comes from a mock API layer (MSW), swappable for a real backend without touching any component code.

## Key features

### Financial health score

A single score built from savings rate, budget adherence, and goal progress. Missing data, like no budgets set up yet, shifts the weighting instead of tanking the score.

### Recurring bill detection

Scans transaction history for patterns, rent, subscriptions, memberships, and flags them automatically. Shows up as a card on Overview and a badge on matching transactions.

### Savings goal simulator

Projects when you'll hit a savings goal based on your current monthly savings, so "save $5,000 by December" turns into something you can actually plan around.

### Also included

- Full budget and goal management: add, edit, delete
- Transaction filtering by month and type
- Responsive layout that adapts from mobile to desktop

## Tech stack

- **React** + **Vite**
- **Tailwind CSS v4**
- **Shadcn UI** (Radix primitives)
- **React Router**
- **TanStack Query**
- **Mock Service Worker (MSW)**
- **Recharts**

## Technical highlights

**Swappable mock API layer.** Every request runs through MSW behind TanStack Query hooks. Components don't know or care if the data's mocked or live, the backend could be swapped in without touching a single component.

**Null-safe scoring logic.** The health score treats "no income yet" and "0% savings rate" as different states. Missing data gets excluded from the weighted average instead of dragging the score down.

**Loading skeletons that mirror real layout.** Each page's skeleton matches its actual grid and content shape, not a generic spinner, and stays in sync across responsive breakpoints so nothing visually jumps when real data loads in.

## Getting started

Clone the repo and install dependencies:

\`\`\`bash
git clone https://github.com/kikson9/finance-dashboard.git
cd finance-dashboard
npm install
\`\`\`

Run the dev server:

\`\`\`bash
npm run dev
\`\`\`

The app runs at `http://localhost:5173`. No environment variables or backend setup required, all data is mocked.
