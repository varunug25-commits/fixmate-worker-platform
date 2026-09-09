import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Edit3, 
  Camera, 
  FileText, 
  Sparkles,
  Zap
} from 'lucide-react';
import { EXPERTISE_BRANCHES } from '../data/workerMockData';

interface WorkerProfileTabProps {
  branchName: string;
  onUpdateBranch: (branchId: string) => void;
}

export const WorkerProfileTab: React.FC<WorkerProfileTabProps> = ({
  branchName,
  onUpdateBranch
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workerName, setWorkerName] = useState('Rajesh Kumar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location] = useState('Bandra West, Mumbai, MH');
  const [experience, setExperience] = useState('8 Years');
  const [selectedBranchId, setSelectedBranchId] = useState('electrician');
  const [showDocModal, setShowDocModal] = useState(false);

  const handleSaveProfile = () => {
    onUpdateBranch(selectedBranchId);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-500/20 overflow-hidden">
                <User className="w-10 h-10" />
              </div>
              <label className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center cursor-pointer shadow-md transition-colors">
                <Camera className="w-4 h-4" />
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">{workerName}</h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ★ 4.9 Verified Pro
                </span>
              </div>
              <p className="text-xs text-blue-400 font-bold mt-1 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                {branchName} Master Specialist
              </p>
              <p className="text-xs text-slate-400 mt-1">{location} • {experience} Exp</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? 'Cancel Editing' : 'Edit Profile & Branch'}
          </button>
        </div>

        {/* Edit Form or View Cards */}
        {isEditing ? (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 pt-4">
            <h3 className="text-sm font-bold text-white mb-2">Edit Worker Details & Expertise Branch</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Select Primary Trade / Branch</label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                >
                  {EXPERTISE_BRANCHES.map(b => (
                    <option key={b.id} value={b.id}>{b.icon} {b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Years of Experience</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        ) : null}
      </div>

      {/* High Level Verification Cards */}
      <div className="bg-slate-900/90 border border-emerald-500/30 p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">High Level Worker Verification Status</h3>
              <p className="text-xs text-emerald-400 font-semibold">Tier-1 Highest Trust Level Granted</p>
            </div>
          </div>

          <button
            onClick={() => setShowDocModal(true)}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" /> View Uploaded KYC Docs
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Government Identity</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-sm font-bold text-white">Aadhaar Linked</p>
            <p className="text-[10px] text-slate-500">Verified via UIDAI portal</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Police Check</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-sm font-bold text-white">Clean Background Audit</p>
            <p className="text-[10px] text-slate-500">Valid till Sep 2027</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Skill Test Certificate</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-sm font-bold text-white">Level 3 Master Tech</p>
            <p className="text-[10px] text-slate-500">Passed ISO Safety Exam</p>
          </div>
        </div>
      </div>

      {/* Skills & Certifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Trade Skills & Specializations
          </h3>
          <div className="flex flex-wrap gap-2 text-xs pt-1">
            {[
              '3-Phase Main Distribution Repair',
              'Smart MCB & Isolator Fitting',
              'Inverter & Battery Wiring',
              'Modular Switchboard Assembly',
              'LED Conceal Panel Light Systems',
              'Heavy Duty Appliance Grounding'
            ].map((skill, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-950 text-blue-300 border border-slate-800 font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            Certifications & Licenses
          </h3>
          <div className="space-y-2 text-xs pt-1">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-200 font-medium">Licensed High Voltage Wireman (Government Certified)</span>
              <span className="text-[10px] font-bold text-emerald-400">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-200 font-medium">FixMate Safety & Shock Protection Protocol</span>
              <span className="text-[10px] font-bold text-emerald-400">PASSED</span>
            </div>
          </div>
        </div>

      </div>

      {/* KYC Documents Modal */}
      {showDocModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Verified KYC Document Records
              </h3>
              <button onClick={() => setShowDocModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Aadhaar Card (Front & Back)</p>
                  <p className="text-[10px] text-slate-500">XXXX-XXXX-4812 • Verified</p>
                </div>
                <span className="text-emerald-400 font-bold">✓ Approved</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Police Clearance Certificate (PCC)</p>
                  <p className="text-[10px] text-slate-500">Ref: PCC-MH-2026-0091</p>
                </div>
                <span className="text-emerald-400 font-bold">✓ Approved</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Wireman Electrician Trade License</p>
                  <p className="text-[10px] text-slate-500">Lic No: MH-ELEC-44910</p>
                </div>
                <span className="text-emerald-400 font-bold">✓ Approved</span>
              </div>
            </div>

            <button 
              onClick={() => setShowDocModal(false)} 
              className="w-full bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer"
            >
              Close Record View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
