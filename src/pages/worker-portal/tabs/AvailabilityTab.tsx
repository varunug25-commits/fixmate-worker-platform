import React, { useState } from 'react';
import { Calendar, Clock, Zap, MapPin, CheckCircle2 } from 'lucide-react';

export const AvailabilityTab: React.FC = () => {
  const [emergencyCallout, setEmergencyCallout] = useState(true);
  const [maxRadius, setMaxRadius] = useState(10);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [schedule, setSchedule] = useState([
    { day: 'Monday', active: true, hours: '09:00 AM - 07:00 PM' },
    { day: 'Tuesday', active: true, hours: '09:00 AM - 07:00 PM' },
    { day: 'Wednesday', active: true, hours: '09:00 AM - 07:00 PM' },
    { day: 'Thursday', active: true, hours: '09:00 AM - 07:00 PM' },
    { day: 'Friday', active: true, hours: '09:00 AM - 07:00 PM' },
    { day: 'Saturday', active: true, hours: '10:00 AM - 06:00 PM' },
    { day: 'Sunday', active: false, hours: 'Day Off' }
  ]);

  const toggleDay = (index: number) => {
    setSchedule(prev => prev.map((item, i) => i === index ? { ...item, active: !item.active } : item));
  };

  const handleSaveSchedule = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Working Hours & Shift Availability
          </h2>
          <p className="text-xs text-slate-400 mt-1">Configure your working days, max travel radius, and emergency callout modes</p>
        </div>

        <button
          onClick={handleSaveSchedule}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
        >
          Save Availability Settings
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Availability schedule updated successfully! New shift hours applied to radar dispatch.</span>
        </div>
      )}

      {/* Emergency Callout & Radius Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Emergency Call-Out Mode */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Emergency Call-Out Mode</h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emergencyCallout}
                onChange={(e) => setEmergencyCallout(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>
          <p className="text-xs text-slate-400">
            Receive high-priority emergency jobs after 8 PM with <strong>1.8x - 2.5x higher surge pricing rates</strong>.
          </p>
        </div>

        {/* Working Distance Radius */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-bold text-white">Maximum Travel Radius</h3>
            </div>
            <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/20 px-2.5 py-1 rounded-lg">
              {maxRadius} km radius
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="35"
            value={maxRadius}
            onChange={(e) => setMaxRadius(Number(e.target.value))}
            className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <p className="text-[11px] text-slate-500">Jobs outside this radius will not be dispatched to your phone.</p>
        </div>

      </div>

      {/* Days of Week Schedule Grid */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          Weekly Availability Schedule
        </h3>

        <div className="space-y-3">
          {schedule.map((item, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                item.active 
                  ? 'bg-slate-950/80 border-slate-800' 
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={() => toggleDay(idx)}
                  className="w-4 h-4 text-blue-600 rounded bg-slate-900 border-slate-700 cursor-pointer"
                />
                <span className="text-xs font-bold text-white w-24">{item.day}</span>
              </div>

              <div className="text-xs text-slate-300">
                {item.active ? (
                  <span className="font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                    {item.hours}
                  </span>
                ) : (
                  <span className="text-slate-500 font-semibold italic">Day Off (Unavailable)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
