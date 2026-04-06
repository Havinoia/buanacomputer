'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ServiceCard from '@/components/ServiceCard';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types/database';
import { MousePointer2, AlertCircle, Search } from 'lucide-react';

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchProduct, setSearchProduct] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'laptop' | 'sparepart'>('all');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setServices(data || []);
      } catch (err: any) {
        console.error('Error fetching services:', err.message);
        setError('Gagal memuat daftar layanan. Pastikan skema database sudah dikonfigurasi.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredProducts = services.filter(s => {
    const matchesCategory = selectedCategory === 'all' 
      ? (s.category === 'laptop' || s.category === 'sparepart')
      : s.category === selectedCategory;
    
    const matchesSearch = s.model.toLowerCase().includes(searchProduct.toLowerCase()) || 
                          s.brand.toLowerCase().includes(searchProduct.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-950 selection:bg-blue-500/30 selection:text-white">
      <Navbar />
      <Hero />

      {/* Showcase Section */}
      <section id="showcase" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-center mb-16 items-center">
          <div className="p-2 bg-blue-600/10 rounded-xl w-fit">
            <MousePointer2 className="w-6 h-6 text-blue-500 animate-bounce" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Showcase Laptop & Sparepart
          </h2>
          <p className="text-slate-400 max-w-2xl mb-8">
            Jelajahi koleksi laptop premium dan suku cadang asli pilihan kami. Kualitas terjamin untuk performa maksimal.
          </p>

          {/* Search Bar & Filters */}
          <div className="flex flex-col gap-6 w-full max-w-lg">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/10 blur-xl group-focus-within:bg-blue-500/20 transition-all rounded-full" />
              <div className="relative flex items-center bg-slate-900 shadow-2xl border border-slate-800 rounded-2xl px-5 py-4 focus-within:border-blue-500 transition-all">
                <Search className="w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="Cari produk (Contoh: ASUS, MacBook...)"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-slate-600 ml-3"
                />
                {searchProduct && (
                  <button 
                    onClick={() => setSearchProduct('')}
                    className="text-slate-500 hover:text-white text-xs font-bold transition-colors"
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide px-2">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'laptop', label: 'Laptop' },
                { id: 'sparepart', label: 'Sparepart' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`flex-shrink-0 px-6 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105' 
                    : 'bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-4 p-12 bg-red-400/5 border border-red-400/20 rounded-3xl text-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h3 className="text-xl font-bold text-white">Ops! Gagal memuat produk</h3>
          </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center gap-4">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-full">
                  <Search className="w-8 h-8 text-slate-700" />
                </div>
                <p className="text-slate-500 font-medium italic">Produk "{searchProduct}" tidak ditemukan.</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* On-site Service Section */}
      <section id="services" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 text-center mb-16 items-center">
            <div className="p-2 bg-amber-500/10 rounded-xl w-fit">
              <AlertCircle className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Layanan Servis (Toko & Panggilan)
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Butuh perbaikan cepat? Anda bisa **kunjungi toko kami** langsung atau pesan **teknisi panggilan** untuk perbaikan baterai, keyboard, dan sistem di rumah/kantor Anda.
            </p>
          </div>

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services
                .filter(s => s.category === 'servis_panggilan')
                .map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))
              }
            </div>
          )}
        </div>
      </section>

      <About />

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 bg-black/50 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Buana Computer. All Rights Reserved. <br/>
          Built with Excellence and Precision.
        </p>
      </footer>
    </main>
  );
}
