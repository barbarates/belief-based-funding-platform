
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Investments from "./pages/Investments";
import InvestmentDetail from "./pages/InvestmentDetail";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import SolanaTest from "./pages/SolanaTest";
import SolanaLive from "./pages/SolanaLive";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/solana-live" element={<SolanaLive />} />
          <Route path="/solana-test" element={<SolanaTest />} />
          <Route 
            path="/investments" 
            element={
              <ProtectedRoute>
                <Investments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/invest/:id" 
            element={
              <ProtectedRoute>
                <InvestmentDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile/:id" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
