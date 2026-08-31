import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const navItems = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { label: "Transactions", path: "/transactions", icon: ArrowLeftRight },
  { label: "Budgets", path: "/budgets", icon: Wallet },
  { label: "Goals", path: "/goals", icon: Target },
];

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem("sidebarCollapsed") === "true",
  );

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isCollapsed);
  }, [isCollapsed]);

  return (
    <aside
      className={`hidden md:flex md:flex-col min-h-screen bg-surface border-r py-6 transition-all duration-200 ${
        isCollapsed ? "w-[72px] px-2" : "w-[240px] px-4"
      }`}
    >
      {/* Logo + toggle */}
      <div
        className={`mb-8 flex items-center ${
          isCollapsed ? "flex-col gap-3" : "justify-between pl-2"
        }`}
      >
        <span className="font-bold text-lg text-accent">
          {isCollapsed ? "F" : "Finna"}
        </span>
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="text-muted-text hover:text-primary border border-border rounded-md w-6 h-6 flex items-center justify-center flex-shrink-0"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          const linkContent = (
            <Link
              to={item.path}
              className={`flex items-center gap-3 py-2 rounded-md text-sm font-medium cursor-pointer no-underline border-l-[3px] ${
                isCollapsed ? "justify-center px-0" : "px-3"
              } ${
                isActive
                  ? "text-primary border-accent bg-accent-subtle"
                  : "text-secondary border-transparent hover:bg-accent-subtle hover:text-primary"
              }`}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );

          if (isCollapsed) {
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.label}>{linkContent}</div>;
        })}
      </nav>
    </aside>
  );
}
