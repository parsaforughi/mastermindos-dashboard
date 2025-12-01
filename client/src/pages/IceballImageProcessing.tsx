import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const processingJobs = [
  { id: "J001", name: "Batch Process - Dataset Alpha", status: "completed", progress: 100, time: "2.3s" },
  { id: "J002", name: "Real-time Recognition", status: "processing", progress: 67, time: "In progress" },
  { id: "J003", name: "Image Optimization", status: "completed", progress: 100, time: "1.8s" },
  { id: "J004", name: "Deep Analysis Queue", status: "queued", progress: 0, time: "Pending" },
];

export default function IceballImageProcessing() {
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
              <h1 className="text-3xl font-bold text-white mb-1">Image Processing</h1>
              <p className="text-sm text-muted-foreground">Computer vision job management</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {processingJobs.map((job) => (
                <Card key={job.id} className="p-4 border-white/10 bg-white/5 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">{job.name}</h3>
                    <Badge variant={job.status === 'completed' ? 'default' : job.status === 'processing' ? 'secondary' : 'outline'} className="text-[10px]">
                      {job.status}
                    </Badge>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-primary" style={{ width: `${job.progress}%` }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">{job.progress}% Complete</p>
                    <p className="text-xs text-muted-foreground">{job.time}</p>
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
