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

  http.post("/api/budgets", async ({ request }) => {
    const body = await request.json();

    const newBudget = {
      id: `bud_${Date.now()}`,
      categoryId: body.categoryId,
      limit: Number(body.limit),
      period: "monthly",
    };

    budgets.push(newBudget);

    const category = categories.find((c) => c.id === newBudget.categoryId);
    return HttpResponse.json(
      {
        data: { ...newBudget, category, spent: 0, remaining: newBudget.limit },
      },
      { status: 201 },
    );
  }),

  http.put("/api/budgets/:id", async ({ request, params }) => {
    const body = await request.json();
    const index = budgets.findIndex((b) => b.id === params.id);

    if (index === -1) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }

    budgets[index] = { ...budgets[index], limit: Number(body.limit) };

    const category = categories.find((c) => c.id === budgets[index].categoryId);
    return HttpResponse.json({ data: { ...budgets[index], category } });
  }),

  http.delete("/api/budgets/:id", ({ params }) => {
    const index = budgets.findIndex((b) => b.id === params.id);

    if (index === -1) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }

    budgets.splice(index, 1);
    return HttpResponse.json({ data: null }, { status: 200 });
  }),
];
