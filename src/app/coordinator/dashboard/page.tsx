
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, UserPlus, Edit3, Search } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Coordinator Dashboard - AdmitPro",
};

export default function CoordinatorDashboardPage() {
  // Placeholder: Assume Coordinator is for "Semester 3 - CS"
  const assignedGroup = "Semester 3 - Computer Science"; 

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
            <h1 className="text-3xl font-headline font-semibold text-primary">Department Coordinator Dashboard</h1>
            <CardDescription className="mt-1">Managing: {assignedGroup}</CardDescription>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl font-semibold">Subject Enrollment Management</CardTitle>
            <CardDescription>Enroll or unenroll students in subjects for {assignedGroup}. (Placeholder)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex gap-2">
                <Input placeholder="Search Student by CMS ID..." className="max-w-xs"/>
                <Button><Search className="mr-2 h-4 w-4"/> Search Student</Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    <UserPlus className="mr-2 h-4 w-4"/> Enroll Single Student to Subject
                </Button>
                 <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                    <ListChecks className="mr-2 h-4 w-4"/> Bulk Enroll Semester Subjects
                </Button>
                 <Button variant="destructive" className="w-full sm:w-auto">
                    <Edit3 className="mr-2 h-4 w-4"/> Unenroll Student from Subject
                </Button>
            </div>
            <p className="text-sm text-muted-foreground">
                Detailed subject enrollment tables and forms will be available here.
            </p>
        </CardContent>
      </Card>

       <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl font-semibold">View Enrolled Subjects by Student</CardTitle>
            <CardDescription>Check current subject enrollments. (Placeholder)</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Student subject list will appear here after search.</p>
        </CardContent>
      </Card>
    </div>
  );
}
