
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import TimeTracker from '@/components/timetracking/TimeTracker';

// Sample data for demonstration
const projects = [
  { id: "p1", name: "Website Redesign" },
  { id: "p2", name: "Mobile App Development" },
  { id: "p3", name: "CRM Integration" },
];

const tasks = [
  { id: "t1", name: "Design Homepage", projectId: "p1" },
  { id: "t2", name: "Implement Login", projectId: "p1" },
  { id: "t3", name: "UI Components", projectId: "p1" },
  { id: "t4", name: "App Architecture", projectId: "p2" },
  { id: "t5", name: "API Integration", projectId: "p2" },
  { id: "t6", name: "Testing", projectId: "p2" },
  { id: "t7", name: "Data Modeling", projectId: "p3" },
  { id: "t8", name: "Implementation", projectId: "p3" },
];

interface TimeEntry {
  id: string;
  projectId: string;
  taskId: string;
  date: string;
  duration: number; // in seconds
}

// Sample time entries
const sampleTimeEntries: TimeEntry[] = [
  { 
    id: "te1", 
    projectId: "p1", 
    taskId: "t1", 
    date: "2025-05-14", 
    duration: 7200 // 2 hours
  },
  { 
    id: "te2", 
    projectId: "p2", 
    taskId: "t4", 
    date: "2025-05-14", 
    duration: 10800 // 3 hours
  },
  { 
    id: "te3", 
    projectId: "p1", 
    taskId: "t2", 
    date: "2025-05-13", 
    duration: 5400 // 1.5 hours
  },
];

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  return `${hours}h ${minutes}m`;
};

const TimeTrackingPage = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(sampleTimeEntries);
  
  // Handle tracking start
  const handleStart = (projectId: string, taskId: string) => {
    console.log(`Starting time tracking for project ${projectId}, task ${taskId}`);
  };
  
  // Handle tracking stop
  const handleStop = (duration: number) => {
    const newEntry: TimeEntry = {
      id: `te${Date.now()}`,
      projectId: projects[0].id, // Just for demo purposes
      taskId: tasks[0].id, // Just for demo purposes
      date: new Date().toISOString().split('T')[0],
      duration
    };
    
    setTimeEntries(prev => [newEntry, ...prev]);
  };
  
  // Calculate today's total time
  const todayDate = new Date().toISOString().split('T')[0];
  const todayTotal = timeEntries
    .filter(entry => entry.date === todayDate)
    .reduce((acc, entry) => acc + entry.duration, 0);
  
  // Calculate weekly total
  const weeklyTotal = timeEntries.reduce((acc, entry) => acc + entry.duration, 0);
  
  // Get project and task names for time entries
  const getProjectName = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.name || 'Unknown Project';
  };
  
  const getTaskName = (taskId: string) => {
    return tasks.find(t => t.id === taskId)?.name || 'Unknown Task';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Time Tracking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="today">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="all">All Time</TabsTrigger>
              </TabsList>
              
              <div className="text-sm">
                Today: <span className="font-medium">{formatDuration(todayTotal)}</span> | 
                Week: <span className="font-medium">{formatDuration(weeklyTotal)}</span>
              </div>
            </div>
            
            <TabsContent value="today" className="mt-0">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {timeEntries
                      .filter(entry => entry.date === todayDate)
                      .map(entry => (
                        <div key={entry.id} className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{getProjectName(entry.projectId)}</h3>
                            <p className="text-sm text-muted-foreground">{getTaskName(entry.taskId)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono">{formatDuration(entry.duration)}</p>
                          </div>
                        </div>
                      ))}
                    {timeEntries.filter(entry => entry.date === todayDate).length === 0 && (
                      <div className="p-6 text-center text-muted-foreground">
                        No time entries for today
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="week" className="mt-0">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {timeEntries.map(entry => (
                      <div key={entry.id} className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{getProjectName(entry.projectId)}</h3>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">{getTaskName(entry.taskId)}</p>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">
                              {entry.date}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono">{formatDuration(entry.duration)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="all" className="mt-0">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {timeEntries.map(entry => (
                      <div key={entry.id} className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{getProjectName(entry.projectId)}</h3>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">{getTaskName(entry.taskId)}</p>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">
                              {entry.date}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono">{formatDuration(entry.duration)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <TimeTracker 
            projects={projects}
            tasks={tasks}
            onStart={handleStart}
            onStop={handleStop}
          />
          
          <Card className="mt-6">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Weekly Summary</h3>
              
              <div className="space-y-3">
                {projects.map(project => {
                  const projectEntries = timeEntries.filter(e => e.projectId === project.id);
                  const projectTotal = projectEntries.reduce((acc, e) => acc + e.duration, 0);
                  
                  return (
                    <div key={project.id} className="flex justify-between items-center">
                      <span>{project.name}</span>
                      <span className="font-mono">{formatDuration(projectTotal)}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackingPage;
