/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  CheckCircle2, 
  Download, 
  FileCheck2, 
  QrCode, 
  Share2, 
  ShieldCheck, 
  ExternalLink,
  Printer
} from 'lucide-react';

interface CertificateProps {
  onOpenPublicVerification: (certNo?: string) => void;
}

export const L8_MyCertificate: React.FC<CertificateProps> = ({ onOpenPublicVerification }) => {
  const { certificates, currentUser, currentTenant } = useApp();
  const certRef = useRef<HTMLDivElement>(null);

  // If viewing as Dimas or Rian or Andi:
  // If user has valid certificate, show it; otherwise display Andi Kurniawan's official certificate SSA/NUS/2026/0001
  const cert = 
    certificates.find((c) => c.userId === currentUser?.id && c.status === 'valid') ||
    certificates.find((c) => c.certificateNumber === 'SSA/NUS/2026/0001') ||
    certificates[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Title Block */}
      <div className="pb-2 border-b border-[#1e293b]">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Piagam Kelulusan Terbit · {cert.userName} ({currentUser?.username || 'peserta.lulus'})
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Format Baku Cetak A4 Landscape · Sesuai Ketentuan Ketat PRD SimSCADA-Air §13
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: THE OFFICIAL A4 CERTIFICATE (Width: 8 cols) */}
        <div className="lg:col-span-8 bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 shadow-xl">
          {/* Certificate Container with Guilloche styling */}
          <div 
            ref={certRef}
            className="bg-white text-slate-900 rounded-xl p-8 sm:p-10 border-4 border-amber-600/80 shadow-2xl relative overflow-hidden space-y-6 print:border-none print:shadow-none"
          >
            {/* Inner dashed frame */}
            <div className="absolute inset-2 border-2 border-dashed border-amber-700/30 rounded-lg pointer-events-none" />

            {/* Header: Tenant Logo & Title */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900 relative">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">
                    {cert.tenantName}
                  </h2>
                  <p className="text-[11px] text-slate-600 uppercase tracking-widest font-semibold">
                    LEMBAGA PELATIHAN OPERATOR SISTEM PENYEDIAAN AIR MINUM
                  </p>
                </div>
              </div>

              <div className="px-3.5 py-1.5 bg-slate-900 text-white font-mono text-xs font-bold rounded-lg tracking-wider">
                {cert.certificateNumber}
              </div>
            </div>

            {/* Certificate Core Statement */}
            <div className="text-center space-y-3 py-4">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-wider uppercase font-serif">
                PIAGAM KELULUSAN
              </h3>
              <div className="text-xs font-bold text-sky-800 tracking-widest uppercase">
                {cert.trackName}
              </div>

              <p className="text-xs text-slate-600 italic">
                Diberikan dengan bangga kepada:
              </p>

              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wide font-serif py-1">
                {cert.userName.toUpperCase()}
              </div>
              <div className="text-xs font-medium text-slate-600">
                Angkatan 1 · {cert.tenantName}
              </div>

              <p className="text-xs text-slate-700 max-w-xl mx-auto leading-relaxed pt-2">
                Telah menyelesaikan seluruh rangkaian pelatihan berbasis simulator SCADA mulai dari Instalasi Pengolahan Air (IPA) hingga Jaringan Distribusi, memenuhi seluruh kriteria kompetensi penanganan gangguan dan dinyatakan:
              </p>

              <div className="pt-2">
                <span className="inline-block px-6 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-sm">
                  PREDIKAT: {cert.predicate.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Achievement Matrix */}
            <div className="grid grid-cols-3 gap-3 text-center py-2 px-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Tanggal Lulus:</span>
                <span className="text-xs font-bold text-slate-900">{cert.issueDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Level Kompetensi:</span>
                <span className="text-xs font-bold text-purple-900">{cert.operatorLevel}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Capaian Bintang:</span>
                <span className="text-xs font-bold text-amber-600">{cert.starsCount} Bintang (17 Misi)</span>
              </div>
            </div>

            {/* Signatures & QR Code */}
            <div className="grid grid-cols-3 gap-4 items-end pt-4 pb-2">
              {/* Left Signer */}
              <div className="text-center space-y-1">
                <span className="text-[11px] text-slate-600 block">Instruktur Penilai,</span>
                <div className="h-10 flex items-center justify-center">
                  <span className="font-serif italic text-base text-sky-800 font-bold border-b border-slate-400 px-4">
                    Budi Santoso
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-900 leading-tight">
                  Budi Santoso, S.T.
                </div>
                <div className="text-[10px] text-slate-500">
                  Instruktur Utama SPAM
                </div>
              </div>

              {/* Center QR Code */}
              <div className="flex flex-col items-center justify-center text-center">
                <div 
                  onClick={() => onOpenPublicVerification(cert.certificateNumber)}
                  className="p-2 border border-slate-300 rounded-lg bg-white shadow-2xs cursor-pointer hover:border-sky-500 transition-colors"
                  title="Klik untuk verifikasi publik"
                >
                  <QrCode className="w-14 h-14 text-slate-900" />
                </div>
                <span className="text-[9px] text-slate-500 mt-1 font-mono">Scan Validasi L16</span>
              </div>

              {/* Right Signer */}
              <div className="text-center space-y-1">
                <span className="text-[11px] text-slate-600 block">Pimpinan Lembaga,</span>
                <div className="h-10 flex items-center justify-center">
                  <span className="font-serif italic text-base text-amber-800 font-bold border-b border-slate-400 px-4">
                    Bambang Sutrisno
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-900 leading-tight">
                  Dr. Ir. Bambang Sutrisno, M.Eng.
                </div>
                <div className="text-[10px] text-slate-500">
                  Kepala Balai Diklat
                </div>
              </div>
            </div>

            {/* Mandatory Footnote (PRD §13) */}
            <div className="pt-3 border-t border-slate-200 text-center space-y-0.5">
              <p className="text-[10px] text-slate-600 font-semibold italic">
                "Piagam ini menyatakan penyelesaian pelatihan berbasis simulator dan bukan sertifikat kompetensi resmi."
              </p>
              <p className="text-[9px] text-slate-500 font-mono">
                Simulator: SimSCADA-Air · Kode Verifikasi: {cert.certificateNumber} · Validasi di portal publik tanpa login
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: VERIFIKASI SYARAT & AKSI UNDUH (Width: 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-5 space-y-4 shadow-lg">
            <div>
              <h2 className="text-sm font-bold text-white">Verifikasi Syarat Kelulusan Jalur</h2>
              <p className="text-[11px] text-slate-400">Standar Kelulusan PRD SimSCADA-Air §13</p>
            </div>

            {/* 4 Checklist Criteria */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">1. Semua Misi Wajib Lulus</div>
                  <div className="text-[11px] text-emerald-300/80">17 dari 17 Misi Diselesaikan (100% Lulus)</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">2. Misi Kelulusan Skor ≥ 80</div>
                  <div className="text-[11px] text-emerald-300/80">Skor TRP-02: 94 / 100 (ambang ≥ 80 tercapai)</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">3. Post-Test Akhir ≥ 70</div>
                  <div className="text-[11px] text-emerald-300/80">Post-test 88 / 100 (pre-test 54 → +63%)</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">4. Persetujuan Instruktur</div>
                  <div className="text-[11px] text-emerald-300/80">Disetujui Budi Santoso, S.T. · 28 Okt 2026</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-[#1e293b]">
              <button
                onClick={handlePrint}
                className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-sky-950/50"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Piagam (PDF) ⎙</span>
              </button>

              <button
                onClick={() => onOpenPublicVerification(cert.certificateNumber)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-slate-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                <span>Verifikasi di Portal Publik (L16)</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(cert.qrVerificationUrl);
                  alert(`Tautan verifikasi piagam berhasil disalin:\n${cert.qrVerificationUrl}`);
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#0b1120] hover:bg-[#1e293b] border border-[#1e293b] text-slate-400 hover:text-slate-200 font-medium text-xs transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan ke LinkedIn / Rekruter</span>
              </button>
            </div>

            {/* PRD Legal Note */}
            <div className="p-3 rounded-xl bg-[#0b1120] border border-[#1e293b] text-[10px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">
                Catatan Ketentuan Hukum (PRD §13):
              </span>
              <p>
                Piagam tidak memuat NIP aparatur atau rincian nilai angka untuk menjaga privasi peserta. Piagam dapat dicabut oleh Admin Lembaga jika ditemukan pelanggaran.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
