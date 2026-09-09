import { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  Bell, 
  User, 
  LogOut, 
  BarChart3, 
  Briefcase, 
  Clock, 
  IndianRupee, 
  Star, 
  Calendar, 
  HeartHandshake, 
  X,
  Settings as SettingsIcon
} from 'lucide-react';

export interface WorkerJob {
  id: string;
  title: string;
  category: string;
  description: string;
  customerName: string;
  customerPhone: string;
  location: string;
  distance: string;
  date: string;
  timeSlot: string;
  price: number;
  urgency: 'High' | 'Medium' | 'Low';
  status: 'available' | 'active' | 'completed' | 'cancelled';
  progressStage?: 'accepted' | 'on_the_way' | 'in_progress' | 'payment_pending' | 'finished';
  ratingGiven?: number;
  reviewComment?: string;
}

export const EXPERTISE_BRANCHES = [
  { id: 'electrician', name: 'Electrician', icon: '⚡', description: 'Wiring, switchboards, fuse boxes & lighting' },
  { id: 'plumber', name: 'Plumber', icon: '🚰', description: 'Pipe fittings, leakages, tap repair & drainage' },
  { id: 'carpenter', name: 'Carpenter', icon: '🔨', description: 'Furniture repair, doors, locks & custom woodwork' },
  { id: 'ac_technician', name: 'AC & HVAC Tech', icon: '❄️', description: 'AC servicing, gas refilling & compressor repair' },
  { id: 'painter', name: 'Painter', icon: '🎨', description: 'Interior/Exterior painting, wall waterproofing' },
  { id: 'appliance_tech', name: 'Appliance Repair', icon: '🧺', description: 'Washing machines, fridges, microwave repair' },
  { id: 'cleaner', name: 'Deep Cleaning', icon: '🧹', description: 'Full house, sofa, carpet & bathroom cleaning' },
  { id: 'locksmith', name: 'Locksmith', icon: '🔑', description: 'Door unlock, key duplication & smart lock setup' },
  { id: 'mechanic', name: 'General Handyman', icon: '🛠️', description: 'Drilling, mounting TV, curtains & general fixes' },
  { id: 'gardener', name: 'Gardener / Landscaper', icon: '🌱', description: 'Lawn trimming, plant care & garden design' },
];

export const INITIAL_JOBS: WorkerJob[] = [
  {
    id: 'JOB-901',
    title: 'Emergency MCB & Main Circuit Repair',
    category: 'Electrician',
    description: 'Main circuit breaker keeps tripping after heavy load. Needs urgent check.',
    customerName: 'Aarav Verma',
    customerPhone: '+91 98201 44321',
    location: 'Bandra West, Hill Road, Mumbai',
    distance: '1.8 km away',
    date: 'Today, 02:30 PM',
    timeSlot: '02:30 PM - 04:00 PM',
    price: 1250,
    urgency: 'High',
    status: 'available'
  },
  {
    id: 'JOB-902',
    title: '3 Ceiling Fans & LED Panel Mounting',
    category: 'Electrician',
    description: 'Install 3 new Atomberg fans and replace 6 LED conceal lights in hall.',
    customerName: 'Meera Iyer',
    customerPhone: '+91 97112 88900',
    location: 'Andheri West, Lokhandwala, Mumbai',
    distance: '3.4 km away',
    date: 'Today, 05:00 PM',
    timeSlot: '05:00 PM - 07:00 PM',
    price: 1800,
    urgency: 'Medium',
    status: 'available'
  },
  {
    id: 'JOB-899',
    title: 'Dual Inverter Split AC Deep Service',
    category: 'AC & HVAC Tech',
    description: 'Foam jet cleaning for indoor coil and outdoor unit pressure check.',
    customerName: 'Rohan Mehta',
    customerPhone: '+91 99887 11223',
    location: 'Juhu Scheme, Vile Parle West, Mumbai',
    distance: '2.1 km away',
    date: 'Today, 11:00 AM',
    timeSlot: '11:00 AM - 01:00 PM',
    price: 1450,
    urgency: 'High',
    status: 'active',
    progressStage: 'in_progress'
  },
  {
    id: 'JOB-895',
    title: 'Smart Meter Box & Distribution Wiring',
    category: 'Electrician',
    description: 'Complete inspection and wire replacement for 3-phase connection.',
    customerName: 'Priya Sundaram',
    customerPhone: '+91 98334 55667',
    location: 'Powai, Hiranandani Gardens, Mumbai',
    distance: '8.5 km away',
    date: 'Yesterday',
    timeSlot: '10:00 AM - 01:30 PM',
    price: 3200,
    urgency: 'Low',
    status: 'completed',
    ratingGiven: 5.0,
    reviewComment: 'Rajesh did a phenomenal job! Professional, clean work, and verified all voltages.'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: '⚡ High Urgency Job Nearby!',
    message: 'New Electrician job in Bandra West (1.8 km). Earn ₹1,250.',
    time: '5 mins ago',
    read: false
  },
  {
    id: 'notif-2',
    title: '💰 Weekly Payout Credited',
    message: '₹14,850 transferred to your HDFC account.',
    time: '2 hours ago',
    read: false
  }
];

export default function SingleWorkerPortalApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('electrician');
  const [activeTab, setActiveTab] = useState('overview');
  const [isOnline, setIsOnline] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [jobs, setJobs] = useState<WorkerJob[]>(INITIAL_JOBS);
  const [notifications] = useState(INITIAL_NOTIFICATIONS);

  const branchObj = EXPERTISE_BRANCHES.find(b => b.id === selectedBranch) || EXPERTISE_BRANCHES[0];

  const handleAcceptJob = (jobId: string) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'active', progressStage: 'accepted' } : j));
    setActiveTab('active');
  };

  const handleCompleteJob = (jobId: string) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'completed', ratingGiven: 5.0 } : j));
    setActiveTab('completed');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-8 px-4 font-sans relative">
        <div className="max-w-4xl w-full mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black"><Wrench className="w-6 h-6" /></div>
            <div>
              <h1 className="text-2xl font-black text-white">FixMate Worker Portal</h1>
              <p className="text-xs text-blue-400">Select your branch and log in to accept leads</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">Choose Your Trade Branch / Expertise:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
              {EXPERTISE_BRANCHES.map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBranch(b.id)}
                  className={`p-3 rounded-xl border text-left text-xs font-bold cursor-pointer ${
                    selectedBranch === b.id ? 'border-blue-500 bg-blue-600/20 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  {b.icon} {b.name}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
            <input type="text" defaultValue="rajesh.kumar@worker.fixmate.in" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" placeholder="Phone or Email" />
            <input type="password" defaultValue="••••••••••••" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white" placeholder="Password" />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs shadow-lg shadow-blue-600/30 cursor-pointer">
              Log In to Worker Portal →
            </button>
          </form>
        </div>
      </div>
    );
  }

  const availableJobs = jobs.filter(j => j.status === 'available');
  const activeJobs = jobs.filter(j => j.status === 'active');
  const completedJobs = jobs.filter(j => j.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, j) => sum + j.price, 0) + 14850;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800 backdrop-blur-xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white"><Wrench className="w-5 h-5" /></div>
          <div>
            <span className="text-base font-black text-white">FixMate Pro</span>
            <span className="ml-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">{branchObj.icon} {branchObj.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setIsOnline(!isOnline)} className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${isOnline ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
            {isOnline ? '🟢 ONLINE' : '⚪ OFFLINE'}
          </button>
          <button onClick={() => setIsNotificationsOpen(true)} className="p-2 rounded-xl bg-slate-800 text-slate-300 cursor-pointer"><Bell className="w-4 h-4" /></button>
          <button onClick={() => setIsLoggedIn(false)} className="p-2 rounded-xl text-slate-400 hover:text-rose-400 cursor-pointer"><LogOut className="w-4 h-4" /></button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'available', label: 'Available Jobs', icon: Briefcase },
              { id: 'active', label: 'Active Jobs', icon: Clock },
              { id: 'completed', label: 'Completed Jobs', icon: CheckCircle2 },
              { id: 'earnings', label: 'Total Earnings', icon: IndianRupee },
              { id: 'profile', label: 'Worker Profile', icon: User },
              { id: 'ratings', label: 'Ratings & Reviews', icon: Star },
              { id: 'availability', label: 'Shift Availability', icon: Calendar },
              { id: 'welfare', label: 'Welfare & Benefits', icon: HeartHandshake },
              { id: 'settings', label: 'Settings', icon: SettingsIcon }
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold cursor-pointer ${
                    activeTab === item.id ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="lg:col-span-9">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400">Total Earnings</span>
                  <p className="text-2xl font-black text-white mt-1">₹{totalEarnings.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400">Available Jobs</span>
                  <p className="text-2xl font-black text-white mt-1">{availableJobs.length} Leads</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400">Active Jobs</span>
                  <p className="text-2xl font-black text-white mt-1">{activeJobs.length}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400">Rating</span>
                  <p className="text-2xl font-black text-white mt-1">4.9 ★</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Available Job Leads ({branchObj.name})</h3>
                {availableJobs.map(job => (
                  <div key={job.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold text-blue-400">{job.id}</span>
                        <h4 className="text-base font-bold text-white">{job.title}</h4>
                      </div>
                      <p className="text-xl font-black text-emerald-400">₹{job.price}</p>
                    </div>
                    <div className="flex justify-between pt-2 text-xs text-slate-400">
                      <span>{job.location}</span>
                      <button onClick={() => handleAcceptJob(job.id)} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl">Accept Job</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'available' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Available Leads ({availableJobs.length})</h2>
              {availableJobs.map(job => (
                <div key={job.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between">
                    <h3 className="text-base font-bold text-white">{job.title}</h3>
                    <p className="text-xl font-black text-emerald-400">₹{job.price}</p>
                  </div>
                  <p className="text-xs text-slate-300">{job.description}</p>
                  <button onClick={() => handleAcceptJob(job.id)} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-xs">Accept Job</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'active' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Active Jobs ({activeJobs.length})</h2>
              {activeJobs.map(job => (
                <div key={job.id} className="bg-slate-900 border border-emerald-500/30 p-6 rounded-2xl space-y-4">
                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  <p className="text-xs text-slate-400">{job.customerName} • {job.location}</p>
                  <button onClick={() => handleCompleteJob(job.id)} className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl text-xs">Complete Job & Collect Payment</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Completed Jobs ({completedJobs.length})</h2>
              {completedJobs.map(job => (
                <div key={job.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <h3 className="text-base font-bold text-white">{job.title}</h3>
                  <p className="text-emerald-400 font-bold">₹{job.price} Paid</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Notifications</h3>
              <button onClick={() => setIsNotificationsOpen(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            {notifications.map(n => (
              <div key={n.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs">
                <p className="font-bold text-white">{n.title}</p>
                <p className="text-slate-300">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
