import { DocumentUploader } from "@/components/dashboard/document-uploader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Documents - AdmitPro",
};

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-semibold text-primary">Upload Documents</h1>
      <p className="text-muted-foreground">
        Please upload the required documents in PDF or Image format. Ensure clarity and correctness.
      </p>
      <DocumentUploader />
    </div>
  );
}
