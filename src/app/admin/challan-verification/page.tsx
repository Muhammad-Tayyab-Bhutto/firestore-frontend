import { ChallanVerificationList } from "@/components/admin/challan-verification-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Challan Verification - Admin - AdmitPro",
};

export default function AdminChallanVerificationPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-semibold text-primary">Challan Verification</h1>
      <p className="text-muted-foreground">
        Review and verify uploaded paid challan slips. Mark them as approved or rejected.
      </p>
      <ChallanVerificationList />
    </div>
  );
}
