"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, UserCircle, LayoutDashboard, Settings } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import React from 'react';

interface NavItem {
  href: string;
  label: string;
  icon?: React.ElementType;
  authRequired?: boolean;
  adminRequired?: boolean;
}

interface AppHeaderProps {
  navItems?: NavItem[];
  sidebarNavItems?: NavItem[];
  isAuthenticated?: boolean; // In a real app, this would come from auth context
  isAdmin?: boolean; // In a real app, this would come from auth context
}

export function AppHeader({ navItems = [], sidebarNavItems = [], isAuthenticated = false, isAdmin = false }: AppHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Placeholder for logout logic
    console.log("User logged out");
    router.push('/login');
  };

  const mainNavItems = navItems.filter(item => (item.authRequired ? isAuthenticated : true) && (item.adminRequired ? isAdmin : true));
  const mobileNavItems = sidebarNavItems.filter(item => (item.authRequired ? isAuthenticated : true) && (item.adminRequired ? isAdmin : true));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo size="sm" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="user avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Applicant/Admin</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(isAdmin ? '/admin/dashboard' : '/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button size="sm" onClick={() => router.push('/register')} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Register
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background p-6">
              <nav className="flex flex-col space-y-4">
                {mobileNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 rounded-md p-2 hover:bg-muted"
                    onClick={() => {
                      const trigger = document.querySelector('[data-radix-collection-item] > button[aria-label="Toggle menu"]');
                      if (trigger instanceof HTMLElement) trigger.click();
                    }}
                  >
                    {item.icon && <item.icon className="h-5 w-5 text-muted-foreground" />}
                    <span>{item.label}</span>
                  </Link>
                ))}
                <DropdownMenuSeparator />
                {!isAuthenticated && (
                  <>
                    <Button variant="outline" onClick={() => router.push('/login')}>Login</Button>
                    <Button onClick={() => router.push('/register')} className="bg-accent hover:bg-accent/90 text-accent-foreground">Register</Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
