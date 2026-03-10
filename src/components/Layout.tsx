import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Radio, 
  Users, 
  FileText, 
  BarChart3, 
  Settings as SettingsIcon,
  Search,
  Bell,
  Shield,
  Brain
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/live-monitoring", label: "Live Monitoring", icon: Radio },
  { path: "/worker-tracking", label: "Worker Tracking", icon: Users },
  { path: "/incident-reports", label: "Incident Reports", icon: FileText },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/machine-failure-ai", label: "Machine Failure AI", icon: Brain },
  { path: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Shield className="w-8 h-8 text-primary" />
          <span className="ml-3 text-xl font-bold text-foreground">FactoryShield</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="ml-3">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <p>© 2026 FactoryShield</p>
            <p className="mt-1">v2.4.1</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search workers, incidents, zones..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 ml-8">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            {/* User Profile */}
            <Link to="/settings" className="flex items-center space-x-3 p-2 hover:bg-secondary rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">JD</span>
              </div>
              <div className="text-sm">
                <p className="text-foreground font-medium">John Doe</p>
                <p className="text-muted-foreground text-xs">Admin</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}