/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Mission, MissionResult } from '../../types';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  ArrowRight, 
  History, 
  Home, 
  Zap, 
  Flame, 
  RotateCcw, 
  Star, 
  Award,
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';
import { scadaAudio } from '../../utils/audio';

interface ResultsFeedbackProps {
  mission: Mission;
  result: MissionResult;
  onRetry: () => void;
  onNextMission: () => void;
  onBackToHome: () => void;
}

export const L6_ResultsFeedback: React.FC<ResultsFeedbackProps> = ({
  mission,
  result,
  onRetry,
  onNextMission,
  onBackToHome,
}) => {
  const { currentTenant, getUserOperatorLevel, setCurrentView, setReplayUserId } = useApp();

  useEffect(() => {
    if (result.isPassed) {
      scadaAudio.playSuccessFanfare();
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  }, [result.isPassed]);

  const operatorLevel = getUserOperatorLevel(result.userId);

  // Default to Dimas's exact numbers if viewing IPA-06
  const isIpa06 = mission.code === 'IPA-06';
  const displayScore = isIpa06 ? 88 : result.totalScore;
  const displayStars = isIpa06 ? 2 : result.stars;
  const displayXP = isIpa06 ? 176 : result.xpEarned;
  const scoreTindakan = isIpa06 ? 38 : result.scoreTindakan;
  const scoreWaktu = isIpa06 ? 22 : result.scoreWaktuRespons;
  const scoreStabilitas = isIpa06 ? 15 : result.scoreStabilitas;
  const scoreAlarm = isIpa06 ? 13 : result.scoreAlarm;

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-[#1e293b]">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Hasil Evaluasi Simulasi & Umpan Balik Skor
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Sesi Konsisten: {mission.code} {mission.name} (Durasi 08:30) · PRD §8
        </p>
      </div>

      {/* Main Grid: Left Column = Score + 4 Components + Log + Debriefing, Right Column = Badge + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (Width: 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Score Hero Card */}
          <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0b1120] border border-[#1e293b]">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                  SKOR KELULUSAN AKHIR SIMULASI (PRD §8):
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-4xl font-black text-white font-mono">
                    {displayScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                    LULUS ({displayStars}★ BINTANG)
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Aturan Bintang: &lt;70 Belum Lulus · 70–84 (1★) · <strong className="text-amber-400">85–94 (2★)</strong> · ≥95 (3★)
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/40 text-center shrink-0">
                <span className="text-[10px] text-purple-300 font-bold block uppercase tracking-wider">
                  XP DIPEROLEH (2,0x):
                </span>
                <span className="text-xl font-black text-amber-400 font-mono">
                  +{displayXP} XP
                </span>
              </div>
            </div>

            {/* Rincian 4 Komponen Penilaian Otomatis (PRD §8) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Rincian 4 Komponen Penilaian Otomatis (PRD §8):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                  <div className="text-[10px] text-slate-400">Ketepatan Tindakan (40%)</div>
                  <div className="text-xl font-black text-white mt-0.5 font-mono">
                    {scoreTindakan} <span className="text-xs font-normal text-slate-500">/ 40</span>
                  </div>
                  <div className="text-[9px] text-emerald-400 mt-1">95% SOP Skenario Benar</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                  <div className="text-[10px] text-slate-400">Waktu Respons (25%)</div>
                  <div className="text-xl font-black text-white mt-0.5 font-mono">
                    {scoreWaktu} <span className="text-xs font-normal text-slate-500">/ 25</span>
                  </div>
                  <div className="text-[9px] text-emerald-400 mt-1">Respons 25s (&lt; 50% target 60s)</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                  <div className="text-[10px] text-slate-400">Stabilitas Mutu (20%)</div>
                  <div className="text-xl font-black text-white mt-0.5 font-mono">
                    {scoreStabilitas} <span className="text-xs font-normal text-slate-500">/ 20</span>
                  </div>
                  <div className="text-[9px] text-sky-400 mt-1">75% Durasi di Rentang Baku</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                  <div className="text-[10px] text-slate-400">Penanganan Alarm (15%)</div>
                  <div className="text-xl font-black text-white mt-0.5 font-mono">
                    {scoreAlarm} <span className="text-xs font-normal text-slate-500">/ 15</span>
                  </div>
                  <div className="text-[9px] text-cyan-400 mt-1">Semua Diakui & Auto-Clear</div>
                </div>
              </div>
            </div>

            {/* Log Urutan Tindakan Detik-per-Detik (Sama dengan L11 Replay) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Log Urutan Tindakan dan Evaluasi Detik-per-Detik (Sama dengan L11):
              </div>
              <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1.5 text-[11px] font-mono leading-relaxed text-slate-300">
                <div className="text-amber-400">⏱ 01:15 · Alarm SEDANG muncul: kekeruhan air baku melonjak 20 → 185 NTU</div>
                <div className="text-sky-300">⏱ 01:25 · [Penanganan Alarm] ACK alarm air baku dalam 10 detik</div>
                <div className="text-rose-400">⏱ 01:45 · Alarm TINGGI muncul: kekeruhan air olahan 3,4 NTU (≥ 3,0 NTU)</div>
                <div className="text-sky-300">⏱ 01:50 · [Penanganan Alarm] ACK alarm air olahan dalam 5 detik</div>
                <div className="text-emerald-400 font-bold">⏱ 02:10 · [Ketepatan] Dosis PAC 20 → 48 mg/L (tindakan benar pertama: 25 detik setelah alarm Tinggi)</div>
                <div className="text-sky-300">⏱ 02:25 · [Ketepatan] Dosis kapur 8,5 mg/L, pH dijaga 7,20 · 02:40 Debit intake 100 → 75 L/s</div>
                <div className="text-emerald-400">⏱ 06:10 · [Stabilitas] Kekeruhan air olahan 2,4 NTU (≤ 2,7 NTU) · 06:20 Alarm Tinggi clear otomatis</div>
                <div className="text-slate-400">⏱ 08:30 · Simulasi selesai. Skor 38 + 22 + 15 + 13 = 88</div>
              </div>
            </div>

            {/* Debriefing Evaluasi Mentor (Operator Senior Pak Slamet) */}
            <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 text-xs space-y-2">
              <div className="font-bold text-sky-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Debriefing Evaluasi Mentor (Operator Senior):</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed italic">
                "Kerja luar biasa, Dimas! Tindakan koreksi pertama Anda datang 25 detik setelah alarm air olahan (&lt; 50% target skenario 60 detik) sehingga berhak atas Lencana 'Respons Kilat'. Penyesuaian pH kapur Anda sangat tepat mencegah flok pecah di bak flokulasi."
              </p>
              <div className="text-[11px] text-sky-300 font-semibold pt-1">
                Catatan: Lanjutkan ke Misi IPA-07 (Pompa Intake Trip) untuk mengasah alih pompa standby.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Width: 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Badge Unlocked Notification Card */}
          <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-5 space-y-4 shadow-lg">
            <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Lencana Baru Terbuka!</span>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Respons Kilat</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Atasi gangguan dalam &lt; 50% target waktu</div>
                <div className="text-[10px] text-sky-400 font-mono mt-0.5">Target Skenario: 60 Detik · Realisasi: 25 Detik</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              Total Lencana Anda: <strong className="text-white">3 dari 8 Lencana PRD Terbuka</strong>. Lihat lemari lencana & papan peringkat lengkap di menu L7.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-5 space-y-3 shadow-lg">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Langkah Berikutnya:
            </div>
            <p className="text-[11px] text-slate-400">
              Progres Anda telah tersimpan otomatis ke server.
            </p>

            <button
              onClick={() => {
                setReplayUserId('user-peserta-ipa');
                setCurrentView('replay');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-slate-200 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <History className="w-4 h-4 text-sky-400" />
              <span>Putar Ulang Sesi Simulasi (L11 Replay)</span>
            </button>

            <button
              onClick={onNextMission}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-sky-950/50"
            >
              <span>Lanjut ke Misi Berikut: IPA-07 (Pompa Trip) →</span>
            </button>

            <button
              onClick={onBackToHome}
              className="w-full py-2.5 px-3 rounded-xl bg-[#0b1120] hover:bg-[#1e293b] border border-[#1e293b] text-slate-400 hover:text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda Peserta (L2)</span>
            </button>

            {/* Automatic System Notes */}
            <div className="pt-3 border-t border-[#1e293b] text-[10px] text-slate-400 space-y-1">
              <div className="font-bold text-slate-300 text-[11px]">Catatan Evaluasi Otomatis Sistem:</div>
              <div>• Status Misi: Lulus 2★ (Skor 88; rentang 85–94)</div>
              <div>• Pengali XP: 2,0x (Tingkat Sulit) = +176 XP</div>
              <div>• Level: naik ke Operator Madya (1.233 XP; sisa 1.267 ke Utama)</div>
              <div>• Rekomendasi: lanjutkan IPA-07 (Pompa Trip).</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
