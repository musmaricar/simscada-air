/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  History, 
  Pause, 
  Play, 
  RotateCcw, 
  Save, 
  Sparkles,
  Sliders
} from 'lucide-react';

interface SessionReplayProps {
  initialUserId?: string;
  onBack: () => void;
}

export const L11_SessionReplay: React.FC<SessionReplayProps> = ({
  initialUserId = 'user-peserta-ipa',
  onBack,
}) => {
  const { currentTenant, users } = useApp();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(2);
  const [currentSec, setCurrentSec] = useState<number>(130); // 02:10 (130 seconds)
  const [instructorNotes, setInstructorNotes] = useState<string>(
    'Tindakan Dimas pada 02:10 sangat tepat sesuai SOP. Respons waktu 25 detik memenuhi syarat Lencana Respons Kilat (25 dtk < 30 dtk). Skor 88, 2★.'
  );

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSaveNotes = () => {
    alert('Catatan evaluasi instruktur berhasil disimpan dan divalidasi ke portofolio siswa!');
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1e293b]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Investigasi Audit & Putar Ulang Sesi (Replay)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Sesi Contoh Konsisten: Dimas Wahyu Pratama · IPA-06 Lonjakan Kekeruhan (Waktu, Alarm & Nilai Identik L6)
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-3.5 py-1.5 rounded-xl border border-[#334155] bg-[#1e293b]/70 hover:bg-[#1e293b] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Dasbor Instruktur</span>
        </button>
      </div>

      {/* Interactive Timeline Scrubber Bar matching SVG L11 */}
      <div className="p-4 rounded-2xl bg-[#0f172a] border border-[#24324d] shadow-lg space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-1 bg-[#0b1120] border border-[#1e293b] rounded-xl p-1 text-xs font-mono font-bold">
              {[1, 2, 3].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 rounded-lg transition-all ${
                    playbackSpeed === spd ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
            <span className="font-mono text-sm font-black text-white ml-2">
              {formatTime(currentSec)} <span className="text-xs text-slate-500 font-normal">/ 08:30</span>
            </span>
          </div>

          <div className="text-xs font-semibold text-amber-400 bg-amber-950/30 border border-amber-500/40 px-3 py-1 rounded-xl">
            ⏱ Posisi: Operator menaikkan dosis koagulan ke 48 mg/L
          </div>
        </div>

        {/* Scrubber Bar with Staggered Markers */}
        <div className="relative pt-6 pb-4">
          <input
            type="range"
            min={0}
            max={510}
            value={currentSec}
            onChange={(e) => setCurrentSec(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer h-2 rounded-lg bg-[#1e293b]"
          />

          {/* Staggered Event Markers */}
          <div className="absolute top-0 left-0 right-0 flex justify-between text-[9px] font-mono text-slate-400 px-1 pointer-events-none">
            <span className="text-amber-400">01:15 (Alarm Baku)</span>
            <span className="text-sky-300">01:25 (ACK)</span>
            <span className="text-rose-400">01:45 (≥3 NTU)</span>
            <span className="text-emerald-400 font-bold">02:10 (Koreksi)</span>
            <span className="text-sky-300">02:40 (Debit 75 L/s)</span>
            <span className="text-emerald-400">06:20 (Auto-Clear)</span>
            <span className="text-slate-400">08:30 (Selesai)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Snapshot & Real-Time Graph, Right = Audit Log & Instructor Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Process State Snapshot & Graph (Width: 8 cols) */}
        <div className="lg:col-span-8 bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-6 shadow-lg">
          <div>
            <h2 className="text-base font-bold text-white">
              Kondisi Proses Pada Detik Terpilih ({formatTime(currentSec)})
            </h2>
            <p className="text-xs text-slate-400">
              Nilai parameter di layar HMI saat operator mengeksekusi koreksi dosis koagulan
            </p>
          </div>

          {/* 4 Process Units Snapshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">1. Intake Air Baku</span>
              <div className="text-xs text-white">Debit: <strong className="text-sky-400">100 L/s</strong></div>
              <div className="text-xs text-white">Kekeruhan: <strong className="text-amber-400">185 NTU</strong></div>
              <div className="text-[10px] text-amber-400 font-semibold pt-1">Alarm Sedang Diakui ✓</div>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/50 space-y-1">
              <span className="text-[10px] text-sky-400 uppercase tracking-wider block font-bold">2. Koagulasi (Aktif Diubah)</span>
              <div className="text-xs text-white">Dosis PAC: <strong className="text-sky-300 font-mono">48,0 mg/L</strong></div>
              <div className="text-xs text-white">pH Koagulasi: <strong className="text-emerald-400 font-mono">7,20</strong></div>
              <div className="text-[10px] text-emerald-400 font-semibold pt-1">Tindakan SOP Tepat ✓</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">3. Filtrasi Pasir Cepat</span>
              <div className="text-xs text-white">Kekeruhan: <strong className="text-rose-400 font-mono">3,4 NTU</strong></div>
              <div className="text-xs text-white">Headloss: <strong className="text-slate-300 font-mono">1,6 Meter</strong></div>
              <div className="text-[10px] text-rose-400 font-semibold pt-1">Alarm Tinggi Diakui</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">4. Desinfeksi Reservoir</span>
              <div className="text-xs text-white">Dosis Klor: <strong className="text-slate-300 font-mono">1,20 mg/L</strong></div>
              <div className="text-xs text-white">Sisa Klor: <strong className="text-emerald-400 font-mono">0,38 mg/L</strong></div>
              <div className="text-[10px] text-emerald-400 font-semibold pt-1">Kualitas Siap Minum</div>
            </div>
          </div>

          {/* Sync Real-Time Graph */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="uppercase tracking-wider">Grafik Parameter Real-Time 1 Hz (Identik L6 & Data PRD §10):</span>
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="text-amber-400">● Kekeruhan Baku (185 NTU)</span>
                <span className="text-sky-400">● Air Olahan (NTU)</span>
                <span className="text-emerald-400">● Dosis PAC (mg/L)</span>
              </div>
            </div>

            <div className="h-44 rounded-xl bg-[#0b1120] border border-[#1e293b] p-3 flex flex-col justify-between relative overflow-hidden font-mono text-[10px]">
              {/* Threshold line 3.0 NTU */}
              <div className="absolute top-1/2 left-0 right-0 border-b border-rose-500/50 border-dashed pointer-events-none">
                <span className="text-rose-400 text-[9px] float-right pr-2">Ambang Permenkes: 3,0 NTU</span>
              </div>

              {/* Cursor position line */}
              <div className="absolute top-0 bottom-0 left-[26%] border-r-2 border-white/60 border-dashed pointer-events-none flex flex-col justify-start">
                <span className="bg-white text-slate-950 font-bold px-1 rounded-sm text-[8px] self-start mt-1">
                  02:10 WAKTU
                </span>
              </div>

              {/* Simulated Curves */}
              <svg className="w-full h-full" viewBox="0 0 800 120" preserveAspectRatio="none">
                {/* Raw Water Turbidity (Orange Line) */}
                <path d="M 0 100 L 120 100 L 140 20 L 780 20" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                {/* PAC Dosing (Cyan Line) */}
                <path d="M 0 100 L 210 100 L 220 50 L 780 50" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                {/* Filtered Water Turbidity (Curve dropping from 3.4 to 2.4) */}
                <path d="M 0 105 L 140 105 L 170 55 L 220 55 L 350 70 L 600 85 L 780 90" fill="none" stroke="#34d399" strokeWidth="2.5" />
              </svg>

              <div className="flex justify-between text-slate-500 text-[9px] pt-1">
                <span>00:00</span>
                <span>01:15 (Lonjakan Baku)</span>
                <span>02:10 (Koreksi)</span>
                <span>06:10 (Pulih)</span>
                <span>08:30 (Selesai)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Audit Log & Catatan Evaluasi (Width: 4 cols) */}
        <div className="lg:col-span-4 bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-5 shadow-lg">
          <div>
            <h2 className="text-base font-bold text-white">
              Audit Log Detik-per-Detik (PRD §10)
            </h2>
            <p className="text-xs text-slate-400">
              Sinkron dengan rekaman sensor & alarm ISA-18.2
            </p>
          </div>

          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 text-[11px] font-mono">
            <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-0.5">
              <span className="text-amber-400 font-bold">01:15 · ALARM MUNCUL (SEDANG)</span>
              <div className="text-slate-300">Kekeruhan air baku melonjak: 20 → 185 NTU</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-0.5">
              <span className="text-sky-300 font-bold">01:25 · AKUI ALARM (ACK)</span>
              <div className="text-slate-300">Alarm air baku diakui dalam 10 detik</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-0.5">
              <span className="text-rose-400 font-bold">01:45 · ALARM TINGGI MUNCUL</span>
              <div className="text-slate-300">Air olahan 3,4 NTU · diakui 01:50 (5 detik)</div>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-950/30 border border-sky-500/40 space-y-0.5">
              <span className="text-emerald-400 font-bold">02:10 · TINDAKAN KOREKSI UTAMA</span>
              <div className="text-slate-200">Dosis koagulan dinaikkan: 20 → 48 mg/L</div>
              <div className="text-[10px] text-sky-400">Respons 25 dtk · kapur 8,5 mg/L pada 02:25</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-0.5">
              <span className="text-sky-300 font-bold">02:40 · PENGATURAN DEBIT</span>
              <div className="text-slate-300">Debit intake diturunkan ke 75 L/s</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-0.5">
              <span className="text-emerald-400 font-bold">06:20 · AUTO-CLEAR ALARM TINGGI</span>
              <div className="text-slate-300">Kekeruhan 2,4 NTU stabil 10 dtk · Clear otomatis</div>
            </div>
          </div>

          {/* Form Evaluasi Instruktur */}
          <div className="space-y-2 pt-2 border-t border-[#1e293b]">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Catatan Evaluasi Instruktur (Budi Santoso, S.T.):
            </label>
            <textarea
              value={instructorNotes}
              onChange={(e) => setInstructorNotes(e.target.value)}
              rows={3}
              className="w-full p-2.5 bg-[#0b1120] border border-[#24324d] rounded-xl text-xs text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-sky-500 leading-relaxed font-sans"
            />
            <button
              onClick={handleSaveNotes}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-950/50"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Catatan & Validasi Sesi</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
