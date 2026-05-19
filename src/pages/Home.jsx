import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecommendedVenues, getLiveMatches } from '../services/mock/venueService';
import { formatCurrency } from '../utils/format';

export default function Home() {
  const [recommendedVenues, setRecommendedVenues] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for search form and active session
  const searchForm = {
    location: "Da Nang",
    dateTime: "Tomorrow, 17:00",
    popularFilters: ["Pickleball", "Tennis", "Badminton", "Padel"]
  };

  const activeSession = {
    isActive: true,
    gameType: "Tennis Mixed",
    venueName: "My Khe Arena"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [venues, matches] = await Promise.all([
          getRecommendedVenues(),
          getLiveMatches()
        ]);
        setRecommendedVenues(venues);
        setLiveMatches(matches);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="max-w-[1280px] mx-auto pb-24">
      {/* Hero Section */}
      <section className="px-6 py-12">
        <div className="flex flex-col gap-10 lg:flex-row items-center">
          <div className="flex flex-col gap-8 lg:w-3/5">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full w-fit">
                <span className="material-symbols-outlined text-sm font-bold">local_fire_department</span>
                <span className="text-xs font-black uppercase tracking-widest">Live in Da Nang</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                The ultimate <span className="text-primary underline decoration-primary/30 underline-offset-8">Racket Hub</span> for Da Nang players.
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                Discover top Pickleball, Tennis, and Badminton courts. Book instantly and connect with the local community in one seamless platform.
              </p>
            </div>

            {/* Search Form */}
            <div className="flex flex-col gap-2 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-transparent focus-within:border-primary/50 transition-all">
                  <span className="material-symbols-outlined text-primary">sports_tennis</span>
                  <select className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full text-slate-800 dark:text-slate-200">
                    <option>Pickleball</option>
                    <option>Tennis</option>
                    <option>Badminton</option>
                    <option>Padel</option>
                  </select>
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-transparent focus-within:border-primary/50 transition-all">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <input className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full text-slate-800 dark:text-slate-200" placeholder="Where in Da Nang?" type="text" defaultValue={searchForm.location} />
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-transparent focus-within:border-primary/50 transition-all">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <input className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full text-slate-800 dark:text-slate-200" placeholder="Date & Time" type="text" defaultValue={searchForm.dateTime} />
                </div>
                <button className="bg-primary text-white font-black py-4 px-8 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined">search</span>
                  <span>Find Court</span>
                </button>
              </div>
            </div>

            {/* Popular Filters */}
            <div className="flex gap-3 flex-wrap">
              <span className="text-sm font-bold text-slate-400 px-2 py-2">Popular:</span>
              {searchForm.popularFilters.map((filter, index) => (
                <div key={index} className="flex h-10 items-center gap-x-2 rounded-full bg-slate-100 dark:bg-slate-800 px-5 cursor-pointer hover:bg-primary/10 hover:text-primary transition-all text-sm font-bold">
                  {filter}
                </div>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full lg:w-2/5">
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(34,197,94,0.2)] group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
              <div className="absolute bottom-10 left-10 z-20 text-white max-w-[80%]">
                <div className="bg-primary px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3 inline-block">Top Choice</div>
                <h3 className="text-3xl font-black leading-tight mb-2">My Khe Pickleball Arena</h3>
                <p className="text-base font-medium opacity-90 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">location_on</span> Vo Nguyen Giap, Da Nang
                </p>
              </div>
              <div className="w-full h-full bg-center bg-cover transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgQwmRDjIOVAtH52rQtI13iXatljPogfCBinWsE0E5nnLeV5r9otI9FpFDJsgBPdh2ETPyCuOudY6Pk0_aIluYwieV-R7C-y8FpGbg8YXPITjyump-rA6dgbVYdlGK08jQfgtUBbCL84rzSOczzVTI17nrIuuqGsKVV8CT6cx6kK1TsItwgDy1r-KnzozU_WnFXphFI52YYUme05hoOYilNCjEfBgMnDIES5ZJGotjBiW5tu4xH2BbsX0bmKKc19kb_ySjtID171aK")' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Venues */}
      <section className="px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-xl">psychology</span>
              <span className="text-sm font-black uppercase tracking-widest">AI Suggested</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Recommended for You</h2>
            <p className="text-base text-slate-500 font-medium">Top rated venues matching your playing style</p>
          </div>
          <Link className="text-primary text-sm font-black flex items-center gap-1 hover:gap-2 transition-all" to="/find-courts">
            See All Venues <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedVenues.map((venue) => (
            <div key={venue.id} className="group rounded-3xl bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700">
              <div className="relative h-64 w-full bg-center bg-cover overflow-hidden" style={{ backgroundImage: `url("${venue.imageUrl}")` }}>
                {venue.badgeText && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase shadow-lg">{venue.badgeText}</div>
                )}
                <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-white hover:text-rose-500 transition-all">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-xl text-slate-900 dark:text-white">{venue.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-black px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                    <span className="material-symbols-outlined text-sm">star</span>
                    {venue.rating.toFixed(1)}
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-medium mb-6 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">near_me</span> {venue.distance} • {venue.district}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                  <div>
                    <span className="text-2xl font-black text-primary">{formatCurrency(venue.pricePerHour)}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">/ hour</span>
                  </div>
                  <Link
                    to={`/venues/${venue.id}`}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-sm font-black hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Matchmaking */}
      <section className="px-6 py-12 bg-slate-100 dark:bg-slate-900/50 rounded-[3rem] mx-6 shadow-inner">
        <div className="flex items-center justify-between mb-10 px-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Live Matchmaking</h2>
            <p className="text-base text-slate-500 font-medium">Join local players and level up your game</p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all shadow-sm">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all shadow-sm">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {liveMatches.map((match) => {
            const cardClasses = match.isHighlighted
              ? "bg-primary/5 dark:bg-primary/10 border-2 border-primary/30 relative overflow-hidden group"
              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700";

            const iconBgClass = match.iconColor === "amber" ? "bg-amber-100 text-amber-600"
              : match.iconColor === "blue" ? "bg-blue-100 text-blue-600"
              : "bg-primary/10 text-primary";

            const badgeBgClass = match.isHighlighted
              ? "bg-white dark:bg-slate-800 border border-primary/20 shadow-sm"
              : "bg-slate-100 dark:bg-slate-700";

            const buttonClasses = match.isHighlighted
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-primary dark:hover:bg-primary dark:hover:text-white shadow-xl"
              : "bg-primary text-white hover:brightness-110 shadow-md shadow-primary/20";

            return (
              <div key={match.id} className={`${cardClasses} p-6 rounded-2xl shadow-sm flex flex-col gap-5 hover:shadow-lg transition-all`}>
                {match.isHighlighted && (
                  <div className="absolute top-0 right-0 p-3">
                    <span className="material-symbols-outlined text-primary/20 text-6xl rotate-12 group-hover:rotate-0 transition-transform">workspace_premium</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className={`${iconBgClass} p-2 rounded-xl`}>
                    <span className="material-symbols-outlined font-bold">
                      {match.sport === "Tennis" ? "sports_tennis" : match.sport === "Badminton" ? "sports_handball" : match.sport === "Mixed" ? "groups" : "sports_tennis"}
                    </span>
                  </div>
                  <span className={`text-[10px] font-black text-slate-500 uppercase ${badgeBgClass} px-3 py-1 rounded-full`}>{match.skillLevel}</span>
                </div>
                <div>
                  <h4 className="font-black text-lg text-slate-900 dark:text-white">{match.gameType}</h4>
                  <p className="text-sm font-bold text-slate-400 flex items-center gap-2 mt-1">
                    <span className="material-symbols-outlined text-sm">schedule</span> {match.scheduleTime}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {match.players.map((player) => (
                      <div key={player.id} className="size-10 rounded-full border-2 border-white dark:border-slate-800 bg-cover bg-center shadow-sm" style={{ backgroundImage: `url("${player.avatarUrl}")` }}></div>
                    ))}
                    {match.spotsLeft > 0 && !match.isHighlighted && (
                      <div className="size-10 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs font-black text-primary">?</div>
                    )}
                    {match.isHighlighted && match.spotsLeft > 0 && (
                      <div className="size-10 rounded-full border-2 border-primary bg-primary flex items-center justify-center text-xs font-black text-white">{match.spotsLeft}</div>
                    )}
                  </div>
                  <span className={`text-[10px] font-black ${match.isHighlighted ? "text-primary" : match.spotsLeft > 0 ? "text-primary" : "text-slate-400"} uppercase`}>
                    {match.spotsLeft === 1 ? "1 Spot Left" : match.spotsLeft > 1 ? `${match.spotsLeft} Spots Open` : "Full"}
                  </span>
                </div>
                <button className={`w-full ${buttonClasses} text-sm font-black py-3 rounded-xl transition-all`}>
                  {match.spotsLeft === 1 ? "Claim Last Spot" : match.sport === "Tennis" ? "Accept Invite" : "Join Game"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Active Session Float Button */}
      {activeSession && activeSession.isActive && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40">
          <button className="flex items-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all border border-white/10 backdrop-blur-lg group">
            <span className="material-symbols-outlined text-primary group-hover:animate-pulse">bolt</span>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 leading-none mb-1">Active Session</p>
              <p className="text-sm font-black leading-tight">{activeSession.gameType} @ {activeSession.venueName}</p>
            </div>
            <div className="ml-4 size-8 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </div>
          </button>
        </div>
      )}
    </main>
  );
}
