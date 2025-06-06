import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeIcon,
  DocumentTextIcon,
  UsersIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";

type NavLink = {
  name: string;
  href: string;
  icon: React.ElementType;
};

type NavSection = {
  id: string;
  label: string;
  icon: React.ElementType;
  links: NavLink[];
};

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) {
  const { user } = useUser();

  const toggleSidebar = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("sidebar-collapsed", String(next));
  };

  const sections: NavSection[] = [
    {
      id: "admin",
      label: "Admin Area",
      icon: ShieldCheckIcon,
      links: user?.scope.includes("admin")
        ? [
            { name: "Campaigns", href: "/campaigns", icon: EnvelopeIcon },
            { name: "Templates", href: "/templates", icon: DocumentTextIcon },
            {
              name: "Interest Groups",
              href: "/interest-groups",
              icon: UserGroupIcon,
            },
            { name: "Users", href: "/all-users", icon: UsersIcon },
          ]
        : [],
    },
    {
      id: "personal",
      label: user?.name || "John Smith",
      icon: UserIcon,
      links: [
        { name: "My Campaigns", href: "/user/campaigns", icon: EnvelopeIcon },
        {
          name: "CPD Feedback",
          href: "/user/feedback",
          icon: DocumentTextIcon,
        },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300 flex flex-col bg-primary-800 ${
        isCollapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Logo and toggle */}
      <div
        className={`flex items-center justify-between px-4 pt-6 pb-4 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        {!isCollapsed && (
          <Image
            className="w-48"
            src="https://cms.proctorgroup.com/wp-content/uploads/2023/05/logo-horizontal-white.svg"
            alt="Logo"
            width={192}
            height={32}
          />
        )}
        <button onClick={toggleSidebar} className="text-white hover:text-white">
          {isCollapsed ? (
            <Bars3Icon className="h-6 w-6" />
          ) : (
            <XMarkIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.id}>
            {/* Section Header */}
            {!isCollapsed ? (
              <div className="flex items-center gap-2 px-3 pt-2 pb-1 text-white text-sm uppercase tracking-wide font-semibold">
                <section.icon className="h-6 w-6 opacity-50" />
                <span>{section.label}</span>
              </div>
            ) : (
              <div
                className="flex justify-center py-2 opacity-40 text-white"
                title={section.label}
              >
                <section.icon className="h-6 w-6" />
              </div>
            )}

            {/* Sections */}
            <ul
              className={`flex flex-col ${
                isCollapsed ? "items-center gap-1 pb-2" : "px-3 pb-2"
              }`}
            >
              {section.links.map((link) => (
                <li key={link.name} title={isCollapsed ? link.name : undefined}>
                  <Link
                    href={link.href}
                    className={`flex items-center font-semibold rounded text-white hover:bg-primary-900 transition-colors ${
                      isCollapsed ? "justify-center p-2" : "px-4 py-2 gap-2"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    {!isCollapsed && <span>{link.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
