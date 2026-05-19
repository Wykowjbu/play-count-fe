import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const readSource = (path) => readFileSync(join(cwd(), path), 'utf8');

describe('auth pages UX', () => {
  it('keeps login and registration inside the shared auth card system', () => {
    const login = readSource('src/pages/Auth/Login.jsx');
    const register = readSource('src/pages/Auth/Register.jsx');
    const owner = readSource('src/pages/Auth/RegisterOwner.jsx');

    for (const source of [login, register, owner]) {
      expect(source).toContain('auth-card');
      expect(source).toContain('auth-field');
      expect(source).toContain('auth-primary-action');
    }
  });

  it('does not nest full-screen page shells inside registration forms', () => {
    const register = readSource('src/pages/Auth/Register.jsx');
    const owner = readSource('src/pages/Auth/RegisterOwner.jsx');

    expect(register).not.toContain('min-h-screen');
    expect(owner).not.toContain('min-h-screen');
    expect(register).not.toContain('h-full');
    expect(owner).not.toContain('h-full');
  });
});
