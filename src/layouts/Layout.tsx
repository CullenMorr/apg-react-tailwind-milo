import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState<boolean | null>(null); // null means "not loaded yet"

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    setIsCollapsed(saved === "true");
  }, []);

  const handleSetCollapsed = (value: boolean) => {
    setIsCollapsed(value);
    localStorage.setItem("sidebar-collapsed", String(value));
  };

  if (isCollapsed === null) return null; // or a loading spinner

  const sidebarWidth = isCollapsed ? 64 : 288;

  return (
    <>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={handleSetCollapsed} />
      <main
        className="transition-all duration-300 min-h-screen bg-gray-50"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {children}
      </main>
    </>
  );
}
