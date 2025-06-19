import { TestBookingCalendar } from "@/components/dashboard/test-booking-calendar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Screening Test - AdmitPro",
};

export default function TestBookingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-semibold text-primary">Book Your Screening Test Slot</h1>
      <p className="text-muted-foreground">
        Select an available date and time for your screening test. Ensure you are available for the chosen slot.
      </p>
      <TestBookingCalendar />
    </div>
  );
}
