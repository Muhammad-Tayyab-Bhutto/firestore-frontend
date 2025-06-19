"use client";
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, Send, FileText } from "lucide-react";
import Image from 'next/image';
import { Logo } from '@/components/icons/logo'; // Assuming a Logo component

interface ApplicationData {
  applicationId: string;
  applicantName: string;
  programName: string;
  admissionSession: string;
  offerValidUntil: string;
  // Add other relevant fields like father's name, address, etc.
}

interface OfferLetterGeneratorProps {
  applicationData: ApplicationData;
}

export function OfferLetterGenerator({ applicationData }: OfferLetterGeneratorProps) {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  const handleDownload = () => {
    alert("Offer letter PDF download functionality is a placeholder. Use browser print (Ctrl/Cmd+P).");
  };

  const handlePrint = () => {
    window.print();
  };
  
  const handleSendEmail = () => {
    alert(`Offer letter email sending for ${applicationData.applicantName} is a placeholder.`);
  };

  // Placeholder for barcode - in a real app, this would be an image generated based on applicationId or a unique token
  const barcodeData = `ID:${applicationData.applicationId};Name:${applicationData.applicantName.replace(/\s/g,'')}`;


  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl print:shadow-none print:border-none">
      <CardHeader className="bg-secondary text-secondary-foreground p-6 rounded-t-lg print:bg-slate-200">
        <div className="flex justify-between items-center">
          <Logo size="sm" />
          <CardTitle className="text-2xl font-headline text-primary">Admission Offer Letter</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-6 text-sm leading-relaxed">
        <div className="flex justify-between items-start">
            <div>
                <p>Date: {currentDate}</p>
                <p>Ref: ADM/{applicationData.admissionSession.substring(0,4)}/{applicationData.applicationId}</p>
            </div>
            <div className="w-28 h-12 bg-muted flex items-center justify-center text-xs text-muted-foreground rounded">
               <Image src={`https://placehold.co/112x48.png?text=Barcode`} alt="Barcode" width={112} height={48} data-ai-hint="code barcode" />
            </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold">{applicationData.applicantName}</p>
          {/* Placeholder address */}
          <p>123 Education Lane,</p>
          <p>Knowledge City, KC 12345</p>
        </div>

        <p className="font-semibold mt-4">Subject: Offer of Admission - {applicationData.programName} ({applicationData.admissionSession})</p>

        <p>Dear {applicationData.applicantName},</p>

        <p>
          We are delighted to inform you that you have been offered provisional admission to the <strong>{applicationData.programName}</strong> program
          at AdmitPro University for the <strong>{applicationData.admissionSession}</strong> session. This offer is a testament to your academic achievements and potential.
        </p>
        
        <p>
          To accept this offer and secure your place, you are required to complete the enrollment formalities and pay the
          prescribed admission fee by <strong>{applicationData.offerValidUntil}</strong>. Details regarding the fee structure and payment
          procedure will be provided in a separate enrollment challan.
        </p>

        <p>
          We congratulate you on your success and look forward to welcoming you to the AdmitPro University community.
          Should you have any queries, please do not hesitate to contact the admissions office.
        </p>

        <div className="mt-8 pt-6 border-t">
          <p className="font-semibold">Sincerely,</p>
          <Image src="https://placehold.co/150x50.png?text=Signature" alt="Signature" width={150} height={50} className="my-2" data-ai-hint="signature document" />
          <p>Director of Admissions</p>
          <p>AdmitPro University</p>
        </div>
        
      </CardContent>
      <CardFooter className="p-6 border-t flex flex-col sm:flex-row justify-end gap-3 print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" /> Print Offer Letter
        </Button>
        <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90">
          <Download className="mr-2 h-4 w-4" /> Download as PDF
        </Button>
         <Button onClick={handleSendEmail} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Send className="mr-2 h-4 w-4" /> Send via Email
        </Button>
      </CardFooter>
    </Card>
  );
}
