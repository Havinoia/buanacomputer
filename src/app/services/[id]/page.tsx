'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Service, Profile } from '@/types/database';
import Navbar from '@/components/Navbar';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Smartphone, 
  Send,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // Booking Form State
  const [deviceInfo, setDeviceInfo] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUser(session.user);
      fetchService();
    };

    const fetchService = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        setService(data);
        if (data) {
          setDeviceInfo(`${data.brand} ${data.model}`);
        }
      } catch (err: any) {
        console.error('Error fetching service:', err.message);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [params.id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setBookingLoading(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            device_info: deviceInfo,
            issue_description: issueDescription,
            status: 'pending'
          }
        ]);

      if (error) throw error;
      setBookingSuccess(true);
    } catch (err: any) {
      alert('Maaf, gagal membuat pesanan: ' + err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h1 className="text-xl font-bold text-white">Layanan tidak ditemukan</h1>
        <button onClick={() => router.push('/')} className="text-blue-500 hover:underline">Kembali ke Beranda</button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Showcase
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image & Description */}
          <div className="flex flex-col gap-8">
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img 
                src={service.image_url} 
                alt={service.model} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 px-4 py-2 bg-blue-600 rounded-xl text-xs font-bold text-white uppercase tracking-widest">
                {service.brand}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-extrabold text-white">
                {service.model}
              </h1>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2 text-sm text-slate-300">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Pengerjaan 1-3 Hari
                </div>
                <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Garansi Suku Cadang
                </div>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed">
                {service.description}
              </p>
              <div className="p-6 bg-slate-900/50 border border-blue-500/10 rounded-2xl">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Estimasi Biaya</p>
                <p className="text-2xl font-black text-blue-400">Rp {service.price_estimate.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          {/* Booking Form Card */}
          <div className="lg:sticky lg:top-28">
            {bookingSuccess ? (
              <div className="p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold text-white">Pesanan Terkirim!</h2>
                  <p className="text-slate-400">Teknisi kami akan segera menghubungi Anda untuk mendiskusikan jadwal kunjungan.</p>
                </div>
                <button 
                  onClick={() => router.push('/')}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl transition-all active:scale-95"
                >
                  Lihat Showcase Lainnya
                </button>
              </div>
            ) : (
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl pointer-events-none" />
                
                <h2 className="text-2xl font-bold text-white mb-2">
                  {service.category === 'servis_panggilan' ? 'Pesan Jasa Servis' : 'Pesan Unit Produk'}
                </h2>
                <p className="text-sm text-slate-400 mb-8">
                  {service.category === 'servis_panggilan' 
                    ? 'Pesan teknisi untuk kunjungan ke tempat Anda (On-site) atau jadwalkan servis di toko kami.' 
                    : 'Lengkapi form di bawah untuk memesan unit ini. Kami akan memproses pesanan dan menghubungi Anda secepatnya.'}
                </p>

                <form onSubmit={handleBooking} className="flex flex-col gap-6 text-sm">
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-slate-300 flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-blue-500" /> 
                      {service.category === 'servis_panggilan' ? 'Nama Perangkat' : 'Nama Produk'}
                    </label>
                    <input 
                      type="text" 
                      required
                      value={deviceInfo}
                      onChange={(e) => setDeviceInfo(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                      placeholder={service.category === 'servis_panggilan' ? 'Contoh: Asus ROG Strix G15' : 'Contoh: RAM V-Gen 8GB'}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-slate-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-500" /> 
                      {service.category === 'servis_panggilan' ? 'Deskripsi Masalah' : 'Catatan Tambahan'}
                    </label>
                    <textarea 
                      required
                      value={issueDescription}
                      onChange={(e) => setIssueDescription(e.target.value)}
                      rows={4}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
                      placeholder={service.category === 'servis_panggilan' 
                        ? 'Ceritakan detail kendala teknis yang Anda alami...' 
                        : 'Contoh: Jumlah unit atau request spesifikasi khusus...'}
                    />
                  </div>

                  <div className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 text-xs text-blue-300 leading-snug">
                      <Calendar className="w-5 h-5 flex-shrink-0" />
                      Setelah mengisi form ini, kami akan memverifikasi data dan menghubungi Anda dalam maksimal 1x24 jam.
                    </div>
                    
                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      {bookingLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <MessageSquare className="w-5 h-5" />
                          Pesan lewat WhatsApp
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
