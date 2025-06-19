"use client";
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, AlertCircle, FileText, DollarSign, CalendarCheck2, Award, UserCheck } from "lucide-react";

interface StatusEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'in-progress' | 'rejected';
  icon: React.ElementType;
}

const exampleStatusEvents: StatusEvent[] = [
  { 
    id: '1', 
    title: 'Application Submitted', 
    description: 'Your application for the B.Sc. Computer Science program has been successfully submitted.', 
    timestamp: 'October 15, 2023, 10:30 AM', 
    status: 'completed',
    icon: FileText,
  },
  { 
    id: '2', 
    title: 'Documents Verification', 
    description: 'Your uploaded documents are currently under review by the verification team.', 
    timestamp: 'October 16, 2023, 02:00 PM', 
    status: 'in-progress',
    icon: UserCheck,
  },
  { 
    id: '3', 
    title: 'Fee Challan Paid', 
    description: 'Your fee payment has been confirmed.', 
    timestamp: 'October 17, 2023, 11:00 AM', 
    status: 'completed',
    icon: DollarSign,
  },
  { 
    id: '4', 
    title: 'Screening Test Scheduled', 
    description: 'Your screening test is scheduled for October 25, 2023, at 09:00 AM. Admit card available.', 
    timestamp: 'October 18, 2023, 04:15 PM', 
    status: 'completed',
    icon: CalendarCheck2,
  },
   { 
    id: '5', 
    title: 'Admission Decision', 
    description: 'The admission committee is reviewing applications. Decisions will be announced soon.', 
    timestamp: 'Ongoing', 
    status: 'pending',
    icon: Award,
  },
];


export function StatusTracker() {
  const getStatusColor = (status: StatusEvent['status']) => {
    switch (status) {
      case 'completed': return 'border-green-500 text-green-500';
      case 'in-progress': return 'border-blue-500 text-blue-500';
      case 'pending': return 'border-yellow-500 text-yellow-500';
      case 'rejected': return 'border-red-500 text-red-500';
      default: return 'border-muted-foreground text-muted-foreground';
    }
  };

  const getStatusIcon = (status: StatusEvent['status'], IconComponent: React.ElementType) => {
    if (status === 'in-progress' || status === 'pending') {
      return <Loader2 className={`h-5 w-5 animate-spin ${getStatusColor(status).split(' ')[1]}`} />;
    }
    return <IconComponent className={`h-5 w-5 ${getStatusColor(status).split(' ')[1]}`} />;
  };


  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Application Timeline</CardTitle>
        <CardDescription>Follow each step of your admission process.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          {exampleStatusEvents.map((event, index) => (
            <div key={event.id} className="relative mb-8">
              <div className={`absolute left-[-6px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 ${getStatusColor(event.status)}`}>
                {getStatusIcon(event.status, event.icon)}
              </div>
              <div className="ml-10 p-4 bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-lg text-card-foreground">{event.title}</h4>
                <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                <p className="text-xs text-muted-foreground/80">{event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
