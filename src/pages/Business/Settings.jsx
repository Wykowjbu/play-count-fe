import { useState } from 'react';
import MockModal, { MockField, TextArea, TextInput } from '../../components/MockModal';

export default function Settings() {
  const [showSaveModal, setShowSaveModal] = useState(false);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Configuration</p>
        <h1 className="text-3xl font-black text-slate-900">Settings</h1>
        <p className="text-sm font-bold text-slate-500 mt-2">Mock owner settings for preview completeness.</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-6">
        {[
          ['Facility Name', 'PlayCourt Biz Demo'],
          ['Default Currency', 'VND'],
          ['Booking Window', '14 days'],
        ].map(([label, value]) => (
          <label key={label} className="block">
            <span className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{label}</span>
            <input
              className="w-full h-13 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-800 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              defaultValue={value}
            />
          </label>
        ))}
        <button
          type="button"
          onClick={() => setShowSaveModal(true)}
          className="h-12 px-6 rounded-2xl bg-primary text-white text-sm font-black hover:brightness-110 transition-all cursor-pointer"
        >
          Save Settings
        </button>
      </div>

      <MockModal
        open={showSaveModal}
        eyebrow="Owner settings"
        title="Save Business Settings"
        description="Mock settings save for facility defaults and booking configuration."
        confirmLabel="Save settings"
        onClose={() => setShowSaveModal(false)}
        onConfirm={() => setShowSaveModal(false)}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MockField label="Facility name">
            <TextInput defaultValue="PlayCourt Biz Demo" />
          </MockField>
          <MockField label="Booking window">
            <TextInput defaultValue="14 days" />
          </MockField>
          <MockField label="Cancellation cutoff">
            <TextInput defaultValue="12 hours before start" />
          </MockField>
          <MockField label="Default note">
            <TextArea defaultValue="Mock configuration saved locally for the FE preview." />
          </MockField>
        </div>
      </MockModal>
    </div>
  );
}
