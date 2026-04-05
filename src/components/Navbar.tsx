'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { Laptop, LogIn, UserPlus, LogOut, User as UserIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors shadow-blue-500/20 shadow-lg">
              <Laptop className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Buana <span className="text-blue-500 underline decoration-2 underline-offset-4 decoration-blue-500/30">Computer</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Beranda
            </Link>
            <Link href="#showcase" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Showcase
            </Link>
            <Link href="#services" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Layanan
            </Link>
            <Link href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Tentang Kami
            </Link>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-24 h-8 bg-slate-800 animate-pulse rounded-full" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-full">
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-medium text-slate-200">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
