import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  ArrowRight,
  Search,
  Filter,
  X,
  Eye,
  Heart,
  Share2,
  Award,
  Users,
  Calendar,
  TrendingUp,
  Target,
  Globe,
  Sparkles,
} from "lucide-react";
import { destinations } from "../data/mockData";
import ImageCarousel from "../components/ImageCarousel";
import Lightbox from "../components/Lightbox";
import { motion } from "framer-motion";

// ------------------- Types -------------------
interface Destination {
  id: string;
  title: string;
  price: number;
  duration: string;
  gallery: string[];
  shortDescription: string;
  rating?: number;
  reviews?: number;
  popular?: boolean;
  discount?: number | null;
  bestTime?: string;
  difficulty?: string;
}

interface Filters {
  priceRange: string;
  duration: string;
  rating: string;
}

const Destinations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    priceRange: "",
    duration: "",
    rating: "",
  });
  const [sortBy, setSortBy] = useState("popular");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [likedDestinations, setLikedDestinations] = useState<Set<string>>(
    new Set()
  );

  // Filter dropdown options
  const filterOptions = {
    priceRange: ["Under $1000", "$1000-$1500", "$1500-$2000", "Over $2000"],
    duration: ["5-7 days", "8-10 days", "10+ days"],
    rating: ["4.0+", "4.5+", "4.8+"],
  };

  // Enhance destinations with dynamic data
  const enhancedDestinations = useMemo(
    () =>
      destinations.map((dest) => ({
        ...dest,
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 500) + 100,
        popular: Math.random() > 0.6,
        discount: Math.random() > 0.7 ? Math.floor(Math.random() * 25) + 10 : null,
        bestTime: ["Spring", "Summer", "Fall", "Winter"][
          Math.floor(Math.random() * 4)
        ],
        difficulty: ["Easy", "Moderate", "Challenging"][
          Math.floor(Math.random() * 3)
        ],
      })),
    []
  );

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // ------------------- Filtering & Sorting Logic -------------------
  const filteredAndSortedDestinations = useMemo(() => {
    let filtered = enhancedDestinations.filter((destination) => {
      // Search Filter
      const matchesSearch =
        destination.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

      // Price Filter
      const matchesPriceRange = !filters.priceRange || (() => {
        const price = destination.price;
        switch (filters.priceRange) {
          case "Under $1000": return price < 1000;
          case "$1000-$1500": return price >= 1000 && price <= 1500;
          case "$1500-$2000": return price >= 1500 && price <= 2000;
          case "Over $2000": return price > 2000;
          default: return true;
        }
      })();

      // Duration Filter
      const matchesDuration = !filters.duration || (() => {
        const durationNumber = parseInt(destination.duration.replace(/\D/g, ""), 10);
        switch (filters.duration) {
          case "5-7 days": return durationNumber >= 5 && durationNumber <= 7;
          case "8-10 days": return durationNumber >= 8 && durationNumber <= 10;
          case "10+ days": return durationNumber > 10;
          default: return true;
        }
      })();

      // Rating Filter
      const matchesRating = !filters.rating || (() => {
        const rating = destination.rating ?? 0;
        switch (filters.rating) {
          case "4.0+": return rating >= 4.0;
          case "4.5+": return rating >= 4.5;
          case "4.8+": return rating >= 4.8;
          default: return true;
        }
      })();

      return matchesSearch && matchesPriceRange && matchesDuration && matchesRating;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular": return (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating! - a.rating!;
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return (b.rating ?? 0) - (a.rating ?? 0);
        case "duration":
          return parseInt(a.duration.replace(/\D/g, ""), 10) -
            parseInt(b.duration.replace(/\D/g, ""), 10);
        default: return 0;
      }
    });

    return filtered;
  }, [searchTerm, filters, sortBy, enhancedDestinations]);

  // ------------------- Handlers -------------------
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({ priceRange: "", duration: "", rating: "" });
    setSortBy("popular");
  };

  const toggleLike = (destinationId: string) => {
    setLikedDestinations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(destinationId)) {
        newSet.delete(destinationId);
      } else {
        newSet.add(destinationId);
      }
      return newSet;
    });
  };

  const openLightbox = (destination: Destination, imageIndex = 0) => {
    setLightboxImages(destination.gallery);
    setLightboxIndex(imageIndex);
    setLightboxTitle(destination.title);
    setLightboxOpen(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      case "Challenging": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const hasActiveFilters =
    searchTerm ||
    Object.values(filters).some((value) => value !== "") ||
    sortBy !== "popular";

  // ------------------- Loading State -------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discovering amazing destinations...
          </p>
        </div>
      </div>
    );
  }

  // ------------------- JSX -------------------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section
  className="relative h-[47rem] flex items-center justify-center overflow-hidden"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-black/70"></div>

  {/* Floating Animated Shapes */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
    <div className="absolute top-40 right-20 w-44 h-44 bg-pink-500/20 rounded-full blur-2xl animate-float-delayed"></div>
    <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-purple-400/20 rounded-full blur-3xl animate-float-slow"></div>
  </div>

  {/* Hero Content */}
  <motion.div
    className="relative z-10 text-center text-white px-6 max-w-6xl"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    {/* Badge */}
    <motion.div
      className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm mb-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <Sparkles className="h-6 w-6 text-yellow-400 animate-spin-slow" />
      <span className="text-lg font-medium tracking-wide">
        Handpicked Travel Spots
      </span>
      <Sparkles className="h-6 w-6 text-yellow-400 animate-spin-slow" />
    </motion.div>

    {/* Title */}
    <motion.h1
      className="text-6xl md:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      Amazing
      <span className="block text-yellow-400 animate-pulse">Destinations</span>
    </motion.h1>

    {/* Subtitle */}
    <motion.p
      className="text-xl md:text-2xl mb-12 leading-relaxed font-light max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      Discover breathtaking locations with{" "}
      <span className="font-semibold text-yellow-300">
        expertly curated travel experiences
      </span>{" "}
      just for you.
    </motion.p>

    {/* CTA Buttons */}
    <motion.div
      className="flex flex-col sm:flex-row gap-6 justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.8 }}
    >
      <button
        onClick={() =>
          document
            .getElementById("destinations-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="group px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all transform hover:scale-110 hover:shadow-2xl flex items-center justify-center text-xl"
      >
        🌍 Explore Destinations
        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
      </button>
      <Link
        to="/booking"
        className="px-12 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-gray-900 text-white font-bold rounded-2xl transition-all hover:scale-110 text-xl"
      >
        📅 Book Adventure
      </Link>
    </motion.div>
  </motion.div>
</section>


      {/* Statistics Section */}
      
      <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Target className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {enhancedDestinations.length}+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Destinations
              </div>
            </motion.div>

            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Star className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                4.8
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Average Rating
              </div>
            </motion.div>

            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                50K+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Happy Travelers
              </div>
            </motion.div>

            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                25
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Awards Won
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Popular Destinations
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From tropical paradises to cultural heritage sites, our carefully
              curated destinations offer unforgettable experiences for every
              type of traveler.
            </p>
          </motion.div>

          {/* Enhanced Search & Filter */}
          <motion.div
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations, activities, or experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all text-lg"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 flex-1">
                {Object.entries(filterOptions).map(([key, options]) => (
                  <div key={key} className="relative">
                    <select
                      value={filters[key as keyof typeof filters]}
                      onChange={(e) => handleFilterChange(key, e.target.value)}
                      className="appearance-none px-6 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all min-w-[150px]"
                    >
                      <option value="">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Sort and Clear */}
              <div className="flex gap-4 items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration">Duration</option>
                </select>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-800 transition-all flex items-center gap-2 font-medium"
                  >
                    <X className="h-4 w-4" />
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-6 flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                    Search: "{searchTerm}"
                  </span>
                )}
                {Object.entries(filters).map(
                  ([key, value]) =>
                    value && (
                      <span
                        key={key}
                        className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
                      >
                        {key}: {value}
                      </span>
                    )
                )}
                {sortBy !== 'popular' && (
                  <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                    Sort: {sortBy.replace('-', ' ')}
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg text-gray-600 dark:text-gray-300">
              Showing{' '}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {filteredAndSortedDestinations.length}
              </span>{' '}
              of {enhancedDestinations.length} destinations
            </div>
            {filteredAndSortedDestinations.length > 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Sorted by {sortBy.replace('-', ' ')}
              </div>
            )}
          </div>

          {/* Destinations Grid */}
          {filteredAndSortedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              {filteredAndSortedDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Popular Badge */}
                  {destination.popular && (
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-pulse">
                        <TrendingUp className="h-4 w-4" />
                        POPULAR
                      </div>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {destination.discount && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                        {destination.discount}% OFF
                      </div>
                    </div>
                  )}

                  {/* Image Carousel */}
                  <div className="relative h-72">
                    <ImageCarousel
                      images={destination.gallery}
                      className="h-full"
                      onImageClick={(imageIndex) =>
                        openLightbox(destination, imageIndex)
                      }
                    />

                    {/* Price Badge */}
                    <div className="absolute top-16 left-4 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg">
                      <div className="flex items-center text-lg font-bold text-blue-600">
                        <DollarSign className="h-5 w-5 mr-1" />
                        <span>{destination.price}</span>
                      </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <div className="flex items-center text-sm font-bold text-white">
                        <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                        <span>{destination.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="absolute bottom-4 right-4">
                      <span
                        className={`px-3 py-1 ${getDifficultyColor(
                          destination.difficulty
                        )} text-xs font-medium rounded-full shadow-lg backdrop-blur-sm`}
                      >
                        {destination.difficulty}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-16 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <button
                        onClick={() => toggleLike(destination.id)}
                        className={`p-3 rounded-full backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-110 ${
                          likedDestinations.has(destination.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                        aria-label="Add to favorites"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            likedDestinations.has(destination.id)
                              ? 'fill-current'
                              : ''
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => openLightbox(destination, 0)}
                        className="p-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                        aria-label="View gallery"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center mb-3">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Featured Destination
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {destination.bestTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {destination.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-2">
                      {destination.shortDescription}
                    </p>

                    {/* Rating and Reviews */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(destination.rating)
                                  ? 'fill-current'
                                  : ''
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                          {destination.rating.toFixed(1)} ({destination.reviews}{' '}
                          reviews)
                        </span>
                      </div>
                    </div>

                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-2 text-green-500" />
                        <span>Best: {destination.bestTime}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link
  to={`/destination/${destination.id}`}
  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-xl transition-all transform hover:scale-105 text-center"
>
  View Details
</Link>
<Link
  to={`/booking?destinationId=${destination.id}`}
  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 text-center flex items-center justify-center gap-2"
>
  Book Now
  <ArrowRight className="h-4 w-4" />
</Link>

                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <MapPin className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <h3 className="text-3xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
                No destinations found
              </h3>
              <p className="text-xl text-gray-500 dark:text-gray-500 mb-8">
                Try adjusting your search or filters to discover amazing places
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all transform hover:scale-105 shadow-lg"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Choose Our Destinations Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
      <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        What Makes Our Destinations Special?
      </h2>
      <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Carefully curated travel experiences that maximize beauty, timing, and value.
      </p>
    </div>

    {/* Glassmorphic Destination Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          id: 1,
          label: "Carefully Selected Locations",
          description:
            "Each destination is handpicked by our travel experts for its unique beauty, cultural significance, and exceptional experiences.",
          color: "from-blue-500 to-blue-200",
          icon: <MapPin className="h-12 w-12 text-white" />,
        },
        {
          id: 2,
          label: "Perfect Timing",
          description:
            "Our itineraries are designed to make the most of your time, ensuring you experience the best of each destination at the optimal moments.",
          color: "from-green-500 to-green-200",
          icon: <Clock className="h-12 w-12 text-white" />,
        },
        {
          id: 3,
          label: "Best Value",
          description:
            "Competitive pricing with no hidden fees, offering exceptional value for comprehensive travel packages that include all essential services.",
          color: "from-purple-500 to-purple-200",
          icon: <DollarSign className="h-12 w-12 text-white" />,
        },
      ].map((dest, index) => (
        <motion.div
          key={dest.id}
          className="relative p-1 rounded-3xl cursor-pointer group"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Animated Gradient Glow */}
          <div
            className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${dest.color} opacity-0 group-hover:opacity-100 blur-2xl animate-gradient-border transition-all`}
          ></div>

          {/* Glassmorphism Card */}
          <motion.div
            className="relative bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-700/40 p-10 rounded-3xl shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-shadow duration-500 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Background Decorations */}
            <div
              className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${dest.color} opacity-10 rounded-full blur-3xl`}
            ></div>
            <div
              className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${dest.color} opacity-10 rounded-full blur-2xl`}
            ></div>

            {/* Icon */}
            <div
              className={`w-20 h-20 bg-gradient-to-br ${dest.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10 group-hover:scale-110 transition-transform`}
            >
              {dest.icon}
            </div>

            {/* Label */}
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 relative z-10">
              {dest.label}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">
              {dest.description}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 bg-yellow-400/20 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to Explore?
          </h2>
          <p className="text-2xl mb-12 font-light leading-relaxed">
            Choose your perfect destination and start planning your dream
            vacation today. Adventure awaits at every corner of the world!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/booking"
              className="group px-12 py-6 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-2xl text-xl flex items-center justify-center"
            >
              🌍 Book Your Adventure
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-12 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-blue-600 text-white font-bold rounded-2xl transition-all transform hover:scale-105 text-xl"
            >
              💬 Get Custom Quote
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={lightboxIndex}
        title={lightboxTitle}
      />
    </div>
  );
};

export default Destinations;
