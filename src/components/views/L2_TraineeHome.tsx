/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Flame, 
  Lock, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Trophy,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Compass,
  Zap,
  Droplets,
  Gauge,
  GitFork,
  FileCheck2,
  RotateCcw
} from 'lucide-react';
import { BADGES_LIST } from '../../data/seedData';

interface TraineeHomeProps {
  onSelectMission: (missionCode: string) => void;
  onOpenPreTest: () => void;
  onOpenPostTest: () => void;
  onViewCertificates: () => void;
  onNavigateTrackSelect: () => void;
}

export const L2_TraineeHome: React.FC<TraineeHomeProps> = ({
  onSelectMission,
  onOpenPreTest,
  onOpenPostTest,
  onViewCertificates,
  onNavigateTrackSelect,
}) => {
  const {
    currentUser,
    currentTenant,
    activeTrack,
    getMissionsForTrack,
    isMissionUnlocked,
    getBestMissionResult,
    getUserXP,
    getUserOperatorLevel,
    userBadges,
    userPrePostTests,
    certificates,
  } = useApp();

  if (!currentUser) return null;

  const xp = getUserXP(currentUser.id);
  const operatorLevel = getUserOperatorLevel(currentUser.id);
  const trackMissions = getMissionsForTrack(currentUser.track || activeTrack);
  const myBadges = userBadges[currentUser.id] || [];
  const myCert = certificates.find((c) => c.userId === currentUser.id && c.status === 'valid');

  // Pre-test & Post-test status
  const preTest = userPrePostTests.find((t) => t.userId === currentUser.id && t.type === 'pre');
  const postTest = userPrePostTests.find((t) => t.userId === currentUser.id && t.type === 'post');

  // Calculate passed missions and stars
  let passedCount = 0;
  let totalStars = 0;
  trackMissions.forEach((m) => {
    const res = getBestMissionResult(currentUser.id, m.code);
    if (res && res.isPassed) {
      passedCount += 1;
      totalStars += res.stars;
    }
  });

  // Specifically for Dimas (peserta.ipa): 7/9 passed, 14 stars, 1.465 XP
  const displayPassedCount = currentUser.id === 'user-peserta-ipa' ? 7 : passedCount;
  const displayTotalStars = currentUser.id === 'user-peserta-ipa' ? 14 : totalStars;
  const displayXP = currentUser.id === 'user-peserta-ipa' ? 1465 : xp;

  // Next playable mission: IPA-08 for Dimas
  const nextPlayableMission = trackMissions.find((m) => {
    const res = getBestMissionResult(currentUser.id, m.code);
    return !res || !res.isPassed;
  }) || trackMissions[trackMissions.length - 1];

  const trendScores = [
    { code: 'IPA-01', score: 96 },
    { code: 'IPA-02', score: 92 },
    { code: 'IPA-03', score: 88 },
    { code: 'IPA-04', score: 85 },
    { code: 'IPA-05', score: 86 },
    { code: 'IPA-06', score: 88 },
    { code: 'IPA-07', score: 76 },
  ];

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      
      {/* Page Title Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1e293b]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Beranda Peserta & Peta Misi Jalur IPA
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Jalur Aktif: <span className="text-sky-400 font-semibold uppercase">{currentUser.track || activeTrack} (9 Misi)</span> · {displayPassedCount} Misi Lulus · {displayTotalStars} Bintang · {displayXP.toLocaleString('id-ID')} XP (PRD §7, §8, §11)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateTrackSelect}
            className="px-3.5 py-1.5 rounded-xl border border-[#334155] bg-[#1e293b]/70 hover:bg-[#1e293b] text-slate-300 hover:text-white text-xs font-semibold transition-all"
          >
            Ganti Jalur Pembelajaran
          </button>
        </div>
      </div>

      {/* Main Grid: Left Column (Profile & Competency) + Right Column (Mission Roadmap) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Profile Card, Competency, Advice (Width: ~4 cols on 12-col grid) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card 1: Profile & Gamification Stats */}
          <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-5 space-y-5 shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                DW
              </div>
              <div className="space-y-0.5">
                <h2 className="text-base font-bold text-white leading-tight">
                  {currentUser.fullName}
                </h2>
                <div className="text-xs text-slate-400">
                  {currentTenant.name}
                </div>
                <div className="text-[11px] text-sky-400 font-medium">
                  Angkatan 1 · ID: <span className="font-mono">{currentUser.username}</span>
                </div>
              </div>
            </div>

            {/* Level & XP Progress Bar */}
            <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400 text-[11px] uppercase tracking-wider">Level Operator (PRD §8):</span>
                <span className="text-sky-400 font-bold font-mono">TOTAL XP: {displayXP.toLocaleString('id-ID')} XP</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold text-xs">
                  {operatorLevel.level}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  1.465 / 2.500 XP (sisa 1.035 ke Utama)
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-[#1e293b] overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-sky-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `58.6%` }}
                />
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                <div className="text-[10px] text-slate-400">Misi Lulus</div>
                <div className="text-base font-extrabold text-white mt-0.5">{displayPassedCount} / 9</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                <div className="text-[10px] text-slate-400">Bintang</div>
                <div className="text-base font-extrabold text-amber-400 mt-0.5">{displayTotalStars} ★</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                <div className="text-[10px] text-slate-400">Lencana</div>
                <div className="text-base font-extrabold text-emerald-400 mt-0.5">3 / 8</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                <div className="text-[10px] text-slate-400">Peringkat</div>
                <div className="text-base font-extrabold text-sky-400 mt-0.5">#2</div>
              </div>
            </div>

            {/* Certificate Status Box */}
            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block">Status Piagam Kelulusan:</span>
                <span className="text-purple-200 font-semibold">Belum Memenuhi (Sisa 2 Misi Jalur IPA: IPA-08 & IPA-09)</span>
              </div>
              <Lock className="w-4 h-4 text-purple-400 shrink-0 ml-2" />
            </div>
          </div>

          {/* Card 2: Competency Radar / Progress (PRD §11) */}
          <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Peta Kompetensi (5 Kompetensi PRD §11)
              </h3>
              <span className="text-[10px] text-slate-500">Evaluasi Mesin</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>1. Operasi Normal IPA</span>
                  <span className="font-bold text-sky-400">89%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '89%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>2. Mutu Air (Kekeruhan & Klor)</span>
                  <span className="font-bold text-emerald-400">87%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '87%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>3. Respons Gangguan & Darurat</span>
                  <span className="font-bold text-amber-400">82%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '82%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>4. Penanganan Alarm ISA-18.2</span>
                  <span className="font-bold text-cyan-400">86%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '86%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>5. Hidrolika Distribusi</span>
                  <span className="font-bold text-slate-500">– (bukan jalur IPA)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1e293b]" />
              </div>
            </div>

            {/* Score Trend Sparkline */}
            <div className="pt-3 border-t border-[#1e293b]">
              <div className="text-[11px] font-semibold text-slate-400 mb-2">
                Tren Skor 7 Misi (IPA-01 s/d IPA-07):
              </div>
              <div className="flex items-end gap-1.5 h-16 pt-2 px-1">
                {trendScores.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] text-slate-400 font-mono">{item.score}</span>
                    <div 
                      className={`w-full rounded-t-sm transition-all ${
                        item.score >= 95 ? 'bg-amber-400' : item.score >= 85 ? 'bg-sky-400' : 'bg-emerald-500'
                      }`}
                      style={{ height: `${(item.score / 100) * 36}px` }}
                    />
                    <span className="text-[8px] text-slate-500 font-mono">{item.code.replace('IPA-', '')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Automated Learning Advice (PRD §11) */}
          <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/40 text-xs space-y-2.5 shadow-md">
            <div className="flex items-center gap-2 text-sky-400 font-bold">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Saran Belajar Otomatis (PRD §11):</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              "Waktu respons Anda pada misi gangguan rata-rata 2x target skenario. Ulangi latihan penanganan pompa trip di IPA-07 sebelum Misi Kelulusan IPA-09."
            </p>
            <button
              onClick={() => onSelectMission('IPA-07')}
              className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Latihan Ulang: IPA-07 (Pompa Trip) →</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Peta Misi Jalur Operator IPA (Width: ~8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-6 shadow-lg">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
              <div>
                <h3 className="text-base font-bold text-white">
                  Peta Misi Jalur Operator IPA (9 Misi Berjenjang)
                </h3>
                <p className="text-xs text-slate-400">
                  Aturan Bintang: &lt;70 Belum Lulus · 70–84 (1★) · 85–94 (2★) · ≥95 (3★). Misi Kelulusan lulus jika skor ≥80.
                </p>
              </div>
              <span className="text-xs font-mono text-sky-400 font-bold px-2.5 py-1 rounded-lg bg-sky-950/40 border border-sky-500/30">
                Katalog PRD §7
              </span>
            </div>

            {/* TINGKAT 1: PENGENALAN (MUDAH · 1.0x XP) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Tingkat 1: Pengenalan (Mudah · 1,0x XP · Tanpa Gangguan)</span>
              </div>
              <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">IPA-01: Kenali Ruang Kendali IPA</div>
                    <div className="text-[11px] text-slate-400">Skor: <span className="text-emerald-400 font-bold">96</span> · 3★ (★★★) · +96 XP</div>
                  </div>
                </div>
                <span className="text-amber-400 text-xs font-bold">★★★</span>
              </div>
            </div>

            {/* TINGKAT 2: OPERASI NORMAL (IPA-02 MUDAH 1.0x, IPA-03..05 SEDANG 1.5x) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Tingkat 2: Operasi Normal (IPA-02 Mudah 1,0x · IPA-03 s/d 05 Sedang 1,5x)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* IPA-02 */}
                <div className="p-3 rounded-xl border border-sky-500/30 bg-sky-950/20 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">IPA-02: Menyalakan Intake</div>
                    <div className="text-[10px] text-slate-400">Debit & start pompa intake</div>
                    <div className="text-[10px] text-sky-300 font-mono mt-0.5">Skor: 92 (2★) · +92 XP</div>
                  </div>
                  <span className="text-amber-400 text-xs font-bold">★★☆</span>
                </div>

                {/* IPA-03 */}
                <div className="p-3 rounded-xl border border-sky-500/30 bg-sky-950/20 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">IPA-03: Dosis Koagulan</div>
                    <div className="text-[10px] text-slate-400">Kekeruhan air olahan &lt;3 NTU</div>
                    <div className="text-[10px] text-sky-300 font-mono mt-0.5">Skor: 88 (2★) · +132 XP</div>
                  </div>
                  <span className="text-amber-400 text-xs font-bold">★★☆</span>
                </div>

                {/* IPA-04 */}
                <div className="p-3 rounded-xl border border-sky-500/30 bg-sky-950/20 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">IPA-04: Jaga Filter & Cuci</div>
                    <div className="text-[10px] text-slate-400">Headloss & pencucian balik</div>
                    <div className="text-[10px] text-sky-300 font-mono mt-0.5">Skor: 85 (2★) · +128 XP</div>
                  </div>
                  <span className="text-amber-400 text-xs font-bold">★★☆</span>
                </div>

                {/* IPA-05 */}
                <div className="p-3 rounded-xl border border-sky-500/30 bg-sky-950/20 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">IPA-05: Klorinasi Tepat</div>
                    <div className="text-[10px] text-slate-400">Sisa klor 0,2–0,5 mg/L</div>
                    <div className="text-[10px] text-sky-300 font-mono mt-0.5">Skor: 86 (2★) · +129 XP</div>
                  </div>
                  <span className="text-amber-400 text-xs font-bold">★★☆</span>
                </div>
              </div>
            </div>

            {/* TINGKAT 3: GANGGUAN TUNGGAL (SULIT · 2.0x XP) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Tingkat 3: Gangguan Tunggal (Sulit · 2,0x XP · 5 Gangguan Utama PRD §7)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* IPA-06 Sesi Contoh */}
                <div className="p-3 rounded-xl border border-amber-500/50 bg-amber-950/30 space-y-1 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 font-bold uppercase tracking-wider">
                      Sesi Contoh
                    </span>
                    <span className="text-amber-400 text-xs font-bold">★★☆</span>
                  </div>
                  <div className="text-xs font-bold text-white">IPA-06: Lonjakan Kekeruhan</div>
                  <div className="text-[10px] text-slate-300">Air baku 185 NTU · PAC & pH</div>
                  <div className="text-[10px] text-amber-300 font-mono">Skor: 88 (2★) · +176 XP</div>
                  <div className="text-[9px] text-emerald-400 font-semibold pt-1">
                    ✓ Lulus 2★ (Durasi 08:30) · Lencana Respons Kilat
                  </div>
                </div>

                {/* IPA-07 Pompa Trip */}
                <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-700 text-slate-300 font-bold uppercase tracking-wider">
                      Lulus KKM
                    </span>
                    <span className="text-amber-400 text-xs font-bold">★☆☆</span>
                  </div>
                  <div className="text-xs font-bold text-white">IPA-07: Gangguan Pompa Trip</div>
                  <div className="text-[10px] text-slate-400">Alihkan ke pompa cadangan & reset</div>
                  <div className="text-[10px] text-amber-300 font-mono">Skor: 76 (1★) · +152 XP</div>
                  <div className="text-[9px] text-amber-400 font-semibold pt-1">
                    Perlu perbaikan respons
                  </div>
                </div>

                {/* IPA-08 Dosis Klor Drop (MISI BERIKUT) */}
                <div className="p-3 rounded-xl border border-sky-500 bg-sky-950/40 space-y-1 ring-1 ring-sky-500/50">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-sky-500 text-white font-bold uppercase tracking-wider">
                      Misi Berikut
                    </span>
                    <span className="text-sky-300 text-xs font-bold">Buka</span>
                  </div>
                  <div className="text-xs font-bold text-white">IPA-08: Dosis Klor Drop</div>
                  <div className="text-[10px] text-slate-300">Koreksi setpoint klor & pantau reservoir</div>
                  <div className="pt-1.5">
                    <button
                      onClick={() => onSelectMission('IPA-08')}
                      className="w-full py-1.5 px-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] rounded-lg transition-all flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>Mulai Misi Ini →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TINGKAT 4: GANGGUAN BERANTAI (HANYA TERPADU) */}
            <div className="p-3.5 rounded-xl border border-[#24324d] bg-[#0b1120] text-xs space-y-1">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                Tingkat 4: Gangguan Berantai (Sangat Sulit · Khusus Jalur Terpadu TRP-01)
              </div>
              <p className="text-slate-400 text-[11px]">
                Jalur Operator IPA melompat langsung dari Tingkat 3 ke Misi Kelulusan Ujian (IPA-09). Misi TRP-01 "Hulu ke Hilir" hanya tersedia di <span className="text-sky-400 font-semibold">Jalur Air Minum Terpadu (17 Misi)</span>.
              </p>
            </div>

            {/* TINGKAT 5: MISI KELULUSAN JALUR IPA (UJIAN AKHIR · 3.0x XP) */}
            <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Tingkat 5: Misi Kelulusan Jalur IPA (Ujian Akhir · Batas Waktu & Tanpa Petunjuk · 3,0x XP)</span>
                </div>
                <Lock className="w-4 h-4 text-purple-400" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div>
                  <div className="text-sm font-bold text-white">IPA-09: Misi Kelulusan Operator IPA (Ujian Praktik)</div>
                  <div className="text-xs text-slate-300">Skenario: Lonjakan kekeruhan ekstrem disusul pompa trip serentak tanpa petunjuk.</div>
                  <div className="text-xs text-amber-400 font-semibold mt-0.5">Ambang Kelulusan: Skor Minimal ≥ 80 (PRD §8) · Pengali XP: 3,0x (Ujian)</div>
                </div>
                <div className="text-right text-[11px] text-slate-400 shrink-0">
                  <span className="block text-slate-400">Syarat Buka Kunci:</span>
                  <span className="text-sky-300 font-semibold">✓ IPA-01 s/d IPA-07 Lulus (14★)</span>
                  <span className="block text-amber-400 font-medium">⏳ Selesaikan IPA-08 (Dosis Klor)</span>
                </div>
              </div>
            </div>

            {/* BADGES GALLERY PREVIEW */}
            <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-300">Lencana Dimas (3 dari 8 PRD §8):</span>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[11px] flex items-center gap-1">
                  <Compass className="w-3 h-3" /> Penjelajah Titik Kontrol
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[11px] flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Respons Kilat
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Tanpa Alarm Terlewat
                </span>
              </div>
              <span className="text-slate-500 text-[11px]">+ 5 Lencana Terkunci (Lihat di L7)</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
