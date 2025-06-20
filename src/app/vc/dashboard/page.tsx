
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, AlertTriangle, University, FileCheck, TrendingUp } from "lucide-react"; 
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VC Dashboard - AdmitPro",
};

export default function VcDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
            <h1 className="text-3xl font-headline font-semibold text-primary">Vice Chancellor Dashboard</h1>
            <CardDescription className="mt-1">High-level overview of institutional performance and critical alerts.</CardDescription>
        </div>
         {/* Placeholder for date/time or quick actions */}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Student Enrollment</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">10,520</div>
            <p className="text-xs text-muted-foreground">+2.5% from last year</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Academic Programs</CardTitle>
            <University className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Across 5 faculties</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical System Alerts</CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
         <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Research Output</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">120+</div>
            <p className="text-xs text-muted-foreground">Publications this year</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">Key Performance Indicators</CardTitle>
                <CardDescription>Institutional KPIs at a glance (Placeholder).</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
               <BarChart3 className="h-16 w-16 text-muted-foreground" />
               <p className="ml-4 text-muted-foreground">KPI charts will be displayed here.</p>
            </CardContent>
        </Card>
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">Recent Approvals & Policies</CardTitle>
                <CardDescription>Summary of recent high-level decisions.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[200px]">
                 <ul className="space-y-3">
                    {[
                        { text: "New AI Research Grant approved.", time: "2 days ago", icon: FileCheck },
                        { text: "Updated Academic Integrity Policy published.", time: "5 days ago", icon: FileCheck },
                        { text: "Budget allocation for Q4 finalized.", time: "1 week ago", icon: FileCheck },
                    ].map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                        <activity.icon className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                        <div>
                            <p className="text-sm text-card-foreground">{activity.text}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
