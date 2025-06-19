import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, GraduationCap, ListFilter } from "lucide-react";
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
  title: "Manage Programs - Admin - AdmitPro",
};

// Placeholder data for programs
const programs = [
  { id: "PROG001", name: "B.Sc. Computer Science", department: "Computing", duration: "4 Years", status: "Active", totalSeats: 150 },
  { id: "PROG002", name: "BBA (Hons)", department: "Management Sciences", duration: "4 Years", status: "Active", totalSeats: 100 },
  { id: "PROG003", name: "M.A. Fine Arts", department: "Arts & Humanities", duration: "2 Years", status: "Active", totalSeats: 50 },
  { id: "PROG004", name: "B.Eng. Civil Engineering", department: "Engineering", duration: "4 Years", status: "Inactive", totalSeats: 80 },
];

export default function AdminProgramsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-headline font-semibold text-primary">Manage Academic Programs</h1>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Program
        </Button>
      </div>
      <CardDescription>
        Define, update, and manage academic programs offered by the institution. Set intake capacities and program statuses.
      </CardDescription>
      
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl">Program List</CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="Search programs..." className="max-w-xs" />
            <Button variant="outline" size="icon"><ListFilter className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program ID</TableHead>
                <TableHead>Program Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Total Seats</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.id}</TableCell>
                  <TableCell>{program.name}</TableCell>
                  <TableCell>{program.department}</TableCell>
                  <TableCell>{program.duration}</TableCell>
                  <TableCell>{program.totalSeats}</TableCell>
                  <TableCell>
                    <Badge variant={program.status === 'Active' ? 'default' : 'destructive'} className={program.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {program.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                       <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-center">
             {/* Placeholder for pagination */}
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <span className="mx-4 text-sm text-muted-foreground">Page 1 of 1</span>
            <Button variant="outline" size="sm" disabled>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
