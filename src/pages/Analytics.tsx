
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CalendarClock, Users, CheckCircle, Clock, PieChart as PieChartIcon, BarChart as BarChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const productivityData = [
  { name: 'Monday', productivity: 85 },
  { name: 'Tuesday', productivity: 90 },
  { name: 'Wednesday', productivity: 78 },
  { name: 'Thursday', productivity: 92 },
  { name: 'Friday', productivity: 76 },
];

const timeDistributionData = [
  { name: 'Project A', value: 35 },
  { name: 'Project B', value: 25 },
  { name: 'Project C', value: 20 },
  { name: 'Meetings', value: 15 },
  { name: 'Admin', value: 5 },
];

const employeePerformanceData = [
  { name: 'John', performance: 92, tasks: 24, hours: 42 },
  { name: 'Sarah', performance: 88, tasks: 19, hours: 39 },
  { name: 'Mike', performance: 95, tasks: 28, hours: 45 },
  { name: 'Emily', performance: 85, tasks: 17, hours: 37 },
  { name: 'David', performance: 90, tasks: 22, hours: 41 },
];

const projectProgressData = [
  { name: 'Week 1', actual: 20, planned: 25 },
  { name: 'Week 2', actual: 40, planned: 50 },
  { name: 'Week 3', actual: 65, planned: 75 },
  { name: 'Week 4', actual: 85, planned: 100 },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  
  const chartConfig = {
    productivity: { color: "#7E69AB" },
    meeting: { color: "#1EAEDB" },
    admin: { color: "#8E9196" },
    project: { color: "#4CAF50" },
    planned: { color: "#FFC107" },
    actual: { color: "#7E69AB" },
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Hours Tracked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">187.5</div>
              <Clock className="h-8 w-8 text-brand" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+12% from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">24</div>
              <Users className="h-8 w-8 text-brand" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+2 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tasks Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">78</div>
              <CheckCircle className="h-8 w-8 text-brand" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+15 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">87%</div>
              <CalendarClock className="h-8 w-8 text-brand" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+3% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">
            <PieChartIcon className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="employees">
            <BarChartIcon className="h-4 w-4 mr-2" />
            Employees
          </TabsTrigger>
          <TabsTrigger value="projects">
            <LineChartIcon className="h-4 w-4 mr-2" />
            Projects
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Productivity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-80" config={chartConfig}>
                  <BarChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="productivity" name="Productivity" fill="var(--color-productivity)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Time Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-80" config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={timeDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Employee Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-96" config={chartConfig}>
                <BarChart data={employeePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                  <Bar dataKey="performance" name="Performance %" fill="var(--color-productivity)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tasks" name="Tasks Completed" fill="var(--color-project)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hours" name="Hours Worked" fill="var(--color-meeting)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-96" config={chartConfig}>
                <LineChart data={projectProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="planned" name="Planned Progress" stroke="var(--color-planned)" strokeWidth={2} />
                  <Line type="monotone" dataKey="actual" name="Actual Progress" stroke="var(--color-actual)" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
