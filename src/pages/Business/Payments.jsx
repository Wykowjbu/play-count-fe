import { useEffect, useState } from 'react';
import { getOwnerPayments, getTransactions } from '../../services/mock/platformService';
import { formatCurrency } from '../../utils/format';

const statusClasses = {
  PendingVerification: 'bg-amber-50 text-amber-600',
  Verified: 'bg-emerald-50 text-emerald-600',
  Rejected: 'bg-rose-50 text-rose-600',
  Completed: 'bg-blue-50 text-blue-600',
};

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getOwnerPayments().then(setPayments);
    getTransactions().then(setTransactions);
  }, []);

  const pendingCount = payments.filter((payment) => payment.status === 'PendingVerification').length;
  const verifiedTotal = transactions
    .filter((transaction) => transaction.status === 'Verified')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      <div>
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Owner finance</p>
        <h1 className="text-3xl font-black text-slate-900">Payments & Transactions</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">
          Mock endpoints for upload proof review, verify/reject payment, payment status, and transaction logs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Metric label="Pending proof" value={pendingCount} icon="hourglass_top" />
        <Metric label="Verified total" value={formatCurrency(verifiedTotal)} icon="verified" />
        <Metric label="Transactions" value={transactions.length} icon="receipt_long" />
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-xl font-black text-slate-900">Payment proof queue</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {payments.map((payment) => (
            <div key={payment.id} className="grid gap-5 p-5 lg:grid-cols-[1fr_1fr_150px_220px] lg:items-center">
              <div>
                <p className="text-sm font-black text-slate-900">{payment.id} • {payment.bookingId}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">{payment.customer}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">{payment.venue}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">{payment.transferNote}</p>
              </div>
              <p className="text-sm font-black text-slate-900 lg:text-right">{formatCurrency(payment.amount)}</p>
              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${statusClasses[payment.status]}`}>
                  {payment.status}
                </span>
                <button type="button" className="rounded-xl bg-primary px-3 py-2 text-xs font-black uppercase tracking-widest text-white cursor-pointer">
                  Verify
                </button>
                <button type="button" className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 cursor-pointer">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-black text-slate-900">Transaction log</h2>
          <button type="button" className="h-10 rounded-xl border border-slate-200 px-4 text-xs font-black uppercase tracking-widest text-slate-600 hover:border-primary hover:text-primary cursor-pointer">
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                {['Date', 'Venue', 'Type', 'Amount', 'Status'].map((heading) => (
                  <th key={heading} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-bold text-slate-600">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">{transaction.venue}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-600">{transaction.type}</td>
                  <td className={`px-6 py-4 text-sm font-black ${transaction.amount < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${statusClasses[transaction.status]}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <p className="text-2xl font-black text-slate-900">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  );
}
