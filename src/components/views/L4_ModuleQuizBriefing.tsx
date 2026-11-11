/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mission } from '../../types';
import { 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Check, 
  CheckCircle2, 
  HelpCircle, 
  Play, 
  ShieldAlert, 
  Sparkles,
  Info
} from 'lucide-react';

interface ModuleQuizProps {
  mission: Mission;
  onStartSimulation: () => void;
  onBack: () => void;
}

export const L4_ModuleQuizBriefing: React.FC<ModuleQuizProps> = ({
  mission,
  onStartSimulation,
  onBack,
}) => {
  // Pre-seed Dimas's answers (4/5 correct -> 80 score -> passed gate!)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({
    0: 2, // Q1 correct (3.0 NTU)
    1: 1, // Q2 correct (Akui alarm dan naikkan koagulan)
    2: 1, // Q3 correct (Otomatis clear kekeruhan <= 2.7 NTU 10s)
    3: 1, // Q4 correct (Ditolak: penyebab belum ditangani)
    4: 1, // Q5 incorrect or correct
  });

  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(true);
  const [quizScore, setQuizScore] = useState<number>(80);

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleEvaluateQuiz = () => {
    let correct = 0;
    mission.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct += 1;
      }
    });
    const score = Math.round((correct / mission.quiz.length) * 100);
    setQuizScore(score);
    setIsQuizSubmitted(true);
  };

  const isGatePassed = quizScore >= 60;

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1e293b]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Modul Materi & Kuis Pra-Misi
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Misi {mission.code}: {mission.name} ({mission.levelName}) · PRD §7, §9
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

      {/* Main Grid: Left Column = Theory & SOP (Width: 60%), Right Column = Quiz (Width: 40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Materi Teori & SOP Penanganan */}
        <div className="lg:col-span-7 bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-5 shadow-lg">
          <div>
            <h2 className="text-base font-bold text-white">
              Materi Teori & SOP: Penanganan Lonjakan Kekeruhan Air Baku
            </h2>
            <p className="text-xs text-slate-400">
              Standar Pengolahan Fisik-Kimia Air Minum (Permenkes No. 2/2023 & SNI 6774:2008)
            </p>
          </div>

          {/* Skenario Box */}
          <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 text-xs space-y-1">
            <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">
              Ringkasan Skenario Misi IPA-06 (PRD §7):
            </span>
            <p className="text-slate-200 leading-relaxed text-[11px]">
              Kekeruhan air baku sungai melonjak drastis dari <span className="text-amber-400 font-bold">20 NTU menjadi 185 NTU</span> akibat hujan deras di hulu. Tugas Anda: Akui alarm, sesuaikan dosis koagulan PAC dan penyesuai pH kapur, jaga kekeruhan air olahan &lt;3 NTU.
            </p>
          </div>

          {/* 3 SOP Poin & Ambang Batas Kritis */}
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Poin SOP & Ambang Batas Operasional Kritis (Permenkes No. 2/2023):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                <div className="text-[10px] text-slate-400">Batas Kekeruhan Air Olahan</div>
                <div className="text-base font-extrabold text-rose-400 mt-0.5">&lt; 3,0 NTU</div>
                <div className="text-[9px] text-slate-500 mt-1">≥3 NTU: Alarm Kritis Tinggi</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                <div className="text-[10px] text-slate-400">Rentang Aman pH Koagulasi</div>
                <div className="text-base font-extrabold text-emerald-400 mt-0.5">6,5 – 8,5</div>
                <div className="text-[9px] text-slate-500 mt-1">Koreksi dengan penyesuai pH</div>
              </div>

              <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                <div className="text-[10px] text-slate-400">Target Waktu Skenario IPA-06</div>
                <div className="text-base font-extrabold text-amber-400 mt-0.5">60 Detik</div>
                <div className="text-[9px] text-slate-500 mt-1">Respons &lt;30s: Lencana Respons Kilat</div>
              </div>
            </div>
          </div>

          {/* 7 Langkah SOP Resmi */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Langkah Standar Operasional Prosedur (SOP Penanganan Lonjakan Kekeruhan):
            </div>
            <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-2 text-[11px] text-slate-300 leading-relaxed font-mono">
              <p>1. <span className="text-sky-300 font-bold">Akui Alarm (ACK):</span> Segera tekan tombol Akui begitu alarm "Kekeruhan Air Baku Tinggi" muncul di HMI.</p>
              <p>2. <span className="text-sky-300 font-bold">Buka Panel Koagulasi:</span> Klik titik kontrol Flash Mixer Koagulasi di diagram mimic HMI.</p>
              <p>3. <span className="text-sky-300 font-bold">Naikkan Dosis Koagulan:</span> Sesuaikan setpoint dosis PAC dari 20 mg/L ke 48 mg/L sesuai kurva jar-test.</p>
              <p>4. <span className="text-sky-300 font-bold">Koreksi pH Air:</span> Pastikan dosis penyesuai pH aktif agar pH bertahan stabil di angka 7,20.</p>
              <p>5. <span className="text-sky-300 font-bold">Turunkan Debit Intake (Opsional):</span> Jika flok lambat mengendap, kurangi debit dari 100 L/s ke 75 L/s.</p>
              <p>6. <span className="text-sky-300 font-bold">Pantau Bak Sedimentasi & Filtrasi:</span> Awasi kekeruhan keluar sedimentasi dan kenaikan headloss filter.</p>
              <p>7. <span className="text-sky-300 font-bold">Verifikasi Pemulihan:</span> Alarm akan auto-clear saat kekeruhan air olahan &lt;2,7 NTU stabil 10 detik.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#1e293b]/50 border border-[#334155] text-[11px] text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Catatan: Membuka narasi titik kontrol ("i") kapan saja <strong>TIDAK mengurangi skor</strong> (PRD §9).</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Kuis Pra-Misi (5 Soal Kunci) */}
        <div className="lg:col-span-5 bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-5 shadow-lg">
          <div>
            <h2 className="text-base font-bold text-white">
              Kuis Pra-Misi (5 Soal Kunci)
            </h2>
            <p className="text-xs text-slate-400">
              Syarat Gerbang: Nilai Kuis ≥ 60 membuka Simulator · Nilai kuis memberi bonus XP
            </p>
          </div>

          {/* Status Kuis Gerbang Box */}
          <div className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
            isGatePassed ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
          }`}>
            <div>
              <div className="font-bold flex items-center gap-1.5 text-xs">
                {isGatePassed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                <span>STATUS KUIS: LULUS GERBANG (NILAI: {quizScore} / 100)</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                4 dari 5 Soal Benar · +80 XP telah ditambahkan ke profil Anda.
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              LULUS ≥ 60
            </span>
          </div>

          {/* Quiz Questions List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {mission.quiz.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              return (
                <div key={q.id} className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-2 text-xs">
                  <div className="font-bold text-white text-[11px] leading-snug">
                    SOAL {qIdx + 1} DARI {mission.quiz.length} · {q.question}
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      const isCorrectAnswer = optIdx === q.correctIndex;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`w-full text-left p-2 rounded-lg border text-[11px] transition-all flex items-center justify-between ${
                            isChosen && isCorrectAnswer
                              ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold'
                              : isChosen && !isCorrectAnswer
                              ? 'bg-rose-950/40 border-rose-500 text-rose-300 font-semibold'
                              : isCorrectAnswer && isQuizSubmitted
                              ? 'border-emerald-500/40 text-emerald-400'
                              : 'border-[#1e293b] bg-[#1e293b]/30 hover:bg-[#1e293b] text-slate-300'
                          }`}
                        >
                          <span>{opt}</span>
                          {isChosen && isCorrectAnswer && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="space-y-2 pt-2 border-t border-[#1e293b]">
            <button
              onClick={onStartSimulation}
              disabled={!isGatePassed}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                isGatePassed
                  ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-950/50 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>Mulai Simulator SCADA (IPA-06) →</span>
            </button>
            <p className="text-[10px] text-center text-slate-500">
              Gerbang kuis telah terpenuhi. Sesi simulator akan dibuka dengan timer 10 menit.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
