"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, FileText, CalendarDays, AlertCircle, UserCheck, Award } from "lucide-react";
import React from "react";

interface StatusItem {
  icon: React.ElementType;
  label: string;
  value: string;
  statusColor?: string; // e.g., 'text-green-500', 'text-yellow-500'
}

interface StatusCardProps {
  title: string;
  description?: string;
  items: StatusItem[];
}

export function StatusCard({ title, description, items }: StatusCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div key={index} className="flex items-center p-4 bg-muted/50 rounded-lg">
              <item.icon className={`h-8 w-8 mr-4 ${item.statusColor || 'text-primary'}`} />
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-lg font-semibold text-card-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Example Usage Data (can be moved to the page component)
export const exampleApplicantStatuses: StatusItem[] = [
  { icon: FileText, label: "Application", value: "Submitted", statusColor: "text-green-500" },
  { icon: UserCheck, label: "Documents", value: "Verified", statusColor: "text-green-500" },
  { icon: CalendarDays, label: "Screening Test", value: "Booked - Oct 25", statusColor: "text-blue-500" },
  { icon: Award, label: "Offer Status", value: "Pending Review", statusColor: "text-yellow-500" },
];
