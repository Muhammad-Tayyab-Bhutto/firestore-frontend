import { StatusTracker } from "@/components/dashboard/status-tracker";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Status - AdmitPro",
};

export default function ApplicationStatusPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-semibold text-primary">Track Your Application Status</h1>
      <p className="text-muted-foreground">
        Stay informed about the progress of your application. Updates will appear here in real-time.
      </p>
      <StatusTracker />
    </div>
  );
}
