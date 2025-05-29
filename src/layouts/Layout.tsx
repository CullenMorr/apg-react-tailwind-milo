import {useState} from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function Layout({children}: {children: React.ReactNode}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 64 : 288; // Tailwind w-16 = 64px, w-72 = 288px

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        className="transition-all duration-300 min-h-screen bg-gray-50"
        style={{marginLeft: `${sidebarWidth}px`}}
      >
        {children}
      </main>
    </>
  );
}
