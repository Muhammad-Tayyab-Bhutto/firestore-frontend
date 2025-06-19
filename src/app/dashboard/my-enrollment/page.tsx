
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePenLine, Construction } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Enrollment - AdmitPro",
};

export default function MyEnrollmentPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <FilePenLine className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-headline font-semibold text-primary">My Enrollment</h1>
      </div>
      <CardDescription>
        Manage your semester and summer course enrollments, and view related fee challans.
      </CardDescription>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Enrollment Details</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px] flex flex-col items-center justify-center text-center">
          <Construction className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-muted-foreground">This Page is Under Construction</p>
          <p className="text-sm text-muted-foreground mt-2">
            Information about your current and past enrollments, including summer terms and fee challans, will be displayed here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
