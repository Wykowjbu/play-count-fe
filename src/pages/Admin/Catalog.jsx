import { useEffect, useState } from 'react';
import { getCatalog } from '../../services/mock/platformService';

export default function AdminCatalog() {
  const [catalog, setCatalog] = useState({ sports: [], amenities: [] });

  useEffect(() => {
    getCatalog().then(setCatalog);
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Platform catalog</p>
          <h1 className="text-3xl font-black text-slate-900">Sports & Amenities</h1>
          <p className="mt-2 text-sm font-bold text-slate-500">Admin CRUD mock screens for sports and venue amenities.</p>
        </div>
        <button type="button" className="h-12 rounded-2xl bg-primary px-6 text-sm font-black text-white shadow-lg shadow-primary/20 hover:brightness-110 cursor-pointer">
          Create item
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <CatalogPanel title="Sports" rows={catalog.sports} descriptionKey="description" />
        <CatalogPanel title="Amenities" rows={catalog.amenities} />
      </div>
    </div>
  );
}

function CatalogPanel({ title, rows, descriptionKey }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-6">
        <h2 className="text-xl font-black text-slate-900">{title}</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map((row) => (
          <div key={row.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">{row.iconUrl}</span>
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">{row.name}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">{descriptionKey ? row[descriptionKey] : row.status}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 cursor-pointer">
                Edit
              </button>
              <button type="button" className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
