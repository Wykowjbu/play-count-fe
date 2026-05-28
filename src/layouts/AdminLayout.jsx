import { Link, NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
  { name: 'Users', path: '/admin/users', icon: 'group' },
  { name: 'Owner KYC', path: '/admin/owners', icon: 'domain_verification' },
  { name: 'Catalog', path: '/admin/catalog', icon: 'category' },
  { name: 'Reviews', path: '/admin/reviews', icon: 'rate_review' },
];

const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-black transition-colors ${
    isActive ? 'bg-primary text-slate-900' : 'text-slate-100/60 hover:bg-white/10 hover:text-primary'
  }`;

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light font-display lg:flex-row">
      <aside className="flex shrink-0 flex-col bg-slate-950 text-slate-100 lg:w-72">
        <div className="p-5 lg:p-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl text-primary">admin_panel_settings</span>
            <span className="text-xl font-black">PlayCourt Admin</span>
          </Link>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:overflow-visible lg:py-4">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={navClass}>
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="whitespace-nowrap">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Internal control</p>
            <h1 className="text-lg font-black text-slate-900">Admin workspace</h1>
          </div>
          <Link to="/business/revenue" className="rounded-3xl border border-slate-900 px-4 py-2 text-sm font-black text-slate-700 hover:bg-primary hover:text-slate-900">
            Owner portal
          </Link>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
