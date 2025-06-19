
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardList, ListFilter, Download, Eye } from "lucide-react";
import { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata: Metadata = {
  title: "View Test Results - Admin - AdmitPro",
};

// Placeholder data - in a real app, this would come from a database
const testResults = [
  { id: "TR001", studentName: "Alice Wonderland", appId: "APP001", score: 85, status: "Passed", proctoringStatus: "Clear", date: "2024-10-25" },
  { id: "TR002", studentName: "Bob The Builder", appId: "APP002", score: 45, status: "Failed", proctoringStatus: "Clear", date: "2024-10-25" },
  { id: "TR003", studentName: "Charlie Brown", appId: "APP003", score: 70, status: "Passed", proctoringStatus: "Copied - Tab Switch", date: "2024-10-26" },
  { id: "TR004", studentName: "Diana Prince", appId: "APP004", score: 60, status: "Passed", proctoringStatus: "Clear", date: "2024-10-26" },
  { id: "TR005", studentName: "Edward Scissorhands", appId: "APP005", score: 30, status: "Failed", proctoringStatus: "Copied - Fullscreen Exit", date: "2024-10-27" },
];

export default function AdminTestResultsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-headline font-semibold text-primary">Student Test Results</h1>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><ListFilter className="mr-2 h-4 w-4" /> Filters</Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground"><Download className="mr-2 h-4 w-4" /> Export Results</Button>
        </div>
      </div>
      <CardDescription>
        Review test scores, pass/fail status, and any proctoring flags for submitted online screening tests.
      </CardDescription>
      
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl">Test Submissions</CardTitle>
          <div className="flex items-center gap-2">
            <Input placeholder="Search by student or App ID..." className="max-w-xs" />
             <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="passed">Passed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="copied">Copied</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>App ID</TableHead>
                <TableHead>Score (%)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Proctoring</TableHead>
                <TableHead>Test Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.studentName}</TableCell>
                  <TableCell>{result.appId}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell>
                    <Badge 
                        variant={result.status === 'Passed' ? 'default' : 'destructive'} 
                        className={result.status === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {result.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                     <Badge 
                        variant={result.proctoringStatus.startsWith('Copied') ? 'destructive' : 'default'}
                        className={result.proctoringStatus.startsWith('Copied') ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-blue-100 text-blue-700 border-blue-300'}>
                        {result.proctoringStatus}
                     </Badge>
                  </TableCell>
                  <TableCell>{result.date}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
               {testResults.length === 0 && (
                 <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                        No test results found.
                    </TableCell>
                 </TableRow>
               )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <span className="mx-4 text-sm text-muted-foreground">Page 1 of 1</span>
            <Button variant="outline" size="sm" disabled>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
