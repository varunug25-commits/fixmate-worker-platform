import React from 'react';
import { Bell, CheckCircle2, Trash2, X, Sparkles, IndianRupee, ShieldCheck } from 'lucide-react';
import type { NotificationItem } from './data/workerMockData';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClearAll: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 space-y-4 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Notifications Center</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between text-xs pt-1">
          <button
            onClick={onMarkAllRead}
            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Mark All as Read
          </button>

          <button
            onClick={onClearAll}
            className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-2 custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-slate-500 space-y-2">
              <Bell className="w-8 h-8 mx-auto opacity-40" />
              <p className="text-xs">No notifications right now.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-4 rounded-xl border text-xs space-y-1 transition-all ${
                  notif.read
                    ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                    : 'bg-slate-950 border-blue-500/40 text-slate-200 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-white">
                  <span className="flex items-center gap-1.5">
                    {notif.type === 'job' && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                    {notif.type === 'payment' && <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />}
                    {notif.type === 'welfare' && <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />}
                    {notif.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{notif.time}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{notif.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
          >
            Close Notifications
          </button>
        </div>

      </div>
    </div>
  );
};
