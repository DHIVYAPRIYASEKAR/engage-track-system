
import React, { useState } from 'react';
import { Calendar, Clock, User, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const scheduleEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    description: 'Weekly team sync',
    date: '2025-05-14',
    time: '10:00 AM - 11:00 AM',
    participants: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    type: 'meeting',
    location: 'Conference Room A',
  },
  {
    id: 2, 
    title: 'Project Deadline',
    description: 'Website redesign completion',
    date: '2025-05-15',
    time: '5:00 PM',
    participants: ['All Team Members'],
    type: 'deadline',
    location: 'N/A',
  },
  {
    id: 3,
    title: 'Client Presentation',
    description: 'Present the new marketing strategy',
    date: '2025-05-16',
    time: '2:00 PM - 3:30 PM',
    participants: ['Jane Smith', 'Mike Johnson', 'Client Representatives'],
    type: 'meeting',
    location: 'Main Boardroom',
  },
  {
    id: 4,
    title: 'Team Building',
    description: 'Outdoor activities and lunch',
    date: '2025-05-17',
    time: '12:00 PM - 5:00 PM',
    participants: ['All Team Members'],
    type: 'event',
    location: 'Central Park',
  },
  {
    id: 5,
    title: 'Training Session',
    description: 'New software training',
    date: '2025-05-18',
    time: '9:00 AM - 12:00 PM',
    participants: ['Development Team'],
    type: 'training',
    location: 'Training Room B',
  }
];

const Schedule = () => {
  const [view, setView] = useState('calendar');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = scheduleEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderEventBadge = (type: string) => {
    switch(type) {
      case 'meeting':
        return <Badge className="bg-blue-500">Meeting</Badge>;
      case 'deadline':
        return <Badge className="bg-red-500">Deadline</Badge>;
      case 'event':
        return <Badge className="bg-green-500">Event</Badge>;
      case 'training':
        return <Badge className="bg-amber-500">Training</Badge>;
      default:
        return <Badge>Other</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="meeting">Meetings</SelectItem>
              <SelectItem value="deadline">Deadlines</SelectItem>
              <SelectItem value="event">Events</SelectItem>
              <SelectItem value="training">Training</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={view} onValueChange={setView} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="list">
            <Filter className="h-4 w-4 mr-2" />
            List View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              {/* This would ideally be replaced with a proper calendar component */}
              <div className="bg-muted p-8 rounded-md text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-brand" />
                <p className="text-lg">Calendar view would be implemented with a full calendar component</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Showing events for May 2025
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list" className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{event.description}</p>
                    </div>
                    {renderEventBadge(event.type)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-brand" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-brand" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-brand" />
                      <span className="text-sm">{event.participants.join(', ')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p>No events found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Schedule;
