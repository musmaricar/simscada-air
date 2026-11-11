/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ControlPointDef, ScadaState } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, 
  ArrowDownRight, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Info, 
  SlidersHorizontal, 
  X,
  Compass,
  Building2
} from 'lucide-react';

interface NarrativeModalProps {
  controlPoint: ControlPointDef;
  scada: ScadaState;
  hasActiveAlarm: boolean;
  onClose: () => void;
}

export const NarrativeModal: React.FC<NarrativeModalProps> = ({
  controlPoint,
  scada,
  hasActiveAlarm,
  onClose,
}) => {
  const { currentTenant, markNarrativeOpened } = useApp();

  useEffect(() => {
    // Automatically register that participant has opened this educational narrative (PRD §9 & §8)
    // Does NOT deduct score!
    markNarrativeOpened(controlPoint.id);
  }, [controlPoint.id]);

  const localSopNote = currentTenant.config.localSopNotes?.[controlPoint.id] ||
    'Di instalasi latih IPA Balai Nusantara, injeksi koagulan memakai dosing pump otomatis dengan kalibrasi larutan PAC 10%. Batas minimum tangki harian adalah 20%.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in font-sans">
      <div className="bg-[#0f172a] rounded-2xl shadow-2xl border border-[#24324d] w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-100">
        
        {/* Header matching SVG L5a */}
        <div className="px-6 py-4 bg-[#0b1120] border-b border-[#1e293b] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-600/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Narasi Detail Titik Kontrol: {controlPoint.name}
              </h2>
              <span className="text-[11px] text-sky-400 font-medium">
                Unit Operasi Kimia-Fisik · Pembubuhan Koagulan PAC & Pengadukan Cepat (PRD §9)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e293b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alarm Banner if currently active */}
        {hasActiveAlarm && (
          <div className="px-6 py-2.5 bg-amber-950/40 border-b border-amber-500/40 text-amber-200 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Peringatan: Titik kontrol ini sedang memiliki alarm aktif. Tinjau Bagian 5 (Gangguan Umum & SOP Singkat) di bawah.</span>
          </div>
        )}

        {/* Content Body: 6 Sections matching SVG L5a */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          
          {/* Top 2 Columns: (1. Apa Ini) & (4. Dampak ke Hilir) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Apa Ini & Fungsinya */}
            <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-2">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                1. APA INI & FUNGSINYA (DESKRIPSI PROSES):
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">
                Unit pengaduk berkecepatan tinggi (G &gt; 750 s⁻¹) yang meratakan koagulan PAC ke seluruh aliran air baku dalam &lt; 60 detik untuk mendestabilisasi koloid penyebab kekeruhan.
              </p>
              <div className="p-3 bg-[#0f172a] rounded-lg border border-[#1e293b] text-center text-[10px] text-sky-300 font-mono">
                [Skema Visual Mixer: Injeksi PAC 48 mg/L]
              </div>
            </div>

            {/* 4. Dampak ke Hilir */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2 text-xs">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                4. DAMPAK KE HILIR (DOWNSTREAM IMPACT):
              </span>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <p>• <strong className="text-amber-300">Underdosing Koagulan:</strong> Flok tidak terbentuk sempurna, kekeruhan lolos melewati bak sedimentasi dan membebani filter pasir cepat hingga cepat jenuh.</p>
                <p>• <strong className="text-amber-300">Overdosing Koagulan:</strong> Pemborosan bahan kimia, pH air olahan anjlok tajam, dan lumpur berlebih yang mempercepat sedimentasi meluap ke filter.</p>
              </div>
            </div>
          </div>

          {/* Middle 2 Columns: (2. Yang Dipantau) & (5. Gangguan Umum & SOP) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 2. Yang Dipantau */}
            <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-2 text-xs">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                2. YANG DIPANTAU (MONITORED PARAMETERS):
              </span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between border-b border-[#1e293b] pb-1">
                  <span className="text-slate-400">Kekeruhan Baku:</span>
                  <span className="text-amber-400 font-bold font-mono">185 NTU (Tinggi!)</span>
                </div>
                <div className="flex justify-between border-b border-[#1e293b] pb-1">
                  <span className="text-slate-400">Dosis Koagulan:</span>
                  <span className="text-sky-300 font-bold font-mono">48,0 mg/L (Disesuaikan)</span>
                </div>
                <div className="flex justify-between border-b border-[#1e293b] pb-1">
                  <span className="text-slate-400">Derajat pH:</span>
                  <span className="text-emerald-400 font-bold font-mono">7,20 pH (Normal ✓)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kecepatan Mixer:</span>
                  <span className="text-sky-400 font-bold font-mono">120 RPM (Aktif)</span>
                </div>
              </div>
            </div>

            {/* 5. Gangguan Umum & SOP Singkat */}
            <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-2 text-xs">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                5. GANGGUAN UMUM & SOP SINGKAT (PRD §9 & §10):
              </span>
              <div className="space-y-1 text-[11px] text-slate-300 leading-relaxed">
                <p>1. <strong className="text-white">Lonjakan Kekeruhan Baku:</strong> Naikkan dosis PAC (misal 20 ke 48 mg/L) sesuai kurva jar test; pantau pembentukan flok.</p>
                <p>2. <strong className="text-white">Pompa Dosing Macet:</strong> Pindahkan ke pompa injeksi cadangan (standby) lalu lakukan flushing pipa injeksi kimia.</p>
                <p>3. <strong className="text-white">pH Drop:</strong> Tambahkan kapur agar pH tetap di rentang 6,5–8,5.</p>
              </div>
            </div>
          </div>

          {/* Bottom 2 Columns: (3. Controls) & (6. Pelajari Lebih Lanjut) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 3. Controls */}
            <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1.5 text-xs">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                3. YANG BISA DIKENDALIKAN (CONTROLS):
              </span>
              <p className="text-[11px] text-slate-300">• <strong className="text-white">Setpoint Dosis Koagulan:</strong> Stroke pompa dosing PAC.</p>
              <p className="text-[11px] text-slate-300">• <strong className="text-white">Dosis Penyesuai pH:</strong> Injeksi kapur jika pH air baku drop &lt;6.5.</p>
              <p className="text-[11px] text-slate-300">• <strong className="text-white">Saklar On/Off Mixer:</strong> Pengadukan seketika saat injeksi bahan.</p>
            </div>

            {/* 6. Pelajari Lebih Lanjut */}
            <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1.5 text-xs">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">
                6. PELAJARI LEBIH LANJUT:
              </span>
              <p className="text-[11px] text-sky-300">
                Modul Teori IPA-03 (Koagulasi) & Standar Permenkes No. 2/2023 Bab II
              </p>
            </div>
          </div>

          {/* Catatan SOP Lokal Lembaga Box */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              CATATAN SOP LOKAL LEMBAGA ({currentTenant.name.toUpperCase()}):
            </span>
            <p className="text-emerald-200 text-xs leading-relaxed font-mono">
              "{localSopNote}"
            </p>
            <span className="text-[9px] text-slate-400 block pt-0.5">
              Dikonfigurasi oleh Admin Lembaga di Layar L13.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0b1120] border-t border-[#1e293b] flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Membuka narasi ini dicatat dalam sistem untuk syarat perolehan Lencana "Penjelajah Titik Kontrol" (PRD §8).</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            KEMBALI KE WORKSPACE
          </button>
        </div>

      </div>
    </div>
  );
};
