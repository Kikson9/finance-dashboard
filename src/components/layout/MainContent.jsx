import { Outlet } from "react-router-dom";

export default function MainContent() {
  return (
    <main className="flex-1 min-h-screen bg-background py-6 px-4 pb-20 md:py-10 md:px-12 md:pb-10 overflow-y-auto">
      <Outlet />
    </main>
  );
}
