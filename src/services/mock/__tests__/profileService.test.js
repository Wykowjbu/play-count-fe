import { describe, expect, it } from 'vitest';
import {
  getBusinessCourts,
  getCurrentPlayerProfile,
  getPlayerBookings,
} from '../profileService';

describe('profileService', () => {
  it('returns the current player profile with preferences and stats', async () => {
    const profile = await getCurrentPlayerProfile();

    expect(profile.fullName).toBe('Nguyen Van Nguoi Choi');
    expect(profile.preferences.favoriteSports).toContain('Pickleball');
    expect(profile.stats.totalBookings).toBeGreaterThan(0);
  });

  it('returns player bookings ordered from upcoming to later', async () => {
    const bookings = await getPlayerBookings();

    expect(bookings).toHaveLength(3);
    expect(bookings[0].status).toBe('Confirmed');
    expect(bookings.map((booking) => booking.venueName)).toContain('Pickleball Center Quan 7');
  });

  it('returns owner courts with operational metrics', async () => {
    const courts = await getBusinessCourts();

    expect(courts).toHaveLength(4);
    expect(courts[0]).toMatchObject({
      name: 'Court 1',
      sport: 'Pickleball',
      status: 'Available',
    });
    expect(courts.every((court) => typeof court.todayBookings === 'number')).toBe(true);
  });
});
