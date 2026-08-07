import React, { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Overview");
  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "32px", paddingLeft: "8px" }}>
        <span
          style={{
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "var(--color-accent)",
          }}
        >
          Finna
        </span>
      </div>

      {/* Nav items */}
      <nav
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {["Overview", "Transactions", "Budgets", "Goals"].map((item) => (
          <div
            key={item}
            onClick={() => setActiveItem(item)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "0.875rem",
              fontWeight: 500,
              color:
                item === activeItem
                  ? "var(--color-text-primary)"
                  : "var(--color-text-secondary)",
              borderLeft:
                item === activeItem
                  ? "3px solid var(--color-accent)"
                  : "3px solid transparent",
              backgroundColor:
                item === activeItem
                  ? "var(--color-accent-subtle)"
                  : "transparent",
              cursor: "pointer",
            }}
          >
            {item}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "8px 12px",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "var(--color-text-secondary)",
          cursor: "pointer",
        }}
      >
        Settings
      </div>
    </aside>
  );
}
