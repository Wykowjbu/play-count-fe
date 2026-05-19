import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import BusinessLayout from './layouts/BusinessLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import RegisterOwner from './pages/Auth/RegisterOwner';
import VenueDetails from './pages/Venues/VenueDetails';
import FindCourts from './pages/Venues/FindCourts';
import Matches from './pages/Matches';
import Leaderboard from './pages/Leaderboard';
import InfoPage from './pages/InfoPage';
import Revenue from './pages/Business/Revenue';
import Courts from './pages/Business/Courts';
import Bookings from './pages/Business/Bookings';
import Analytics from './pages/Business/Analytics';
import Settings from './pages/Business/Settings';
import ProfileDetail from './pages/Profile/ProfileDetail';
import ProfileBookings from './pages/Profile/ProfileBookings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-courts" element={<FindCourts />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile/detail" element={<ProfileDetail />} />
          <Route path="/profile/bookings" element={<ProfileBookings />} />
          <Route path="/help-center" element={<InfoPage />} />
          <Route path="/privacy-policy" element={<InfoPage />} />
          <Route path="/terms-of-service" element={<InfoPage />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
        </Route>

        {/* Business Routes */}
        <Route element={<BusinessLayout />}>
          <Route path="/business/dashboard" element={<Revenue />} />
          <Route path="/business/revenue" element={<Revenue />} />
          <Route path="/business/courts" element={<Courts />} />
          <Route path="/business/bookings" element={<Bookings />} />
          <Route path="/business/analytics" element={<Analytics />} />
          <Route path="/business/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
