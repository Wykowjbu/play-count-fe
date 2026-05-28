import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import BusinessLayout from './layouts/BusinessLayout';
import AdminLayout from './layouts/AdminLayout';
import PlayerProfileLayout from './layouts/PlayerProfileLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import RegisterOwner from './pages/Auth/RegisterOwner';
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyOtp from './pages/Auth/VerifyOtp';
import VenueDetails from './pages/Venues/VenueDetails';
import FindCourts from './pages/Venues/FindCourts';
import Matches from './pages/Matches';
import MatchDetails from './pages/MatchDetails';
import Leaderboard from './pages/Leaderboard';
import InfoPage from './pages/InfoPage';
import Revenue from './pages/Business/Revenue';
import BusinessVenues from './pages/Business/Venues';
import Courts from './pages/Business/Courts';
import Bookings from './pages/Business/Bookings';
import Analytics from './pages/Business/Analytics';
import Payments from './pages/Business/Payments';
import Settings from './pages/Business/Settings';
import ProfileDetail from './pages/Profile/ProfileDetail';
import ProfileBookings from './pages/Profile/ProfileBookings';
import BookingDetail from './pages/Profile/BookingDetail';
import Favorites from './pages/Profile/Favorites';
import Notifications from './pages/Profile/Notifications';
import ProfileSecurity from './pages/Profile/ProfileSecurity';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/Users';
import AdminOwners from './pages/Admin/Owners';
import AdminCatalog from './pages/Admin/Catalog';
import AdminReviews from './pages/Admin/Reviews';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-courts" element={<FindCourts />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/matches/:id" element={<MatchDetails />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/help-center" element={<InfoPage />} />
          <Route path="/privacy-policy" element={<InfoPage />} />
          <Route path="/terms-of-service" element={<InfoPage />} />
          <Route path="/profile" element={<PlayerProfileLayout />}>
            <Route path="detail" element={<ProfileDetail />} />
            <Route path="bookings" element={<ProfileBookings />} />
            <Route path="bookings/:id" element={<BookingDetail />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="security" element={<ProfileSecurity />} />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Route>

        {/* Business Routes */}
        <Route element={<BusinessLayout />}>
          <Route path="/business/dashboard" element={<Revenue />} />
          <Route path="/business/revenue" element={<Revenue />} />
          <Route path="/business/venues" element={<BusinessVenues />} />
          <Route path="/business/courts" element={<Courts />} />
          <Route path="/business/bookings" element={<Bookings />} />
          <Route path="/business/analytics" element={<Analytics />} />
          <Route path="/business/payments" element={<Payments />} />
          <Route path="/business/settings" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/owners" element={<AdminOwners />} />
          <Route path="/admin/catalog" element={<AdminCatalog />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
