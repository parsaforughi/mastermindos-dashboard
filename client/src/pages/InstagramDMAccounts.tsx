import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Trash2, Edit, User, Activity, Clock } from "lucide-react";
import { useInstagramDMAccounts, useCreateInstagramDMAccount, useUpdateInstagramDMAccount, useDeleteInstagramDMAccount } from "@/hooks/useInstagramDmApi";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

function getMaxDMsPerDay(warmupDay: number): number {
  if (warmupDay <= 3) return 25;
  if (warmupDay <= 7) return 50;
  return 50;
}

export default function InstagramDMAccounts() {
  const { data: accounts, isLoading } = useInstagramDMAccounts();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    cookies: '',
    isActive: true,
    proxy: '',
    warmupDay: 0,
  });

  const createAccount = useCreateInstagramDMAccount();
  const updateAccount = useUpdateInstagramDMAccount();
  const deleteAccount = useDeleteInstagramDMAccount();

  const handleCreate = async () => {
    if (!formData.username || !formData.cookies) {
      toast({ title: "Error", description: "Username and cookies are required", variant: "destructive" });
      return;
    }

    try {
      await createAccount.mutateAsync(formData);
      toast({ title: "Success", description: "Account created successfully" });
      setIsCreateDialogOpen(false);
      setFormData({
        username: '',
        cookies: '',
        isActive: true,
        proxy: '',
        warmupDay: 0,
      });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateAccount.mutateAsync({ id, data: formData });
      toast({ title: "Success", description: "Account updated successfully" });
      setEditingAccount(null);
      setFormData({
        username: '',
        cookies: '',
        isActive: true,
        proxy: '',
        warmupDay: 0,
      });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this account?')) return;
    try {
      await deleteAccount.mutateAsync(id);
      toast({ title: "Success", description: "Account deleted" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const startEdit = (account: any) => {
    setEditingAccount(account.id);
    setFormData({
      username: account.username,
      cookies: '', // Don't show cookies for security
      isActive: account.isActive,
      proxy: account.proxy || '',
      warmupDay: account.warmupDay || 0,
    });
  };

  const getMaxDMsPerDay = (warmupDay: number) => {
    if (warmupDay <= 3) return 25;
    if (warmupDay <= 7) return 50;
    return 50;
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
                <h1 className="text-3xl font-bold text-white mb-1">Instagram Accounts</h1>
                <p className="text-sm text-muted-foreground">Manage your Instagram accounts and session cookies</p>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-background border-white/10 text-foreground max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add Instagram Account</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Instagram Username</Label>
                      <Input
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="username"
                      />
                    </div>
                    <div>
                      <Label>Session Cookies (JSON)</Label>
                      <Textarea
                        value={formData.cookies}
                        onChange={(e) => setFormData({ ...formData, cookies: e.target.value })}
                        placeholder='[{"name":"sessionid","value":"...","domain":".instagram.com",...}]'
                        rows={6}
                        className="font-mono text-xs"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Export cookies from browser as JSON array. Use Cookie-Editor extension.
                      </p>
                    </div>
                    <div>
                      <Label>Proxy (Optional)</Label>
                      <Input
                        value={formData.proxy}
                        onChange={(e) => setFormData({ ...formData, proxy: e.target.value })}
                        placeholder="http://proxy:port"
                      />
                    </div>
                    <div>
                      <Label>Warm-up Day</Label>
                      <Input
                        type="number"
                        value={formData.warmupDay}
                        onChange={(e) => setFormData({ ...formData, warmupDay: parseInt(e.target.value) || 0 })}
                        placeholder="0"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Days since account creation. Affects daily DM limits.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label>Active</Label>
                    </div>
                    <Button onClick={handleCreate} className="w-full" disabled={createAccount.isPending}>
                      {createAccount.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      Add Account
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts && accounts.length === 0 ? (
                  <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-xl text-center col-span-full">
                    <p className="text-muted-foreground">No accounts available. Add one to get started.</p>
                  </Card>
                ) : (
                  accounts?.map((account) => (
                    <Card key={account.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">@{account.username}</h3>
                            <Badge variant={account.isActive ? 'default' : 'secondary'} className="text-[10px] mt-1">
                              {account.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(account)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(account.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Warm-up Day</span>
                          <span className="text-white font-medium">{account.warmupDay}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Max DMs/Day</span>
                          <span className="text-white font-medium">{getMaxDMsPerDay(account.warmupDay)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Sent Today</span>
                          <span className="text-green-400 font-medium">{account.dmsSentToday}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Sent This Hour</span>
                          <span className="text-blue-400 font-medium">{account.dmsSentThisHour}</span>
                        </div>
                        {account.lastDmSentAt && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>Last: {new Date(account.lastDmSentAt).toLocaleString()}</span>
                          </div>
                        )}
                        {account.proxy && (
                          <div className="text-xs text-muted-foreground truncate">
                            Proxy: {account.proxy}
                          </div>
                        )}
                      </div>

                      {editingAccount === account.id && (
                        <Dialog open={true} onOpenChange={() => setEditingAccount(null)}>
                          <DialogContent className="bg-background border-white/10 text-foreground max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Account</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div>
                                <Label>Instagram Username</Label>
                                <Input
                                  value={formData.username}
                                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>New Session Cookies (Optional - leave empty to keep current)</Label>
                                <Textarea
                                  value={formData.cookies}
                                  onChange={(e) => setFormData({ ...formData, cookies: e.target.value })}
                                  placeholder="Leave empty to keep current cookies"
                                  rows={4}
                                  className="font-mono text-xs"
                                />
                              </div>
                              <div>
                                <Label>Proxy (Optional)</Label>
                                <Input
                                  value={formData.proxy}
                                  onChange={(e) => setFormData({ ...formData, proxy: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label>Warm-up Day</Label>
                                <Input
                                  type="number"
                                  value={formData.warmupDay}
                                  onChange={(e) => setFormData({ ...formData, warmupDay: parseInt(e.target.value) || 0 })}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={formData.isActive}
                                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                  className="w-4 h-4"
                                />
                                <Label>Active</Label>
                              </div>
                              <div className="flex gap-2">
                                <Button onClick={() => handleUpdate(account.id)} className="flex-1" disabled={updateAccount.isPending}>
                                  {updateAccount.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                  Save
                                </Button>
                                <Button variant="outline" onClick={() => setEditingAccount(null)} className="flex-1">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
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

