/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  Check, 
  HelpCircle, 
  TrendingUp, 
  FileCheck2,
  Lock,
  ArrowRight
} from 'lucide-react';

interface PrePostTestProps {
  onBack: () => void;
  onViewCertificate: () => void;
}

export const L4a_PrePostTest: React.FC<PrePostTestProps> = ({ onBack, onViewCertificate }) => {
  const { currentUser, currentTenant, savePrePostTest } = useApp();
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(13); // Question 14 (0-indexed 13)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({
    0: 0, 1: 1, 2: 2, 3: 0, 4: 1, 5: 0, 6: 2, 7: 1, 8: 0, 9: 1,
    10: 2, 11: 0, 12: 1, 13: 1, // Q14 option B
  });

  const sampleQuestions = [
    {
      id: 14,
      category: 'STUDI KASUS PROSES IPA',
      question: 'Jika kekeruhan air baku naik dari 20 NTU menjadi 180 NTU dalam waktu 10 menit, tindakan awal manakah yang paling tepat sesuai SOP?',
      options: [
        'A. Segera menguras bak sedimentasi dengan blowdown penuh',
        'B. Akui alarm, naikkan dosis koagulan & koreksi pH, turunkan debit intake (Pilihan Anda)',
        'C. Menutup valve masuk filter dan mematikan seluruh pompa',
        'D. Menunggu air baku jernih kembali secara alami',
      ],
      correctIndex: 1,
    },
  ];

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1e293b]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Pre-Test & Post-Test Evaluasi Kompetensi
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Pengukuran Indikator Keberhasilan Metrik T1: Kenaikan Kompetensi ≥ 25% (PRD §3 & §11)
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 rounded-xl border border-[#334155] bg-[#1e293b]/70 hover:bg-[#1e293b] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>

      {/* Metric T1 Banner */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/40 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        <div>
          <div className="font-bold text-purple-300 uppercase tracking-wider text-[11px] mb-0.5">
            METRIK KEBERHASILAN T1 (PRD §3): FORMULA KENAIKAN KOMPETENSI PELATIHAN
          </div>
          <div className="text-slate-300 font-mono text-xs">
            Peningkatan Nilai (%) = ((Skor Post-Test − Skor Pre-Test) ÷ Skor Pre-Test) × 100% · <span className="text-emerald-400 font-semibold font-sans">Target PRD: Kenaikan ≥ 25%</span>
          </div>
        </div>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs uppercase tracking-wider whitespace-nowrap self-start md:self-center">
          TARGET T1: ≥ 25%
        </span>
      </div>

      {/* 3 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMN 1: Pre-Test Dimas Wahyu Pratama */}
        <div className="lg:col-span-4 bg-[#0f172a] rounded-2xl border border-[#24324d] p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 uppercase tracking-wider">
                Tahap Awal
              </span>
              <h2 className="text-sm font-bold text-white mt-1.5">Pre-Test Diagnostik Awal</h2>
              <p className="text-[11px] text-slate-400">Peserta: Dimas Wahyu Pratama (peserta.ipa)</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400">Skor Baseline Kompetensi Awal:</div>
              <div className="text-2xl font-black text-amber-400 mt-0.5">
                56 <span className="text-sm font-normal text-slate-400">/ 100</span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">28 Okt 2026</span>
          </div>

          {/* Competency Bars */}
          <div className="space-y-3 text-xs pt-1">
            <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Peta Capaian Kompetensi Awal:
            </div>
            
            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>1. Operasi Normal IPA</span>
                <span className="font-bold text-sky-400">65%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>2. Mutu Air (Kekeruhan & Klor)</span>
                <span className="font-bold text-sky-400">50%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>3. Tanggap Darurat & Alarm</span>
                <span className="font-bold text-rose-400">40% (Rendah)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '40%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>4. Hidrolika Distribusi</span>
                <span className="font-bold text-sky-400">60%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1e293b]">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-950/20 border border-sky-500/20 text-[11px] text-slate-300 space-y-1">
            <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">Catatan Evaluasi Awal Sistem:</span>
            <p className="leading-relaxed">
              Peserta memahami dasar pengolahan fisik namun belum memiliki ketangkasan dalam mengenali kode alarm ISA-18.2 dan penanganan pompa trip beruntun. Direkomendasikan fokus pada modul gangguan L5.
            </p>
          </div>
        </div>

        {/* COLUMN 2: Lembar Uji Teori & Studi Kasus (Width: 5 cols) */}
        <div className="lg:col-span-5 bg-[#0f172a] rounded-2xl border border-[#24324d] p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
            <div>
              <h2 className="text-sm font-bold text-white">Lembar Uji Kompetensi Teori & Studi Kasus</h2>
              <p className="text-[11px] text-slate-400">20 Soal Pilihan Ganda Berbobot · Batas Waktu 30 Menit</p>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-sky-950/50 border border-sky-500/40 text-sky-400 text-xs font-mono font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>18:42 Tersisa</span>
            </div>
          </div>

          {/* Active Question Box */}
          <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-3">
            <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
              SOAL NO. 14 DARI 20 · STUDI KASUS PROSES IPA
            </div>
            <p className="text-xs font-semibold text-white leading-relaxed">
              Jika kekeruhan air baku naik dari 20 NTU menjadi 180 NTU dalam waktu 10 menit, tindakan awal manakah yang paling tepat sesuai SOP?
            </p>

            <div className="space-y-2 pt-1 text-xs">
              {sampleQuestions[0].options.map((opt, oIdx) => {
                const isSelected = oIdx === 1; // Option B
                return (
                  <div
                    key={oIdx}
                    className={`p-2.5 rounded-xl border text-[11px] leading-snug transition-all ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold shadow-xs'
                        : 'border-[#1e293b] bg-[#1e293b]/30 text-slate-400'
                    }`}
                  >
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Navigator 1 to 20 */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
              Navigator 20 Nomor Soal:
            </div>
            <div className="grid grid-cols-10 gap-1.5">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                const isCurrent = num === 14;
                const isAnswered = num <= 14;
                return (
                  <button
                    key={num}
                    onClick={() => setActiveQuestionIdx(num - 1)}
                    className={`h-7 rounded-lg text-[11px] font-mono font-bold transition-all ${
                      isCurrent
                        ? 'bg-sky-500 text-white ring-2 ring-sky-400/50'
                        : isAnswered
                        ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40'
                        : 'bg-[#1e293b] text-slate-400 border border-[#334155]'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* COLUMN 3: Post-Test Andi Kurniawan */}
        <div className="lg:col-span-3 bg-[#0f172a] rounded-2xl border border-[#24324d] p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 uppercase tracking-wider">
                Pasca Pelatihan
              </span>
              <h2 className="text-sm font-bold text-white mt-1.5">Post-Test Kelulusan Jalur</h2>
              <p className="text-[11px] text-slate-400">Peserta: Andi Kurniawan (peserta.lulus)</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400">Capaian Post-Test Akhir:</div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5">
                88 <span className="text-sm font-normal text-slate-400">/ 100</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Status: Lulus (≥70)
            </span>
          </div>

          {/* Metric T1 Result Card */}
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2 text-xs">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
              Hasil Metrik T1 Kenaikan Kompetensi:
            </span>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span>Pre-Test: <strong className="text-white">54</strong></span>
              <span>Post-Test: <strong className="text-emerald-400">88</strong></span>
            </div>
            <div className="text-xs font-bold text-emerald-300">
              Kenaikan: +34 Poin (+63,0%)
            </div>
            <div className="py-1 px-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-bold text-center border border-emerald-500/30">
              ✓ MELEBIHI TARGET PRD T1 (+63% &gt; 25%)
            </div>
          </div>

          {/* 4 Checklist Criteria */}
          <div className="space-y-1.5 text-[11px] pt-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Status Verifikasi Syarat Piagam:
            </div>
            <div className="text-emerald-400 flex items-center gap-1.5">
              <span>✓</span> <span>17 Misi Jalur Terpadu: Selesai</span>
            </div>
            <div className="text-emerald-400 flex items-center gap-1.5">
              <span>✓</span> <span>Misi Kelulusan TRP-02: Lulus (Skor 94 ≥ 80)</span>
            </div>
            <div className="text-emerald-400 flex items-center gap-1.5">
              <span>✓</span> <span>Post-Test Akhir: 88 / 100 (Lulus ≥ 70)</span>
            </div>
            <div className="text-emerald-400 flex items-center gap-1.5">
              <span>✓</span> <span>Piagam SSA/NUS/2026/0001: TERBIT (Operator Ahli)</span>
            </div>
          </div>

          <button
            onClick={onViewCertificate}
            className="w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-sky-950/50 cursor-pointer"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Lihat Piagam Saya (L8) →</span>
          </button>
        </div>

      </div>
    </div>
  );
};
