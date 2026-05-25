import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMatchDetail } from '../services/mock/platformService';
import { formatCurrency } from '../utils/format';

const requestClasses = {
  Pending: 'bg-amber-50 text-amber-600',
  Approved: 'bg-emerald-50 text-emerald-600',
  Rejected: 'bg-rose-50 text-rose-600',
};

export default function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);

  useEffect(() => {
    getMatchDetail(id).then(setMatch);
  }, [id]);

  if (!match) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  const spotsLeft = match.maxPlayers - match.participants.length;

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <Link to="/matches" className="mb-5 inline-flex items-center gap-2 text-sm font-black text-primary hover:underline">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to matches
        </Link>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Matchmaking detail</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">{match.title}</h1>
            <p className="mt-3 text-base font-bold text-slate-500">{match.venueName} • {match.courtName} • {match.scheduleTime}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="h-12 rounded-xl bg-primary px-5 text-sm font-black text-white transition-all hover:brightness-110 cursor-pointer">
              Request to join
            </button>
            <button type="button" className="h-12 rounded-xl border border-rose-200 px-5 text-sm font-black text-rose-600 transition-colors hover:bg-rose-50 cursor-pointer">
              Cancel match
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Match summary</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Summary label="Sport" value={match.sport} icon="sports_tennis" />
              <Summary label="Skill" value={match.skillLevel} icon="leaderboard" />
              <Summary label="Cost" value={formatCurrency(match.pricePerPerson)} icon="payments" />
              <Summary label="Spots left" value={spotsLeft} icon="groups" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Host</h2>
            <div className="mt-5 flex items-center gap-4">
              <img src={match.host.avatarUrl} alt={match.host.name} className="size-16 rounded-2xl object-cover" />
              <div>
                <p className="text-lg font-black text-slate-900">{match.host.name}</p>
                <p className="mt-1 text-sm font-bold text-slate-500">{match.host.rating} player rating</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">Participants</h2>
              <button type="button" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-black text-slate-700 transition-colors hover:border-primary hover:text-primary cursor-pointer">
                Invite users
              </button>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {match.participants.map((player) => (
                <div key={player.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div>
                    <p className="text-sm font-black text-slate-900">{player.name}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">{player.role}</p>
                  </div>
                  <button type="button" className="text-xs font-black uppercase tracking-widest text-rose-500 hover:underline cursor-pointer">
                    Leave
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Join requests</h2>
            <div className="mt-5 space-y-4">
              {match.joinRequests.map((request) => (
                <div key={request.id} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-black text-slate-900">{request.name}</p>
                      <p className="mt-1 text-sm font-bold leading-6 text-slate-500">{request.message}</p>
                    </div>
                    <span className={`self-start rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${requestClasses[request.status]}`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button type="button" className="h-10 rounded-xl bg-primary px-4 text-xs font-black uppercase tracking-widest text-white cursor-pointer">
                      Approve
                    </button>
                    <button type="button" className="h-10 rounded-xl border border-slate-200 px-4 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 cursor-pointer">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Invitations</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {match.invitations.map((invite) => (
                <div key={invite.id} className="flex items-center justify-between py-4">
                  <p className="text-sm font-black text-slate-900">{invite.name}</p>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {invite.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Summary({ label, value, icon }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-black text-slate-900">{value}</p>
    </div>
  );
}
