import { ApplicationForm } from "@/components/dashboard/application-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply Now - AdmitPro",
};

export default function ApplyPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-semibold text-primary">Application Form</h1>
      <ApplicationForm />
    </div>
  );
}
