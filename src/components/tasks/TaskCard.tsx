
import React from 'react';
import { Clock, CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface TaskAssignee {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignees: TaskAssignee[];
  project?: string;
}

interface TaskCardProps {
  task: Task;
  onClick?: (task: Task) => void;
  className?: string;
}

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'medium':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'low':
      return 'bg-green-100 text-green-700 border-green-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

const getStatusIcon = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-brand" />;
    case 'blocked':
      return <AlertCircle className="h-4 w-4 text-danger" />;
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />;
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, className }) => {
  return (
    <Card 
      className={cn("hover:shadow-md transition-shadow cursor-pointer", className)} 
      onClick={() => onClick?.(task)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-sm truncate">{task.title}</h3>
          <Badge 
            variant="outline" 
            className={cn("text-xs font-normal ml-2 whitespace-nowrap", 
              getPriorityColor(task.priority)
            )}
          >
            {task.priority}
          </Badge>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            {getStatusIcon(task.status)}
            <span className="capitalize">{task.status.replace('-', ' ')}</span>
          </div>
          
          <div className="text-muted-foreground">Due {task.dueDate}</div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-2">
            {task.assignees.slice(0, 3).map((assignee) => (
              <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                <AvatarImage src={assignee.avatar} />
                <AvatarFallback className="text-xs">{assignee.initials}</AvatarFallback>
              </Avatar>
            ))}
            {task.assignees.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                +{task.assignees.length - 3}
              </div>
            )}
          </div>
          
          {task.project && (
            <Badge variant="outline" className="text-xs">
              {task.project}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { TaskCard };
export default TaskCard;
