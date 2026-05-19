import { Link, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Profile Detail', path: '/profile/detail', icon: 'account_circle' },
  { name: 'My Bookings', path: '/profile/bookings', icon: 'event_available' },
  { name: 'Preferences', path: '/profile/detail', icon: 'tune' },
];

export default function PlayerProfileLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background-light font-display">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">sports_tennis</span>
            <span className="text-xl font-black text-slate-900">PlayCourt</span>
          </Link>
          <Link to="/" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">
            <div className="px-4 py-5 border-b border-slate-100 mb-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Player Center</p>
              <h1 className="text-2xl font-black text-slate-900">Manage Profile</h1>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={`${item.name}-${item.path}`}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary text-white'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <Outlet />
      </main>
    </div>
  );
}
