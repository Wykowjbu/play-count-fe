import { Link, Outlet, useLocation } from 'react-router-dom';

export default function BusinessLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/business/revenue', icon: 'dashboard' },
    { name: 'Venues', path: '/business/venues', icon: 'storefront' },
    { name: 'Manage Courts', path: '/business/courts', icon: 'stadium' },
    { name: 'Bookings', path: '/business/bookings', icon: 'event_available' },
    { name: 'Analytics', path: '/business/analytics', icon: 'bar_chart' },
    { name: 'Payments', path: '/business/payments', icon: 'payments' },
    { name: 'Settings', path: '/business/settings', icon: 'settings' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background-light font-display lg:flex-row">
      {/* Sidebar */}
      <aside className="flex flex-shrink-0 flex-col bg-background-dark text-slate-100 lg:w-72">
        <div className="p-4 lg:p-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-3xl">sports_tennis</span>
            <span className="text-xl font-black">PlayCourt Biz</span>
          </Link>
        </div>
        
        <nav className="flex lg:flex-col gap-2 lg:gap-0 lg:flex-grow px-4 pb-4 lg:py-4 overflow-x-auto lg:space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 rounded-2xl px-4 py-3 transition-colors whitespace-nowrap ${
                location.pathname === item.path
                  ? 'bg-primary text-slate-900'
                  : 'text-slate-100/60 hover:bg-white/10 hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden border-t border-white/10 p-4 lg:block">
          <Link to="/admin/dashboard" className="mb-2 flex w-full items-center space-x-3 px-4 py-3 text-slate-100/60 transition-colors hover:text-primary">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span className="font-medium">Admin Portal</span>
          </Link>
          <button className="flex w-full items-center space-x-3 px-4 py-3 text-slate-100/60 transition-colors hover:text-primary cursor-pointer">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <header className="flex min-h-16 flex-col justify-between gap-3 border-b border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:py-0 lg:px-8">
          <h2 className="text-xl font-black text-gray-900">
            {navItems.find(item => item.path === location.pathname)?.name || 'Business Portal'}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-primary transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Court Manager</p>
                <p className="text-xs text-gray-500">Premium Owner</p>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-500 text-2xl">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow overflow-auto bg-background-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
