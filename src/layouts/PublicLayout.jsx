import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { name: 'Find Courts', path: '/find-courts' },
  { name: 'Join Matches', path: '/matches' },
  { name: 'Leaderboard', path: '/leaderboard' },
  { name: 'My Bookings', path: '/profile/bookings' },
];

const navLinkClass = ({ isActive }) =>
  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold transition-colors ${
    isActive
      ? 'text-slate-900 border-primary'
      : 'text-slate-500 hover:text-slate-800 border-transparent'
  }`;

export default function PublicLayout() {
  const [activePanel, setActivePanel] = useState(null);
  const isNotificationsOpen = activePanel === 'notifications';
  const isProfileOpen = activePanel === 'profile';

  const togglePanel = (panel) => {
    setActivePanel((currentPanel) => (currentPanel === panel ? null : panel));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light font-display">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-primary text-3xl">sports_tennis</span>
                <span className="text-xl font-bold text-gray-900">PlayCourt</span>
              </Link>
              
              <div className="hidden md:ml-8 md:flex md:space-x-8">
                {navItems.map((item) => (
                  <NavLink key={item.path} to={item.path} className={navLinkClass}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  type="button"
                  aria-label="Notification Panel"
                  aria-expanded={isNotificationsOpen}
                  onClick={() => togglePanel('notifications')}
                  className="relative p-2 text-gray-500 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-full transition-colors cursor-pointer"
                >
                <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                </button>
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <p className="text-sm font-black text-slate-900">Notification Panel</p>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-black text-primary">3 new</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {[
                        ['Match request', 'Minh wants to join your pickleball match at 18:00.'],
                        ['Booking confirmed', 'Court A2 is ready for today at PlayCourt Son Tra.'],
                        ['Owner update', 'Revenue report for your courts is available.'],
                      ].map(([title, body]) => (
                        <button
                          key={title}
                          type="button"
                          className="w-full rounded-xl p-3 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <p className="text-xs font-black text-slate-900">{title}</p>
                          <p className="mt-1 text-xs font-bold leading-5 text-slate-500">{body}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label="Profile Menu"
                  aria-expanded={isProfileOpen}
                  onClick={() => togglePanel('profile')}
                  className="flex items-center space-x-2 rounded-full border border-slate-200 bg-white p-1 pr-3 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-gray-600">account_circle</span>
                  <span className="hidden sm:inline text-sm font-black text-slate-700">Profile</span>
                  <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                    <div className="border-b border-slate-100 p-4">
                      <p className="text-sm font-black text-slate-900">Nguyen Van Nguoi Choi</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">Player account</p>
                    </div>
                    <div className="p-2">
                      {[
                        ['Profile Detail', '/profile/detail', 'account_circle'],
                        ['My Bookings', '/profile/bookings', 'event_available'],
                        ['Owner Center', '/business/revenue', 'stadium'],
                      ].map(([label, path, icon]) => (
                        <Link
                          key={label}
                          to={path}
                          onClick={() => setActivePanel(null)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        >
                          <span className="material-symbols-outlined text-xl text-primary">{icon}</span>
                          {label}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 p-2">
                      <Link
                        to="/login"
                        onClick={() => setActivePanel(null)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">logout</span>
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="md:hidden flex gap-5 overflow-x-auto pb-3">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-background-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">sports_tennis</span>
                <span className="text-xl font-bold">PlayCourt</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                The ultimate platform for court booking and match finding. Connect with players and elevate your game.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/find-courts" className="text-gray-400 hover:text-white">Find Courts</Link></li>
                <li><Link to="/matches" className="text-gray-400 hover:text-white">Join Matches</Link></li>
                <li><Link to="/leaderboard" className="text-gray-400 hover:text-white">Leaderboard</Link></li>
                <li><Link to="/profile/bookings" className="text-gray-400 hover:text-white">My Bookings</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help-center" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PlayCourt. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
