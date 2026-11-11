/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, 
  CheckCircle2, 
  FileCheck2, 
  History, 
  Key, 
  Play, 
  Plus, 
  RotateCcw, 
  Search, 
  ShieldCheck, 
  Star, 
  Users,
  Lock,
  Unlock,
  MessageSquare
} from 'lucide-react';

interface InstructorDashboardProps {
  onViewReplay: (userId: string) => void;
  onNavigateScenarios: () => void;
}

export const L9_InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  onViewReplay,
  onNavigateScenarios,
}) => {
  const { 
    currentTenant, 
    groups, 
    certificates, 
    approveCertificate, 
    unlockMissionForUser, 
    setCurrentView,
    setVerificationCertNo,
    userMissionResults
  } = useApp();

  const [selectedGroup, setSelectedGroup] = useState<string>('grp-nusantara-1');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<string>('all');
  const [approvalDone, setApprovalDone] = useState<boolean>(false);
  const [unlockedEko, setUnlockedEko] = useState<boolean>(false);

  // Check pending certificate for Rian Hidayat
  const pendingCert = certificates.find((c) => c.userId === 'user-rian-hidayat' && !c.instructorApproved);

  const handleApproveRian = () => {
    if (pendingCert) {
      approveCertificate(pendingCert.id);
      setApprovalDone(true);
      alert('Piagam SSA/NUS/2026/0002 atas nama Rian Hidayat BERHASIL DISETUJUI dan resmi diterbitkan!');
    }
  };

  const handleUnlockEko = () => {
    unlockMissionForUser('user-eko-prasetyo', 'IPA-07');
    unlockMissionForUser('user-eko-prasetyo', 'IPA-08');
    setUnlockedEko(true);
    alert('Kunci Misi IPA-07 dan IPA-08 untuk Eko Prasetyo berhasil dibuka secara manual oleh instruktur!');
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-5">
      {/* Page Title */}
      <div className="pb-2 border-b border-[#1e293b]">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Dasbor Pengawasan Kelas Instruktur
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Matriks Kemajuan Peserta × Misi · Deteksi Otomatis Peserta Tertinggal (Lagging Alerts) (PRD §12)
        </p>
      </div>

      {/* Control Bar: Filters & Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0f172a] border border-[#24324d] shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Kelompok Binaan:</span>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="bg-[#0b1120] border border-[#334155] rounded-xl px-3 py-1.5 text-xs font-bold text-sky-400 focus:outline-hidden"
            >
              <option value="grp-nusantara-1">Angkatan 1 (24 Peserta)</option>
              <option value="grp-nusantara-2">Angkatan 2 (22 Peserta)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Jalur Belajar:</span>
            <select
              value={selectedTrackFilter}
              onChange={(e) => setSelectedTrackFilter(e.target.value)}
              className="bg-[#0b1120] border border-[#334155] rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden"
            >
              <option value="all">Semua Jalur</option>
              <option value="ipa">Operator IPA</option>
              <option value="distribusi">Operator Distribusi</option>
              <option value="terpadu">Air Minum Terpadu</option>
            </select>
          </div>
        </div>

        {/* Action Buttons Matching SVG L9 */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onNavigateScenarios}
            className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>+ Tugaskan Skenario</span>
          </button>

          <button
            onClick={handleUnlockEko}
            className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Buka Kunci</span>
          </button>

          {pendingCert && !approvalDone && (
            <button
              onClick={handleApproveRian}
              className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Setujui Piagam (1)</span>
            </button>
          )}

          <button
            onClick={() => onViewReplay('user-peserta-ipa')}
            className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <History className="w-3.5 h-3.5" />
            <span>Putar Ulang (L11)</span>
          </button>

          <button
            onClick={() => alert('Fitur Beri Catatan Evaluasi aktif. Catatan akan tampil di debriefing peserta.')}
            className="px-3 py-1.5 rounded-xl bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Beri Catatan Evaluasi</span>
          </button>
        </div>
      </div>

      {/* Lagging Student Alert (PRD §12 Alert) */}
      <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2.5 shadow-sm">
        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
        <div className="leading-snug">
          <strong className="text-rose-300 uppercase tracking-wider">PERINGATAN PESERTA TERTINGGAL (PRD §12):</strong>{' '}
          Eko Prasetyo (peserta contoh) tidak lulus IPA-07 (Pompa Trip) 3 kali berturut-turut. Disarankan bimbingan atau buka kunci.
        </div>
      </div>

      {/* Main Roster Matrix Table */}
      <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0b1120] text-slate-400 text-[10px] uppercase tracking-wider border-b border-[#1e293b] font-bold">
              <tr>
                <th className="py-3 px-4">Nama Peserta / Akun</th>
                <th className="py-3 px-3">Misi Aktif</th>
                <th className="py-3 px-3 text-center">Skor Terakhir</th>
                <th className="py-3 px-3 text-center">Bintang</th>
                <th className="py-3 px-3">Aktivitas</th>
                <th className="py-3 px-3">Status Peserta</th>
                <th className="py-3 px-3">Matriks Progres Misi Jalur (IPA-01 s/d IPA-09)</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b] font-sans">
              
              {/* ROW 1: Dimas Wahyu Pratama */}
              <tr className="hover:bg-[#1e293b]/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white text-xs">Dimas Wahyu Pratama</div>
                  <div className="text-[10px] text-sky-400 font-mono">peserta.ipa · Operator Madya</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-sky-300 text-xs">IPA-08: Dosis Klor Drop</div>
                  <div className="text-[10px] text-slate-400">Terbuka · sesi contoh IPA-06</div>
                </td>
                <td className="py-3 px-3 text-center font-mono font-bold text-sky-400">
                  76 <span className="text-[10px] text-slate-500 font-normal">/ 100</span>
                </td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">
                  ★☆☆
                </td>
                <td className="py-3 px-3 text-emerald-400 font-semibold text-[11px]">
                  Hari ini
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    Lulus IPA-07 ✓
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1 font-mono text-[9px] font-bold">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white" title="IPA-01 (3★)">01 (3★)</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white" title="IPA-02 (2★)">02 (2★)</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white" title="IPA-03 (2★)">03 (2★)</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white" title="IPA-04 (2★)">04 (2★)</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white" title="IPA-05 (2★)">05 (2★)</span>
                    <span className="px-1.5 py-0.5 rounded bg-sky-600 text-white" title="IPA-06 (2★)">06 (2★)</span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-600 text-white" title="IPA-07 (1★)">07 (1★)</span>
                    <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-500 text-sky-300" title="IPA-08 (Buka)">08 ⏳</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#1e293b] text-slate-500" title="IPA-09 (Kunci)">09 🔒</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onViewReplay('user-peserta-ipa')}
                    className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] transition-all"
                  >
                    Replay (L11)
                  </button>
                </td>
              </tr>

              {/* ROW 2: Andi Kurniawan */}
              <tr className="hover:bg-[#1e293b]/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white text-xs">Andi Kurniawan</div>
                  <div className="text-[10px] text-emerald-400 font-mono">peserta.lulus · Operator Ahli</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-purple-300 text-xs">TRP-02: Kelulusan</div>
                  <div className="text-[10px] text-slate-400">Semua 17 Misi Lulus</div>
                </td>
                <td className="py-3 px-3 text-center font-mono font-bold text-emerald-400">
                  94 <span className="text-[10px] text-slate-500 font-normal">/ 100</span>
                </td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">
                  ★★★
                </td>
                <td className="py-3 px-3 text-slate-400 text-[11px]">
                  28 Okt 2026
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    Piagam Terbit ✓
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold text-[10px]">
                    ✓ SEMUA 17 MISI LULUS (48 BINTANG)
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => {
                      setVerificationCertNo('SSA/NUS/2026/0001');
                      setCurrentView('certificate');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-slate-200 font-semibold text-[11px] transition-all"
                  >
                    Lihat Piagam
                  </button>
                </td>
              </tr>

              {/* ROW 3: Eko Prasetyo (Lagging) */}
              <tr className="hover:bg-[#1e293b]/40 transition-colors bg-rose-950/10">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white text-xs">Eko Prasetyo</div>
                  <div className="text-[10px] text-rose-400 font-mono">peserta contoh · Operator Muda</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-rose-300 text-xs">IPA-07: Pompa Trip</div>
                  <div className="text-[10px] text-rose-400">Gagal 3x Percobaan berturut</div>
                </td>
                <td className="py-3 px-3 text-center font-mono font-bold text-rose-400">
                  58 <span className="text-[10px] text-slate-500 font-normal">/ 100</span>
                </td>
                <td className="py-3 px-3 text-center text-slate-500">
                  ☆☆☆
                </td>
                <td className="py-3 px-3 text-slate-400 text-[11px]">
                  3 hari lalu
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                    {unlockedEko ? 'Kunci Dibuka Instruktur' : 'TERTINGGAL (3X GAGAL)'}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1 font-mono text-[9px] font-bold">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white">01</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white">02</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white">03</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white">04</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white">05</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white">06</span>
                    <span className="px-1.5 py-0.5 rounded bg-rose-700 text-white animate-pulse">07 ✕</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#1e293b] text-slate-500">08 🔒</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#1e293b] text-slate-500">09 🔒</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={handleUnlockEko}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition-all"
                  >
                    Buka Kunci
                  </button>
                </td>
              </tr>

              {/* ROW 4: Siti Rahmawati */}
              <tr className="hover:bg-[#1e293b]/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white text-xs">Siti Rahmawati</div>
                  <div className="text-[10px] text-amber-400 font-mono">peserta.distribusi · Operator Muda</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-amber-300 text-xs">DST-06: Tekanan Drop</div>
                  <div className="text-[10px] text-slate-400">Jalur Distribusi (7 Misi)</div>
                </td>
                <td className="py-3 px-3 text-center font-mono font-bold text-sky-400">
                  82 <span className="text-[10px] text-slate-500 font-normal">/ 100</span>
                </td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">
                  ★★☆
                </td>
                <td className="py-3 px-3 text-slate-400 text-[11px]">
                  2 hari lalu
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                    Aktif Berjalan
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-[11px] font-mono text-slate-300">
                    DST-01 s/d 05 Lulus (11★) · Sisa 2 Misi
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => alert('Detail rekapitulasi progres Siti Rahmawati')}
                    className="px-2.5 py-1 rounded-lg bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-slate-200 font-semibold text-[11px] transition-all"
                  >
                    Detail Roster
                  </button>
                </td>
              </tr>

              {/* ROW 5: Rian Hidayat (Pending Approval) */}
              <tr className="hover:bg-[#1e293b]/40 transition-colors bg-amber-950/15">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white text-xs">Rian Hidayat</div>
                  <div className="text-[10px] text-purple-300 font-mono">peserta contoh · Operator Madya</div>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-white text-xs">IPA-09: Misi Kelulusan</div>
                  <div className="text-[10px] text-emerald-400">9/9 Misi Lulus · Post-test 82</div>
                </td>
                <td className="py-3 px-3 text-center font-mono font-bold text-emerald-400">
                  82 <span className="text-[10px] text-slate-500 font-normal">/ 100</span>
                </td>
                <td className="py-3 px-3 text-center text-amber-400 font-bold">
                  ★☆☆
                </td>
                <td className="py-3 px-3 text-emerald-400 font-semibold text-[11px]">
                  Hari ini
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    approvalDone
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {approvalDone ? 'Piagam Disetujui ✓' : 'Menunggu Persetujuan'}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-[11px] text-emerald-300 font-semibold">
                    Semua syarat terpenuhi · SSA/NUS/2026/0002 dicadangkan
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  {approvalDone ? (
                    <span className="text-emerald-400 font-bold text-xs">DISETUJUI ✓</span>
                  ) : (
                    <button
                      onClick={handleApproveRian}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-950/50"
                    >
                      SETUJUI PIAGAM
                    </button>
                  )}
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
