import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card } from "@/components/ui/card";

const models = [
  { id: "M001", name: "ResNet-50 V2", type: "Classification", accuracy: "98.4%", size: "102MB" },
  { id: "M002", name: "YOLO-v5", type: "Detection", accuracy: "96.1%", size: "204MB" },
  { id: "M003", name: "SegNet", type: "Segmentation", accuracy: "94.2%", size: "156MB" },
  { id: "M004", name: "VGG-19", type: "Feature Extract", accuracy: "97.8%", size: "548MB" },
];

export default function IceballDataModels() {
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
              <h1 className="text-3xl font-bold text-white mb-1">Data Models</h1>
              <p className="text-sm text-muted-foreground">Trained models and algorithms</p>
            </div>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-muted-foreground">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Model</th>
                      <th className="text-center py-3 px-4">Type</th>
                      <th className="text-right py-3 px-4">Accuracy</th>
                      <th className="text-right py-3 px-4">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.map((model) => (
                      <tr key={model.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4 text-white font-medium">{model.name}</td>
                        <td className="py-3 px-4 text-center">{model.type}</td>
                        <td className="py-3 px-4 text-right text-green-400">{model.accuracy}</td>
                        <td className="py-3 px-4 text-right">{model.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
