import { Outlet } from "react-router-dom";

export default function MainContent() {
  return (
    <main className="flex-1 min-h-screen bg-background py-10 px-12 overflow-y-auto">
      <Outlet />
    </main>
  );
}
