
import React from 'react';
import { DeliveryStatus } from '@/types/delivery';
import { cn } from '@/lib/utils';

interface DeliveryStatusBadgeProps {
  status: DeliveryStatus;
  className?: string;
}

const DeliveryStatusBadge: React.FC<DeliveryStatusBadgeProps> = ({ status, className }) => {
  const getStatusDisplay = (status: DeliveryStatus) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'assigned': return 'Assigned';
      case 'picked-up': return 'Picked Up';
      case 'in-transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      case 'issue': return 'Issue Reported';
      default: return status;
    }
  };

  return (
    <span className={cn(`status-badge status-${status}`, className)}>
      {getStatusDisplay(status)}
    </span>
  );
};

export default DeliveryStatusBadge;
