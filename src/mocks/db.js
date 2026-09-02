function relativeDate(monthsAgo, day) {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() - monthsAgo; // 0-indexed
  if (month < 0) {
    month += 12;
    year -= 1;
  }
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function daysFromNow(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const user = {
  id: "user_01",
  name: "Daniel Simon",
  currency: "USD",
  monthlyIncome: 2400,
};

export const accounts = [
  {
    id: "acc_checking",
    name: "Checking",
    type: "checking",
    balance: 1847.52,
    institution: "Chase",
  },
  {
    id: "acc_savings",
    name: "Savings",
    type: "savings",
    balance: 3200.0,
    institution: "Chase",
  },
];

export const categories = [
  { id: "cat_housing", name: "Housing", icon: "home", color: "#4f46e5" },
  { id: "cat_food", name: "Food & Dining", icon: "utensils", color: "#f59e0b" },
  { id: "cat_transport", name: "Transport", icon: "car", color: "#3b82f6" },
  {
    id: "cat_subscriptions",
    name: "Subscriptions",
    icon: "repeat",
    color: "#8b5cf6",
  },
  { id: "cat_shopping", name: "Shopping", icon: "bag", color: "#ec4899" },
  { id: "cat_health", name: "Health", icon: "heart", color: "#10b981" },
  { id: "cat_income", name: "Income", icon: "trending-up", color: "#2d6a4f" },
  { id: "cat_other", name: "Other", icon: "more-horizontal", color: "#6b7280" },
];

export const transactions = [
  // Previous month
  {
    id: "txn_001",
    date: relativeDate(1, 1),
    description: "Monthly Stipend - University Research Lab",
    amount: 1200,
    type: "income",
    categoryId: "cat_income",
    accountId: "acc_checking",
  },
  {
    id: "txn_002",
    date: relativeDate(1, 1),
    description: "Rent",
    amount: -750,
    type: "expense",
    categoryId: "cat_housing",
    accountId: "acc_checking",
  },
  {
    id: "txn_003",
    date: relativeDate(1, 3),
    description: "Whole Foods",
    amount: -67.43,
    type: "expense",
    categoryId: "cat_food",
    accountId: "acc_checking",
  },
  {
    id: "txn_004",
    date: relativeDate(1, 5),
    description: "Spotify",
    amount: -9.99,
    type: "expense",
    categoryId: "cat_subscriptions",
    accountId: "acc_checking",
  },
  {
    id: "txn_005",
    date: relativeDate(1, 7),
    description: "Uber",
    amount: -14.2,
    type: "expense",
    categoryId: "cat_transport",
    accountId: "acc_checking",
  },
  {
    id: "txn_006",
    date: relativeDate(1, 10),
    description: "Chipotle",
    amount: -13.85,
    type: "expense",
    categoryId: "cat_food",
    accountId: "acc_checking",
  },
  {
    id: "txn_007",
    date: relativeDate(1, 12),
    description: "Keychron K2 Keyboard",
    amount: -89.99,
    type: "expense",
    categoryId: "cat_shopping",
    accountId: "acc_checking",
  },
  {
    id: "txn_008",
    date: relativeDate(1, 15),
    description: "Transfer from Linda",
    amount: 300,
    type: "income",
    categoryId: "cat_income",
    accountId: "acc_checking",
  },
  {
    id: "txn_009",
    date: relativeDate(1, 17),
    description: "Netflix",
    amount: -15.49,
    type: "expense",
    categoryId: "cat_subscriptions",
    accountId: "acc_checking",
  },
  {
    id: "txn_010",
    date: relativeDate(1, 19),
    description: "Trader Joe's",
    amount: -54.22,
    type: "expense",
    categoryId: "cat_food",
    accountId: "acc_checking",
  },
  {
    id: "txn_011",
    date: relativeDate(1, 22),
    description: "CVS Pharmacy",
    amount: -23.0,
    type: "expense",
    categoryId: "cat_health",
    accountId: "acc_checking",
  },
  {
    id: "txn_012",
    date: relativeDate(1, 25),
    description: "Apple Developer Program",
    amount: -99.0,
    type: "expense",
    categoryId: "cat_subscriptions",
    accountId: "acc_checking",
  },
  {
    id: "txn_013",
    date: relativeDate(1, 28),
    description: "Metro Card",
    amount: -33.0,
    type: "expense",
    categoryId: "cat_transport",
    accountId: "acc_checking",
  },

  // Current month
  {
    id: "txn_014",
    date: relativeDate(0, 1),
    description: "Monthly Stipend - University Research Lab",
    amount: 1200,
    type: "income",
    categoryId: "cat_income",
    accountId: "acc_checking",
  },
  {
    id: "txn_015",
    date: relativeDate(0, 1),
    description: "Rent",
    amount: -750,
    type: "expense",
    categoryId: "cat_housing",
    accountId: "acc_checking",
  },
  {
    id: "txn_016",
    date: relativeDate(0, 3),
    description: "Spotify",
    amount: -9.99,
    type: "expense",
    categoryId: "cat_subscriptions",
    accountId: "acc_checking",
  },
  {
    id: "txn_017",
    date: relativeDate(0, 4),
    description: "Whole Foods",
    amount: -72.11,
    type: "expense",
    categoryId: "cat_food",
    accountId: "acc_checking",
  },
  {
    id: "txn_018",
    date: relativeDate(0, 6),
    description: "Lyft",
    amount: -18.4,
    type: "expense",
    categoryId: "cat_transport",
    accountId: "acc_checking",
  },
  {
    id: "txn_019",
    date: relativeDate(0, 9),
    description: "Chipotle",
    amount: -12.75,
    type: "expense",
    categoryId: "cat_food",
    accountId: "acc_checking",
  },
  {
    id: "txn_020",
    date: relativeDate(0, 10),
    description: "GitHub Copilot",
    amount: -10.0,
    type: "expense",
    categoryId: "cat_subscriptions",
    accountId: "acc_checking",
  },
  {
    id: "txn_021",
    date: relativeDate(0, 11),
    description: "Vercel Pro",
    amount: -20.0,
    type: "expense",
    categoryId: "cat_subscriptions",
    accountId: "acc_checking",
  },
  {
    id: "txn_022",
    date: relativeDate(0, 11),
    description: "Amazon - USB-C Hub",
    amount: -34.99,
    type: "expense",
    categoryId: "cat_shopping",
    accountId: "acc_checking",
  },
  {
    id: "txn_023",
    date: relativeDate(0, 12),
    description: "Freelance Payment - Logo Design",
    amount: 350,
    type: "income",
    categoryId: "cat_income",
    accountId: "acc_checking",
  },
  {
    id: "txn_024",
    date: relativeDate(0, 12),
    description: "Trader Joe's",
    amount: -61.3,
    type: "expense",
    categoryId: "cat_food",
    accountId: "acc_checking",
  },
  {
    id: "txn_025",
    date: relativeDate(0, 13),
    description: "Metro Card",
    amount: -33.0,
    type: "expense",
    categoryId: "cat_transport",
    accountId: "acc_checking",
  },
  {
    id: "txn_026",
    date: relativeDate(0, 13),
    description: "Netflix",
    amount: -15.49,
    type: "expense",
    categoryId: "cat_subscriptions",
    accountId: "acc_checking",
  },
  {
    id: "txn_027",
    date: relativeDate(0, 14),
    description: "Pharmacy - Cold Medicine",
    amount: -18.75,
    type: "expense",
    categoryId: "cat_health",
    accountId: "acc_checking",
  },
  {
    id: "txn_028",
    date: relativeDate(0, 14),
    description: "McDonald's",
    amount: -16.4,
    type: "expense",
    categoryId: "cat_food",
    accountId: "acc_checking",
  },
  {
    id: "txn_029",
    date: relativeDate(0, 14),
    description: "Uber",
    amount: -11.2,
    type: "expense",
    categoryId: "cat_transport",
    accountId: "acc_checking",
  },
  {
    id: "txn_030",
    date: relativeDate(0, 14),
    description: "Notion Pro",
    amount: -16.0,
    type: "expense",
    categoryId: "cat_subscriptions",
    accountId: "acc_checking",
  },
];

export const budgets = [
  { id: "bud_001", categoryId: "cat_food", limit: 300, period: "monthly" },
  { id: "bud_002", categoryId: "cat_transport", limit: 100, period: "monthly" },
  {
    id: "bud_003",
    categoryId: "cat_subscriptions",
    limit: 50,
    period: "monthly",
  },
  { id: "bud_004", categoryId: "cat_shopping", limit: 150, period: "monthly" },
  { id: "bud_005", categoryId: "cat_health", limit: 75, period: "monthly" },
];

export const goals = [
  {
    id: "goal_001",
    name: "Emergency Fund",
    targetAmount: 5000,
    currentAmount: 3200,
    deadline: daysFromNow(180),
    icon: "shield",
  },
  {
    id: "goal_002",
    name: "New Laptop",
    targetAmount: 1500,
    currentAmount: 620,
    deadline: daysFromNow(20),
    icon: "laptop",
  },
];
