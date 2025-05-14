
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface Activity {
  id: string;
  employeeName: string;
  employeeAvatar?: string;
  employeeInitials: string;
  action: string;
  project?: string;
  time: string;
  status?: 'online' | 'idle' | 'offline';
}

interface EmployeeActivityListProps {
  activities: Activity[];
  className?: string;
}

const EmployeeActivityList: React.FC<EmployeeActivityListProps> = ({ activities, className }) => {
  return (
    <div className={cn("space-y-1", className)}>
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item flex items-center">
          <div className="relative mr-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.employeeAvatar} />
              <AvatarFallback className="bg-brand/10 text-brand">
                {activity.employeeInitials}
              </AvatarFallback>
            </Avatar>
            {activity.status && (
              <span 
                className={cn(
                  "absolute bottom-0 right-0 h-2 w-2 rounded-full border border-background",
                  {
                    "bg-success": activity.status === 'online',
                    "bg-warning": activity.status === 'idle',
                    "bg-neutral": activity.status === 'offline',
                  }
                )} 
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{activity.employeeName}</p>
            <p className="text-xs text-muted-foreground truncate">
              {activity.action}
              {activity.project && <span> on <span className="font-medium text-foreground">{activity.project}</span></span>}
            </p>
          </div>
          <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeActivityList;
