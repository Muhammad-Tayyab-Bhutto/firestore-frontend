
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, CheckCircle, XCircle, Eye, AlertTriangle, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ChallanStatus = "Pending" | "Approved" | "Rejected" | "Flagged";
interface Challan {
  id: string;
  applicationId: string;
  applicantName: string;
  uploadDate: string;
  status: ChallanStatus;
  challanImageUrl: string; // URL to the uploaded image/PDF
  amount: number;
  aiConfidence?: number; // 0-1
  aiFlagged?: boolean;
}

const placeholderChallans: Challan[] = [
  { id: "CH001", applicationId: "APP001", applicantName: "Alice Wonderland", uploadDate: "2024-07-18", status: "Pending", challanImageUrl: "https://placehold.co/400x600.png", amount: 1500, aiConfidence: 0.92, aiFlagged: false },
  { id: "CH002", applicationId: "APP002", applicantName: "Bob The Builder", uploadDate: "2024-07-19", status: "Pending", challanImageUrl: "https://placehold.co/400x600.png", amount: 2000, aiConfidence: 0.65, aiFlagged: true },
  { id: "CH003", applicationId: "APP003", applicantName: "Charlie Brown", uploadDate: "2024-07-17", status: "Approved", challanImageUrl: "https://placehold.co/400x600.png", amount: 1500 },
  { id: "CH004", applicationId: "APP004", applicantName: "Diana Prince", uploadDate: "2024-07-20", status: "Rejected", challanImageUrl: "https://placehold.co/400x600.png", amount: 1000 },
  { id: "CH005", applicationId: "APP005", applicantName: "Edward Scissorhands", uploadDate: "2024-07-21", status: "Flagged", challanImageUrl: "https://placehold.co/400x600.png", amount: 1500, aiConfidence: 0.78, aiFlagged: true },
];

const statusColors: Record<ChallanStatus, string> = {
  "Pending": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "Approved": "bg-green-100 text-green-700 border-green-300",
  "Rejected": "bg-red-100 text-red-700 border-red-300",
  "Flagged": "bg-orange-100 text-orange-700 border-orange-300",
};


export function ChallanVerificationList() {
  const [challans, setChallans] = useState<Challan[]>(placeholderChallans);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ChallanStatus | "All">("All");
  const [viewingChallan, setViewingChallan] = useState<Challan | null>(null);
  const { toast } = useToast();

  const filteredChallans = useMemo(() => {
    return challans.filter(challan =>
      (challan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || challan.applicationId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || challan.status === statusFilter)
    ).sort((a,b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  }, [challans, searchTerm, statusFilter]);

  const updateChallanStatus = (challanId: string, newStatus: ChallanStatus) => {
    setChallans(prev => prev.map(c => c.id === challanId ? { ...c, status: newStatus } : c));
    toast({ title: `Challan ${challanId} status updated to ${newStatus}.` });
  };
  
  return (
    <div className="space-y-4">
       <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-4 bg-card rounded-lg shadow">
        <Input 
          placeholder="Search by name or App ID..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2 items-center">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ChallanStatus | "All")}>
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
         <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Challan ID</TableHead>
              <TableHead>App ID</TableHead>
              <TableHead>Applicant Name</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>AI Insights</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChallans.length > 0 ? filteredChallans.map((challan) => (
              <TableRow key={challan.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{challan.id}</TableCell>
                <TableCell>{challan.applicationId}</TableCell>
                <TableCell>{challan.applicantName}</TableCell>
                <TableCell>{new Date(challan.uploadDate).toLocaleDateString()}</TableCell>
                <TableCell>${challan.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${statusColors[challan.status]} text-xs`}>{challan.status}</Badge>
                </TableCell>
                <TableCell>
                  {challan.aiConfidence !== undefined && (
                    <div className="flex items-center gap-1 text-xs">
                      {challan.aiFlagged && <AlertTriangle className="h-4 w-4 text-orange-500" title="AI Flagged for Review" />}
                      <span>Conf: {(challan.aiConfidence * 100).toFixed(0)}%</span>
                    </div>
                  )}
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
                      <DropdownMenuItem onClick={() => setViewingChallan(challan)}>
                        <Eye className="mr-2 h-4 w-4" /> View Challan
                      </DropdownMenuItem>
                      {challan.status !== "Approved" && 
                        <DropdownMenuItem onClick={() => updateChallanStatus(challan.id, "Approved")} className="text-green-600 focus:text-green-700 focus:bg-green-50">
                          <CheckCircle className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                      }
                      {challan.status !== "Rejected" &&
                        <DropdownMenuItem onClick={() => updateChallanStatus(challan.id, "Rejected")} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                          <XCircle className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                      }
                       {challan.status !== "Flagged" && challan.aiFlagged &&
                        <DropdownMenuItem onClick={() => updateChallanStatus(challan.id, "Flagged")} className="text-orange-600 focus:text-orange-700 focus:bg-orange-50">
                          <AlertTriangle className="mr-2 h-4 w-4" /> Flag for Review
                        </DropdownMenuItem>
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
                 <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                        No challans found matching your criteria.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </Card>
      
      {viewingChallan && (
        <AlertDialog open={!!viewingChallan} onOpenChange={() => setViewingChallan(null)}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>View Challan - {viewingChallan.id}</AlertDialogTitle>
              <AlertDialogDescription>
                Applicant: {viewingChallan.applicantName} (App ID: {viewingChallan.applicationId})
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="my-4 max-h-[60vh] overflow-y-auto flex justify-center items-center bg-muted rounded-md">
              <Image src={viewingChallan.challanImageUrl} alt={`Challan for ${viewingChallan.applicantName}`} width={400} height={600} className="object-contain" data-ai-hint="document bank" />
            </div>
             <div className="text-sm">
                <p><strong>Amount:</strong> ${viewingChallan.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> <Badge variant="outline" className={`${statusColors[viewingChallan.status]} text-xs`}>{viewingChallan.status}</Badge></p>
                {viewingChallan.aiConfidence !== undefined && <p><strong>AI Confidence:</strong> {(viewingChallan.aiConfidence * 100).toFixed(0)}%</p>}
                {viewingChallan.aiFlagged !== undefined && <p><strong>AI Flagged:</strong> {viewingChallan.aiFlagged ? 'Yes' : 'No'}</p>}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              {viewingChallan.status !== "Approved" && (
                <AlertDialogAction onClick={() => { updateChallanStatus(viewingChallan.id, "Approved"); setViewingChallan(null); }} className="bg-green-600 hover:bg-green-700 text-white">
                  Approve
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

