import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Wallet, Target } from "lucide-react";

const navItems = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { label: "Transactions", path: "/transactions", icon: ArrowLeftRight },
  { label: "Budgets", path: "/budgets", icon: Wallet },
  { label: "Goals", path: "/goals", icon: Target },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-surface border-t border-border flex justify-around items-center h-14 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full no-underline ${
              isActive ? "text-accent" : "text-muted-text"
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span
              className={`text-[0.62rem] ${isActive ? "font-semibold" : "font-medium"}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
