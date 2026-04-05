import React from 'react';
import { History, Award, Users, Printer, Settings, Cpu } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Left */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-widest uppercase rounded-full w-fit">
              <History className="w-4 h-4" />
              Dedikasi Sejak Tahun 2000
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Lebih dari <span className="text-blue-500">24 Tahun</span> Melayani <br /> 
              Kebutuhan IT Anda.
            </h2>

            <p className="text-lg text-slate-400 leading-relaxed">
              Berawal dari sebuah toko kecil di tahun 2000, <strong className="text-blue-500">Buana Computer</strong> telah tumbuh menjadi pusat terpercaya untuk solusi teknologi di kota Anda. Kami memahami bahwa laptop dan komputer bukan sekadar alat, melainkan penunjang utama produktivitas dan kreativitas Anda.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-3 group hover:border-blue-500/30 transition-colors">
                <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white">Sparepart Lengkap</h3>
                <p className="text-sm text-slate-500">Ready stock sparepart laptop & PC original berkualitas tinggi.</p>
              </div>

              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-3 group hover:border-blue-500/30 transition-colors">
                <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500">
                  <Printer className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white">Servis Printer</h3>
                <p className="text-sm text-slate-500">Perbaikan segala merk printer dengan hasil cetak tajam dan awet.</p>
              </div>
            </div>
          </div>

          {/* Stats/Visual Right */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <div className="p-8 bg-blue-600 rounded-3xl flex flex-col gap-2 shadow-2xl shadow-blue-500/20">
                  <span className="text-4xl font-black text-white">24+</span>
                  <span className="text-xs font-bold text-blue-100 uppercase tracking-widest leading-tight">Tahun <br />Pengalaman</span>
                </div>
                <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col gap-2">
                  <span className="text-4xl font-black text-white">15rb+</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Unit <br />Terperbaiki</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col gap-2">
                  <span className="text-4xl font-black text-white">100%</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">Kepuasan <br />Pelanggan</span>
                </div>
                <div className="p-8 bg-amber-500 rounded-3xl flex flex-col gap-2 shadow-2xl shadow-amber-500/20">
                  <span className="text-4xl font-black text-white">30+</span>
                  <span className="text-xs font-bold text-amber-100 uppercase tracking-widest leading-tight">Brand <br />Didukung</span>
                </div>
              </div>
            </div>
            
            {/* Achievement Badge */}
            <div className="absolute -top-6 -right-6 p-4 bg-white rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Award className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Terverifikasi</p>
                <p className="text-[10px] text-slate-500">Pusat Servis Resmi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
