import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as authService from '../../services/mock/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await authService.login(email, password);
      if (user) {
        // Redirect based on role
        if (user.role === 'Owner') {
          navigate('/business/revenue');
        } else {
          navigate('/');
        }
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-black text-gray-700 uppercase tracking-wider mb-2">
            Email or Phone
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
              <span className="material-symbols-outlined text-xl">mail</span>
            </span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium"
              placeholder="name@example.com"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-black text-gray-700 uppercase tracking-wider">
              Password
            </label>
            <Link to="#" className="text-xs font-bold text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
              <span className="material-symbols-outlined text-xl">lock</span>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 animate-shake">
            <span className="material-symbols-outlined text-lg">error</span>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-200 hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Sign In</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-10">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-400 font-bold uppercase tracking-widest text-[10px]">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-black text-sm text-slate-700">
            <svg className="size-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-black text-sm text-slate-700">
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.96.95-2.12 1.38-3.48 1.38-1.18 0-2.1-.31-2.91-.72-.8-.41-1.63-.83-2.76-.83-1.11 0-2.02.43-2.84.85-.75.39-1.57.82-2.68.82-1.3 0-2.43-.45-3.38-1.36C-2.45 19.1 1.25 10.15 6.45 10.15c1.1 0 1.95.34 2.65.68.75.36 1.45.72 2.3.72.8 0 1.55-.38 2.25-.72.85-.43 1.9-.88 3.25-.88 1.15 0 2.22.45 3.05 1.22-.5.42-1.1 1.02-1.1 2.5 0 1.8 1.1 2.55 2.15 3.02-.35 1.25-.9 2.5-1.9 3.59zM12 10.15c-.1 0-.15-.05-.25-.05 2.15-2.5 1.9-5.15 1.85-5.3 0-.1.05-.2.15-.25 2.65.1 4.5 2.45 4 5.3 0 .1-.1.2-.25.25-1.35.1-2.65.05-5.5.05z" />
            </svg>
            Apple
          </button>
        </div>
      </div>

      <p className="mt-10 text-center text-sm font-bold text-slate-500">
        Don't have an account?{' '}
        <Link to="#" className="text-primary hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  );
}
