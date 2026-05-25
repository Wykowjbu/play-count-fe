import { useEffect, useState } from 'react';
import { getNotifications } from '../../services/mock/platformService';

const typeClasses = {
  Payment: 'bg-emerald-50 text-emerald-600',
  Matchmaking: 'bg-blue-50 text-blue-600',
  Booking: 'bg-amber-50 text-amber-600',
  Suggestion: 'bg-purple-50 text-purple-600',
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Player inbox</p>
          <h1 className="text-3xl font-black text-slate-900">Notifications</h1>
          <p className="mt-2 text-sm font-bold text-slate-500">List notifications and mark read mock endpoints.</p>
        </div>
        <button type="button" className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white transition-all hover:brightness-110 cursor-pointer">
          Mark all as read
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="divide-y divide-slate-100">
          {notifications.map((item) => (
            <div key={item.id} className="grid gap-4 p-5 transition-colors hover:bg-slate-50 md:grid-cols-[1fr_auto]">
              <div className="flex gap-4">
                <div className={`mt-1 size-3 rounded-full ${item.unread ? 'bg-primary' : 'bg-slate-200'}`}></div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-black text-slate-900">{item.title}</h2>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${typeClasses[item.type]}`}>
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-500">{item.body}</p>
                </div>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 md:text-right">{item.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
