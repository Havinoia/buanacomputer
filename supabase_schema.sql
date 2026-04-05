-- TechService Showcase - Database Schema

-- 1. Tabel Profiles (Menyimpan data user tambahan)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel Services (Daftar layanan laptop/komputer)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'laptop', -- 'laptop', 'sparepart', 'servis_panggilan'
  description TEXT,
  image_url TEXT,
  price_estimate NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabel Bookings (Pemesanan jasa service)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  device_info TEXT NOT NULL,
  issue_description TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policies for Services (Public read access)
CREATE POLICY "Services are viewable by everyone" ON public.services
  FOR SELECT USING (true);

-- Policies for Profiles (Owner can read/write)
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policies for Bookings (Owner can read/write)
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Dummy data for Services
INSERT INTO public.services (brand, model, category, description, image_url, price_estimate)
VALUES 
-- Laptops
('Apple', 'MacBook Pro M3 Max', 'laptop', 'Performa monster untuk profesional kreatif. Chip M3 Max, RAM 64GB, SSD 2TB.', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop', 51500000),
('ASUS', 'ROG Strix G16 (2024)', 'laptop', 'Laptop gaming kelas atas dengan layar 240Hz dan RTX 4070.', 'https://images.unsplash.com/photo-1593642381407-3fbd550672e8?q=80&w=1200&auto=format&fit=crop', 26900000),
('Dell', 'XPS 13 Ultrabook', 'laptop', 'Desain bezel-less tercanggih. Sangat tipis dan ringan untuk mobilitas tinggi.', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1200&auto=format&fit=crop', 21500000),
('Lenovo', 'ThinkPad X1 Carbon Gen 11', 'laptop', 'Standar tertinggi laptop bisnis. Tahan banting dengan keyboard legendaris.', 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?q=80&w=1200&auto=format&fit=crop', 24000000),
('HP', 'Victus 15 Gaming', 'laptop', 'Performa gaming solid dengan harga terjangkau untuk mahasiswa.', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1200&auto=format&fit=crop', 13500000),

-- Spareparts
('Samsung', 'SSD NVMe 990 Pro 1TB', 'sparepart', 'Kecepatan read up to 7450MB/s. Terbaik untuk gaming dan editing video.', 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1200&auto=format&fit=crop', 2150000),
('Corsair', 'Vengeance DDR5 32GB Kit', 'sparepart', 'RAM generasi terbaru dengan performa tinggi dan stabilitas tinggi.', 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1200&auto=format&fit=crop', 1950000),
('Apple', 'Battery MacBook Air Original', 'sparepart', 'Suku cadang baterai original untuk MacBook Air untuk daya tahan maksimal.', 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1200&auto=format&fit=crop', 1650000),
('Logitech', 'MX Master 3S Wireless', 'sparepart', 'Mouse ergonomis terbaik untuk produktivitas tingkat tinggi.', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1200&auto=format&fit=crop', 1550000),
('Cooler Master', 'Thermal Paste MasterGel', 'sparepart', 'Konduktivitas panas tinggi untuk menjaga suhu CPU/GPU tetap dingin.', 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop', 175000),

-- Servis Panggilan
('Buana', 'Deep Cleaning & Thermal Paste', 'servis_panggilan', 'Pembersihan debu total dan penggantian pasta pendingin agar laptop tidak panas.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop', 350000),
('Buana', 'Instalasi Ulang OS & Driver', 'servis_panggilan', 'Refresh sistem laptop Anda. Termasuk instalasi driver terbaru dan optimasi.', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop', 150000),
('Buana', 'Servis Motherboard / Matot', 'servis_panggilan', 'Penanganan ahli untuk masalah laptop mati total atau konslet komponen.', 'https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=1200&auto=format&fit=crop', 1500000),
('Buana', 'Perbaikan Engsel & Body', 'servis_panggilan', 'Solusi engsel patah, casing pecah, atau body laptop yang tidak presisi.', 'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?q=80&w=1200&auto=format&fit=crop', 450000),
('Buana', 'Recovery Data Profesional', 'servis_panggilan', 'Upaya penyelamatan data dari harddisk atau SSD yang rusak atau terhapus.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200&auto=format&fit=crop', 2500000);
