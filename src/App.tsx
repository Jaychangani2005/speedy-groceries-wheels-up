
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DeliveryProvider } from "@/contexts/DeliveryContext";
import Index from "./pages/Index";
import Dashboard from "./pages/delivery/Dashboard";
import History from "./pages/delivery/History";
import Notifications from "./pages/delivery/Notifications";
import Profile from "./pages/delivery/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DeliveryProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/delivery" element={<Dashboard />} />
            <Route path="/delivery/history" element={<History />} />
            <Route path="/delivery/notifications" element={<Notifications />} />
            <Route path="/delivery/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DeliveryProvider>
  </QueryClientProvider>
);

export default App;
