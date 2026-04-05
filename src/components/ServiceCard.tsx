'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types/database';
import { ArrowRight, Laptop, Coins, Star } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const router = useRouter();

  const handleDetailClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Gatekeeping logic: Redirect to login if not authenticated
      router.push('/login');
    } else {
      // Proceed to detail page
      router.push(`/services/${service.id}`);
    }
  };

  return (
    <div className="group relative bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={service.image_url} 
          alt={service.model} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="px-2 py-1 bg-blue-600/80 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
            {service.brand}
          </div>
          {service.category === 'servis_panggilan' && (
            <div className="px-2 py-1 bg-amber-500/80 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-widest shadow-lg">
              Panggilan
            </div>
          )}
        </div>
        <div className="absolute top-4 right-4 flex gap-1 items-center px-2 py-1 bg-slate-950/50 backdrop-blur-md rounded-md text-amber-400">
           <Star className="w-3 h-3 fill-amber-400" />
           <span className="text-[10px] font-bold">4.9</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {service.model}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-800 rounded-md">
              <Coins className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Estimasi Biaya</span>
              <span className="text-sm font-bold text-white">
                Rp {service.price_estimate.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleDetailClick}
            className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all active:scale-90 shadow-lg shadow-blue-600/20"
            title="Lihat Detail"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
