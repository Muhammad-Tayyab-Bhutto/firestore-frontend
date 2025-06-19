import { ProgressCard } from "@/components/dashboard/progress-card";
import { NotificationsCard } from "@/components/dashboard/notifications-card";
import { StatusCard, exampleApplicantStatuses } from "@/components/dashboard/status-card";
import { Metadata } from "next";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";

export const metadata: Metadata = {
  title: "Applicant Dashboard - AdmitPro",
};

// Placeholder data for demonstration
const applicationSteps = [
  { name: "Account Registration", status: "completed" as const, description: "Your account is set up." },
  { name: "Application Form", status: "completed" as const, description: "Personal and academic details submitted." },
  { name: "Document Upload", status: "current" as const, description: "Awaiting verification of uploaded documents." },
  { name: "Fee Challan Payment", status: "pending" as const, description: "Generate and pay your fee challan." },
  { name: "Screening Test Booking", status: "pending" as const, description: "Select your preferred test date and center." },
  { name: "Admit Card", status: "pending" as const, description: "Download after test booking." },
  { name: "Offer Letter", status: "pending" as const, description: "Awaiting admission decision." },
];

const currentProgress = 40; // Example progress

const userNotifications = [
  { id: "1", title: "Welcome to AdmitPro!", message: "Your registration is complete. Please proceed to fill your application form.", type: "success" as const, timestamp: "2 days ago", read: false },
  { id: "2", title: "Application Submitted", message: "Your application for Computer Science has been submitted successfully.", type: "info" as const, timestamp: "1 day ago", read: true },
  { id: "3", title: "Document Reminder", message: "Please upload your academic transcripts by tomorrow.", type: "warning" as const, timestamp: "10 hours ago", read: false },
];


export default function ApplicantDashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeBanner userName="Applicant" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProgressCard steps={applicationSteps} currentProgress={currentProgress} />
        </div>
        <div className="lg:col-span-1">
          <NotificationsCard notifications={userNotifications} />
        </div>
      </div>
      <div>
        <StatusCard title="Quick Status Overview" items={exampleApplicantStatuses} />
      </div>
    </div>
  );
}
