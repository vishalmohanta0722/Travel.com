import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Type definitions for our database
// Type definitions for our database
export type Destination = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  rating: number;
  category: string;
  featured: boolean;
  available_dates: string[];
  max_capacity: number;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
  active: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  destination_id: string;
  booking_date: string;
  number_of_people: number;
  special_requests?: string;
  selected_services: string[];
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  booking_reference: string;
  created_at: string;
  updated_at: string;
};

export type BookingInsert = Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'booking_reference' | 'status'>;

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  created_at: string;
  updated_at: string;
};

export type ContactMessageInsert = Omit<ContactMessage, 'id' | 'created_at' | 'updated_at' | 'status'>;