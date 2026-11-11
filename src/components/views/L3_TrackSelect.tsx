/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { LearningTrack } from '../../types';
import { Check, CheckCircle2, Droplets, Gauge, GitFork, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface TrackSelectProps {
  onConfirmTrack: () => void;
}

export const L3_TrackSelect: React.FC<TrackSelectProps> = ({ onConfirmTrack }) => {
  const { currentTenant, activeTrack, setActiveTrack, currentUser, getBestMissionResult, setCurrentView } = useApp();

  const allowedTracks = currentTenant.license.packageTracks;

  const handleSelectTrack = (trackId: LearningTrack) => {
    setActiveTrack(trackId);
    onConfirmTrack();
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-[#1e293b]">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Pemilihan Jalur Pembelajaran Operator
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Pilih salah satu spesialisasi kompetensi air minum · 1 Jalur Aktif per Peserta (PRD §7)
        </p>
      </div>

      {/* Rule Banner */}
      <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/40 text-xs space-y-1 shadow-sm">
        <div className="font-bold text-sky-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>Aturan Jalur Belajar (PRD SimSCADA-Air v1.0 §7):</span>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          Satu jalur aktif per peserta. Tidak ada prasyarat untuk memilih Terpadu. Misi IPA atau Distribusi yang telah lulus dihitung otomatis bila pindah ke Terpadu. Jalur di luar paket lisensi lembaga tidak ditampilkan.
        </p>
      </div>

      {/* 3 Tracks Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Track 1: Operator IPA (9 Misi) */}
        {allowedTracks.includes('ipa') && (
          <div className={`bg-[#0f172a] rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition-all shadow-lg ${
            activeTrack === 'ipa' ? 'border-sky-500 ring-1 ring-sky-500/50 shadow-sky-950/50' : 'border-[#24324d]'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-sky-600/20 border border-sky-500/40 text-sky-400 flex items-center justify-center font-bold">
                  <Droplets className="w-6 h-6" />
                </div>
                {activeTrack === 'ipa' ? (
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-sky-500 text-white uppercase tracking-wider shadow-sm">
                    Jalur Aktif Anda
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    9 Misi
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Operator IPA</h3>
                <p className="text-xs text-sky-400 font-medium">Instalasi Pengolahan Air · 9 Misi</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Fokus pelatihan pengolahan air minum dari air baku hingga air olahan siap minum sesuai Permenkes 2/2023.
              </p>

              {/* Catalog 9 missions list */}
              <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1.5 text-[11px] font-mono">
                <div className="font-bold text-slate-400 font-sans text-[10px] uppercase tracking-wider mb-1">
                  Katalog 9 Misi Berjenjang (IPA-01 s/d IPA-09):
                </div>
                <div className="text-emerald-400">✓ T1 Mudah: IPA-01 Kenali Ruang Kendali</div>
                <div className="text-emerald-400">✓ T2 Mudah: IPA-02 Menyalakan Intake</div>
                <div className="text-emerald-400">✓ T2 Sedang: IPA-03 Dosis Koagulan Normal</div>
                <div className="text-emerald-400">✓ T2 Sedang: IPA-04 Jaga Filter & Backwash</div>
                <div className="text-emerald-400">✓ T2 Sedang: IPA-05 Klorinasi Tepat</div>
                <div className="text-emerald-400">✓ T3 Sulit: IPA-06 Lonjakan Kekeruhan (Sesi Contoh)</div>
                <div className="text-emerald-400">✓ T3 Sulit: IPA-07 Gangguan Pompa Trip</div>
                <div className="text-amber-400">⏳ T3 Sulit: IPA-08 Dosis Klor Tidak Sesuai</div>
                <div className="text-slate-500">🔒 T5 Ujian: IPA-09 Misi Kelulusan IPA (KKM ≥80)</div>

                {currentUser?.id === 'user-peserta-ipa' && (
                  <div className="mt-2 pt-2 border-t border-[#1e293b] text-sky-400 font-sans text-xs font-semibold">
                    Progres Anda: 7 dari 9 Misi Selesai (14 Bintang)
                  </div>
                )}
              </div>

              <div className="text-xs text-slate-400">
                <span className="block text-[11px] text-slate-500">Capaian Akhir Jalur:</span>
                <span className="text-slate-200 font-semibold">Level Operator Madya · Piagam "Operator IPA"</span>
              </div>
            </div>

            <div className="pt-2">
              {activeTrack === 'ipa' ? (
                <button
                  onClick={() => {
                    setCurrentView('home');
                  }}
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Lanjutkan Belajar IPA-08 →</span>
                </button>
              ) : (
                <button
                  onClick={() => handleSelectTrack('ipa')}
                  className="w-full py-2.5 px-4 bg-[#1e293b] hover:bg-sky-600 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-[#334155] transition-all flex items-center justify-center gap-2"
                >
                  <span>Pilih Jalur IPA</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Track 2: Operator Distribusi (7 Misi) */}
        {allowedTracks.includes('distribusi') && (
          <div className={`bg-[#0f172a] rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition-all shadow-lg ${
            activeTrack === 'distribusi' ? 'border-sky-500 ring-1 ring-sky-500/50 shadow-sky-950/50' : 'border-[#24324d]'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
                  <Gauge className="w-6 h-6" />
                </div>
                {activeTrack === 'distribusi' ? (
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-500 text-white uppercase tracking-wider shadow-sm">
                    Jalur Aktif Anda
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    7 Misi
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Operator Distribusi</h3>
                <p className="text-xs text-amber-400 font-medium">Jaringan Perpipaan & Pompa · 7 Misi</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Fokus pelatihan hidrolika perpipaan, manajemen tekanan zona, kebocoran pipa, reservoir, dan sisa klor ujung jaringan.
              </p>

              {/* Catalog 7 missions list */}
              <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1.5 text-[11px] font-mono">
                <div className="font-bold text-slate-400 font-sans text-[10px] uppercase tracking-wider mb-1">
                  Katalog 7 Misi Berjenjang (DST-01 s/d DST-07):
                </div>
                <div className="text-slate-300">• T1 Mudah: DST-01 Kenali Jaringan Distribusi</div>
                <div className="text-slate-300">• T2 Mudah: DST-02 Pompa Distribusi & Reservoir</div>
                <div className="text-slate-300">• T2 Sedang: DST-03 Atur Tekanan Jam Puncak</div>
                <div className="text-slate-300">• T2 Sedang: DST-04 Sisa Klor di Ujung Jaringan</div>
                <div className="text-amber-400">• T3 Sulit: DST-05 Gangguan: Kebocoran Pipa</div>
                <div className="text-amber-400">• T3 Sulit: DST-06 Gangguan: Tekanan Jaringan Drop</div>
                <div className="text-slate-500">• T5 Ujian: DST-07 Misi Kelulusan Distribusi (≥80)</div>
              </div>

              <div className="text-xs text-slate-400">
                <span className="block text-[11px] text-slate-500">Capaian Akhir Jalur:</span>
                <span className="text-slate-200 font-semibold">Level Operator Madya · Piagam "Operator Distribusi"</span>
              </div>
            </div>

            <div className="pt-2">
              {activeTrack === 'distribusi' ? (
                <button
                  onClick={() => setCurrentView('home')}
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Lanjutkan Belajar Distribusi →</span>
                </button>
              ) : (
                <button
                  onClick={() => handleSelectTrack('distribusi')}
                  className="w-full py-2.5 px-4 bg-[#1e293b] hover:bg-amber-600 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-[#334155] transition-all flex items-center justify-center gap-2"
                >
                  <span>Pilih Jalur Distribusi</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Track 3: Air Minum Terpadu (17 Misi) */}
        {allowedTracks.includes('terpadu') && (
          <div className={`bg-[#0f172a] rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition-all shadow-lg ${
            activeTrack === 'terpadu' ? 'border-indigo-500 ring-1 ring-indigo-500/50 shadow-indigo-950/50' : 'border-[#24324d]'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold">
                  <GitFork className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase tracking-wider">
                  Kompetensi Lengkap
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Air Minum Terpadu</h3>
                <p className="text-xs text-indigo-400 font-medium">Hulu ke Hilir (IPA + Distribusi) · 17 Misi</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Satu-satunya jalur dengan tingkat Gangguan Berantai (TRP-01) dan Misi Kelulusan Terpadu Hulu-Hilir (TRP-02).
              </p>

              <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1.5 text-[11px]">
                <div className="font-bold text-slate-300 font-sans text-[10px] uppercase tracking-wider mb-1">
                  17 Misi Lengkap (Tanpa Prasyarat):
                </div>
                <div className="text-slate-400">• 8 Misi Pengolahan Air (IPA-01 s/d IPA-08)</div>
                <div className="text-slate-400">• 6 Misi Jaringan Distribusi (DST-01 s/d DST-06)</div>
                <div className="text-purple-400 font-semibold">• T4 Sangat Sulit: TRP-01 Hulu ke Hilir (Kekeruhan drop IPA → reservoir turun → tekanan drop)</div>
                <div className="text-purple-400 font-semibold">• T5 Ujian: TRP-02 Misi Kelulusan Terpadu (≥80)</div>

                <div className="mt-2.5 p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-[10px] text-indigo-300 leading-relaxed">
                  <strong>PENGAKUAN PROGRES OTOMATIS (PRD §7):</strong> Misi IPA 01 s/d 07 yang sudah Anda selesaikan akan langsung dihitung jika Anda beralih ke jalur Terpadu.
                </div>
              </div>

              <div className="text-xs text-slate-400">
                <span className="block text-[11px] text-slate-500">Capaian Akhir Jalur:</span>
                <span className="text-indigo-300 font-semibold">Level Tertinggi: Operator Ahli (3.500 XP) · Piagam Terpadu</span>
              </div>
            </div>

            <div className="pt-2">
              {activeTrack === 'terpadu' ? (
                <button
                  onClick={() => setCurrentView('home')}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Lanjutkan Belajar Terpadu →</span>
                </button>
              ) : (
                <button
                  onClick={() => handleSelectTrack('terpadu')}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl border border-indigo-500 transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-950/50"
                >
                  <span>Pindah ke Jalur Terpadu (17 Misi)</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
