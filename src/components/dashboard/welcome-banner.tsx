"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Handshake } from "lucide-react";

interface WelcomeBannerProps {
  userName: string;
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <Card className="bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground shadow-lg">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            {getCurrentGreeting()}, {userName}!
          </h2>
          <p className="text-sm opacity-90 mt-1">
            Welcome to your AdmitPro dashboard. Let's get your application moving!
          </p>
        </div>
        <Handshake className="h-16 w-16 opacity-50 hidden sm:block" />
      </CardContent>
    </Card>
  );
}
