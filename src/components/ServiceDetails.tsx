// src/pages/ServiceDetails.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { servicePackages } from "../data/servicesData";
import { ArrowLeft, DollarSign, Users, Star, Calendar, Tag } from "lucide-react";

const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = servicePackages.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500">Service not found</p>
        <Link to="/" className="text-blue-600 underline">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Button */}
      <Link to="/" className="flex items-center gap-2 text-blue-600 mb-6">
        <ArrowLeft className="h-5 w-5" />
        Back to Services
      </Link>

      {/* Title + Rating */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-4xl font-bold">{service.title}</h1>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.floor(service.rating) ? "fill-current" : ""}`}
              />
            ))}
          </div>
          <span className="font-semibold">{service.rating.toFixed(1)}</span>
          <span className="text-gray-500">({service.reviews} reviews)</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        {service.fullDescription}
      </p>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {service.gallery.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${service.title} ${i + 1}`}
            className="rounded-xl w-full h-64 object-cover shadow-md"
          />
        ))}
      </div>

      {/* Info Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow">
          <DollarSign className="h-6 w-6 text-green-600" />
          <div>
            <p className="font-semibold">Price Range</p>
            <p className="text-sm text-gray-600">
              {service.price.currency}{service.price.from} - {service.price.currency}{service.price.to} ({service.price.period})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow">
          <Users className="h-6 w-6 text-blue-600" />
          <div>
            <p className="font-semibold">Group Size</p>
            <p className="text-sm text-gray-600">
              {service.groupSize.min} - {service.groupSize.max} people
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow">
          <Calendar className="h-6 w-6 text-purple-600" />
          <div>
            <p className="font-semibold">Duration</p>
            <p className="text-sm text-gray-600">{service.duration}</p>
          </div>
        </div>
      </div>

      {/* Features + Highlights + Included */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div>
          <h2 className="text-xl font-semibold mb-3">Features</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {service.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Highlights</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {service.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Included</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {service.included.map((inc, i) => <li key={i}>{inc}</li>)}
          </ul>
        </div>
      </div>

      {/* Tags, Difficulty, Best Time */}
      <div className="flex flex-wrap gap-3 mb-12">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          Difficulty: {service.difficulty}
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          Best Time: {service.bestTime}
        </span>
        {service.tags.map((tag, i) => (
          <span key={i} className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm">
            <Tag className="h-4 w-4" /> {tag}
          </span>
        ))}
      </div>

      {/* Booking Button */}
      <Link
        to={`/booking?serviceId=${service.id}`}
        className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl"
      >
        Book Now
      </Link>
    </div>
  );
};

export default ServiceDetails;
