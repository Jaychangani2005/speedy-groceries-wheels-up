
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useDelivery } from '@/contexts/DeliveryContext';

const PartnerStatusToggle: React.FC = () => {
  const { partnerStatus, setPartnerStatus } = useDelivery();
  
  const handleToggle = (checked: boolean) => {
    if (partnerStatus === 'on-delivery') {
      // Cannot toggle while on delivery
      return;
    }
    setPartnerStatus(checked ? 'online' : 'offline');
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id="partner-status" 
        checked={partnerStatus !== 'offline'}
        onCheckedChange={handleToggle}
        disabled={partnerStatus === 'on-delivery'}
      />
      <div className="flex flex-col">
        <label 
          htmlFor="partner-status" 
          className="text-sm font-medium leading-none"
        >
          {partnerStatus === 'online' 
            ? 'Online' 
            : partnerStatus === 'on-delivery' 
              ? 'On Delivery' 
              : 'Offline'}
        </label>
        <p className="text-xs text-muted-foreground">
          {partnerStatus === 'online' 
            ? 'You are available for deliveries' 
            : partnerStatus === 'on-delivery' 
              ? 'Currently on an active delivery' 
              : 'You will not receive new delivery tasks'}
        </p>
      </div>
    </div>
  );
};

export default PartnerStatusToggle;
