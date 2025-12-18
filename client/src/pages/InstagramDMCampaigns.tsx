import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Play, Pause, Square, Trash2, Edit } from "lucide-react";
import { useInstagramDMCampaigns, useStartInstagramDMCampaign, useStopInstagramDMCampaign, usePauseInstagramDMCampaign, useResumeInstagramDMCampaign, useDeleteInstagramDMCampaign, useCreateInstagramDMCampaign, useInstagramDMAccounts } from "@/hooks/useInstagramDmApi";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function InstagramDMCampaigns() {
  const { data: campaigns, isLoading } = useInstagramDMCampaigns();
  const { data: accounts } = useInstagramDMAccounts();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    googleSheetId: '',
    sheetName: 'Sheet1',
    instagramAccountId: '',
    messageTemplate: '',
    startTime: '',
    endTime: '',
    dailyWindows: [] as Array<{ start: string; end: string }>,
  });

  const startCampaign = useStartInstagramDMCampaign();
  const stopCampaign = useStopInstagramDMCampaign();
  const pauseCampaign = usePauseInstagramDMCampaign();
  const resumeCampaign = useResumeInstagramDMCampaign();
  const deleteCampaign = useDeleteInstagramDMCampaign();
  const createCampaign = useCreateInstagramDMCampaign();

  const handleStart = async (id: string) => {
    try {
      await startCampaign.mutateAsync(id);
      toast({ title: "Success", description: "Campaign started" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleStop = async (id: string) => {
    try {
      await stopCampaign.mutateAsync(id);
      toast({ title: "Success", description: "Campaign stopped" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handlePause = async (id: string) => {
    try {
      await pauseCampaign.mutateAsync(id);
      toast({ title: "Success", description: "Campaign paused" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleResume = async (id: string) => {
    try {
      await resumeCampaign.mutateAsync(id);
      toast({ title: "Success", description: "Campaign resumed" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await deleteCampaign.mutateAsync(id);
      toast({ title: "Success", description: "Campaign deleted" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleCreate = async () => {
    try {
      await createCampaign.mutateAsync({
        ...formData,
        startTime: formData.startTime || undefined,
        endTime: formData.endTime || undefined,
        dailyWindows: formData.dailyWindows.length > 0 ? formData.dailyWindows : undefined,
      });
      toast({ title: "Success", description: "Campaign created" });
      setIsCreateDialogOpen(false);
      setFormData({
        name: '',
        googleSheetId: '',
        sheetName: 'Sheet1',
        instagramAccountId: '',
        messageTemplate: '',
        startTime: '',
        endTime: '',
        dailyWindows: [],
      });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
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
                <h1 className="text-3xl font-bold text-white mb-1">Campaigns</h1>
                <p className="text-sm text-muted-foreground">Manage your Instagram DM campaigns</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    New Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-background border-white/10 text-foreground max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Campaign</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Campaign Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="My Campaign"
                      />
                    </div>
                    <div>
                      <Label>Google Sheet ID</Label>
                      <Input
                        value={formData.googleSheetId}
                        onChange={(e) => setFormData({ ...formData, googleSheetId: e.target.value })}
                        placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                      />
                    </div>
                    <div>
                      <Label>Sheet Name</Label>
                      <Input
                        value={formData.sheetName}
                        onChange={(e) => setFormData({ ...formData, sheetName: e.target.value })}
                        placeholder="Sheet1"
                      />
                    </div>
                    <div>
                      <Label>Instagram Account</Label>
                      <select
                        className="w-full px-3 py-2 bg-background border border-white/10 rounded-md text-foreground"
                        value={formData.instagramAccountId}
                        onChange={(e) => setFormData({ ...formData, instagramAccountId: e.target.value })}
                      >
                        <option value="">Select an account</option>
                        {accounts?.map(account => (
                          <option key={account.id} value={account.id}>{account.username}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Message Template</Label>
                      <Textarea
                        value={formData.messageTemplate}
                        onChange={(e) => setFormData({ ...formData, messageTemplate: e.target.value })}
                        placeholder="Hi {firstName}! This is a message for @{username}"
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use {"{firstName}"} and {"{username}"} as variables
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Time (optional)</Label>
                        <Input
                          type="datetime-local"
                          value={formData.startTime}
                          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>End Time (optional)</Label>
                        <Input
                          type="datetime-local"
                          value={formData.endTime}
                          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button onClick={handleCreate} className="w-full" disabled={createCampaign.isPending}>
                      {createCampaign.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      Create Campaign
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {campaigns && campaigns.length === 0 ? (
                  <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-xl text-center">
                    <p className="text-muted-foreground">No campaigns available. Create one to get started.</p>
                  </Card>
                ) : (
                  campaigns?.map((campaign) => (
                    <Card key={campaign.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-lg mb-2">{campaign.name}</h3>
                          <div className="flex items-center gap-4 mb-2">
                            <Badge variant={campaign.status === 'active' ? 'default' : campaign.status === 'paused' ? 'secondary' : 'outline'}>
                              {campaign.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">Sheet: {campaign.sheetName}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{campaign.messageTemplate.substring(0, 100)}...</p>
                        </div>
                        <div className="flex gap-2">
                          {campaign.status === 'active' ? (
                            <>
                              <Button size="sm" variant="outline" onClick={() => handlePause(campaign.id)}>
                                <Pause className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleStop(campaign.id)}>
                                <Square className="w-4 h-4" />
                              </Button>
                            </>
                          ) : campaign.status === 'paused' ? (
                            <>
                              <Button size="sm" variant="outline" onClick={() => handleResume(campaign.id)}>
                                <Play className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleStop(campaign.id)}>
                                <Square className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => handleStart(campaign.id)}>
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleDelete(campaign.id)}>
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Sent</p>
                          <p className="text-white font-medium text-lg">{campaign.sentRows}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Failed</p>
                          <p className="text-red-400 font-medium text-lg">{campaign.failedRows}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Blocked</p>
                          <p className="text-orange-400 font-medium text-lg">{campaign.blockedRows}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="text-white font-medium text-lg">{campaign.totalRows}</p>
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






