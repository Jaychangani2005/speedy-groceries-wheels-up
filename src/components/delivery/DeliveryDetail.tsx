
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DeliveryTask } from '@/types/delivery';
import DeliveryStatusBadge from './DeliveryStatusBadge';
import { ArrowLeft, Clock, MapPin, Phone, Truck, CheckCircle, AlertCircle, Package, Store } from 'lucide-react';
import { useDelivery } from '@/contexts/DeliveryContext';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface DeliveryDetailProps {
  task: DeliveryTask;
  onBack: () => void;
}

const DeliveryDetail: React.FC<DeliveryDetailProps> = ({ task, onBack }) => {
  const { updateTaskStatus } = useDelivery();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy h:mm a');
  };

  const handleStatusUpdate = (status: any) => {
    updateTaskStatus(task.id, status);
  };

  const renderActionButtons = () => {
    switch(task.status) {
      case 'assigned':
        return (
          <Button 
            className="w-full" 
            onClick={() => handleStatusUpdate('picked-up')}
          >
            <Package className="mr-2 h-4 w-4" />
            Confirm Pickup
          </Button>
        );
      case 'picked-up':
        return (
          <Button 
            className="w-full" 
            onClick={() => handleStatusUpdate('in-transit')}
          >
            <Truck className="mr-2 h-4 w-4" />
            Start Delivery
          </Button>
        );
      case 'in-transit':
        return (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="w-full" 
              onClick={() => handleStatusUpdate('delivered')}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete
            </Button>
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={() => handleStatusUpdate('issue')}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
          </div>
        );
      case 'delivered':
      case 'issue':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={onBack} className="px-0 mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Order {task.orderNumber}</h2>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Delivery Status</CardTitle>
            <DeliveryStatusBadge status={task.status} />
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-col space-y-3">
            <div className="flex items-start">
              <Store className="h-5 w-5 mr-3 mt-0.5 text-delivery-primary" />
              <div className="flex-1">
                <p className="font-medium">{task.storeName}</p>
                <p className="text-sm text-muted-foreground">{task.storeAddress}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-0.5 text-delivery-primary" />
              <div className="flex-1">
                <p className="font-medium">{task.customerName}</p>
                <p className="text-sm text-muted-foreground">{task.customerAddress}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-3 mt-0.5 text-delivery-primary" />
              <div className="flex-1">
                <p className="text-sm">{task.customerPhone}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-3 mt-0.5 text-delivery-primary" />
              <div className="flex-1">
                <p className="text-sm">Delivery Time: {formatDate(task.deliveryTime)}</p>
                <p className="text-sm">Estimated: {task.estimatedTime} • {task.distance}</p>
              </div>
            </div>
            
            {task.specialInstructions && (
              <div className="rounded-md bg-accent p-3 text-sm">
                <p className="font-medium mb-1">Special Instructions:</p>
                <p>{task.specialInstructions}</p>
              </div>
            )}
          </div>
        </CardContent>
        <Separator className="my-2" />
        <CardContent className="pt-2 pb-3">
          <h4 className="font-medium mb-2">Order Items</h4>
          <ul className="space-y-2">
            {task.items.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-muted-foreground">x{item.quantity}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <Separator className="my-0" />
        <CardContent className="pt-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Earnings</span>
            <div className="flex items-center text-delivery-primary font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1">
                <path d="M18 7c0-1.1-.9-2-2-2H8a2 2 0 0 0-2 2v7h12V7z"></path>
                <path d="M6 14v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3"></path>
                <path d="M12 14v4"></path>
                <path d="M9 14l-1 4"></path>
                <path d="M15 14l1 4"></path>
              </svg>
              <span>{task.earnings.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        {renderActionButtons() && (
          <CardFooter>
            {renderActionButtons()}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default DeliveryDetail;
