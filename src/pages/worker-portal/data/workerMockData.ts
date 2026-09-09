export interface WorkerJob {
  id: string;
  title: string;
  category: string; // branch/expertise e.g., 'Electrician', 'Plumber'
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

export interface ReviewItem {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  date: string;
  jobTitle: string;
  comment: string;
  workerReply?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'job' | 'payment' | 'system' | 'welfare';
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

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
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

export const REVIEWS_LIST: ReviewItem[] = [
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
