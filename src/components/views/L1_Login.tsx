/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  KeyRound, 
  Lock, 
  ShieldCheck, 
  User as UserIcon,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  HelpCircle
} from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
  onOpenPublicVerification: () => void;
}

export const L1_Login: React.FC<LoginProps> = ({ onLoginSuccess, onOpenPublicVerification }) => {
  const { tenants, users, loginAs } = useApp();
  const [selectedTenantId, setSelectedTenantId] = useState<string>('nusantara');
  const [username, setUsername] = useState<string>('peserta.ipa');
  const [password, setPassword] = useState<string>('Demo#2026');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedTenant = tenants.find((t) => t.id === selectedTenantId) || tenants[0];

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('Masukkan username operator / akun pengguna');
      return;
    }
    const success = loginAs(username.trim());
    if (success) {
      setErrorMsg(null);
      onLoginSuccess();
    } else {
      setErrorMsg('Username atau kata sandi tidak terdaftar di sistem.');
    }
  };

  const handleQuickDemoLogin = (userLogin: string) => {
    const success = loginAs(userLogin);
    if (success) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Bar with Public Verification link */}
      <div className="absolute top-4 right-4 sm:right-8">
        <button
          onClick={onOpenPublicVerification}
          className="px-3.5 py-1.5 rounded-xl border border-[#334155] bg-[#0f172a]/80 hover:bg-[#1e293b] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verifikasi Piagam Publik (L16)</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        {/* Branding Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-600/20 border border-sky-500/40 text-sky-400 shadow-lg shadow-sky-950/50">
            <Building2 className="w-8 h-8 text-sky-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            SimSCADA-Air
          </h1>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-400">
            Simulator SCADA Operator Air Minum
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Platform Pelatihan Berbasis Standar Permenkes No. 2/2023
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#0f172a] py-7 px-6 sm:px-8 shadow-2xl rounded-2xl border border-[#24324d] space-y-6">
          
          {/* Tenant Selector Button Group */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Pilih Lembaga Penyelenggara
              </label>
              <span className="text-[10px] text-sky-400 font-medium">Multi-Tenant PRD §5</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {tenants.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setSelectedTenantId(t.id);
                    setUsername(t.id === 'nusantara' ? 'peserta.ipa' : 'peserta.tirta');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedTenantId === t.id
                      ? 'border-sky-500 bg-sky-950/40 text-white shadow-sm ring-1 ring-sky-500/50'
                      : 'border-[#1e293b] bg-[#1e293b]/40 hover:bg-[#1e293b] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-xs truncate text-slate-100">{t.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                    <span>Kode: {t.code}</span>
                    <span className="text-emerald-400 font-semibold">{t.license.seatQuota} Kursi</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs rounded-xl font-medium">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                ID Operator / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: peserta.ipa"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0b1120] border border-[#24324d] rounded-xl text-xs font-medium text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Kata Sandi</span>
                <span className="text-[10px] text-slate-400 font-normal">Sandi demo: <code className="text-sky-400 font-mono">Demo#2026</code></span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0b1120] border border-[#24324d] rounded-xl text-xs font-medium text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-mono"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-500/20 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-sky-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Auto-Detect Peran & Lembaga (PRD §5)</span>
              </div>
              <p>
                Pemilih peran manual dihapus sesuai PRD §5. Sistem mengenali Lembaga & Peran secara otomatis dari akun. 5 Peran: Super Admin, Admin Lembaga, Pimpinan Lembaga, Instruktur, Peserta Operator.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-sky-950/50 flex items-center justify-center gap-2"
            >
              <span>Masuk Workspace Simulasi →</span>
            </button>
          </form>

          {/* Quick Demo Accounts Grid (10 Akun Demo PRD §5) */}
          <div className="pt-2 border-t border-[#1e293b]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Masuk Sebagai... (10 Akun Demo PRD §5)</span>
              </span>
              <span className="text-[10px] text-slate-500">Klik 1x untuk langsung login</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              {/* Nusantara Accounts */}
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('peserta.ipa')}
                className="p-2.5 rounded-xl border border-sky-500/40 bg-sky-950/30 hover:bg-sky-900/40 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-sky-300">peserta.ipa</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 font-bold">1.465 XP</span>
                </div>
                <div className="text-[10px] text-slate-400">Dimas Wahyu · Jalur IPA (14★)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('peserta.lulus')}
                className="p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300">peserta.lulus</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">Terbit</span>
                </div>
                <div className="text-[10px] text-slate-400">Andi Kurniawan · Terpadu (48★)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('peserta.distribusi')}
                className="p-2.5 rounded-xl border border-[#24324d] bg-[#1e293b]/50 hover:bg-[#1e293b] text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-sky-300">peserta.distribusi</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-700 text-slate-300">11★</span>
                </div>
                <div className="text-[10px] text-slate-400">Siti Rahmawati · Distribusi</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('peserta.baru')}
                className="p-2.5 rounded-xl border border-[#24324d] bg-[#1e293b]/50 hover:bg-[#1e293b] text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-sky-300">peserta.baru</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-700 text-slate-300">Magang</span>
                </div>
                <div className="text-[10px] text-slate-400">Budi Baru · Terpadu (0 XP)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('instruktur.nusantara')}
                className="p-2.5 rounded-xl border border-amber-500/30 bg-amber-950/20 hover:bg-amber-900/30 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-amber-300">instruktur.nusantara</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold">Instruktur</span>
                </div>
                <div className="text-[10px] text-slate-400">Budi Santoso, S.T. · Angkatan 1</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin.nusantara')}
                className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-900/30 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300">admin.nusantara</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">Admin</span>
                </div>
                <div className="text-[10px] text-slate-400">Rina Oktaviani · 46/50 Kursi</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('pimpinan.nusantara')}
                className="p-2.5 rounded-xl border border-[#24324d] bg-[#1e293b]/50 hover:bg-[#1e293b] text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-sky-300">pimpinan.nusantara</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-700 text-slate-300">Pimpinan</span>
                </div>
                <div className="text-[10px] text-slate-400">Dr. Ir. Bambang · T1-T4 & Piagam</div>
              </button>

              {/* Tirta & Superadmin */}
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin.tirta')}
                className="p-2.5 rounded-xl border border-teal-500/30 bg-teal-950/20 hover:bg-teal-900/30 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-teal-300">admin.tirta</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-teal-500/20 text-teal-300 font-bold">Tirta Mandiri</span>
                </div>
                <div className="text-[10px] text-slate-400">Hj. Dewi · Uji Isolasi Data</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('peserta.tirta')}
                className="p-2.5 rounded-xl border border-teal-500/30 bg-teal-950/20 hover:bg-teal-900/30 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-teal-300">peserta.tirta</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-teal-500/20 text-teal-300 font-bold">Peserta TRM</span>
                </div>
                <div className="text-[10px] text-slate-400">Siti Aminah · Isolasi Mandiri</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('superadmin')}
                className="p-2.5 rounded-xl border border-indigo-500/40 bg-indigo-950/30 hover:bg-indigo-900/40 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-indigo-300">superadmin</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">Super Admin</span>
                </div>
                <div className="text-[10px] text-slate-400">Tim Pengembang · Multi-Tenant</div>
              </button>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-500 pt-1">
            Isolasi Database Antar-Lembaga · Sesuai PRD SimSCADA-Air v1.0 §5
          </div>
        </div>
      </div>
    </div>
  );
};
