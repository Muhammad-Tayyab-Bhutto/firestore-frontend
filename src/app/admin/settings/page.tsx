import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Settings as SettingsIcon, BellDot, Lock, CalendarDays } from "lucide-react";
import { Metadata } from "next";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "System Settings - Admin - AdmitPro",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-headline font-semibold text-primary">System Settings</h1>
      </div>
      <CardDescription>
        Configure general system settings, admission cycles, notification preferences, and security parameters.
      </CardDescription>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="general"><SettingsIcon className="mr-2 h-4 w-4" />General</TabsTrigger>
          <TabsTrigger value="admission"><CalendarDays className="mr-2 h-4 w-4" />Admission Cycle</TabsTrigger>
          <TabsTrigger value="notifications"><BellDot className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="security"><Lock className="mr-2 h-4 w-4" />Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic configuration for the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="appName">Application Name</Label>
                <Input id="appName" defaultValue="AdmitPro" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Administrator Email</Label>
                <Input id="adminEmail" type="email" defaultValue="admin@admitpro.com" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenanceMode" />
                <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button><Save className="mr-2 h-4 w-4" /> Save General Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="admission">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Admission Cycle Management</CardTitle>
              <CardDescription>Define current and upcoming admission cycles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentCycle">Current Admission Cycle</Label>
                <Input id="currentCycle" defaultValue="Fall 2024" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appStartDate">Application Start Date</Label>
                  <Input id="appStartDate" type="date" defaultValue="2024-09-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appEndDate">Application End Date</Label>
                  <Input id="appEndDate" type="date" defaultValue="2024-10-31" />
                </div>
              </div>
               <div className="flex items-center space-x-2">
                <Switch id="autoOpenNextCycle" defaultChecked />
                <Label htmlFor="autoOpenNextCycle">Automatically open next admission cycle based on schedule</Label>
              </div>
            </CardContent>
             <CardFooter>
              <Button><Save className="mr-2 h-4 w-4" /> Save Admission Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure email and SMS notification settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="smtpServer">SMTP Server Address</Label>
                    <Input id="smtpServer" placeholder="smtp.example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="smsGatewayUrl">SMS Gateway URL (API Endpoint)</Label>
                    <Input id="smsGatewayUrl" placeholder="https://api.smsgateway.com/send" />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="enableEmailNotifications" defaultChecked/>
                    <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="enableSmsNotifications" />
                    <Label htmlFor="enableSmsNotifications">Enable SMS Notifications (Requires Gateway Setup)</Label>
                </div>
            </CardContent>
             <CardFooter>
              <Button><Save className="mr-2 h-4 w-4" /> Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage application security parameters.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="30" />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="enforceHttps" defaultChecked disabled />
                    <Label htmlFor="enforceHttps">Enforce HTTPS (Recommended)</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Switch id="enableAuditTrail" defaultChecked />
                    <Label htmlFor="enableAuditTrail">Enable Full Audit Trail for Sensitive Actions</Label>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication (2FA)</Label>
                    <Button variant="outline" className="w-full">Configure 2FA for Admins</Button>
                </div>
            </CardContent>
             <CardFooter>
              <Button><Save className="mr-2 h-4 w-4" /> Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
