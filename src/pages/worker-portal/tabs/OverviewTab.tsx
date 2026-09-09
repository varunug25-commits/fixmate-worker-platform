import React from 'react';
import { 
  Briefcase, 
  IndianRupee, 
  Star, 
  CheckCircle, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp,
  Clock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import type { WorkerJob } from '../data/workerMockData';

interface OverviewTabProps {
  isOnline: boolean;
  jobs: WorkerJob[];
  onAcceptJob: (id: string) => void;
  onNavigateTab: (tab: string) => void;
  branchName: string;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  isOnline,
  jobs,
  onAcceptJob,
  onNavigateTab,
  branchName
}) => {
  const availableJobs = jobs.filter(j => j.status === 'available');
  const activeJobs = jobs.filter(j => j.status === 'active');
  const completedJobs = jobs.filter(j => j.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, j) => sum + j.price, 0) + 14850;

  return (
    <div className="space-y-6">
      {/* Online / Offline Alert Banner */}
      {!isOnline ? (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between text-amber-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold">You are currently OFFLINE</p>
              <p className="text-xs text-amber-300/80">Switch your toggle status to ONLINE at the top right to start receiving instant job requests.</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-amber-500/20 px-3 py-1 rounded-full text-amber-300">
            Pause Mode
          </span>
        </div>
      ) : (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between text-emerald-200">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <p className="text-sm font-semibold">LIVE & RECEIVING LEADS ({branchName})</p>
              <p className="text-xs text-emerald-300/80">Your location radar is active within 10 km range. Instant job alerts are enabled.</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-300">
            Active Online
          </span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Earnings */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Earnings</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">₹{totalEarnings.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.5% vs last month</span>
          </div>
        </div>

        {/* Available Jobs nearby */}
        <div 
          onClick={() => onNavigateTab('available')}
          className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Available Jobs</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{availableJobs.length} Leads</p>
          <p className="text-xs text-blue-400 mt-2 flex items-center gap-1">
            Tap to view & accept <ChevronRight className="w-3 h-3" />
          </p>
        </div>

        {/* Active Jobs */}
        <div 
          onClick={() => onNavigateTab('active')}
          className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Jobs</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{activeJobs.length} In Progress</p>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
            View customer details <ChevronRight className="w-3 h-3" />
          </p>
        </div>

        {/* Rating */}
        <div 
          onClick={() => onNavigateTab('ratings')}
          className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Customer Rating</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">4.9 ★</p>
          <p className="text-xs text-slate-400 mt-1">Based on 128 verified reviews</p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Instant Nearby Jobs list */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Recommended New Job Leads ({branchName})
            </h3>
            <button 
              onClick={() => onNavigateTab('available')}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
            >
              View All ({availableJobs.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {availableJobs.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl text-center">
              <p className="text-slate-400 text-sm">No pending available jobs in your immediate area right now.</p>
            </div>
          ) : (
            availableJobs.map((job) => (
              <div key={job.id} className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl transition-all space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                        {job.id}
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        job.urgency === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {job.urgency} Urgency
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-1.5">{job.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{job.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-emerald-400">₹{job.price}</p>
                    <p className="text-[10px] text-slate-400">Est. Payout</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      {job.location} ({job.distance})
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {job.date}
                    </span>
                  </div>
                  <button
                    onClick={() => onAcceptJob(job.id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    Accept Job Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: High Level Verification Card & Welfare Teaser */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Verification Badge Box */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/40">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Verified Partner Status</h4>
                <p className="text-xs text-emerald-400 font-medium">HIGH LEVEL KYC COMPLETE</p>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Government Identity (Aadhaar)</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Police Background Audit</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Clear
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400">Skill Certification Badge</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Level 3 Master
                </span>
              </div>
            </div>

            <button 
              onClick={() => onNavigateTab('profile')}
              className="w-full text-center text-xs font-bold text-blue-400 hover:text-blue-300 pt-1 block cursor-pointer"
            >
              Manage Credentials & Verification Docs →
            </button>
          </div>

          {/* Quick Welfare Box */}
          <div 
            onClick={() => onNavigateTab('welfare')}
            className="bg-gradient-to-r from-purple-950/60 to-slate-900 border border-purple-800/40 p-5 rounded-2xl hover:border-purple-600 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Worker Welfare Benefits</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold">Active</span>
            </div>
            <h5 className="text-sm font-bold text-white">₹5,00,000 Group Medical Cover</h5>
            <p className="text-xs text-slate-400 mt-1">24/7 SOS helpline, zero interest equipment loans & free upgrade courses.</p>
            <span className="text-xs font-semibold text-purple-400 mt-3 inline-block">
              Open Welfare Section →
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
