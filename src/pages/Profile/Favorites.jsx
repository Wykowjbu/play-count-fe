import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavoriteVenues } from '../../services/mock/platformService';
import { formatCurrency } from '../../utils/format';

export default function Favorites() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    getFavoriteVenues().then(setVenues);
  }, []);

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Saved courts</p>
        <h1 className="text-3xl font-black text-slate-900">Favorites & Suggestions</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">
          Mock screens for favorite venues and personalized court suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {venues.map((venue) => (
          <div key={venue.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">favorite</span>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-600">
                {venue.rating} rating
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900">{venue.name}</h2>
            <p className="mt-2 text-sm font-bold text-slate-500">{venue.district} • {venue.sport}</p>
            <p className="mt-4 text-sm font-black text-primary">{formatCurrency(venue.pricePerHour)} / hour</p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs font-bold leading-5 text-slate-500">
              Suggested because: {venue.reason}
            </div>
            <div className="mt-6 flex gap-3">
              <Link to={`/venues/${venue.id}`} className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-black text-white transition-colors hover:bg-primary">
                View venue
              </Link>
              <button type="button" className="rounded-xl border border-rose-200 px-4 py-3 text-sm font-black text-rose-600 transition-colors hover:bg-rose-50 cursor-pointer">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
