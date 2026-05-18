import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import BusinessLayout from './layouts/BusinessLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import VenueDetails from './pages/Venues/VenueDetails';
import Matches from './pages/Matches';
import Revenue from './pages/Business/Revenue';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/matches" element={<Matches />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
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
