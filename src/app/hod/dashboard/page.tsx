
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, CheckSquare, BarChart2, Edit } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "HOD Dashboard - AdmitPro",
};

export default function HodDashboardPage() {
  // Placeholder: Assume HOD is for "Computer Science"
  const departmentName = "Computer Science"; 

  return (
    <div className="space-y-8">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
            <h1 className="text-3xl font-headline font-semibold text-primary">HOD Dashboard</h1>
            <CardDescription className="mt-1">Department of {departmentName}</CardDescription>
        </div>
         <Button variant="outline">View Department Reports</Button>
      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students in Department</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">350</div>
            <p className="text-xs text-muted-foreground">Active students</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Courses Offered</CardTitle>
            <BookOpen className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Faculty Members</CardTitle>
            <Users className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Including 5 PhDs</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl font-semibold">Curriculum Management</CardTitle>
            <CardDescription>Overview and quick actions for {departmentName} curriculum. (Placeholder)</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex flex-col items-center justify-center text-center">
            <Edit className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-2">Curriculum details and management tools will appear here.</p>
            <Button variant="secondary">Manage Courses</Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl font-semibold">Student Performance Analytics</CardTitle>
            <CardDescription>Track overall student performance in {departmentName}. (Placeholder)</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
           <BarChart2 className="h-16 w-16 text-muted-foreground" />
           <p className="ml-4 text-muted-foreground">Departmental analytics will be shown here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
