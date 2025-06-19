"use client";
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import Image from 'next/image';
import { Logo } from '../icons/logo'; // Assuming you have a Logo component

interface AdmitCardData {
  applicantName: string;
  rollNumber: string;
  programName: string;
  testDate: string;
  testTime: string;
  testCenter: string;
  photoUrl: string;
  qrCodeData: string; // Data to be encoded in QR, actual QR generation is complex
  instructions: string[];
}

interface AdmitCardDisplayProps {
  data: AdmitCardData;
}

export function AdmitCardDisplay({ data }: AdmitCardDisplayProps) {
  const handleDownload = () => {
    // Placeholder for PDF download logic
    alert("Admit card download functionality is a placeholder. Use browser print (Ctrl/Cmd+P).");
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl print:shadow-none print:border-none">
      <CardHeader className="bg-primary text-primary-foreground p-6 rounded-t-lg print:bg-slate-800">
        <div className="flex justify-between items-center">
          <Logo size="sm" className="text-primary-foreground filter brightness-0 invert" />
          <CardTitle className="text-2xl font-headline">Screening Test Admit Card</CardTitle>
        </div>
        <CardDescription className="text-primary-foreground/80">
          Session: Fall 2024 (Example)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-6 items-start">
          <div className="col-span-2 space-y-3">
            <DataItem label="Applicant Name" value={data.applicantName} />
            <DataItem label="Roll Number" value={data.rollNumber} highlight />
            <DataItem label="Program Applied For" value={data.programName} />
          </div>
          <div className="col-span-1 flex flex-col items-center">
            <Image 
              src={data.photoUrl} 
              alt="Applicant Photo" 
              width={120} 
              height={150} 
              className="border-2 border-primary rounded object-cover shadow-md"
              data-ai-hint="person portrait"
            />
             <div className="mt-2 text-xs text-center text-muted-foreground">Applicant's Photograph</div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-primary mb-2">Test Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DataItem label="Test Date" value={data.testDate} />
            <DataItem label="Test Time" value={data.testTime} />
            <DataItem label="Test Center & Address" value={data.testCenter} fullWidth />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-primary mb-2">Instructions for Candidate</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {data.instructions.map((inst, index) => (
              <li key={index}>{inst}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-between items-center border-t pt-4 mt-6">
            <div className="text-left">
                <p className="text-xs text-muted-foreground">Controller of Examinations (Placeholder)</p>
                <p className="text-sm font-semibold">AdmitPro University</p>
            </div>
            <div className="w-24 h-24 bg-muted flex items-center justify-center text-xs text-muted-foreground rounded">
              {/* Placeholder for QR Code */}
              <Image src={`https://placehold.co/96x96.png?text=QR+Code`} alt="QR Code" width={96} height={96} data-ai-hint="code barcode" />
            </div>
        </div>

      </CardContent>
      <CardFooter className="p-6 border-t flex flex-col sm:flex-row justify-end gap-3 print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" /> Print Admit Card
        </Button>
        <Button onClick={handleDownload} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Download className="mr-2 h-4 w-4" /> Download as PDF
        </Button>
      </CardFooter>
    </Card>
  );
}

const DataItem = ({ label, value, highlight = false, fullWidth = false }: { label: string, value: string, highlight?: boolean, fullWidth?: boolean }) => (
  <div className={fullWidth ? "col-span-full" : ""}>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={`text-sm font-semibold ${highlight ? 'text-primary text-base' : 'text-card-foreground'}`}>{value}</p>
  </div>
);
