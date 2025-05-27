import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdoptionForm from './pages/Adoption/AdoptionForm';
import Donation from './pages/Donation/Donation';
import Shop from './pages/Shop/Products';
import ProductDetail from './pages/Shop/ProductDetail';
import Cart from './pages/Shop/Cart';
import VetBooking from './pages/VetConsultation/Booking';
import VideoCall from './pages/VetConsultation/VideoCall';
import AIExpert from './pages/AIExpert/AIExpert';
import UserDashboard from './pages/Dashboard/User';
import AdminDashboard from './pages/Dashboard/Admin';
import NotFound from './pages/404';
import { AuthContext } from './contexts/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#ff6f00',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

  <Navbar />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/adopt" element={<AdoptionForm />} />
    <Route path="/donate" element={<Donation />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/shop/:id" element={<ProductDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/vet" element={<VetBooking />} />
    <Route path="/vet/call" element={<VideoCall />} />
    <Route path="/ai-expert" element={<AIExpert />} />
    <Route path="/dashboard" element={<UserDashboard />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  <Footer />


    </ThemeProvider>
  );
}

export default App;