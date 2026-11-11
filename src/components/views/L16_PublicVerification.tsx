/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  CheckCircle2, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  XCircle,
  ArrowLeft,
  ExternalLink,
  QrCode
} from 'lucide-react';

interface PublicVerificationProps {
  initialCertNumber?: string;
  onBackToApp: () => void;
}

export const L16_PublicVerification: React.FC<PublicVerificationProps> = ({
  initialCertNumber = 'SSA/NUS/2026/0001',
  onBackToApp,
}) => {
  const { certificates, currentTenant } = useApp();
  const [certQuery, setCertQuery] = useState<string>(initialCertNumber);
  const [activeCertNo, setActiveCertNo] = useState<string>(initialCertNumber);
  const [isSimulatedRevoked, setIsSimulatedRevoked] = useState<boolean>(false);

  const cert = certificates.find(
    (c) => c.certificateNumber.toLowerCase().replace(/[^a-z0-9]/g, '') === activeCertNo.toLowerCase().replace(/[^a-z0-9]/g, '')
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certQuery.trim()) return;
    setActiveCertNo(certQuery.trim());
    setIsSimulatedRevoked(false);
  };

  const isRevoked = isSimulatedRevoked || cert?.status === 'revoked';

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col font-sans">
      {/* Public Header */}
      <header className="border-b border-[#1e293b] bg-[#0f172a] shadow-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-600/20 border border-sky-500/40 text-sky-400 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-tight">
              SimSCADA-Air Portal Publik
            </h1>
            <p className="text-[10px] text-slate-400">
              Layanan Verifikasi Keabsahan Piagam Kelulusan Operator Air Minum
            </p>
          </div>
        </div>

        <button
          onClick={onBackToApp}
          className="px-3.5 py-1.5 rounded-xl border border-[#334155] bg-[#1e293b] hover:bg-[#334155] text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Aplikasi</span>
        </button>
      </header>

      {/* Main Verification Content */}
      <main className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-8 space-y-6 flex-1">
        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Portal Verifikasi Keaslian Piagam Publik
          </h2>
          <p className="text-xs text-slate-400">
            Portal Terbuka Tanpa Login untuk Rekruter, PDAM & Regulator (Sesuai Ketentuan PRD §13)
          </p>
        </div>

        {/* Search Bar Input */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={certQuery}
              onChange={(e) => setCertQuery(e.target.value)}
              placeholder="Masukkan nomor registrasi piagam (contoh: SSA/NUS/2026/0001)..."
              className="w-full pl-4 pr-4 py-3 bg-[#0f172a] border border-[#24324d] rounded-xl text-xs font-mono font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 placeholder:text-slate-500 uppercase"
            />
          </div>
          <button
            type="submit"
            className="py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-sky-950/50 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Verifikasi Sekarang</span>
          </button>
        </form>

        {/* Results Card */}
        <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Top Banner Status + Toggle Test */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1e293b]">
            <div className="flex items-center gap-2.5">
              {isRevoked ? (
                <div className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-xs flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>STATUS: DICABUT / INVALID ✕</span>
                </div>
              ) : cert ? (
                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>STATUS: SAH / VALID ✓</span>
                </div>
              ) : (
                <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>STATUS: TIDAK DITEMUKAN</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsSimulatedRevoked(!isSimulatedRevoked)}
              className="text-[11px] text-slate-400 hover:text-white px-2.5 py-1 rounded-lg border border-[#334155] bg-[#0b1120] transition-colors"
            >
              Simulasi Status: <span className="font-semibold text-rose-400">Uji Dicabut [Toggle]</span>
            </button>
          </div>

          {cert ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">
                  Data Terverifikasi di Basis Data SimSCADA-Air
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Nomor Registrasi Unik: <strong className="text-sky-400">{cert.certificateNumber}</strong> · Diterbitkan oleh {cert.tenantName}
                </p>
              </div>

              {/* 6 Minimal Verification Data Fields (PRD §13) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">1. Nama Peserta Lulusan:</span>
                  <div className="text-base font-black text-white">{cert.userName}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">2. Lembaga Penyelenggara Pelatihan:</span>
                  <div className="text-base font-black text-sky-400">{cert.tenantName} ({currentTenant.code})</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">3. Jalur Pembelajaran & Spesialisasi:</span>
                  <div className="text-base font-black text-white">{cert.trackName}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">4. Tanggal Kelulusan:</span>
                  <div className="text-base font-black text-white">{cert.issueDate}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">5. Predikat Kelulusan (PRD §13):</span>
                  <div className="text-base font-black text-amber-400">{cert.predicate}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">6. Status Keabsahan & Integritas:</span>
                  <div className="text-base font-black text-emerald-400 flex items-center gap-1.5">
                    {isRevoked ? (
                      <span className="text-rose-400">Dicabut oleh Admin Lembaga</span>
                    ) : (
                      <span>Terdaftar Aktif · Bebas Pencabutan</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Revoked Warning Box if Revoked */}
              {isRevoked && (
                <div className="p-4 rounded-xl bg-rose-950/40 border-2 border-dashed border-rose-500 text-rose-200 text-xs space-y-2">
                  <div className="font-bold text-rose-400 text-sm flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    <span>CONTOH TAMPILAN BILA PIAGAM DICABUT (DIPICU TOMBOL "UJI DICABUT"):</span>
                  </div>
                  <p className="text-slate-300">
                    Nomor <strong className="text-white">SSA/NUS/2026/0007</strong> · Dicabut Admin Lembaga pada 2 November 2026.
                  </p>
                  <p className="text-rose-300">
                    Alasan tercatat: piagam terbit atas nama peserta yang salah (data diperbaiki, piagam baru diterbitkan).
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-xs">Nomor piagam tidak ditemukan dalam basis data nasional SimSCADA-Air.</p>
            </div>
          )}
        </div>

        {/* Legal Disclaimer Footnote */}
        <div className="p-4 rounded-xl bg-[#0f172a] border border-[#24324d] text-xs text-slate-400 space-y-1">
          <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">
            Pemberitahuan Hukum (PRD §13):
          </span>
          <p className="text-[11px] leading-relaxed">
            "Piagam ini menyatakan penyelesaian pelatihan berbasis simulator dan bukan sertifikat kompetensi resmi." Sertifikasi profesi resmi operator air minum tetap diselenggarakan oleh Lembaga Sertifikasi Profesi (LSP) berlisensi BNSP.
          </p>
        </div>
      </main>
    </div>
  );
};
