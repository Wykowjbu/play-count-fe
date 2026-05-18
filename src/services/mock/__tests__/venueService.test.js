import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as venueService from '../venueService';

describe('venueService', () => {
  it('should return recommended venues', async () => {
    const venues = await venueService.getRecommendedVenues();
    expect(venues).toBeInstanceOf(Array);
    expect(venues.length).toBeGreaterThan(0);
    expect(venues[0]).toHaveProperty('name');
    expect(venues[0]).toHaveProperty('rating');
  });

  it('should return venue details by id', async () => {
    const venue = await venueService.getVenueDetails(1);
    expect(venue).toBeDefined();
    expect(venue.id).toBe(1);
    expect(venue.name).toBe('Sân Cầu Lông Bình Minh');
  });

  it('should return null for non-existent venue id', async () => {
    const venue = await venueService.getVenueDetails(999);
    expect(venue).toBeNull();
  });

  it('should return live matches', async () => {
    const matches = await venueService.getLiveMatches();
    expect(matches).toBeInstanceOf(Array);
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0]).toHaveProperty('title');
    expect(matches[0]).toHaveProperty('sport');
  });
});
