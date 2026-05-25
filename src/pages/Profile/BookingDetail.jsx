import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBookingDetail } from '../../services/mock/platformService';
import { formatCurrency } from '../../utils/format';

const statusClasses = {
  Confirmed: 'bg-emerald-50 text-emerald-600',
  PendingVerification: 'bg-amber-50 text-amber-600',
  Cancelled: 'bg-rose-50 text-rose-600',
};

export default function BookingDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    getBookingDetail(id).then(setBooking);
  }, [id]);

  if (!booking) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Booking detail</p>
          <h1 className="text-3xl font-black text-slate-900">{booking.id}</h1>
          <p className="mt-2 text-sm font-bold text-slate-500">
            Hold slot, upload payment proof, payment status, and cancel booking mock flow.
          </p>
        </div>
        <span className={`self-start rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest lg:self-auto ${statusClasses[booking.status]}`}>
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Court reservation</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Info label="Venue" value={booking.venueName} icon="stadium" />
              <Info label="Court" value={booking.courtName} icon="sports_tennis" />
              <Info label="Date" value={booking.date} icon="calendar_month" />
              <Info label="Time" value={booking.time} icon="schedule" />
              <Info label="Sport" value={booking.sport} icon="emoji_events" />
              <Info label="Amount" value={formatCurrency(booking.price)} icon="payments" />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to={`/venues/${booking.venueId}`} className="h-11 rounded-xl bg-slate-900 px-5 py-3 text-center text-sm font-black text-white transition-colors hover:bg-primary">
                Open venue
              </Link>
              <button type="button" className="h-11 rounded-xl border border-rose-200 px-5 text-sm font-black text-rose-600 transition-colors hover:bg-rose-50 cursor-pointer">
                Cancel booking
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Booking timeline</h2>
            <div className="mt-6 space-y-4">
              {booking.timeline.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-full ${item.done ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <span className="material-symbols-outlined text-sm">{item.done ? 'check' : 'more_horiz'}</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{item.label}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">{item.at}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Payment info</h2>
            <img src={booking.bankInfo.qrCodeUrl} alt="Payment QR code" className="mx-auto mt-6 size-44 rounded-2xl border border-slate-200 p-3" />
            <div className="mt-6 space-y-3">
              <Info label="Bank" value={booking.bankInfo.bankName} icon="account_balance" />
              <Info label="Account" value={booking.bankInfo.accountNumber} icon="credit_card" />
              <Info label="Name" value={booking.bankInfo.accountName} icon="badge" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Upload proof</h2>
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <span className="material-symbols-outlined text-3xl text-primary">upload_file</span>
              <p className="mt-2 text-sm font-black text-slate-900">transfer-proof.jpg</p>
              <p className="mt-1 text-xs font-bold text-slate-500">Mock multipart upload endpoint</p>
            </div>
            <button type="button" className="mt-5 h-11 w-full rounded-xl bg-primary px-5 text-sm font-black text-white transition-all hover:brightness-110 cursor-pointer">
              Submit payment proof
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Info({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
        <p className="mt-1 text-sm font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
}
