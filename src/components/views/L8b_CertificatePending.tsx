/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Clock, 
  Lock, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';

interface CertificatePendingProps {
  onBack?: () => void;
}

export const L8b_CertificatePending: React.FC<CertificatePendingProps> = ({ onBack }) => {
  const { currentTenant } = useApp();
  const [reminderSent, setReminderSent] = useState(false);

  const handleSendReminder = () => {
    setReminderSent(true);
    alert('Pengingat berhasil dikirim ke dasbor pengawasan Instruktur Budi Santoso, S.T.');
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Title Block */}
      <div className="pb-2 border-b border-[#1e293b]">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Status Piagam: Menunggu Persetujuan Instruktur · Rian Hidayat (peserta contoh)
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Alur Verifikasi Dua Tahap PRD SimSCADA-Air §13 · Tombol Unduh Nonaktif Sampai Disetujui
        </p>
      </div>

      {/* Top Pending Alert Banner */}
      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              STATUS PIAGAM: MENUNGGU PERSETUJUAN INSTRUKTUR (BUDI SANTOSO, S.T.)
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Seluruh misi, Misi Kelulusan, dan Post-Test telah lulus. Pengajuan penerbitan piagam telah terkirim ke dasbor instruktur L9.
            </p>
          </div>
        </div>
        <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider whitespace-nowrap self-start sm:self-center">
          PENDING APPROVAL
        </span>
      </div>

      {/* Main Grid: Left = Watermarked Certificate Draft (Width: 8 cols), Right = Status & Actions (Width: 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Watermarked Certificate Draft */}
        <div className="lg:col-span-8 bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 shadow-xl relative">
          <div className="bg-slate-100 text-slate-900 rounded-xl p-8 sm:p-10 border-4 border-dashed border-amber-700/40 relative overflow-hidden space-y-6 select-none opacity-85">
            
            {/* Big Watermark Banner diagonally across */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-[-20deg]">
              <span className="text-3xl sm:text-5xl font-black text-rose-600/20 uppercase tracking-widest border-4 border-rose-600/20 px-8 py-3 rounded-2xl">
                MENUNGGU VALIDASI INSTRUKTUR
              </span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900 relative">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-700 text-white flex items-center justify-center font-bold">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-base font-black tracking-tight text-slate-900 uppercase">
                    BALAI DIKLAT AIR MINUM NUSANTARA
                  </h2>
                  <p className="text-[10px] text-slate-600 uppercase font-semibold">
                    SSA/NUS/2026/0002 (Nomor Dicadangkan) · Predikat: Lulus
                  </p>
                </div>
              </div>
            </div>

            {/* Statement */}
            <div className="text-center space-y-2 py-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-wider uppercase font-serif">
                PIAGAM KELULUSAN
              </h3>
              <div className="text-xs font-bold text-sky-800 tracking-widest uppercase">
                JALUR OPERATOR IPA
              </div>
              <p className="text-xs text-slate-600 italic">Diberikan kepada:</p>
              <div className="text-2xl font-extrabold text-slate-900 tracking-wide font-serif">
                RIAN HIDAYAT
              </div>
            </div>

            {/* Signature Area (Waiting) */}
            <div className="grid grid-cols-2 gap-6 items-end pt-6 pb-2">
              <div className="text-center space-y-1">
                <span className="text-[11px] text-slate-600 block">Instruktur Penilai,</span>
                <div className="h-9 flex items-center justify-center">
                  <span className="px-3 py-1 rounded bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                    ⏳ Menunggu Verifikasi
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-900">Budi Santoso, S.T.</div>
              </div>

              <div className="text-center space-y-1">
                <span className="text-[11px] text-slate-600 block">Pimpinan Lembaga,</span>
                <div className="h-9 flex items-center justify-center">
                  <span className="font-serif italic text-base text-slate-500">Bambang Sutrisno</span>
                </div>
                <div className="font-bold text-xs text-slate-900">Dr. Ir. Bambang Sutrisno, M.Eng.</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-300 text-center">
              <p className="text-[10px] text-slate-500 font-semibold italic">
                "Piagam ini menyatakan penyelesaian pelatihan berbasis simulator dan bukan sertifikat kompetensi resmi."
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Verification Pipeline & Reminder */}
        <div className="lg:col-span-4 bg-[#0f172a] rounded-2xl border border-[#24324d] p-5 space-y-5 shadow-lg">
          <div>
            <h2 className="text-sm font-bold text-white">Proses Validasi Instruktur</h2>
            <p className="text-[11px] text-slate-400">Kebijakan Lembaga: "Persetujuan Instruktur Wajib (L13)"</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <div className="font-bold text-white">Misi Jalur IPA Selesai (9 Misi)</div>
                <div className="text-[10px] text-slate-400">28 Okt 2026 · 10:15 WIB</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <div className="font-bold text-white">Misi Kelulusan & Post-Test Lulus</div>
                <div className="text-[10px] text-slate-400">IPA-09: 82 · Post-test: 82 · 28 Okt 2026</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                ⏳
              </div>
              <div>
                <div className="font-bold text-amber-300">Menunggu persetujuan Budi Santoso, S.T.</div>
                <div className="text-[10px] text-slate-400">Instruktur sedang meninjau audit replay sesi</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1e293b]">
            <button
              disabled
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs cursor-not-allowed border border-slate-700 flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>UNDUH PIAGAM PDF (TERKUNCI 🔒)</span>
            </button>
            <p className="text-[10px] text-center text-slate-500">
              Tombol aktif setelah instruktur menyetujui kelulusan
            </p>

            <button
              onClick={handleSendReminder}
              disabled={reminderSent}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-sky-950/50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{reminderSent ? 'Pengingat Terkirim ✓' : 'KIRIM PENGINGAT KE INSTRUKTUR'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b] text-[10px] text-slate-400 space-y-1">
            <span className="font-bold text-sky-400 uppercase tracking-wider text-[10px] block">
              Kenapa Membutuhkan Persetujuan?
            </span>
            <p>
              Admin Balai Diklat Nusantara mewajibkan instruktur memverifikasi konsistensi SOP peserta pada Misi Kelulusan sebelum piagam berkode QR diterbitkan secara permanen ke database publik.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
