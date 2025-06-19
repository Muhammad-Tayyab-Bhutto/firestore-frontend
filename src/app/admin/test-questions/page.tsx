
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Edit, Trash2, ListChecks, Save } from "lucide-react";
import { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Manage Test Questions - Admin - AdmitPro",
};

// Placeholder data for questions - in a real app, this would come from a database
const sampleQuestions = [
  { id: "Q001", text: "What is the capital of France?", type: "MCQ", options: ["Berlin", "Madrid", "Paris", "Rome"], correctAnswer: "Paris" },
  { id: "Q002", text: "Explain the theory of relativity.", type: "Text", correctAnswer: null },
  { id: "Q003", text: "Is water a compound?", type: "True/False", options: ["True", "False"], correctAnswer: "True" },
];

export default function AdminTestQuestionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <ListChecks className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-headline font-semibold text-primary">Manage Test Questions & Instructions</h1>
      </div>
      <CardDescription>
        Define test instructions, create, edit, and manage the question bank for online screening tests.
      </CardDescription>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Test Instructions</CardTitle>
          <CardDescription>Provide overall instructions that will be displayed to applicants before they start the test.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Enter test instructions here... e.g., 'This test consists of 3 sections. You will have 90 minutes to complete it...'" 
            rows={8}
            defaultValue={`
1. Ensure you are in a quiet, well-lit room, alone.
2. Your webcam and microphone must remain on throughout the test.
3. The test will be proctored using AI. Any suspicious activity (tab switching, losing focus, exiting fullscreen, prohibited shortcuts) will result in automatic test submission.
4. Do not switch tabs, open other applications, interact with browser extensions, or use external devices.
5. Copying, pasting, or screen recording is strictly prohibited.
6. Certain browser actions (e.g., refresh, new tab, developer tools) are restricted and will lead to test termination.
7. You have a limited time to complete the test. Manage your time wisely.
8. Read each question carefully before answering. You can navigate between questions.
9. For multiple-choice questions, select the best option. For text questions, provide a concise answer.
10. Once you submit the test, you cannot go back.`}
          />
        </CardContent>
        <CardFooter>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Save className="mr-2 h-4 w-4" /> Save Instructions
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div >
            <CardTitle className="text-xl">Question Bank</CardTitle>
            <CardDescription>Manage individual test questions.</CardDescription>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Question
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Q.ID</TableHead>
                <TableHead>Question Text (Preview)</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleQuestions.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-medium">{q.id}</TableCell>
                  <TableCell className="max-w-md truncate">{q.text}</TableCell>
                  <TableCell><Badge variant="secondary">{q.type}</Badge></TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit Question</span>
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                       <span className="sr-only">Delete Question</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
               {sampleQuestions.length === 0 && (
                 <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        No questions added yet.
                    </TableCell>
                 </TableRow>
               )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <span className="mx-4 text-sm text-muted-foreground">Page 1 of 1</span>
            <Button variant="outline" size="sm" disabled>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
