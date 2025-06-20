
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Users, BookOpen, CheckSquare, BarChart2, Edit, Bell, ListFilter, Download, MessageCircle, UserCheck } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PlaceholderChart } from "@/components/common/placeholder-chart";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "HOD Dashboard - AdmitPro",
};

export default function HodDashboardPage() {
  const departmentName = "Computer Science"; // Placeholder

  const overviewStats = [
    { title: "Students in Department", value: "350", icon: Users, color: "text-primary" },
    { title: "Courses Offered", value: "25", icon: BookOpen, color: "text-secondary" },
    { title: "Faculty Members", value: "15", icon: Users, color: "text-accent" },
    { title: "Avg. Student Performance", value: "78%", icon: BarChart2, color: "text-green-500" },
  ];
  
  const notifications = [
    { id: "1", text: "Coordinator (CS-Sem3) submitted new subject enrollment requests.", time: "30 mins ago", type: "action"},
    { id: "2", text: "Faculty meeting scheduled for 25th, 10 AM.", time: "2 hours ago", type: "info"},
    { id: "3", text: "Annual department report due next week.", time: "1 day ago", type: "reminder"},
  ];

  return (
    <div className="space-y-8">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
            <h1 className="text-3xl font-headline font-semibold text-primary">HOD Dashboard</h1>
            <CardDescription className="mt-1">Department of {departmentName}</CardDescription>
        </div>
         <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline"><ListFilter className="mr-2 h-4 w-4"/> Filters</Button>
            <Button><Download className="mr-2 h-4 w-4"/> Department Reports</Button>
         </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map(stat => (
          <Card key={stat.title} className="shadow-md hover:shadow-lg transition-shadow bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Curriculum & Enrollment Actions */}
        <Card className="lg:col-span-2 shadow-lg bg-card">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">Curriculum &amp; Enrollment Management</CardTitle>
                <CardDescription>Oversee courses and student enrollments for {departmentName}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Button variant="default" className="w-full"><Edit className="mr-2"/> Manage Courses</Button>
                     <Button variant="secondary" className="w-full"><UserCheck className="mr-2"/> Approve Subject Enrollments</Button>
                </div>
                 <Input placeholder="Search student or course..." className="mt-4"/>
                 <p className="text-sm text-muted-foreground">Detailed student academic performance and enrollment matrices will be available here.</p>
            </CardContent>
             <CardFooter>
                <Button variant="outline">View All Student Records</Button>
            </CardFooter>
        </Card>
        
        {/* Department Notifications */}
         <Card className="shadow-lg bg-card">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary flex items-center"><Bell className="mr-2 h-5 w-5"/>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-72 overflow-y-auto">
                 {notifications.map(notif => (
                    <div key={notif.id} className={`p-3 rounded-md border ${notif.type === 'action' ? 'border-accent/50 bg-accent/10' : 'border-primary/20 bg-primary/5'}`}>
                        <p className="text-sm font-medium text-card-foreground">{notif.text}</p>
                        <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                 ))}
                 {notifications.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No new notifications.</p>}
            </CardContent>
        </Card>
      </div>
      
      <PlaceholderChart title="Student Performance Analytics (Placeholder)" description={`Grade distributions and progression rates for ${departmentName}.`} className="shadow-lg bg-card"/>
      
       <Card className="shadow-lg bg-card">
        <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">Faculty &amp; Coordinator Interaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <Button variant="outline" className="w-full md:w-auto"><MessageCircle className="mr-2"/> Message Department Coordinators</Button>
            <p className="text-sm text-muted-foreground">Faculty performance metrics and communication tools will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
