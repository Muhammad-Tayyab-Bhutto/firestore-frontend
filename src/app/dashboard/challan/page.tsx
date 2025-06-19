"use client";

import { ChallanUploadForm } from "@/components/dashboard/challan-upload-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fee Challan - AdmitPro",
};

export default function FeeChallanPage() {
  const handleDownloadChallan = () => {
    // Placeholder for challan generation and download logic
    alert("Challan download functionality is a placeholder.");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-semibold text-primary">Fee Challan Management</h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-primary" />
            Download Your Fee Challan
          </CardTitle>
          <CardDescription>
            If you haven't paid your application fee yet, download your personalized challan form here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Ensure all details on the challan are correct before printing. Payment can be made at any designated bank branch.
          </p>
          <Button onClick={handleDownloadChallan} className="bg-primary hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Download Fee Challan (PDF)
          </Button>
        </CardContent>
      </Card>

      <ChallanUploadForm />
    </div>
  );
}
