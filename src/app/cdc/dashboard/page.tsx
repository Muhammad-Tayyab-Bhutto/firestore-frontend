
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Briefcase, CalendarCheck, Users, Building, PlusCircle, Bell, ListFilter, Download, Mail, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceholderChart } from "@/components/common/placeholder-chart";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export const metadata: Metadata = {
  title: "CDC Dashboard - AdmitPro University",
};

const overviewStats = [
  { title: "Upcoming Career Fairs", value: "2", icon: CalendarCheck, trend: "Next Month", color: "text-primary" },
  { title: "Registered Companies", value: "150+", icon: Building, trend: "Placement Partners", color: "text-secondary" },
  { title: "Active Job Postings", value: "45", icon: Briefcase, trend: "+5 this week", color: "text-accent" },
  { title: "Students Placed (YTD)", value: "250", icon: Users, trend: "75% of Graduates", color: "text-green-500" },
];

const recentPostings = [
    { id: "JOB001", title: "Software Engineer Intern", company: "Tech Solutions Inc.", type: "Internship", status: "Open", date: "2024-08-10" },
    { id: "JOB002", title: "Marketing Analyst", company: "MarketPro LLC", type: "Full-time", status: "Open", date: "2024-08-12" },
    { id: "JOB003", title: "Data Scientist", company: "Innovate AI", type: "Full-time", status: "Closed", date: "2024-08-05" },
];


export default function CdcDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-headline font-semibold text-primary">Career Development Center</h1>
            <CardDescription className="mt-1">Facilitating student career growth and industry connections.</CardDescription>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline"><ListFilter className="mr-2 h-4 w-4"/> Filters</Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground"><Download className="mr-2 h-4 w-4"/> Export Data</Button>
        </div>
      </div>

      {/* Key Metrics */}
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
        {/* Actions */}
        <Card className="lg:col-span-1 shadow-lg bg-card">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-primary">CDC Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90"><PlusCircle className="mr-2"/> Publish Job/Internship</Button>
                <Button variant="secondary" className="w-full"><CalendarCheck className="mr-2"/> Schedule Career Fair</Button>
                <Button variant="outline" className="w-full"><Users className="mr-2"/> Assign Counselors</Button>
                <Button variant="outline" className="w-full"><Mail className="mr-2"/> Notify Students</Button>
            </CardContent>
        </Card>

        {/* Recent Job Postings */}
        <Card className="lg:col-span-2 shadow-lg bg-card">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-primary">Recent Job Postings</CardTitle>
                <CardDescription>Latest opportunities for students.</CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
                <Table>
                    <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Company</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {recentPostings.map(p => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">{p.title}</TableCell>
                                <TableCell>{p.company}</TableCell>
                                <TableCell><Badge variant="outline" className="border-secondary text-secondary">{p.type}</Badge></TableCell>
                                <TableCell>
                                    <Badge className={p.status === "Open" ? "bg-green-100 text-green-700 border-green-300" : "bg-muted text-muted-foreground"}>{p.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                         {recentPostings.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No recent job postings.</p>}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
                <Button variant="link" className="text-primary hover:text-primary/80">View All Postings</Button>
            </CardFooter>
        </Card>
      </div>
      
      <PlaceholderChart title="Student Placement Trends" description="Tracking placement rates by department and company engagement." className="shadow-lg bg-card"/>
      
      <Card className="shadow-lg bg-card">
        <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-primary">Track Graduating Students &amp; Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <Input placeholder="Search graduating student by name or CMS ID..." />
            <Button variant="outline" className="w-full md:w-auto hover:bg-primary/5 hover:text-primary"><TrendingUp className="mr-2"/> View Employment Status Feedback</Button>
            <p className="text-sm text-muted-foreground">Detailed tracking and feedback forms will be available here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
