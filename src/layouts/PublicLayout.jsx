import { Link, Outlet } from 'react-router-dom';

export default function PublicLayout() {
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
                <Link to="/find-courts" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-primary text-sm font-medium">
                  Find Courts
                </Link>
                <Link to="/matches" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                  Join Matches
                </Link>
                <Link to="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                  Leaderboard
                </Link>
                <Link to="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                  My Bookings
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <Link to="/login" className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-gray-600">account_circle</span>
              </Link>
              <button className="md:hidden p-2 text-gray-500">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
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
                <li><Link to="/" className="text-gray-400 hover:text-white">Find Courts</Link></li>
                <li><Link to="/matches" className="text-gray-400 hover:text-white">Join Matches</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Leaderboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
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
