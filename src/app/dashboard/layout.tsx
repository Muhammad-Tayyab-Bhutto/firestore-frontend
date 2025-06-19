"use client";
import { MainLayout } from "@/components/layout/main-layout";
import { 
  LayoutDashboard, 
  FileText, 
  UploadCloud, 
  CreditCard, 
  CheckSquare, 
  CalendarClock, 
  Award,
  BookOpenCheck
} from 'lucide-react';

const applicantNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/apply", label: "Fill Application", icon: FileText },
  { href: "/dashboard/documents", label: "Upload Documents", icon: UploadCloud },
  { href: "/dashboard/challan", label: "Fee Challan", icon: CreditCard },
  { href: "/dashboard/status", label: "Application Status", icon: CheckSquare },
  { href: "/dashboard/test-booking", label: "Book Test Slot", icon: CalendarClock },
  { href: "/dashboard/admit-card", label: "Admit Card", icon: Award },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, get user email from auth context
  const userEmail = "applicant@example.com"; 
  
  return (
    <MainLayout sidebarNavItems={applicantNavItems} userEmail={userEmail} isAuthenticated={true} isAdmin={false}>
      {children}
    </MainLayout>
  );
}
