import { useEffect, useState } from 'react';
import { getOwnerBookings } from '../../services/mock/platformService';
import { formatCurrency } from '../../utils/format';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getOwnerBookings().then(setBookings);
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Operations</p>
          <h1 className="text-3xl font-black text-slate-900">Bookings</h1>
          <p className="text-sm font-bold text-slate-500 mt-2">
            Owner list, manual booking, hold slot, and cancel booking mock flows.
          </p>
        </div>
        <button type="button" className="h-12 rounded-2xl bg-primary px-6 text-sm font-black text-white shadow-lg shadow-primary/20 hover:brightness-110 transition-all cursor-pointer">
          Create manual booking
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Summary label="Today" value={bookings.length} icon="event_available" />
        <Summary label="Pending payment" value={bookings.filter((booking) => booking.status === 'PendingVerification').length} icon="payments" />
        <Summary label="Phone bookings" value={bookings.filter((booking) => booking.source === 'Phone booking').length} icon="call" />
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_1.2fr_1fr_1fr_150px] gap-4 px-6 py-4 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>ID</span>
          <span>Customer</span>
          <span>Court</span>
          <span>Amount</span>
          <span className="text-right">Status</span>
        </div>
        <div className="divide-y divide-slate-100">
          {bookings.map((booking) => (
            <div key={booking.id} className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr_1fr_150px] gap-3 md:gap-4 px-6 py-5 items-center hover:bg-slate-50 transition-colors">
              <div>
                <p className="text-sm font-black text-slate-900">{booking.id}</p>
                <p className="text-xs font-bold text-slate-400 mt-1">{booking.source}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{booking.customer}</p>
                <p className="text-xs font-bold text-slate-400 mt-1">{booking.customerPhone}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">{booking.court}</p>
                <p className="text-xs font-bold text-slate-400 mt-1">{booking.time}</p>
              </div>
              <p className="text-sm font-black text-primary">{formatCurrency(booking.amount)}</p>
              <div className="md:text-right">
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Summary({ label, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="text-3xl font-black text-slate-900">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  );
}
