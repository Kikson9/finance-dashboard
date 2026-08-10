import { http, HttpResponse } from "msw";
import { budgets, transactions, categories } from "../db.js";

export const budgetHandlers = [
  http.get("/api/budgets", () => {
    // Enrich each budget with current month's spending
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const enriched = budgets.map((budget) => {
      const spent = transactions
        .filter(
          (t) =>
            t.categoryId === budget.categoryId &&
            t.type === "expense" &&
            t.date.startsWith(currentMonth),
        )
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const category = categories.find((c) => c.id === budget.categoryId);

      return {
        ...budget,
        spent: Math.round(spent * 100) / 100,
        remaining: Math.round((budget.limit - spent) * 100) / 100,
        category,
      };
    });

    return HttpResponse.json({ data: enriched });
  }),
];
