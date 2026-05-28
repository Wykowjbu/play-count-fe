import { Link, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Profile Detail', path: '/profile/detail', icon: 'account_circle' },
  { name: 'My Bookings', path: '/profile/bookings', icon: 'event_available' },
  { name: 'Favorites', path: '/profile/favorites', icon: 'favorite' },
  { name: 'Notifications', path: '/profile/notifications', icon: 'notifications' },
  { name: 'Security', path: '/profile/security', icon: 'shield' },
];

export default function PlayerProfileLayout() {
  const location = useLocation();

  return (
    <div className="bg-background-light font-display">
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-3xl border border-slate-200 bg-white p-4">
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
                      ? 'bg-primary text-slate-900'
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
