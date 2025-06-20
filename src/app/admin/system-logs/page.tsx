
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, Filter, Download, CalendarIcon } from "lucide-react";
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
import { DatePickerWithRange } from "@/components/common/date-range-picker"; // Assuming this component exists or will be created

export const metadata: Metadata = {
  title: "System Logs - Admin - AdmitPro",
};

// Placeholder data
const sampleLogs = [
  { id: "LOG001", timestamp: "2024-08-15 10:30:15", user: "admin@admitpro.edu", action: "Logged In", details: "IP: 192.168.1.10", level: "Info" },
  { id: "LOG002", timestamp: "2024-08-15 10:32:00", user: "admin@admitpro.edu", action: "Updated Program: CS", details: "Changed total seats to 160", level: "Audit" },
  { id: "LOG003", timestamp: "2024-08-15 10:35:20", user: "applicant@example.com", action: "Application Submitted", details: "App ID: APP006", level: "Info" },
  { id: "LOG004", timestamp: "2024-08-15 10:40:00", user: "system", action: "AI Challan Validation", details: "Challan CH008 processed, Confidence: 0.95", level: "System" },
  { id: "LOG005", timestamp: "2024-08-15 10:45:10", user: "admin@admitpro.edu", action: "Merit List Generated", details: "Program: BBA, Session: Fall 2024", level: "Audit" },
  { id: "LOG006", timestamp: "2024-08-15 11:00:00", user: "finance@admitpro.edu", action: "Challan Approved", details: "Challan ID: CH007", level: "Info" },
];

const logLevelColors: Record<string, string> = {
  "Info": "bg-blue-100 text-blue-700",
  "Audit": "bg-purple-100 text-purple-700",
  "Warning": "bg-yellow-100 text-yellow-700",
  "Error": "bg-red-100 text-red-700",
  "System": "bg-gray-100 text-gray-700",
};


export default function AdminSystemLogsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
            <ScrollText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-headline font-semibold text-primary">System Audit Logs</h1>
        </div>
        <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Logs (CSV)
        </Button>
      </div>
      <CardDescription>
        Track all significant actions, system events, and administrative changes for security and auditing purposes.
      </CardDescription>
      
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-xl">Log Entries</CardTitle>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <Input placeholder="Search by user or action..." className="flex-grow sm:flex-grow-0 sm:min-w-[200px] sm:max-w-xs" />
            {/* Replace with actual DatePickerWithRange if available */}
            <Button variant="outline" className="flex-grow sm:flex-grow-0">
                <CalendarIcon className="mr-2 h-4 w-4" /> Filter by Date Range
            </Button>
            <Button variant="outline" size="icon" className="hidden sm:flex"><Filter className="h-4 w-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User/System</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs whitespace-nowrap">{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{log.details}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${logLevelColors[log.level] || 'bg-gray-100 text-gray-700'} border-transparent`}>
                      {log.level}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
               {sampleLogs.length === 0 && (
                 <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No log entries found for the selected criteria.
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

// Minimal DatePickerWithRange for placeholder if not available
// In a real scenario, you'd import this from its actual location
// components/common/date-range-picker.tsx
/*
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: new Date(2024, 0, 20), // Corrected to add(new Date(), { days: 20 })
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
*/
