import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, Check, Star, DollarSign } from 'lucide-react';
import { destinations } from '../data/mockData';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // ✅ Fix: ensure ID matches (string vs number)
  const destination = destinations.find(d => d.id.toString() === id);

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Destination not found</h1>
          <Link to="/destinations" className="text-blue-600 hover:text-blue-800">
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link 
              to="/destinations" 
              className="inline-flex items-center text-white hover:text-gray-300 mb-6 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Destinations
            </Link>
            <h1 className="text-5xl font-bold text-white mb-4">{destination.title}</h1>
            <div className="flex items-center text-white text-lg">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="mr-6">Premium Destination</span>
              <Clock className="h-5 w-5 mr-2" />
              <span>{destination.duration}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">About This Destination</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">{destination.fullDescription}</p>
                
                {/* Gallery */}
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.gallery.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${destination.title} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    />
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Detailed Itinerary</h3>
                <div className="space-y-4">
                  {destination.itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
                      <p className="text-gray-700 font-medium">{day}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.included.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-xl shadow-lg sticky top-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-2 text-gray-600">(4.9/5 rating)</span>
                  </div>
                  <div className="flex items-center justify-center text-3xl font-bold text-blue-600">
                    <DollarSign className="h-8 w-8" />
                    {destination.price}
                  </div>
                  <p className="text-gray-500">per person</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">Duration</span>
                    </div>
                    <span className="font-medium">{destination.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">Group Size</span>
                    </div>
                    <span className="font-medium">Max 20</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">Type</span>
                    </div>
                    <span className="font-medium">Premium Tour</span>
                  </div>
                </div>

                {/* ✅ Updated Book Button with destinationId */}
                <div className="space-y-4">
                  <Link
                    to={`/booking?destinationId=${destination.id}`}
                    className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-center block"
                  >
                    Book This Trip
                  </Link>
                  <Link
                    to="/contact"
                    className="w-full px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors text-center block"
                  >
                    Get Custom Quote
                  </Link>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Free cancellation up to 24 hours before departure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
