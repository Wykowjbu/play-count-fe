import { useEffect, useState } from 'react';
import { getBusinessCourts } from '../../services/mock/profileService';
import { formatCurrency } from '../../utils/format';

const statusClasses = {
  Available: 'bg-emerald-50 text-emerald-600',
  Booked: 'bg-blue-50 text-blue-600',
  Maintenance: 'bg-amber-50 text-amber-600',
};

export default function Courts() {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    getBusinessCourts().then(setCourts);
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Facility</p>
          <h1 className="text-3xl font-black text-slate-900">Manage Courts</h1>
          <p className="text-sm font-bold text-slate-500 mt-2">Control court status, price, and daily operations.</p>
        </div>
        <button className="h-12 px-6 rounded-2xl bg-primary text-white text-sm font-black hover:brightness-110 transition-all shadow-lg shadow-primary/20">
          Add Court
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard label="Total Courts" value={courts.length} icon="stadium" />
        <SummaryCard label="Available Now" value={courts.filter((court) => court.status === 'Available').length} icon="check_circle" />
        <SummaryCard label="Bookings Today" value={courts.reduce((sum, court) => sum + court.todayBookings, 0)} icon="event_available" />
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.1fr_1fr_1fr_1fr_140px] gap-4 px-6 py-4 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>Court</span>
          <span>Sport</span>
          <span>Bookings</span>
          <span>Occupancy</span>
          <span className="text-right">Status</span>
        </div>
        <div className="divide-y divide-slate-100">
          {courts.map((court) => (
            <div key={court.id} className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr_1fr_140px] gap-4 px-6 py-5 items-center hover:bg-slate-50 transition-colors">
              <div>
                <p className="text-sm font-black text-slate-900">{court.name}</p>
                <p className="text-xs font-bold text-slate-400 mt-1">{court.surface} • {formatCurrency(court.pricePerHour)}</p>
              </div>
              <p className="text-sm font-bold text-slate-700">{court.sport}</p>
              <p className="text-sm font-bold text-slate-700">{court.todayBookings} today</p>
              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${court.occupancyRate}%` }}></div>
                </div>
                <span className="text-xs font-black text-slate-500">{court.occupancyRate}%</span>
              </div>
              <div className="md:text-right">
                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusClasses[court.status]}`}>
                  {court.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, icon }) {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
      <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="text-3xl font-black text-slate-900">{value}</p>
      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">{label}</p>
    </div>
  );
}
