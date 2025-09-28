import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // for sending form data to webhook

const TravelInsurance: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    duration: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [insurancePlans, setInsurancePlans] = useState([
    { id: 1, name: 'Basic Plan', type: 'basic', price: '$20/day' },
    { id: 2, name: 'Standard Plan', type: 'standard', price: '$35/day' },
    { id: 3, name: 'Premium Plan', type: 'premium', price: '$50/day' },
  ]);

  // Filtered insurance options
  const filteredPlans = insurancePlans.filter(
    (plan) =>
      (filterType === 'all' || plan.type === filterType) &&
      plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Replace YOUR_WEBHOOK_URL with your actual URL
      await axios.post('YOUR_WEBHOOK_URL', formData);
      alert('Insurance request submitted successfully!');
      setFormData({ fullName: '', email: '', duration: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to submit. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-gray-900 p-8 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-6 text-purple-700 dark:text-purple-400">
        Travel Insurance
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8 text-center">
        Secure your journey with coverage for medical, cancellations, and lost
        luggage.
      </p>

      {/* Search & Filter Section */}
      <div className="w-full max-w-3xl mb-8">
        <input
          type="text"
          placeholder="Search Insurance Plans..."
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Plans</option>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </div>

      {/* Display filtered insurance plans */}
      <div className="w-full max-w-3xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {plan.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{plan.price}</p>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Get Your Insurance
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Travel Duration (days)"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all"
          >
            Get Insurance
          </button>
        </form>
      </div>

      <Link to="/" className="mt-4 text-purple-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
};

export default TravelInsurance;
