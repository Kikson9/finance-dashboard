# Design System

## Product Principle

Help someone feel more in control of their money.
70% personal companion, 30% professional tool.

## Color Tokens

| Token                     | Value     | Usage                            |
| ------------------------- | --------- | -------------------------------- |
| `--color-accent`          | `#2d6a4f` | Buttons, active nav, chart fills |
| `--color-accent-subtle`   | `#eaf2ed` | Hover backgrounds, selected rows |
| `--color-accent-dark`     | `#1e4a37` | High contrast accent text        |
| `--color-background`      | `#f8f6f1` | Page background — warm off-white |
| `--color-surface`         | `#ffffff` | Card backgrounds                 |
| `--color-border`          | `#e4e0d8` | Card edges, dividers             |
| `--color-text-primary`    | `#1a1a1a` | Headings, numbers                |
| `--color-text-secondary`  | `#6b6863` | Labels, supporting text          |
| `--color-text-muted`      | `#a09d99` | Placeholders, disabled states    |
| `--color-positive`        | `#3a7d5c` | Up deltas, income                |
| `--color-negative`        | `#c0392b` | Down deltas, expenses            |
| `--color-positive-subtle` | `#edf5f0` | Positive backgrounds             |
| `--color-negative-subtle` | `#fdf0ee` | Negative backgrounds             |

## Typography

**Font:** Plus Jakarta Sans Variable

| Role    | Size     | Weight | Notes                                       |
| ------- | -------- | ------ | ------------------------------------------- |
| Hero    | 2.75rem  | 700    | Balance number, tracking -0.02em            |
| Heading | 1rem     | 600    | Section titles, tracking -0.01em            |
| Label   | 0.75rem  | 500    | Metric names, tracking 0.01em, no uppercase |
| Body    | 0.875rem | 400    | Transactions, line-height 1.6               |
| Delta   | 0.875rem | 600    | Change indicators                           |

## Component Rules

- **Border radius:** 8px cards, 6px buttons and inputs
- **Borders:** 1px solid `--color-border`
- **Shadows:** None on cards — structure comes from spacing and borders
- **Hover states:** `--color-accent-subtle` background shift
- **Shadows allowed:** Dropdowns and modals only

## Layout Hierarchy

Good morning, Alex

$2,450.80 ↑ $320 this month
Available balance

[Income] [Expenses] [Savings Rate]

[Spending trends]
[Budget progress]
[Recent transactions]

## What to Avoid

- Gradients
- Glassmorphism
- Excessive shadows
- Rounded pill shapes everywhere
- Generic purple/blue SaaS aesthetics
- Uppercase labels
