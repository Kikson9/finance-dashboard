// src/mocks/handlers/goals.js
import { http, HttpResponse } from "msw";
import { goals } from "../db.js";

export const goalHandlers = [
  http.get("/api/goals", () => {
    const enriched = goals.map((goal) => ({
      ...goal,
      percentComplete: Math.round(
        (goal.currentAmount / goal.targetAmount) * 100,
      ),
      remaining: goal.targetAmount - goal.currentAmount,
    }));
    return HttpResponse.json({ data: enriched });
  }),
];
