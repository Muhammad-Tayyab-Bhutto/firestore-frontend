"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

interface NotificationsCardProps {
  notifications: NotificationItem[];
}

export function NotificationsCard({ notifications }: NotificationsCardProps) {
  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />; // Using AlertTriangle for error as well, can be XCircle
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-headline text-primary">Notifications</CardTitle>
          <CardDescription>Stay updated with important alerts.</CardDescription>
        </div>
        {unreadCount > 0 && <Badge variant="destructive" className="text-sm">{unreadCount} New</Badge>}
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No new notifications.</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex items-start p-4 rounded-lg border ${!notification.read ? 'bg-primary/5 border-primary/20' : 'bg-card'}`}
                >
                  <div className="mr-3 mt-1 shrink-0">{getIconForType(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h5 className={`font-semibold ${!notification.read ? 'text-primary' : 'text-card-foreground'}`}>{notification.title}</h5>
                      {!notification.read && <Badge variant="default" className="bg-accent text-accent-foreground text-xs">New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground/70">{notification.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
