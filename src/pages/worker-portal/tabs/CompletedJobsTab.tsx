import React from 'react';
import { CheckCircle2, Star, Calendar, MapPin, Download, Receipt } from 'lucide-react';
import type { WorkerJob } from '../data/workerMockData';

interface CompletedJobsTabProps {
  jobs: WorkerJob[];
}

export const CompletedJobsTab: React.FC<CompletedJobsTabProps> = ({ jobs }) => {
  const completedJobs = jobs.filter(j => j.status === 'completed');
  const totalEarned = completedJobs.reduce((sum, j) => sum + j.price, 0);

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-purple-400" />
            Completed Jobs History ({completedJobs.length})
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Archived record of all completed services, ratings received, and payouts generated
          </p>
        </div>

        <div className="bg-slate-950 p-3 px-4 rounded-xl border border-slate-800 text-right">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Completed Payout Total</span>
          <p className="text-xl font-black text-emerald-400">₹{totalEarned.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {completedJobs.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
          <Receipt className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Completed Jobs Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Once you finish active jobs, your digital work receipts and customer reviews will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {completedJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                      {job.id}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {job.category}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      PAID & SETTLED
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1.5">{job.title}</h3>
                </div>

                <div className="text-right">
                  <p className="text-xl font-black text-emerald-400">₹{job.price}</p>
                  <p className="text-[10px] text-slate-400">Transferred to Wallet</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                <div className="space-y-1.5">
                  <p className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    {job.location}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    Completed: {job.date}
                  </p>
                  <p className="text-slate-400">Customer: <strong className="text-white">{job.customerName}</strong></p>
                </div>

                <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-4">
                  <p className="font-bold text-slate-300">Customer Feedback & Rating:</p>
                  {job.ratingGiven ? (
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span>{job.ratingGiven.toFixed(1)} / 5.0</span>
                      </div>
                      {job.reviewComment && (
                        <p className="text-slate-300 italic mt-1">"{job.reviewComment}"</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">No written review submitted yet.</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 font-mono text-[11px]">Txn Ref: TXN-FIX-{job.id}-992</span>
                <button 
                  onClick={() => alert(`Downloading Invoice Receipt for ${job.id}`)}
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Digital Receipt PDF
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
