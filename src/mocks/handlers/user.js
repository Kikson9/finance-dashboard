import { http, HttpResponse } from "msw";
import { user } from "../db.js";

export const userHandlers = [
  http.get("/api/user", () => {
    return HttpResponse.json({ data: user });
  }),
];
