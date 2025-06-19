import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListFilter, Users, Repeat, BarChart2, Download } from "lucide-react";
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

export const metadata: Metadata = {
  title: "Enrollment Tracking - Admin - AdmitPro",
};

// Placeholder data
const enrolledStudents = [
  { id: "ENR001", name: "Charlie Brown", program: "Fine Arts", status: "Enrolled", enrollmentDate: "2024-08-01", feeStatus: "Paid" },
  { id: "ENR002", name: "Alice Wonderland", program: "Computer Science", status: "Provisional", enrollmentDate: "2024-08-03", feeStatus: "Partial" },
  { id: "ENR003", name: "Eve Adamson", program: "Business Administration", status: "Enrolled", enrollmentDate: "2024-08-02", feeStatus: "Paid" },
  { id: "ENR004", name: "Grace Hopper", program: "Computer Science", status: "Waitlisted", enrollmentDate: "-", feeStatus: "N/A" },
];

const programChangeRequests = [
    { id: "PCR001", studentName: "Bob The Builder", currentProgram: "Engineering", requestedProgram: "Business Admin", status: "Pending Approval", requestDate: "2024-08-05" },
    { id: "PCR002", studentName: "Diana Prince", currentProgram: "Fine Arts", requestedProgram: "Liberal Arts", status: "Approved", requestDate: "2024-08-04" },
];

export default function AdminEnrollmentPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-headline font-semibold text-primary">Enrollment & Program Changes</h1>
        <div className="flex gap-2">
            <Button variant="outline"><ListFilter className="mr-2 h-4 w-4" /> Filters</Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground"><Download className="mr-2 h-4 w-4" /> Export Data</Button>
        </div>
      </div>
      
      {/* Enrollment Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Enrolled</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">285</div>
            <p className="text-xs text-muted-foreground">+15 from last week</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Program Change Requests</CardTitle>
            <Repeat className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">5 pending approval</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Enrollment Rate</CardTitle>
            <BarChart2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Of offers accepted</p>
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Students Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Enrolled Students List</CardTitle>
          <CardDescription>Overview of students who have completed enrollment.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Enrollment ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrollment Date</TableHead>
                <TableHead>Fee Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrolledStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell><Badge variant={student.status === 'Enrolled' ? 'default' : student.status === 'Provisional' ? 'secondary' : 'outline'} className={student.status === 'Enrolled' ? 'bg-green-500 text-white' : ''}>{student.status}</Badge></TableCell>
                  <TableCell>{student.enrollmentDate}</TableCell>
                  <TableCell><Badge variant={student.feeStatus === 'Paid' ? 'default' : 'destructive'}  className={student.feeStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>{student.feeStatus}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Program Change Requests Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Program Change Requests</CardTitle>
          <CardDescription>Track and manage student requests for program changes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Current Program</TableHead>
                <TableHead>Requested Program</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programChangeRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.id}</TableCell>
                  <TableCell>{req.studentName}</TableCell>
                  <TableCell>{req.currentProgram}</TableCell>
                  <TableCell>{req.requestedProgram}</TableCell>
                  <TableCell><Badge variant={req.status === 'Approved' ? 'default' : 'secondary'} className={req.status === 'Approved' ? 'bg-green-500 text-white' : ''}>{req.status}</Badge></TableCell>
                  <TableCell>{req.requestDate}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
