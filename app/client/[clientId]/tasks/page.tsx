'use client';

import { use } from 'react';
import { Card, Badge, Button } from '@/components/ui';
import {
  mockClientUsers,
  mockClientTaskTracking,
  mockTasks,
} from '@/lib/mock-data';

interface PageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default function ClientTasksPage({ params }: PageProps) {
  const { clientId } = use(params);
  const client = mockClientUsers.find(c => c.id === clientId);
  const taskTracking = mockClientTaskTracking.filter(ct => ct.clientId === clientId);

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5">
        <div>
          <Badge variant="outline" className="mb-4 bg-purple-500/5 text-purple-400 border-purple-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
            Infrastructure Operations
          </Badge>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
            TASK <span className="text-purple-400">TRAJECTORY</span>
          </h1>
          <p className="text-slate-400 font-light italic mt-6 max-w-xl">
            Granular tracking of development tasks and operational maintenance. Monitor every byte of progress in your enterprise ecosystem.
          </p>
        </div>
      </div>

      {/* Task List - Infrastructure Style */}
      <div className="bg-slate-900/50 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-600 via-blue-500 to-transparent opacity-30" />
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Operation ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Infrastructure Task</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Status Alpha</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Priority Matrix</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {taskTracking.length > 0 ? (
                taskTracking.map((ct) => {
                  const task = mockTasks.find(t => t.id === ct.taskId);
                  if (!task) return null;

                  return (
                    <tr key={ct.id} className="group hover:bg-white/5 transition-colors cursor-default">
                      <td className="px-8 py-8">
                         <span className="text-xs font-black text-slate-600 monospace">OP-{task.id}</span>
                      </td>
                      <td className="px-8 py-8">
                        <div>
                          <p className="text-sm font-black text-white uppercase tracking-tight group-hover:text-purple-400 transition-colors italic">{task.title}</p>
                          <p className="text-[10px] text-slate-500 italic mt-1 line-clamp-1">{task.description}</p>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <Badge className={`text-[9px] font-black tracking-widest uppercase px-3 py-1 ${
                          task.status === 'done' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                          task.status === 'in_progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                          task.status === 'review' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                          'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                        }`}>
                          {task.status === 'done' ? 'Done' : task.status === 'in_progress' ? 'In Progress' : task.status === 'review' ? 'Review' : 'Todo'}
                        </Badge>
                      </td>
                      <td className="px-8 py-8 font-sans">
                         <div className="flex gap-1 items-center">
                            {[1,2,3].map(i => (
                              <div key={i} className={`h-1.5 w-6 rounded-full ${i <= (task.priority === 'high' ? 3 : task.priority === 'medium' ? 2 : task.priority === 'urgent' ? 3 : 1) ? 'bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.5)]' : 'bg-slate-800'}`} />
                            ))}
                         </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="text-right sm:text-left">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">ETC</p>
                           <p className="text-xs font-black text-white monospace">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'ASAP'}</p>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <p className="text-slate-500 italic text-sm font-medium">No operational tasks currently in the trajectory.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
