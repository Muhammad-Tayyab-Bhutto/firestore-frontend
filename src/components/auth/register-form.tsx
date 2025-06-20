
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterSchema, type RegisterFormData } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, ShieldQuestion } from "lucide-react";
import React, { useState } from "react";

export function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // 1 for details, 2 for OTP

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      cnic: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },
  });

  async function handleDetailsSubmit(data: RegisterFormData) {
    // Placeholder: Simulate sending OTP for email verification
    console.log("Registration details:", data);
    setStep(2);
    toast({
      title: "OTP Sent for Verification",
      description: "An OTP has been sent to your email (placeholder). Please enter it to complete registration.",
    });
  }

  function onFinalSubmit(data: RegisterFormData) {
    // Placeholder for actual registration logic with OTP
    console.log("Final Registration data with OTP:", data);
    toast({
      title: "Registration Attempted",
      description: "Registration functionality with OTP verification is a placeholder.",
      variant: "default",
    });
    // Simulate successful registration for navigation
    router.push("/login");
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">
          {step === 1 ? "Create Account" : "Verify Email"}
        </CardTitle>
        <CardDescription>
          {step === 1 ? "Join AdmitPro to start your application journey." : "Enter the OTP sent to your email."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            onSubmit={step === 1 ? form.handleSubmit(handleDetailsSubmit) : form.handleSubmit(onFinalSubmit)} 
            className="space-y-6"
          >
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cnic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNIC (National ID)</FormLabel>
                      <FormControl>
                        <Input placeholder="XXXXX-XXXXXXX-X" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} placeholder="Minimum 8 characters" {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showConfirmPassword ? "text" : "password"} placeholder="Re-enter your password" {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <UserPlus className="mr-2 h-4 w-4" /> Proceed to OTP Verification
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="6-digit OTP" {...field} maxLength={6} />
                      </FormControl>
                      <FormMessage />
                       <FormDescription>
                        An OTP was sent to {form.getValues("email")}.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <ShieldQuestion className="mr-2 h-4 w-4" /> Verify OTP &amp; Register
                </Button>
                <Button variant="link" onClick={() => setStep(1)} className="w-full">
                  Back to Registration Details
                </Button>
              </>
            )}
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login here
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
