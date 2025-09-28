import React, { useState, useEffect } from 'react';
import { MapPin, Check } from 'lucide-react';
import { destinations } from '../data/mockData';
import { supabase } from '../supabaseClient';

// Loader Component
const LoaderScreen: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div>
      <p className="mt-6 text-lg text-white animate-pulse">Loading your adventure...</p>
    </div>
  </div>
);

const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedTour: '',
    date: '',
    numberOfPeople: '2',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulate loader on initial mount
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2s loader
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const selectedDestination = destinations.find(d => d.id === formData.selectedTour);
    const totalPrice = selectedDestination
      ? selectedDestination.price * parseInt(formData.numberOfPeople)
      : 0;

    const { error } = await supabase.from('bookings').insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        selected_tour: formData.selectedTour,
        date: formData.date,
        number_of_people: parseInt(formData.numberOfPeople),
        special_requests: formData.specialRequests,
        total_price: totalPrice,
      }
    ]);

    if (error) {
      console.error('Booking error:', error);
      setErrorMessage('Failed to submit booking. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const selectedDestination = destinations.find(d => d.id === formData.selectedTour);
  const totalPrice = selectedDestination ? selectedDestination.price * parseInt(formData.numberOfPeople) : 0;

  if (loading) return <LoaderScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated Hero Section */}
      <section className="relative h-[32rem] flex items-center justify-center overflow-hidden">
        {/* Background Image with zoom effect */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 animate-slow-zoom"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg animate-fade-up">
            Discover <span className="text-blue-400">Unforgettable Journeys</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-up delay-200">
            Book once, remember forever. Your dream adventure begins here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
            <a
              href="#booking-form"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Start Booking
            </a>
            <a
              href="#destinations"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Explore Tours
            </a>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <div className="bg-white p-12 rounded-xl shadow-lg text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for your booking! We've received your request and will contact you within 24 hours 
                to confirm the details and arrange payment.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-gray-600">Name:</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tour:</p>
                    <p className="font-medium">{selectedDestination?.title || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date:</p>
                    <p className="font-medium">{formData.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">People:</p>
                    <p className="font-medium">{formData.numberOfPeople}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total:</p>
                    <p className="font-medium text-blue-600">${totalPrice}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    selectedTour: '',
                    date: '',
                    numberOfPeople: '2',
                    specialRequests: ''
                  });
                }}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">Complete Your Booking</h2>
                  
                  {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{errorMessage}</div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Tour Selection */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Tour Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="selectedTour" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Tour *
                          </label>
                          <select
                            id="selectedTour"
                            name="selectedTour"
                            required
                            value={formData.selectedTour}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Choose a destination</option>
                            {destinations.map((destination) => (
                              <option key={destination.id} value={destination.id}>
                                {destination.title} - ${destination.price}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-2">
                          Number of People *
                        </label>
                        <select
                          id="numberOfPeople"
                          name="numberOfPeople"
                          required
                          value={formData.numberOfPeople}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num.toString()}>{num} {num === 1 ? 'person' : 'people'}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        rows={4}
                        value={formData.specialRequests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Any special dietary requirements, accessibility needs, or other requests..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center text-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Processing Booking...
                        </div>
                      ) : (
                        'Complete Booking'
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Summary</h3>
                  
                  {selectedDestination ? (
                    <div className="space-y-4">
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <img 
                          src={selectedDestination.image} 
                          alt={selectedDestination.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-lg">{selectedDestination.title}</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price per person:</span>
                          <span className="font-medium">${selectedDestination.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Number of people:</span>
                          <span className="font-medium">{formData.numberOfPeople}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{selectedDestination.duration}</span>
                        </div>
                        {formData.date && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium">{formData.date}</span>
                          </div>
                        )}
                        <div className="border-t pt-3 flex justify-between text-lg font-bold text-blue-600">
                          <span>Total:</span>
                          <span>${totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Select a tour to see pricing details</p>
                    </div>
                  )}
                  
                  <div className="mt-6 text-xs text-gray-500 space-y-2">
                    <p>• Free cancellation up to 24 hours before departure</p>
                    <p>• All taxes and fees included</p>
                    <p>• Confirmation within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Booking;
