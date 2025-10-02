// Mock data for the travel website
export interface Destination {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  price: number;
  duration: string;
  itinerary: string[];
  included: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  capacity: number;
  image: string;
  features: string[];
}

export const destinations: Destination[] = [
  {
    id: '1',
    title: 'Santorini Paradise',
    shortDescription:
      'Experience the breathtaking sunsets and white-washed buildings of this Greek island gem.',
    fullDescription:
      "Discover the magic of Santorini, where dramatic cliffs meet azure waters and ancient history blends with modern luxury. This volcanic island offers some of the world's most spectacular sunsets, charming villages perched on clifftops, and unique black sand beaches. Explore the archaeological site of Akrotiri, wander through the narrow streets of Oia, and indulge in world-class wines at local vineyards.",
    image:
      'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    price: 1299,
    duration: '7 days',
    itinerary: [
      'Day 1: Arrival in Santorini, hotel check-in, welcome dinner',
      'Day 2: Oia village tour, sunset viewing, wine tasting',
      'Day 3: Akrotiri archaeological site, Red Beach visit',
      'Day 4: Fira exploration, cable car ride, shopping',
      'Day 5: Volcano tour, hot springs, Thirasia island',
      'Day 6: Free day, optional cooking class',
      'Day 7: Departure',
    ],
    included: [
      'Round-trip flights',
      '7 nights accommodation',
      'Daily breakfast',
      'Professional guide',
      'All entrance fees',
      'Airport transfers',
    ],
  },
  {
    id: '2',
    title: 'Bali Adventure',
    shortDescription:
      "Immerse yourself in the cultural richness and natural beauty of Indonesia's most beloved island.",
    fullDescription:
      'Embark on an unforgettable journey through Bali, where ancient temples, lush rice terraces, and pristine beaches create a tapestry of experiences. From the cultural heart of Ubud to the vibrant nightlife of Seminyak, discover traditional markets, sacred water temples, and world-renowned spas. Experience the warmth of Balinese hospitality while exploring volcano landscapes and enjoying authentic Indonesian cuisine.',
    image:
      'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2408666/pexels-photo-2408666.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    price: 999,
    duration: '10 days',
    itinerary: [
      'Day 1-2: Arrival in Denpasar, transfer to Ubud, rice terrace tour',
      'Day 3-4: Temple visits (Tanah Lot, Uluwatu), traditional dance show',
      'Day 5-6: Volcano hiking, hot springs, coffee plantation',
      'Day 7-8: Beach time in Seminyak, water sports',
      'Day 9: Shopping in Kuta, spa treatment',
      'Day 10: Departure',
    ],
    included: [
      'Round-trip flights',
      '9 nights accommodation',
      'Daily breakfast',
      'Private driver',
      'Entrance fees',
      'Traditional cooking class',
      'Airport transfers',
    ],
  },
  {
    id: '3',
    title: 'Swiss Alps Experience',
    shortDescription:
      'Journey through snow-capped peaks, pristine lakes, and charming alpine villages.',
    fullDescription:
      "Experience the majesty of the Swiss Alps with this comprehensive tour through Switzerland's most spectacular regions. Take scenic train rides through mountain passes, explore charming villages like Zermatt and Interlaken, and witness the iconic Matterhorn. Enjoy outdoor activities including hiking, cable car rides, and boat trips on crystal-clear alpine lakes, all while staying in traditional Swiss chalets and savoring authentic Alpine cuisine.",
    image:
      'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1758531/pexels-photo-1758531.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2363/pexels-photo-2363.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    price: 2199,
    duration: '8 days',
    itinerary: [
      'Day 1: Arrival in Zurich, city tour',
      'Day 2-3: Interlaken, Jungfraujoch excursion',
      'Day 4-5: Zermatt, Matterhorn viewing',
      'Day 6: Lucerne, Mount Pilatus',
      'Day 7: Rhine Falls, Stein am Rhein',
      'Day 8: Departure from Zurich',
    ],
    included: [
      'Round-trip flights',
      '7 nights accommodation',
      'Swiss Travel Pass',
      'Daily breakfast',
      'Mountain excursions',
      'Professional guide',
      'Airport transfers',
    ],
  },
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Hotel Booking',
    description:
      'Premium accommodations worldwide with best price guarantee and 24/7 support.',
    icon: 'hotel',
  },
  {
    id: '2',
    title: 'Tour Guide Services',
    description:
      'Professional local guides with extensive knowledge and multilingual support.',
    icon: 'user',
  },
  {
    id: '3',
    title: 'Car Rental',
    description:
      'Wide selection of vehicles from economy to luxury with flexible rental terms.',
    icon: 'car',
  },
  {
    id: '4',
    title: 'Flight Booking',
    description:
      'Competitive flight prices with all major airlines and flexible booking options.',
    icon: 'plane',
  },
  {
    id: '5',
    title: 'Travel Insurance',
    description:
      'Comprehensive travel protection covering medical, trip cancellation, and more.',
    icon: 'shield',
  },
  {
    id: '6',
    title: 'Custom Itineraries',
    description:
      'Personalized travel plans tailored to your preferences and budget.',
    icon: 'map',
  },
];

