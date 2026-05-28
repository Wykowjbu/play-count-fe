import { useEffect, useState } from 'react';
import MockModal, { MockField, TextArea, TextInput } from '../../components/MockModal';
import { getOwnerVenues } from '../../services/mock/platformService';
import { formatCurrency } from '../../utils/format';

const statusClasses = {
  Published: 'bg-emerald-50 text-emerald-600',
  Review: 'bg-amber-50 text-amber-600',
  Available: 'bg-emerald-50 text-emerald-600',
  Booked: 'bg-blue-50 text-blue-600',
  Maintenance: 'bg-amber-50 text-amber-600',
};

export default function Venues() {
  const [venues, setVenues] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    getOwnerVenues().then((items) => {
      setVenues(items);
      setSelectedId(items[0]?.id);
    });
  }, []);

  const selectedVenue = venues.find((venue) => venue.id === selectedId) || venues[0];

  const updateSelectedVenue = (updater) => {
    setVenues((currentVenues) =>
      currentVenues.map((venue) => (venue.id === selectedVenue.id ? updater(venue) : venue))
    );
  };

  const confirmVenueAction = () => {
    if (activeModal === 'createVenue') {
      const newVenue = {
        id: Date.now(),
        name: 'Mock New Venue',
        district: 'Cam Le',
        address: '88 Mock Street, Cam Le, Da Nang',
        phone: '0900 123 456',
        status: 'Review',
        rating: 0,
        images: 0,
        amenities: ['Parking', 'Wifi'],
        openingHours: [{ day: 'Daily', hours: '06:00 - 22:00' }],
        courts: [],
        pricingRules: [],
        blockedSlots: [],
      };
      setVenues((currentVenues) => [newVenue, ...currentVenues]);
      setSelectedId(newVenue.id);
    }

    if (activeModal === 'uploadImages') {
      updateSelectedVenue((venue) => ({ ...venue, images: venue.images + 3 }));
    }

    if (activeModal === 'openingHours') {
      updateSelectedVenue((venue) => ({
        ...venue,
        openingHours: [
          { day: 'Mon - Fri', hours: '05:30 - 23:00' },
          { day: 'Sat - Sun', hours: '06:00 - 23:30' },
        ],
      }));
    }

    if (activeModal === 'court') {
      updateSelectedVenue((venue) => ({
        ...venue,
        courts: [
          ...venue.courts,
          {
            id: Date.now(),
            name: `Mock Court ${venue.courts.length + 1}`,
            sport: 'Pickleball',
            type: 'Outdoor',
            basePrice: 150000,
            status: 'Available',
          },
        ],
      }));
    }

    if (activeModal === 'pricing') {
      updateSelectedVenue((venue) => ({
        ...venue,
        pricingRules: [
          ...venue.pricingRules,
          {
            id: `PR-${Date.now()}`,
            name: 'Mock evening price',
            days: 'Mon-Fri',
            time: '18:00 - 21:00',
            price: 190000,
            priority: 9,
          },
        ],
      }));
    }

    if (activeModal === 'maintenance') {
      updateSelectedVenue((venue) => ({
        ...venue,
        blockedSlots: [
          ...venue.blockedSlots,
          {
            id: `MT-${Date.now()}`,
            court: venue.courts[0]?.name || 'Mock Court',
            time: '2026-05-30 14:00 - 16:00',
            reason: 'Mock maintenance slot',
          },
        ],
      }));
    }

    setActiveModal(null);
  };

  if (!selectedVenue) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Owner facility</p>
          <h1 className="text-3xl font-black text-slate-900">Venues & Operations</h1>
          <p className="mt-2 text-sm font-bold text-slate-500">
            Mock surface for venue CRUD, image upload, opening hours, courts, pricing rules, and maintenance schedules.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setActiveModal('createVenue')}
          className="h-12 rounded-2xl bg-primary px-6 text-sm font-black text-white shadow-lg shadow-primary/20 transition-all hover:brightness-110 cursor-pointer"
        >
          Create venue
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          {venues.map((venue) => (
            <button
              key={venue.id}
              type="button"
              onClick={() => setSelectedId(venue.id)}
              className={`w-full rounded-3xl border p-5 text-left transition-all cursor-pointer ${
                venue.id === selectedVenue.id
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-slate-200 bg-white hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">{venue.name}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">{venue.district}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${statusClasses[venue.status]}`}>
                  {venue.status}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-black text-slate-500">
                <span>{venue.courts.length} courts</span>
                <span>{venue.images} images</span>
              </div>
            </button>
          ))}
        </aside>

        <div className="space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{selectedVenue.name}</h2>
                <p className="mt-2 text-sm font-bold text-slate-500">{selectedVenue.address}</p>
                <p className="mt-1 text-sm font-bold text-slate-500">{selectedVenue.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <Metric label="Rating" value={selectedVenue.rating} />
                <Metric label="Images" value={selectedVenue.images} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <label className="block md:col-span-2">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Venue name</span>
                <input className="auth-field" defaultValue={selectedVenue.name} />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">District</span>
                <input className="auth-field" defaultValue={selectedVenue.district} />
              </label>
              <label className="block md:col-span-3">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Address</span>
                <input className="auth-field" defaultValue={selectedVenue.address} />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedVenue.amenities.map((amenity) => (
                <span key={amenity} className="rounded-full bg-primary/10 px-4 py-2 text-xs font-black text-primary">
                  {amenity}
                </span>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-slate-900">Opening hours</h2>
              <div className="mt-5 space-y-3">
                {selectedVenue.openingHours.map((item) => (
                  <div key={item.day} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                    <span className="text-sm font-black text-slate-900">{item.day}</span>
                    <span className="text-sm font-bold text-slate-500">{item.hours}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('openingHours')}
                className="mt-5 h-11 rounded-xl border border-slate-200 px-4 text-sm font-black text-slate-700 transition-colors hover:border-primary hover:text-primary cursor-pointer"
              >
                Set opening hours
              </button>
            </div>

            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                <span className="material-symbols-outlined">add_photo_alternate</span>
              </div>
              <h2 className="mt-4 text-xl font-black text-slate-900">Venue images</h2>
              <p className="mt-2 text-sm font-bold text-slate-500">Mock multipart upload supports up to 10 images, 5MB each.</p>
              <button
                type="button"
                onClick={() => setActiveModal('uploadImages')}
                className="mt-5 h-11 rounded-xl bg-slate-900 px-5 text-sm font-black text-white transition-colors hover:bg-primary cursor-pointer"
              >
                Upload images
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Courts</h2>
                <p className="mt-1 text-sm font-bold text-slate-500">Create, update, delete courts and control base price/status.</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('court')}
                className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white cursor-pointer"
              >
                Add court
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {selectedVenue.courts.map((court) => (
                <div key={court.id} className="grid gap-4 p-5 md:grid-cols-[1fr_1fr_1fr_140px] md:items-center">
                  <div>
                    <p className="text-sm font-black text-slate-900">{court.name}</p>
                    <p className="mt-1 text-xs font-bold text-slate-500">{court.type}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-700">{court.sport}</p>
                  <p className="text-sm font-black text-slate-900">{formatCurrency(court.basePrice)}</p>
                  <span className={`justify-self-start rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest md:justify-self-end ${statusClasses[court.status]}`}>
                    {court.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <RulesList title="Pricing rules" items={selectedVenue.pricingRules} emptyText="No pricing rules yet" onAdd={() => setActiveModal('pricing')} />
            <RulesList title="Maintenance blocks" items={selectedVenue.blockedSlots} emptyText="No blocked slots" isMaintenance onAdd={() => setActiveModal('maintenance')} />
          </section>
        </div>
      </div>

      <MockModal
        open={Boolean(activeModal)}
        eyebrow="Owner facility mock"
        title={modalCopy[activeModal]?.title || 'Mock Action'}
        description={modalCopy[activeModal]?.description}
        confirmLabel={modalCopy[activeModal]?.confirm || 'Save mock data'}
        onClose={() => setActiveModal(null)}
        onConfirm={confirmVenueAction}
        size={activeModal === 'createVenue' ? 'max-w-3xl' : 'max-w-2xl'}
      >
        <VenueModalBody type={activeModal} selectedVenue={selectedVenue} />
      </MockModal>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-5 py-4">
      <p className="text-2xl font-black text-slate-900">{value}</p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
    </div>
  );
}

function RulesList({ title, items, emptyText, isMaintenance = false, onAdd }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-slate-900">{title}</h2>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:border-primary hover:text-primary cursor-pointer"
        >
          Add
        </button>
      </div>
      <div className="mt-5 space-y-3">
        {items.length === 0 ? (
          <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-500">{emptyText}</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-black text-slate-900">{isMaintenance ? item.court : item.name}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">
                {isMaintenance ? `${item.time} • ${item.reason}` : `${item.days} • ${item.time} • ${formatCurrency(item.price)}`}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const modalCopy = {
  createVenue: {
    title: 'Create Venue',
    description: 'Mock form for POST /api/venues. Owner KYC approval is assumed in this preview.',
    confirm: 'Create mock venue',
  },
  uploadImages: {
    title: 'Upload Venue Images',
    description: 'Mock multipart upload for /api/venues/{id}/images.',
    confirm: 'Upload mock images',
  },
  openingHours: {
    title: 'Set Opening Hours',
    description: 'Mock schedule editor for PUT /api/venues/{id}/opening-hours.',
    confirm: 'Apply schedule',
  },
  court: {
    title: 'Add Court',
    description: 'Mock court creation for POST /api/venues/{venueId}/courts.',
    confirm: 'Add mock court',
  },
  pricing: {
    title: 'Create Pricing Rule',
    description: 'Mock pricing rule with day mask, time range, price, priority and valid dates.',
    confirm: 'Add pricing rule',
  },
  maintenance: {
    title: 'Block Court Slot',
    description: 'Mock maintenance schedule for POST /api/courts/{id}/schedules.',
    confirm: 'Block slot',
  },
};

function VenueModalBody({ type, selectedVenue }) {
  if (type === 'createVenue') {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MockField label="Venue name">
          <TextInput defaultValue="Mock New Venue" />
        </MockField>
        <MockField label="Phone">
          <TextInput defaultValue="0900 123 456" />
        </MockField>
        <MockField label="District">
          <TextInput defaultValue="Cam Le" />
        </MockField>
        <MockField label="Latitude / Longitude">
          <TextInput defaultValue="16.0471, 108.2068" />
        </MockField>
        <MockField label="Address">
          <TextInput defaultValue="88 Mock Street, Cam Le, Da Nang" />
        </MockField>
        <MockField label="Amenities">
          <TextInput defaultValue="Parking, Wifi, Shower" />
        </MockField>
        <MockField label="Description">
          <TextArea defaultValue="Friendly venue preview with full owner operations enabled in mock data." />
        </MockField>
      </div>
    );
  }

  if (type === 'uploadImages') {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <span className="material-symbols-outlined text-4xl text-primary">cloud_upload</span>
        <h3 className="mt-3 text-lg font-black text-slate-900">3 mock images selected</h3>
        <p className="mt-2 text-sm font-bold text-slate-500">venue-front.jpg, court-lighting.jpg, lounge-area.jpg</p>
      </div>
    );
  }

  if (type === 'openingHours') {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {['Mon - Fri', 'Sat - Sun'].map((day, index) => (
          <div key={day} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-black text-slate-900">{day}</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <TextInput type="time" defaultValue={index === 0 ? '05:30' : '06:00'} />
              <TextInput type="time" defaultValue={index === 0 ? '23:00' : '23:30'} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'court') {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MockField label="Venue">
          <TextInput defaultValue={selectedVenue?.name} readOnly />
        </MockField>
        <MockField label="Court name">
          <TextInput defaultValue={`Mock Court ${(selectedVenue?.courts.length || 0) + 1}`} />
        </MockField>
        <MockField label="Sport">
          <select className="auth-field" defaultValue="Pickleball">
            <option>Pickleball</option>
            <option>Tennis</option>
            <option>Badminton</option>
          </select>
        </MockField>
        <MockField label="Base price">
          <TextInput defaultValue="150000" />
        </MockField>
        <MockField label="Court type">
          <TextInput defaultValue="Outdoor" />
        </MockField>
        <MockField label="Status">
          <select className="auth-field" defaultValue="Available">
            <option>Available</option>
            <option>Booked</option>
            <option>Maintenance</option>
          </select>
        </MockField>
      </div>
    );
  }

  if (type === 'pricing') {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MockField label="Rule name">
          <TextInput defaultValue="Mock evening price" />
        </MockField>
        <MockField label="Day mask">
          <TextInput defaultValue="Mon-Fri" />
        </MockField>
        <MockField label="Start time">
          <TextInput type="time" defaultValue="18:00" />
        </MockField>
        <MockField label="End time">
          <TextInput type="time" defaultValue="21:00" />
        </MockField>
        <MockField label="Price">
          <TextInput defaultValue="190000" />
        </MockField>
        <MockField label="Priority">
          <TextInput defaultValue="9" />
        </MockField>
      </div>
    );
  }

  if (type === 'maintenance') {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MockField label="Court">
          <select className="auth-field" defaultValue={selectedVenue?.courts[0]?.name}>
            {selectedVenue?.courts.map((court) => (
              <option key={court.id}>{court.name}</option>
            ))}
          </select>
        </MockField>
        <MockField label="Date">
          <TextInput type="date" defaultValue="2026-05-30" />
        </MockField>
        <MockField label="Start time">
          <TextInput type="time" defaultValue="14:00" />
        </MockField>
        <MockField label="End time">
          <TextInput type="time" defaultValue="16:00" />
        </MockField>
        <MockField label="Reason">
          <TextArea defaultValue="Mock maintenance slot" />
        </MockField>
      </div>
    );
  }

  return null;
}
