import { useEffect, useState } from 'react';
import { getAdminUsers } from '../../services/mock/platformService';

const statusClasses = {
  Active: 'bg-emerald-50 text-emerald-600',
  Banned: 'bg-rose-50 text-rose-600',
  'KYC Pending': 'bg-amber-50 text-amber-600',
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAdminUsers().then(setUsers);
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">User management</p>
          <h1 className="text-3xl font-black text-slate-900">Users</h1>
          <p className="mt-2 text-sm font-bold text-slate-500">List users, filter by role/status, ban and unban mock endpoints.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold outline-none focus:border-primary" placeholder="Search users" />
          <select className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold outline-none focus:border-primary">
            <option>All roles</option>
            <option>Player</option>
            <option>Owner</option>
            <option>Admin</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[1.1fr_1fr_1fr_1fr_180px] gap-4 bg-slate-50 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 md:grid">
          <span>User</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>
        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <div key={user.id} className="grid gap-4 px-6 py-5 md:grid-cols-[1.1fr_1fr_1fr_1fr_180px] md:items-center">
              <div>
                <p className="text-sm font-black text-slate-900">{user.name}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">Joined {user.joined}</p>
              </div>
              <p className="text-sm font-bold text-slate-600">{user.email}</p>
              <p className="text-sm font-black text-slate-900">{user.role}</p>
              <span className={`w-fit rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${statusClasses[user.status]}`}>
                {user.status}
              </span>
              <div className="flex gap-2 md:justify-end">
                <button type="button" className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 cursor-pointer">
                  Ban
                </button>
                <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 cursor-pointer">
                  Unban
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
