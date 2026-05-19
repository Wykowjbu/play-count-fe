export default function Settings() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Configuration</p>
        <h1 className="text-3xl font-black text-slate-900">Settings</h1>
        <p className="text-sm font-bold text-slate-500 mt-2">Mock owner settings for preview completeness.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-6">
        {[
          ['Facility Name', 'PlayCourt Biz Demo'],
          ['Default Currency', 'VND'],
          ['Booking Window', '14 days'],
        ].map(([label, value]) => (
          <label key={label} className="block">
            <span className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{label}</span>
            <input
              className="w-full h-13 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-800 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              defaultValue={value}
            />
          </label>
        ))}
        <button className="h-12 px-6 rounded-2xl bg-primary text-white text-sm font-black hover:brightness-110 transition-all">
          Save Settings
        </button>
      </div>
    </div>
  );
}
