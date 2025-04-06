
import React from 'react';
import { DeliveryTask } from '@/types/delivery';
import DeliveryCard from './DeliveryCard';
import { useDelivery } from '@/contexts/DeliveryContext';

const DeliveryList: React.FC = () => {
  const { tasks, setActiveTask } = useDelivery();
  
  // Group tasks by status priority
  const groupedTasks = {
    active: tasks.filter(task => 
      ['assigned', 'picked-up', 'in-transit'].includes(task.status)
    ),
    pending: tasks.filter(task => task.status === 'pending'),
    completed: tasks.filter(task => 
      ['delivered', 'issue'].includes(task.status)
    ),
    denied: tasks.filter(task => task.status === 'denied')
  };

  return (
    <div className="space-y-6">
      {groupedTasks.active.length > 0 && (
        <div>
          <h3 className="font-medium text-lg mb-3">Active Deliveries</h3>
          {groupedTasks.active.map(task => (
            <DeliveryCard
              key={task.id}
              delivery={task}
              onClick={() => setActiveTask(task)}
            />
          ))}
        </div>
      )}
      
      {groupedTasks.pending.length > 0 && (
        <div>
          <h3 className="font-medium text-lg mb-3">Pending Deliveries</h3>
          {groupedTasks.pending.map(task => (
            <DeliveryCard
              key={task.id}
              delivery={task}
              onClick={() => setActiveTask(task)}
            />
          ))}
        </div>
      )}
      
      {groupedTasks.completed.length > 0 && (
        <div>
          <h3 className="font-medium text-lg mb-3">Recently Completed</h3>
          {groupedTasks.completed.map(task => (
            <DeliveryCard
              key={task.id}
              delivery={task}
              onClick={() => setActiveTask(task)}
            />
          ))}
        </div>
      )}
      
      {groupedTasks.denied.length > 0 && (
        <div>
          <h3 className="font-medium text-lg mb-3">Denied Orders</h3>
          {groupedTasks.denied.map(task => (
            <DeliveryCard
              key={task.id}
              delivery={task}
              onClick={() => setActiveTask(task)}
            />
          ))}
        </div>
      )}
      
      {Object.values(groupedTasks).every(group => group.length === 0) && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No deliveries found.</p>
        </div>
      )}
    </div>
  );
};

export default DeliveryList;
