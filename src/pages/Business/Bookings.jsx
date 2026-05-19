import { formatCurrency } from '../../utils/format';

const bookings = [
  { id: 'BK-1028', customer: 'Minh Tran', court: 'Court 1', time: 'Today, 18:00', amount: 150000, status: 'Confirmed' },
  { id: 'BK-1029', customer: 'Linh Pham', court: 'Court 4', time: 'Today, 19:00', amount: 90000, status: 'Checked In' },
  { id: 'BK-1030', customer: 'Bao Hoang', court: 'Court 2', time: 'Tomorrow, 07:00', amount: 150000, status: 'Pending' },
];

export default function Bookings() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Operations</p>
        <h1 className="text-3xl font-black text-slate-900">Bookings</h1>
        <p className="text-sm font-bold text-slate-500 mt-2">Mock reservation queue for the owner preview.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_140px] gap-4 px-6 py-4 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>ID</span>
          <span>Customer</span>
          <span>Court</span>
          <span>Amount</span>
          <span className="text-right">Status</span>
        </div>
        <div className="divide-y divide-slate-100">
          {bookings.map((booking) => (
            <div key={booking.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_140px] gap-3 md:gap-4 px-6 py-5 items-center">
              <p className="text-sm font-black text-slate-900">{booking.id}</p>
              <div>
                <p className="text-sm font-bold text-slate-800">{booking.customer}</p>
                <p className="text-xs font-bold text-slate-400 mt-1">{booking.time}</p>
              </div>
              <p className="text-sm font-bold text-slate-700">{booking.court}</p>
              <p className="text-sm font-black text-primary">{formatCurrency(booking.amount)}</p>
              <div className="md:text-right">
                <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
