import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  Bell, 
  User, 
  LogOut, 
  BarChart3, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  Star, 
  Calendar, 
  HeartHandshake, 
  Settings, 
  Menu,
  X
} from 'lucide-react';

import { OverviewTab } from './tabs/OverviewTab';
import { AvailableJobsTab } from './tabs/AvailableJobsTab';
import { ActiveJobsTab } from './tabs/ActiveJobsTab';
import { CompletedJobsTab } from './tabs/CompletedJobsTab';
import { TotalEarningsTab } from './tabs/TotalEarningsTab';
import { WorkerProfileTab } from './tabs/WorkerProfileTab';
import { RatingsReviewsTab } from './tabs/RatingsReviewsTab';
import { AvailabilityTab } from './tabs/AvailabilityTab';
import { WelfareSectionTab } from './tabs/WelfareSectionTab';
import { SettingsTab } from './tabs/SettingsTab';
import { NotificationsModal } from './NotificationsModal';

import { INITIAL_JOBS, INITIAL_NOTIFICATIONS, EXPERTISE_BRANCHES } from './data/workerMockData';

export const WorkerPortalPage = () => {
  const navigate = useNavigate();

  // Active Tab State
  const [activeTab, setActiveTab] = useState('overview');
  const [isOnline, setIsOnline] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Core Data States
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [selectedBranchId, setSelectedBranchId] = useState('electrician');
  const [workerName, setWorkerName] = useState('Rajesh Kumar');

  // Load session from storage if present
  useEffect(() => {
    const sessionStr = localStorage.getItem('worker_session');
    if (sessionStr) {
      try {
        const parsed = JSON.parse(sessionStr);
        if (parsed.branchId) setSelectedBranchId(parsed.branchId);
        if (parsed.workerName) setWorkerName(parsed.workerName);
        if (parsed.isOnline !== undefined) setIsOnline(parsed.isOnline);
      } catch (err) {
        console.error('Error parsing session', err);
      }
    }
  }, []);

  const branchObj = EXPERTISE_BRANCHES.find(b => b.id === selectedBranchId) || EXPERTISE_BRANCHES[0];
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // Handlers
  const handleAcceptJob = (jobId) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return { ...j, status: 'active', progressStage: 'accepted' };
      }
      return j;
    }));

    // Add notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: '✅ Job Accepted!',
        message: `You accepted lead ${jobId}. Head over to Active Jobs to start progress.`,
        time: 'Just now',
        read: false,
        type: 'job'
      },
      ...prev
    ]);

    setActiveTab('active');
  };

  const handleUpdateJobStage = (jobId, nextStage) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return { ...j, progressStage: nextStage };
      }
      return j;
    }));
  };

  const handleCompleteJob = (jobId) => {
    const jobToComplete = jobs.find(j => j.id === jobId);
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return { 
          ...j, 
          status: 'completed', 
          progressStage: 'finished',
          ratingGiven: 5.0,
          reviewComment: 'Great professional service! Prompt and highly competent.'
        };
      }
      return j;
    }));

    if (jobToComplete) {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: '💰 Payment Credited!',
          message: `₹${jobToComplete.price} credited to your FixMate wallet balance for ${jobToComplete.id}.`,
          time: 'Just now',
          read: false,
          type: 'payment'
        },
        ...prev
      ]);
    }

    setActiveTab('completed');
  };

  const handleLogout = () => {
    localStorage.removeItem('worker_session');
    localStorage.removeItem('auth_token');
    navigate('/worker-login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'available', label: 'Available Jobs', icon: Briefcase, badge: jobs.filter(j => j.status === 'available').length },
    { id: 'active', label: 'Active Jobs', icon: Clock, badge: jobs.filter(j => j.status === 'active').length },
    { id: 'completed', label: 'Completed Jobs', icon: CheckCircle2 },
    { id: 'earnings', label: 'Total Earnings', icon: IndianRupee },
    { id: 'profile', label: 'Worker Profile', icon: User, badgeText: 'KYC Verified' },
    { id: 'ratings', label: 'Ratings & Reviews', icon: Star },
    { id: 'availability', label: 'Shift Availability', icon: Calendar },
    { id: 'welfare', label: 'Welfare & Benefits', icon: HeartHandshake, badgeText: '₹5L Cover' },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased selection:bg-blue-500 selection:text-white">
      
      {/* Top Fixed Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800 backdrop-blur-xl px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div 
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base font-black text-white tracking-tight">FixMate Pro</span>
                <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {branchObj.icon} {branchObj.name} Portal
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            
            {/* Online / Offline Switch */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isOnline 
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 shadow-md shadow-emerald-500/10' 
                  : 'bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {isOnline ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">Status:</span> ONLINE
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                  <span className="hidden sm:inline">Status:</span> OFFLINE
                </>
              )}
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center animate-bounce">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Worker Avatar & Quick Menu */}
            <div 
              onClick={() => setActiveTab('profile')}
              className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-xs text-white">
                RK
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{workerName}</p>
                <p className="text-[10px] text-slate-400 font-medium">★ 4.9 Verified</p>
              </div>
            </div>

            {/* Quick Logout Button */}
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* Main Container Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar Navigation */}
        <aside className={`lg:col-span-3 space-y-2 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
          
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl space-y-1 backdrop-blur-xl">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Worker Control Center
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 font-bold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-blue-600' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {item.badgeText && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      isActive ? 'bg-white text-blue-600' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.badgeText}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Branch Selector Box */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Trade Branch</span>
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
            >
              {EXPERTISE_BRANCHES.map(b => (
                <option key={b.id} value={b.id}>{b.icon} {b.name}</option>
              ))}
            </select>
            <p className="text-[10px] text-slate-500">Leads filtered specifically for {branchObj.name}</p>
          </div>

        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9">
          {activeTab === 'overview' && (
            <OverviewTab
              isOnline={isOnline}
              jobs={jobs}
              onAcceptJob={handleAcceptJob}
              onNavigateTab={(tab) => setActiveTab(tab)}
              branchName={branchObj.name}
            />
          )}

          {activeTab === 'available' && (
            <AvailableJobsTab
              jobs={jobs}
              onAcceptJob={handleAcceptJob}
              selectedBranch={branchObj.name}
            />
          )}

          {activeTab === 'active' && (
            <ActiveJobsTab
              jobs={jobs}
              onUpdateStage={handleUpdateJobStage}
              onCompleteJob={handleCompleteJob}
            />
          )}

          {activeTab === 'completed' && (
            <CompletedJobsTab jobs={jobs} />
          )}

          {activeTab === 'earnings' && (
            <TotalEarningsTab jobs={jobs} />
          )}

          {activeTab === 'profile' && (
            <WorkerProfileTab
              branchName={branchObj.name}
              onUpdateBranch={(id) => setSelectedBranchId(id)}
            />
          )}

          {activeTab === 'ratings' && (
            <RatingsReviewsTab />
          )}

          {activeTab === 'availability' && (
            <AvailabilityTab />
          )}

          {activeTab === 'welfare' && (
            <WelfareSectionTab />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              branchName={branchObj.name}
              onUpdateBranch={(id) => setSelectedBranchId(id)}
            />
          )}
        </main>

      </div>

      {/* Notifications Drawer Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
        onClearAll={() => setNotifications([])}
      />

    </div>
  );
};
