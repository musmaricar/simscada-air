/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Filter, 
  TrendingUp, 
  Clock,
  Award,
  AlertTriangle,
  Users
} from 'lucide-react';

export const L14_TenantEvaluationDashboard: React.FC = () => {
  const { currentTenant, getTenantMetrics } = useApp();

  const [period, setPeriod] = useState('6_months');
  const [trackFilter, setTrackFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');
  const [instructorFilter, setInstructorFilter] = useState('budi');

  // Dynamically computed metrics for current tenant
  const metrics = getTenantMetrics(currentTenant.id);

  const handleExportExcel = () => {
    alert(`Mengekspor Laporan Evaluasi Pelatihan ${currentTenant.name} ke berkas Excel (.xlsx)...`);
  };

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-[#1e293b]">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Dasbor Evaluasi Lembaga & ROI Pelatihan
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          4 Metrik Kunci Keberhasilan (T1–T4 PRD §3) · Kartu Pemakaian Lisensi & Ekspor Laporan (PRD §12)
        </p>
      </div>

      {/* Filter & Action Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0f172a] border border-[#24324d] shadow-sm">
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-semibold">Periode:</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-[#0b1120] border border-[#334155] rounded-xl px-2.5 py-1 text-slate-200 text-xs font-semibold focus:outline-hidden"
            >
              <option value="6_months">6 Bulan Terakhir</option>
              <option value="1_year">1 Tahun Penuh</option>
              <option value="3_months">Kuartal Ini (Q3/Q4)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-semibold">Jalur:</span>
            <select
              value={trackFilter}
              onChange={(e) => setTrackFilter(e.target.value)}
              className="bg-[#0b1120] border border-[#334155] rounded-xl px-2.5 py-1 text-slate-200 text-xs font-semibold focus:outline-hidden"
            >
              <option value="all">Semua Jalur</option>
              <option value="ipa">Operator IPA</option>
              <option value="distribusi">Operator Distribusi</option>
              <option value="terpadu">Air Minum Terpadu</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-semibold">Kelompok:</span>
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="bg-[#0b1120] border border-[#334155] rounded-xl px-2.5 py-1 text-slate-200 text-xs font-semibold focus:outline-hidden"
            >
              <option value="all">Angkatan 1 & 2</option>
              <option value="g1">Angkatan 1 Saja</option>
              <option value="g2">Angkatan 2 Saja</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-semibold">Instruktur:</span>
            <select
              value={instructorFilter}
              onChange={(e) => setInstructorFilter(e.target.value)}
              className="bg-[#0b1120] border border-[#334155] rounded-xl px-2.5 py-1 text-slate-200 text-xs font-semibold focus:outline-hidden"
            >
              <option value="budi">Budi Santoso, S.T.</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="px-3 py-1.5 rounded-xl bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ekspor Excel (.xlsx)</span>
          </button>

          <button
            onClick={handleExportPdf}
            className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-sky-950/50"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ekspor PDF Berkop</span>
          </button>
        </div>
      </div>

      {/* 4 Cards Metrik Kunci Keberhasilan (T1–T4 PRD §3) matching SVG L14 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* T1: Peningkatan Kompetensi */}
        <div className="p-4 rounded-2xl bg-[#0f172a] border border-emerald-500/40 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              T1: PENINGKATAN KOMPETENSI (PRD §3):
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-[9px] border border-emerald-500/30">
              TARGET: ≥ 25% (LULUS)
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            +{metrics.t1ImprovementPercent}%
          </div>
          <div className="text-[11px] text-slate-300">
            Pre-Test Rata-Rata: {metrics.t1PreAverage} | Post-Test: {metrics.t1PostAverage}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Formula: (({metrics.t1PostAverage} − {metrics.t1PreAverage}) ÷ {metrics.t1PreAverage}) × 100% = +{metrics.t1ImprovementPercent}%
          </div>
        </div>

        {/* T2: Penguasaan 5 Gangguan Utama */}
        <div className="p-4 rounded-2xl bg-[#0f172a] border border-sky-500/40 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              T2: PENGUASAAN 5 GANGGUAN UTAMA:
            </span>
            <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-bold text-[9px] border border-sky-500/30">
              TARGET: ≥ 80% (LULUS)
            </span>
          </div>
          <div className="text-3xl font-black text-sky-400 font-mono">
            {metrics.t2PassingRatePercent}%
          </div>
          <div className="text-[11px] text-slate-300">
            Lulus IPA-06, 07, 08 & DST-05, 06 (≥1★)
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            {metrics.t2PassedCount} dari {metrics.activeParticipantsCount} peserta aktif lulus ke-5 gangguan
          </div>
        </div>

        {/* T3: Waktu Menuju Kelulusan */}
        <div className="p-4 rounded-2xl bg-[#0f172a] border border-amber-500/40 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              T3: WAKTU MENUJU KELULUSAN:
            </span>
            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold text-[9px] border border-amber-500/30">
              ±2 BULAN (TARGET T3)
            </span>
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono">
            {metrics.t3MedianDays} Hari
          </div>
          <div className="text-[11px] text-slate-300">
            Median mulai jalur hingga piagam terbit
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Turun dari orientasi konvensional (±90 hari)
          </div>
        </div>

        {/* T4: Penyelesaian Jalur (Kelulusan) */}
        <div className="p-4 rounded-2xl bg-[#0f172a] border border-purple-500/40 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              T4: PENYELESAIAN JALUR (KELULUSAN):
            </span>
            <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold text-[9px] border border-purple-500/30">
              TARGET: ≥ 70% (LULUS)
            </span>
          </div>
          <div className="text-3xl font-black text-purple-400 font-mono">
            {metrics.t4GraduationRatePercent}%
          </div>
          <div className="text-[11px] text-slate-300">
            {metrics.t4GraduatesCount} Piagam Terbit ÷ {metrics.activeParticipantsCount} Peserta Aktif
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Peserta aktif = login 14 hari terakhir
          </div>
        </div>

      </div>

      {/* Kartu Pemakaian Lisensi & Nilai Investasi (ROI Diklat PRD §12) */}
      <div className="p-5 rounded-2xl bg-[#0f172a] border border-[#24324d] shadow-lg space-y-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          KARTU PEMAKAIAN LISENSI & NILAI INVESTASI (ROI DIKLAT PRD §12):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Kursi Lisensi Terpakai:</span>
            <div className="text-xl font-black text-white font-mono mt-0.5">
              {metrics.usedSeats} / {metrics.quotaSeats} <span className="text-xs text-amber-400 font-bold">({metrics.usedSeatsPercent}% Terpakai)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Sisa Masa Berlaku Lisensi:</span>
            <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
              {metrics.remainingDays} Hari Tersisa
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Waktu Simulasi SCADA:</span>
            <div className="text-xl font-black text-sky-400 font-mono mt-0.5">
              {metrics.totalSimulationHours} Jam Praktik
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Peserta Aktif (14 Hari Terakhir):</span>
            <div className="text-xl font-black text-purple-400 font-mono mt-0.5">
              {metrics.activeParticipantsCount} Peserta Aktif
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: 5 Misi Paling Sulit + Analisis Kesalahan Tersering */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 5 Misi Paling Sulit */}
        <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-5 space-y-4 shadow-lg">
          <div>
            <h2 className="text-sm font-bold text-white">5 Misi Paling Sulit (Tingkat Gagal Percobaan Pertama PRD §12):</h2>
            <p className="text-[11px] text-slate-400">Bahan evaluasi materi pengajaran bagi instruktur SPAM</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>1. IPA-06 Gangguan Lonjakan Kekeruhan Air Baku</span>
                <span className="font-bold text-rose-400">42% Gagal Percobaan 1</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>2. DST-05 Gangguan Kebocoran Pipa Distribusi</span>
                <span className="font-bold text-amber-400">38% Gagal Percobaan 1</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '38%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>3. TRP-01 Gangguan Berantai Hulu ke Hilir</span>
                <span className="font-bold text-amber-400">35% Gagal Percobaan 1</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '35%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>4. DST-06 Gangguan Tekanan Jaringan Drop</span>
                <span className="font-bold text-sky-400">31% Gagal Percobaan 1</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '31%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>5. IPA-07 Gangguan Pompa Intake Trip</span>
                <span className="font-bold text-emerald-400">28% Gagal Percobaan 1</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Analisis Kesalahan Tersering & Komparasi Kelompok */}
        <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-5 space-y-4 shadow-lg">
          <div>
            <h2 className="text-sm font-bold text-white">Analisis Kesalahan Tersering & Perbandingan Angkatan (PRD §12):</h2>
            <p className="text-[11px] text-slate-400">Bahan penyempurnaan SOP operasional dan kurikulum kelas</p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 space-y-0.5">
              <span className="font-bold">1. Terlambat Naikkan Koagulan saat Lonjakan Baku (34 Kejadian)</span>
              <p className="text-[10px] text-slate-400">Rata-rata respons terlambat 28 detik dari target awal.</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300 space-y-0.5">
              <span className="font-bold">2. Menekan Tombol Clear saat Kondisi Masih Abnormal (26 Kejadian)</span>
              <p className="text-[10px] text-slate-400">Sistem menolak dengan pesan "Penyebab belum ditangani".</p>
            </div>

            <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b] text-slate-300 space-y-0.5">
              <span className="font-bold text-sky-400">3. Menutup Valve Isolasi yang Salah pada Kebocoran (18 Kejadian)</span>
              <p className="text-[10px] text-slate-400">Mengakibatkan tekanan drop merembet ke zona pelanggan aktif.</p>
            </div>
          </div>

          {/* Komparasi Kelompok */}
          <div className="pt-2 border-t border-[#1e293b] space-y-2">
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
              KOMPARASI KELOMPOK (ANGKATAN 1 VS ANGKATAN 2):
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                <div className="font-bold text-white text-[11px]">Angkatan 1 (Budi Santoso)</div>
                <div className="text-[10px] text-emerald-400 mt-1 font-mono">
                  Rata-Rata Skor: 84,2 · Kelulusan: 79%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                <div className="font-bold text-white text-[11px]">Angkatan 2 (Budi Santoso)</div>
                <div className="text-[10px] text-sky-400 mt-1 font-mono">
                  Rata-Rata Skor: 81,0 · Kelulusan: 71%
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
