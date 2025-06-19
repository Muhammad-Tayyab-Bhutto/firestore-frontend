import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCheck2, DollarSign, BookOpenCheck, Briefcase, BarChart3, Activity } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard - AdmitPro",
};

const overviewStats = [
  { title: "Total Applications", value: "1,250", icon: Users, color: "text-blue-500", bgColor: "bg-blue-100", href: "/admin/applications" },
  { title: "Pending Verification", value: "75", icon: FileCheck2, color: "text-yellow-500", bgColor: "bg-yellow-100", href: "/admin/challan-verification" },
  { title: "Fees Collected", value: "$55,000", icon: DollarSign, color: "text-green-500", bgColor: "bg-green-100", href: "/admin/challan-verification" },
  { title: "Tests Conducted", value: "850", icon: BookOpenCheck, color: "text-purple-500", bgColor: "bg-purple-100", href: "/admin/test-centers" },
];

const quickActions = [
 { title: "View All Applications", href: "/admin/applications", icon: Users },
 { title: "Verify Challans", href: "/admin/challan-verification", icon: FileCheck2 },
 { title: "Manage Test Centers", href: "/admin/test-centers", icon: Briefcase },
 { title: "Generate Offer Letters", href: "/admin/offer-letters", icon: FileText },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-semibold text-primary">Admin Dashboard</h1>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map(stat => (
          <Link href={stat.href} key={stat.title}>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
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

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
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

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary">Recent Activity</CardTitle>
            <CardDescription>Latest system events and actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {/* Placeholder Activity Items */}
              {[
                { text: "New application received from John Doe.", time: "5 mins ago" },
                { text: "Challan #1203 verified by Finance Officer.", time: "15 mins ago" },
                { text: "Test slot booked for Application #AP2024005.", time: "1 hour ago" },
                { text: "Offer letter generated for Jane Smith.", time: "3 hours ago" },
              ].map((activity, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
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
      
      {/* Placeholder for Charts/Analytics */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">Application Analytics</CardTitle>
          <CardDescription>Overview of application trends (Placeholder).</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
           <BarChart3 className="h-16 w-16 text-muted-foreground" />
           <p className="ml-4 text-muted-foreground">Analytics chart will be displayed here.</p>
        </CardContent>
      </Card>

    </div>
  );
}
