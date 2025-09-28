// Enhanced services data with detailed information
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
  discount?: number;
}

export const servicePackages: ServicePackage[] = [
  {
    id: "1",
    title: "Corporate Executive Retreat",
    category: "Corporate Tours",
    shortDescription: "Premium corporate travel packages designed for business excellence and team building.",
    fullDescription: "Transform your business relationships with our executive corporate retreat packages. Featuring luxury accommodations, professional meeting facilities, team-building activities, and networking opportunities in stunning destinations worldwide. Perfect for companies looking to inspire their teams while conducting business in extraordinary settings.",
    image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    price: {
      from: 2500,
      to: 5000,
      currency: "$",
      period: "per person"
    },
    duration: "3-7 days",
    groupSize: {
      min: 10,
      max: 50
    },
    rating: 4.9,
    reviews: 127,
    features: [
      "Luxury Business Hotels",
      "Private Meeting Rooms",
      "Team Building Activities",
      "Executive Transportation",
      "Professional Photography",
      "Gourmet Dining"
    ],
    included: [
      "5-star accommodation",
      "All meals and refreshments",
      "Airport transfers",
      "Professional facilitator",
      "Meeting equipment",
      "Welcome and farewell dinners"
    ],
    highlights: [
      "Exclusive venue access",
      "Customized itineraries",
      "24/7 concierge service",
      "Professional networking"
    ],
    difficulty: "Easy",
    bestTime: "Year-round",
    tags: ["Corporate", "Business", "Luxury", "Team Building"],
    popular: true,
    discount: 15
  },
  {
    id: "2",
    title: "Family Adventure Paradise",
    category: "Family Packages",
    shortDescription: "Unforgettable family vacations with activities for all ages and child-friendly accommodations.",
    fullDescription: "Create lasting memories with our comprehensive family adventure packages. Featuring kid-friendly activities, educational experiences, safe accommodations, and entertainment options that cater to every family member from toddlers to grandparents. Our expert guides ensure safety while maximizing fun for the entire family.",
    image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1320688/pexels-photo-1320688.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    price: {
      from: 800,
      to: 2000,
      currency: "$",
      period: "per person"
    },
    duration: "5-10 days",
    groupSize: {
      min: 2,
      max: 12
    },
    rating: 4.8,
    reviews: 234,
    features: [
      "Family-Friendly Hotels",
      "Kids Club Activities",
      "Educational Tours",
      "Safe Transportation",
      "Childcare Services",
      "Interactive Experiences"
    ],
    included: [
      "Family accommodation",
      "All meals",
      "Kids activities",
      "Educational tours",
      "Transportation",
      "Travel insurance"
    ],
    highlights: [
      "Age-appropriate activities",
      "Educational experiences",
      "Safety-first approach",
      "Memory-making moments"
    ],
    difficulty: "Easy",
    bestTime: "School holidays",
    tags: ["Family", "Kids", "Educational", "Safe"],
    popular: true
  },
  {
    id: "3",
    title: "Romantic Honeymoon Escape",
    category: "Honeymoon Trips",
    shortDescription: "Intimate and romantic getaways for newlyweds with luxury amenities and private experiences.",
    fullDescription: "Begin your married life with an enchanting honeymoon experience. Our romantic packages feature intimate settings, couples' activities, luxury accommodations, and personalized services designed to create the perfect start to your journey together. Every detail is crafted to celebrate your love story.",
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    price: {
      from: 1500,
      to: 4000,
      currency: "$",
      period: "per couple"
    },
    duration: "7-14 days",
    groupSize: {
      min: 2,
      max: 2
    },
    rating: 4.9,
    reviews: 189,
    features: [
      "Romantic Suites",
      "Couples Spa",
      "Private Dining",
      "Sunset Cruises",
      "Photography Sessions",
      "Champagne Service"
    ],
    included: [
      "Luxury suite accommodation",
      "Romantic dinners",
      "Couples massage",
      "Private transfers",
      "Champagne welcome",
      "Professional photos"
    ],
    highlights: [
      "Private romantic settings",
      "Couples experiences",
      "Luxury amenities",
      "Personalized service"
    ],
    difficulty: "Easy",
    bestTime: "Year-round",
    tags: ["Honeymoon", "Romantic", "Luxury", "Couples"],
    popular: false,
    discount: 20
  },
  {
    id: "4",
    title: "Extreme Adventure Quest",
    category: "Adventure Travel",
    shortDescription: "Thrilling adventure packages for adrenaline seekers with extreme sports and outdoor activities.",
    fullDescription: "Push your limits with our extreme adventure packages designed for thrill-seekers. Experience heart-pumping activities, challenging terrains, and unforgettable adventures in some of the world's most spectacular natural settings. Professional guides ensure your safety while maximizing the adrenaline rush.",
    image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1365426/pexels-photo-1365426.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1365427/pexels-photo-1365427.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    price: {
      from: 1200,
      to: 3500,
      currency: "$",
      period: "per person"
    },
    duration: "5-12 days",
    groupSize: {
      min: 4,
      max: 16
    },
    rating: 4.7,
    reviews: 156,
    features: [
      "Extreme Sports",
      "Professional Guides",
      "Safety Equipment",
      "Adventure Camps",
      "Action Photography",
      "Medical Support"
    ],
    included: [
      "Adventure accommodation",
      "All equipment",
      "Professional guides",
      "Safety briefings",
      "Action photos",
      "Emergency support"
    ],
    highlights: [
      "Adrenaline-pumping activities",
      "Expert instruction",
      "Safety-first approach",
      "Unforgettable experiences"
    ],
    difficulty: "Challenging",
    bestTime: "Seasonal",
    tags: ["Adventure", "Extreme", "Sports", "Outdoor"],
    popular: false
  },
  {
    id: "5",
    title: "Cultural Heritage Journey",
    category: "Cultural Tours",
    shortDescription: "Immersive cultural experiences exploring local traditions, history, and authentic cuisine.",
    fullDescription: "Discover the rich tapestry of world cultures with our heritage journey packages. Experience authentic local traditions, historical sites, traditional crafts, and culinary adventures that provide deep insights into diverse cultures. Our local guides share stories passed down through generations.",
    image: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1659439/pexels-photo-1659439.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1659440/pexels-photo-1659440.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    price: {
      from: 900,
      to: 2500,
      currency: "$",
      period: "per person"
    },
    duration: "6-14 days",
    groupSize: {
      min: 6,
      max: 20
    },
    rating: 4.8,
    reviews: 203,
    features: [
      "Cultural Sites",
      "Local Guides",
      "Traditional Meals",
      "Craft Workshops",
      "Historical Tours",
      "Cultural Shows"
    ],
    included: [
      "Cultural accommodation",
      "Traditional meals",
      "Expert local guides",
      "Site entrance fees",
      "Cultural workshops",
      "Traditional performances"
    ],
    highlights: [
      "Authentic experiences",
      "Local interactions",
      "Historical insights",
      "Cultural immersion"
    ],
    difficulty: "Moderate",
    bestTime: "Year-round",
    tags: ["Cultural", "Heritage", "Traditional", "Educational"],
    popular: true
  },
  {
    id: "6",
    title: "Wellness & Spa Retreat",
    category: "Wellness Tours",
    shortDescription: "Rejuvenating wellness experiences with spa treatments, yoga, and mindfulness activities.",
    fullDescription: "Restore your mind, body, and spirit with our comprehensive wellness retreat packages. Featuring world-class spa treatments, yoga sessions, meditation practices, healthy cuisine, and holistic healing experiences in serene environments. Perfect for those seeking inner peace and physical rejuvenation.",
    image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3757943/pexels-photo-3757943.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3757944/pexels-photo-3757944.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    price: {
      from: 1100,
      to: 3000,
      currency: "$",
      period: "per person"
    },
    duration: "4-10 days",
    groupSize: {
      min: 1,
      max: 15
    },
    rating: 4.9,
    reviews: 178,
    features: [
      "Luxury Spa",
      "Yoga Classes",
      "Meditation Sessions",
      "Healthy Cuisine",
      "Wellness Coaching",
      "Nature Walks"
    ],
    included: [
      "Wellness accommodation",
      "Spa treatments",
      "Yoga classes",
      "Healthy meals",
      "Wellness consultations",
      "Meditation sessions"
    ],
    highlights: [
      "Complete relaxation",
      "Holistic healing",
      "Expert wellness coaches",
      "Serene environments"
    ],
    difficulty: "Easy",
    bestTime: "Year-round",
    tags: ["Wellness", "Spa", "Relaxation", "Health"],
    popular: false,
    discount: 10
  }
];

export const serviceCategories = [
  "All Services",
  "Corporate Tours",
  "Family Packages", 
  "Honeymoon Trips",
  "Adventure Travel",
  "Cultural Tours",
  "Wellness Tours"
];

export const priceRanges = [
  "All Prices",
  "Under $1000",
  "$1000 - $2000",
  "$2000 - $3000",
  "Over $3000"
];

export const difficultyLevels = [
  "All Levels",
  "Easy",
  "Moderate", 
  "Challenging"
];