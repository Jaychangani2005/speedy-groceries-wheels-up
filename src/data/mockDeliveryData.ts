
import { DeliveryPartner, DeliveryTask, DeliverySummary, Notification } from "../types/delivery";

export const currentPartner: DeliveryPartner = {
  id: "dp-123456",
  name: "John Rider",
  email: "john.rider@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  status: "online",
  joinedDate: "2023-01-15",
  totalDeliveries: 342,
  rating: 4.8
};

export const deliveryTasks: DeliveryTask[] = [
  {
    id: "del-1001",
    orderNumber: "ORD-5789",
    customerName: "Emma Johnson",
    customerAddress: "123 Maple Street, Apt 4B, Springfield",
    customerPhone: "+1 (555) 987-6543",
    deliveryTime: "2023-07-20T14:30:00",
    assignedAt: "2023-07-20T14:00:00",
    status: "assigned",
    specialInstructions: "Please leave at the door. Ring doorbell.",
    items: [
      { name: "Organic Bananas", quantity: 1 },
      { name: "Whole Milk", quantity: 2 },
      { name: "Sourdough Bread", quantity: 1 }
    ],
    earnings: 12.50,
    distance: "2.3 miles",
    estimatedTime: "15 min",
    storeAddress: "456 Main St, Springfield",
    storeName: "Fresh Mart"
  },
  {
    id: "del-1002",
    orderNumber: "ORD-5790",
    customerName: "Michael Brown",
    customerAddress: "789 Oak Avenue, Springfield",
    customerPhone: "+1 (555) 456-7890",
    deliveryTime: "2023-07-20T15:15:00",
    assignedAt: "2023-07-20T14:45:00",
    status: "picked-up",
    items: [
      { name: "Chicken Breast", quantity: 2 },
      { name: "Brown Rice", quantity: 1 },
      { name: "Broccoli", quantity: 1 }
    ],
    earnings: 14.75,
    distance: "3.1 miles",
    estimatedTime: "20 min",
    storeAddress: "789 Market Street, Springfield",
    storeName: "Super Foods"
  },
  {
    id: "del-1003",
    orderNumber: "ORD-5791",
    customerName: "Sophia Williams",
    customerAddress: "543 Pine Road, Springfield",
    customerPhone: "+1 (555) 234-5678",
    deliveryTime: "2023-07-20T16:00:00",
    assignedAt: "2023-07-20T15:30:00",
    status: "in-transit",
    specialInstructions: "Call upon arrival. Customer has a dog.",
    items: [
      { name: "Orange Juice", quantity: 1 },
      { name: "Eggs (dozen)", quantity: 1 },
      { name: "Cereal", quantity: 2 }
    ],
    earnings: 11.25,
    distance: "1.8 miles",
    estimatedTime: "12 min",
    storeAddress: "456 Main St, Springfield",
    storeName: "Fresh Mart"
  },
  {
    id: "del-1004",
    orderNumber: "ORD-5792",
    customerName: "Robert Miller",
    customerAddress: "321 Cedar Lane, Springfield",
    customerPhone: "+1 (555) 876-5432",
    deliveryTime: "2023-07-20T16:45:00",
    assignedAt: "2023-07-20T16:15:00",
    status: "pending",
    items: [
      { name: "Apples", quantity: 4 },
      { name: "Cheese", quantity: 1 },
      { name: "Crackers", quantity: 2 }
    ],
    earnings: 9.50,
    distance: "1.2 miles",
    estimatedTime: "10 min",
    storeAddress: "789 Market Street, Springfield",
    storeName: "Super Foods"
  },
  {
    id: "del-1005",
    orderNumber: "ORD-5793",
    customerName: "Linda Davis",
    customerAddress: "876 Elm Street, Springfield",
    customerPhone: "+1 (555) 345-6789",
    deliveryTime: "2023-07-20T17:30:00",
    assignedAt: "2023-07-20T17:00:00",
    status: "delivered",
    specialInstructions: "Contactless delivery preferred.",
    items: [
      { name: "Ground Beef", quantity: 1 },
      { name: "Pasta", quantity: 2 },
      { name: "Tomato Sauce", quantity: 1 }
    ],
    earnings: 13.00,
    distance: "2.7 miles",
    estimatedTime: "18 min",
    storeAddress: "456 Main St, Springfield",
    storeName: "Fresh Mart"
  },
  {
    id: "del-1006",
    orderNumber: "ORD-5794",
    customerName: "James Wilson",
    customerAddress: "432 Birch Boulevard, Springfield",
    customerPhone: "+1 (555) 567-8901",
    deliveryTime: "2023-07-20T18:15:00",
    assignedAt: "2023-07-20T17:45:00",
    status: "issue",
    specialInstructions: "Apartment complex, use entry code 4321.",
    items: [
      { name: "Yogurt", quantity: 3 },
      { name: "Granola", quantity: 1 },
      { name: "Honey", quantity: 1 }
    ],
    earnings: 10.75,
    distance: "2.0 miles",
    estimatedTime: "14 min",
    storeAddress: "789 Market Street, Springfield",
    storeName: "Super Foods"
  }
];

export const deliverySummary: DeliverySummary = {
  totalDeliveries: 342,
  totalEarnings: 4875.50,
  todayEarnings: 48.00,
  weeklyEarnings: 325.75,
  ratings: 4.8,
  activeHours: 6.5
};

export const notifications: Notification[] = [
  {
    id: "notif-001",
    title: "New Delivery Assigned",
    message: "You have been assigned Order #ORD-5789 for delivery to Emma Johnson.",
    timestamp: "2023-07-20T14:00:00",
    read: false,
    type: "task"
  },
  {
    id: "notif-002",
    title: "Weekly Earnings Update",
    message: "Your weekly earnings of $325.75 have been processed and will be deposited soon.",
    timestamp: "2023-07-20T09:30:00",
    read: true,
    type: "earnings"
  },
  {
    id: "notif-003",
    title: "Customer Left a Rating",
    message: "You received a 5-star rating from Linda Davis for order #ORD-5793!",
    timestamp: "2023-07-20T17:45:00",
    read: false,
    type: "system"
  },
  {
    id: "notif-004",
    title: "Delivery Issue Reported",
    message: "James Wilson reported an issue with order #ORD-5794. Please check the app for details.",
    timestamp: "2023-07-20T18:30:00",
    read: false,
    type: "issue"
  },
  {
    id: "notif-005",
    title: "New Promotion Available",
    message: "Earn extra $2 per delivery during peak hours (5PM-8PM) today!",
    timestamp: "2023-07-20T13:15:00",
    read: true,
    type: "system"
  }
];

// Function to get past deliveries (last 30 days)
export const getPastDeliveries = (): DeliveryTask[] => {
  const pastDeliveries: DeliveryTask[] = [];
  
  // Generate 20 past deliveries
  for (let i = 1; i <= 20; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date within past 30 days
    
    const addresses = [
      "123 Pine St, Springfield",
      "456 Oak Ave, Springfield",
      "789 Maple Rd, Springfield",
      "321 Cedar Ln, Springfield",
      "654 Elm Blvd, Springfield"
    ];
    
    const customerNames = [
      "John Smith",
      "Sarah Jones",
      "David Wilson",
      "Maria Garcia",
      "Thomas Brown",
      "Lisa Taylor",
      "Kevin Lee"
    ];
    
    const storeNames = ["Fresh Mart", "Super Foods", "Green Grocery", "City Market"];
    
    const pastDelivery: DeliveryTask = {
      id: `del-past-${1000 + i}`,
      orderNumber: `ORD-${5000 + i}`,
      customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
      customerAddress: addresses[Math.floor(Math.random() * addresses.length)],
      customerPhone: "+1 (555) 123-4567",
      deliveryTime: date.toISOString(),
      assignedAt: date.toISOString(),
      status: "delivered",
      items: [
        { name: "Assorted Groceries", quantity: Math.floor(Math.random() * 5) + 1 }
      ],
      earnings: Number((8 + Math.random() * 10).toFixed(2)),
      distance: `${(1 + Math.random() * 4).toFixed(1)} miles`,
      estimatedTime: `${10 + Math.floor(Math.random() * 20)} min`,
      storeAddress: "456 Main St, Springfield",
      storeName: storeNames[Math.floor(Math.random() * storeNames.length)]
    };
    
    // 10% chance of having an issue
    if (Math.random() < 0.1) {
      pastDelivery.status = "issue";
    }
    
    pastDeliveries.push(pastDelivery);
  }
  
  // Sort by date, newest first
  return pastDeliveries.sort((a, b) => {
    return new Date(b.deliveryTime).getTime() - new Date(a.deliveryTime).getTime();
  });
};
