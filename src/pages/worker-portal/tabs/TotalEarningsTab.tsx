import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  History, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import type { WorkerJob } from '../data/workerMockData';

interface TotalEarningsTabProps {
  jobs: WorkerJob[];
}

export const TotalEarningsTab: React.FC<TotalEarningsTabProps> = ({ jobs }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('3500');
  const [upiId, setUpiId] = useState('rajesh.kumar@okhdfcbank');
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  const completedJobs = jobs.filter(j => j.status === 'completed');
  const completedTotal = completedJobs.reduce((sum, j) => sum + j.price, 0);
  
  const todayEarnings = 1450;
  const weeklyEarnings = 9850;
  const monthlyEarnings = 34200;
  const totalAllTime = 142500 + completedTotal;
  const walletBalance = 3850 + completedTotal;

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutSuccess(true);
    setTimeout(() => {
      setPayoutSuccess(false);
      setShowWithdrawModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Balance & Withdraw Button */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 border border-purple-800/40 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <span className="text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
            Available Wallet Balance
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-1">
            ₹{walletBalance.toLocaleString('en-IN')}
          </h2>
          <p className="text-xs text-slate-400">Ready for instant transfer to your linked Bank Account / UPI ID</p>
        </div>

        <div className="z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Wallet className="w-4 h-4" />
            Instant Withdrawal to UPI / Bank
          </button>
        </div>
      </div>

      {/* Grid of Earnings Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Today's Earnings</span>
          <p className="text-2xl font-black text-white mt-1">₹{todayEarnings.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-emerald-400 mt-2 block">2 Jobs Completed</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">This Week</span>
          <p className="text-2xl font-black text-white mt-1">₹{weeklyEarnings.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-emerald-400 mt-2 block">+14% vs last week</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">This Month</span>
          <p className="text-2xl font-black text-white mt-1">₹{monthlyEarnings.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-purple-400 mt-2 block">On track for bonus incentive</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">All Time Earnings</span>
          <p className="text-2xl font-black text-white mt-1">₹{totalAllTime.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-400 mt-2 block">Total 158 services done</span>
        </div>

      </div>

      {/* Visual Weekly Chart Summary */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Weekly Revenue Breakdown
          </h3>
          <span className="text-xs text-slate-400">Current Week Performance</span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-4 items-end h-40">
          {[
            { day: 'Mon', amount: 1200, height: '40%' },
            { day: 'Tue', amount: 1850, height: '60%' },
            { day: 'Wed', amount: 2400, height: '80%' },
            { day: 'Thu', amount: 950, height: '35%' },
            { day: 'Fri', amount: 2100, height: '70%' },
            { day: 'Sat', amount: 2800, height: '95%' },
            { day: 'Sun', amount: 1450, height: '50%' }
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-[10px] font-mono text-emerald-400">₹{bar.amount}</span>
              <div 
                style={{ height: bar.height }} 
                className="w-full bg-gradient-to-t from-blue-600 to-emerald-400 rounded-t-lg transition-all"
              />
              <span className="text-xs text-slate-400 font-semibold">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bank / Payout Log Table */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <History className="w-5 h-5 text-blue-400" />
          Recent Payout Transfers & Withdrawals
        </h3>

        <div className="space-y-3">
          {[
            { id: 'PAY-8821', date: '08 Sep 2026', method: 'UPI Instant Payout', amount: '₹14,850', status: 'SUCCESS' },
            { id: 'PAY-8799', date: '01 Sep 2026', method: 'HDFC Bank Account', amount: '₹12,400', status: 'SUCCESS' },
            { id: 'PAY-8710', date: '25 Aug 2026', method: 'UPI Instant Payout', amount: '₹9,800', status: 'SUCCESS' }
          ].map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">{tx.method}</p>
                  <p className="text-slate-400 text-[11px]">{tx.date} • Ref: {tx.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-base text-white">{tx.amount}</p>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                Instant Payout Request
              </h3>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {payoutSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Transfer Initiated!</h4>
                <p className="text-xs text-slate-300">
                  ₹{withdrawAmount} has been sent to {upiId}. Payout reference ID: TXN-WDR-2026-991.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Enter Amount (₹)</label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    max={walletBalance}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Max available balance: ₹{walletBalance}</span>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Target UPI ID / Bank VPA</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1 text-slate-400">
                  <p className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" /> Zero Transfer Fee
                  </p>
                  <p className="text-[11px]">Instant settlement via IMPS / UPI transfer within 60 seconds.</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl text-sm transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  Confirm Instant Transfer Now
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
