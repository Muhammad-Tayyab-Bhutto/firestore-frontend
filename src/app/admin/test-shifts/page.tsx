import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, ListFilter, CalendarClock } from "lucide-react";
import { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Manage Test Shifts - Admin - AdmitPro",
};

// Placeholder data for test shifts
const testShifts = [
  { id: "SHIFT001", testCenter: "Main Campus Auditorium", date: "2024-10-25", time: "09:00 AM - 11:00 AM", capacity: 100, registered: 75, status: "Open" },
  { id: "SHIFT002", testCenter: "City Center Hall A", date: "2024-10-25", time: "02:00 PM - 04:00 PM", capacity: 80, registered: 80, status: "Full" },
  { id: "SHIFT003", testCenter: "Main Campus Auditorium", date: "2024-10-26", time: "10:00 AM - 12:00 PM", capacity: 100, registered: 40, status: "Open" },
  { id: "SHIFT004", testCenter: "Online Proctored System", date: "2024-10-27", time: "Flexible", capacity: 200, registered: 150, status: "Open" },
];

export default function AdminTestShiftsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
            <CalendarClock className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-headline font-semibold text-primary">Manage Test Shifts</h1>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Shift
        </Button>
      </div>
      <CardDescription>
        Define and manage test schedules, dates, times, and capacities for different test centers.
      </CardDescription>
      
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl">Test Shifts List</CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="Search shifts..." className="max-w-xs" />
            <Button variant="outline" size="icon"><ListFilter className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shift ID</TableHead>
                <TableHead>Test Center</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testShifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell className="font-medium">{shift.id}</TableCell>
                  <TableCell>{shift.testCenter}</TableCell>
                  <TableCell>{shift.date}</TableCell>
                  <TableCell>{shift.time}</TableCell>
                  <TableCell>{shift.capacity}</TableCell>
                  <TableCell>{shift.registered}</TableCell>
                  <TableCell>
                    <Badge variant={shift.status === 'Open' ? 'default' : 'secondary'} className={shift.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {shift.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit Shift</span>
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                       <span className="sr-only">Delete Shift</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <span className="mx-4 text-sm text-muted-foreground">Page 1 of 1</span>
            <Button variant="outline" size="sm" disabled>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
