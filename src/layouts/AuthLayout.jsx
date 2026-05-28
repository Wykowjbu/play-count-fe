import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-background-light font-display">
      {/* Left Side: Banner Image */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1595435063711-2e23d0c2e68f?q=80&w=1974&auto=format&fit=crop"
          alt="Tennis Court"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70"></div>
        <div className="relative z-10 flex w-full flex-col items-center justify-center px-12 text-center text-primary">
          <Link to="/" className="flex items-center space-x-2 mb-8">
            <span className="material-symbols-outlined text-5xl">sports_tennis</span>
            <span className="text-4xl font-black">PlayCourt</span>
          </Link>
          <h2 className="mb-4 text-6xl font-black leading-none">Book fast. Play more.</h2>
          <p className="max-w-md text-lg font-semibold leading-8 text-slate-100">
            Join the largest community of sports enthusiasts. Book courts, find matches, and track your progress all in one place.
          </p>
        </div>
      </div>

      {/* Right Side: Auth Form Container */}
      <div className="flex w-full items-center justify-center px-5 py-8 sm:px-8 lg:w-1/2 lg:px-14">
        <div className="w-full max-w-[520px]">
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary text-4xl">sports_tennis</span>
              <span className="text-3xl font-black text-gray-900">PlayCourt</span>
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
