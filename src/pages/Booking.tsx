import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Check, Calendar } from 'lucide-react';
import { servicePackages } from '../data/servicesData';
import { destinations } from '../data/mockData';
import { supabase } from '../supabaseClient';
import {motion} from 'framer-motion'

// ✅ Loader screen same as Contact page
const LoaderScreen: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-xl text-gray-600">Loading your adventure...</p>
    </div>
  </div>
);

interface FormData {
  name: string;
  email: string;
  phone: string;
  selectedItem: string;
  date: string;
  numberOfPeople: string;
  specialRequests: string;
}

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    selectedItem: '',
    date: '',
    numberOfPeople: '1',
    specialRequests: '',
  });
  const [selectedItemDetails, setSelectedItemDetails] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Detect serviceId or destinationId from URL
  useEffect(() => {
    const serviceId = searchParams.get('serviceId');
    const destinationId = searchParams.get('destinationId');

    if (serviceId) setFormData((prev) => ({ ...prev, selectedItem: serviceId }));
    if (destinationId) setFormData((prev) => ({ ...prev, selectedItem: destinationId }));

    // ✅ Same loader delay as Contact page
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Update selected item details whenever selection changes
  useEffect(() => {
    const service = servicePackages.find((s) => s.id === formData.selectedItem);
    const destination = destinations.find((d) => d.id === formData.selectedItem);
    setSelectedItemDetails(service || destination || null);
  }, [formData.selectedItem]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    if (!selectedItemDetails) {
      setErrorMessage('Please select a valid service or destination.');
      setIsSubmitting(false);
      return;
    }

    const price =
      selectedItemDetails.price?.from && selectedItemDetails.price?.to
        ? ((selectedItemDetails.price.from + selectedItemDetails.price.to) / 2) *
          parseInt(formData.numberOfPeople)
        : 0;

    const { error } = await supabase.from('bookings').insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        selected_item: formData.selectedItem,
        date: formData.date,
        number_of_people: parseInt(formData.numberOfPeople),
        special_requests: formData.specialRequests,
        total_price: price,
      },
    ]);

    if (error) {
      console.error(error);
      setErrorMessage('Failed to submit booking. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // ✅ Display the new loader
  if (loading) return <LoaderScreen />;

  const totalPrice =
    selectedItemDetails?.price?.from && selectedItemDetails?.price?.to
      ? ((selectedItemDetails.price.from + selectedItemDetails.price.to) / 2) *
        parseInt(formData.numberOfPeople)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
  {/* Booking Hero */}
<section className="relative h-[47rem] flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105 animate-slow-zoom"
    style={{
      backgroundImage:
        "url(https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=1600)",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-800/50 to-black/80"></div>
  </div>

  {/* Floating Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-24 left-12 w-24 h-24 bg-white/10 rounded-full blur-3xl animate-float"></div>
    <div className="absolute bottom-32 right-16 w-28 h-28 bg-blue-500/20 rounded-full blur-2xl animate-float-delayed"></div>
    <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-yellow-400/10 rounded-full blur-2xl animate-float-slow"></div>
  </div>

  {/* Content */}
  <motion.div
    className="relative z-10 text-center text-white px-6 max-w-4xl"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <motion.h1
      className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      Book Your{" "}
       <span className="block text-yellow-400 animate-pulse">
        Dream Adventure
      </span>
    </motion.h1>

    <motion.p
      className="text-xl md:text-2xl text-gray-200 mb-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      Select a service or destination and complete your booking seamlessly.
    </motion.p>

    {/* Call to Actions */}
    <motion.div
      className="flex flex-wrap gap-6 justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      <a
        href="/services"
        className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-110 hover:shadow-2xl transition-all text-lg"
      >
        🌍 Explore Services
      </a>
  <a
  href="#booking-form"
  className="px-10 py-5 bg-white/10 border border-white/30 text-white font-semibold rounded-2xl hover:bg-white hover:text-gray-900 transition-all text-lg"
>
  📅 Complete Booking
</a>
    </motion.div>
  </motion.div>
</section>


      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <div className="bg-white p-12 rounded-xl shadow-lg text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Thank you! We will contact you within 24 hours to confirm your booking.
              </p>

              {/* Summary */}
              {selectedItemDetails && (
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
                      <p className="text-gray-600">Item:</p>
                      <p className="font-medium">{selectedItemDetails.title}</p>
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
              )}

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    selectedItem: '',
                    date: '',
                    numberOfPeople: '1',
                    specialRequests: '',
                  });
                }}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">Complete Your Booking</h2>

                  {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{errorMessage}</div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Personal Info</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mt-4">
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Selection */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Select Item & Date</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                          name="selectedItem"
                          required
                          value={formData.selectedItem}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Choose a service or destination</option>
                          {servicePackages.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.title} - ${s.price.from} to ${s.price.to}
                            </option>
                          ))}
                          {destinations.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.title} - ${d.price}
                            </option>
                          ))}
                        </select>

                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="mt-4">
                        <select
                          name="numberOfPeople"
                          required
                          value={formData.numberOfPeople}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num.toString()}>
                              {num} {num === 1 ? 'person' : 'people'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <textarea
                        name="specialRequests"
                        placeholder="Special requests (optional)"
                        rows={4}
                        value={formData.specialRequests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center text-lg"
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

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
                  <h3 className="text-xl font-bold mb-6">Booking Summary</h3>

                  {selectedItemDetails ? (
                    <div className="space-y-4">
                      {selectedItemDetails.image && (
                        <div className="relative h-32 rounded-lg overflow-hidden">
                          <img
                            src={selectedItemDetails.image}
                            alt={selectedItemDetails.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <h4 className="font-semibold text-lg">{selectedItemDetails.title}</h4>
                      <div className="space-y-3 text-sm">
                        {selectedItemDetails.price && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price per person:</span>
                            <span className="font-medium">
                              ${selectedItemDetails.price.from
                                ? (selectedItemDetails.price.from + selectedItemDetails.price.to) / 2
                                : selectedItemDetails.price}
                            </span>
                          </div>
                        )}
                        {formData.numberOfPeople && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Number of people:</span>
                            <span className="font-medium">{formData.numberOfPeople}</span>
                          </div>
                        )}
                        {selectedItemDetails.duration && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{selectedItemDetails.duration} days</span>
                          </div>
                        )}
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
                      <p>Select a service or destination to see details</p>
                    </div>
                  )}

                  <div className="mt-6 text-xs text-gray-500 space-y-2">
                    <p>• Free cancellation up to 24 hours before start</p>
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
