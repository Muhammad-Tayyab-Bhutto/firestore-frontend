
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCheck2, DollarSign, BookOpenCheck, Briefcase, BarChart3, Activity, FileText, Settings, ScrollText, ListOrdered, Contact, GraduationCap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceholderChart } from "@/components/common/placeholder-chart";

export const metadata: Metadata = {
  title: "Admin Dashboard - AdmitPro",
};

const overviewStats = [
  { title: "Total Applications", value: "1,250", icon: Users, color: "text-primary", bgColor: "bg-primary/10", href: "/admin/applications" },
  { title: "Pending Verification", value: "75", icon: FileCheck2, color: "text-yellow-500", bgColor: "bg-yellow-100", href: "/admin/challan-verification" },
  { title: "Fees Collected", value: "$55,000", icon: DollarSign, color: "text-green-500", bgColor: "bg-green-100", href: "/admin/challan-verification" },
  { title: "Tests Conducted", value: "850", icon: BookOpenCheck, color: "text-teal-500", bgColor: "bg-teal-100", href: "/admin/test-results" },
];

const quickActions = [
 { title: "View All Applications", href: "/admin/applications", icon: Users },
 { title: "Verify Challans", href: "/admin/challan-verification", icon: FileCheck2 },
 { title: "Manage Programs", href: "/admin/programs", icon: GraduationCap },
 { title: "Generate Merit Lists", href: "/admin/merit-lists", icon: ListOrdered },
 { title: "Issue Offer Letters", href: "/admin/offer-letters", icon: FileText },
 { title: "Assign Roll Numbers", href: "/admin/roll-numbers", icon: Contact },
 { title: "Admission Settings", href: "/admin/settings", icon: Settings },
 { title: "View System Logs", href: "/admin/system-logs", icon: ScrollText },
];

const notifications = [
    { id: "1", text: "New batch of 50 applications received for Fall 2024.", time: "10 mins ago", type: "info" },
    { id: "2", text: "AI flagged 3 challans for manual review.", time: "1 hour ago", type: "warning" },
    { id: "3", text: "System maintenance scheduled for tonight at 2 AM.", time: "3 hours ago", type: "alert" },
];


export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-headline font-semibold text-primary">Admin Dashboard</h1>
        <Button variant="outline">Download Summary Report (PDF)</Button>
      </div>
      

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map(stat => (
          <Link href={stat.href} key={stat.title}>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-card-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground pt-1">View Details</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Notifications */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-lg md:col-span-2 bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {quickActions.map(action => (
              <Link href={action.href} key={action.title} className="block p-4 bg-muted/50 hover:bg-muted rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <action.icon className="h-6 w-6 text-primary" />
                  <span className="font-medium text-card-foreground">{action.title}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">Notifications &amp; Alerts</CardTitle>
            <CardDescription>Recent system events and actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {notifications.map((activity) => (
                <li key={activity.id} className="flex items-start gap-3 p-2 rounded-md bg-primary/5 border border-primary/20">
                  <Activity className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-card-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </li>
              ))}
               {notifications.length === 0 && <p className="text-sm text-muted-foreground">No new notifications.</p>}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <PlaceholderChart title="Application Trends (Placeholder)" description="Monthly application submissions and approval rates." className="shadow-lg bg-card"/>

    </div>
  );
}
