import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MockModal, { MockField, TextArea, TextInput } from '../../components/MockModal';
import * as venueService from '../../services/mock/venueService';
import { formatCurrency } from '../../utils/format';

export default function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('Court 1 (PVC Standard)');
  const [activeAction, setActiveAction] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      setLoading(true);
      try {
        const data = await venueService.getVenueDetails(id);
        setVenue(data);
        if (data && data.availableDates && data.availableDates.length > 0) {
          setSelectedDate(data.availableDates[0]);
        }
      } catch (error) {
        console.error("Error fetching venue details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Venue not found</h2>
        <p className="mt-2 text-gray-600">The venue you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  const images = venue.images || [venue.imageUrl];

  return (
    <main className="max-w-[1280px] mx-auto px-6 pt-8 pb-24">
      {/* Image Gallery */}
      <section className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-4 h-auto sm:h-[500px] mb-12">
        <div className="sm:col-span-2 sm:row-span-2 h-72 sm:h-auto relative overflow-hidden rounded-3xl group cursor-pointer">
          <div 
            className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${images[0]})` }}
          ></div>
        </div>
        
        {images.slice(1, 3).map((img, index) => (
          <div key={index} className="h-48 sm:h-auto relative overflow-hidden rounded-3xl group cursor-pointer">
            <div 
              className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </div>
        ))}

        {images.length >= 4 && (
          <div className="h-48 sm:h-auto relative overflow-hidden rounded-3xl group cursor-pointer">
            <div 
              className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${images[3]})` }}
            ></div>
            {images.length > 4 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">+{images.length - 4} Photos</span>
              </div>
            )}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Info */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{venue.name}</h1>
              <div className="flex items-center space-x-4 text-gray-600 flex-wrap gap-y-2">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-yellow-400 mr-1 fill-1">star</span>
                  <span className="font-semibold text-gray-900">{venue.rating}</span>
                  <span className="ml-1">(120 reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-gray-400 mr-1">location_on</span>
                  <span>{venue.district}</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-gray-400 mr-1">distance</span>
                  <span>{venue.distance}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setActiveAction('share')}
                className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">share</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveAction('favorite')}
                className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* About Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this venue</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {venue.description}
            </p>
          </section>

          {/* Amenities */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What this place offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {venue.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-700">
                  <span className="material-symbols-outlined text-gray-400">check_circle</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="my-8 border-gray-100" />

          {/* Reviews */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
              <button
                type="button"
                onClick={() => setActiveAction('review')}
                className="text-primary font-semibold hover:underline cursor-pointer"
              >
                Write a review
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(venue.reviews || []).map((review) => (
                <div key={review.id} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/30">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{review.user}</h4>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-[16px] ${i < review.rating ? 'text-yellow-400 fill-1' : 'text-gray-300'}`}>
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-8 rounded-3xl border border-gray-200 shadow-xl shadow-gray-100 bg-white">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-3xl font-bold text-gray-900">{formatCurrency(venue.pricePerHour)}</span>
                <span className="text-gray-500 ml-1">/ hour</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="material-symbols-outlined text-yellow-400 text-sm mr-1 fill-1">star</span>
                <span className="font-bold text-gray-900">{venue.rating}</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Select Date</label>
                <div className="flex flex-wrap gap-2">
                  {venue.availableDates.map((date) => (
                    <button
                      type="button"
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-4 py-2 rounded-xl border-2 transition-all ${
                        selectedDate === date
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-gray-100 hover:border-gray-200 text-gray-600'
                      }`}
                    >
                      {new Date(date).toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric' })}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Select Time Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {venue.timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-2 rounded-xl border-2 text-sm transition-all ${
                        selectedSlot === slot
                          ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                          : 'border-gray-100 hover:border-gray-200 text-gray-600'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Court Selection (Simulated) */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Court</label>
                <select 
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-primary outline-none transition-all text-gray-700 bg-white"
                >
                  <option>Court 1 (PVC Standard)</option>
                  <option>Court 2 (PVC Standard)</option>
                  <option>Court 3 (Premium)</option>
                </select>
              </div>

              <div className="pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Price ({selectedSlot ? '1 hour' : '0 hour'})</span>
                  <span>{selectedSlot ? formatCurrency(venue.pricePerHour) : formatCurrency(0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service fee</span>
                  <span>{formatCurrency(5000)}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{selectedSlot ? formatCurrency(venue.pricePerHour + 5000) : formatCurrency(0)}</span>
                </div>
              </div>

              <button 
                type="button"
                disabled={!selectedSlot}
                onClick={() => setActiveAction('booking')}
                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Now
              </button>
              
              <p className="text-center text-xs text-gray-400">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>

      <MockModal
        open={Boolean(activeAction)}
        eyebrow="Venue action"
        title={venueActionCopy[activeAction]?.title || 'Venue Action'}
        description={venueActionCopy[activeAction]?.description}
        confirmLabel={venueActionCopy[activeAction]?.confirm || 'Confirm'}
        onClose={() => setActiveAction(null)}
        onConfirm={() => setActiveAction(null)}
      >
        {activeAction === 'booking' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MockField label="Venue">
              <TextInput defaultValue={venue.name} readOnly />
            </MockField>
            <MockField label="Court">
              <TextInput defaultValue={selectedCourt} readOnly />
            </MockField>
            <MockField label="Date">
              <TextInput defaultValue={selectedDate} readOnly />
            </MockField>
            <MockField label="Time slot">
              <TextInput defaultValue={selectedSlot} readOnly />
            </MockField>
          </div>
        )}
        {activeAction === 'review' && (
          <div className="space-y-4">
            <MockField label="Rating">
              <select className="auth-field" defaultValue="5">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </select>
            </MockField>
            <MockField label="Comment">
              <TextArea defaultValue="Great court lighting and friendly staff." />
            </MockField>
          </div>
        )}
        {(activeAction === 'share' || activeAction === 'favorite') && (
          <div className="rounded-2xl bg-slate-50 p-5 text-sm font-bold leading-6 text-slate-600">
            {activeAction === 'share' ? `Share link copied for ${venue.name}.` : `${venue.name} will be saved to your mock favorites.`}
          </div>
        )}
      </MockModal>
    </main>
  );
}

const venueActionCopy = {
  share: {
    title: 'Share Venue',
    description: 'Mock share action for venue detail.',
    confirm: 'Copy share link',
  },
  favorite: {
    title: 'Add Favorite',
    description: 'Mock POST /api/users/me/favorites/{venueId}.',
    confirm: 'Save favorite',
  },
  review: {
    title: 'Write Review',
    description: 'Mock POST /api/venues/{id}/reviews. Player must have completed booking in the real API.',
    confirm: 'Submit review',
  },
  booking: {
    title: 'Create Booking Hold',
    description: 'Mock POST /api/bookings that creates a 15-minute hold slot.',
    confirm: 'Create booking hold',
  },
};
