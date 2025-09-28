import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  X,
  Star,
  TrendingUp,
  Award,
  Users,
  MapPin,
  ArrowRight,
  Sparkles,
  Target,
  Shield,
  Heart,
  ChevronDown,
  Grid,
  List,
  SortAsc,
} from 'lucide-react';
import {
  servicePackages,
  serviceCategories,
  priceRanges,
  difficultyLevels,
  ServicePackage,
} from '../data/servicesData';

import ServiceCard from '../components/ServiceCard';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  // Simulate loading and animate cards on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimateCards(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedServices = useMemo(() => {
    let filtered = servicePackages.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        service.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'All Services' ||
        service.category === selectedCategory;

      const matchesPriceRange =
        selectedPriceRange === 'All Prices' ||
        (() => {
          const avgPrice = (service.price.from + service.price.to) / 2;
          switch (selectedPriceRange) {
            case 'Under $1000':
              return avgPrice < 1000;
            case '$1000 - $2000':
              return avgPrice >= 1000 && avgPrice <= 2000;
            case '$2000 - $3000':
              return avgPrice >= 2000 && avgPrice <= 3000;
            case 'Over $3000':
              return avgPrice > 3000;
            default:
              return true;
          }
        })();

      const matchesDifficulty =
        selectedDifficulty === 'All Levels' ||
        service.difficulty === selectedDifficulty;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriceRange &&
        matchesDifficulty
      );
    });

    // Sort services
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (
            (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating
          );
        case 'price-low':
          return a.price.from - b.price.from;
        case 'price-high':
          return b.price.from - a.price.from;
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    searchTerm,
    selectedCategory,
    selectedPriceRange,
    selectedDifficulty,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Services');
    setSelectedPriceRange('All Prices');
    setSelectedDifficulty('All Levels');
    setSortBy('popular');
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'All Services' ||
    selectedPriceRange !== 'All Prices' ||
    selectedDifficulty !== 'All Levels';

  const popularServices = servicePackages.filter((service) => service.popular);
  const totalServices = servicePackages.length;
  const averageRating = (
    servicePackages.reduce((sum, service) => sum + service.rating, 0) /
    totalServices
  ).toFixed(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Loading amazing services...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
{/* Hero Section */}
<section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
    style={{
      backgroundImage:
        'url(https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600)',
    }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Floating Shapes */}
  <div className="absolute top-16 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-32 right-16 w-44 h-44 bg-pink-500/20 rounded-full blur-2xl animate-bounce"></div>
  <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-yellow-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>

  {/* Content */}
  <div className="relative z-10 text-center text-white px-6 max-w-4xl">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
      <Sparkles className="h-6 w-6 text-yellow-400 animate-spin-slow" />
      <span className="text-lg font-medium tracking-wide">
        Your Journey, Our Expertise
      </span>
    </div>

    {/* Main Title */}
    <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6">
      Explore. Dream. Discover.
    </h1>

    {/* Subtitle */}
    <p className="text-xl md:text-2xl font-light mb-10 text-gray-200">
      Unlock <span className="font-semibold text-yellow-300">exclusive travel experiences</span> crafted just for <span className="font-semibold">you</span>.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <button
        onClick={() =>
          document
            .getElementById('services-section')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        className="group px-10 py-5 bg-blue-600 rounded-2xl text-xl font-bold flex items-center justify-center hover:scale-110 transition-all shadow-lg"
      >
        🌍 Explore Services
        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
      </button>

      <Link
        to="/contact"
        className="px-10 py-5 bg-white text-blue-600 rounded-2xl text-xl font-bold hover:bg-gray-100 transition-all"
      >
        ✨ Get Custom Quote
      </Link>
    </div>
  </div>
</section>


      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Target className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {totalServices}+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Service Packages
              </div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                {averageRating}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Average Rating
              </div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {popularServices.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Popular Choices
              </div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                100%
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Adventure
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From corporate retreats to romantic getaways, we offer premium
              travel experiences tailored to your unique needs and preferences.
            </p>
          </div>

          {/* Advanced Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 mb-12">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search services, destinations, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all text-lg"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 flex-1">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none px-6 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all min-w-[180px]"
                  >
                    {serviceCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>

                {/* Price Range Filter */}
                <div className="relative">
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="appearance-none px-6 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all min-w-[150px]"
                  >
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>

                {/* Difficulty Filter */}
                <div className="relative">
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="appearance-none px-6 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all min-w-[130px]"
                  >
                    {difficultyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sort and View Controls */}
              <div className="flex gap-4 items-center">
                {/* Sort By */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="duration">Duration</option>
                  </select>
                  <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-all ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
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
                {selectedCategory !== 'All Services' && (
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedPriceRange !== 'All Prices' && (
                  <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                    Price: {selectedPriceRange}
                  </span>
                )}
                {selectedDifficulty !== 'All Levels' && (
                  <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium">
                    Difficulty: {selectedDifficulty}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg text-gray-600 dark:text-gray-300">
              Showing{' '}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {filteredAndSortedServices.length}
              </span>{' '}
              of <span className="font-bold">{totalServices}</span> services
            </div>
            {filteredAndSortedServices.length > 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Sorted by {sortBy.replace('-', ' ')}
              </div>
            )}
          </div>

          {/* Services Grid */}
          {filteredAndSortedServices.length > 0 ? (
            <div
              className={`grid gap-8 mb-16 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              } ${animateCards ? 'animate-fadeInUp' : ''}`}
            >
              {filteredAndSortedServices.map((service, index) => (
                <ServiceCard key={service.id} {...service} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-600 dark:text-gray-400 mb-4">
                No Services Found
              </h3>
              <p className="text-xl text-gray-500 dark:text-gray-500 mb-8 max-w-md mx-auto">
                We couldn't find any services matching your criteria. Try
                adjusting your filters or search terms.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all transform hover:scale-105 shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

{/* Why Choose Our Services Section */}
<section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Why Choose Our Services?
      </h2>
      <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Experience the difference with our premium travel services and unmatched attention to detail
      </p>
    </div>

    {/* Glassmorphic Service Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          id: 1,
          label: "Premium Quality",
          description:
            "Every service is carefully curated and executed to the highest standards, ensuring exceptional experiences that exceed expectations.",
          color: "from-blue-500 to-blue-200",
          icon: <Award className="h-12 w-12 text-white" />,
        },
        {
          id: 2,
          label: "Expert Guidance",
          description:
            "Our experienced travel specialists provide personalized recommendations and support throughout your entire journey.",
          color: "from-green-500 to-green-200",
          icon: <Users className="h-12 w-12 text-white" />,
        },
        {
          id: 3,
          label: "Complete Security",
          description:
            "Travel with confidence knowing your safety, security, and satisfaction are our top priorities at every step.",
          color: "from-purple-500 to-purple-200",
          icon: <Shield className="h-12 w-12 text-white" />,
        },
      ].map((service, index) => (
        <motion.div
          key={service.id}
          className="relative p-1 rounded-3xl cursor-pointer group"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Animated Gradient Glow */}
          <div
            className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 blur-2xl animate-gradient-border transition-all`}
          ></div>

          {/* Glassmorphism Card */}
          <motion.div
            className="relative bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-700/40 p-10 rounded-3xl shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-shadow duration-500 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Background Decoration */}
            <div
              className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-3xl`}
            ></div>

            {/* Icon */}
            <div
              className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10 group-hover:scale-110 transition-transform`}
            >
              {service.icon}
            </div>

            {/* Label */}
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 relative z-10">
              {service.label}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">
              {service.description}
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

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-2xl mb-12 font-light leading-relaxed">
            Join thousands of satisfied travelers and create memories that will
            last a lifetime. Your perfect travel experience is just one click
            away.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/booking"
              className="group px-12 py-6 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-2xl text-xl flex items-center justify-center"
            >
              🚀 Book Your Adventure
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-12 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-blue-600 text-white font-bold rounded-2xl transition-all transform hover:scale-105 text-xl"
            >
              💬 Get Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
