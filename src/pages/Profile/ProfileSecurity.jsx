export default function ProfileSecurity() {
  const sessions = [
    { device: 'Chrome on Windows', location: 'Da Nang, Vietnam', status: 'Current session' },
    { device: 'Safari on iPhone', location: 'Ho Chi Minh City, Vietnam', status: 'Refresh token active' },
  ];

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Account security</p>
        <h1 className="text-3xl font-black text-slate-900">Password & Sessions</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">
          Mock surface for change-password, logout, and refresh-token lifecycle endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-900">Change password</h2>
          <div className="mt-6 space-y-4">
            {['Current password', 'New password', 'Confirm new password'].map((label) => (
              <label key={label} className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">{label}</span>
                <input className="auth-field" type="password" placeholder="Min. 8 characters" />
              </label>
            ))}
          </div>
          <button type="button" className="mt-6 h-12 rounded-2xl bg-slate-900 px-6 text-sm font-black text-white transition-colors hover:bg-primary cursor-pointer">
            Update password
          </button>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">Active sessions</h2>
              <p className="mt-1 text-sm font-bold text-slate-500">Refresh tokens are rotated in the mock auth model.</p>
            </div>
            <button type="button" className="h-11 rounded-xl border border-rose-200 px-4 text-sm font-black text-rose-600 transition-colors hover:bg-rose-50 cursor-pointer">
              Logout all
            </button>
          </div>

          <div className="mt-6 divide-y divide-slate-100">
            {sessions.map((session) => (
              <div key={session.device} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">devices</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{session.device}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">{session.location}</p>
                  </div>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
