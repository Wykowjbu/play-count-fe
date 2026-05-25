import { useState } from 'react';
import { Link } from 'react-router-dom';

const steps = [
  { id: 1, label: 'Email' },
  { id: 2, label: 'OTP' },
  { id: 3, label: 'Reset' },
];

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStep((current) => Math.min(current + 1, 3));
  };

  return (
    <div className="auth-card">
      <div className="mb-7">
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Account recovery</p>
        <h1 className="text-3xl font-black text-slate-900">Reset your password</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">
          Mock flow for forgot password, resend OTP, and reset password endpoints.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-2">
        {steps.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl px-3 py-3 text-center text-[10px] font-black uppercase tracking-widest ${
              item.id <= step ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {step === 1 && (
          <AuthField
            label="Email address"
            icon="mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
          />
        )}

        {step === 2 && (
          <>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              OTP sent to {email || 'name@example.com'}. This mock always returns success to avoid account enumeration.
            </div>
            <AuthField
              label="OTP code"
              icon="pin"
              value={otpCode}
              onChange={(event) => setOtpCode(event.target.value)}
              placeholder="123456"
            />
            <button type="button" className="text-xs font-black uppercase tracking-widest text-primary hover:underline cursor-pointer">
              Resend OTP after 60s
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <AuthField label="New password" icon="lock_reset" type="password" placeholder="Min. 8 characters" />
            <AuthField label="Confirm password" icon="lock" type="password" placeholder="Repeat password" />
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold leading-5 text-slate-500">
              All refresh sessions will be invalidated after reset.
            </div>
          </>
        )}

        <button type="submit" className="auth-primary-action">
          {step < 3 ? 'Continue' : 'Reset Password'}
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </form>

      <p className="mt-8 text-center text-sm font-bold text-slate-500">
        Remembered it?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}

function AuthField({ label, icon, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600">{label}</span>
      <span className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </span>
        <input className="auth-field pl-12" required {...props} />
      </span>
    </label>
  );
}
