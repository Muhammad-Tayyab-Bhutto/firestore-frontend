
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Contact, PlusCircle, Download, Filter, Settings } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Assign Roll Numbers - Admin - AdmitPro",
};

// Placeholder data
const sampleAssignedRolls = [
  { id: "RN001", studentName: "Alice Wonderland", program: "B.Sc. Computer Science", rollNumber: "F24CS001", session: "Fall 2024", status: "Assigned" },
  { id: "RN002", studentName: "Charlie Brown", program: "M.A. Fine Arts", rollNumber: "F24FA001", session: "Fall 2024", status: "Assigned" },
];

export default function AdminRollNumbersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
            <Contact className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-headline font-semibold text-primary">Roll Number Assignment</h1>
        </div>
        <div className="flex gap-2">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                 Assign Roll Numbers (Batch)
            </Button>
             <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" /> Configure Format
            </Button>
        </div>
      </div>
      <CardDescription>
        Automatically or manually assign roll numbers to admitted students based on program and session. Configure roll number formats.
      </CardDescription>
      
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-xl">Assigned Roll Numbers</CardTitle>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input placeholder="Search by student name or roll no..." className="flex-grow sm:flex-grow-0 sm:max-w-xs" />
             <Select defaultValue="F24">
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter Session" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="F24">Fall 2024</SelectItem>
                    <SelectItem value="S24">Spring 2024</SelectItem>
                    {/* Add more sessions */}
                </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="hidden sm:flex"><Filter className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleAssignedRolls.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.studentName}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell className="font-semibold text-primary">{student.rollNumber}</TableCell>
                  <TableCell>{student.session}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'Assigned' ? 'default' : 'secondary'} className={student.status === 'Assigned' ? 'bg-green-500 text-white' : ''}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-1">
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
               {sampleAssignedRolls.length === 0 && (
                 <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        No roll numbers assigned for the selected criteria.
                    </TableCell>
                 </TableRow>
               )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <div>
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export List (CSV)</Button>
            </div>
            <div className="flex justify-center items-center space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <span className="text-sm text-muted-foreground">Page 1 of 1</span>
                <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
