import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function VerifyOtp() {
  const [verified, setVerified] = useState(false);
  const [resent, setResent] = useState(false);

  return (
    <div className="auth-card">
      <div className="mb-7">
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Email verification</p>
        <h1 className="text-3xl font-black text-slate-900">Verify OTP</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">
          Complete account activation before login. OTP TTL is mocked as 5 minutes.
        </p>
      </div>

      {verified ? (
        <div className="space-y-5">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
              <span className="material-symbols-outlined">check</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">Account activated</h2>
            <p className="mt-2 text-sm font-bold text-emerald-700">Your mock user can now sign in and book courts.</p>
          </div>
          <Link to="/login" className="auth-primary-action">
            Go to Login
            <span className="material-symbols-outlined text-xl">login</span>
          </Link>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            setVerified(true);
          }}
        >
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600">Email address</span>
            <input className="auth-field" type="email" defaultValue="player@gmail.com" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600">OTP code</span>
            <input className="auth-field text-center text-xl tracking-[0.5em]" defaultValue="123456" required />
          </label>
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Throttle</span>
            <button
              type="button"
              onClick={() => setResent(true)}
              className="text-xs font-black uppercase tracking-widest text-primary hover:underline cursor-pointer"
            >
              Resend in 60s
            </button>
          </div>
          {resent && <p className="text-xs font-bold text-emerald-600">Mock OTP resent successfully.</p>}
          <button type="submit" className="auth-primary-action">
            Activate Account
            <span className="material-symbols-outlined text-xl">verified</span>
          </button>
        </form>
      )}
    </div>
  );
}
