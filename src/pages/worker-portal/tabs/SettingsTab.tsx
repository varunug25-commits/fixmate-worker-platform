import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Bell, 
  Lock, 
  CheckCircle2, 
  Zap
} from 'lucide-react';
import { EXPERTISE_BRANCHES } from '../data/workerMockData';

interface SettingsTabProps {
  branchName: string;
  onUpdateBranch: (id: string) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  onUpdateBranch
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState('electrician');
  const [language, setLanguage] = useState('English');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = () => {
    onUpdateBranch(selectedBranchId);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-400" />
            Worker Account Settings & Preferences
          </h2>
          <p className="text-xs text-slate-400 mt-1">Configure trade branch, language, alerts, and security options</p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
        >
          Save All Settings
        </button>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Worker preferences saved successfully!</span>
        </div>
      )}

      {/* Primary Branch / Trade Settings */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Primary Expertise Branch & Specialization
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXPERTISE_BRANCHES.map((b) => {
            const isSelected = selectedBranchId === b.id;
            return (
              <div
                key={b.id}
                onClick={() => setSelectedBranchId(b.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/10 text-white ring-1 ring-blue-500/50'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{b.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-white">{b.name}</p>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{b.description}</p>
                  </div>
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Language & Regional Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">App Display Language</h3>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="English">English (Default)</option>
            <option value="Hindi">हिंदी (Hindi)</option>
            <option value="Marathi">मराठी (Marathi)</option>
            <option value="Gujarati">ગુજરાતી (Gujarati)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
          </select>
        </div>

        {/* Notifications & Sound Toggles */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Alerts & Sound Settings</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Loud Ringtone for Emergency Jobs</span>
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={(e) => setSoundAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded bg-slate-900 border-slate-700 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">SMS Job Dispatch Notifications</span>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded bg-slate-900 border-slate-700 cursor-pointer"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Security & Password */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-400" />
          Security & Authentication
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <p className="font-bold text-white">Two-Factor OTP Verification (2FA)</p>
              <p className="text-[10px] text-slate-400">Require SMS OTP when logging into new mobile devices</p>
            </div>
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded bg-slate-900 border-slate-700 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <p className="font-bold text-white">Change Account Password</p>
              <p className="text-[10px] text-slate-400">Last changed 45 days ago</p>
            </div>
            <button 
              onClick={() => alert('Password reset link sent to registered email.')}
              className="text-blue-400 font-semibold hover:text-blue-300 cursor-pointer"
            >
              Update Password →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
