
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import FeatureInProgress from "./pages/FeatureInProgress";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/employees" element={
            <AppLayout>
              <Employees />
            </AppLayout>
          } />
          <Route path="/projects" element={
            <AppLayout>
              <FeatureInProgress feature="Projects" />
            </AppLayout>
          } />
          <Route path="/time-tracking" element={
            <AppLayout>
              <FeatureInProgress feature="Time Tracking" />
            </AppLayout>
          } />
          <Route path="/schedule" element={
            <AppLayout>
              <FeatureInProgress feature="Schedule" />
            </AppLayout>
          } />
          <Route path="/analytics" element={
            <AppLayout>
              <FeatureInProgress feature="Analytics" />
            </AppLayout>
          } />
          <Route path="/settings" element={
            <AppLayout>
              <FeatureInProgress feature="Settings" />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
