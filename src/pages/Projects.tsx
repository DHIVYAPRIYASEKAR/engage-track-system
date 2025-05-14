
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Filter, Search, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { TaskCard, Task, TaskAssignee } from '@/components/tasks/TaskCard';

// Sample data
const sampleAssignees: TaskAssignee[] = [
  { id: "u1", name: "John Smith", initials: "JS", avatar: "" },
  { id: "u2", name: "Alice Johnson", initials: "AJ", avatar: "" },
  { id: "u3", name: "Robert Brown", initials: "RB", avatar: "" },
  { id: "u4", name: "Sarah Williams", initials: "SW", avatar: "" },
  { id: "u5", name: "Tom Wilson", initials: "TW", avatar: "" },
];

const sampleProjects = [
  { id: "p1", name: "Website Redesign" },
  { id: "p2", name: "Mobile App Development" },
  { id: "p3", name: "CRM Integration" },
];

const sampleTasks: Task[] = [
  {
    id: "task1",
    title: "Design Homepage Layout",
    description: "Create a modern, responsive layout for the homepage with clear call-to-action elements",
    status: "in-progress",
    priority: "high",
    dueDate: "May 16",
    assignees: [sampleAssignees[0], sampleAssignees[1]],
    project: "Website Redesign"
  },
  {
    id: "task2",
    title: "Implement User Authentication",
    description: "Set up secure user authentication flow with email verification and password reset",
    status: "todo",
    priority: "medium",
    dueDate: "May 20",
    assignees: [sampleAssignees[2]],
    project: "Website Redesign"
  },
  {
    id: "task3",
    title: "Database Schema Design",
    description: "Design database schema for user profiles, content management and analytics",
    status: "completed",
    priority: "high",
    dueDate: "May 12",
    assignees: [sampleAssignees[0], sampleAssignees[3], sampleAssignees[4]],
    project: "CRM Integration"
  },
  {
    id: "task4",
    title: "API Integration",
    description: "Connect to payment processing API and implement webhook handlers",
    status: "blocked",
    priority: "high",
    dueDate: "May 18",
    assignees: [sampleAssignees[2], sampleAssignees[3]],
    project: "Mobile App Development"
  },
  {
    id: "task5",
    title: "Mobile Navigation Menu",
    description: "Create a responsive navigation menu for mobile devices with animations",
    status: "in-progress",
    priority: "medium",
    dueDate: "May 19",
    assignees: [sampleAssignees[1]],
    project: "Mobile App Development"
  },
  {
    id: "task6",
    title: "Performance Optimization",
    description: "Optimize image loading and reduce bundle size for better performance",
    status: "todo",
    priority: "low",
    dueDate: "May 25",
    assignees: [sampleAssignees[0], sampleAssignees[4]],
    project: "Website Redesign"
  },
];

const ProjectsPage = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTaskClick = (task: Task) => {
    console.log('Task clicked:', task);
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.project?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get tasks by status
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const blockedTasks = filteredTasks.filter(task => task.status === 'blocked');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold">Projects & Tasks</h1>
        <Button className="mt-3 sm:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex-shrink-0">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all-tasks">
        <TabsList className="mb-4">
          <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
          <TabsTrigger value="by-project">By Project</TabsTrigger>
          <TabsTrigger value="by-status">By Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-tasks" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={handleTaskClick}
                />
              ))
            ) : (
              <div className="col-span-full p-8 text-center">
                <p className="text-lg text-muted-foreground">No tasks found</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="by-project" className="mt-0">
          {sampleProjects.map(project => (
            <div key={project.id} className="mb-6">
              <h2 className="text-lg font-medium mb-3">{project.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks
                  .filter(task => task.project === project.name)
                  .map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={handleTaskClick}
                    />
                  ))}
                {filteredTasks.filter(task => task.project === project.name).length === 0 && (
                  <div className="col-span-full p-4 text-center border rounded-lg bg-muted/20">
                    <p className="text-muted-foreground">No tasks for this project</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="by-status" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-3">
                <h3 className="font-medium mb-3 flex items-center">
                  <Circle className="mr-2 h-4 w-4 text-muted-foreground" />
                  To Do ({todoTasks.length})
                </h3>
                <div className="space-y-3">
                  {todoTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={handleTaskClick}
                    />
                  ))}
                  {todoTasks.length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
                      No tasks to do
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3">
                <h3 className="font-medium mb-3 flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-brand" />
                  In Progress ({inProgressTasks.length})
                </h3>
                <div className="space-y-3">
                  {inProgressTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={handleTaskClick}
                    />
                  ))}
                  {inProgressTasks.length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
                      No tasks in progress
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3">
                <h3 className="font-medium mb-3 flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-danger" />
                  Blocked ({blockedTasks.length})
                </h3>
                <div className="space-y-3">
                  {blockedTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={handleTaskClick}
                    />
                  ))}
                  {blockedTasks.length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
                      No blocked tasks
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3">
                <h3 className="font-medium mb-3 flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-success" />
                  Completed ({completedTasks.length})
                </h3>
                <div className="space-y-3">
                  {completedTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={handleTaskClick}
                    />
                  ))}
                  {completedTasks.length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
                      No completed tasks
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectsPage;
