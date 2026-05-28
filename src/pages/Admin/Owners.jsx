import { useEffect, useState } from 'react';
import MockModal, { MockField, TextArea, TextInput } from '../../components/MockModal';
import { getPendingOwners } from '../../services/mock/platformService';

export default function AdminOwners() {
  const [owners, setOwners] = useState([]);
  const [activeAction, setActiveAction] = useState(null);

  useEffect(() => {
    getPendingOwners().then(setOwners);
  }, []);

  const confirmOwnerAction = () => {
    setOwners((currentOwners) =>
      currentOwners.map((owner) =>
        owner.id === activeAction.owner.id ? { ...owner, status: activeAction.status } : owner
      )
    );
    setActiveAction(null);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      <div>
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Owner verification</p>
        <h1 className="text-3xl font-black text-slate-900">Pending Owner KYC</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">
          Admin approve/reject owner profile mock flow. Approval promotes the user to Owner role.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {owners.map((owner) => (
          <div key={owner.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">domain_verification</span>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-600">
                {owner.status}
              </span>
            </div>
            <h2 className="mt-5 text-xl font-black text-slate-900">{owner.business}</h2>
            <p className="mt-2 text-sm font-bold text-slate-500">{owner.owner}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Metric label="Documents" value={owner.documents} />
              <Metric label="Submitted" value={owner.submittedAt} />
            </div>
            <textarea className="mt-5 min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700 outline-none focus:border-primary" placeholder="Approval note or reject reason" />
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setActiveAction({ owner, status: 'Approved' })}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white cursor-pointer"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => setActiveAction({ owner, status: 'Rejected' })}
                className="flex-1 rounded-xl border border-rose-200 px-4 py-3 text-sm font-black text-rose-600 hover:bg-rose-50 cursor-pointer"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      <MockModal
        open={Boolean(activeAction)}
        eyebrow="Owner KYC"
        title={`${activeAction?.status || ''} Owner KYC`}
        description="Mock approve/reject endpoint. Approve promotes the user to Owner role in the real API."
        confirmLabel="Submit decision"
        onClose={() => setActiveAction(null)}
        onConfirm={confirmOwnerAction}
      >
        <div className="space-y-4">
          <MockField label="Business">
            <TextInput defaultValue={activeAction?.owner?.business} readOnly />
          </MockField>
          <MockField label={activeAction?.status === 'Rejected' ? 'Reject reason' : 'Approval note'}>
            <TextArea defaultValue={activeAction?.status === 'Rejected' ? 'Business license image is unclear. Please resubmit.' : 'Documents reviewed. Owner role can be activated.'} />
          </MockField>
        </div>
      </MockModal>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm font-black text-slate-900">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  );
}
