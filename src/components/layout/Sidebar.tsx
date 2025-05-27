// src/components/layout/Sidebar.tsx
import Image from "next/image";
import {
  EnvelopeIcon,
  UsersIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {useState} from "react";

const navigation = [
  {
    id: "email",
    label: "Email",
    icon: EnvelopeIcon,
    defaultExpanded: true,
    links: [
      {name: "Email Campaigns", href: "/email-campaigns"},
      {name: "Email Templates", href: "/email-templates"},
    ],
  },
  {
    id: "users",
    label: "Users",
    icon: UsersIcon,
    defaultExpanded: true,
    links: [
      {name: "Interest Groups", href: "/interest-groups"},
      {name: "All Users", href: "/all-users"},
    ],
  },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState(() => {
    const init: Record<string, boolean> = {};
    navigation.forEach((section) => {
      init[section.id] = !!section.defaultExpanded;
    });
    return init;
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({...prev, [id]: !prev[id]}));
  };

  return (
    <div
      className={`h-screen bg-primary-500 text-white transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Logo & Toggle */}
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
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:text-white"
        >
          {isCollapsed ? (
            <Bars3Icon className="h-6 w-6" />
          ) : (
            <XMarkIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.id}>
            {!isCollapsed ? (
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex justify-between items-center px-3 pt-2 pb-1 text-white text-xs uppercase tracking-wide font-semibold hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <section.icon className="h-4 w-4" />
                  <span>{section.label}</span>
                </div>
                <span>
                  {expandedSections[section.id] ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" />
                  )}
                </span>
              </button>
            ) : (
              <div className="px-2 py-2 text-center" title={section.label}>
                <section.icon className="h-5 w-5 mx-auto" />
              </div>
            )}

            {!isCollapsed && expandedSections[section.id] && (
              <ul className="flex flex-col px-3 pb-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="block font-semibold px-4 py-2 rounded hover:bg-primary-600"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
