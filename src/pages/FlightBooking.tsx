import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Star, ArrowRight } from 'lucide-react';
import { destinations } from '../data/mockData';
import SearchFilter from '../components/SearchFilter';

interface Flight {
  airline: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
}

// Sample flights
const sampleFlights: Flight[] = [
  {
    airline: 'Airways A',
    from: 'New York',
    to: 'London',
    departure: '10:00',
    arrival: '22:00',
    duration: '12h',
    price: '$550',
  },
  {
    airline: 'Airways B',
    from: 'New York',
    to: 'Paris',
    departure: '14:00',
    arrival: '02:00',
    duration: '12h',
    price: '$600',
  },
  {
    airline: 'Airways C',
    from: 'Los Angeles',
    to: 'Tokyo',
    departure: '18:00',
    arrival: '06:00',
    duration: '12h',
    price: '$800',
  },
];

const FlightBooking: React.FC = () => {
  const [tripType, setTripType] = useState<'oneway' | 'round'>('oneway');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [filteredFlights, setFilteredFlights] = useState(sampleFlights);

  // Destination search & filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ priceRange: '', duration: '' });

  const filterOptions = {
    priceRange: ['Under $1000', '$1000-$1500', '$1500-$2000', 'Over $2000'],
    duration: ['5-7 days', '8-10 days', '10+ days'],
  };

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesSearch =
        destination.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesPriceRange =
        !filters.priceRange ||
        (() => {
          const price = destination.price;
          switch (filters.priceRange) {
            case 'Under $1000':
              return price < 1000;
            case '$1000-$1500':
              return price >= 1000 && price <= 1500;
            case '$1500-$2000':
              return price >= 1500 && price <= 2000;
            case 'Over $2000':
              return price > 2000;
            default:
              return true;
          }
        })();

      const matchesDuration =
        !filters.duration ||
        (() => {
          const duration = destination.duration;
          switch (filters.duration) {
            case '5-7 days':
              return (
                duration.includes('5') ||
                duration.includes('6') ||
                duration.includes('7')
              );
            case '8-10 days':
              return (
                duration.includes('8') ||
                duration.includes('9') ||
                duration.includes('10')
              );
            case '10+ days':
              return parseInt(duration) > 10;
            default:
              return true;
          }
        })();

      return matchesSearch && matchesPriceRange && matchesDuration;
    });
  }, [searchTerm, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ priceRange: '', duration: '' });
  };

  // Flight search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = sampleFlights.filter(
      (f) =>
        (from === '' || f.from.toLowerCase().includes(from.toLowerCase())) &&
        (to === '' || f.to.toLowerCase().includes(to.toLowerCase()))
    );
    setFilteredFlights(filtered);
  };

  // Booking webhook
  const handleBooking = async (flight: Flight) => {
    if (
      !from ||
      !to ||
      !departureDate ||
      (tripType === 'round' && !returnDate)
    ) {
      alert('Please fill all fields before booking!');
      return;
    }

    try {
      const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL'; // Replace with actual URL
      const payload = {
        content: `New Flight Booking!\nAirline: ${
          flight.airline
        }\nFrom: ${from}\nTo: ${to}\nDeparture: ${departureDate}${
          tripType === 'round' ? `\nReturn: ${returnDate}` : ''
        }\nPrice: ${flight.price}`,
      };
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        alert('Booking successful! Notification sent.');
      } else {
        console.error(await response.text());
        alert('Booking failed. Check webhook.');
      }
    } catch (error) {
      console.error('Webhook error:', error);
      alert('Booking failed. Check console.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 p-8 flex flex-col items-center">
      {/* Flight Booking Header */}
      <h1 className="text-5xl font-bold mb-6 text-blue-700 dark:text-blue-400">
        Flight Booking
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8 text-center">
        Find the best flight deals, flexible schedules, and easy booking options
        for your next journey.
      </p>

      {/* Flight Search */}
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Search Flights
        </h2>
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              tripType === 'oneway'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setTripType('oneway')}
          >
            One-way
          </button>
          <button
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              tripType === 'round'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setTripType('round')}
          >
            Round-trip
          </button>
        </div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700"
          />
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700"
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700"
          />
          {tripType === 'round' && (
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700"
            />
          )}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
          >
            Search Flights
          </button>
        </form>
      </div>

      {/* Flight Options */}
      <div className="w-full max-w-4xl grid gap-6 mb-12">
        {filteredFlights.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300 text-center">
            No flights found.
          </p>
        ) : (
          filteredFlights.map((flight, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {flight.airline}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {flight.from} → {flight.to}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {flight.departure} - {flight.arrival} ({flight.duration})
                </p>
                <p className="text-gray-600 dark:text-gray-300 font-semibold">
                  {flight.price}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end">
                <button
                  onClick={() => handleBooking(flight)}
                  className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Featured Destinations Section */}
      <div className="w-full max-w-7xl">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Featured Destinations
        </h2>
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          onClearFilters={clearFilters}
          placeholder="Search destinations..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {destination.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {destination.shortDescription}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {destination.duration}
                  </div>
                  <Link
                    to="/booking"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to="/" className="mt-12 text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
};

export default FlightBooking;
