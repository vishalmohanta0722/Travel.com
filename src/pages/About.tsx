import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Users,
  MapPin,
  Clock,
  Star,
  Shield,
  Heart,
  Zap,
  Leaf,
  User,
  ArrowRight,
  Sparkles,
  Globe,
  Target,
  TrendingUp,
  Mail,
  Linkedin,
  Twitter,
  ChevronDown,
  Play,
  Eye,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { teamMembers, companyStats, companyValues } from '../data/teamData';

const About: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTeamMember, setActiveTeamMember] = useState<string | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (iconName: string) => {
    const icons = {
      users: Users,
      map: MapPin,
      clock: Clock,
      award: Award,
      star: Star,
      shield: Shield,
      heart: Heart,
      zap: Zap,
      leaf: Leaf,
      user: User,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Award;
    return <IconComponent className="h-8 w-8 text-white" />;
  };

  const getSocialIcon = (platform: string) => {
    const icons = {
      linkedin: Linkedin,
      twitter: Twitter,
      email: Mail,
    };
    const IconComponent = icons[platform as keyof typeof icons] || Mail;
    return <IconComponent className="h-5 w-5" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Loading our story...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors overflow-x-hidden">
      {/* Parallax Hero Section */}
     <section className="relative h-[47rem] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80)',
            transform: `translateY(${parallaxOffset * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-black/70"></div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-44 h-44 bg-blue-400/20 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-yellow-400/10 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center text-white px-6 max-w-6xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm mb-8 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Sparkles className="h-6 w-6 text-yellow-400 animate-spin-slow" />
            <span className="text-lg font-medium tracking-wide">
              Our Journey Since 2010
            </span>
            <Sparkles className="h-6 w-6 text-yellow-400 animate-spin-slow" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-7xl md:text-9xl font-extrabold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            About
            <span className="block text-yellow-400 animate-pulse">
              TravelCo
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl mb-12 leading-relaxed font-light max-w-5xl mx-auto overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Creating{' '}
            <span className="text-yellow-400 font-semibold">
              extraordinary journeys
            </span>{' '}
            and unforgettable memories for travelers worldwide since 2010
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <button
              onClick={() =>
                document
                  .getElementById('story-section')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all transform hover:scale-110 hover:shadow-2xl flex items-center justify-center text-xl overflow-hidden"
            >
              📖 Read Our Story
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById('team-section')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-12 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-gray-900 text-white font-bold rounded-2xl transition-all hover:scale-110 text-xl"
            >
              👥 Meet Our Team
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Company Story Section */}
      <section id="story-section" className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Story
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A journey that began with a simple dream: to make extraordinary
              travel experiences accessible to everyone
            </p>
          </motion.div>

          {/* Story Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="TravelCo team planning"
                  className="rounded-3xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lg font-semibold">
                    Planning Your Perfect Journey
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
                From Dream to Reality
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Founded in 2010 by a group of passionate travelers, TravelCo
                began as a small startup with a big vision: to revolutionize how
                people experience the world. What started as weekend trips for
                friends has grown into a global travel company serving thousands
                of adventurers annually.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Our commitment to authentic experiences, sustainable tourism,
                and exceptional service has earned us recognition as one of the
                leading travel companies in the industry. Every journey we craft
                is a testament to our belief that travel has the power to
                transform lives and build bridges between cultures.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all transform hover:scale-105 shadow-lg"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
{/* Mission, Vision, Values Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
  {/* Card 1 */}
  <motion.div
    className="relative p-1 rounded-3xl cursor-pointer group"
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.5 }}
  >
    {/* Animated gradient glow */}
   <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-300 via-purple-200 to-blue-300 opacity-0 group-hover:opacity-100 blur-2xl animate-gradient-border transition-all"></div>
    <motion.div
      className="relative bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-700/40 p-10 rounded-3xl shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-shadow duration-500 flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
        <Target className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Our Mission
      </h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        To inspire and enable travelers to explore the world responsibly, creating authentic connections between cultures while promoting sustainable tourism practices that benefit local communities.
      </p>
    </motion.div>
  </motion.div>

  {/* Card 2 */}
  <motion.div
    className="relative p-1 rounded-3xl cursor-pointer group"
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-100 via-purple-300 via-blue-100 to-violet-300 opacity-0 group-hover:opacity-100 blur-2xl animate-gradient-border transition-all"></div>

    <motion.div
      className="relative bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-700/40 p-10 rounded-3xl shadow-lg hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] transition-shadow duration-500 flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
        <Eye className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Our Vision
      </h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        To be the world's most trusted travel companion, recognized for our commitment to exceptional service, cultural sensitivity, and creating transformative experiences that broaden perspectives.
      </p>
    </motion.div>
  </motion.div>

  {/* Card 3 */}
  <motion.div
    className="relative p-1 rounded-3xl cursor-pointer group"
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-100 via-green-200 via-blue-200 to-green-300 opacity-0 group-hover:opacity-100 blur-2xl animate-gradient-border transition-all"></div>

    <motion.div
      className="relative bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-700/40 p-10 rounded-3xl shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] transition-shadow duration-500 flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
        <Heart className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Our Promise
      </h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Every journey with us is crafted with care, attention to detail, and genuine passion for creating memories that last a lifetime. Your adventure is our commitment.
      </p>
    </motion.div>
  </motion.div>
</div>

        </div>
      </section>
 {/* Company Values Section */}
<section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Our Core Values
      </h2>
      <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
        The principles that guide every decision we make and every experience we create
      </p>
    </motion.div>

    {/* Values Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {companyValues.map((value, index) => (
        <motion.div
          key={value.id}
          className="relative p-1 rounded-3xl cursor-pointer group"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {/* Animated Gradient Glow */}
          <div className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl animate-gradient-border transition-all
            ${index === 0
              ? "bg-gradient-to-r from-blue-300 via-blue-200 via-purple-300 to-green-50"
              : index === 1
              ? "bg-gradient-to-r from-purple-300 via-violet-200 to-blue-100"
              : "bg-gradient-to-r from-green-100 via-green-200 via-blue-200 to-green-300"
            }`}
          ></div>

          {/* Glassmorphism Card */}
          <motion.div
            className={`relative bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-700/40 p-10 rounded-3xl shadow-lg
              transition-shadow duration-500 flex flex-col h-full
              hover:shadow-[0_0_25px_rgba(${index === 0 ? "59,130,246,0.7" : index === 1 ? "139,92,246,0.7" : "34,197,94,0.7"})]`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg
              ${index === 0
                ? "bg-gradient-to-br from-blue-500 to-blue-600"
                : index === 1
                ? "bg-gradient-to-br from-purple-500 to-purple-600"
                : "bg-gradient-to-br from-green-500 to-blue-600"
              }`}
            >
              {getIcon(value.icon)}
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {value.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
 


{/* Statistics Section */}
<section className="py-24 bg-white dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Our Achievements
      </h2>
      <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Numbers that reflect our commitment to excellence and customer satisfaction
      </p>
    </motion.div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {companyStats.map((stat, index) => (
        <motion.div
          key={stat.id}
          className="relative p-1 rounded-3xl cursor-pointer group"
          whileHover={{ scale: 1.07, y:0}}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Animated Gradient Glow */}
          <div
            className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 blur-2xl animate-gradient-border transition-all`}
          ></div>

          {/* Glassmorphism Card */}
          <motion.div
            className="relative bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 
                       dark:border-gray-700/40 p-10 rounded-3xl shadow-lg 
                       hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-shadow duration-500 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Background Decoration */}
            <div
              className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-3xl`}
            ></div>

            {/* Icon */}
            <div
              className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10 group-hover:scale-110 transition-transform`}
            >
              {getIcon(stat.icon)}
            </div>

            {/* Number */}
            <div className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4 relative z-10">
              {stat.number}
            </div>

            {/* Label */}
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 relative z-10">
              {stat.label}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">
              {stat.description}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Team Section */}
      <section
        id="team-section"
        className="py-24 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Meet Our Expert Team
            </h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Passionate travel professionals dedicated to creating
              extraordinary experiences for every journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveTeamMember(member.id)}
                onMouseLeave={() => setActiveTeamMember(null)}
              >
                {/* Image Section */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <div className="flex items-center text-sm font-bold text-blue-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {member.experience}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div
                    className={`absolute top-4 left-4 flex flex-col gap-2 transition-all duration-500 ${
                      activeTeamMember === member.id
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    {Object.entries(member.social).map(([platform, link]) => (
                      <a
                        key={platform}
                        href={link}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all hover:scale-110 text-white"
                        aria-label={`${member.name} ${platform}`}
                      >
                        {getSocialIcon(platform)}
                      </a>
                    ))}
                  </div>

                  {/* Name and Role Overlay */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="text-lg font-medium text-blue-200">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full border border-blue-200 dark:border-blue-800 font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <a
                    href={member.social.email}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all transform hover:scale-105 text-center flex items-center justify-center gap-2 shadow-lg overflow-hidden"
                  >
                    <Mail className="h-4 w-4" />
                    Contact {member.name.split(' ')[0]}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* Why Choose Us Section */}
<section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Why Choose TravelCo?
      </h2>
      <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Experience the difference with our premium travel services and unmatched attention to detail
      </p>
    </motion.div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 overflow-hidden">
      {[
        {
          id: 1,
          title: "Expert Knowledge",
          description:
            "Our team of travel experts has firsthand knowledge of every destination we offer, ensuring authentic and well-planned experiences that exceed expectations.",
          icon: <Award className="h-12 w-12 text-white" />,
          color: "from-blue-300 to-blue-400",
        },
        {
          id: 2,
          title: "Personalized Service",
          description:
            "Every traveler is unique, and we tailor our services to match your specific interests, budget, and travel style for a truly personal and memorable experience.",
          icon: <Users className="h-12 w-12 text-white" />,
          color: "from-green-300 to-green-400",
        },
        {
          id: 3,
          title: "24/7 Support",
          description:
            "Travel with confidence knowing our support team is available around the clock to assist you throughout your journey, wherever you are in the world.",
          icon: <Shield className="h-12 w-12 text-white" />,
          color: "from-purple-300 to-purple-400",
        },
      ].map((card, index) => (
        <motion.div
          key={card.id}
          className="relative p-1 rounded-3xl cursor-pointer group"
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {/* Animated Gradient Glow */}
          <div
            className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 blur-2xl animate-gradient-border transition-all`}
          ></div>

          {/* Glassmorphism Card */}
          <motion.div
            className="relative bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-700/40 p-10 rounded-3xl shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-shadow duration-500 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <div
              className={`w-24 h-24 bg-gradient-to-br ${card.color} rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg relative z-10 group-hover:scale-110 transition-transform overflow-hidden`}
            >
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white relative z-10 overflow-hidden">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg relative z-10 overflow-hidden">
              {card.description}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

   {/* Company Timeline Section */}
<section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Our Journey
      </h2>
      <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
        Milestones that shaped our company and defined our commitment to excellence
      </p>
    </motion.div>

    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full overflow-hidden"></div>

      <div className="space-y-16">
        {[
          {
            year: '2010',
            title: 'Company Founded',
            description: 'Started with a small team and big dreams in a garage office',
            side: 'left',
          },
          {
            year: '2013',
            title: 'First International Tour',
            description: 'Expanded to offer international destinations and packages',
            side: 'right',
          },
          {
            year: '2016',
            title: 'Digital Transformation',
            description: 'Launched our online booking platform and mobile app',
            side: 'left',
          },
          {
            year: '2019',
            title: 'Industry Recognition',
            description: 'Won "Best Travel Company" award for customer service',
            side: 'right',
          },
          {
            year: '2022',
            title: 'Sustainable Tourism',
            description: 'Launched eco-friendly travel initiatives and partnerships',
            side: 'left',
          },
          {
            year: '2025',
            title: 'Global Expansion',
            description: 'Serving customers worldwide with 120+ destinations',
            side: 'right',
          },
        ].map((milestone, index) => (
          <motion.div
            key={milestone.year}
            className={`flex items-center relative cursor-pointer ${
              milestone.side === 'left' ? 'justify-start' : 'justify-end'
            }`}
            initial={{
              opacity: 0,
              x: milestone.side === 'left' ? -100 : 100,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div
              className={`w-5/12 ${
                milestone.side === 'left' ? 'text-right pr-8' : 'text-left pl-8'
              }`}
            >
              <motion.div
                className="relative bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-700/40 p-8 rounded-3xl shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-500"
              >
                {/* Year */}
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4 relative z-10 overflow-hidden">
                  {milestone.year}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 relative z-10 overflow-hidden">
                  {milestone.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed relative z-10 overflow-hidden">
                  {milestone.description}
                </p>
              </motion.div>
            </div>

            {/* Timeline Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg overflow-hidden"></div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-2xl mb-12 font-light leading-relaxed">
            Join our family of travelers and discover why TravelCo is the
            trusted choice for extraordinary adventures worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/booking"
              className="group px-12 py-6 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-2xl text-xl flex items-center justify-center"
            >
              🚀 Start Your Adventure
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-12 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-blue-600 text-white font-bold rounded-2xl transition-all transform hover:scale-105 text-xl"
            >
              💬 Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
