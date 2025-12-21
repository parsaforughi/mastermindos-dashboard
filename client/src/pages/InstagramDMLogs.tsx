import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Filter, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { useInstagramDMLogs, useInstagramDMCampaigns } from "@/hooks/useInstagramDmApi";
import { useState } from "react";

export default function InstagramDMLogs() {
  const { data: campaigns } = useInstagramDMCampaigns();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | undefined>(undefined);
  const { data: logsData, isLoading } = useInstagramDMLogs(selectedCampaignId);

  const logs = logsData?.logs || [];

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-400/20 bg-green-400/5';
      case 'error':
        return 'border-red-400/20 bg-red-400/5';
      case 'warning':
        return 'border-orange-400/20 bg-orange-400/5';
      default:
        return 'border-blue-400/20 bg-blue-400/5';
    }
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
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Campaign Logs</h1>
                <p className="text-sm text-muted-foreground">View real-time logs and activity</p>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedCampaignId || 'all'} onValueChange={(value) => setSelectedCampaignId(value === 'all' ? undefined : value)}>
                  <SelectTrigger className="w-[200px] bg-white/5 border-white/10">
                    <SelectValue placeholder="All Campaigns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Campaigns</SelectItem>
                    {campaigns?.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-2">
                {logs.length === 0 ? (
                  <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-xl text-center">
                    <p className="text-muted-foreground">No logs available</p>
                  </Card>
                ) : (
                  logs.map((log) => (
                    <Card
                      key={log.id}
                      className={`p-4 border ${getLogColor(log.type)} backdrop-blur-xl`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getLogIcon(log.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-[10px]">
                              {log.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(log.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-white">{log.message}</p>
                          {log.details && Object.keys(log.details).length > 0 && (
                            <div className="mt-2 p-2 bg-black/20 rounded text-xs font-mono text-muted-foreground">
                              <pre>{JSON.stringify(log.details, null, 2)}</pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}







