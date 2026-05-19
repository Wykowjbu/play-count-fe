import { useState, useEffect } from 'react';
import * as venueService from '../../services/mock/venueService';
import { formatCurrency } from '../../utils/format';

export default function Revenue() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const revenue = await venueService.getRevenueData();
        setData(revenue);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) return null;

  const { stats, trends, breakdown, recentSources } = data;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          trend="+12.5%"
          isPositive={true}
          icon="payments"
          color="primary"
        />
        <StatCard
          label="Avg. Daily Income"
          value={formatCurrency(stats.avgDailyIncome)}
          trend="+4.2%"
          isPositive={true}
          icon="trending_up"
          color="blue"
        />
        <StatCard
          label="Total Bookings"
          value={stats.totalBookings.toString()}
          trend="-2.1%"
          isPositive={false}
          icon="event_available"
          color="amber"
        />
        <StatCard
          label="Occupancy Rate"
          value={`${stats.occupancyRate}%`}
          trend="+5.3%"
          isPositive={true}
          icon="speed"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Trends Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-900">Revenue Trends</h3>
              <p className="text-sm text-slate-500 font-medium">Daily income for the last 7 days</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-64 w-full relative group">
            <svg viewBox="0 0 700 200" className="w-full h-full">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="0" x2="700" y2="0" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="50" x2="700" y2="50" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="100" x2="700" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="150" x2="700" y2="150" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="200" x2="700" y2="200" stroke="#f1f5f9" strokeWidth="1" />
              
              {/* Area */}
              <path
                d="M0,200 L0,150 L100,120 L200,130 L300,90 L400,60 L500,20 L600,40 L700,200 Z"
                fill="url(#chartGradient)"
              />
              {/* Line */}
              <path
                d="M0,150 L100,120 L200,130 L300,90 L400,60 L500,20 L600,40"
                fill="none"
                stroke="#22c55e"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_4px_8px_rgba(34,197,94,0.3)]"
              />
              {/* Data Points */}
              {[150, 120, 130, 90, 60, 20, 40].map((y, i) => (
                <circle
                  key={i}
                  cx={i * 100}
                  cy={y}
                  r="6"
                  fill="white"
                  stroke="#22c55e"
                  strokeWidth="3"
                  className="cursor-pointer hover:r-8 transition-all"
                />
              ))}
            </svg>
            <div className="flex justify-between mt-4 px-2">
              {trends.map(t => (
                <span key={t.day} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Breakdown by Sport Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-black text-slate-900 mb-2">Breakdown by Sport</h3>
          <p className="text-sm text-slate-500 font-medium mb-8">Revenue distribution</p>
          
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="relative size-48">
              <svg viewBox="0 0 36 36" className="size-full -rotate-90">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3"></circle>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="45 55" strokeDashoffset="0"></circle>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="-45"></circle>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="-75"></circle>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="10 90" strokeDashoffset="-90"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-900">100%</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</span>
              </div>
            </div>

            <div className="mt-8 w-full grid grid-cols-2 gap-4">
              {breakdown.map(item => (
                <div key={item.sport} className="flex items-center gap-2">
                  <div className="size-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs font-bold text-slate-600">{item.sport}</span>
                  <span className="text-xs font-black text-slate-900 ml-auto">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Revenue Sources Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900">Recent Revenue Sources</h3>
          <button className="text-primary text-xs font-black hover:underline uppercase tracking-wider">Download Report</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Source</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sport</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentSources.map((source) => (
                <tr key={source.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-600">{source.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-900">{source.source}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${
                      source.sport === 'Pickleball' ? 'bg-primary/10 text-primary' :
                      source.sport === 'Tennis' ? 'bg-blue-100 text-blue-600' :
                      source.sport === 'Badminton' ? 'bg-amber-100 text-amber-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {source.sport}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-black text-slate-900">{formatCurrency(source.amount)}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600">
                      <span className="size-1.5 rounded-full bg-emerald-600"></span>
                      {source.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, isPositive, icon, color }) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`${colorClasses[color]} p-3 rounded-2xl`}>
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${
          isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        }`}>
          <span className="material-symbols-outlined text-xs">
            {isPositive ? "trending_up" : "trending_down"}
          </span>
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-500 mb-1">{label}</p>
        <h3 className="text-2xl font-black text-slate-900">{value}</h3>
      </div>
    </div>
  );
}
