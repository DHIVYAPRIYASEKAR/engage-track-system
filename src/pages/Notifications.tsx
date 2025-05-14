
import React, { useState } from 'react';
import { Bell, Check, Trash2, Clock, Calendar, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

// Mock notification data
const initialNotifications = [
  {
    id: 1,
    title: 'Project Deadline Approaching',
    description: 'The deadline for the Marketing Website project is in 2 days.',
    time: '30 minutes ago',
    read: false,
    type: 'warning',
  },
  {
    id: 2,
    title: 'New Task Assignment',
    description: 'You have been assigned to the UI Design task.',
    time: '2 hours ago',
    read: false,
    type: 'info',
  },
  {
    id: 3,
    title: 'Meeting Reminder',
    description: 'Team meeting starts in 15 minutes in Conference Room A.',
    time: '15 minutes ago',
    read: false,
    type: 'reminder',
  },
  {
    id: 4,
    title: 'Task Completed',
    description: 'John Doe has completed the Database Setup task.',
    time: '1 day ago',
    read: true,
    type: 'success',
  },
  {
    id: 5,
    title: 'New Comment',
    description: 'Sarah left a comment on your task: "Looks great, just needs minor adjustments."',
    time: '2 days ago',
    read: true,
    type: 'info',
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNotifications(updatedNotifications);
    toast({
      description: "All notifications marked as read",
    });
  };

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    
    setNotifications(updatedNotifications);
  };

  const deleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    
    toast({
      description: "Notification deleted",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    
    toast({
      description: "All notifications cleared",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'reminder':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-neutral-500" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="bg-brand">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <>
              <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                <Check className="h-4 w-4 mr-2" />
                Mark all read
              </Button>
              <Button variant="outline" onClick={clearAllNotifications}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear all
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All
            {notifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`hover:shadow-md transition-shadow cursor-pointer ${!notification.read ? 'border-l-4 border-l-brand' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {notification.time}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground">
                You're all caught up! No {activeTab === 'unread' ? 'unread ' : ''}notifications at the moment.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
