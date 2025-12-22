import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Save, Power, Pause, Play, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AffiliateBotSettings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [botStatus, setBotStatus] = useState({ running: true, paused: false });
  
  // Settings state
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gpt-5.1");
  const [tempPrompt, setTempPrompt] = useState("");
  const [tempModel, setTempModel] = useState("gpt-5.1");

  // Load settings
  useEffect(() => {
    loadSettings();
    loadBotStatus();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      
      const [promptRes, modelRes] = await Promise.all([
        fetch("/api/settings/prompt"),
        fetch("/api/settings/model")
      ]);
      
      if (promptRes.ok) {
        const data = await promptRes.json();
        setPrompt(data.prompt || "");
        setTempPrompt(data.prompt || "");
      }
      
      if (modelRes.ok) {
        const data = await modelRes.json();
        setModel(data.model || "gpt-5.1");
        setTempModel(data.model || "gpt-5.1");
      }
    } catch (err) {
      console.error("Error loading settings:", err);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadBotStatus = async () => {
    try {
      const res = await fetch("/api/bot/status");
      if (res.ok) {
        const data = await res.json();
        setBotStatus(data.status || { running: true, paused: false });
      }
    } catch (err) {
      console.error("Error loading bot status:", err);
    }
  };

  const handleSavePrompt = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/settings/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: tempPrompt })
      });

      if (res.ok) {
        setPrompt(tempPrompt);
        toast({
          title: "Success",
          description: "Prompt updated. Restart the bot to apply changes.",
        });
      } else {
        throw new Error("Failed to save prompt");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save prompt",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveModel = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/settings/model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: tempModel })
      });

      if (res.ok) {
        setModel(tempModel);
        toast({
          title: "Success",
          description: "Model updated. Restart the bot to apply changes.",
        });
      } else {
        throw new Error("Failed to save model");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save model",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePause = async () => {
    try {
      const res = await fetch("/api/bot/pause", { method: "POST" });
      if (res.ok) {
        await loadBotStatus();
        toast({
          title: "Success",
          description: "Bot paused",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to pause bot",
        variant: "destructive"
      });
    }
  };

  const handleResume = async () => {
    try {
      const res = await fetch("/api/bot/resume", { method: "POST" });
      if (res.ok) {
        await loadBotStatus();
        toast({
          title: "Success",
          description: "Bot resumed",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to resume bot",
        variant: "destructive"
      });
    }
  };

  const handleStop = async () => {
    if (!confirm("Are you sure you want to stop the bot?")) {
      return;
    }
    
    try {
      const res = await fetch("/api/bot/stop", { method: "POST" });
      if (res.ok) {
        await loadBotStatus();
        toast({
          title: "Success",
          description: "Bot stopped. Restart required to resume.",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to stop bot",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bot Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage prompt, GPT model, and bot control
          </p>
        </div>
      </div>

      {/* Bot Control */}
      <Card>
        <CardHeader>
          <CardTitle>Bot Control</CardTitle>
          <CardDescription>Manage bot status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${botStatus.running && !botStatus.paused ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <div>
                <div className="font-medium">
                  {botStatus.running && !botStatus.paused ? 'Running' : botStatus.paused ? 'Paused' : 'Stopped'}
                </div>
                <div className="text-sm text-muted-foreground">
                  Current bot status
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {!botStatus.paused && botStatus.running ? (
              <Button onClick={handlePause} variant="outline" className="flex-1">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            ) : (
              <Button onClick={handleResume} variant="outline" className="flex-1" disabled={!botStatus.running}>
                <Play className="w-4 h-4 mr-2" />
                Resume
              </Button>
            )}
            <Button onClick={handleStop} variant="destructive" className="flex-1">
              <Power className="w-4 h-4 mr-2" />
              Stop
            </Button>
          </div>

          {!botStatus.running && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Bot is stopped. Restart required to resume.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* GPT Model Settings */}
      <Card>
        <CardHeader>
          <CardTitle>GPT Model</CardTitle>
          <CardDescription>Change the AI model being used</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select value={tempModel} onValueChange={setTempModel}>
              <SelectTrigger id="model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                <SelectItem value="gpt-5.1">GPT-5.1</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {tempModel !== model && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Unsaved changes. Save and restart the bot to apply changes.
              </AlertDescription>
            </Alert>
          )}

          <Button onClick={handleSaveModel} disabled={saving || tempModel === model} className="w-full">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Model
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* System Prompt Settings */}
      <Card>
        <CardHeader>
          <CardTitle>System Prompt</CardTitle>
          <CardDescription>Edit bot prompt</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              value={tempPrompt}
              onChange={(e) => setTempPrompt(e.target.value)}
              rows={20}
              className="font-mono text-sm"
              placeholder="Enter system prompt here..."
            />
            <div className="text-xs text-muted-foreground">
              {tempPrompt.length} characters
            </div>
          </div>

          {tempPrompt !== prompt && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Unsaved changes. Save and restart the bot to apply changes.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button onClick={handleSavePrompt} disabled={saving || tempPrompt === prompt} className="flex-1">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Prompt
                </>
              )}
            </Button>
            <Button 
              onClick={() => setTempPrompt(prompt)} 
              variant="outline" 
              disabled={tempPrompt === prompt}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

