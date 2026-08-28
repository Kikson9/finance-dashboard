import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import BottomNav from "./BottomNav";

export default function Layout() {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <MainContent />
      <BottomNav />
    </div>
  );
}
