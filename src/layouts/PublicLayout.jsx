import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { name: 'Find Courts', path: '/find-courts' },
  { name: 'Join Matches', path: '/matches' },
  { name: 'Leaderboard', path: '/leaderboard' },
  { name: 'My Bookings', path: '/profile/bookings' },
];

const navLinkClass = ({ isActive }) =>
  `inline-flex items-center rounded-full px-4 py-2 text-sm font-black transition-colors ${
    isActive
      ? 'bg-primary text-slate-900'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

export default function PublicLayout() {
  const [activePanel, setActivePanel] = useState(null);
  const isNotificationsOpen = activePanel === 'notifications';
  const isProfileOpen = activePanel === 'profile';

  const togglePanel = (panel) => {
    setActivePanel((currentPanel) => (currentPanel === panel ? null : panel));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background-light font-display">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-18 justify-between py-3">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-slate-900">
                  <span className="material-symbols-outlined text-2xl">sports_tennis</span>
                </span>
                <span className="text-xl font-black text-gray-900">PlayCourt</span>
              </Link>
              
              <div className="hidden md:ml-8 md:flex md:gap-2">
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
                  className="relative rounded-full bg-slate-100 p-2 text-slate-700 transition-colors hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                >
                <span className="material-symbols-outlined">notifications</span>
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                </button>
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 rounded-3xl border border-slate-200 bg-white p-3">
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
                    <Link
                      to="/profile/notifications"
                      onClick={() => setActivePanel(null)}
                      className="mt-3 flex items-center justify-center rounded-3xl bg-primary px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-900 transition-colors hover:bg-[#cdffad]"
                    >
                      View all notifications
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label="Profile Menu"
                  aria-expanded={isProfileOpen}
                  onClick={() => togglePanel('profile')}
                  className="flex items-center space-x-2 rounded-full border border-slate-900 bg-white p-1 pr-3 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-gray-600">account_circle</span>
                  <span className="hidden sm:inline text-sm font-black text-slate-700">Profile</span>
                  <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                    <div className="border-b border-slate-100 p-4">
                      <p className="text-sm font-black text-slate-900">Nguyen Van Nguoi Choi</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">Player account</p>
                    </div>
                    <div className="p-2">
                      {[
                        ['Profile Detail', '/profile/detail', 'account_circle'],
                        ['My Bookings', '/profile/bookings', 'event_available'],
                        ['Favorites', '/profile/favorites', 'favorite'],
                        ['Notifications', '/profile/notifications', 'notifications'],
                        ['Security', '/profile/security', 'shield'],
                        ['Owner Center', '/business/revenue', 'stadium'],
                        ['Admin Portal', '/admin/dashboard', 'admin_panel_settings'],
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
      <footer className="bg-background-dark py-12 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">sports_tennis</span>
                <span className="text-xl font-bold">PlayCourt</span>
              </div>
              <p className="max-w-sm text-slate-100/70">
                The ultimate platform for court booking and match finding. Connect with players and elevate your game.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/find-courts" className="text-slate-100/70 hover:text-primary">Find Courts</Link></li>
                <li><Link to="/matches" className="text-slate-100/70 hover:text-primary">Join Matches</Link></li>
                <li><Link to="/leaderboard" className="text-slate-100/70 hover:text-primary">Leaderboard</Link></li>
                <li><Link to="/profile/bookings" className="text-slate-100/70 hover:text-primary">My Bookings</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help-center" className="text-slate-100/70 hover:text-primary">Help Center</Link></li>
                <li><Link to="/privacy-policy" className="text-slate-100/70 hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-slate-100/70 hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-100/10 pt-8 text-center text-sm text-slate-100/60">
            &copy; {new Date().getFullYear()} PlayCourt. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
