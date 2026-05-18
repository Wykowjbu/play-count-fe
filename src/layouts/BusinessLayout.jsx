import { Link, Outlet, useLocation } from 'react-router-dom';

export default function BusinessLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/business/revenue', icon: 'dashboard' },
    { name: 'Manage Courts', path: '#', icon: 'stadium' },
    { name: 'Bookings', path: '#', icon: 'event_available' },
    { name: 'Analytics', path: '#', icon: 'bar_chart' },
    { name: 'Settings', path: '#', icon: 'settings' },
  ];

  return (
    <div className="flex min-h-screen bg-background-light font-display">
      {/* Sidebar */}
      <aside className="w-64 bg-background-dark text-white flex-shrink-0 flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-3xl">sports_tennis</span>
            <span className="text-xl font-bold">PlayCourt Biz</span>
          </Link>
        </div>
        
        <nav className="flex-grow px-4 space-y-2 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center space-x-3 px-4 py-3 w-full text-gray-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-gray-900">
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
        <main className="flex-grow overflow-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
