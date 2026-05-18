import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as authService from '../../services/mock/authService';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    if (e.target.value === 'CourtOwner') {
      navigate('/register-owner');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await authService.register({ ...formData, role: 'Player' });
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background-light dark:bg-background-dark px-6 py-12 lg:px-20 overflow-y-auto w-full h-full">
      <div className="w-full max-w-[480px]">
        <div className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="flex items-center justify-center size-10 bg-primary rounded-xl text-black">
            <span className="material-symbols-outlined font-bold">sports_tennis</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#0d1b0f] dark:text-white">PlayCourt</span>
        </div>

        <div className="mb-10">
          <h1 className="text-[#0d1b0f] dark:text-white tracking-tight text-4xl font-bold leading-tight mb-3">Join the Community</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Create your PlayCourt account to start booking.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          
          <div className="mb-8">
            <div className="flex h-14 w-full items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5 p-1.5">
              <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-xl px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-[#1a2e1d] has-[:checked]:shadow-sm has-[:checked]:text-[#0d1b0f] dark:has-[:checked]:text-primary text-gray-500 dark:text-gray-400 text-sm font-bold transition-all">
                <span className="truncate flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">person</span> Player
                </span>
                <input name="role" value="Player" className="invisible w-0" type="radio" defaultChecked onChange={handleRoleChange} />
              </label>
              <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-xl px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-[#1a2e1d] has-[:checked]:shadow-sm has-[:checked]:text-[#0d1b0f] dark:has-[:checked]:text-primary text-gray-500 dark:text-gray-400 text-sm font-bold transition-all">
                <span className="truncate flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">stadium</span> Court Owner
                </span>
                <input name="role" value="CourtOwner" className="invisible w-0" type="radio" onChange={handleRoleChange} />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full h-14 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111c12] px-5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400" placeholder="Enter your name" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full h-14 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111c12] px-5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400" placeholder="name@email.com" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Phone Number</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="w-full h-14 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111c12] px-5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400" placeholder="+84 XXX XXX XXX" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required minLength={8} className="w-full h-14 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111c12] px-5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400" placeholder="Min. 8 characters" />
                <button type="button" className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" onClick={() => setShowPassword(!showPassword)}>
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required minLength={8} className="w-full h-14 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111c12] px-5 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400" placeholder="Confirm Your Password" />
                <button type="button" className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <span className="material-symbols-outlined">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>
          </div>

          <button className="w-full h-14 bg-primary hover:brightness-110 text-white font-extrabold rounded-2xl shadow-xl shadow-primary/20 transition-all mt-8 active:scale-[0.98]" type="submit">
            Create Account
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Already part of PlayCourt?
          <Link to="/login" className="text-primary font-bold hover:underline ml-1">Log In</Link>
        </p>
      </div>
    </div>
  );
}
