import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';
import { supabase, type ContactMessageInsert } from '../supabaseClient';
import { motion } from 'framer-motion';
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    created_at: new Date().toISOString(),
    status: 'new',
    updated_at: new Date().toISOString(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true); // ✅ page loader state

  // ✅ Show loading screen for 1.2s when page first loads
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) setError(null);
  };

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-()\s]{7,15}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const messageData: ContactMessageInsert = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        // @ts-ignore
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      const { error } = await supabase.from('contact_messages').insert([messageData]);
      if (error) throw new Error(error.message);

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        created_at: new Date().toISOString(),
        status: 'new',
        updated_at: new Date().toISOString(),
      });

      // Auto refresh after 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err: any) {
      console.error('Error submitting contact form:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Loading Screen when page first opens
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading contact page...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
{/* Hero Section */}
<section className="relative h-[47rem] flex items-center justify-center overflow-hidden">
  {/* Background image with gradient overlay */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-fixed"
    style={{
      backgroundImage:
        "url(https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=1600)",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-black/70"></div>
  </div>

  {/* Floating Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-16 left-12 w-20 h-20 bg-white/10 rounded-full blur-3xl animate-float"></div>
    <div className="absolute top-40 right-20 w-28 h-28 bg-blue-400/20 rounded-full blur-2xl animate-float-delayed"></div>
    <div className="absolute bottom-24 left-1/3 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    <div className="absolute bottom-16 right-1/4 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl animate-float-slow"></div>
  </div>

  {/* Content */}
  <motion.div
    className="relative z-10 text-center text-white px-6 max-w-5xl"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    {/* Heading */}
    <motion.h1
      className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      Let’s Start Your{" "}
      <span className="block text-yellow-400 animate-pulse">
        Dream Journey
      </span>
    </motion.h1>

    {/* Subtitle */}
    <motion.p
      className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      Wherever you want to go, we’ll make your travel effortless, personalized, and unforgettable.
    </motion.p>

    {/* Call to Action Buttons */}
    <motion.div
      className="flex flex-col sm:flex-row gap-6 justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      {/* Get In Touch */}
      <a
        href="#contact-form"
        className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg 
                   border border-white/30 hover:scale-110 hover:shadow-2xl hover:from-purple-600 hover:to-blue-600 
                   transform transition-all duration-300 flex items-center justify-center text-lg"
      >
        ✉️ Get In Touch
      </a>

      {/* Call Us */}
      <a
        href="tel:+919818223938"
        className="px-12 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-gray-900 text-white font-bold rounded-2xl transition-all hover:scale-110 text-xl"
      >
        📞 Call Us
      </a>
    </motion.div>
  </motion.div>
</section>



{/* Contact Section */}
<section className="py-20 bg-gray-50" id="contact-form">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

      {/* Left Side - Info + Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg h-full flex flex-col justify-between bg-gradient-to-br from-blue-600 to-purple-600 text-white p-10">
        {/* Background image */}
        <img
          src="https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        {/* Overlay content */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold">Let's Start Your Journey</h2>
          <p className="text-lg text-gray-100">
            Whether you want to plan a solo trip or a group tour, we create personalized travel experiences tailored just for you.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6" />
              <span>VM-TravelCo07@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6" />
              <span>+91 7011228875</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              <span>Sec-83(Rampura), Gurgaon, Haryana</span>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#contact-form"
            className="inline-block mt-8 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="flex flex-col justify-center">
        {isSubmitted ? (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Message Sent Successfully!</h2>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-2xl shadow-xl">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block font-semibold mb-2">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                />
                {fieldErrors.name && <p className="text-red-500 text-sm">{fieldErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block font-semibold mb-2">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
                {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block font-semibold mb-2">Phone Number *</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="+1 555 123 4567"
              />
              {fieldErrors.phone && <p className="text-red-500 text-sm">{fieldErrors.phone}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="block font-semibold mb-2">Subject *</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="What can we help you with?"
              />
              {fieldErrors.subject && <p className="text-red-500 text-sm">{fieldErrors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block font-semibold mb-2">Message *</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about your dream destination, travel dates, group size, or any specific requirements..."
              />
              {fieldErrors.message && <p className="text-red-500 text-sm">{fieldErrors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
</section>
    </div>
  );
};
export default Contact;
