export type DeliveryStatus = 
  | 'pending'
  | 'assigned'
  | 'picked-up'
  | 'in-transit'
  | 'delivered'
  | 'issue'
  | 'denied';

export interface DeliveryTask {
  id: string;
  orderNumber: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  storeName: string;
  storeAddress: string;
  deliveryTime: string;
  estimatedTime: string;
  distance: string;
  earnings: number;
  status: DeliveryStatus;
  items: { name: string; quantity: number }[];
  specialInstructions?: string;
  assignedAt: string;
}

export interface DeliverySummary {
  totalDeliveries: number;
  totalEarnings: number;
  todayEarnings: number;
  ratings: number;
}

export interface Notification {
  id: string;
  type: 'new_task' | 'status_update' | 'payment';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinedDate: string;
  status: 'online' | 'offline' | 'on-delivery';
}
