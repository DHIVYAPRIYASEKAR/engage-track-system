
import React, { useState, useEffect } from 'react';
import { Play, Pause, Check, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Project {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
  projectId: string;
}

interface TimeTrackerProps {
  projects: Project[];
  tasks: Task[];
  currentProjectId?: string;
  currentTaskId?: string;
  onStart: (projectId: string, taskId: string) => void;
  onStop: (duration: number) => void;
  className?: string;
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0'),
  ].join(':');
};

const TimeTracker: React.FC<TimeTrackerProps> = ({ 
  projects,
  tasks,
  currentProjectId,
  currentTaskId,
  onStart,
  onStop,
  className
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(currentProjectId || '');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(currentTaskId || '');
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Filter tasks based on selected project
  const filteredTasks = selectedProjectId 
    ? tasks.filter(task => task.projectId === selectedProjectId)
    : [];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isTracking) {
      interval = setInterval(() => {
        if (startTime) {
          const now = Date.now();
          const elapsed = Math.floor((now - startTime) / 1000);
          setElapsedTime(elapsed);
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking, startTime]);

  const handleStart = () => {
    if (selectedProjectId && selectedTaskId) {
      setStartTime(Date.now());
      setIsTracking(true);
      onStart(selectedProjectId, selectedTaskId);
    }
  };

  const handleStop = () => {
    setIsTracking(false);
    if (startTime) {
      onStop(elapsedTime);
    }
    setStartTime(null);
    setElapsedTime(0);
  };

  const toggleTracking = () => {
    if (isTracking) {
      handleStop();
    } else {
      handleStart();
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Tracker
            </h3>
            <div className="text-lg font-mono">{formatTime(elapsedTime)}</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Select
              value={selectedProjectId}
              onValueChange={setSelectedProjectId}
              disabled={isTracking}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={selectedTaskId}
              onValueChange={setSelectedTaskId}
              disabled={isTracking || !selectedProjectId || filteredTasks.length === 0}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select task" />
              </SelectTrigger>
              <SelectContent>
                {filteredTasks.map((task) => (
                  <SelectItem key={task.id} value={task.id}>
                    {task.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            className="w-full"
            variant={isTracking ? "destructive" : "default"}
            onClick={toggleTracking}
            disabled={!selectedProjectId || !selectedTaskId}
          >
            {isTracking ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Stop Tracking
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Tracking
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTracker;
