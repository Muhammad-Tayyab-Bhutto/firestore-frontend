"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { validateChallan, type ValidateChallanInput, type ValidateChallanOutput } from "@/ai/flows/challan-validation";
import { Loader2, UploadCloud, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import Image from 'next/image';

export function ChallanUploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidateChallanOutput | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Check if it's an image for preview
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null); // Not an image, or don't preview PDF directly here
      }
      setValidationResult(null); // Reset previous validation result
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a challan slip image or PDF to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setValidationResult(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const challanDataUri = e.target?.result as string;
        if (!challanDataUri) {
          throw new Error("Could not read file.");
        }
        
        const input: ValidateChallanInput = { challanDataUri };
        const result = await validateChallan(input);
        setValidationResult(result);
        toast({
          title: "Validation Complete",
          description: `Challan ${result.isValid ? 'seems valid' : 'needs review'}. Confidence: ${Math.round(result.confidence * 100)}%`,
          variant: result.isValid && !result.flagForAdminApproval ? "default" : "destructive",
        });
      } catch (error) {
        console.error("Validation error:", error);
        toast({
          title: "Validation Failed",
          description: error instanceof Error ? error.message : "An unknown error occurred during challan validation.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      toast({
        title: "File Read Error",
        description: "Could not read the selected file.",
        variant: "destructive",
      });
      setIsLoading(false);
    };
    reader.readAsDataURL(selectedFile);
  };
  
  const renderValidationIcon = () => {
    if (!validationResult) return null;
    if (validationResult.flagForAdminApproval) return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    if (validationResult.isValid) return <CheckCircle className="h-6 w-6 text-green-500" />;
    return <XCircle className="h-6 w-6 text-red-500" />;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Upload Paid Challan Slip</CardTitle>
        <CardDescription>
          Upload an image (JPG, PNG) or PDF of your paid fee challan. Our AI will attempt to validate it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="challanFile" className="text-base">Challan File</Label>
          <Input
            id="challanFile"
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            onChange={handleFileChange}
            className="mt-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
          {filePreview && (
            <div className="mt-4 border rounded-md p-2 flex justify-center max-h-64 overflow-hidden">
              <Image src={filePreview} alt="Challan preview" width={200} height={200} className="object-contain" data-ai-hint="document bank" />
            </div>
          )}
          {selectedFile && !filePreview && <p className="mt-2 text-sm text-muted-foreground">Selected file: {selectedFile.name} ({selectedFile.type})</p>}
        </div>

        {validationResult && (
          <Card className="bg-muted/50">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {renderValidationIcon()}
                <CardTitle className="text-lg">Validation Result</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>Status:</strong> {validationResult.isValid ? 'Valid (provisional)' : 'Potentially Invalid'}</p>
              <p><strong>Confidence:</strong> {Math.round(validationResult.confidence * 100)}%</p>
              <p><strong>Admin Approval Needed:</strong> {validationResult.flagForAdminApproval ? 'Yes' : 'No'}</p>
              {validationResult.extractedData && (
                <div>
                  <h4 className="font-semibold mt-2">Extracted Data:</h4>
                  <ul className="list-disc list-inside pl-2 text-muted-foreground">
                    {validationResult.extractedData.paymentDate && <li>Date: {validationResult.extractedData.paymentDate}</li>}
                    {validationResult.extractedData.amountPaid && <li>Amount: {validationResult.extractedData.amountPaid}</li>}
                    {validationResult.extractedData.bankName && <li>Bank: {validationResult.extractedData.bankName}</li>}
                    {validationResult.extractedData.accountNumber && <li>Account: {validationResult.extractedData.accountNumber}</li>}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isLoading || !selectedFile} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UploadCloud className="mr-2 h-4 w-4" />
          )}
          Upload and Validate
        </Button>
      </CardFooter>
    </Card>
  );
}
