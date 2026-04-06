const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// Gunakan environment variables dari .env.local
// Catatan: Di Node.js murni, kita biasanya butuh dotenv, 
// tapi kita akan jalankan ini menggunakan npx tsx yang bisa handle env.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey || supabaseServiceKey === 'your-service-role-key-here') {
  console.error('Error: Masukkan SUPABASE_SERVICE_ROLE_KEY yang valid di .env.local untuk menjalankan seeder.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const dummyServices = [
  // Laptops
  {
    brand: 'Apple',
    model: 'MacBook Pro M3 Max',
    category: 'laptop',
    description: 'Performa monster untuk profesional kreatif. Chip M3 Max, RAM 64GB, SSD 2TB.',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    price_estimate: 51500000
  },
  
  {
    brand: 'Dell',
    model: 'XPS 13 Ultrabook',
    category: 'laptop',
    description: 'Desain bezel-less tercanggih. Sangat tipis dan ringan untuk mobilitas tinggi.',
    image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1200&auto=format&fit=crop',
    price_estimate: 21500000
  },
  
  {
    brand: 'HP',
    model: 'Victus 15 Gaming',
    category: 'laptop',
    description: 'Performa gaming solid dengan harga terjangkau untuk mahasiswa.',
    image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1200&auto=format&fit=crop',
    price_estimate: 13500000
  },

  // Spareparts
  {
    brand: 'Samsung',
    model: 'SSD NVMe 990 Pro 1TB',
    category: 'sparepart',
    description: 'Kecepatan read up to 7450MB/s. Terbaik untuk gaming dan editing video.',
    image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1200&auto=format&fit=crop',
    price_estimate: 2150000
  },
  {
    brand: 'Corsair',
    model: 'Vengeance DDR5 32GB Kit',
    category: 'sparepart',
    description: 'RAM generasi terbaru dengan performa tinggi dan stabilitas tinggi.',
    image_url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1200&auto=format&fit=crop',
    price_estimate: 1950000
  },
  {
    brand: 'Apple',
    model: 'Battery MacBook Air Original',
    category: 'sparepart',
    description: 'Suku cadang baterai original untuk MacBook Air untuk daya tahan maksimal.',
    image_url: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1200&auto=format&fit=crop',
    price_estimate: 1650000
  },
  {
    brand: 'Logitech',
    model: 'MX Master 3S Wireless',
    category: 'sparepart',
    description: 'Mouse ergonomis terbaik untuk produktivitas tingkat tinggi.',
    image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1200&auto=format&fit=crop',
    price_estimate: 1550000
  },
  {
    brand: 'Cooler Master',
    model: 'Thermal Paste MasterGel',
    category: 'sparepart',
    description: 'Konduktivitas panas tinggi untuk menjaga suhu CPU/GPU tetap dingin.',
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop',
    price_estimate: 175000
  },

  // Servis Panggilan
  {
    brand: 'Buana',
    model: 'Deep Cleaning & Thermal Paste',
    category: 'servis_panggilan',
    description: 'Pembersihan debu total dan penggantian pasta pendingin agar laptop tidak panas.',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    price_estimate: 350000
  },
  {
    brand: 'Buana',
    model: 'Instalasi Ulang OS & Driver',
    category: 'servis_panggilan',
    description: 'Refresh sistem laptop Anda. Termasuk instalasi driver terbaru dan optimasi.',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    price_estimate: 150000
  },
  {
    brand: 'Buana',
    model: 'Servis Motherboard / Matot',
    category: 'servis_panggilan',
    description: 'Penanganan ahli untuk masalah laptop mati total atau konslet komponen.',
    image_url: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=1200&auto=format&fit=crop',
    price_estimate: 1500000
  }
  
];

const dummyUsers = [
  {
    email: 'havin@admin.com',
    password: 'admin123',
    email_confirm: true,
    user_metadata: { full_name: 'Havin Neo' }
  }
];

async function runSeed() {
  console.log('🚀 Memulai proses seeding data Buana Computer...');

  // 1. Tambahkan Pengguna Dummy
  console.log('👤 Membuat akun pengguna dummy...');
  for (const user of dummyUsers) {
    const { data: userData, error: userError } = await supabase.auth.admin.createUser(user);
    if (userError) {
      if (userError.message.includes('already registered')) {
        console.log(`ℹ️ User ${user.email} sudah ada.`);
      } else {
        console.error(`🛑 Gagal membuat user ${user.email}:`, userError.message);
      }
    } else {
      console.log(`✅ User berhasil dibuat: ${userData.user.email}`);
    }
  }

  // 2. Bersihkan Data Lama & Input Layanan Baru
  console.log('\n📥 Membersihkan data lama dan memasukkan data layanan baru...');
  
  // Hapus semua data di tabel services terlebih dahulu
  await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const { data, error } = await supabase
    .from('services')
    .insert(dummyServices)
    .select();

  if (error) {
    console.error('🛑 Gagal melakukan seeding layanan:', error.message);
    return;
  }

  console.log(`✅ Berhasil menambahkan ${data.length} layanan ke tabel 'services'.`);

  // 3. Contoh Upload Gambar (Supabase Storage) - Hanya demo
  /*
  const uploadImage = async (filePath, fileName) => {
    const fileContent = fs.readFileSync(filePath);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images') // Pastikan bucket 'images' sudah dibuat di Supabase
      .upload(`public/${fileName}`, fileContent, {
        contentType: 'image/jpeg',
        upsert: true
      });
    
    if (uploadError) {
      console.error('Gagal upload gambar:', uploadError.message);
    } else {
      console.log('🖼️ Gambar berhasil di-upload ke storage:', uploadData.path);
    }
  };
  */

  console.log('\n✨ Seeding selesai. Silakan cek dashboard Supabase Anda!');
}

runSeed();
