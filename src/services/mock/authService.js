import authData from './data/auth.json';

const USER_KEY = 'currentUser';

/**
 * Mock login logic.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object|null>} The user object if successful, null otherwise.
 */
export const login = async (email, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = authData.users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Exclude password from stored data
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }

  return null;
};

/**
 * Mock logout logic.
 * @returns {Promise<void>}
 */
export const logout = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  localStorage.removeItem(USER_KEY);
};

/**
 * Get the currently logged-in user.
 * @returns {Promise<Object|null>}
 */
export const getCurrentUser = async () => {
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  return JSON.parse(userJson);
};
