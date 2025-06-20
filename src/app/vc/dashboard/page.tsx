
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BarChart3, Users, University, FileCheck, TrendingUp, Bell, FileSpreadsheet, MessageSquare, ShieldAlert, Settings2, Activity, Download, ListOrdered } from "lucide-react"; 
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PlaceholderChart } from "@/components/common/placeholder-chart";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "VC Dashboard - AdmitPro University",
};

const overviewStats = [
  { title: "Total Student Enrollment", value: "10,520", icon: Users, trend: "+2.5%", color: "text-primary" },
  { title: "Academic Programs", value: "45", icon: University, trend: "Across 5 Faculties", color: "text-secondary" },
  { title: "Total Applications (Current Cycle)", value: "3,850", icon: FileCheck, trend: "+15% YoY", color: "text-accent" },
  { title: "Research Output (YTD)", value: "120+ Pubs", icon: TrendingUp, trend: "+8% from last year", color: "text-green-500" },
];

const notifications = [
    { id: "1", title: "Policy Action Required", message: "New 'AI Ethics in Research' policy draft awaiting your approval.", time: "2 hours ago", type: "action", href:"#" },
    { id: "2", title: "Budget Review: Q4", message: "Finance department submitted Q4 budget proposal for Faculty of Engineering.", time: "1 day ago", type: "info", href:"#" },
    { id: "3", title: "Critical System Alert", message: "Unusual login activity detected on staff portal. Investigation ongoing.", time: "3 days ago", type: "alert", href:"#" },
];

export default function VcDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-headline font-semibold text-primary">Vice Chancellor's Dashboard</h1>
            <CardDescription className="mt-1">High-level institutional overview and strategic insights.</CardDescription>
        </div>
         <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Download Executive Summary</Button>
      </div>

      {/* Key Metrics Tiles */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map(stat => (
          <Card key={stat.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notifications & Approvals */}
        <Card className="lg:col-span-1 shadow-lg bg-card">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2"><Bell className="h-5 w-5"/>Notifications &amp; Approvals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.map(notif => (
                    <div key={notif.id} className={`p-3 rounded-md border ${notif.type === 'alert' ? 'border-destructive/50 bg-destructive/10 text-destructive-foreground' : notif.type === 'action' ? 'border-accent/50 bg-accent/10 text-accent-foreground' : 'border-primary/20 bg-primary/5 text-primary-foreground'}`}>
                        <div className="flex justify-between items-start">
                            <h5 className={`font-semibold text-sm ${notif.type === 'alert' ? 'text-destructive' : notif.type === 'action' ? 'text-accent' : 'text-card-foreground'}`}>{notif.title}</h5>
                            {notif.type === 'alert' && <ShieldAlert className="h-5 w-5 text-destructive shrink-0"/>}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{notif.message}</p>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-muted-foreground/80">{notif.time}</p>
                            {notif.type === 'action' && <Button size="xs" variant="outline" className="border-accent text-accent hover:bg-accent/20">Review</Button>}
                        </div>
                    </div>
                ))}
                {notifications.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No new notifications.</p>}
            </CardContent>
        </Card>

        {/* Department Summaries Placeholder */}
        <Card className="lg:col-span-2 shadow-lg bg-card">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-primary">Departmental Overview</CardTitle>
                <CardDescription>Key metrics from major departments.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[200px]">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Faculty of Engineering", "School of Business", "Arts & Humanities", "Computing Sciences"].map(dept => (
                        <Card key={dept} className="bg-muted/30 hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2 pt-4">
                                <CardTitle className="text-md text-card-foreground">{dept}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs space-y-1 text-muted-foreground pb-4">
                                <p>Enrollment: {(Math.random()*1000+500).toFixed(0)}</p>
                                <p>Research Grants: ${(Math.random()*500000+100000).toFixed(0)}</p>
                                <Button variant="link" size="xs" className="p-0 h-auto text-primary hover:text-primary/80">View Full Report</Button>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
                 <Button variant="secondary">Access All Department Reports</Button>
            </CardFooter>
        </Card>
      </div>

      <PlaceholderChart title="Institutional Performance Trends" description="Year-over-year comparison of key metrics like enrollment, funding, and graduation rates." className="shadow-lg bg-card"/>

      <Card className="shadow-lg bg-card">
        <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-primary">Strategic Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90"><FileCheck className="mr-2"/> Approve Final Offers</Button>
            <Button variant="secondary" size="lg" className="w-full"><ListOrdered className="mr-2"/> Publish Merit Lists</Button>
            <Button variant="outline" size="lg" className="w-full hover:bg-accent/10 hover:border-accent hover:text-accent"><MessageSquare className="mr-2"/> Broadcast Global Alert</Button>
        </CardContent>
      </Card>
    </div>
  );
}
