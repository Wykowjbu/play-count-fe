import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const appSource = readFileSync(join(cwd(), 'src', 'App.jsx'), 'utf8');

describe('App routes', () => {
  it('registers the missing profile and business management routes', () => {
    expect(appSource).toContain('path="/profile/detail"');
    expect(appSource).toContain('path="/profile/bookings"');
    expect(appSource).toContain('path="/business/courts"');
  });

  it('registers every route exposed by the main navigation', () => {
    expect(appSource).toContain('path="/leaderboard"');
    expect(appSource).toContain('path="/business/bookings"');
    expect(appSource).toContain('path="/business/analytics"');
    expect(appSource).toContain('path="/business/settings"');
  });

  it('keeps player profile routes inside the public browsing shell', () => {
    expect(appSource).not.toContain('PlayerProfileLayout');

    const publicRoutesStart = appSource.indexOf('<Route element={<PublicLayout />}>');
    const authRoutesStart = appSource.indexOf('{/* Auth Routes */}');
    const publicRoutes = appSource.slice(publicRoutesStart, authRoutesStart);

    expect(publicRoutes).toContain('path="/profile/detail"');
    expect(publicRoutes).toContain('path="/profile/bookings"');
  });
});
