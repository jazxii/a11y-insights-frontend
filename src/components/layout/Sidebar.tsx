import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  dark: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ dark }) => (
  <div
    className={`w-64 h-screen ${
      dark
        ? "bg-[#0e0f12] text-gray-200 border-gray-800"
        : "bg-gray-100 text-gray-900 border-gray-300"
    } flex flex-col justify-between p-4 border-r transition-colors`}
  >
    <div>
      <h1 className="text-xl font-semibold mb-8">
        A11y <span className="text-blue-500">Insights</span>
      </h1>

      <nav className="flex flex-col gap-3">
        {[
          { path: "/", label: "Dashboard" },
          { path: "/analyze", label: "Upload / Analyze" },
          { path: "/reports", label: "Reports" },
          { path: "/document-defect", label: "Document Defect" }, // 👈 New Page
          { path: "/settings", label: "Settings" },
        ].map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md font-medium ${
                isActive
                  ? "bg-blue-700 text-white"
                  : dark
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-200"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  </div>
);

export default Sidebar;
