/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  ChevronDown, 
  LogOut, 
  RotateCcw, 
  Shield, 
  Sparkles, 
  BookOpen,
  UserCheck, 
  Volume2, 
  VolumeX,
  Compass,
  Award,
  PlayCircle,
  FileCheck2,
  Users,
  Settings,
  LineChart,
  History,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { scadaAudio } from '../../utils/audio';
import { UserGuideModal } from '../views/UserGuideModal';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { 
    currentUser, 
    currentTenant, 
    logout, 
    loginAs, 
    getUserOperatorLevel, 
    resetDemoData,
    setSelectedMissionCode
  } = useApp();
  
  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [isMuted, setIsMuted] = useState(scadaAudio.getIsMuted());

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    scadaAudio.setMuted(nextMuted);
    setIsMuted(nextMuted);
  };

  const operatorLevel = currentUser ? getUserOperatorLevel(currentUser.id) : null;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0f172a] border-b border-[#1e293b] shadow-md select-none">
        <div className="max-w-[1720px] mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3">
            
            {/* Zone 1: Brand & Tenant Identity (PRD §6) */}
            <div className="flex items-center gap-3 shrink-0">
              <div 
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-600/20 border border-sky-500/40 text-sky-400 flex items-center justify-center font-bold text-lg shadow-inner group-hover:bg-sky-600/30 transition-all">
                  <Building2 className="w-5 h-5 text-sky-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-100 text-sm sm:text-base leading-tight group-hover:text-sky-300 transition-colors">
                    {currentTenant.name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium leading-none mt-0.5">
                    Didukung oleh <span className="text-sky-400 font-semibold">SimSCADA-Air</span> · Platform Simulator SCADA Air Minum
                  </span>
                </div>
              </div>
            </div>

            {/* Zone 2: Role-based Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {currentUser?.role === 'peserta' && (
                <>
                  <button
                    onClick={() => onNavigate('home')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentView === 'home'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>Beranda & Peta Misi</span>
                  </button>
                  <button
                    onClick={() => onNavigate('track_select')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentView === 'track_select'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>Pilih Jalur</span>
                  </button>
                  <button
                    onClick={() => onNavigate('module_quiz')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentView === 'module_quiz'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>Materi & Kuis</span>
                  </button>
                  <button
                    onClick={() => onNavigate('pre_post_test')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentView === 'pre_post_test'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>Uji Pre/Post (T1)</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMissionCode('IPA-06');
                      onNavigate('simulator');
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentView === 'simulator'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <PlayCircle className="w-3.5 h-3.5 text-sky-400" />
                    <span>Simulator SCADA</span>
                  </button>
                  <button
                    onClick={() => onNavigate('badges')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentView === 'badges'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lencana & Peringkat</span>
                  </button>
                  <button
                    onClick={() => onNavigate('certificate')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentView === 'certificate' || currentView === 'certificate_pending'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Piagam Kelulusan</span>
                  </button>
                </>
              )}

              {currentUser?.role === 'instruktur' && (
                <>
                  <button
                    onClick={() => onNavigate('instructor_dashboard')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      currentView === 'instructor_dashboard'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    Dasbor Pengawasan (L9)
                  </button>
                  <button
                    onClick={() => onNavigate('manage_scenarios')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      currentView === 'manage_scenarios'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    Kelola Skenario (L10)
                  </button>
                  <button
                    onClick={() => onNavigate('replay')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentView === 'replay'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <History className="w-3.5 h-3.5 text-sky-400" />
                    <span>Putar Ulang Sesi (L11)</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMissionCode('IPA-06');
                      onNavigate('simulator');
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      currentView === 'simulator'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    Uji Simulator
                  </button>
                </>
              )}

              {(currentUser?.role === 'admin_lembaga' || currentUser?.role === 'pimpinan_lembaga') && (
                <>
                  <button
                    onClick={() => onNavigate('evaluation')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentView === 'evaluation'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <LineChart className="w-3.5 h-3.5 text-sky-400" />
                    <span>Evaluasi Lembaga (T1–T4)</span>
                  </button>
                  {currentUser.role === 'admin_lembaga' && (
                    <>
                      <button
                        onClick={() => onNavigate('manage_users')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                          currentView === 'manage_users'
                            ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Pengguna & Kelompok (L12)</span>
                      </button>
                      <button
                        onClick={() => onNavigate('tenant_settings')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                          currentView === 'tenant_settings'
                            ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        <Settings className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pengaturan Lembaga (L13)</span>
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onNavigate('certificate')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      currentView === 'certificate'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    Daftar Piagam (L8)
                  </button>
                </>
              )}

              {currentUser?.role === 'superadmin' && (
                <>
                  <button
                    onClick={() => onNavigate('superadmin_dashboard')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      currentView === 'superadmin_dashboard'
                        ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Konsol Lembaga & Lisensi (L15)</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMissionCode('IPA-06');
                      onNavigate('simulator');
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      currentView === 'simulator'
                        ? 'bg-sky-600/20 border border-sky-500/40 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    Uji Simulator
                  </button>
                </>
              )}

              <button
                onClick={() => onNavigate('public_verification')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
                  currentView === 'public_verification'
                    ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-300'
                    : 'border-[#334155] text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Verifikasi Publik (L16)
              </button>
            </nav>

            {/* Zone 3: Audio Toggle, Guide, Profile & Quick Role Switcher */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => setShowGuideModal(true)}
                title="Buka Dokumen Blueprint & Panduan Pengguna"
                className="px-2.5 py-1.5 rounded-lg border border-[#334155] bg-[#1e293b]/70 hover:bg-[#1e293b] text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Panduan</span>
              </button>

              <button
                onClick={handleToggleMute}
                title={isMuted ? 'Nyalakan Bunyi Alarm SCADA' : 'Matikan Suara (Mute)'}
                className={`p-2 rounded-lg border transition-colors ${
                  isMuted 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20' 
                    : 'bg-[#1e293b]/70 border-[#334155] text-slate-300 hover:text-white hover:bg-[#1e293b]'
                }`}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSwitchModal(true)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[#334155] bg-[#1e293b]/80 hover:bg-[#1e293b] transition-all text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs shadow-inner">
                      {currentUser.fullName.charAt(0)}
                    </div>
                    <div className="hidden sm:flex flex-col">
                      <span className="text-xs font-semibold text-slate-100 leading-tight truncate max-w-[130px]">
                        {currentUser.fullName}
                      </span>
                      <span className="text-[10px] text-sky-400 font-medium">
                        {operatorLevel?.level || currentUser.role.replace('_', ' ')}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={() => logout()}
                    title="Keluar (Logout)"
                    className="p-2 rounded-lg border border-[#334155] text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  Masuk ke Portal
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Quick Demo Switcher Modal (10 Akun Demo PRD §5) */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0f172a] rounded-2xl shadow-2xl border border-[#334155] w-full max-w-xl p-6 text-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Pilih Akun Demo Prototipe (PRD §5)
                  </h3>
                  <p className="text-[11px] text-slate-400">Sandi semua akun demo: <code className="text-sky-400 font-mono font-bold">Demo#2026</code></p>
                </div>
              </div>
              <button
                onClick={() => setShowSwitchModal(false)}
                className="text-slate-400 hover:text-white text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider px-1">
                Balai Diklat Air Minum Nusantara (NUS - 50 Kursi)
              </div>
              
              <button
                onClick={() => { loginAs('peserta.ipa'); onNavigate('home'); setShowSwitchModal(false); }}
                className="w-full text-left p-2.5 rounded-xl border border-sky-500/40 bg-sky-950/30 hover:bg-sky-900/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-sky-300">
                    peserta.ipa · Dimas Wahyu Pratama
                  </div>
                  <div className="text-[11px] text-sky-300/80">Angkatan 1 · Operator Madya · 1.465 XP · 14★ (7/9 Misi Lulus)</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Sesi Contoh L5/L6
                </span>
              </button>

              <button
                onClick={() => { loginAs('peserta.lulus'); onNavigate('certificate'); setShowSwitchModal(false); }}
                className="w-full text-left p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                    peserta.lulus · Andi Kurniawan
                  </div>
                  <div className="text-[11px] text-emerald-300/80">Jalur Terpadu (17 Misi Lulus) · 3.820 XP · Operator Ahli · Piagam SSA/NUS/2026/0001 Terbit</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Piagam Terbit
                </span>
              </button>

              <button
                onClick={() => { loginAs('peserta.distribusi'); onNavigate('home'); setShowSwitchModal(false); }}
                className="w-full text-left p-2.5 rounded-xl border border-[#1e293b] bg-[#1e293b]/40 hover:bg-[#1e293b] transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-sky-300">
                    peserta.distribusi · Siti Rahmawati
                  </div>
                  <div className="text-[11px] text-slate-400">Jalur Distribusi · 1.010 XP · Operator Muda (DST-01..05 Lulus 11★)</div>
                </div>
                <UserCheck className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
              </button>

              <button
                onClick={() => { loginAs('peserta.baru'); onNavigate('home'); setShowSwitchModal(false); }}
                className="w-full text-left p-2.5 rounded-xl border border-[#1e293b] bg-[#1e293b]/40 hover:bg-[#1e293b] transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-sky-300">
                    peserta.baru · Budi Baru
                  </div>
                  <div className="text-[11px] text-slate-400">Jalur Terpadu · Operator Magang · 0 XP · Belum mulai</div>
                </div>
                <UserCheck className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
              </button>

              <button
                onClick={() => { loginAs('instruktur.nusantara'); onNavigate('instructor_dashboard'); setShowSwitchModal(false); }}
                className="w-full text-left p-2.5 rounded-xl border border-[#1e293b] bg-[#1e293b]/40 hover:bg-[#1e293b] transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-300">
                    instruktur.nusantara · Budi Santoso, S.T.
                  </div>
                  <div className="text-[11px] text-slate-400">Instruktur Pembina Angkatan 1 · Monitoring, approval piagam, buka kunci</div>
                </div>
                <UserCheck className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => { loginAs('admin.nusantara'); onNavigate('evaluation'); setShowSwitchModal(false); }}
                className="w-full text-left p-2.5 rounded-xl border border-[#1e293b] bg-[#1e293b]/40 hover:bg-[#1e293b] transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                    admin.nusantara · Rina Oktaviani
                  </div>
                  <div className="text-[11px] text-slate-400">Admin Lembaga Nusantara · Kelola akun (46/50 kursi), KKM, pengaturan</div>
                </div>
                <UserCheck className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={() => { loginAs('pimpinan.nusantara'); onNavigate('evaluation'); setShowSwitchModal(false); }}
                className="w-full text-left p-2.5 rounded-xl border border-[#1e293b] bg-[#1e293b]/40 hover:bg-[#1e293b] transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-sky-300">
                    pimpinan.nusantara · Dr. Ir. Bambang Sutrisno, M.Eng.
                  </div>
                  <div className="text-[11px] text-slate-400">Pimpinan Balai Diklat · Dasbor Eksekutif (T1–T4) & Penanda Tangan Piagam</div>
                </div>
                <UserCheck className="w-4 h-4 text-sky-400" />
              </button>

              <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider px-1 pt-2">
                Pusat Pelatihan Tirta Mandiri (TRM - Uji Isolasi Data Multi-Tenant)
              </div>

              <button
                onClick={() => { loginAs('admin.tirta'); onNavigate('evaluation'); setShowSwitchModal(false); }}
                className="w-full text-left p-2.5 rounded-xl border border-teal-500/30 bg-teal-950/20 hover:bg-teal-900/30 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-teal-300">
                    admin.tirta · Admin Tirta Mandiri
                  </div>
                  <div className="text-[11px] text-teal-300/80">Admin Lembaga Tirta Mandiri · Menguji isolasi tenant mandiri</div>
                </div>
                <UserCheck className="w-4 h-4 text-teal-400" />
              </button>

              <button
                onClick={() => { loginAs('peserta.tirta'); onNavigate('home'); setShowSwitchModal(false); }}
                className="w-full text-left p-2.5 rounded-xl border border-teal-500/30 bg-teal-950/20 hover:bg-teal-900/30 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-teal-300">
                    peserta.tirta · Peserta Tirta Mandiri
                  </div>
                  <div className="text-[11px] text-teal-300/80">Peserta Tirta Mandiri · Data Nusantara tidak tampak sama sekali</div>
                </div>
                <UserCheck className="w-4 h-4 text-teal-400" />
              </button>

              <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider px-1 pt-2">
                Super Admin Platform
              </div>

              <button
                onClick={() => { loginAs('superadmin'); onNavigate('superadmin_dashboard'); setShowSwitchModal(false); }}
                className="w-full text-left p-2.5 rounded-xl border border-indigo-500/40 bg-indigo-950/30 hover:bg-indigo-900/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                    superadmin · Super Admin Platform
                  </div>
                  <div className="text-[11px] text-indigo-300/80">Konsol pengelola tenant multi-lembaga, paket lisensi, dan kuota global</div>
                </div>
                <Shield className="w-4 h-4 text-indigo-400" />
              </button>
            </div>

            <div className="pt-4 border-t border-[#1e293b] mt-4 flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm('Kembalikan semua data latihan ke kondisi bawaan prototipe PRD §5?')) {
                    resetDemoData();
                    setShowSwitchModal(false);
                    onNavigate('home');
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Data Demo
              </button>
              <button
                onClick={() => setShowSwitchModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#1e293b] text-slate-200 hover:bg-[#334155] transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {showGuideModal && (
        <UserGuideModal onClose={() => setShowGuideModal(false)} />
      )}
    </>
  );
};
