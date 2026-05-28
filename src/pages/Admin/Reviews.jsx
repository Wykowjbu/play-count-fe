import { useEffect, useState } from 'react';
import MockModal, { MockField, TextArea, TextInput } from '../../components/MockModal';
import { getModerationReviews } from '../../services/mock/platformService';

const statusClasses = {
  Flagged: 'bg-amber-50 text-amber-600',
  Hidden: 'bg-rose-50 text-rose-600',
  Visible: 'bg-emerald-50 text-emerald-600',
};

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [activeAction, setActiveAction] = useState(null);

  useEffect(() => {
    getModerationReviews().then(setReviews);
  }, []);

  const confirmReviewAction = () => {
    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === activeAction.review.id ? { ...review, status: activeAction.status } : review
      )
    );
    setActiveAction(null);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      <div>
        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Trust and safety</p>
        <h1 className="text-3xl font-black text-slate-900">Review Moderation</h1>
        <p className="mt-2 text-sm font-bold text-slate-500">Admin hide/restore review endpoint mock screen.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">rate_review</span>
              </div>
              <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${statusClasses[review.status]}`}>
                {review.status}
              </span>
            </div>
            <h2 className="mt-5 text-xl font-black text-slate-900">{review.venue}</h2>
            <p className="mt-2 text-sm font-bold text-slate-500">By {review.author} • {review.rating} stars</p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-600">
              {review.reason}
            </div>
            <textarea className="mt-5 min-h-20 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 outline-none focus:border-primary" placeholder="Moderation reason" />
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setActiveAction({ review, status: 'Hidden' })}
                className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-black text-white hover:bg-primary cursor-pointer"
              >
                Hide
              </button>
              <button
                type="button"
                onClick={() => setActiveAction({ review, status: 'Visible' })}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Restore
              </button>
            </div>
          </article>
        ))}
      </div>

      <MockModal
        open={Boolean(activeAction)}
        eyebrow="Review moderation"
        title={`${activeAction?.status === 'Hidden' ? 'Hide' : 'Restore'} Review`}
        description="Mock moderation endpoint for action hide|restore with optional reason."
        confirmLabel="Apply moderation"
        onClose={() => setActiveAction(null)}
        onConfirm={confirmReviewAction}
      >
        <div className="space-y-4">
          <MockField label="Review">
            <TextInput defaultValue={activeAction?.review?.id} readOnly />
          </MockField>
          <MockField label="Reason">
            <TextArea defaultValue={activeAction?.status === 'Hidden' ? 'Contains abusive or unrelated content.' : 'Review content has been cleared for visibility.'} />
          </MockField>
        </div>
      </MockModal>
    </div>
  );
}
