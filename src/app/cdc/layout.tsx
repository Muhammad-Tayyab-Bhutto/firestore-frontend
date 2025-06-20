
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Logo } from "@/components/icons/logo";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CDC Portal - AdmitPro University",
  description: "Career Development Center Portal for AdmitPro University System",
};

export default function CdcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen flex flex-col ${inter.variable} font-body bg-background text-foreground`}>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/cdc/dashboard" className="flex items-center space-x-2">
            <Logo size="sm" />
            <span className="font-semibold text-primary hidden sm:inline">CDC Portal</span>
          </Link>
          {/* Minimal CDC-specific navigation or user profile can go here */}
        </div>
      </header>
      <main className="flex-grow container mx-auto p-6 md:p-8">
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        &copy; {new Date().getFullYear()} AdmitPro University. CDC Portal.
      </footer>
    </div>
  );
}
