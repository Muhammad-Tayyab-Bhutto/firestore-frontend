import { OfferLetterGenerator } from "@/components/admin/offer-letter-generator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Offer Letters - Admin - AdmitPro",
};

export default function AdminOfferLettersPage() {
  // This would typically list applications eligible for offer letters
  // or provide a search/select mechanism.
  // For this example, we'll directly show the generator/preview for a sample.
  const sampleApplicationForOffer = {
    applicationId: "APP003",
    applicantName: "Charlie Brown",
    programName: "Fine Arts",
    admissionSession: "Fall 2024",
    offerValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 30 days from now
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-semibold text-primary">Generate Offer Letters</h1>
      <p className="text-muted-foreground">
        Select an approved application to generate and preview an offer letter.
      </p>
      {/* In a real app, you'd have a list of applications here to select from */}
      {/* For now, directly rendering the generator with sample data */}
      <OfferLetterGenerator applicationData={sampleApplicationForOffer} />
    </div>
  );
}
