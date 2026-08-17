import { http, HttpResponse } from "msw";
import { goals } from "../db.js";

function enrich(goal) {
  return {
    ...goal,
    percentComplete: Math.round((goal.currentAmount / goal.targetAmount) * 100),
    remaining: goal.targetAmount - goal.currentAmount,
  };
}

export const goalHandlers = [
  http.get("/api/goals", () => {
    return HttpResponse.json({ data: goals.map(enrich) });
  }),

  http.post("/api/goals", async ({ request }) => {
    const body = await request.json();
    const newGoal = {
      id: `goal_${Date.now()}`,
      name: body.name,
      targetAmount: Number(body.targetAmount),
      currentAmount: Number(body.currentAmount ?? 0),
      deadline: body.deadline,
      icon: body.icon ?? "target",
    };
    goals.push(newGoal);
    return HttpResponse.json({ data: enrich(newGoal) }, { status: 201 });
  }),

  http.put("/api/goals/:id", async ({ request, params }) => {
    const body = await request.json();
    const index = goals.findIndex((g) => g.id === params.id);
    if (index === -1) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    goals[index] = {
      ...goals[index],
      name: body.name,
      targetAmount: Number(body.targetAmount),
      currentAmount: Number(body.currentAmount),
      deadline: body.deadline,
    };
    return HttpResponse.json({ data: enrich(goals[index]) });
  }),

  http.delete("/api/goals/:id", ({ params }) => {
    const index = goals.findIndex((g) => g.id === params.id);
    if (index === -1) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    goals.splice(index, 1);
    return HttpResponse.json({ data: null }, { status: 200 });
  }),
];
