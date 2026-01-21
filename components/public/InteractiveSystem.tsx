'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const modules = [
  { id: 'crm', name: 'CRM_CORE', color: 'blue', description: 'RELATIONSHIP_INTELLIGENCE' },
  { id: 'hrm', name: 'HRM_HUB', color: 'cyan', description: 'TALENT_ORCHESTRATION' },
  { id: 'fin', name: 'FIN_LINK', color: 'indigo', description: 'CAPITAL_FLOW_SECURITY' },
  { id: 'ops', name: 'OPS_NEXUS', color: 'slate', description: 'PROCESS_AUTOMATION' },
];

export function InteractiveSystem() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <div className="relative py-20 bg-slate-950 overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-blue-500/10 border border-blue-500/20">
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.3em] italic">Interactive_Simulation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
            PROBE THE <span className="text-blue-600">ARCHITECTURE.</span>
          </h2>
          <p className="mt-4 text-slate-500 font-mono text-xs uppercase italic">[Select_Module_To_Initialize_Pulse]</p>
        </div>

        <div className="relative h-[400px] flex items-center justify-center">
          {/* Central Reactor */}
          <div className="absolute w-32 h-32 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.2)]">
            <div className="w-16 h-16 bg-blue-600 rounded-full animate-pulse flex items-center justify-center">
              <span className="text-white font-black italic">L</span>
            </div>
          </div>

          {/* Module Nodes */}
          {modules.map((m, i) => {
            const angle = (i * 360) / modules.length;
            const radius = 150;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={m.id}
                className="absolute"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x, y, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <div 
                  onMouseEnter={() => setActiveModule(m.id)}
                  onMouseLeave={() => setActiveModule(null)}
                  className={`
                    w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                    ${activeModule === m.id ? 'border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.3)] scale-110' : 'hover:border-slate-600'}
                  `}
                >
                  <span className={`text-[8px] font-mono font-bold mb-1 ${activeModule === m.id ? 'text-blue-400' : 'text-slate-500'}`}>
                    {m.name}
                  </span>
                  <div className={`w-1 h-3 rounded-full ${activeModule === m.id ? 'bg-blue-500 animate-bounce' : 'bg-slate-700'}`} />
                </div>
              </motion.div>
            );
          })}

          {/* Connection Lines (SVGs) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {modules.map((m, i) => {
              const angle = (i * 360) / modules.length;
              const radius = 150;
              const x2 = 200 + Math.cos((angle * Math.PI) / 180) * radius;
              const y2 = 200 + Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <line 
                  key={m.id}
                  x1="50%" y1="50%" x2={`${50 + (Math.cos((angle * Math.PI) / 180) * 15)}%`} y2={`${50 + (Math.sin((angle * Math.PI) / 180) * 15)}%`}
                  stroke="currentColor" strokeWidth="1" className="text-blue-500"
                />
              );
            })}
          </svg>
        </div>

        {/* Module Detail Overlay */}
        <div className="h-32 flex items-center justify-center mt-12">
          <AnimatePresence mode="wait">
            {activeModule ? (
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center max-w-md"
              >
                <h4 className="text-xl font-bold text-white italic uppercase tracking-widest text-blue-400">
                  {modules.find(m => m.id === activeModule)?.name}
                </h4>
                <p className="text-slate-500 font-mono text-[10px] mt-2 uppercase italic tracking-widest">
                  {modules.find(m => m.id === activeModule)?.description}
                </p>
                <p className="text-white text-xs mt-2 font-mono uppercase italic leading-tight">
                   Integrated data streams and autonomous scaling logic active.
                </p>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-600 font-mono text-[10px] uppercase italic tracking-widest"
              >
                Waiting for interaction...
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
