
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckSquare } from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  progress: number;
  tasks: {
    completed: number;
    total: number;
  };
  dueDate: string;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
}

interface ProjectsListProps {
  projects: Project[];
  className?: string;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, className }) => {
  return (
    <div className={cn("space-y-4", className)}>
      {projects.map((project) => (
        <div key={project.id} className="bg-card rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-sm">{project.name}</h3>
            <span 
              className={cn("text-xs px-2 py-1 rounded-full", {
                "bg-success/10 text-success": project.status === 'on-track',
                "bg-warning/10 text-warning": project.status === 'at-risk',
                "bg-danger/10 text-danger": project.status === 'delayed',
                "bg-neutral/10 text-neutral": project.status === 'completed',
              })}
            >
              {project.status.replace('-', ' ')}
            </span>
          </div>
          
          <div className="mt-3">
            <div className="progress-bar">
              <div 
                className={cn("progress-value", {
                  "bg-success": project.progress >= 75,
                  "bg-brand": project.progress >= 25 && project.progress < 75,
                  "bg-warning": project.progress < 25,
                })}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckSquare className="h-3 w-3" />
              <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
            </div>
            <span>Due {project.dueDate}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
