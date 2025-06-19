import { AdmitCardDisplay } from "@/components/dashboard/admit-card-display";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Admit Card - AdmitPro",
};

export default function AdmitCardPage() {
  // Placeholder data - in a real app, this would be fetched based on user's application
  const admitCardData = {
    applicantName: "John Doe",
    rollNumber: "AP2024CS00123",
    programName: "B.Sc. Computer Science",
    testDate: "October 25, 2024",
    testTime: "09:00 AM - 11:00 AM",
    testCenter: "Main Campus Test Center, Hall B, Seat 42",
    photoUrl: "https://placehold.co/150x180.png",
    qrCodeData: "Roll:AP2024CS00123;Name:JohnDoe;Date:2024-10-25", // Data for QR code
    instructions: [
      "Bring this admit card and original CNIC.",
      "Reach the test center 30 minutes before the test time.",
      "No electronic devices (mobiles, calculators etc.) are allowed.",
      "Follow all instructions given by the invigilator.",
    ],
  };

  const isAdmitCardReady = true; // Simulate if admit card is ready

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-semibold text-primary">Your Admit Card</h1>
      {isAdmitCardReady ? (
        <AdmitCardDisplay data={admitCardData} />
      ) : (
        <div className="text-center py-12 bg-card rounded-lg shadow-md">
          <p className="text-xl text-muted-foreground">Your admit card is not yet available.</p>
          <p className="text-sm text-muted-foreground mt-2">Please complete your test booking or check back later.</p>
        </div>
      )}
    </div>
  );
}
