
import React, { useState } from 'react';
import { Bell, User, Home, History, ChevronLeft, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDelivery } from '@/contexts/DeliveryContext';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useLocation } from 'react-router-dom';
import PartnerStatusToggle from './PartnerStatusToggle';
import { useIsMobile } from '@/hooks/use-mobile';

interface DeliveryLayoutProps {
  children: React.ReactNode;
}

const DeliveryLayout: React.FC<DeliveryLayoutProps> = ({ children }) => {
  const { partner, unreadNotificationsCount } = useDelivery();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const nav = [
    { 
      label: 'Dashboard', 
      icon: Home, 
      path: '/delivery'
    },
    { 
      label: 'History', 
      icon: History, 
      path: '/delivery/history'
    },
    {
      label: 'Notifications',
      icon: Bell,
      path: '/delivery/notifications',
      badge: unreadNotificationsCount
    },
    {
      label: 'Profile',
      icon: User,
      path: '/delivery/profile'
    }
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 inset-x-0 h-16 bg-white border-b z-30 flex items-center px-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-4 font-semibold">Speedy Groceries</div>
          <div className="ml-auto flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/delivery/notifications')}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-delivery-primary rounded-full" />
              )}
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={partner.avatar} />
              <AvatarFallback>{partner.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 border-r bg-white transition-transform duration-300 ease-in-out",
          isMobile && "transform",
          isMobile && !sidebarOpen && "-translate-x-full",
          isMobile && "pt-16"
        )}
      >
        {isMobile && sidebarOpen && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-18 right-2 mt-2" 
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
        
        {!isMobile && (
          <div className="p-6 flex items-center gap-2">
            <ChevronLeft className="h-5 w-5 text-delivery-primary" />
            <h1 className="text-xl font-bold">Speedy Groceries</h1>
          </div>
        )}
        
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={partner.avatar} />
              <AvatarFallback>{partner.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{partner.name}</p>
              <p className="text-xs text-muted-foreground">Delivery Partner</p>
            </div>
          </div>
          
          <div className="mt-4">
            <PartnerStatusToggle />
          </div>
        </div>
        
        <Separator />
        
        <nav className="p-4">
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.label}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start nav-item",
                    location.pathname === item.path && "nav-item-active"
                  )}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <Badge className="ml-auto bg-delivery-primary text-white">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="rounded-lg bg-accent p-4">
            <h3 className="font-medium mb-1 text-sm">Need help?</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Contact our support team for any issues with your deliveries.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "md:ml-64" : "ml-0",
          isMobile && "mt-16"
        )}
      >
        {/* Overlay for mobile when sidebar is open */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <main className="container py-6 px-4 md:px-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DeliveryLayout;
