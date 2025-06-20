
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginSchema, type LoginFormData } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, ShieldQuestion } from "lucide-react";
import React, { useState } from "react";

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Placeholder for OTP logic

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      cnic: "",
      password: "",
      otp: "",
    },
  });

  function onSubmit(data: LoginFormData) {
    console.log("Login data:", data);
    
    if (!otpSent) {
      // Placeholder: Simulate sending OTP
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your registered email/phone (placeholder).",
      });
      // In a real app, you wouldn't proceed to dashboard here.
      // You'd wait for OTP verification.
      return;
    }

    // Placeholder for actual login logic with OTP
    toast({
      title: "Login Attempted",
      description: "Login functionality with OTP is a placeholder.",
    });
    // Simulate successful login for navigation
    router.push("/dashboard"); 
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">Applicant Login</CardTitle>
        <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {!otpSent ? (
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
                          <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
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
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <LogIn className="mr-2 h-4 w-4" /> Proceed to OTP
                </Button>
              </>
            ) : (
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
                        An OTP was sent to your registered email/phone.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <ShieldQuestion className="mr-2 h-4 w-4" /> Verify OTP &amp; Login
                </Button>
                 <Button variant="link" onClick={() => setOtpSent(false)} className="w-full">
                  Back to Login Details
                </Button>
              </>
            )}
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register here
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
