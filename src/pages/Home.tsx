import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  MapPin,
  Users,
  Calendar,
  Sparkles,
  Globe,
  Award,
  Shield,
  Plane,
  Camera,
} from 'lucide-react';
import { destinations } from '../data/mockData';
import { motion } from 'framer-motion';

import VideoModal from '../components/VideoModal';
import ScrollButton from '../components/ScrollButton';
import ChatWidget from '../components/ChatWidget';

const Home: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ✅ Loading state

  // ✅ Show loading screen for 1.2s when page first loads
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';

  // ✅ Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-yellow-400 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-200">Loading Home Page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* ✅ Existing Home component content */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
<section className="relative h-[47rem] flex items-center justify-center overflow-hidden">
  {/* Background with parallax effect */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
    style={{
      backgroundImage:
        "url(https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1600)",
    }}
  ></div>
  <div className="absolute inset-0 bg-black/40"></div>
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-black/70"></div>

  {/* Floating Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-10 w-24 h-24 bg-white/10 rounded-full blur-3xl animate-float"></div>
    <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-float-delayed"></div>
    <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 right-1/4 w-28 h-28 bg-yellow-400/10 rounded-full blur-2xl animate-float-slow"></div>
  </div>

  {/* Hero Content */}
  <motion.div
    className="relative z-10 text-center text-white px-4 max-w-6xl"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    {/* Badge */}
    <motion.div
      className="flex items-center justify-center mb-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <Sparkles className="h-10 w-10 text-yellow-400 mr-4 animate-pulse" />
      <span className="text-xl font-medium bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/30">
        ✈️ Premium Travel Experience Since 2010
      </span>
      <Sparkles className="h-10 w-10 text-yellow-400 ml-4 animate-pulse" />
    </motion.div>

    {/* Title */}
    <motion.h1
      className="text-7xl md:text-9xl font-bold mb-10 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      Discover the
      <span className="block text-yellow-400 animate-pulse">World</span>
    </motion.h1>

    {/* Subtitle */}
    <motion.p
      className="text-2xl md:text-4xl mb-16 leading-relaxed font-light max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      Embark on{" "}
      <span className="text-yellow-400 font-semibold">extraordinary journeys</span>{" "}
      with our expertly crafted travel experiences that create{" "}
      <span className="text-yellow-300 font-semibold">memories for a lifetime</span>.
    </motion.p>

    {/* CTA Buttons */}
    <motion.div
      className="flex flex-col sm:flex-row gap-8 justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.8 }}
    >
      <Link
        to="/booking"
        className="group px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all transform hover:scale-110 hover:shadow-2xl flex items-center justify-center text-xl border-2 border-white/20"
      >
        🚀 Book Your Adventure
        <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-2 transition-transform" />
      </Link>
      <button
        onClick={() => setIsVideoModalOpen(true)}
        className="group px-12 py-6 bg-white/10 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white hover:text-gray-900 transition-all text-xl flex items-center justify-center"
      >
        🎬 View Our Story
      </button>
    </motion.div>
  </motion.div>
</section>

      {/* Featured Destinations with Enhanced Design */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Featured Destinations
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Discover our most popular travel destinations with exclusive
                packages
              </p>
            </div>
          </div>

          <div
            id="destinations-scroll"
            className="flex gap-10 overflow-x-auto scrollbar-hide pb-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group flex-none w-96 bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg">
                    <div className="flex items-center text-sm font-bold text-blue-600">
                      <span className="text-xl">${destination.price}</span>
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 bg-yellow-400/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <div className="flex items-center text-sm font-bold text-gray-900">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        Premium Destination
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    {destination.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-2">
                    {destination.shortDescription}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {destination.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Camera className="h-4 w-4 mr-2" />
                      Photo Tours
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      to={`/destination/${destination.id}`}
                      className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-xl transition-all transform hover:scale-105 text-center"
                    >
                      View Details
                    </Link>
                    <Link
  to={`/booking?destinationId=${destination.id}`}
  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 text-center"
>
  Book Now
</Link>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Cards Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose TravelCo?
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience the difference with our premium travel services and
              unmatched attention to detail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
            <div className="group bg-blue-100 dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-5 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10">
                <Star className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Premium Service
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Exceptional service with 24/7 support and personalized attention
                to every detail of your journey.
              </p>
              <Link
                to="/about"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold inline-flex items-center group-hover:translate-x-2 transition-transform"
              >
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="group bg-green-100 dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-5 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10">
                <Globe className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Amazing Destinations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Explore breathtaking locations worldwide with our carefully
                curated destination packages.
              </p>
              <Link
                to="/destinations"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold inline-flex items-center group-hover:translate-x-2 transition-transform"
              >
                View Destinations <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="group bg-purple-100 dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-5 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full blur-2xl"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Expert Guides
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Professional local guides with extensive knowledge to make your
                experience truly memorable.
              </p>
              <Link
                to="/services"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold inline-flex items-center group-hover:translate-x-2 transition-transform"
              >
                Our Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="group bg-orange-100 dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-5 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-2xl"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Safe & Secure
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Travel with confidence knowing your safety and security are our
                top priorities.
              </p>
              <Link
                to="/booking"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-semibold inline-flex items-center group-hover:translate-x-2 transition-transform"
              >
                Book Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-white" />
              </div>
              <div className="text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                5K+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Happy Travelers
              </div>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <div className="text-5xl md:text-6xl font-bold text-green-600 dark:text-green-400 mb-2">
                20+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Destinations
              </div>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="h-10 w-10 text-white" />
              </div>
              <div className="text-5xl md:text-6xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                21
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Awards Won
              </div>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Plane className="h-10 w-10 text-white" />
              </div>
              <div className="text-5xl md:text-6xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                5
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Premium Services Section - With Images */}
<section className="relative py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
  {/* Decorative Floating Elements */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-blob-slow mix-blend-multiply"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-blob-slow mix-blend-multiply"></div>
  <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl animate-blob-slow mix-blend-multiply"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Our Premium Services
      </h2>
      <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Elevate your travel experience with services designed for luxury,
        convenience, and unforgettable memories.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Flight Booking */}
      <div className="relative group bg-purple-200 dark:bg-gray-800 rounded-3xl shadow-2xl p-10 overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105 hover:-translate-y-6">
        {/* Image Instead of Icon */}
        <img
          src="https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Flight Booking"
          className="w-full h-48 object-cover rounded-2xl mb-6 shadow-lg group-hover:scale-105 transition-transform"
        />
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Flight Booking
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Unlock the best flight deals with major airlines and flexible
          booking options.
        </p>
        <Link
          to="/flight-booking"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
        >
          Learn More <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Tour Guide Services */}
      <div className="relative group bg-green-100 dark:bg-gray-800 rounded-3xl shadow-2xl p-10 overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105 hover:-translate-y-6">
        <img
          src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Tour Guide Services"
          className="w-full h-48 object-cover rounded-2xl mb-6 shadow-lg group-hover:scale-105 transition-transform"
        />
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Tour Guide Services
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Expert local guides with in-depth knowledge, personalized tours,
          and multilingual support.
        </p>
        <Link
          to="/tour-guide"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
        >
          Learn More <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Travel Insurance */}
      <div className="relative group bg-pink-100 dark:bg-gray-800 rounded-3xl shadow-2xl p-10 overflow-hidden border border-pink-100 dark:border-gray-700 transition-transform hover:scale-105 hover:-translate-y-6">
        <img
          src="https://images.pexels.com/photos/417502/pexels-photo-417502.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Travel Insurance"
          className="w-full h-48 object-cover rounded-2xl mb-6 shadow-lg group-hover:scale-105 transition-transform"
        />
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Travel Insurance
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Complete coverage including medical, trip cancellations, lost
          luggage, and more.
        </p>
        <Link
          to="/travel-insurance"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
        >
          Learn More <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  </div>
</section>

     

      {/* Testimonials Section */}
     {/* Testimonials Section */}
<section className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden">
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        What Our Travelers Say
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 overflow-visible">
      {/* Testimonial Card 1 */}
      <div className="bg-purple-200 dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
        <img
          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Sarah Johnson"
          className="w-24 h-24 rounded-full border-4 border-gray-200 mb-4 shadow-lg object-cover"
        />
        <div className="flex items-center justify-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          "Absolutely incredible experience! The attention to detail and
          personalized service made our honeymoon unforgettable."
        </p>
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Raj Kumar</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Santorini Paradise Tour</p>
      </div>

      {/* Testimonial Card 2 */}
      <div className="bg-green-100 dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="David Chen"
          className="w-24 h-24 rounded-full border-4 border-gray-200 mb-4 shadow-lg object-cover"
        />
        <div className="flex items-center justify-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          "Professional guides, comfortable transportation, and amazing
          destinations. TravelCo exceeded all our expectations!"
        </p>
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
          Himanshu Yadav
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Swiss Alps Experience</p>
      </div>

      {/* Testimonial Card 3 */}
      <div className="bg-pink-100 dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
        <img
          src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Emma Rodriguez"
          className="w-24 h-24 rounded-full border-4 border-gray-200 mb-4 shadow-lg object-cover"
        />
        <div className="flex items-center justify-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          "From booking to return, everything was perfectly organized. The
          best travel company we've ever used!"
        </p>
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
          Sachin Yadav
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Bali Adventure Tour</p>
      </div>
    </div>

    {/* Read Our Story Button */}
    <div className="text-center mt-12">
      <Link
        to="/about"
        className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all transform hover:scale-105 hover:shadow-xl inline-flex items-center text-lg"
      >
        Read Our Story
        <ArrowRight className="ml-3 h-6 w-6" />
      </Link>
    </div>
  </div>
</section>



      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={videoUrl}
      />

      {/* Scroll Button */}
         <div className="overflow-x-hidden"></div>
      <ScrollButton />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
    </div>
  );
};

export default Home;
