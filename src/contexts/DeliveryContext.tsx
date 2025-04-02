
import React, { createContext, useContext, useState, useEffect } from "react";
import { DeliveryTask, DeliveryStatus, DeliverySummary, Notification, DeliveryPartner } from "../types/delivery";
import { deliveryTasks, deliverySummary, notifications, currentPartner, getPastDeliveries } from "../data/mockDeliveryData";
import { toast } from "@/components/ui/use-toast";

interface DeliveryContextType {
  tasks: DeliveryTask[];
  activeTask: DeliveryTask | null;
  pastDeliveries: DeliveryTask[];
  summary: DeliverySummary;
  notifications: Notification[];
  unreadNotificationsCount: number;
  partner: DeliveryPartner;
  partnerStatus: 'online' | 'offline' | 'on-delivery';
  
  setActiveTask: (task: DeliveryTask | null) => void;
  updateTaskStatus: (taskId: string, status: DeliveryStatus) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  setPartnerStatus: (status: 'online' | 'offline' | 'on-delivery') => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<DeliveryTask[]>(deliveryTasks);
  const [activeTask, setActiveTask] = useState<DeliveryTask | null>(null);
  const [pastDeliveries, setPastDeliveries] = useState<DeliveryTask[]>([]);
  const [summary, setSummary] = useState<DeliverySummary>(deliverySummary);
  const [partnerNotifications, setPartnerNotifications] = useState<Notification[]>(notifications);
  const [partner, setPartner] = useState<DeliveryPartner>(currentPartner);
  const [partnerStatus, setPartnerStatus] = useState<'online' | 'offline' | 'on-delivery'>(
    currentPartner.status
  );

  useEffect(() => {
    // Load past deliveries
    setPastDeliveries(getPastDeliveries());
  }, []);

  const updateTaskStatus = (taskId: string, status: DeliveryStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, status };
          
          // If this is the active task, update it
          if (activeTask && activeTask.id === taskId) {
            setActiveTask(updatedTask);
          }
          
          // Show a toast notification
          const statusText = status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
          toast({
            title: `Order ${task.orderNumber} ${statusText}`,
            description: `Successfully updated order status to ${statusText}`,
            variant: status === 'issue' ? 'destructive' : 'default',
          });
          
          return updatedTask;
        }
        return task;
      })
    );
    
    // If delivery is completed, add it to past deliveries
    if (status === 'delivered' || status === 'issue') {
      const completedTask = tasks.find(task => task.id === taskId);
      if (completedTask) {
        setPastDeliveries(prev => [{ ...completedTask, status }, ...prev]);
      }
    }
    
    // If status is delivered, update the summary
    if (status === 'delivered') {
      const completedTask = tasks.find(task => task.id === taskId);
      if (completedTask) {
        setSummary(prev => ({
          ...prev,
          totalDeliveries: prev.totalDeliveries + 1,
          totalEarnings: prev.totalEarnings + completedTask.earnings,
          todayEarnings: prev.todayEarnings + completedTask.earnings
        }));
      }
    }
    
    // If taking a delivery, set partner status to on-delivery
    if (status === 'picked-up' || status === 'in-transit') {
      setPartnerStatus('on-delivery');
    } else if (status === 'delivered' || status === 'issue') {
      // If delivery is completed, set partner status back to online
      setPartnerStatus('online');
    }
  };

  const markNotificationAsRead = (notificationId: string) => {
    setPartnerNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setPartnerNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadNotificationsCount = partnerNotifications.filter(n => !n.read).length;

  return (
    <DeliveryContext.Provider
      value={{
        tasks,
        activeTask,
        pastDeliveries,
        summary,
        notifications: partnerNotifications,
        unreadNotificationsCount,
        partner,
        partnerStatus,
        setActiveTask,
        updateTaskStatus,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        setPartnerStatus
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (context === undefined) {
    throw new Error("useDelivery must be used within a DeliveryProvider");
  }
  return context;
};
