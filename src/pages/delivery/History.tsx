
import React from 'react';
import DeliveryLayout from '@/components/delivery/DeliveryLayout';
import DeliveryHistory from '@/components/delivery/DeliveryHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDelivery } from '@/contexts/DeliveryContext';
import { ArrowUpRight, ArrowDownRight, ChevronUp, ChevronDown } from 'lucide-react';

const History: React.FC = () => {
  const { summary } = useDelivery();
  
  // Mock data for the earnings chart
  const earningsData = [
    { day: 'Mon', amount: 45.25 },
    { day: 'Tue', amount: 63.50 },
    { day: 'Wed', amount: 52.75 },
    { day: 'Thu', amount: 71.00 },
    { day: 'Fri', amount: 82.25 },
    { day: 'Sat', amount: summary.todayEarnings },
    { day: 'Sun', amount: 0 }
  ];
  
  // Calculate some mock statistics
  const weeklyTotal = earningsData.reduce((sum, day) => sum + day.amount, 0);
  const previousWeekTotal = weeklyTotal * 0.9; // Mock previous week as 90% of current
  const weeklyChange = ((weeklyTotal - previousWeekTotal) / previousWeekTotal) * 100;
  
  return (
    <DeliveryLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Delivery History</h1>
        <p className="text-muted-foreground">
          View your past deliveries and earnings
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DeliveryHistory />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">${weeklyTotal.toFixed(2)}</div>
              
              <div className="flex items-center space-x-2 mb-4">
                {weeklyChange >= 0 ? (
                  <>
                    <div className="bg-green-100 text-green-700 rounded-full p-1">
                      <ChevronUp className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-green-700">+{weeklyChange.toFixed(1)}% from last week</span>
                  </>
                ) : (
                  <>
                    <div className="bg-red-100 text-red-700 rounded-full p-1">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-red-700">{weeklyChange.toFixed(1)}% from last week</span>
                  </>
                )}
              </div>
              
              <div className="space-y-2">
                {earningsData.map((day) => (
                  <div key={day.day} className="flex items-center justify-between">
                    <span className="text-sm">{day.day}</span>
                    <div className="flex items-center">
                      <div 
                        className="bg-delivery-accent h-2 rounded-full mr-2"
                        style={{ width: `${(day.amount / 100) * 100}px` }}
                      />
                      <span className="text-sm font-medium">${day.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Delivery Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <div className="flex items-center">
                    <span className="text-xl font-semibold">{summary.totalDeliveries}</span>
                    <ArrowUpRight className="h-4 w-4 ml-1 text-green-600" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center">
                    <span className="text-xl font-semibold">{summary.ratings.toFixed(1)}</span>
                    <span className="text-sm ml-1 text-muted-foreground">/5.0</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Active Today</span>
                  <div className="flex items-center">
                    <span className="text-xl font-semibold">{summary.activeHours.toFixed(1)}h</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">On-Time Rate</span>
                  <div className="flex items-center">
                    <span className="text-xl font-semibold">97%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DeliveryLayout>
  );
};

export default History;
