import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  { id: "C001", name: "Summer Sale Campaign", status: "active", contacts: 5200, sent: 4800 },
  { id: "C002", name: "New Product Launch", status: "active", contacts: 3400, sent: 2100 },
  { id: "C003", name: "Loyalty Program Promo", status: "completed", contacts: 8900, sent: 8900 },
  { id: "C004", name: "Re-engagement Drive", status: "scheduled", contacts: 2300, sent: 0 },
];

export default function AutoDMCampaigns() {
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
              <h1 className="text-3xl font-bold text-white mb-1">Campaigns</h1>
              <p className="text-sm text-muted-foreground">Manage your DM campaigns</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">{campaign.name}</h3>
                    <Badge variant={campaign.status === 'active' ? 'default' : campaign.status === 'completed' ? 'secondary' : 'outline'} className="text-[10px]">
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Contacts</p>
                      <p className="text-white font-medium">{campaign.contacts}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Messages Sent</p>
                      <p className="text-white font-medium">{campaign.sent}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
