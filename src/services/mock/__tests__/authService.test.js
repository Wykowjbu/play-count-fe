import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as authService from '../authService';

describe('authService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('login', () => {
    it('should return user info and store it in localStorage when credentials match', async () => {
      const email = 'player@gmail.com';
      const password = 'password123';

      const user = await authService.login(email, password);

      expect(user).not.toBeNull();
      expect(user.email).toBe(email);
      expect(localStorage.getItem('currentUser')).not.toBeNull();
      expect(JSON.parse(localStorage.getItem('currentUser')).email).toBe(email);
    });

    it('should return null when credentials do not match', async () => {
      const email = 'player@gmail.com';
      const password = 'wrongpassword';

      const user = await authService.login(email, password);

      expect(user).toBeNull();
      expect(localStorage.getItem('currentUser')).toBeNull();
    });
  });

  describe('getCurrentUser', () => {
    it('should return null if no user is logged in', async () => {
      const user = await authService.getCurrentUser();
      expect(user).toBeNull();
    });

    it('should return the user stored in localStorage', async () => {
      const mockUser = { id: 1, email: 'player@gmail.com', fullName: 'Test User' };
      localStorage.setItem('currentUser', JSON.stringify(mockUser));

      const user = await authService.getCurrentUser();
      expect(user).toEqual(mockUser);
    });
  });

  describe('logout', () => {
    it('should remove user from localStorage', async () => {
      localStorage.setItem('currentUser', JSON.stringify({ id: 1 }));
      
      await authService.logout();
      
      expect(localStorage.getItem('currentUser')).toBeNull();
    });
  });
});
