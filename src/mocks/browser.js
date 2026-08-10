// src/mocks/browser.js
import { setupWorker } from "msw/browser";
import { transactionHandlers } from "./handlers/transactions.js";
import { budgetHandlers } from "./handlers/budgets.js";
import { goalHandlers } from "./handlers/goals.js";

export const worker = setupWorker(
  ...transactionHandlers,
  ...budgetHandlers,
  ...goalHandlers,
);
