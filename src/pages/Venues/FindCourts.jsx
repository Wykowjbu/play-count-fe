import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as venueService from '../../services/mock/venueService';

export default function FindCourts() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(25);
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
      {/* Sticky Sub-Header Search */}
      <div className="sticky top-16 z-40 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-primary text-lg">sports_tennis</span>
                <select 
                  name="sport"
                  value={searchParams.sport}
                  onChange={handleSearchChange}
                  className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full text-slate-800 dark:text-slate-200 p-0 outline-none"
                >
                  <option>Pickleball</option>
                  <option>Tennis</option>
                  <option>Badminton</option>
                </select>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                <select 
                  name="district"
                  value={searchParams.district}
                  onChange={handleSearchChange}
                  className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full text-slate-800 dark:text-slate-200 p-0 outline-none"
                >
                  <option>Son Tra District</option>
                  <option>Hai Chau District</option>
                  <option>Ngu Hanh Son</option>
                  <option>Thanh Khe</option>
                  <option>Cam Le</option>
                </select>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
                <input 
                  type="text" 
                  name="time"
                  value={searchParams.time}
                  onChange={handleSearchChange}
                  className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full text-slate-800 dark:text-slate-200 p-0 outline-none"
                />
              </div>
            </div>
            <button className="bg-primary text-white font-black px-8 py-3 rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/30 min-w-[160px]">
              <span className="material-symbols-outlined">search</span>
              <span>Update Results</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-44 flex flex-col gap-8">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-5">Price Range</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm font-bold text-slate-600 dark:text-slate-400">
                  <span>$5</span>
                  <span>$50+</span>
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
                  <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 dark:text-slate-300">$5</div>
                  <div className="h-px w-3 bg-slate-300"></div>
                  <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 dark:text-slate-300">${priceRange}</div>
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
                <button className="px-4 py-2 bg-primary text-white text-xs font-black rounded-full transition-all">Hard Court</button>
                <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-black rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Clay</button>
                <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-black rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">Grass</button>
              </div>
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
                    <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-white hover:text-rose-500 transition-all">
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
                        <span className="text-xl font-black text-primary">${venue.pricePerHour}</span>
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
              <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-30">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="size-10 rounded-xl bg-primary text-white font-black text-sm">1</button>
              <button className="size-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-sm transition-all">2</button>
              <button className="size-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-sm transition-all">3</button>
              <span className="px-2 text-slate-400">...</span>
              <button className="size-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-sm transition-all">8</button>
              <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Floating View Map Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button className="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group border border-white/10 dark:border-black/10">
          <span className="material-symbols-outlined group-hover:animate-bounce">map</span>
          <span className="font-black text-sm tracking-wide">Show Map View</span>
        </button>
      </div>
    </div>
  );
}
