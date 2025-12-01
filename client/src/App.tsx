import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ProjectsOverview from "@/pages/ProjectsOverview";
import Dashboard from "@/pages/Dashboard";
import Conversations from "@/pages/Conversations";
import Analytics from "@/pages/Analytics";
import KnowledgeBase from "@/pages/KnowledgeBase";
import Settings from "@/pages/Settings";
import ExplainerDashboard from "@/pages/ExplainerDashboard";
import AutoDMDashboard from "@/pages/AutoDMDashboard";
import ViralBotDashboard from "@/pages/ViralBotDashboard";
import IceballBotDashboard from "@/pages/IceballBotDashboard";
import VIPPassportDashboard from "@/pages/VIPPassportDashboard";

function Router() {
  return (
    <Switch>
      {/* Main Landing - Project Selection */}
      <Route path="/" component={ProjectsOverview} />

      {/* Project Specific Routes - using :id param */}
      <Route path="/bot/:id" component={Dashboard} />
      <Route path="/bot/:id/conversations" component={Conversations} />
      <Route path="/bot/:id/analytics" component={Analytics} />
      <Route path="/bot/:id/knowledge" component={KnowledgeBase} />
      <Route path="/bot/:id/settings" component={Settings} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard/explainer" component={ExplainerDashboard} />
      <Route path="/dashboard/auto-dm" component={AutoDMDashboard} />
      <Route path="/dashboard/viral-bot" component={ViralBotDashboard} />
      <Route path="/dashboard/iceball-bot" component={IceballBotDashboard} />
      <Route path="/dashboard/vip-passport" component={VIPPassportDashboard} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
