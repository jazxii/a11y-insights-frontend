import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, BarChart3, Settings, Search, User } from 'lucide-react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/upload', label: 'New Analysis', icon: Upload },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 min-h-screen border-r border-gray-800 bg-[#0a0a0a]">
          <div className="p-6">
            <h1 className="text-blue-400">A11y Insights</h1>
          </div>
          
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    isActive
                      ? 'bg-blue-950/50 text-blue-400'
                      : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded px-10 py-2 text-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-gray-700"
                />
              </div>
            </div>
            
            <button className="ml-4 p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
              <User className="w-4 h-4" />
            </button>
          </header>

          {/* Page Content */}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
