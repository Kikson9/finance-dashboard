import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function Layout() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <MainContent />
    </div>
  );
}
