import { Sidebar } from "@/components/dashboard/Sidebar";
import { Search, FileText, Database, Folder, MoreVertical, Plus, Upload, Cloud, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const documents = [
  { id: 1, name: "Product_Specs_v2.pdf", type: "PDF", size: "2.4 MB", updated: "2 mins ago", status: "Synced" },
  { id: 2, name: "Pricing_Tier_Enterprise.docx", type: "DOC", size: "1.1 MB", updated: "1 hour ago", status: "Synced" },
  { id: 3, name: "Support_Scripts_2025.txt", type: "TXT", size: "45 KB", updated: "Yesterday", status: "Processing" },
  { id: 4, name: "Brand_Voice_Guidelines.pdf", type: "PDF", size: "5.8 MB", updated: "2 days ago", status: "Synced" },
  { id: 5, name: "API_Documentation_Reference.md", type: "MD", size: "120 KB", updated: "3 days ago", status: "Synced" },
];

export default function KnowledgeBase() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/20 relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-40" />

      <div className="relative z-10 flex h-full w-full">
        <Sidebar />

        <main className="flex-1 flex flex-col h-full overflow-hidden p-6">
          <header className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div>
              <h1 className="text-3xl font-display font-bold text-gradient">Knowledge Base</h1>
              <p className="text-muted-foreground mt-1">Manage context sources and training data</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-white/10 hover:bg-white/5 gap-2">
                <Cloud className="w-4 h-4" />
                Sync Status
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 gap-2">
                <Upload className="w-4 h-4" />
                Upload Source
              </Button>
            </div>
          </header>

          <div className="glass-panel flex-1 rounded-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            {/* Toolbar */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search documents..." className="pl-9 bg-black/20 border-white/10 focus-visible:ring-primary/30" />
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Folder className="w-4 h-4" /></Button>
                 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Database className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider bg-white/[0.01]">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Updated</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
              {documents.map((doc, i) => (
                <div 
                  key={doc.id} 
                  className="grid grid-cols-12 items-center px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">{doc.name}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 font-mono">{doc.type}</span>
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground font-mono">{doc.size}</div>
                  <div className="col-span-2 text-sm text-muted-foreground">{doc.updated}</div>
                  <div className="col-span-1 flex justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
