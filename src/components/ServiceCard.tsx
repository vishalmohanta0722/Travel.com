// src/components/ServiceCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  DollarSign,
  Gift,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { servicePackages } from "../data/servicesData";
// Match Supabase `services` table schema
export interface ServicePackage {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  price: {
    from: number;
    to: number;
    currency: string;
    period: string;
  };
  duration: string;
  groupSize: {
    min: number;
    max: number;
  };
  
  rating: number;
  reviews: number;
  features: string[];
  included: string[];
  highlights: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  bestTime: string;
  tags: string[];
  popular: boolean;
  discount?: number | any;
}
const ServiceCard: React.FC<ServicePackage & { index: number }> = ({ id, title, category, shortDescription, fullDescription, image, gallery, price, duration, groupSize, rating, reviews, features, included, highlights, difficulty, bestTime, tags, popular, discount, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const galleryImages = gallery && gallery.length > 0 ? gallery : image ? [image] : [];

  const nextImage = () => {
    if (!galleryImages.length) return;
    setCurrentImageIndex((i) => (i + 1) % galleryImages.length);
  };
  const prevImage = () => {
    if (!galleryImages.length) return;
    setCurrentImageIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Challenging":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      "Corporate Tours": "from-blue-500 to-blue-600",
      "Family Packages": "from-green-500 to-green-600",
      "Honeymoon Trips": "from-pink-500 to-pink-600",
      "Adventure Travel": "from-orange-500 to-orange-600",
      "Cultural Tours": "from-purple-500 to-purple-600",
      "Wellness Tours": "from-teal-500 to-teal-600",
    };
    return (category && colors[category]) || "from-gray-500 to-gray-600";
  };

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-700"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-pulse">
            <TrendingUp className="h-4 w-4" />
            POPULAR
          </div>
        </div>
      )}

      {/* Discount Badge */}
      {discount != null && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
            <Gift className="h-4 w-4" />
            {discount}% OFF
          </div>
        </div>
      )}

      {/* Image / Gallery */}
      <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={gallery[currentImageIndex] || image || "https://via.placeholder.com/800x500?text=No+Image"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* gallery controls (small, visible on hover) */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="prev"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              aria-label="next"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
            >
              ›
            </button>
          </>
        )}

        {/* Category Badge */}
        {category && (
          <div className="absolute bottom-4 left-4">
            <span
              className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(category)} text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm`}
            >
              {category}
            </span>
          </div>
        )}

        {/* Difficulty */}
        {difficulty && (
          <div className="absolute bottom-4 right-4">
            <span className={`px-3 py-1 ${getDifficultyColor(difficulty)} text-xs font-medium rounded-full shadow-lg backdrop-blur-sm`}>
              {difficulty}
            </span>
          </div>
        )}

        {/* Price Badge */}
        {(price?.from != null) && (
          <div className="absolute top-14 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg">
            <div className="flex items-center text-lg font-bold text-gray-800">
              <DollarSign className="h-5 w-5 mr-1 text-green-600" />
              <span className="text-green-600">{price.from}</span>
              {price.to != null && (
                <>
                  <span className="text-gray-400 mx-1">-</span>
                  <span className="text-green-600">{price.to}</span>
                </>
              )}
            </div>
            {price.period && (
              <p className="text-xs text-gray-600 text-center">{price.period}</p>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {shortDescription}
          </p>
        </div>

        {/* Rating */}
        {rating != null && (
          <div className="flex items-center justify-between mb-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(rating!) ? "fill-current" : ""}`}
                  />
                ))}
              </div>
              <span className="font-semibold">{Number(rating).toFixed(1)}</span>
            </div>
            <span className="text-gray-500">({reviews || 0} reviews)</span>
          </div>
        )}

        {/* Actions */}
       <div className="flex gap-3">
  <Link
    to={`/service/${id}`}
    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-2xl text-center text-sm transition transform hover:scale-102"
  >
    View Details
  </Link>

  <Link
    to={`/booking?serviceId=${id}`}
    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl"
  >
    Book Now
    <ArrowRight className="h-4 w-4" />
  </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
