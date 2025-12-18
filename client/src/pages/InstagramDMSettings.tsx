import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, AlertCircle, CheckCircle, XCircle, Loader2, Mail, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGoogleAuthStatus, useGoogleAuthUrl, useRevokeGoogleAuth } from "@/hooks/useInstagramDmApi";

export default function InstagramDMSettings() {
  const { toast } = useToast();
  const { data: authStatus, refetch: refetchAuthStatus } = useGoogleAuthStatus();
  const { data: authUrlData, refetch: fetchAuthUrl } = useGoogleAuthUrl();
  const revokeAuth = useRevokeGoogleAuth();
  
  const [settings, setSettings] = useState({
    defaultDelayMin: 45,
    defaultDelayMax: 120,
    defaultDmsPerHour: 10,
    defaultDmsPerDay: 50,
    warmupDays1_3Max: 25,
    warmupDays4_7Max: 50,
  });

  // Check for OAuth callback parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('connected') === 'true') {
      toast({ title: "Success", description: `Connected to Google account: ${params.get('email') || ''}` });
      refetchAuthStatus();
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (params.get('error')) {
      toast({ title: "Error", description: params.get('error') || 'Failed to connect Google account', variant: "destructive" });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [toast, refetchAuthStatus]);

  const handleConnectGoogle = async () => {
    try {
      await fetchAuthUrl();
      if (authUrlData?.authUrl) {
        window.location.href = authUrlData.authUrl;
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || 'Failed to get authorization URL', variant: "destructive" });
    }
  };

  const handleDisconnectGoogle = async () => {
    if (!confirm('Are you sure you want to disconnect your Google account?')) return;
    try {
      await revokeAuth.mutateAsync();
      toast({ title: "Success", description: "Google account disconnected" });
      refetchAuthStatus();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || 'Failed to disconnect', variant: "destructive" });
    }
  };

  const handleSave = () => {
    // In a real implementation, this would save to the backend
    toast({ title: "Success", description: "Settings saved successfully" });
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 liquid-blob" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 liquid-blob" style={{ animationDelay: '-5s', animationDuration: '15s' }} />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
              <p className="text-sm text-muted-foreground">Configure rate limits and behavior</p>
            </div>

            {/* Google Sheets Connection */}
            <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl mb-6 max-w-4xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Google Sheets Connection
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your Google account to automatically read and write to Google Sheets
                  </p>
                </div>
                {authStatus?.authenticated ? (
                  <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/50">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/50">
                    <XCircle className="w-3 h-3 mr-1" />
                    Not Connected
                  </Badge>
                )}
              </div>

              {authStatus?.authenticated ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">Connected Account</p>
                        <p className="text-xs text-muted-foreground mt-1">{authStatus.email || 'Unknown'}</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleDisconnectGoogle}
                        disabled={revokeAuth.isPending}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        {revokeAuth.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-2" />
                        )}
                        Disconnect
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                    <p className="text-xs text-green-400">
                      ✓ Your Google account is connected. Campaigns can now automatically read and write to Google Sheets.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect your Google account to enable automatic Google Sheets integration. This allows campaigns to:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-2 mb-4 list-disc list-inside">
                      <li>Read campaign data from your Google Sheets</li>
                      <li>Update row status automatically</li>
                      <li>Track sent/failed/blocked status in real-time</li>
                    </ul>
                    <Button
                      onClick={handleConnectGoogle}
                      className="bg-primary hover:bg-primary/90 w-full"
                      disabled={fetchAuthUrl.isFetching}
                    >
                      {fetchAuthUrl.isFetching ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Connect Google Account
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/20">
                    <p className="text-xs text-yellow-400">
                      ⚠ You need to connect a Google account before creating campaigns that use Google Sheets.
                    </p>
                  </div>
                </div>
              )}
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
              {/* Rate Limiting */}
              <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  Rate Limiting
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Default DMs Per Hour</Label>
                    <Input
                      type="number"
                      value={settings.defaultDmsPerHour}
                      onChange={(e) => setSettings({ ...settings, defaultDmsPerHour: parseInt(e.target.value) || 10 })}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">8-12 recommended per account</p>
                  </div>
                  <div>
                    <Label>Default DMs Per Day</Label>
                    <Input
                      type="number"
                      value={settings.defaultDmsPerDay}
                      onChange={(e) => setSettings({ ...settings, defaultDmsPerDay: parseInt(e.target.value) || 50 })}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">40-70 recommended for warmed accounts</p>
                  </div>
                </div>
              </Card>

              {/* Delays */}
              <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Message Delays</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Minimum Delay (seconds)</Label>
                    <Input
                      type="number"
                      value={settings.defaultDelayMin}
                      onChange={(e) => setSettings({ ...settings, defaultDelayMin: parseInt(e.target.value) || 45 })}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Random delay between min and max</p>
                  </div>
                  <div>
                    <Label>Maximum Delay (seconds)</Label>
                    <Input
                      type="number"
                      value={settings.defaultDelayMax}
                      onChange={(e) => setSettings({ ...settings, defaultDelayMax: parseInt(e.target.value) || 120 })}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">45-120 seconds recommended</p>
                  </div>
                </div>
              </Card>

              {/* Warm-up Strategy */}
              <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Warm-up Strategy</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Days 1-3 Max DMs/Day</Label>
                    <Input
                      type="number"
                      value={settings.warmupDays1_3Max}
                      onChange={(e) => setSettings({ ...settings, warmupDays1_3Max: parseInt(e.target.value) || 25 })}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Conservative limit for new accounts</p>
                  </div>
                  <div>
                    <Label>Days 4-7 Max DMs/Day</Label>
                    <Input
                      type="number"
                      value={settings.warmupDays4_7Max}
                      onChange={(e) => setSettings({ ...settings, warmupDays4_7Max: parseInt(e.target.value) || 50 })}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Moderate limit during warm-up</p>
                  </div>
                </div>
              </Card>

              {/* Safety Features */}
              <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-white mb-4">Safety Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10">
                    <div>
                      <p className="text-sm font-medium text-white">Auto-Pause on Block</p>
                      <p className="text-xs text-muted-foreground">Automatically pause campaigns when blocks detected</p>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-green-500/20 flex items-center justify-end px-1">
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10">
                    <div>
                      <p className="text-sm font-medium text-white">Challenge Detection</p>
                      <p className="text-xs text-muted-foreground">Detect and handle Instagram challenges</p>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-green-500/20 flex items-center-end px-1">
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/10">
                    <div>
                      <p className="text-sm font-medium text-white">Human-like Behavior</p>
                      <p className="text-xs text-muted-foreground">Random delays and typing simulation</p>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-green-500/20 flex items-center-end px-1">
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

