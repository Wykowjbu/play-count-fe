import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const files = [
  'src/layouts/PublicLayout.jsx',
  'src/layouts/BusinessLayout.jsx',
  'src/pages/Home.jsx',
  'src/pages/Auth/Login.jsx',
];

describe('navigation links', () => {
  it('does not expose placeholder href or router links in primary demo flows', () => {
    for (const file of files) {
      const source = readFileSync(join(cwd(), file), 'utf8');

      expect(source, file).not.toContain('to="#"');
      expect(source, file).not.toContain('href="#"');
    }
  });

  it('exposes account, logout, owner, and notification actions from the public navbar', () => {
    const source = readFileSync(join(cwd(), 'src/layouts/PublicLayout.jsx'), 'utf8');

    expect(source).toContain('Profile Menu');
    expect(source).toContain('My Bookings');
    expect(source).toContain('Owner Center');
    expect(source).toContain('Logout');
    expect(source).toContain('Notification Panel');
    expect(source).toContain('Match request');
  });

  it('uses a focused search shell on the court discovery page', () => {
    const source = readFileSync(join(cwd(), 'src/pages/Venues/FindCourts.jsx'), 'utf8');

    expect(source).toContain('Search Panel');
    expect(source).toContain('Quick Filters');
    expect(source).toContain('Create Match');
  });

  it('styles mobile court filters as an expandable drawer', () => {
    const source = readFileSync(join(cwd(), 'src/pages/Venues/FindCourts.jsx'), 'utf8');

    expect(source).toContain('showFilters');
    expect(source).toContain('aria-controls="court-filter-panel"');
    expect(source).toContain('id="court-filter-panel"');
    expect(source).toContain('Apply Filters');
  });

  it('lets players open a create match form from the matches page', () => {
    const source = readFileSync(join(cwd(), 'src/pages/Matches.jsx'), 'utf8');

    expect(source).toContain('showCreateMatch');
    expect(source).toContain('Create Match');
    expect(source).toContain('Match setup');
    expect(source).toContain('Publish Match');
  });
});
