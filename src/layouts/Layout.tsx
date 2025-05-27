import Sidebar from "@/components/layout/Sidebar";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-background p-6">{children}</main>
    </div>
  );
}
