import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const content = {
  '/help-center': {
    eyebrow: 'Support',
    title: 'Help Center',
    body: 'Preview help content for booking courts, joining matches, and managing player profiles.',
  },
  '/privacy-policy': {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    body: 'Demo privacy content. Real policy text can be added when the production backend and data contracts are finalized.',
  },
  '/terms-of-service': {
    eyebrow: 'Legal',
    title: 'Terms of Service',
    body: 'Demo terms content for the PlayCourt preview. Replace with approved legal copy before release.',
  },
};

export default function InfoPage() {
  const location = useLocation();
  const page = useMemo(() => content[location.pathname] || content['/help-center'], [location.pathname]);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 pb-24">
      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">{page.eyebrow}</p>
      <h1 className="text-4xl font-black text-slate-900 mb-5">{page.title}</h1>
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <p className="text-base font-bold text-slate-600 leading-relaxed">{page.body}</p>
      </div>
    </main>
  );
}
