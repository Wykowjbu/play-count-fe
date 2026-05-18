import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-background-light font-display">
      {/* Left Side: Banner Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1595435063711-2e23d0c2e68f?q=80&w=1974&auto=format&fit=crop"
          alt="Tennis Court"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-white text-center">
          <Link to="/" className="flex items-center space-x-2 mb-8">
            <span className="material-symbols-outlined text-5xl">sports_tennis</span>
            <span className="text-4xl font-bold">PlayCourt</span>
          </Link>
          <h2 className="text-3xl font-bold mb-4">Elevate Your Game</h2>
          <p className="text-lg text-white/90 max-w-md">
            Join the largest community of sports enthusiasts. Book courts, find matches, and track your progress all in one place.
          </p>
        </div>
      </div>

      {/* Right Side: Auth Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary text-4xl">sports_tennis</span>
              <span className="text-3xl font-bold text-gray-900">PlayCourt</span>
            </Link>
          </div>
          <Outlet />
          <div className="mt-8 text-center text-sm text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
