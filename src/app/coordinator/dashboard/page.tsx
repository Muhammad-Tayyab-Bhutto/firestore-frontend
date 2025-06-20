
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ListChecks, UserPlus, Edit3, Search, CalendarDays, Users, FileText, Bell, Download } from "lucide-react"; // Added Download
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export const metadata: Metadata = {
  title: "Coordinator Dashboard - AdmitPro",
};

// Sample Data
const sampleSubjects = [
    { id: "CS301", code: "CS301", name: "Data Structures", creditHours: 3 },
    { id: "CS302", code: "CS302", name: "Algorithms", creditHours: 3 },
    { id: "MT201", code: "MT201", name: "Calculus II", creditHours: 3 },
    { id: "HU101", code: "HU101", name: "Communication Skills", creditHours: 2 },
];

const sampleStudents = [
    { cmsId: "2021-CS-01", name: "John Doe", semester: 3, enrolledSubjects: ["CS301", "MT201"]},
    { cmsId: "2021-CS-02", name: "Jane Smith", semester: 3, enrolledSubjects: ["CS301", "CS302", "HU101"]},
];


export default function CoordinatorDashboardPage() {
  const assignedGroup = "Semester 3 - Computer Science"; 

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-headline font-semibold text-primary">Department Coordinator Dashboard</h1>
            <CardDescription className="mt-1">Managing: {assignedGroup}</CardDescription>
        </div>
        <Button variant="outline"><CalendarDays className="mr-2 h-4 w-4"/> View Academic Calendar</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subject Catalog */}
        <Card className="md:col-span-1 shadow-lg bg-card">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-primary flex items-center"><ListChecks className="mr-2"/>Subject Catalog (Sem 3)</CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
                <Table>
                    <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Name</TableHead><TableHead>CrHr</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {sampleSubjects.map(s => (<TableRow key={s.id}><TableCell>{s.code}</TableCell><TableCell>{s.name}</TableCell><TableCell>{s.creditHours}</TableCell></TableRow>))}
                    </TableBody>
                </Table>
                 <Button variant="outline" size="sm" className="mt-4 w-full">Edit Catalog</Button>
            </CardContent>
        </Card>

        {/* Enrollment Actions */}
        <Card className="md:col-span-2 shadow-lg bg-card">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-primary">Enrollment Management</CardTitle>
                <CardDescription>Enroll or unenroll students for {assignedGroup}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2 p-4 border rounded-lg bg-muted/30 shadow-sm">
                    <h3 className="font-medium text-card-foreground">Individual Enrollment / Unenrollment</h3>
                    <div className="flex gap-2 items-end">
                        <Input placeholder="Enter Student CMS ID..." className="max-w-xs"/>
                        <Button className="bg-primary hover:bg-primary/90"><Search className="mr-2 h-4 w-4"/> Find Student</Button>
                    </div>
                    {/* Placeholder for student details and subject checkboxes once found */}
                </div>
                
                <div className="space-y-2 p-4 border rounded-lg bg-muted/30 shadow-sm">
                    <h3 className="font-medium text-card-foreground">Bulk Semester Group Assignment (Enroll All in {assignedGroup})</h3>
                    <div className="space-y-1 mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {sampleSubjects.map(s => (
                             <div key={`bulk-${s.id}`} className="flex items-center space-x-2 p-2 bg-background rounded-md border">
                                <Checkbox id={`bulk-check-${s.id}`} defaultChecked/>
                                <label htmlFor={`bulk-check-${s.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-card-foreground">
                                    {s.code} - {s.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Users className="mr-2 h-4 w-4"/> Bulk Enroll Selected Subjects
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card className="shadow-lg bg-card">
        <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-primary">Student Subject Mapping Matrix</CardTitle>
            <CardDescription>Overview of subject enrollments for students in {assignedGroup}.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>CMS ID</TableHead>
                        <TableHead>Student Name</TableHead>
                        {sampleSubjects.map(s => <TableHead key={s.id} className="text-center whitespace-nowrap">{s.code}</TableHead>)}
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sampleStudents.map(student => (
                        <TableRow key={student.cmsId}>
                            <TableCell className="whitespace-nowrap">{student.cmsId}</TableCell>
                            <TableCell className="whitespace-nowrap">{student.name}</TableCell>
                            {sampleSubjects.map(subject => (
                                <TableCell key={`${student.cmsId}-${subject.id}`} className="text-center">
                                    {student.enrolledSubjects.includes(subject.id) ? 
                                     <Badge className="bg-green-100 text-green-700 border-green-300">Enrolled</Badge> : 
                                     <Badge variant="outline" className="border-muted-foreground/50 text-muted-foreground">N/A</Badge>
                                    }
                                </TableCell>
                            ))}
                            <TableCell className="whitespace-nowrap"><Button variant="outline" size="sm"><Edit3 className="mr-1 h-3 w-3"/> Manage</Button></TableCell>
                        </TableRow>
                    ))}
                     {sampleStudents.length === 0 && (
                        <TableRow><TableCell colSpan={sampleSubjects.length + 3} className="h-24 text-center text-muted-foreground">No students found in this group.</TableCell></TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
         <CardFooter className="flex justify-end border-t pt-4">
            <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export Matrix (CSV)</Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg bg-card">
        <CardHeader className="pb-3"><CardTitle className="text-xl font-semibold text-primary flex items-center"><CalendarDays className="mr-2"/>Enrollment/Drop Calendar Slots</CardTitle></CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Define and view periods for course enrollment, add/drop, and withdrawals. (Placeholder for form/display)</p>
            {/* Add form or display for calendar slots here */}
            <Button variant="secondary" className="mt-3">Define New Slot</Button>
        </CardContent>
      </Card>
    </div>
  );
}
