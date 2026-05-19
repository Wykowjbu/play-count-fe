import profileData from './data/profile.json';

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCurrentPlayerProfile = async () => {
  await delay();
  return profileData.currentPlayer;
};

export const getPlayerBookings = async () => {
  await delay();
  return profileData.bookings;
};

export const getBusinessCourts = async () => {
  await delay();
  return profileData.businessCourts;
};
