import { useEffect, useState } from 'react';
import { getCurrentPlayerProfile } from '../../services/mock/profileService';

export default function ProfileDetail() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getCurrentPlayerProfile().then(setProfile);
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    { label: 'Bookings', value: profile.stats.totalBookings, icon: 'event_available' },
    { label: 'Matches', value: profile.stats.matchesJoined, icon: 'groups' },
    { label: 'Favorites', value: profile.stats.favoriteVenues, icon: 'favorite' },
    { label: 'Rating', value: profile.stats.rating, icon: 'star' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="h-40 bg-gradient-to-r from-primary via-emerald-400 to-sky-500"></div>
        <div className="px-8 pb-8">
          <div className="-mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex items-end gap-5">
              <img
                src={profile.avatar}
                alt={profile.fullName}
                className="size-28 rounded-3xl border-4 border-white shadow-xl object-cover"
              />
              <div className="pb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                  Intermediate Player
                </p>
                <h2 className="text-3xl font-black text-slate-900">{profile.fullName}</h2>
                <p className="text-sm font-bold text-slate-500">{profile.homeDistrict}</p>
              </div>
            </div>
            <button className="h-12 px-6 rounded-2xl bg-slate-900 text-white text-sm font-black hover:bg-primary transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6">Personal Information</h3>
          <div className="space-y-5">
            <InfoRow label="Email" value={profile.email} icon="mail" />
            <InfoRow label="Phone" value={profile.phoneNumber} icon="phone" />
            <InfoRow label="Member Since" value={new Date(profile.memberSince).toLocaleDateString('en-GB')} icon="calendar_month" />
            <InfoRow label="Home District" value={profile.homeDistrict} icon="location_on" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6">Play Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <PreferenceCard label="Skill Level" value={profile.preferences.skillLevel} />
            <PreferenceCard label="Preferred Time" value={profile.preferences.preferredTime} />
            <PreferenceCard label="Play Style" value={profile.preferences.playStyle} />
            <PreferenceCard label="Main Area" value={profile.homeDistrict} />
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.preferences.favoriteSports.map((sport) => (
              <span key={sport} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black">
                {sport}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value, icon }) {
  return (
    <div className="flex items-center gap-4">
      <div className="size-11 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center">
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</p>
        <p className="text-sm font-bold text-slate-800 mt-1">{value}</p>
      </div>
    </div>
  );
}

function PreferenceCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="text-sm font-black text-slate-900 mt-2">{value}</p>
    </div>
  );
}
