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
    confirmPassword: '',
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
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await authService.register({ ...formData, role: 'Player' });
      navigate('/verify-otp');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div className="auth-card">
      <div className="mb-7">
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Player account</p>
        <h1 className="text-3xl font-black text-slate-900">Create your account</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">Book courts faster and join community matches in Da Nang.</p>
      </div>

      <div className="mb-6 flex rounded-2xl bg-slate-100 p-1.5">
        <label className="flex h-11 grow cursor-pointer items-center justify-center gap-2 rounded-xl px-3 text-sm font-black text-slate-500 transition-all has-[:checked]:bg-white has-[:checked]:text-slate-900 has-[:checked]:shadow-sm">
          <span className="material-symbols-outlined text-xl">person</span>
          Player
          <input name="role" value="Player" className="sr-only" type="radio" defaultChecked onChange={handleRoleChange} />
        </label>
        <label className="flex h-11 grow cursor-pointer items-center justify-center gap-2 rounded-xl px-3 text-sm font-black text-slate-500 transition-all has-[:checked]:bg-white has-[:checked]:text-slate-900 has-[:checked]:shadow-sm">
          <span className="material-symbols-outlined text-xl">stadium</span>
          Court Owner
          <input name="role" value="CourtOwner" className="sr-only" type="radio" onChange={handleRoleChange} />
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600">
            {error}
          </div>
        )}

        <AuthInput label="Full Name" icon="badge" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nguyen Van A" />
        <AuthInput label="Email Address" icon="mail" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@email.com" />
        <AuthInput label="Phone Number" icon="phone" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+84 XXX XXX XXX" />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          visible={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
          placeholder="Min. 8 characters"
        />
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          visible={showConfirmPassword}
          onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          placeholder="Confirm password"
        />

        <button className="auth-primary-action mt-2" type="submit">
          Create Account
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </form>

      <p className="mt-7 text-center text-sm font-bold text-slate-500">
        Already part of PlayCourt?
        <Link to="/login" className="ml-1 text-primary hover:underline">Log In</Link>
      </p>
    </div>
  );
}

function AuthInput({ label, icon, type = 'text', ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600">{label}</span>
      <span className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </span>
        <input type={type} required className="auth-field pl-12" {...props} />
      </span>
    </label>
  );
}

function PasswordInput({ label, visible, onToggle, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600">{label}</span>
      <span className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <span className="material-symbols-outlined text-xl">lock</span>
        </span>
        <input type={visible ? 'text' : 'password'} required minLength={8} className="auth-field pl-12 pr-12" {...props} />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-slate-700 cursor-pointer"
          onClick={onToggle}
        >
          <span className="material-symbols-outlined text-xl">{visible ? 'visibility_off' : 'visibility'}</span>
        </button>
      </span>
    </label>
  );
}
