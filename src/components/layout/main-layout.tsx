"use client";
import React from 'react';
import { AppHeader } from './app-header';
import { AppSidebar } from './app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  subItems?: NavItem[];
  isSectionTitle?: boolean;
  badge?: string | number;
}

interface MainLayoutProps {
  children: React.ReactNode;
  sidebarNavItems: NavItem[];
  headerNavItems?: NavItem[];
  pageTitle?: string;
  userEmail?: string;
  isAuthenticated?: boolean;
  isAdmin?: boolean;
}

export function MainLayout({ 
  children, 
  sidebarNavItems, 
  headerNavItems = [],
  pageTitle,
  userEmail,
  isAuthenticated = true, // Assume authenticated for dashboard layouts
  isAdmin = false
}: MainLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile} open={!isMobile}>
      <div className="flex min-h-screen">
        <AppSidebar navItems={sidebarNavItems} userEmail={userEmail} />
        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b p-4 flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              {pageTitle && <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>}
            </div>
            {/* Minimal header for dashboard, or can use AppHeader with different props */}
            {/* For now, keeping it simple */}
          </header>
          <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-background">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
