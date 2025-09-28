import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface TourService {
  name: string;
  description: string;
  languages: string[];
  price: string;
}

const tourServices: TourService[] = [
  {
    name: 'City Explorer',
    description: 'Discover the city’s landmarks and hidden gems in a day.',
    languages: ['English', 'Spanish', 'French'],
    price: '$50',
  },
  {
    name: 'Nature Hike',
    description: 'Guided nature trails with scenic views.',
    languages: ['English', 'French'],
    price: '$70',
  },
  {
    name: 'Food & Culture Tour',
    description: 'Taste local cuisine while exploring culture.',
    languages: ['English', 'Spanish'],
    price: '$60',
  },
];

const TourGuide: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [language, setLanguage] = useState('');
  const [filteredServices, setFilteredServices] =
    useState<TourService[]>(tourServices);

  // Filter function
  const handleSearch = () => {
    const filtered = tourServices.filter(
      (service) =>
        (language === '' || service.languages.includes(language)) &&
        (destination === '' ||
          service.name.toLowerCase().includes(destination.toLowerCase()))
    );
    setFilteredServices(filtered);
  };

  // Webhook function (Discord)
  const sendWebhook = async (service: TourService) => {
    try {
      await fetch(
        'https://discord.com/api/webhooks/1409817034790928444/Ravs4YKVFBI9oWpTH1KJxMprpS2Epq6G1-P4yalemV7vqhDlgNTwZiY-7gv_wJ2TIlME',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `New Tour Booking!\nService: ${service.name}\nDestination: ${destination}\nDate: ${date}\nLanguage: ${language}`,
          }),
        }
      );
      alert('Booking successful! Notification sent.');
    } catch (error) {
      console.error('Webhook error:', error);
      alert('Booking failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 p-8 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-6 text-green-700 dark:text-green-400">
        Tour Guide Services
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8 text-center">
        Personalized tours with expert local guides. Explore hidden gems and
        iconic landmarks with ease.
      </p>

      {/* Search / Filter Section */}
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Search Tours
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700"
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all"
        >
          Search
        </button>
      </div>

      {/* Tour Services */}
      <div className="w-full max-w-4xl grid gap-6">
        {filteredServices.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300 text-center">
            No tours found.
          </p>
        ) : (
          filteredServices.map((service, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {service.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Languages: {service.languages.join(', ')}
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end">
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {service.price}
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all"
                  onClick={() => sendWebhook(service)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Link to="/" className="mt-8 text-green-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
};

export default TourGuide;
