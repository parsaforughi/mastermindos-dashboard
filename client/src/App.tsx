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
