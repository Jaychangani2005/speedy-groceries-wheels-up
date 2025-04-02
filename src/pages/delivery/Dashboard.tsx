
import React, { useState } from 'react';
import DeliveryLayout from '@/components/delivery/DeliveryLayout';
import DeliveryList from '@/components/delivery/DeliveryList';
import DeliveryDetail from '@/components/delivery/DeliveryDetail';
import DeliverySummaryCard from '@/components/delivery/DeliverySummaryCard';
import { useDelivery } from '@/contexts/DeliveryContext';
import { Truck } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { activeTask, setActiveTask, partnerStatus } = useDelivery();
  
  return (
    <DeliveryLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Delivery Dashboard</h1>
        <p className="text-muted-foreground">
          {partnerStatus === 'online' 
            ? 'You are online and available for deliveries' 
            : partnerStatus === 'on-delivery' 
              ? 'You are currently on an active delivery' 
              : 'You are offline. Go online to receive deliveries'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeTask ? (
            <DeliveryDetail task={activeTask} onBack={() => setActiveTask(null)} />
          ) : (
            <DeliveryList />
          )}
        </div>
        
        <div>
          <DeliverySummaryCard />
          {!activeTask && partnerStatus === 'offline' && (
            <div className="mt-6 bg-accent rounded-lg p-6 text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-delivery-primary" />
              <h3 className="font-semibold text-lg mb-2">Ready to deliver?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Go online to start receiving delivery tasks and earning money.
              </p>
            </div>
          )}
        </div>
      </div>
    </DeliveryLayout>
  );
};

export default Dashboard;
