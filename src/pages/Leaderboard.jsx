const players = [
  { rank: 1, name: 'Minh Tran', sport: 'Pickleball', rating: 1840, wins: 42, trend: '+8' },
  { rank: 2, name: 'An Nguyen', sport: 'Tennis', rating: 1765, wins: 38, trend: '+4' },
  { rank: 3, name: 'Linh Pham', sport: 'Badminton', rating: 1690, wins: 35, trend: '+6' },
  { rank: 4, name: 'Huy Le', sport: 'Pickleball', rating: 1615, wins: 31, trend: '-2' },
  { rank: 5, name: 'Bao Hoang', sport: 'Tennis', rating: 1540, wins: 27, trend: '+3' },
];

export default function Leaderboard() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10 pb-24">
      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Community</p>
          <h1 className="text-4xl font-black text-slate-900">Leaderboard</h1>
          <p className="text-base font-bold text-slate-500 mt-3 max-w-2xl">
            Demo ranking for active players across racket sports. Data is mocked for preview.
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {['All Sports', 'Pickleball', 'Tennis', 'Badminton'].map((item, index) => (
            <button
              key={item}
              className={`h-11 px-5 rounded-full text-sm font-black whitespace-nowrap transition-colors ${
                index === 0 ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-[80px_1.5fr_1fr_1fr_120px] gap-4 px-6 py-4 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Rank</span>
            <span>Player</span>
            <span>Sport</span>
            <span>Wins</span>
            <span className="text-right">Rating</span>
          </div>
          <div className="divide-y divide-slate-100">
            {players.map((player) => (
              <div key={player.rank} className="grid grid-cols-1 md:grid-cols-[80px_1.5fr_1fr_1fr_120px] gap-4 px-6 py-5 items-center hover:bg-slate-50 transition-colors">
                <div className="size-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-sm font-black">
                  #{player.rank}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{player.name}</p>
                  <p className="text-xs font-bold text-slate-400 mt-1">Da Nang Player</p>
                </div>
                <p className="text-sm font-bold text-slate-700">{player.sport}</p>
                <p className="text-sm font-bold text-slate-700">{player.wins} wins</p>
                <div className="md:text-right">
                  <p className="text-lg font-black text-slate-900">{player.rating}</p>
                  <p className={`text-xs font-black ${player.trend.startsWith('+') ? 'text-primary' : 'text-rose-500'}`}>{player.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="bg-slate-900 text-white rounded-3xl p-8 h-fit">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Season Progress</p>
          <h2 className="text-2xl font-black mb-4">May Challenge</h2>
          <p className="text-sm font-bold text-slate-300 leading-relaxed mb-6">
            Win matches, join verified bookings, and climb the leaderboard during the preview season.
          </p>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[68%] bg-primary rounded-full"></div>
          </div>
          <p className="text-xs font-black text-slate-400 mt-3">68% season activity reached</p>
        </aside>
      </section>
    </main>
  );
}
