
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, Construction } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & Support - AdmitPro",
};

export default function MySupportPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <LifeBuoy className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-headline font-semibold text-primary">Help & Support</h1>
      </div>
      <CardDescription>
        Create and track support tickets, or find answers in our FAQ.
      </CardDescription>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Support Center</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px] flex flex-col items-center justify-center text-center">
          <Construction className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-muted-foreground">This Page is Under Construction</p>
          <p className="text-sm text-muted-foreground mt-2">
            Our help and support ticketing system will be available here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
