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
  GraduationCap
} from 'lucide-react';

const adminNavItems = [
  { href: "/admin/dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
  { isSectionTitle: true, label: "Management", icon: Users /* Dummy icon */ },
  { href: "/admin/applications", label: "All Applications", icon: Users, badge: 5 }, // Example badge
  { href: "/admin/challan-verification", label: "Challan Verification", icon: FileCheck2, badge: 2 },
  { href: "/admin/test-centers", label: "Test Centers", icon: Building },
  { href: "/admin/offer-letters", label: "Offer Letters", icon: FileText },
  { href: "/admin/enrollment", label: "Enrollment Tracking", icon: Briefcase },
  { isSectionTitle: true, label: "Configuration", icon: Users /* Dummy icon */ },
  { href: "/admin/programs", label: "Manage Programs", icon: GraduationCap },
  { href: "/admin/settings", label: "System Settings", icon: Settings },
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
