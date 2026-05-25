const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

const ownerVenues = [
  {
    id: 11,
    name: 'PlayCourt Son Tra',
    district: 'Son Tra',
    address: '12 Ngo Quyen, Son Tra, Da Nang',
    phone: '0908 111 222',
    status: 'Published',
    rating: 4.9,
    images: 8,
    amenities: ['Parking', 'Shower', 'Racket rental', 'Cafe'],
    openingHours: [
      { day: 'Mon - Fri', hours: '05:30 - 22:30' },
      { day: 'Sat - Sun', hours: '06:00 - 23:00' },
    ],
    courts: [
      { id: 101, name: 'Pickleball A1', sport: 'Pickleball', type: 'Outdoor', basePrice: 150000, status: 'Available' },
      { id: 102, name: 'Pickleball A2', sport: 'Pickleball', type: 'Outdoor', basePrice: 150000, status: 'Booked' },
      { id: 103, name: 'Tennis T1', sport: 'Tennis', type: 'Hard court', basePrice: 220000, status: 'Maintenance' },
    ],
    pricingRules: [
      { id: 'PR-01', name: 'Weekday evening peak', days: 'Mon-Fri', time: '17:00 - 21:00', price: 180000, priority: 10 },
      { id: 'PR-02', name: 'Weekend morning', days: 'Sat-Sun', time: '06:00 - 10:00', price: 200000, priority: 8 },
    ],
    blockedSlots: [
      { id: 'MT-01', court: 'Tennis T1', time: '2026-05-26 13:00 - 16:00', reason: 'Surface repair' },
      { id: 'MT-02', court: 'Pickleball A2', time: '2026-05-28 09:00 - 10:00', reason: 'Lighting inspection' },
    ],
  },
  {
    id: 12,
    name: 'Han River Badminton Hub',
    district: 'Hai Chau',
    address: '44 Bach Dang, Hai Chau, Da Nang',
    phone: '0912 555 777',
    status: 'Review',
    rating: 4.7,
    images: 5,
    amenities: ['Parking', 'Locker', 'Water station'],
    openingHours: [{ day: 'Daily', hours: '05:00 - 22:00' }],
    courts: [
      { id: 201, name: 'Badminton B1', sport: 'Badminton', type: 'PVC', basePrice: 90000, status: 'Available' },
      { id: 202, name: 'Badminton B2', sport: 'Badminton', type: 'PVC', basePrice: 90000, status: 'Available' },
    ],
    pricingRules: [
      { id: 'PR-03', name: 'Student afternoon', days: 'Mon-Fri', time: '13:00 - 16:00', price: 70000, priority: 6 },
    ],
    blockedSlots: [],
  },
];

const ownerBookings = [
  {
    id: 'BK-2601',
    customer: 'Minh Tran',
    customerPhone: '0901 234 567',
    venue: 'PlayCourt Son Tra',
    court: 'Pickleball A1',
    time: '2026-05-25 18:00 - 19:00',
    amount: 180000,
    status: 'Confirmed',
    source: 'App booking',
  },
  {
    id: 'BK-2602',
    customer: 'Linh Pham',
    customerPhone: '0902 345 678',
    venue: 'PlayCourt Son Tra',
    court: 'Pickleball A2',
    time: '2026-05-25 19:00 - 20:00',
    amount: 180000,
    status: 'PendingVerification',
    source: 'Payment proof',
  },
  {
    id: 'BK-2603',
    customer: 'Bao Hoang',
    customerPhone: '0903 456 789',
    venue: 'Han River Badminton Hub',
    court: 'Badminton B1',
    time: '2026-05-26 07:00 - 08:00',
    amount: 90000,
    status: 'Held',
    source: 'Phone booking',
  },
];

const bookingDetails = [
  {
    id: 'BK-2401',
    venueName: 'Pickleball Center Quan 7',
    venueId: 2,
    courtName: 'Court 1',
    sport: 'Pickleball',
    date: '2026-05-20',
    time: '18:00 - 19:00',
    status: 'Confirmed',
    price: 150000,
    holdExpiresAt: '2026-05-20 17:45',
    paymentId: 'PAY-5101',
    paymentStatus: 'Verified',
    bankInfo: {
      bankName: 'VCB',
      accountNumber: '1012345678',
      accountName: 'PICKLEBALL CENTER Q7',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PAY-BK-2401',
    },
    timeline: [
      { label: 'Hold slot created', at: '2026-05-19 09:10', done: true },
      { label: 'Payment proof uploaded', at: '2026-05-19 09:18', done: true },
      { label: 'Owner verified payment', at: '2026-05-19 09:31', done: true },
      { label: 'Court ready for check-in', at: '2026-05-20 18:00', done: false },
    ],
  },
  {
    id: 'BK-2402',
    venueName: 'San Tennis Ngoi Sao',
    venueId: 3,
    courtName: 'Premium Court',
    sport: 'Tennis',
    date: '2026-05-22',
    time: '17:00 - 18:00',
    status: 'PendingVerification',
    price: 200000,
    holdExpiresAt: '2026-05-22 16:45',
    paymentId: 'PAY-5102',
    paymentStatus: 'PendingVerification',
    bankInfo: {
      bankName: 'MB Bank',
      accountNumber: '8899001122',
      accountName: 'SAN TENNIS NGOI SAO',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PAY-BK-2402',
    },
    timeline: [
      { label: 'Hold slot created', at: '2026-05-21 15:05', done: true },
      { label: 'Payment proof uploaded', at: '2026-05-21 15:11', done: true },
      { label: 'Owner payment verification', at: 'Waiting for owner', done: false },
      { label: 'Booking confirmed', at: 'After verification', done: false },
    ],
  },
  {
    id: 'BK-2398',
    venueName: 'San Cau Long Binh Minh',
    venueId: 1,
    courtName: 'Court 3',
    sport: 'Badminton',
    date: '2026-05-16',
    time: '19:00 - 20:00',
    status: 'Confirmed',
    price: 80000,
    holdExpiresAt: '2026-05-16 18:45',
    paymentId: 'PAY-5098',
    paymentStatus: 'Verified',
    bankInfo: {
      bankName: 'ACB',
      accountNumber: '5566778899',
      accountName: 'SAN CAU LONG BINH MINH',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PAY-BK-2398',
    },
    timeline: [
      { label: 'Hold slot created', at: '2026-05-15 12:20', done: true },
      { label: 'Payment proof uploaded', at: '2026-05-15 12:29', done: true },
      { label: 'Owner verified payment', at: '2026-05-15 12:45', done: true },
      { label: 'Booking completed', at: '2026-05-16 20:00', done: true },
    ],
  },
];

const ownerPayments = [
  {
    id: 'PAY-5102',
    bookingId: 'BK-2402',
    customer: 'Nguyen Van Nguoi Choi',
    venue: 'San Tennis Ngoi Sao',
    amount: 200000,
    transferNote: 'BK-2402 tennis premium',
    status: 'PendingVerification',
    uploadedAt: '2026-05-21 15:11',
  },
  {
    id: 'PAY-5101',
    bookingId: 'BK-2401',
    customer: 'Nguyen Van Nguoi Choi',
    venue: 'Pickleball Center Quan 7',
    amount: 150000,
    transferNote: 'BK-2401 pickleball',
    status: 'Verified',
    uploadedAt: '2026-05-19 09:18',
  },
  {
    id: 'PAY-5099',
    bookingId: 'BK-2398',
    customer: 'Thao Le',
    venue: 'PlayCourt Son Tra',
    amount: 180000,
    transferNote: 'Wrong amount',
    status: 'Rejected',
    uploadedAt: '2026-05-18 20:44',
  },
];

const transactions = [
  { id: 'TX-9001', date: '2026-05-25', venue: 'PlayCourt Son Tra', type: 'Booking', amount: 180000, status: 'Verified' },
  { id: 'TX-9002', date: '2026-05-24', venue: 'Han River Badminton Hub', type: 'Booking', amount: 90000, status: 'Verified' },
  { id: 'TX-9003', date: '2026-05-24', venue: 'PlayCourt Son Tra', type: 'Refund', amount: -150000, status: 'Completed' },
  { id: 'TX-9004', date: '2026-05-23', venue: 'PlayCourt Son Tra', type: 'Booking', amount: 220000, status: 'Verified' },
];

const occupancy = [
  { label: 'Mon', value: 64 },
  { label: 'Tue', value: 72 },
  { label: 'Wed', value: 58 },
  { label: 'Thu', value: 81 },
  { label: 'Fri', value: 93 },
  { label: 'Sat', value: 96 },
  { label: 'Sun', value: 89 },
];

const notifications = [
  { id: 1, title: 'Payment verified', body: 'BK-2401 has been confirmed by Pickleball Center Quan 7.', type: 'Payment', unread: true, createdAt: '10 min ago' },
  { id: 2, title: 'Join request approved', body: 'Hoang Long approved your request for Intermediate Pickleball.', type: 'Matchmaking', unread: true, createdAt: '42 min ago' },
  { id: 3, title: 'Booking reminder', body: 'Tennis Premium Court starts tomorrow at 17:00.', type: 'Booking', unread: false, createdAt: 'Yesterday' },
  { id: 4, title: 'Favorite venue discount', body: 'PlayCourt Son Tra added a weekday evening promotion.', type: 'Suggestion', unread: false, createdAt: '2 days ago' },
];

const favoriteVenues = [
  { id: 2, name: 'Pickleball Center Quan 7', district: 'Quan 7', sport: 'Pickleball', rating: 4.9, pricePerHour: 150000, reason: 'Booked 8 times' },
  { id: 3, name: 'San Tennis Ngoi Sao', district: 'Quan 2', sport: 'Tennis', rating: 4.7, pricePerHour: 200000, reason: 'Similar skill players nearby' },
  { id: 1, name: 'San Cau Long Binh Minh', district: 'Quan 9', sport: 'Badminton', rating: 4.8, pricePerHour: 80000, reason: 'Best value this week' },
];

const matchDetails = [
  {
    id: 1,
    title: 'Giao luu cau long Quan 9',
    sport: 'Badminton',
    venueName: 'San Cau Long Binh Minh',
    courtName: 'Court 3',
    scheduleTime: '2026-05-25 17:00 - 19:00',
    skillLevel: 'Intermediate',
    status: 'Open',
    maxPlayers: 4,
    pricePerPerson: 80000,
    host: { name: 'Anh Tuan', avatarUrl: 'https://i.pravatar.cc/150?u=101', rating: 4.8 },
    participants: [
      { id: 101, name: 'Anh Tuan', role: 'Host' },
      { id: 102, name: 'Minh Tuyet', role: 'Player' },
    ],
    joinRequests: [
      { id: 'REQ-01', name: 'Gia Bao', message: 'I can play doubles and arrive 15 minutes early.', status: 'Pending' },
      { id: 'REQ-02', name: 'Thanh Lam', message: 'Intermediate level, flexible position.', status: 'Pending' },
    ],
    invitations: [
      { id: 'INV-01', name: 'Quoc Huy', status: 'Sent' },
      { id: 'INV-02', name: 'Hoang Long', status: 'Declined' },
    ],
  },
  {
    id: 2,
    title: 'Pickleball for Beginners',
    sport: 'Pickleball',
    venueName: 'Pickleball Center Quan 7',
    courtName: 'Court 1',
    scheduleTime: '2026-05-25 18:30 - 20:00',
    skillLevel: 'Beginner',
    status: 'Open',
    maxPlayers: 4,
    pricePerPerson: 95000,
    host: { name: 'Hoang Long', avatarUrl: 'https://i.pravatar.cc/150?u=103', rating: 4.6 },
    participants: [{ id: 103, name: 'Hoang Long', role: 'Host' }],
    joinRequests: [
      { id: 'REQ-03', name: 'Mai Anh', message: 'New player, looking for a friendly match.', status: 'Pending' },
    ],
    invitations: [{ id: 'INV-03', name: 'Linh Pham', status: 'Accepted' }],
  },
];

const adminStats = {
  users: 2840,
  activeOwners: 42,
  pendingKyc: 6,
  monthlyGmv: 428000000,
  hiddenReviews: 3,
};

const adminUsers = [
  { id: 1, name: 'Nguyen Van Nguoi Choi', email: 'player@gmail.com', role: 'Player', status: 'Active', joined: '2025-08-12' },
  { id: 2, name: 'Court Manager', email: 'owner@playcourt.vn', role: 'Owner', status: 'Active', joined: '2025-11-03' },
  { id: 3, name: 'Spam Account', email: 'spam@example.com', role: 'Player', status: 'Banned', joined: '2026-02-14' },
  { id: 4, name: 'Venue Candidate', email: 'candidate@venue.vn', role: 'Player', status: 'KYC Pending', joined: '2026-05-18' },
];

const pendingOwners = [
  { id: 'KYC-01', owner: 'Venue Candidate', business: 'Hai Chau Tennis Lab', submittedAt: '2026-05-24', documents: 4, status: 'Review' },
  { id: 'KYC-02', owner: 'Pham Minh', business: 'Lien Chieu Pickleball', submittedAt: '2026-05-23', documents: 5, status: 'Review' },
  { id: 'KYC-03', owner: 'Le Thao', business: 'My Khe Badminton', submittedAt: '2026-05-22', documents: 3, status: 'Needs note' },
];

const catalog = {
  sports: [
    { id: 1, name: 'Pickleball', iconUrl: 'sports_tennis', description: 'Fast-growing paddle sport', status: 'Active' },
    { id: 2, name: 'Tennis', iconUrl: 'sports_tennis', description: 'Singles and doubles courts', status: 'Active' },
    { id: 3, name: 'Badminton', iconUrl: 'sports', description: 'Indoor shuttle sport', status: 'Active' },
  ],
  amenities: [
    { id: 1, name: 'Parking', iconUrl: 'local_parking', status: 'Active' },
    { id: 2, name: 'Shower', iconUrl: 'shower', status: 'Active' },
    { id: 3, name: 'Racket rental', iconUrl: 'sports_tennis', status: 'Active' },
    { id: 4, name: 'Cafe', iconUrl: 'local_cafe', status: 'Active' },
  ],
};

const moderationReviews = [
  { id: 'RV-01', venue: 'San Tennis Ngoi Sao', author: 'Bao Hoang', rating: 1, status: 'Flagged', reason: 'Owner reports abusive language' },
  { id: 'RV-02', venue: 'PlayCourt Son Tra', author: 'Anon Player', rating: 2, status: 'Hidden', reason: 'Spam / unrelated content' },
  { id: 'RV-03', venue: 'Han River Badminton Hub', author: 'Mai Anh', rating: 5, status: 'Visible', reason: 'Normal review' },
];

export const getOwnerVenues = async () => {
  await delay();
  return ownerVenues;
};

export const getOwnerBookings = async () => {
  await delay();
  return ownerBookings;
};

export const getBookingDetail = async (id) => {
  await delay();
  return bookingDetails.find((booking) => booking.id === id) || bookingDetails[0];
};

export const getOwnerPayments = async () => {
  await delay();
  return ownerPayments;
};

export const getTransactions = async () => {
  await delay();
  return transactions;
};

export const getOccupancyReport = async () => {
  await delay();
  return occupancy;
};

export const getNotifications = async () => {
  await delay();
  return notifications;
};

export const getFavoriteVenues = async () => {
  await delay();
  return favoriteVenues;
};

export const getMatchDetail = async (id) => {
  await delay();
  return matchDetails.find((match) => match.id === Number(id)) || matchDetails[0];
};

export const getAdminDashboard = async () => {
  await delay();
  return { stats: adminStats, users: adminUsers.slice(0, 3), pendingOwners: pendingOwners.slice(0, 2), reviews: moderationReviews.slice(0, 2) };
};

export const getAdminUsers = async () => {
  await delay();
  return adminUsers;
};

export const getPendingOwners = async () => {
  await delay();
  return pendingOwners;
};

export const getCatalog = async () => {
  await delay();
  return catalog;
};

export const getModerationReviews = async () => {
  await delay();
  return moderationReviews;
};
