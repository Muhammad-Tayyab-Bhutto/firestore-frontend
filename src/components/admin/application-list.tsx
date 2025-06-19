"use client";
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Filter, ArrowUpDown, Eye, Edit3, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ApplicationStatus = "Pending" | "Under Review" | "Approved" | "Rejected" | "Interview Scheduled";
interface Application {
  id: string;
  applicantName: string;
  program: string;
  submissionDate: string;
  status: ApplicationStatus;
  cnic: string;
}

const placeholderApplications: Application[] = [
  { id: "APP001", applicantName: "Alice Wonderland", program: "Computer Science", submissionDate: "2024-07-15", status: "Under Review", cnic: "12345-1234567-1" },
  { id: "APP002", applicantName: "Bob The Builder", program: "Business Administration", submissionDate: "2024-07-16", status: "Pending", cnic: "23456-2345678-2" },
  { id: "APP003", applicantName: "Charlie Brown", program: "Fine Arts", submissionDate: "2024-07-14", status: "Approved", cnic: "34567-3456789-3" },
  { id: "APP004", applicantName: "Diana Prince", program: "Engineering", submissionDate: "2024-07-18", status: "Rejected", cnic: "45678-4567890-4" },
  { id: "APP005", applicantName: "Edward Scissorhands", program: "Computer Science", submissionDate: "2024-07-19", status: "Interview Scheduled", cnic: "56789-5678901-5" },
];

const statusColors: Record<ApplicationStatus, string> = {
  "Pending": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "Under Review": "bg-blue-100 text-blue-700 border-blue-300",
  "Approved": "bg-green-100 text-green-700 border-green-300",
  "Rejected": "bg-red-100 text-red-700 border-red-300",
  "Interview Scheduled": "bg-purple-100 text-purple-700 border-purple-300",
};

export function ApplicationList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "All">("All");
  const [sortBy, setSortBy] = useState<{ key: keyof Application; order: "asc" | "desc" }>({ key: "submissionDate", order: "desc" });

  const filteredApplications = useMemo(() => {
    return placeholderApplications
      .filter(app => 
        (app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || app.cnic.includes(searchTerm)) &&
        (statusFilter === "All" || app.status === statusFilter)
      )
      .sort((a, b) => {
        if (a[sortBy.key] < b[sortBy.key]) return sortBy.order === "asc" ? -1 : 1;
        if (a[sortBy.key] > b[sortBy.key]) return sortBy.order === "asc" ? 1 : -1;
        return 0;
      });
  }, [searchTerm, statusFilter, sortBy]);

  const handleSort = (key: keyof Application) => {
    setSortBy(prev => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };
  
  const SortableHeader = ({ columnKey, label }: { columnKey: keyof Application; label: string }) => (
    <TableHead onClick={() => handleSort(columnKey)} className="cursor-pointer hover:bg-muted/50">
      <div className="flex items-center gap-1">
        {label}
        {sortBy.key === columnKey && <ArrowUpDown className={`h-3 w-3 ${sortBy.order === "desc" ? "rotate-180" : "" }`} />}
      </div>
    </TableHead>
  );


  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-4 bg-card rounded-lg shadow">
        <Input 
          placeholder="Search by name or CNIC..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2 items-center">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ApplicationStatus | "All")}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    {Object.keys(statusColors).map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>

      <Card className="shadow-lg">
      <TableHeader className="bg-muted/50 rounded-t-lg sr-only"> {/* Hidden header for structure, actual headers in table */}
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Applicant Name</TableHead>
            <TableHead>CNIC</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <SortableHeader columnKey="id" label="App ID" />
              <SortableHeader columnKey="applicantName" label="Applicant Name" />
              <SortableHeader columnKey="cnic" label="CNIC" />
              <SortableHeader columnKey="program" label="Program" />
              <SortableHeader columnKey="submissionDate" label="Submission Date" />
              <SortableHeader columnKey="status" label="Status" />
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length > 0 ? filteredApplications.map((app) => (
              <TableRow key={app.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{app.id}</TableCell>
                <TableCell>{app.applicantName}</TableCell>
                <TableCell>{app.cnic}</TableCell>
                <TableCell>{app.program}</TableCell>
                <TableCell>{new Date(app.submissionDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${statusColors[app.status]} text-xs`}>{app.status}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View Details</DropdownMenuItem>
                      <DropdownMenuItem><Edit3 className="mr-2 h-4 w-4" /> Update Status</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Application
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                        No applications found matching your criteria.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </Card>
      {/* Pagination (Placeholder) */}
      <div className="flex justify-center items-center space-x-2 pt-4">
          <Button variant="outline" size="sm">Previous</Button>
          <span className="text-sm text-muted-foreground">Page 1 of 10</span>
          <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  );
}
