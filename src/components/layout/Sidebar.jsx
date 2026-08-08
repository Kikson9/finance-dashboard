import React, { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Overview");
  return (
    <aside className="w-[240px] min-h-screen bg-surface border-r flex flex-col py-6 px-4">
      {/* Logo */}
      <div className="mb-8 pl-2">
        <span className="font-bold text-lg text-accent">Finna</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1">
        {["Overview", "Transactions", "Budgets", "Goals"].map((item) => (
          <div
            className={`py-2 px-3 rounded-md text-sm font-medium cursor-pointer ${
              item === activeItem
                ? "text-primary border-l-[3px] border-accent bg-accent-subtle"
                : "text-secondary border-l-[3px] border-transparent hover:bg-accent-subtle hover:text-primary"
            }`}
            key={item}
            onClick={() => setActiveItem(item)}
          >
            {item}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="py-2 px-3 rounded-md text-sm font-medium cursor-pointer bg-transparent text-secondary border-l-[3px] border-transparent">
        Settings
      </div>
    </aside>
  );
}
