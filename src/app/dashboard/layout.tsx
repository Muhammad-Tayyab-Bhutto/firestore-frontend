
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
  ClipboardCheck,
  BookOpenText, // New: My Academics
  FilePenLine,  // New: My Enrollment
  Landmark,     // New: My Financials
  LifeBuoy      // New: My Support
} from 'lucide-react';

const applicantNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { isSectionTitle: true, label: "Application Process", icon: FileText /* Dummy */ },
  { href: "/dashboard/apply", label: "Fill Application", icon: FileText },
  { href: "/dashboard/documents", label: "Upload Documents", icon: UploadCloud },
  { href: "/dashboard/challan", label: "Fee Challan", icon: CreditCard },
  { href: "/dashboard/status", label: "Application Status", icon: CheckSquare },
  { href: "/dashboard/test-booking", label: "Book Test Slot", icon: CalendarClock },
  { href: "/dashboard/admit-card", label: "Admit Card", icon: Award },
  { href: "/dashboard/take-test", label: "Take Test", icon: ClipboardCheck },
  { isSectionTitle: true, label: "Student Portal", icon: BookOpenText /* Dummy */ },
  { href: "/dashboard/my-academics", label: "My Academics", icon: BookOpenText },
  { href: "/dashboard/my-enrollment", label: "My Enrollment", icon: FilePenLine },
  { href: "/dashboard/my-financials", label: "My Financials", icon: Landmark },
  { href: "/dashboard/my-support", label: "Help & Support", icon: LifeBuoy },
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
