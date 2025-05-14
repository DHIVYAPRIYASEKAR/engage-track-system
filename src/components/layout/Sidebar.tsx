
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { 
  Users,
  BarChart, 
  Calendar, 
  CheckSquare, 
  Clock, 
  Settings,
  PieChart
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const AppSidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const isMobile = useIsMobile();
  
  const menuItems = [
    { title: 'Dashboard', icon: BarChart, path: '/' },
    { title: 'Employees', icon: Users, path: '/employees' },
    { title: 'Projects', icon: CheckSquare, path: '/projects' },
    { title: 'Time Tracking', icon: Clock, path: '/time-tracking' },
    { title: 'Schedule', icon: Calendar, path: '/schedule' },
    { title: 'Analytics', icon: PieChart, path: '/analytics' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center">
              <span className="text-white font-bold">ET</span>
            </div>
            {!collapsed && (
              <h2 className="text-xl font-bold text-brand">EngageTrack</h2>
            )}
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
