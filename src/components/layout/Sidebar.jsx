import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Overview", path: "/" },
  { label: "Transactions", path: "/transactions" },
  { label: "Budgets", path: "/budgets" },
  { label: "Goals", path: "/goals" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-[240px] min-h-screen bg-surface border-r flex flex-col py-6 px-4">
      {/* Logo */}
      <div className="mb-8 pl-2">
        <span className="font-bold text-lg text-accent">Finna</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`py-2 px-3 rounded-md text-sm font-medium cursor-pointer no-underline border-l-[3px] ${
                isActive
                  ? "text-primary border-accent bg-accent-subtle"
                  : "text-secondary border-transparent hover:bg-accent-subtle hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="py-2 px-3 rounded-md text-sm font-medium cursor-pointer text-secondary border-l-[3px] border-transparent hover:bg-accent-subtle hover:text-primary">
        Settings
      </div>
    </aside>
  );
}
