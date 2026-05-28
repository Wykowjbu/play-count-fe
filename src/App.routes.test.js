import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const appSource = readFileSync(join(cwd(), 'src', 'App.jsx'), 'utf8');

describe('App routes', () => {
  it('uses the Vite base path as the browser router basename for GitHub Pages', () => {
    expect(appSource).toContain('<BrowserRouter basename={import.meta.env.BASE_URL}>');
  });

  it('registers the missing profile and business management routes', () => {
    expect(appSource).toContain('path="/profile" element={<PlayerProfileLayout />}');
    expect(appSource).toContain('path="detail"');
    expect(appSource).toContain('path="bookings"');
    expect(appSource).toContain('path="/business/courts"');
  });

  it('registers every route exposed by the main navigation', () => {
    expect(appSource).toContain('path="/leaderboard"');
    expect(appSource).toContain('path="/business/bookings"');
    expect(appSource).toContain('path="/business/analytics"');
    expect(appSource).toContain('path="/business/settings"');
  });

  it('groups player profile routes inside the public profile shell', () => {
    expect(appSource).toContain('PlayerProfileLayout');

    const publicRoutesStart = appSource.indexOf('<Route element={<PublicLayout />}>');
    const authRoutesStart = appSource.indexOf('{/* Auth Routes */}');
    const publicRoutes = appSource.slice(publicRoutesStart, authRoutesStart);

    expect(publicRoutes).toContain('path="/profile" element={<PlayerProfileLayout />}');
    expect(publicRoutes).toContain('path="detail"');
    expect(publicRoutes).toContain('path="bookings"');
  });
});
