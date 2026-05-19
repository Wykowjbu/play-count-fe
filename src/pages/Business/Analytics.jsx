export default function Analytics() {
  const metrics = [
    { label: 'Peak Hour', value: '18:00', icon: 'schedule' },
    { label: 'Top Sport', value: 'Pickleball', icon: 'sports_tennis' },
    { label: 'Repeat Rate', value: '64%', icon: 'repeat' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Insights</p>
        <h1 className="text-3xl font-black text-slate-900">Analytics</h1>
        <p className="text-sm font-bold text-slate-500 mt-2">Operational preview for court demand and customer behavior.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">{metric.icon}</span>
            </div>
            <p className="text-3xl font-black text-slate-900">{metric.value}</p>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
        <div className="flex items-end gap-4 h-64">
          {[42, 58, 46, 72, 88, 96, 76].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-3">
              <div className="w-full rounded-t-2xl bg-primary/80" style={{ height: `${value}%` }}></div>
              <span className="text-[10px] font-black text-slate-400 uppercase">D{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
