import React from 'react';
import { 
  Clock, 
  MapPin, 
  PhoneCall, 
  Navigation, 
  CheckCircle2, 
  Play, 
  DollarSign, 
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import type { WorkerJob } from '../data/workerMockData';

interface ActiveJobsTabProps {
  jobs: WorkerJob[];
  onUpdateStage: (jobId: string, nextStage: WorkerJob['progressStage']) => void;
  onCompleteJob: (jobId: string) => void;
}

export const ActiveJobsTab: React.FC<ActiveJobsTabProps> = ({
  jobs,
  onUpdateStage,
  onCompleteJob
}) => {
  const activeJobs = jobs.filter(j => j.status === 'active');

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          Active Jobs In Progress ({activeJobs.length})
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Update real-time job stage status so the customer can track your arrival & progress
        </p>
      </div>

      {activeJobs.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Active Jobs Currently in Progress</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You don't have any accepted jobs scheduled right now. Go to the "Available Jobs" tab to pick up new customer leads.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {activeJobs.map((job) => {
            const currentStage = job.progressStage || 'accepted';

            return (
              <div 
                key={job.id} 
                className="bg-slate-900/90 border border-emerald-500/30 p-6 rounded-2xl shadow-xl space-y-6"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        {job.id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200">
                        {job.category}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Active Now
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-2">{job.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{job.description}</p>
                  </div>

                  <div className="text-right sm:text-right flex sm:flex-col items-center justify-between sm:justify-start">
                    <div>
                      <p className="text-2xl font-black text-emerald-400">₹{job.price}</p>
                      <p className="text-[10px] text-slate-400">Fixed Rate Payout</p>
                    </div>
                  </div>
                </div>

                {/* Progress Tracker Stepper */}
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Work Progress Tracker</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    
                    {/* Step 1: On The Way */}
                    <div className={`p-3 rounded-xl border transition-all ${
                      currentStage === 'accepted' || currentStage === 'on_the_way' || currentStage === 'in_progress' || currentStage === 'finished'
                        ? 'border-blue-500/50 bg-blue-500/10 text-blue-300'
                        : 'border-slate-800 bg-slate-950 text-slate-600'
                    }`}>
                      <Navigation className="w-4 h-4 mx-auto mb-1" />
                      <p className="text-[11px] font-bold">1. On The Way</p>
                    </div>

                    {/* Step 2: Work Started */}
                    <div className={`p-3 rounded-xl border transition-all ${
                      currentStage === 'in_progress' || currentStage === 'finished'
                        ? 'border-purple-500/50 bg-purple-500/10 text-purple-300'
                        : 'border-slate-800 bg-slate-950 text-slate-600'
                    }`}>
                      <Play className="w-4 h-4 mx-auto mb-1" />
                      <p className="text-[11px] font-bold">2. Work Started</p>
                    </div>

                    {/* Step 3: Finished */}
                    <div className={`p-3 rounded-xl border transition-all ${
                      currentStage === 'finished'
                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                        : 'border-slate-800 bg-slate-950 text-slate-600'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 mx-auto mb-1" />
                      <p className="text-[11px] font-bold">3. Job Complete</p>
                    </div>

                  </div>
                </div>

                {/* Customer Details & Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
                  <div className="space-y-2 text-xs">
                    <p className="text-slate-400 font-medium">Customer Contact Info:</p>
                    <p className="text-sm font-bold text-white">{job.customerName}</p>
                    <p className="text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {job.location}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center space-y-2">
                    <a
                      href={`tel:${job.customerPhone}`}
                      className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      Call Customer ({job.customerPhone})
                    </a>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(job.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-blue-400" />
                      Open Map GPS Directions
                    </a>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex flex-wrap items-center justify-between pt-2 gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>Emergency SOS support line available in Welfare tab</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentStage === 'accepted' && (
                      <button
                        onClick={() => onUpdateStage(job.id, 'in_progress')}
                        className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-purple-600/20 cursor-pointer"
                      >
                        Mark: Arrived & Work Started
                      </button>
                    )}

                    {currentStage === 'in_progress' && (
                      <button
                        onClick={() => onCompleteJob(job.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer"
                      >
                        <DollarSign className="w-4 h-4" />
                        Complete Job & Request Payment
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
