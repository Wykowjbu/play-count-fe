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
import Revenue from './pages/Business/Revenue';

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
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
        </Route>

        {/* Business Routes */}
        <Route element={<BusinessLayout />}>
          <Route path="/business/revenue" element={<Revenue />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
