import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { User, Lock, ArrowRight, CheckCircle, Wrench, Zap, Droplet, Hammer, Broom, Palette, Wrench as WrenchIcon, Sprout, Snowflake } from 'lucide-react';
import { backendApi } from '../services/backendApi';
import gsap from 'gsap';

const workerTypes = [
  { id: 'electrician', name: 'Electrician', icon: Zap, description: 'Electrical repairs, wiring' },
  { id: 'plumber', name: 'Plumber', icon: Droplet, description: 'Pipe repairs, installations' },
  { id: 'carpenter', name: 'Carpenter', icon: Hammer, description: 'Woodwork, furniture' },
  { id: 'cleaner', name: 'Cleaner', icon: Broom, description: 'House cleaning' },
  { id: 'painter', name: 'Painter', icon: Palette, description: 'Painting, wall treatments' },
  { id: 'mechanic', name: 'Mechanic', icon: WrenchIcon, description: 'Appliance repairs' },
  { id: 'gardener', name: 'Gardener', icon: Sprout, description: 'Garden maintenance' },
  { id: 'ac_technician', name: 'AC Technician', icon: Snowflake, description: 'AC repair, installation' }
];

export const WorkerLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedWorkerType, setSelectedWorkerType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useDemoMode, setUseDemoMode] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const workerTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate container entrance
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Animate form elements sequentially
    gsap.fromTo(formRef.current?.children || [],
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out",
        delay: 0.3
      }
    );

    // Animate worker type buttons
    gsap.fromTo(workerTypeRef.current?.children || [],
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5, 
        stagger: 0.05, 
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!selectedWorkerType) {
      setError('Please select your profession');
      return;
    }
    
    setLoading(true);

    if (useDemoMode) {
      // Demo mode - skip backend
      localStorage.setItem('auth_token', 'demo_token');
      localStorage.setItem('user_role', 'worker');
      localStorage.setItem('user_email', email);
      localStorage.setItem('worker_type', selectedWorkerType);
      localStorage.setItem('user_id', 'demo_user_id');
      localStorage.setItem('demo_mode', 'true');
      navigate('/worker');
      setLoading(false);
      return;
    }

    try {
      // Call backend API
      const response = await backendApi.login(email, password);
      
      if (response.success && response.session) {
        // Store auth data
        localStorage.setItem('auth_token', response.session.access_token);
        localStorage.setItem('user_role', 'worker');
        localStorage.setItem('user_email', email);
        localStorage.setItem('worker_type', selectedWorkerType);
        localStorage.setItem('user_id', response.user.id);
        localStorage.removeItem('demo_mode');
        
        navigate('/worker');
      } else {
        // Show error message instead of falling back to demo mode
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (err: any) {
      // Show error message instead of falling back to demo mode
      setError('Login failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="w-10 h-10" />
              <span className="text-2xl font-bold">FixMate</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Grow Your Business</h2>
            <p className="text-purple-100 mb-6">
              Join our cooperative platform and connect with customers who need your skills. Get job recommendations, manage your earnings, and build your reputation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Job Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Flexible Schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Weekly Payments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Worker Login</h1>
            <p className="text-gray-600 mt-2">Sign in to manage your jobs and earnings</p>
          </div>
          
          <Card className="p-8">
            {/* Worker Type Selection */}
            <div ref={workerTypeRef} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Your Profession</h3>
              <div className="grid grid-cols-4 gap-2">
                {workerTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedWorkerType(type.id)}
                      className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center ${
                        selectedWorkerType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-1" />
                      <span className="text-xs font-medium">{type.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useDemoMode}
                  onChange={(e) => setUseDemoMode(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-blue-800">Use Demo Mode (skip backend)</span>
              </label>
            </div>
            
            <form ref={formRef} onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : (
                  <>
                    Login as Worker
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-gray-600">
                New worker?{' '}
                <button
                  onClick={() => navigate('/worker-register')}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Register as Worker
                </button>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};