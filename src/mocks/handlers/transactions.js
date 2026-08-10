import { http, HttpResponse } from "msw";
import { transactions, categories } from "../db.js";

export const transactionHandlers = [
  http.get("/api/transactions", ({ request }) => {
    const url = new URL(request.url);
    const month = url.searchParams.get("month"); // e.g. "2026-08"
    const limit = url.searchParams.get("limit");

    let result = [...transactions];

    if (month) {
      result = result.filter((t) => t.date.startsWith(month));
    }

    if (limit) {
      result = result.slice(0, parseInt(limit));
    }

    // Sort newest first
    result.sort((a, b) => new Date(b.date) - new Date(a.date));

    return HttpResponse.json({
      data: result,
      total: result.length,
    });
  }),

  http.get("/api/transactions/:id", ({ params }) => {
    const txn = transactions.find((t) => t.id === params.id);
    if (!txn) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    return HttpResponse.json({ data: txn });
  }),

  http.get("/api/categories", () => {
    return HttpResponse.json({ data: categories });
  }),
];
