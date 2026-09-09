import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Lock, 
  CheckCircle2, 
  Award, 
  UserCheck
} from 'lucide-react';
import { EXPERTISE_BRANCHES } from './data/workerMockData';

export const WorkerLoginPage = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState('electrician');
  const [phoneOrEmail, setPhoneOrEmail] = useState('rajesh.kumar@worker.fixmate.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!selectedBranch) {
      setError('Please select your branch or expertise area');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Store worker session
      const branchInfo = EXPERTISE_BRANCHES.find(b => b.id === selectedBranch);
      localStorage.setItem('worker_session', JSON.stringify({
        isLoggedIn: true,
        isOnline: true,
        workerName: 'Rajesh Kumar',
        workerPhone: '+91 98765 43210',
        branchId: selectedBranch,
        branchName: branchInfo?.name || 'Electrician',
        branchIcon: branchInfo?.icon || '⚡',
        verificationLevel: 'High Level (Aadhaar + Police Checked)',
        rating: 4.9,
        reviewsCount: 128
      }));
      setLoading(false);
      navigate('/worker-portal');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Glow Shapes */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column: Branding & Value Props */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">FixMate Pro</span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-blue-400">Worker & Partner Portal</span>
            </div>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Earn More. Work Flexible. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Stay Protected.</span>
            </h1>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              Log in to accept high-paying verified service leads, manage active bookings, track daily earnings, and access exclusive worker welfare benefits.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Instant Weekly & Daily Payouts</p>
                <p className="text-xs text-slate-400">Direct transfer to your UPI or Bank account with zero commission cuts.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">High Level KYC & Insurance</p>
                <p className="text-xs text-slate-400">₹5,00,000 accidental & health cover for you and your family.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Verified Expert Badge</p>
                <p className="text-xs text-slate-400">Earn higher ratings & unlock premium corporate job leads.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Login Card */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl shadow-black/80">
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-400" />
                Worker Account Login
              </h2>
              <p className="text-xs text-slate-400 mt-1">Select your primary trade branch to customize available job leads</p>
            </div>

            {/* Branch / Expertise Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Choose Your Branch / Expertise:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                {EXPERTISE_BRANCHES.map((b) => {
                  const isSelected = selectedBranch === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBranch(b.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-600/15 text-white ring-2 ring-blue-500/50' 
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{b.icon}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-bold truncate">{b.name}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                <span>⚠️ {error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Registered Phone Number / Email</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="+91 98765 43210 or email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Account Password / OTP</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              {/* Demo Mode Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="demoCheck"
                    checked={isDemoMode}
                    onChange={(e) => setIsDemoMode(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded bg-slate-900 border-slate-700 cursor-pointer"
                  />
                  <label htmlFor="demoCheck" className="text-xs text-slate-300 font-medium cursor-pointer">
                    Enable Quick Demo Login (Skip backend server check)
                  </label>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                  Instant Test
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating Worker...
                  </span>
                ) : (
                  <>
                    <span className="text-sm">Sign In to Worker Dashboard</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span>Are you a new technician?</span>
              <button 
                onClick={() => navigate('/worker-register')}
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors underline underline-offset-4 cursor-pointer"
              >
                Register & Apply for Verification →
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
