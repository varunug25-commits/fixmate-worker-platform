import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Zap, 
  Droplet, 
  Hammer, 
  Snowflake, 
  Palette, 
  Broom, 
  Key, 
  Sprout, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Lock, 
  CheckCircle2, 
  Award, 
  UserCheck,
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
  Settings, 
  Menu,
  X,
  MapPin, 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp,
  ChevronRight,
  AlertCircle,
  Search,
  AlertTriangle,
  PhoneCall, 
  Navigation, 
  Play, 
  DollarSign, 
  ShieldAlert,
  Download, 
  Receipt,
  Wallet, 
  History,
  Edit3, 
  Camera, 
  FileText,
  MessageSquare,
  Send,
  BookOpen, 
  Users, 
  AlertOctagon,
  Globe
} from 'lucide-react';

// ==========================================
// 1. DATA & CONSTANTS
// ==========================================
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

export const INITIAL_JOBS = [
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
  },
  {
    id: 'JOB-888',
    title: 'Bathroom Overhead Tank Water Leakage',
    category: 'Plumber',
    description: 'Replace main ball valve and repair PVC joint leakage near tank.',
    customerName: 'Sanjay Deshmukh',
    customerPhone: '+91 98199 66778',
    location: 'Dadar West, Shivaji Park, Mumbai',
    distance: '5.2 km away',
    date: '07 Sep 2026',
    timeSlot: '03:00 PM - 04:30 PM',
    price: 950,
    urgency: 'Medium',
    status: 'completed',
    ratingGiven: 4.8,
    reviewComment: 'Quick diagnosis and fixed leakage without damaging tiles. Highly recommended!'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: '⚡ High Urgency Job Nearby!',
    message: 'New Electrician job in Bandra West (1.8 km). Earn ₹1,250.',
    time: '5 mins ago',
    read: false,
    type: 'job'
  },
  {
    id: 'notif-2',
    title: '💰 Weekly Payout Credited',
    message: '₹14,850 has been successfully transferred to your HDFC Bank account.',
    time: '2 hours ago',
    read: false,
    type: 'payment'
  },
  {
    id: 'notif-3',
    title: '🛡️ Welfare Health Cover Active',
    message: 'Your monthly ₹5,00,000 Group Medical Claim Policy renews automatically.',
    time: '1 day ago',
    read: true,
    type: 'welfare'
  },
  {
    id: 'notif-4',
    title: '⭐ 5-Star Review Received',
    message: 'Priya Sundaram left a 5.0 star review for Smart Meter Box job.',
    time: '2 days ago',
    read: true,
    type: 'system'
  }
];

export const REVIEWS_LIST = [
  {
    id: 'rev-1',
    customerName: 'Priya Sundaram',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 5.0,
    date: 'Yesterday',
    jobTitle: 'Smart Meter Box Wiring',
    comment: 'Rajesh is exceptionally skilled. He diagnosed the main line neutral problem within 10 minutes and repaired everything with high safety standards!',
    workerReply: 'Thank you Ma\'am! Happy to ensure your home wiring is safe.'
  },
  {
    id: 'rev-2',
    customerName: 'Sanjay Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 4.8,
    date: '07 Sep 2026',
    jobTitle: 'Overhead Water Tank Repair',
    comment: 'Punctual and well equipped with all professional tools. Cleaned up after finishing work.',
    workerReply: ''
  },
  {
    id: 'rev-3',
    customerName: 'Anita Kapoor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    rating: 5.0,
    date: '04 Sep 2026',
    jobTitle: 'Modular Switchboard Upgrade',
    comment: 'Great work quality! Courteous behavior and explained everything clearly.',
    workerReply: 'Thanks for trusting FixMate!'
  }
];

export const WELFARE_BENEFITS = {
  healthInsurance: {
    title: 'Health & Accidental Protection',
    coverage: '₹5,00,000',
    provider: 'Star Health / ICICI Lombard',
    status: 'ACTIVE & VERIFIED',
    validTill: '31 Dec 2026',
    beneficiaries: ['Self', 'Spouse', 'Children (2)']
  },
  emergencySOS: {
    helpline: '1800-419-8800',
    ambulance: '108',
    safetyTeam: '+91 99990 00112'
  },
  equipmentLoans: {
    availableLimit: '₹35,000',
    interestRate: '0% Processing Fee',
    eligibleTools: ['Fluke Digital Multimeter', 'Bosch Heavy Duty Drill Set', 'Insulated Tool Kit']
  },
  certifications: [
    { name: 'Advanced 3-Phase Solar Inverter Wiring', hours: '8 Hours', level: 'Level 4 Expert', status: 'Enrolled' },
    { name: 'Smart Home Automation & IoT Switch Setup', hours: '6 Hours', level: 'Level 3 Pro', status: 'Completed' },
    { name: 'Electrical Safety & Shock Proofing Standards', hours: '4 Hours', level: 'Mandatory ISO', status: 'Completed' }
  ]
};

// ==========================================
// 2. SUB-TAB COMPONENTS
// ==========================================

const OverviewTab = ({ isOnline, jobs, onAcceptJob, onNavigateTab, branchName }) => {
  const availableJobs = jobs.filter(j => j.status === 'available');
  const activeJobs = jobs.filter(j => j.status === 'active');
  const completedJobs = jobs.filter(j => j.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, j) => sum + j.price, 0) + 14850;

  return (
    <div className="space-y-6">
      {!isOnline ? (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between text-amber-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold">You are currently OFFLINE</p>
              <p className="text-xs text-amber-300/80">Switch your toggle status to ONLINE at the top right to start receiving instant job requests.</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-amber-500/20 px-3 py-1 rounded-full text-amber-300">Pause Mode</span>
        </div>
      ) : (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between text-emerald-200">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <p className="text-sm font-semibold">LIVE & RECEIVING LEADS ({branchName})</p>
              <p className="text-xs text-emerald-300/80">Your location radar is active within 10 km range. Instant job alerts are enabled.</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-300">Active Online</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Earnings</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400"><IndianRupee className="w-5 h-5" /></div>
          </div>
          <p className="text-2xl font-black text-white">₹{totalEarnings.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400"><TrendingUp className="w-3.5 h-3.5" /><span>+18.5% vs last month</span></div>
        </div>

        <div onClick={() => onNavigateTab('available')} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Available Jobs</span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400"><Briefcase className="w-5 h-5" /></div>
          </div>
          <p className="text-2xl font-black text-white">{availableJobs.length} Leads</p>
          <p className="text-xs text-blue-400 mt-2 flex items-center gap-1">Tap to view & accept <ChevronRight className="w-3 h-3" /></p>
        </div>

        <div onClick={() => onNavigateTab('active')} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl hover:border-emerald-500/50 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Jobs</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400"><Clock className="w-5 h-5" /></div>
          </div>
          <p className="text-2xl font-black text-white">{activeJobs.length} In Progress</p>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">View customer details <ChevronRight className="w-3 h-3" /></p>
        </div>

        <div onClick={() => onNavigateTab('ratings')} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl hover:border-amber-500/50 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Customer Rating</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400"><Star className="w-5 h-5 fill-amber-400" /></div>
          </div>
          <p className="text-2xl font-black text-white">4.9 ★</p>
          <p className="text-xs text-slate-400 mt-1">Based on 128 verified reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Standard Job Leads ({branchName})
            </h3>
            <button onClick={() => onNavigateTab('available')} className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer">
              View All ({availableJobs.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {availableJobs.map((job) => (
            <div key={job.id} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">{job.id}</span>
                  <h4 className="text-base font-bold text-white mt-1.5">{job.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{job.description}</p>
                </div>
                <p className="text-xl font-black text-emerald-400">₹{job.price}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-400" /> {job.location}</span>
                <button onClick={() => onAcceptJob(job.id)} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer">Accept Job</button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400"><ShieldCheck className="w-6 h-6" /></div>
              <div>
                <h4 className="text-sm font-bold text-white">Verified Partner Status</h4>
                <p className="text-xs text-emerald-400 font-medium">HIGH LEVEL KYC COMPLETE</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="flex justify-between"><span>Aadhaar KYC:</span><strong className="text-emerald-400">✓ Verified</strong></p>
              <p className="flex justify-between"><span>Police Audit:</span><strong className="text-emerald-400">✓ Clear</strong></p>
              <p className="flex justify-between"><span>Skill Level:</span><strong className="text-emerald-400">✓ Level 3 Master</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AvailableJobsTab = ({ jobs, onAcceptJob }) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const availableJobs = jobs.filter(j => j.status === 'available');
  const filteredJobs = availableJobs.filter(job => {
    const matchesCategory = filterCategory === 'all' || job.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2"><Briefcase className="w-5 h-5 text-blue-400" /> Available Job Leads ({filteredJobs.length})</h2>
          <p className="text-xs text-slate-400 mt-1">Accept high-rate customer service requests near your location</p>
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200">
          <option value="all">All Branches</option>
          {EXPERTISE_BRANCHES.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">{job.id}</span>
                <h3 className="text-base font-bold text-white mt-1">{job.title}</h3>
              </div>
              <p className="text-2xl font-black text-emerald-400">₹{job.price}</p>
            </div>
            <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl">"{job.description}"</p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">{job.location} ({job.distance})</span>
              <button onClick={() => onAcceptJob(job.id)} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer">Accept Lead</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActiveJobsTab = ({ jobs, onUpdateStage, onCompleteJob }) => {
  const activeJobs = jobs.filter(j => j.status === 'active');
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><Clock className="w-5 h-5 text-emerald-400" /> Active Jobs In Progress ({activeJobs.length})</h2>
      </div>
      {activeJobs.map(job => (
        <div key={job.id} className="bg-slate-900/90 border border-emerald-500/30 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">{job.id}</span>
              <h3 className="text-lg font-bold text-white mt-1">{job.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{job.description}</p>
            </div>
            <p className="text-2xl font-black text-emerald-400">₹{job.price}</p>
          </div>
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl text-xs">
            <div>
              <p className="font-bold text-white">{job.customerName}</p>
              <p className="text-slate-400">{job.location}</p>
            </div>
            <a href={`tel:${job.customerPhone}`} className="bg-slate-900 text-slate-200 font-bold px-3 py-2 rounded-xl flex items-center gap-1"><PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> Call Customer</a>
          </div>
          <button onClick={() => onCompleteJob(job.id)} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs cursor-pointer">Complete Job & Request Payment</button>
        </div>
      ))}
    </div>
  );
};

const CompletedJobsTab = ({ jobs }) => {
  const completedJobs = jobs.filter(j => j.status === 'completed');
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Completed Jobs History ({completedJobs.length})</h2>
      </div>
      {completedJobs.map(job => (
        <div key={job.id} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between">
            <h3 className="text-base font-bold text-white">{job.title}</h3>
            <p className="text-lg font-black text-emerald-400">₹{job.price}</p>
          </div>
          <p className="text-xs text-slate-400">Customer: {job.customerName} • {job.date}</p>
          {job.reviewComment && <p className="text-xs text-slate-300 italic bg-slate-950 p-3 rounded-xl">"{job.reviewComment}"</p>}
        </div>
      ))}
    </div>
  );
};

const TotalEarningsTab = ({ jobs }) => {
  const completedJobs = jobs.filter(j => j.status === 'completed');
  const completedTotal = completedJobs.reduce((sum, j) => sum + j.price, 0);
  const walletBalance = 3850 + completedTotal;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 border border-purple-800/40 p-6 rounded-3xl flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-purple-300">Available Wallet Balance</span>
          <h2 className="text-3xl font-black text-white">₹{walletBalance.toLocaleString('en-IN')}</h2>
        </div>
        <button onClick={() => alert('Payout transfer initiated to linked UPI/Bank.')} className="bg-emerald-500 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs cursor-pointer">Instant Withdrawal to Bank</button>
      </div>
    </div>
  );
};

const WorkerProfileTab = ({ branchName }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center">RK</div>
        <div>
          <h2 className="text-xl font-bold text-white">Rajesh Kumar</h2>
          <p className="text-xs text-blue-400 font-bold">{branchName} Specialist • 8 Years Exp</p>
        </div>
      </div>
    </div>
  );
};

const RatingsReviewsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl flex items-center gap-4">
        <span className="text-4xl font-black text-white">4.9</span>
        <div>
          <div className="flex text-amber-400"><Star className="fill-amber-400 w-5 h-5" /><Star className="fill-amber-400 w-5 h-5" /><Star className="fill-amber-400 w-5 h-5" /><Star className="fill-amber-400 w-5 h-5" /><Star className="fill-amber-400 w-5 h-5" /></div>
          <p className="text-xs text-slate-400">Based on 128 verified customer ratings</p>
        </div>
      </div>
    </div>
  );
};

const AvailabilityTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-400" /> Shift Availability Schedule</h2>
        <p className="text-xs text-slate-400 mt-1">Monday – Saturday: 09:00 AM – 07:00 PM</p>
      </div>
    </div>
  );
};

const WelfareSectionTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/40 p-6 rounded-3xl flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">₹5,00,000 Group Medical Claim Policy</h2>
          <p className="text-xs text-slate-300 mt-1">Active Protection for Self + Family</p>
        </div>
        <button onClick={() => alert('Emergency SOS Alert sent to Safety Helpline: 1800-419-8800')} className="bg-rose-600 text-white font-black px-5 py-3 rounded-2xl text-xs cursor-pointer">24/7 SOS HELP</button>
      </div>
    </div>
  );
};

const SettingsTab = ({ onUpdateBranch }) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><Settings className="w-5 h-5 text-purple-400" /> Account Preferences</h2>
      </div>
    </div>
  );
};

const NotificationsModal = ({ isOpen, onClose, notifications, onMarkAllRead, onClearAll }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 space-y-4 flex flex-col justify-between">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2"><Bell className="w-5 h-5 text-blue-400" /> Notifications</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {notifications.map(n => (
            <div key={n.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
              <p className="font-bold text-white">{n.title}</p>
              <p className="text-slate-300">{n.message}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs">Close</button>
      </div>
    </div>
  );
};

// ==========================================
// 3. MASTER COMBINED WORKER APPLICATION
// ==========================================
export default function SingleWorkerPortalApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('electrician');
  const [activeTab, setActiveTab] = useState('overview');
  const [isOnline, setIsOnline] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const branchObj = EXPERTISE_BRANCHES.find(b => b.id === selectedBranch) || EXPERTISE_BRANCHES[0];

  const handleAcceptJob = (jobId) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'active', progressStage: 'accepted' } : j));
    setActiveTab('active');
  };

  const handleCompleteJob = (jobId) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'completed', ratingGiven: 5.0 } : j));
    setActiveTab('completed');
  };

  // If not logged in, render Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-8 px-4 font-sans relative overflow-hidden">
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

  // Logged in Dashboard Layout
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
              { id: 'settings', label: 'Settings', icon: Settings }
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
          {activeTab === 'overview' && <OverviewTab isOnline={isOnline} jobs={jobs} onAcceptJob={handleAcceptJob} onNavigateTab={setActiveTab} branchName={branchObj.name} />}
          {activeTab === 'available' && <AvailableJobsTab jobs={jobs} onAcceptJob={handleAcceptJob} />}
          {activeTab === 'active' && <ActiveJobsTab jobs={jobs} onUpdateStage={() => {}} onCompleteJob={handleCompleteJob} />}
          {activeTab === 'completed' && <CompletedJobsTab jobs={jobs} />}
          {activeTab === 'earnings' && <TotalEarningsTab jobs={jobs} />}
          {activeTab === 'profile' && <WorkerProfileTab branchName={branchObj.name} />}
          {activeTab === 'ratings' && <RatingsReviewsTab />}
          {activeTab === 'availability' && <AvailabilityTab />}
          {activeTab === 'welfare' && <WelfareSectionTab />}
          {activeTab === 'settings' && <SettingsTab onUpdateBranch={setSelectedBranch} />}
        </main>
      </div>

      <NotificationsModal isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} notifications={notifications} />
    </div>
  );
}
