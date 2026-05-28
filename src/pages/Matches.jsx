import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as venueService from '../services/mock/venueService';
import { formatCurrency } from '../utils/format';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateMatch, setShowCreateMatch] = useState(false);
  const [searchApplied, setSearchApplied] = useState(false);
  const [filters, setFilters] = useState({
    sport: 'All Racket Sports',
    level: 'Any Level',
    distance: 'Within 10 km'
  });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await venueService.getLiveMatches();
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <main className="max-w-[1280px] mx-auto pb-24">
      <section className="px-6 pt-12 pb-8">
        <div className="flex flex-col gap-5 mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Join a Match in Da Nang</h1>
            <p className="mt-3 text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl">Connect with players of your skill level and hit the court today. No partner? No problem.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateMatch(true)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-black text-white hover:bg-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">add</span>
            Create Match
          </button>
        </div>

        {/* Search & Filter Form */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-transparent focus-within:border-primary/50 transition-all">
              <span className="material-symbols-outlined text-primary">sports_tennis</span>
              <div className="flex flex-col w-full">
                <label className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Sport</label>
                <select 
                  name="sport"
                  value={filters.sport}
                  onChange={handleFilterChange}
                  className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold w-full text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option>All Racket Sports</option>
                  <option>Pickleball</option>
                  <option>Tennis</option>
                  <option>Badminton</option>
                </select>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-transparent focus-within:border-primary/50 transition-all">
              <span className="material-symbols-outlined text-primary">leaderboard</span>
              <div className="flex flex-col w-full">
                <label className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Skill Level</label>
                <select 
                  name="level"
                  value={filters.level}
                  onChange={handleFilterChange}
                  className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold w-full text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option>Any Level</option>
                  <option>Beginner</option>
                  <option>Intermediate+</option>
                  <option>Advanced</option>
                  <option>Pro</option>
                </select>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-transparent focus-within:border-primary/50 transition-all">
              <span className="material-symbols-outlined text-primary">distance</span>
              <div className="flex flex-col w-full">
                <label className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Distance</label>
                <select 
                  name="distance"
                  value={filters.distance}
                  onChange={handleFilterChange}
                  className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold w-full text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option>Within 5 km</option>
                  <option>Within 10 km</option>
                  <option>All of Da Nang</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSearchApplied(true)}
              className="bg-primary text-white font-black px-10 py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-primary/30 active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined">filter_list</span>
              <span>Search Matches</span>
            </button>
          </div>
          {searchApplied && (
            <p className="mt-3 rounded-xl bg-primary/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-primary">
              Mock filters applied: {filters.sport}, {filters.level}, {filters.distance}
            </p>
          )}
        </div>

        {/* Live Match Feed */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              Live Match Feed
              <span className="inline-flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            </h2>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              <span>Sort by:</span>
              <button className="text-primary flex items-center gap-1 hover:underline cursor-pointer">
                Soonest <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-20 text-center text-slate-400 font-bold">Loading live matches...</div>
            ) : matches.length > 0 ? (
              matches.map((match) => (
                <div key={match.id} className="group bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <div className={`absolute top-4 left-4 z-20 ${match.sport === 'Tennis' ? 'bg-blue-500' : match.sport === 'Badminton' ? 'bg-amber-500' : 'bg-primary'} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase`}>
                      {match.sport}
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 text-white">
                      <p className="text-sm font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span> {match.venueName}
                      </p>
                    </div>
                    <div 
                      className="w-full h-full bg-center bg-cover group-hover:scale-110 transition-transform duration-700" 
                      style={{ backgroundImage: `url("${match.imageUrl}")` }}
                    ></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">{match.title}</h3>
                        <p className="text-sm font-bold text-slate-400 mt-1 flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">schedule</span> {match.scheduleTime}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-xs font-black uppercase ${
                        match.skillLevel.includes('Intermediate') ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                        match.skillLevel.includes('Beginner') ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                        'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      }`}>
                        {match.skillLevel}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Cost / Person</p>
                        <p className="text-lg font-black text-primary">{formatCurrency(match.pricePerPerson || 80000)}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Availability</p>
                        <p className={`text-lg font-black ${match.spotsLeft === 1 ? 'text-rose-500' : 'text-primary'}`}>
                          {match.spotsLeft} spot{match.spotsLeft > 1 ? 's' : ''} left
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Link
                        to={`/matches/${match.id}`}
                        className="block w-full rounded-xl bg-slate-900 py-4 text-center font-black text-white shadow-xl transition-all hover:bg-primary active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:hover:bg-primary dark:hover:text-white"
                      >
                        View Match
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-slate-400 font-bold">No matches found for your criteria.</div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-6 rounded-2xl text-center">
            <p className="text-3xl font-black text-primary">124</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Live Matches</p>
          </div>
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-6 rounded-2xl text-center">
            <p className="text-3xl font-black text-primary">12</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Court Venues</p>
          </div>
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-6 rounded-2xl text-center">
            <p className="text-3xl font-black text-primary">850+</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Active Players</p>
          </div>
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-6 rounded-2xl text-center">
            <p className="text-3xl font-black text-primary">4.9</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Match Quality</p>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40">
        <button
          type="button"
          onClick={() => setShowCreateMatch(true)}
          className="flex items-center gap-4 bg-primary text-white px-8 py-5 rounded-full shadow-[0_20px_50px_rgba(34,197,94,0.4)] hover:scale-105 active:scale-95 transition-all border border-white/20 backdrop-blur-lg group cursor-pointer"
        >
          <span className="material-symbols-outlined text-white">add</span>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 leading-none mb-1">Organizer mode</p>
            <p className="text-sm font-black leading-tight">Host Your Own Match</p>
          </div>
          <div className="ml-4 size-8 rounded-full bg-white/20 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </div>
        </button>
      </div>

      {showCreateMatch && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start justify-between border-b border-slate-100 p-6 dark:border-slate-800">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Match setup</p>
                <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Create Match</h2>
                <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">Open a booked court for other players to join.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateMatch(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Sport</span>
                <select className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-800 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                  <option>Pickleball</option>
                  <option>Tennis</option>
                  <option>Badminton</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Skill Level</span>
                <select className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-800 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                  <option>Beginner friendly</option>
                  <option>Intermediate+</option>
                  <option>Advanced</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Court and time</span>
                <input className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-800 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" placeholder="PlayCourt Son Tra, today 18:00" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Players needed</span>
                <input type="number" min="1" max="8" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-800 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" defaultValue="2" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Cost per person</span>
                <input className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-800 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" defaultValue="80000" />
              </label>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 p-6 sm:flex-row sm:justify-end dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowCreateMatch(false)}
                className="h-12 rounded-xl border border-slate-200 px-5 text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowCreateMatch(false)}
                className="h-12 rounded-xl bg-primary px-5 text-sm font-black text-white shadow-lg shadow-primary/20 hover:brightness-110 transition-all cursor-pointer"
              >
                Publish Match
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
