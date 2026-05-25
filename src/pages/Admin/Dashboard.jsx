import { useEffect, useState } from 'react';
import { getAdminDashboard } from '../../services/mock/platformService';
import { formatCurrency } from '../../utils/format';

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAdminDashboard().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  const cards = [
    { label: 'Users', value: data.stats.users.toLocaleString('vi-VN'), icon: 'group' },
    { label: 'Active owners', value: data.stats.activeOwners, icon: 'storefront' },
    { label: 'Pending KYC', value: data.stats.pendingKyc, icon: 'pending_actions' },
    { label: 'Monthly GMV', value: formatCurrency(data.stats.monthlyGmv), icon: 'payments' },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      <div>
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Platform dashboard</p>
        <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">Mock platform stats endpoint for admin overview.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined">{card.icon}</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{card.value}</p>
            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <Panel title="Pending owner KYC" rows={data.pendingOwners} primaryKey="business" secondaryKey="owner" />
        <Panel title="Moderation queue" rows={data.reviews} primaryKey="venue" secondaryKey="reason" />
      </div>
    </div>
  );
}

function Panel({ title, rows, primaryKey, secondaryKey }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black text-slate-900">{title}</h2>
      <div className="mt-5 divide-y divide-slate-100">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="text-sm font-black text-slate-900">{row[primaryKey]}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{row[secondaryKey]}</p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-600">
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
