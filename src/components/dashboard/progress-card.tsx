"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Loader2, AlertTriangle } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Step {
  name: string;
  status: 'completed' | 'pending' | 'current' | 'failed';
  description?: string;
}

interface ProgressCardProps {
  steps: Step[];
  currentProgress: number; // Percentage 0-100
}

export function ProgressCard({ steps, currentProgress: initialProgress }: ProgressCardProps) {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => setProgressValue(initialProgress), 100);
    return () => clearTimeout(timer);
  }, [initialProgress]);

  const getStepIcon = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />;
      case 'current':
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Application Progress</CardTitle>
        <CardDescription>Track your admission journey step by step.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Progress value={progressValue} className="w-full h-3" />
          <p className="text-sm text-muted-foreground mt-2 text-right">{progressValue}% Complete</p>
        </div>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-start p-3 rounded-md ${step.status === 'current' ? 'bg-primary/10 border-l-4 border-primary' : 'bg-muted/50'}`}>
              <div className="mr-3 mt-1 shrink-0">{getStepIcon(step.status)}</div>
              <div>
                <h4 className={`font-semibold ${step.status === 'failed' ? 'text-destructive' : 'text-card-foreground'}`}>{step.name}</h4>
                {step.description && <p className="text-sm text-muted-foreground">{step.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
