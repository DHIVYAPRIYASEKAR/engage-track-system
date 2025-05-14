
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, MoreHorizontal, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  status: 'active' | 'on-leave' | 'inactive';
  email: string;
  initials: string;
  joinDate: string;
  productivity: number;
}

const Employees: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
  const employees: Employee[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      position: 'UI/UX Designer',
      department: 'Design',
      status: 'active',
      email: 'sarah.j@company.com',
      initials: 'SJ',
      joinDate: 'Jul 2022',
      productivity: 94
    },
    {
      id: '2',
      name: 'Michael Chen',
      position: 'Senior Developer',
      department: 'Engineering',
      status: 'active',
      email: 'michael.c@company.com',
      initials: 'MC',
      joinDate: 'Mar 2020',
      productivity: 87
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      position: 'Project Manager',
      department: 'Product',
      status: 'active',
      email: 'emily.r@company.com',
      initials: 'ER',
      joinDate: 'Jan 2021',
      productivity: 90
    },
    {
      id: '4',
      name: 'David Kim',
      position: 'Data Analyst',
      department: 'Analytics',
      status: 'active',
      email: 'david.k@company.com',
      initials: 'DK',
      joinDate: 'Aug 2022',
      productivity: 82
    },
    {
      id: '5',
      name: 'Jasmine Lee',
      position: 'Marketing Specialist',
      department: 'Marketing',
      status: 'on-leave',
      email: 'jasmine.l@company.com',
      initials: 'JL',
      joinDate: 'Apr 2021',
      productivity: 78
    }
  ];

  const filteredEmployees = employees.filter(
    employee => employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
               employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Button className="bg-brand hover:bg-brand-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search employees..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Productivity</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-brand/10 text-brand text-xs">
                          {employee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-xs text-muted-foreground">{employee.position}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === 'active' ? 'bg-success/10 text-success' :
                      employee.status === 'on-leave' ? 'bg-warning/10 text-warning' :
                      'bg-neutral/10 text-neutral'
                    }`}>
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell>{employee.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar w-16">
                        <div 
                          className={`progress-value ${
                            employee.productivity >= 90 ? 'bg-success' :
                            employee.productivity >= 70 ? 'bg-brand' :
                            'bg-warning'
                          }`} 
                          style={{ width: `${employee.productivity}%` }} 
                        />
                      </div>
                      <span className="text-xs font-medium">{employee.productivity}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign Project</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-danger">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
