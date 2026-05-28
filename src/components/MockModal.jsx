export default function MockModal({
  open,
  title,
  eyebrow,
  description,
  children,
  confirmLabel = 'Save mock data',
  onClose,
  onConfirm,
  size = 'max-w-2xl',
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm sm:items-center">
      <div className={`max-h-[92vh] w-full ${size} overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl`}>
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-6">
          <div>
            {eyebrow && <p className="text-[10px] font-black uppercase tracking-widest text-primary">{eyebrow}</p>}
            <h2 className="mt-2 text-2xl font-black text-slate-900">{title}</h2>
            {description && <p className="mt-1 text-sm font-bold leading-6 text-slate-500">{description}</p>}
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">{children}</div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 p-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-12 rounded-xl border border-slate-200 px-5 text-sm font-black text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-12 rounded-xl bg-primary px-5 text-sm font-black text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function MockField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">{label}</span>
      {children}
    </label>
  );
}

export function TextInput(props) {
  return <input className="auth-field" {...props} />;
}

export function TextArea(props) {
  return (
    <textarea
      className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
      {...props}
    />
  );
}
