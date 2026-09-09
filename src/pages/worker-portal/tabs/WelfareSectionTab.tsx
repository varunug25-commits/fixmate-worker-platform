import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Wrench, 
  BookOpen, 
  Users, 
  AlertOctagon,
  ChevronRight
} from 'lucide-react';
import { WELFARE_BENEFITS } from '../data/workerMockData';

export const WelfareSectionTab: React.FC = () => {
  const [sosTriggered, setSosTriggered] = useState(false);

  const handleSos = () => {
    setSosTriggered(true);
    setTimeout(() => setSosTriggered(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
              FixMate Worker Welfare Union
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Social Security & Worker Protection Hub
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Every verified FixMate technician is backed by ₹5 Lakh medical cover, zero-interest tool loans, emergency SOS support, and continuous skill upskilling.
            </p>
          </div>

          <button
            onClick={handleSos}
            className="bg-rose-600 hover:bg-rose-500 text-white font-black px-6 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl shadow-rose-600/30 transition-all cursor-pointer animate-pulse"
          >
            <AlertOctagon className="w-5 h-5" />
            24/7 EMERGENCY SOS HELP
          </button>
        </div>

        {sosTriggered && (
          <div className="bg-rose-500/20 border border-rose-500/40 p-4 rounded-xl text-rose-200 text-xs space-y-1">
            <p className="font-bold flex items-center gap-2 text-sm">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              SOS Alert Transmitted to FixMate Safety Desk & Emergency Services!
            </p>
            <p className="text-slate-300">
              Dispatching nearest field support team. Helpline: {WELFARE_BENEFITS.emergencySOS.helpline}
            </p>
          </div>
        )}
      </div>

      {/* Welfare Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Health Insurance Card */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{WELFARE_BENEFITS.healthInsurance.title}</h3>
              <p className="text-xs text-emerald-400 font-semibold">{WELFARE_BENEFITS.healthInsurance.status}</p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Sum Insured:</span>
              <span className="text-white font-black text-sm">{WELFARE_BENEFITS.healthInsurance.coverage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Insurance Provider:</span>
              <span className="text-slate-200 font-medium">{WELFARE_BENEFITS.healthInsurance.provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Covered Beneficiaries:</span>
              <span className="text-slate-200 font-medium">Self + Family (3 members)</span>
            </div>
          </div>

          <button 
            onClick={() => alert('Opening Medical Claim E-Card...')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Download Health E-Card PDF
          </button>
        </div>

        {/* Equipment & Tool Loan Card */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Equipment & Tool Kit Allowance</h3>
              <p className="text-xs text-blue-400 font-semibold">{WELFARE_BENEFITS.equipmentLoans.interestRate}</p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Pre-Approved Tool Credit:</span>
              <span className="text-white font-black text-sm">{WELFARE_BENEFITS.equipmentLoans.availableLimit}</span>
            </div>
            <div className="space-y-1 pt-1">
              <span className="text-slate-400 block font-medium">Eligible Professional Equipment:</span>
              {WELFARE_BENEFITS.equipmentLoans.eligibleTools.map((t, i) => (
                <span key={i} className="inline-block bg-slate-900 text-slate-300 px-2 py-1 rounded mr-1 text-[11px]">
                  ✓ {t}
                </span>
              ))}
            </div>
          </div>

          <button 
            onClick={() => alert('Tool credit application submitted for review.')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            Apply for Tool Upgrade Loan
          </button>
        </div>

      </div>

      {/* Free Skill Certification Courses */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          Free Skill Upskilling & ISO Certification Courses
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {WELFARE_BENEFITS.certifications.map((cert, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  cert.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {cert.status}
                </span>
                <h4 className="text-sm font-bold text-white mt-2">{cert.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1">Duration: {cert.hours} • Level: {cert.level}</p>
              </div>

              <button 
                onClick={() => alert(`Launching course materials for ${cert.name}`)}
                className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold py-2 rounded-lg text-xs mt-3 transition-colors cursor-pointer"
              >
                {cert.status === 'Completed' ? 'Review Course Material' : 'Continue Module →'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Community Forum & Union */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Technician Cooperative Community Forum</h4>
            <p className="text-xs text-slate-400">Connect with 12,000+ local electricians, plumbers, and technicians across your city.</p>
          </div>
        </div>

        <button 
          onClick={() => alert('Opening Worker Cooperative Community Chat...')}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-lg shadow-purple-600/20 flex items-center gap-1 cursor-pointer"
        >
          Join Union Chat <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
