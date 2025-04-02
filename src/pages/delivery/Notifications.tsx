
import React from 'react';
import DeliveryLayout from '@/components/delivery/DeliveryLayout';
import NotificationsList from '@/components/delivery/NotificationsList';

const Notifications: React.FC = () => {
  return (
    <DeliveryLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated with delivery requests and important messages
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <NotificationsList />
      </div>
    </DeliveryLayout>
  );
};

export default Notifications;
