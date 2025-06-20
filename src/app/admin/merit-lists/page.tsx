
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListOrdered, PlusCircle, Download, Filter, UploadCloud } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Generate Merit Lists - Admin - AdmitPro",
};

// Placeholder data
const sampleMeritLists = [
  { id: "ML001", program: "B.Sc. Computer Science", session: "Fall 2024", dateGenerated: "2024-08-01", status: "Published", applicants: 150 },
  { id: "ML002", program: "BBA (Hons)", session: "Fall 2024", dateGenerated: "2024-08-02", status: "Draft", applicants: 100 },
];

export default function AdminMeritListsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
            <ListOrdered className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-headline font-semibold text-primary">Merit List Management</h1>
        </div>
        <div className="flex gap-2">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <PlusCircle className="mr-2 h-4 w-4" /> Generate New Merit List
            </Button>
            <Button variant="outline">
                <UploadCloud className="mr-2 h-4 w-4" /> Import Criteria
            </Button>
        </div>
      </div>
      <CardDescription>
        Generate, review, and publish merit lists based on defined criteria, test scores, and program capacities.
      </CardDescription>
      
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-xl">Generated Merit Lists</CardTitle>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input placeholder="Search by program or session..." className="flex-grow sm:flex-grow-0 sm:max-w-xs" />
            <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="hidden sm:flex"><Filter className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>List ID</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Date Generated</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleMeritLists.map((list) => (
                <TableRow key={list.id}>
                  <TableCell className="font-medium">{list.id}</TableCell>
                  <TableCell>{list.program}</TableCell>
                  <TableCell>{list.session}</TableCell>
                  <TableCell>{list.dateGenerated}</TableCell>
                  <TableCell>{list.applicants}</TableCell>
                  <TableCell>
                    <Badge variant={list.status === 'Published' ? 'default' : 'secondary'} className={list.status === 'Published' ? 'bg-green-500 text-white' : ''}>
                      {list.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-1">
                    <Button variant="outline" size="sm">View</Button>
                    {list.status === 'Draft' && <Button variant="default" size="sm">Publish</Button>}
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /><span className="sr-only">Download</span></Button>
                  </TableCell>
                </TableRow>
              ))}
               {sampleMeritLists.length === 0 && (
                 <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                        No merit lists generated yet.
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
