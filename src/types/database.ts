export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  updated_at?: string;
}

export interface Service {
  id: string;
  brand: string;
  model: string;
  category: 'laptop' | 'sparepart' | 'servis_panggilan';
  description: string;
  image_url: string;
  price_estimate: number;
  created_at?: string;
}

export interface Booking {
  id: string;
  user_id: string;
  device_info: string;
  issue_description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  created_at?: string;
}
