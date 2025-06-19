import { ApplicationList } from "@/components/admin/application-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Applications - Admin - AdmitPro",
};

export default function AdminApplicationsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-semibold text-primary">All Applications</h1>
      <p className="text-muted-foreground">
        View, filter, and manage all submitted applications.
      </p>
      <ApplicationList />
    </div>
  );
}
