import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, CheckCircle2, AlertTriangle, Search } from 'lucide-react';
import { EXPERTISE_BRANCHES } from '../data/workerMockData';
import type { WorkerJob } from '../data/workerMockData';

interface AvailableJobsTabProps {
  jobs: WorkerJob[];
  onAcceptJob: (id: string) => void;
  selectedBranch: string;
}

export const AvailableJobsTab: React.FC<AvailableJobsTabProps> = ({
  jobs,
  onAcceptJob
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const availableJobs = jobs.filter(j => j.status === 'available');

  const filteredJobs = availableJobs.filter(job => {
    const matchesCategory = filterCategory === 'all' || job.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-400" />
              Available Job Leads ({filteredJobs.length})
            </h2>
            <p className="text-xs text-slate-400 mt-1">Accept high-rate customer service requests near your location</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Branch Filter:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Branches</option>
              {EXPERTISE_BRANCHES.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, location or description..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No Matching Available Jobs Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try resetting your branch filter or expanding your search query to see other available leads in neighboring locations.
          </p>
          <button
            onClick={() => { setFilterCategory('all'); setSearchQuery(''); }}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 p-6 rounded-2xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                        {job.id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {job.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white pt-1">{job.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-emerald-400">₹{job.price}</p>
                    <p className="text-[10px] text-slate-400">Net Worker Payout</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  "{job.description}"
                </p>

                <div className="mt-4 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span className="truncate">{job.location} ({job.distance})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{job.date} • {job.timeSlot}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Customer: <strong className="text-slate-200">{job.customerName}</strong>
                </span>
                <button
                  onClick={() => onAcceptJob(job.id)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Accept Lead
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
