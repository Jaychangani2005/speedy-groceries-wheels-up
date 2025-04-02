
import React from 'react';
import { useDelivery } from '@/contexts/DeliveryContext';
import { Bell, AlertCircle, Truck, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NotificationsList: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useDelivery();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <Truck className="h-4 w-4 text-delivery-info" />;
      case 'earnings':
        return <DollarSign className="h-4 w-4 text-delivery-primary" />;
      case 'issue':
        return <AlertCircle className="h-4 w-4 text-delivery-danger" />;
      default:
        return <Bell className="h-4 w-4 text-delivery-secondary" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Notifications</CardTitle>
        {notifications.some(n => !n.read) && (
          <Button variant="ghost" size="sm" onClick={markAllNotificationsAsRead}>
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg border transition-colors ${
                    notification.read ? 'bg-background' : 'bg-accent border-delivery-primary'
                  }`}
                  onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Bell className="h-8 w-8 mb-2" />
              <p>No notifications</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationsList;
