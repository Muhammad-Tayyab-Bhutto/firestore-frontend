"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ApplicationFormSchema, type ApplicationFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Save, ArrowRight, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const programs = [
  { id: "cs", label: "Computer Science" },
  { id: "bba", label: "Business Administration" },
  { id: "eng", label: "Engineering (Civil)" },
  { id: "arts", label: "Fine Arts" },
];

const steps = [
  { id: "personal", title: "Personal Information" },
  { id: "academic", title: "Academic Details" },
  { id: "programs", title: "Program Selection" },
  { id: "review", title: "Review & Submit" },
];

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(ApplicationFormSchema), // This schema might need to be adapted for multi-step
    defaultValues: {
      fullName: "",
      fatherName: "",
      // dateOfBirth: undefined, - Handled by Popover
      gender: undefined,
      selectedPrograms: [],
    },
  });

  const handleNext = async () => {
    // Add validation logic for current step if needed
    // const isValid = await form.trigger(["fieldName1", "fieldName2"]); // for current step fields
    // if (!isValid) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  function onSubmit(data: ApplicationFormData) {
    console.log("Application Data:", data);
    toast({
      title: "Application Submitted!",
      description: "Your application has been successfully submitted. (Placeholder)",
    });
    // Reset form or navigate, etc.
  }
  
  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "personal":
        return (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="Enter your full name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father's Name</FormLabel>
                  <FormControl><Input placeholder="Enter father's name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case "academic":
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground">Academic details section (e.g., Matriculation, Intermediate scores). This is a placeholder.</p>
            <Input placeholder="Matriculation Marks" />
            <Input placeholder="Intermediate Marks" />
          </div>
        );
      case "programs":
        return (
          <FormField
            control={form.control}
            name="selectedPrograms"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Select Programs</FormLabel>
                  <FormDescription>
                    You can select multiple programs you wish to apply for.
                  </FormDescription>
                </div>
                <div className="space-y-2">
                {programs.map((program) => (
                  <FormField
                    key={program.id}
                    control={form.control}
                    name="selectedPrograms"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={program.id}
                          className="flex flex-row items-start space-x-3 space-y-0 p-3 border rounded-md hover:bg-muted/50"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(program.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), program.id])
                                  : field.onChange(
                                      (field.value || []).filter(
                                        (value) => value !== program.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-sm cursor-pointer">
                            {program.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "review":
        const formData = form.getValues();
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Information</h3>
            <p><strong>Full Name:</strong> {formData.fullName}</p>
            <p><strong>Father's Name:</strong> {formData.fatherName}</p>
            <p><strong>Date of Birth:</strong> {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : 'Not set'}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>Selected Programs:</strong> {(formData.selectedPrograms || []).map(pId => programs.find(p => p.id === pId)?.label).join(', ')}</p>
            <p className="text-muted-foreground mt-4">Ensure all information is correct before submitting.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-headline text-primary">{steps[currentStep].title}</CardTitle>
          <span className="text-sm text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5 mt-2">
          <div className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="min-h-[300px]">
            {renderStepContent()}
          </CardContent>
          <CardFooter className="flex justify-between pt-6 border-t">
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNext} className="bg-primary hover:bg-primary/90">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Save className="mr-2 h-4 w-4" /> Submit Application
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
