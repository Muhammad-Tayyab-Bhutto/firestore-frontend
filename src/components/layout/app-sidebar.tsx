"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Bell } from 'lucide-react';
import React from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  subItems?: NavItem[];
  isSectionTitle?: boolean;
  badge?: string | number;
}

interface AppSidebarProps {
  navItems: NavItem[];
  userEmail?: string;
}

export function AppSidebar({ navItems, userEmail = "user@example.com" }: AppSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const renderNavItems = (items: NavItem[], isSubmenu = false) => {
    return items.map((item, index) => {
      if (item.isSectionTitle) {
        return (
          <div key={index} className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            {item.label}
          </div>
        );
      }

      const ItemIcon = item.icon;
      const itemIsActive = isActive(item.href, item.href.split('/').length <= 2); // More exact for top level

      if (item.subItems && item.subItems.length > 0) {
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild={!item.subItems}
              isActive={itemIsActive || item.subItems.some(sub => isActive(sub.href))}
              className="justify-between"
            >
              <Link href={item.href} className="flex items-center w-full">
                <div className="flex items-center gap-2">
                  <ItemIcon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && <span className="ml-auto text-xs bg-sidebar-primary text-sidebar-primary-foreground px-1.5 py-0.5 rounded-full">{item.badge}</span>}
              </Link>
            </SidebarMenuButton>
            <SidebarMenuSub>
              {item.subItems.map((subItem) => (
                <SidebarMenuSubItem key={subItem.href}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={isActive(subItem.href)}
                  >
                    <Link href={subItem.href} className="flex items-center gap-2">
                      {subItem.icon && <subItem.icon className="h-4 w-4" />}
                      <span>{subItem.label}</span>
                       {subItem.badge && <span className="ml-auto text-xs bg-sidebar-primary text-sidebar-primary-foreground px-1.5 py-0.5 rounded-full">{subItem.badge}</span>}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>
        );
      }

      return (
         <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={itemIsActive}>
              <Link href={item.href} className="flex items-center gap-2">
                <ItemIcon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.badge && <span className="ml-auto text-xs bg-sidebar-primary text-sidebar-primary-foreground px-1.5 py-0.5 rounded-full">{item.badge}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
      );
    });
  };


  return (
    <Sidebar variant="sidebar" collapsible="icon" side="left" className="border-r shadow-md">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Logo size="sm" className="text-sidebar-foreground" />
      </SidebarHeader>
      <SidebarContent className="flex-grow p-2">
        <SidebarMenu>
          {renderNavItems(navItems)}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-4 space-y-2">
         <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <Settings className="h-5 w-5" /> <span>Settings</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <LogOut className="h-5 w-5" /> <span>Logout</span>
          </Button>
          <div className="text-xs text-sidebar-foreground/70 text-center pt-2">
            Logged in as {userEmail}
          </div>
      </SidebarFooter>
    </Sidebar>
  );
}
