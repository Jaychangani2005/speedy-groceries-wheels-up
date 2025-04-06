
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, Star, Truck } from 'lucide-react';
import { useDelivery } from '@/contexts/DeliveryContext';

const DeliverySummaryCard: React.FC = () => {
  const { summary } = useDelivery();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Earnings & Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-delivery-primary" />
              <span className="text-sm font-medium">Today's Earnings</span>
            </div>
            <p className="text-2xl font-bold text-delivery-primary">${summary.todayEarnings.toFixed(2)}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-delivery-primary" />
              <span className="text-sm font-medium">Weekly Earnings</span>
            </div>
            <p className="text-2xl font-bold">${summary.weeklyEarnings.toFixed(2)}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <Truck className="h-4 w-4 mr-2 text-delivery-primary" />
              <span className="text-sm">Total Deliveries</span>
            </div>
            <p className="text-xl font-semibold">{summary.totalDeliveries}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2 text-delivery-primary" />
              <span className="text-sm">Rating</span>
            </div>
            <p className="text-xl font-semibold">{summary.ratings.toFixed(1)}/5.0</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-delivery-primary" />
              <span className="text-sm">Active Hours Today</span>
            </div>
            <p className="text-xl font-semibold">{summary.activeHours.toFixed(1)}h</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliverySummaryCard;
