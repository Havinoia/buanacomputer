import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, MonitorCheck, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-24 overflow-hidden bg-slate-950 text-white">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-full bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-full bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="flex flex-col gap-8 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase rounded-full w-fit mx-auto lg:mx-0">
              <Zap className="w-4 h-4 fill-blue-500" />
              #1 Jasa Service Komputer di Kota Anda
            </div>
            
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.2] lg:leading-[1.1] tracking-tight bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-transparent">
              Servis di toko atau <br className="hidden sm:block"/>
              Panggilan ke <span className="text-blue-500 underline decoration-4 underline-offset-8 transition-all hover:decoration-blue-400">rumah</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Perbaikan laptop, komputer, dan perangkat digital Anda kini lebih mudah. Hadirkan teknisi ahli langsung ke <strong className="text-white">Lokasi Anda</strong> atau kunjungi <strong className="text-white">Buana Computer</strong> untuk solusi perbaikan yang cepat, transparan, dan bergaransi.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <a 
                href="https://wa.me/628123456789?text=Halo%20Buana%20Computer,%20saya%20ingin%20konsultasi%20mengenai%20service%20laptop/komputer."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-2xl shadow-emerald-500/40 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
              >
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
                Konsultasi WhatsApp
              </a>
              <a 
                href="https://maps.app.goo.gl/WBiZgebhHJYCbRqGA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold rounded-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5 text-blue-500" />
                Lihat Lokasi Toko
              </a>
            </div>

            <div className="flex flex-wrap gap-8 pt-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-slate-400">Hasil Terjamin</span>
              </div>
              <div className="flex items-center gap-2">
                <MonitorCheck className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium text-slate-400">Peralatan Profesional</span>
              </div>
            </div>
          </div>

          {/* Image/Graphic */}
          <div className="relative group perspective-1000 hidden lg:block">
            <div className="relative z-10 p-6 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-xl shadow-2xl transition-transform hover:rotate-y-6 duration-500">
              <img 
                src="/images/teknisi.jpeg" 
                alt="Laptop Technician" 
                className="rounded-2xl transition-all duration-700 w-full h-[450px] object-cover shadow-inner"
              />
              <div className="absolute -bottom-8 -left-8 p-6 bg-blue-600 rounded-2xl shadow-2xl rotate-3">
                <p className="text-3xl font-black text-white">100%</p>
                <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">Professional</p>
              </div>
            </div>
            {/* Glow backing */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
