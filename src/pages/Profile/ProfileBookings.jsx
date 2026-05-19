import { useEffect, useState } from 'react';
import { getPlayerBookings } from '../../services/mock/profileService';
import { formatCurrency } from '../../utils/format';

const statusClasses = {
  Confirmed: 'bg-emerald-50 text-emerald-600',
  Pending: 'bg-amber-50 text-amber-600',
  Completed: 'bg-slate-100 text-slate-500',
};

export default function ProfileBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getPlayerBookings().then(setBookings);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Player schedule</p>
            <h2 className="text-3xl font-black text-slate-900">My Bookings</h2>
            <p className="text-sm font-bold text-slate-500 mt-2">
              Manage court reservations from the same player experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-black text-slate-700 hover:border-primary hover:text-primary transition-colors cursor-pointer">
              Past bookings
            </button>
            <button className="h-11 px-5 rounded-xl bg-primary text-white text-sm font-black hover:brightness-110 transition-all cursor-pointer">
              New Booking
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.2fr_1fr_1fr_120px] gap-4 px-6 py-4 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>Venue</span>
          <span>Date & Time</span>
          <span>Court</span>
          <span className="text-right">Status</span>
        </div>
        <div className="divide-y divide-slate-100">
          {bookings.map((booking) => (
            <div key={booking.id} className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_120px] gap-4 px-6 py-5 items-center hover:bg-slate-50 transition-colors">
              <div>
                <p className="text-sm font-black text-slate-900">{booking.venueName}</p>
                <p className="text-xs font-bold text-primary mt-1">{booking.sport}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{new Date(booking.date).toLocaleDateString('en-GB')}</p>
                <p className="text-xs font-bold text-slate-400 mt-1">{booking.time}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{booking.courtName}</p>
                <p className="text-xs font-bold text-slate-400 mt-1">{formatCurrency(booking.price)}</p>
              </div>
              <div className="md:text-right">
                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusClasses[booking.status]}`}>
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
