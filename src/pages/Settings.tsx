
import React from 'react';
import { User, Bell, Shield, Globe, Clock, Moon, Sun, Laptop } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Moon className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account profile information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Admin User" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@engagetrack.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" defaultValue="Administrator" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select defaultValue="management">
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-8">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-12">UTC-12:00</SelectItem>
                    <SelectItem value="utc-11">UTC-11:00</SelectItem>
                    <SelectItem value="utc-10">UTC-10:00</SelectItem>
                    <SelectItem value="utc-9">UTC-9:00</SelectItem>
                    <SelectItem value="utc-8">UTC-8:00 (Pacific Time)</SelectItem>
                    <SelectItem value="utc-7">UTC-7:00 (Mountain Time)</SelectItem>
                    <SelectItem value="utc-6">UTC-6:00 (Central Time)</SelectItem>
                    <SelectItem value="utc-5">UTC-5:00 (Eastern Time)</SelectItem>
                    <SelectItem value="utc-4">UTC-4:00</SelectItem>
                    <SelectItem value="utc-3">UTC-3:00</SelectItem>
                    <SelectItem value="utc-2">UTC-2:00</SelectItem>
                    <SelectItem value="utc-1">UTC-1:00</SelectItem>
                    <SelectItem value="utc-0">UTC+0:00</SelectItem>
                    <SelectItem value="utc+1">UTC+1:00</SelectItem>
                    <SelectItem value="utc+2">UTC+2:00</SelectItem>
                    <SelectItem value="utc+3">UTC+3:00</SelectItem>
                    <SelectItem value="utc+4">UTC+4:00</SelectItem>
                    <SelectItem value="utc+5">UTC+5:00</SelectItem>
                    <SelectItem value="utc+5:30">UTC+5:30 (Indian Standard Time)</SelectItem>
                    <SelectItem value="utc+6">UTC+6:00</SelectItem>
                    <SelectItem value="utc+7">UTC+7:00</SelectItem>
                    <SelectItem value="utc+8">UTC+8:00</SelectItem>
                    <SelectItem value="utc+9">UTC+9:00</SelectItem>
                    <SelectItem value="utc+10">UTC+10:00</SelectItem>
                    <SelectItem value="utc+11">UTC+11:00</SelectItem>
                    <SelectItem value="utc+12">UTC+12:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                    <SelectItem value="ru">Russian</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-task-assignments">Task Assignments</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email when you are assigned a new task
                    </p>
                  </div>
                  <Switch id="email-task-assignments" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-task-updates">Task Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email when tasks you're assigned to are updated
                    </p>
                  </div>
                  <Switch id="email-task-updates" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-project-deadlines">Project Deadlines</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email reminders about upcoming project deadlines
                    </p>
                  </div>
                  <Switch id="email-project-deadlines" defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-task-assignments">Task Assignments</Label>
                    <p className="text-sm text-muted-foreground">
                      Show system notification when you are assigned a new task
                    </p>
                  </div>
                  <Switch id="system-task-assignments" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-task-updates">Task Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Show system notification when tasks you're assigned to are updated
                    </p>
                  </div>
                  <Switch id="system-task-updates" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-project-deadlines">Project Deadlines</Label>
                    <p className="text-sm text-muted-foreground">
                      Show system notification reminders about upcoming project deadlines
                    </p>
                  </div>
                  <Switch id="system-project-deadlines" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="system-meeting-reminders">Meeting Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Show system notification reminders for upcoming meetings
                    </p>
                  </div>
                  <Switch id="system-meeting-reminders" defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Notification Frequency</Label>
                <Select defaultValue="immediately">
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="hourly">Hourly digest</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly digest</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Control how often you receive bundled notifications
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme Preferences</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Button variant="outline" className="w-full h-20 justify-center">
                      <Sun className="h-8 w-8" />
                    </Button>
                    <Label>Light</Label>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Button variant="outline" className="w-full h-20 justify-center bg-accent">
                      <Moon className="h-8 w-8" />
                    </Button>
                    <Label>Dark</Label>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Button variant="outline" className="w-full h-20 justify-center">
                      <Laptop className="h-8 w-8" />
                    </Button>
                    <Label>System</Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Display Settings</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact layout to fit more content on screen
                    </p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reduce-motion">Reduce Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce the amount of animation effects
                    </p>
                  </div>
                  <Switch id="reduce-motion" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="high-contrast">High Contrast</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better readability
                    </p>
                  </div>
                  <Switch id="high-contrast" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="default-view">Default View</Label>
                <Select defaultValue="dashboard">
                  <SelectTrigger id="default-view">
                    <SelectValue placeholder="Select default view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="projects">Projects</SelectItem>
                    <SelectItem value="tasks">Tasks</SelectItem>
                    <SelectItem value="timetracking">Time Tracking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save appearance</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                
                <Button className="mt-2">Update Password</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-factor authentication is currently disabled</p>
                    <p className="text-sm text-muted-foreground">
                      Add an additional layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Management</h3>
                <p className="text-sm text-muted-foreground">
                  You are currently logged in from 1 device
                </p>
                
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">
                        Chrome on Windows • IP: 192.168.1.1
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last active: Just now
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Logout
                    </Button>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Logout from all devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
