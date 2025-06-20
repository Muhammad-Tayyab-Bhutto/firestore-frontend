
"use client";
import { MainLayout } from "@/components/layout/main-layout";
import { 
  LayoutDashboard, 
  Users, 
  FileCheck2, 
  Building, 
  FileText, 
  Briefcase,
  Settings,
  DollarSign,
  ClipboardList,
  GraduationCap,
  CalendarClock,
  ListChecks,
  ListOrdered, // For Merit Lists
  Contact,    // For Roll Numbers
  ScrollText  // For System Logs
} from 'lucide-react';

const adminNavItems = [
  { href: "/admin/dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
  { isSectionTitle: true, label: "Management", icon: Users /* Dummy icon */ },
  { href: "/admin/applications", label: "All Applications", icon: Users, badge: 5 },
  { href: "/admin/challan-verification", label: "Challan Verification", icon: FileCheck2, badge: 2 },
  { href: "/admin/programs", label: "Manage Programs", icon: GraduationCap },
  { href: "/admin/test-centers", label: "Test Centers", icon: Building },
  { href: "/admin/test-shifts", label: "Manage Test Shifts", icon: CalendarClock },
  { href: "/admin/test-questions", label: "Manage Test Questions", icon: ListChecks },
  { href: "/admin/test-results", label: "View Test Results", icon: ClipboardList },
  { isSectionTitle: true, label: "Admissions Processing", icon: Users /* Dummy icon */ },
  { href: "/admin/merit-lists", label: "Generate Merit Lists", icon: ListOrdered },
  { href: "/admin/offer-letters", label: "Offer Letters", icon: FileText },
  { href: "/admin/roll-numbers", label: "Assign Roll Numbers", icon: Contact },
  { href: "/admin/enrollment", label: "Enrollment Tracking", icon: Briefcase },
  { isSectionTitle: true, label: "System & Configuration", icon: Users /* Dummy icon */ },
  { href: "/admin/settings", label: "Admission Settings", icon: Settings },
  { href: "/admin/system-logs", label: "System Logs", icon: ScrollText },
];


export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, get user email and role from auth context
  const userEmail = "admin@example.com";

  return (
    <MainLayout sidebarNavItems={adminNavItems} userEmail={userEmail} isAuthenticated={true} isAdmin={true}>
      {children}
    </MainLayout>
  );
}
