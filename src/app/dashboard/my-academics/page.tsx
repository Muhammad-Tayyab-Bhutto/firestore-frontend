
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenText, Construction } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Academics - AdmitPro",
};

export default function MyAcademicsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <BookOpenText className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-headline font-semibold text-primary">My Academics</h1>
      </div>
      <CardDescription>
        View your enrolled courses, grades, CGPA, and academic progress.
      </CardDescription>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Academic Overview</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px] flex flex-col items-center justify-center text-center">
          <Construction className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold text-muted-foreground">This Page is Under Construction</p>
          <p className="text-sm text-muted-foreground mt-2">
            Details about your courses, marks, and CGPA will be available here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
