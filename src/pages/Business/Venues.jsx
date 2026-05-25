import { useEffect, useState } from 'react';
import { getOwnerVenues } from '../../services/mock/platformService';
import { formatCurrency } from '../../utils/format';

const statusClasses = {
  Published: 'bg-emerald-50 text-emerald-600',
  Review: 'bg-amber-50 text-amber-600',
  Available: 'bg-emerald-50 text-emerald-600',
  Booked: 'bg-blue-50 text-blue-600',
  Maintenance: 'bg-amber-50 text-amber-600',
};

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getOwnerVenues().then((items) => {
      setVenues(items);
      setSelectedId(items[0]?.id);
    });
  }, []);

  const selectedVenue = venues.find((venue) => venue.id === selectedId) || venues[0];

  if (!selectedVenue) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Owner facility</p>
          <h1 className="text-3xl font-black text-slate-900">Venues & Operations</h1>
          <p className="mt-2 text-sm font-bold text-slate-500">
            Mock surface for venue CRUD, image upload, opening hours, courts, pricing rules, and maintenance schedules.
          </p>
        </div>
        <button type="button" className="h-12 rounded-2xl bg-primary px-6 text-sm font-black text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 cursor-pointer">
          Create venue
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          {venues.map((venue) => (
            <button
              key={venue.id}
              type="button"
              onClick={() => setSelectedId(venue.id)}
              className={`w-full rounded-3xl border p-5 text-left transition-all cursor-pointer ${
                venue.id === selectedVenue.id
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-slate-200 bg-white hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">{venue.name}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">{venue.district}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${statusClasses[venue.status]}`}>
                  {venue.status}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-black text-slate-500">
                <span>{venue.courts.length} courts</span>
                <span>{venue.images} images</span>
              </div>
            </button>
          ))}
        </aside>

        <div className="space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{selectedVenue.name}</h2>
                <p className="mt-2 text-sm font-bold text-slate-500">{selectedVenue.address}</p>
                <p className="mt-1 text-sm font-bold text-slate-500">{selectedVenue.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <Metric label="Rating" value={selectedVenue.rating} />
                <Metric label="Images" value={selectedVenue.images} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <label className="block md:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Venue name</span>
                <input className="auth-field" defaultValue={selectedVenue.name} />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">District</span>
                <input className="auth-field" defaultValue={selectedVenue.district} />
              </label>
              <label className="block md:col-span-3">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Address</span>
                <input className="auth-field" defaultValue={selectedVenue.address} />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedVenue.amenities.map((amenity) => (
                <span key={amenity} className="rounded-full bg-primary/10 px-4 py-2 text-xs font-black text-primary">
                  {amenity}
                </span>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-900">Opening hours</h2>
              <div className="mt-5 space-y-3">
                {selectedVenue.openingHours.map((item) => (
                  <div key={item.day} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                    <span className="text-sm font-black text-slate-900">{item.day}</span>
                    <span className="text-sm font-bold text-slate-500">{item.hours}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-5 h-11 rounded-xl border border-slate-200 px-4 text-sm font-black text-slate-700 transition-colors hover:border-primary hover:text-primary cursor-pointer">
                Set opening hours
              </button>
            </div>

            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                <span className="material-symbols-outlined">add_photo_alternate</span>
              </div>
              <h2 className="mt-4 text-xl font-black text-slate-900">Venue images</h2>
              <p className="mt-2 text-sm font-bold text-slate-500">Mock multipart upload supports up to 10 images, 5MB each.</p>
              <button type="button" className="mt-5 h-11 rounded-xl bg-slate-900 px-5 text-sm font-black text-white transition-colors hover:bg-primary cursor-pointer">
                Upload images
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Courts</h2>
                <p className="mt-1 text-sm font-bold text-slate-500">Create, update, delete courts and control base price/status.</p>
              </div>
              <button type="button" className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white cursor-pointer">
                Add court
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {selectedVenue.courts.map((court) => (
                <div key={court.id} className="grid gap-4 p-5 md:grid-cols-[1fr_1fr_1fr_140px] md:items-center">
                  <div>
                    <p className="text-sm font-black text-slate-900">{court.name}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">{court.type}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-700">{court.sport}</p>
                  <p className="text-sm font-black text-slate-900">{formatCurrency(court.basePrice)}</p>
                  <span className={`justify-self-start rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest md:justify-self-end ${statusClasses[court.status]}`}>
                    {court.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <RulesList title="Pricing rules" items={selectedVenue.pricingRules} emptyText="No pricing rules yet" />
            <RulesList title="Maintenance blocks" items={selectedVenue.blockedSlots} emptyText="No blocked slots" isMaintenance />
          </section>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-5 py-4">
      <p className="text-2xl font-black text-slate-900">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  );
}

function RulesList({ title, items, emptyText, isMaintenance = false }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900">{title}</h2>
        <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:border-primary hover:text-primary cursor-pointer">
          Add
        </button>
      </div>
      <div className="mt-5 space-y-3">
        {items.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-500">{emptyText}</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-black text-slate-900">{isMaintenance ? item.court : item.name}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">
                {isMaintenance ? `${item.time} • ${item.reason}` : `${item.days} • ${item.time} • ${formatCurrency(item.price)}`}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
