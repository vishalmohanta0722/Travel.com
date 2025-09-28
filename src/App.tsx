import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';

import Contact from './pages/Contact';
import Booking from './pages/Booking';
import ChatWidget from './components/ChatWidget';
import ScrollButton from './components/ScrollButton';
import FlightBooking from './pages/FlightBooking';
import TourGuide from './pages/TourGuide';
import TravelInsurance from './pages/TravelInsurance';

import ServiceDetails from './components/ServiceDetails';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
       
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/chatwidget" element={<ChatWidget />} />
            <Route path="/flight-booking" element={<FlightBooking />} />
            <Route path="/tour-guide" element={<TourGuide />} />
            <Route path="/travel-insurance" element={<TravelInsurance />} />
             <Route path="/service/:id" element={<ServiceDetails />} />
          </Routes>
          {/* Scroll Button  visible on ALL pages */}
          <ScrollButton />
          {/* Chat Widget visible on ALL pages */}
          <ChatWidget />

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
