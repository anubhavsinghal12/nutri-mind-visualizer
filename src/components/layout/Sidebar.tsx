
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Utensils, BarChart2, User } from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      active 
        ? "bg-primary text-primary-foreground" 
        : "text-gray-700 hover:bg-gray-100"
    )}
  >
    {icon}
    {label}
  </Link>
);

export const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const routes = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      icon: <Utensils className="h-5 w-5" />,
      label: "Food Log",
      href: "/food-log",
      active: pathname === "/food-log",
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      label: "Analysis",
      href: "/analysis",
      active: pathname === "/analysis",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      href: "/profile",
      active: pathname === "/profile",
    },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-white">
      <div className="p-6">
        <div className="space-y-1">
          {routes.map((route) => (
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
              active={route.active}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
