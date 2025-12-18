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
import ExplainerConversations from "@/pages/ExplainerConversations";
import ExplainerLearningModules from "@/pages/ExplainerLearningModules";
import ExplainerAnalytics from "@/pages/ExplainerAnalytics";
import ExplainerKnowledge from "@/pages/ExplainerKnowledge";
import ExplainerSettings from "@/pages/ExplainerSettings";

import AutoDMDashboard from "@/pages/AutoDMDashboard";
import AutoDMCampaigns from "@/pages/AutoDMCampaigns";
import AutoDMEngagement from "@/pages/AutoDMEngagement";
import AutoDMAudience from "@/pages/AutoDMAudience";
import AutoDMSettings from "@/pages/AutoDMSettings";

import ViralBotDashboard from "@/pages/ViralBotDashboard";
import ViralBotAnalytics from "@/pages/ViralBotAnalytics";
import ViralBotContentTracking from "@/pages/ViralBotContentTracking";
import ViralBotNetworkMap from "@/pages/ViralBotNetworkMap";
import ViralBotSettings from "@/pages/ViralBotSettings";

import IceballBotDashboard from "@/pages/IceballBotDashboard";
import IceballAnalytics from "@/pages/IceballAnalytics";
import IceballImageProcessing from "@/pages/IceballImageProcessing";
import IceballDataModels from "@/pages/IceballDataModels";
import IceballSystemConfig from "@/pages/IceballSystemConfig";

import VIPPassportDashboard from "@/pages/VIPPassportDashboard";
import VIPMissions from "@/pages/VIPMissions";
import VIPRewards from "@/pages/VIPRewards";
import VIPUserEngagement from "@/pages/VIPUserEngagement";
import VIPSettings from "@/pages/VIPSettings";

import InstagramDMDashboard from "@/pages/InstagramDMDashboard";
import InstagramDMCampaigns from "@/pages/InstagramDMCampaigns";
import InstagramDMAccounts from "@/pages/InstagramDMAccounts";
import InstagramDMLogs from "@/pages/InstagramDMLogs";
import InstagramDMSettings from "@/pages/InstagramDMSettings";

import CollaminShelftalkerDashboard from "@/pages/CollaminShelftalkerDashboard";

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
      
      {/* Explainer Dashboard Routes */}
      <Route path="/dashboard/explainer" component={ExplainerDashboard} />
      <Route path="/dashboard/explainer/conversations" component={ExplainerConversations} />
      <Route path="/dashboard/explainer/analytics" component={ExplainerAnalytics} />
      <Route path="/dashboard/explainer/knowledge" component={ExplainerKnowledge} />
      <Route path="/dashboard/explainer/settings" component={ExplainerSettings} />
      
      {/* Auto DM Dashboard Routes */}
      <Route path="/dashboard/auto-dm" component={AutoDMDashboard} />
      <Route path="/dashboard/auto-dm/conversations" component={AutoDMCampaigns} />
      <Route path="/dashboard/auto-dm/analytics" component={AutoDMEngagement} />
      <Route path="/dashboard/auto-dm/knowledge" component={AutoDMAudience} />
      <Route path="/dashboard/auto-dm/settings" component={AutoDMSettings} />
      
      {/* Viral Bot Routes */}
      <Route path="/dashboard/viral-bot" component={ViralBotDashboard} />
      <Route path="/dashboard/viral-bot/conversations" component={ViralBotContentTracking} />
      <Route path="/dashboard/viral-bot/analytics" component={ViralBotAnalytics} />
      <Route path="/dashboard/viral-bot/knowledge" component={ViralBotNetworkMap} />
      <Route path="/dashboard/viral-bot/settings" component={ViralBotSettings} />
      
      {/* Iceball Dashboard Routes */}
      <Route path="/dashboard/iceball-bot" component={IceballBotDashboard} />
      <Route path="/dashboard/iceball-bot/conversations" component={IceballAnalytics} />
      <Route path="/dashboard/iceball-bot/analytics" component={IceballImageProcessing} />
      <Route path="/dashboard/iceball-bot/knowledge" component={IceballDataModels} />
      <Route path="/dashboard/iceball-bot/settings" component={IceballSystemConfig} />
      
      {/* VIP Passport Dashboard Routes */}
      <Route path="/dashboard/vip-passport" component={VIPPassportDashboard} />
      <Route path="/dashboard/vip-passport/conversations" component={VIPMissions} />
      <Route path="/dashboard/vip-passport/analytics" component={VIPRewards} />
      <Route path="/dashboard/vip-passport/knowledge" component={VIPUserEngagement} />
      <Route path="/dashboard/vip-passport/settings" component={VIPSettings} />
      
      {/* Instagram DM Bot Dashboard Routes */}
      <Route path="/dashboard/instagram-dm" component={InstagramDMDashboard} />
      <Route path="/dashboard/instagram-dm/campaigns" component={InstagramDMCampaigns} />
      <Route path="/dashboard/instagram-dm/accounts" component={InstagramDMAccounts} />
      <Route path="/dashboard/instagram-dm/logs" component={InstagramDMLogs} />
      <Route path="/dashboard/instagram-dm/settings" component={InstagramDMSettings} />
      
      {/* Collamin Shelftalker Dashboard Routes */}
      <Route path="/dashboard/collamin-shelftalker" component={CollaminShelftalkerDashboard} />
      
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
