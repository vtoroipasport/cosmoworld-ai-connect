
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Messenger from "./pages/Messenger";
import Payments from "./pages/Payments";
import Housing from "./pages/Housing";
import Taxi from "./pages/Taxi";
import Food from "./pages/Food";
import Groups from "./pages/Groups";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/housing" element={<Housing />} />
          <Route path="/taxi" element={<Taxi />} />
          <Route path="/food" element={<Food />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
