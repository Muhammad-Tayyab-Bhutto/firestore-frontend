
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { DollarSign, Landmark, FileText, TrendingUp, FileCheck2, PlusCircle, Filter, Download, Bell } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PlaceholderChart } from "@/components/common/placeholder-chart";
import Link from "next/link";
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
  title: "Finance Dashboard - AdmitPro",
};

const overviewStats = [
  { title: "Total Revenue (YTD)", value: "$5.2M", icon: DollarSign, trend: "+15%", color:"text-green-500" },
  { title: "Pending Fee Challans", value: "230", icon: FileText, trend: "$45K Value", color:"text-yellow-500" },
  { title: "Verified Payments (Today)", value: "65", icon: FileCheck2, trend: "$12K Received", color:"text-blue-500" },
  { title: "Scholarships Disbursed", value: "$300K", icon: Landmark, trend: "150 Students", color:"text-purple-500" },
];

const recentTransactions = [
    { id: "T001", type: "Admission Fee", amount: 1500, status: "Verified", date: "2024-08-15" },
    { id: "T002", type: "Semester Fee", amount: 25000, status: "Pending", date: "2024-08-15" },
    { id: "T003", type: "Hostel Dues", amount: 5000, status: "Verified", date: "2024-08-14" },
    { id: "T004", type: "Summer Course Fee", amount: 3000, status: "Flagged", date: "2024-08-13" },
];

export default function FinanceDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-headline font-semibold text-primary">Finance Department Portal</h1>
            <CardDescription className="mt-1">Financial overview, fee management, and reporting.</CardDescription>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline"><Filter className="mr-2 h-4 w-4"/> Filters</Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground"><Download className="mr-2 h-4 w-4"/> Export Reports</Button>
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
                <CardTitle className="text-xl font-semibold text-primary">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Link href="/admin/challan-verification" passHref>
                  <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                    <>
                      <FileCheck2 className="mr-2"/> View &amp; Verify Challans
                    </>
                  </Button>
                </Link>
                <Button variant="secondary" className="w-full"><PlusCircle className="mr-2"/> Generate New Challan</Button>
                <Button variant="outline" className="w-full hover:border-destructive hover:text-destructive hover:bg-destructive/10">Flag Payment Issue</Button>
                <Button variant="outline" className="w-full text-teal-600 border-teal-500 hover:bg-teal-50 hover:text-teal-700">Sync with Stripe/Teller</Button>
            </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-2 shadow-lg bg-card">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-primary">Recent Transactions</CardTitle>
                <CardDescription>Latest payment activities.</CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
                <Table>
                    <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Type</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {recentTransactions.map(t => (
                            <TableRow key={t.id}>
                                <TableCell>{t.id}</TableCell>
                                <TableCell>{t.type}</TableCell>
                                <TableCell>${t.amount}</TableCell>
                                <TableCell>
                                    <Badge variant={t.status === "Verified" ? "default" : t.status === "Pending" ? "secondary" : "destructive"}
                                     className={t.status === "Verified" ? "bg-green-100 text-green-700 border-green-300" : t.status === "Pending" ? "bg-yellow-100 text-yellow-700 border-yellow-300" : "bg-red-100 text-red-700 border-red-300"}>
                                        {t.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{t.date}</TableCell>
                            </TableRow>
                        ))}
                         {recentTransactions.length === 0 && (
                            <TableRow><TableCell colSpan={5} className="h-24 text-center text-muted-foreground">No recent transactions.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
             <CardFooter className="border-t pt-4 flex justify-end">
                <Button variant="link" className="text-primary hover:text-primary/80">View All Transactions</Button>
            </CardFooter>
        </Card>
      </div>
      
      <PlaceholderChart title="Fee Collection Trends" description="Monthly fee collection and outstanding payments." className="shadow-lg bg-card"/>
    </div>
  );
}
