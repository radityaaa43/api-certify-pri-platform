import { 
  LayoutDashboard, 
  Package, 
  TestTube, 
  Users, 
  PlayCircle, 
  Award,
  FileText,
  UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "test-cases", label: "Test Cases", icon: TestTube },
    { id: "partners", label: "Partners", icon: Users },
    { id: "partner-requests", label: "Partner Requests", icon: UserPlus },
    { id: "validation-sessions", label: "Validation Sessions", icon: PlayCircle },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-card border-r h-full">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;