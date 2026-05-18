import venues from './data/venues.json';
import matches from './data/matches.json';
import revenueData from './data/revenue.json';

/**
 * Lấy danh sách các sân được đề xuất (rating >= 4.7)
 */
export const getRecommendedVenues = async () => {
  // Giả lập độ trễ mạng
  await new Promise(resolve => setTimeout(resolve, 300));
  return venues.filter(v => v.rating >= 4.7);
};

/**
 * Lấy thông tin chi tiết của một sân theo ID
 * @param {number} id 
 */
export const getVenueDetails = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const venue = venues.find(v => v.id === parseInt(id));
  return venue || null;
};

/**
 * Lấy danh sách các trận đấu đang diễn ra/sắp tới
 */
export const getLiveMatches = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return matches;
};

/**
 * Lấy dữ liệu doanh thu cho chủ sân
 */
export const getRevenueData = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return revenueData;
};
