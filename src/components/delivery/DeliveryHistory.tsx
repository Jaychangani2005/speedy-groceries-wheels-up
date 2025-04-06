
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDelivery } from '@/contexts/DeliveryContext';
import DeliveryStatusBadge from './DeliveryStatusBadge';
import { format } from 'date-fns';
import { DeliveryTask } from '@/types/delivery';
import { ScrollArea } from '@/components/ui/scroll-area';

const DeliveryHistory: React.FC = () => {
  const { pastDeliveries } = useDelivery();
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryTask | null>(null);

  const formattedDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy • h:mm a');
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Delivery History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-4">
            {pastDeliveries.length > 0 ? (
              <div className="space-y-4">
                {pastDeliveries.map(delivery => (
                  <div 
                    key={delivery.id}
                    className="p-3 border rounded-lg cursor-pointer hover:border-delivery-primary"
                    onClick={() => setSelectedDelivery(delivery === selectedDelivery ? null : delivery)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium">{delivery.orderNumber}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {formattedDate(delivery.deliveryTime)}
                        </span>
                      </div>
                      <DeliveryStatusBadge status={delivery.status} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">{delivery.customerName}</div>
                      <div className="font-medium text-delivery-primary">₹{delivery.earnings.toFixed(2)}</div>
                    </div>
                    
                    {selectedDelivery?.id === delivery.id && (
                      <div className="mt-3 pt-3 border-t text-sm">
                        <div className="mb-2">
                          <span className="font-medium">Address:</span> {delivery.customerAddress}
                        </div>
                        <div className="mb-2">
                          <span className="font-medium">Store:</span> {delivery.storeName}
                        </div>
                        {delivery.specialInstructions && (
                          <div className="mb-2">
                            <span className="font-medium">Instructions:</span> {delivery.specialInstructions}
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Items:</span>{' '}
                          {delivery.items.map((item, i) => (
                            <span key={i}>
                              {item.name} (x{item.quantity})
                              {i < delivery.items.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No delivery history available</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DeliveryHistory;
