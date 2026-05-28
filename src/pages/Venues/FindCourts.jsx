import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MockModal from '../../components/MockModal';
import * as venueService from '../../services/mock/venueService';
import { formatCurrency } from '../../utils/format';

export default function FindCourts() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState(25);
  const [surface, setSurface] = useState('Hard Court');
  const [page, setPage] = useState(1);
  const [activeAction, setActiveAction] = useState(null);
  const [searchParams, setSearchParams] = useState({
    sport: 'Pickleball',
    district: 'Son Tra District',
    time: 'Today, 6:00 PM'
  });

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await venueService.getAllVenues();
        setVenues(data);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <div className="border-b border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Search Panel</p>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">Find courts and open match slots</h1>
              <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">
                Book a court, then create a match so other players can join your session.
              </p>
            </div>
            <Link
              to="/matches"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-black text-white hover:bg-primary transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
              Create Match
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr_auto] gap-3">
              <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                <span className="material-symbols-outlined text-primary text-xl">sports_tennis</span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sport</span>
                <select 
                  name="sport"
                  value={searchParams.sport}
                  onChange={handleSearchChange}
                    className="mt-1 w-full bg-transparent p-0 text-sm font-black text-slate-800 outline-none dark:text-slate-200"
                >
                  <option>Pickleball</option>
                  <option>Tennis</option>
                  <option>Badminton</option>
                </select>
                </span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">District</span>
                <select 
                  name="district"
                  value={searchParams.district}
                  onChange={handleSearchChange}
                    className="mt-1 w-full bg-transparent p-0 text-sm font-black text-slate-800 outline-none dark:text-slate-200"
                >
                  <option>Son Tra District</option>
                  <option>Hai Chau District</option>
                  <option>Ngu Hanh Son</option>
                  <option>Thanh Khe</option>
                  <option>Cam Le</option>
                </select>
                </span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time</span>
                <input 
                  type="text" 
                  name="time"
                  value={searchParams.time}
                  onChange={handleSearchChange}
                    className="mt-1 w-full bg-transparent p-0 text-sm font-black text-slate-800 outline-none dark:text-slate-200"
                />
                </span>
              </label>
              <button
                type="button"
                onClick={() => setActiveAction('search')}
                className="inline-flex h-full min-h-14 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-black text-white shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
              <span className="material-symbols-outlined">search</span>
              <span>Update Results</span>
            </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:hidden">
          <button
            type="button"
            aria-controls="court-filter-panel"
            aria-expanded={showFilters}
            onClick={() => setShowFilters(!showFilters)}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm transition-colors hover:border-primary cursor-pointer"
          >
            <span>
              <span className="block text-[10px] font-black uppercase tracking-widest text-primary">Quick Filters</span>
              <span className="mt-1 block text-sm font-black text-slate-900">Price, amenities, surface</span>
            </span>
            <span className="material-symbols-outlined text-slate-500">{showFilters ? 'expand_less' : 'tune'}</span>
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside
          id="court-filter-panel"
          className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-72 flex-shrink-0`}
        >
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Quick Filters</p>
                <p className="mt-1 text-sm font-black text-slate-900 dark:text-white">Refine results</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">tune</span>
            </div>
            <div className="flex flex-col gap-7">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-5">Price Range</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-sm font-bold text-slate-600 dark:text-slate-400">
                    <span>50K</span>
                    <span>500K+</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="50" 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 dark:text-slate-300">50K</div>
                    <div className="h-px w-3 bg-slate-300"></div>
                    <div className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 dark:text-slate-300">{priceRange * 10000 / 1000}K</div>
                  </div>
                </div>
              </div>
            
              <hr className="border-slate-200 dark:border-slate-800"/>
            
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-5">Amenities</h3>
                <div className="flex flex-col gap-4">
                  {['Night Lighting', 'Water & Cafe', 'Indoor Facility', 'Equipment Rental'].map((amenity) => (
                    <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="checkbox" className="peer appearance-none size-6 border-2 border-slate-300 dark:border-slate-600 rounded-lg checked:bg-primary checked:border-primary transition-all" />
                        <span className="material-symbols-outlined absolute text-white text-base left-1 opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            
              <hr className="border-slate-200 dark:border-slate-800"/>
            
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-5">Surface Type</h3>
                <div className="flex flex-wrap gap-2">
                  {['Hard Court', 'Clay', 'Grass'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSurface(item)}
                      className={`px-4 py-2 text-xs font-black rounded-full transition-all cursor-pointer ${
                        surface === item
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="lg:hidden inline-flex h-12 items-center justify-center rounded-xl bg-slate-900 text-sm font-black text-white hover:bg-primary transition-colors cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">{venues.length} Courts available</h1>
              <p className="text-sm text-slate-500 font-medium mt-1">Found in {searchParams.district} for {searchParams.sport}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-400">Sort by:</span>
              <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold rounded-xl focus:ring-primary focus:border-primary px-4 py-2.5 outline-none">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Distance: Nearest</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <div key={venue.id} className="group rounded-3xl bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700">
                  <div className="relative h-56 w-full bg-center bg-cover overflow-hidden" style={{ backgroundImage: `url("${venue.imageUrl}")` }}>
                    {venue.badgeText && (
                      <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase shadow-lg">
                        {venue.badgeText}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveAction(`favorite:${venue.name}`)}
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-white hover:text-rose-500 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xl">favorite</span>
                    </button>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="bg-slate-900/60 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-md uppercase">Indoor</span>
                      <span className="bg-slate-900/60 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-md uppercase">Lights</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight">
                        <Link to={`/venues/${venue.id}`} className="hover:text-primary transition-colors">
                          {venue.name}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-black px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                        <span className="material-symbols-outlined text-sm">star</span>
                        {venue.rating}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mb-4 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">near_me</span> {venue.distance} • {venue.district}
                    </p>
                    <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-700">
                      <div>
                        <span className="text-xl font-black text-primary">{formatCurrency(venue.pricePerHour)}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">/ hour</span>
                      </div>
                      <Link 
                        to={`/venues/${venue.id}`}
                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-xl text-xs font-black hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-md active:scale-[0.98]"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && venues.length > 0 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-30 cursor-pointer"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {[1, 2, 3].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPage(item)}
                  className={`size-10 rounded-xl font-black text-sm transition-all cursor-pointer ${
                    page === item ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item}
                </button>
              ))}
              <span className="px-2 text-slate-400">...</span>
              <button type="button" onClick={() => setPage(8)} className="size-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-sm transition-all cursor-pointer">8</button>
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(8, current + 1))}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Floating View Map Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button
          type="button"
          onClick={() => setActiveAction('map')}
          className="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group border border-white/10 dark:border-black/10 cursor-pointer"
        >
          <span className="material-symbols-outlined group-hover:animate-bounce">map</span>
          <span className="font-black text-sm tracking-wide">Show Map View</span>
        </button>
      </div>

      <MockModal
        open={Boolean(activeAction)}
        eyebrow="Court search"
        title={activeAction === 'map' ? 'Map View Preview' : activeAction?.startsWith('favorite:') ? 'Save Favorite Venue' : 'Update Search Results'}
        description="Mock action for court discovery controls."
        confirmLabel="Got it"
        onClose={() => setActiveAction(null)}
        onConfirm={() => setActiveAction(null)}
      >
        <div className="rounded-2xl bg-slate-50 p-5 text-sm font-bold leading-6 text-slate-600">
          {activeAction === 'map'
            ? `Showing ${venues.length} venue pins near ${searchParams.district}.`
            : activeAction?.startsWith('favorite:')
              ? `${activeAction.split(':')[1]} will be added to favorites.`
              : `Searching ${searchParams.sport} in ${searchParams.district}, ${surface}, max ${priceRange * 10000} VND.`}
        </div>
      </MockModal>
    </div>
  );
}
