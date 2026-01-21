'use client';

import { useState } from 'react';
import { Card, Button } from '@/components/ui';

export function ClientEngagement() {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command) return;
    
    setIsProcessing(true);
    setResponse(null);
    
    setTimeout(() => {
      setIsProcessing(false);
      setResponse(`SYSTEM_RESPONSE: PROJECT_VELOCITY_STABLE. NO ANOMALIES DETECTED IN NODE_SET: ${command.toUpperCase()}.`);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-12">
      {/* AI Command Hub */}
      <Card className="bg-slate-900 border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl" />
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-6 flex items-center gap-3">
           <span className="text-blue-500 animate-pulse">●</span> COMMAND_INSIGHT
        </h3>
        <form onSubmit={handleCommand} className="space-y-4">
          <div className="relative">
             <textarea 
               value={command}
               onChange={(e) => setCommand(e.target.value)}
               placeholder="ENTER_QUERY (e.g. status_check, security_audit)..."
               className="w-full bg-slate-950 border border-white/10 rounded-2xl p-6 text-sm font-mono text-blue-400 placeholder-slate-700 focus:outline-none focus:border-blue-500/50 transition-all h-32 uppercase italic"
             />
             <div className="absolute bottom-4 right-4 text-[8px] font-mono text-slate-700">KERNEL_v4.2</div>
          </div>
          <Button 
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-xl flex items-center justify-center gap-2 group/btn"
          >
            {isProcessing ? 'SYNCHRONIZING...' : 'INITIALIZE_QUERY'}
            {!isProcessing && <span className="text-lg -translate-y-px group-hover/btn:translate-x-1 transition-transform">→</span>}
          </Button>
        </form>
        
        {response && (
          <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl animate-in slide-in-from-top-2 duration-500">
             <p className="text-[10px] font-mono text-blue-400 leading-relaxed uppercase italic">
                {response}
             </p>
          </div>
        )}
      </Card>

      {/* Infrastructure Heatmap - Visual Decors */}
      <Card className="bg-slate-900 border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl flex flex-col justify-between">
         <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">INFRA_PULSE</h3>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Global Node Activity</p>
         </div>
         
         <div className="grid grid-cols-8 gap-2 my-8">
            {Array.from({ length: 32 }).map((_, i) => (
               <div 
                  key={i} 
                  className={`h-4 rounded-xs transition-all duration-300 ${
                    i % 5 === 0 ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 
                    i % 7 === 0 ? 'bg-cyan-400' : 
                    'bg-slate-800'
                  } group-hover:scale-110`}
               />
            ))}
         </div>

         <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex gap-4">
               <div>
                  <div className="text-xs font-black text-white italic">14ms</div>
                  <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Latency</p>
               </div>
               <div>
                  <div className="text-xs font-black text-white italic">842MB/s</div>
                  <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Throughput</p>
               </div>
            </div>
            <div className="text-[10px] font-black text-emerald-500 flex items-center gap-2 italic uppercase">
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
               HEALTHY
            </div>
         </div>
      </Card>
    </div>
  );
}
