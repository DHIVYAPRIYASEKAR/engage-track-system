
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import EmployeeActivityList, { Activity } from '@/components/dashboard/EmployeeActivityList';
import ProjectsList, { Project } from '@/components/dashboard/ProjectsList';
import TimeDistributionChart, { TimeDistribution } from '@/components/dashboard/TimeDistributionChart';
import ProductivityChart, { ProductivityData } from '@/components/dashboard/ProductivityChart';
import { Users, Clock, CheckSquare, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  // Mock data
  const activities: Activity[] = [
    {
      id: '1',
      employeeName: 'Sarah Johnson',
      employeeInitials: 'SJ',
      action: 'Started working on task "Update user interface"',
      project: 'Website Redesign',
      time: '10 min ago',
      status: 'online'
    },
    {
      id: '2',
      employeeName: 'Michael Chen',
      employeeInitials: 'MC',
      action: 'Completed task "Database optimization"',
      project: 'Backend Improvements',
      time: '25 min ago',
      status: 'online'
    },
    {
      id: '3',
      employeeName: 'Emily Rodriguez',
      employeeInitials: 'ER',
      action: 'Joined meeting "Sprint Planning"',
      time: '1 hr ago',
      status: 'idle'
    },
    {
      id: '4',
      employeeName: 'David Kim',
      employeeInitials: 'DK',
      action: 'Submitted timesheet for approval',
      time: '2 hrs ago',
      status: 'offline'
    },
    {
      id: '5',
      employeeName: 'Jasmine Lee',
      employeeInitials: 'JL',
      action: 'Created new task "Integration testing"',
      project: 'Mobile App',
      time: '3 hrs ago',
      status: 'offline'
    }
  ];

  const projects: Project[] = [
    {
      id: '1',
      name: 'Website Redesign',
      progress: 75,
      tasks: { completed: 15, total: 20 },
      dueDate: 'Jun 30',
      status: 'on-track'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      progress: 40,
      tasks: { completed: 8, total: 20 },
      dueDate: 'Jul 15',
      status: 'at-risk'
    },
    {
      id: '3',
      name: 'Marketing Campaign',
      progress: 90,
      tasks: { completed: 9, total: 10 },
      dueDate: 'Jun 5',
      status: 'on-track'
    }
  ];

  const timeDistribution: TimeDistribution[] = [
    { name: 'Development', value: 45, color: '#7E69AB' },
    { name: 'Meetings', value: 20, color: '#FFC107' },
    { name: 'Research', value: 15, color: '#D3E4FD' },
    { name: 'Admin', value: 10, color: '#8E9196' },
    { name: 'Breaks', value: 10, color: '#5E4C88' },
  ];

  const productivityData: ProductivityData[] = [
    { day: 'Mon', actual: 8.5, expected: 8 },
    { day: 'Tue', actual: 7.2, expected: 8 },
    { day: 'Wed', actual: 8.1, expected: 8 },
    { day: 'Thu', actual: 7.9, expected: 8 },
    { day: 'Fri', actual: 7.5, expected: 8 },
    { day: 'Sat', actual: 4.2, expected: 4 },
    { day: 'Sun', actual: 0, expected: 0 },
  ];

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Employees" 
          value="32" 
          icon={Users}
          description="Active team members" 
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Average Work Hours" 
          value="7.8h" 
          icon={Clock}
          description="Per day this week" 
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard 
          title="Active Projects" 
          value="8" 
          icon={CheckSquare}
          description="Across departments" 
        />
        <StatCard 
          title="Productivity Score" 
          value="87%" 
          icon={PieChart}
          description="Team average" 
          trend={{ value: 3, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Weekly Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductivityChart data={productivityData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <TimeDistributionChart data={timeDistribution} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectsList projects={projects} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeActivityList activities={activities} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
