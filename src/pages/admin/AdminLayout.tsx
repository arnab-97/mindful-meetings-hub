import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Calendar, Mic, MapPin, Ticket, LogOut } from "lucide-react";
import { useEffect } from "react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/events", label: "Events", icon: Calendar },
  { to: "/admin/speakers", label: "Speakers", icon: Mic },
  { to: "/admin/venues", label: "Venues", icon: MapPin },
  { to: "/admin/bookings", label: "Bookings", icon: Ticket },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem("gmc_admin") !== "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("gmc_admin");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-56 border-r border-border bg-card p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
            <span className="font-display text-xs font-bold text-primary-foreground">G</span>
          </div>
          <span className="font-display text-sm font-semibold text-foreground">GMC Admin</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-colors",
                location.pathname === to
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <Button variant="ghost" size="sm" className="justify-start gap-2 text-muted-foreground" onClick={handleLogout}>
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
