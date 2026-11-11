/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Check, 
  CheckCircle2, 
  Lock, 
  Palette, 
  Save, 
  ShieldAlert, 
  Sliders, 
  ToggleLeft, 
  ToggleRight, 
  Upload, 
  UserCheck,
  AlertTriangle,
  Info
} from 'lucide-react';

export const L13_TenantSettings: React.FC = () => {
  const { currentTenant, updateTenant } = useApp();

  const [tenantName, setTenantName] = useState(currentTenant.name);
  const [leaderName, setLeaderName] = useState(currentTenant.signers.leaderName);
  const [leaderTitle, setLeaderTitle] = useState(currentTenant.signers.leaderTitle);
  const [instructorName, setInstructorName] = useState(currentTenant.signers.instructorName);
  const [instructorTitle, setInstructorTitle] = useState(currentTenant.signers.instructorTitle);
  
  const [accentColor, setAccentColor] = useState('Navy Blue');
  const [requireApproval, setRequireApproval] = useState(true);
  const [enableLeaderboard, setEnableLeaderboard] = useState(currentTenant.config.leaderboardEnabled);
  
  const [selectedPointId, setSelectedPointId] = useState('koagulasi');
  const [sopNoteText, setSopNoteText] = useState(
    currentTenant.config.localSopNotes?.koagulasi ||
    'Di instalasi latih IPA Balai Nusantara, injeksi koagulan memakai dosing pump otomatis dengan kalibrasi larutan PAC 10%. Batas minimum tangki harian adalah 20%.'
  );

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateTenant(currentTenant.id, {
      name: tenantName,
      signers: {
        leaderName,
        leaderTitle,
        instructorName,
        instructorTitle,
      },
      config: {
        ...currentTenant.config,
        leaderboardEnabled: enableLeaderboard,
      },
    });
    alert('Pengaturan identitas lembaga, logo, penanda tangan, dan saklar berhasil disimpan!');
  };

  const handleSaveSopNote = () => {
    const nextNotes = {
      ...(currentTenant.config.localSopNotes || {}),
      [selectedPointId]: sopNoteText,
    };
    updateTenant(currentTenant.id, {
      config: {
        ...currentTenant.config,
        localSopNotes: nextNotes,
      },
    });
    alert(`Catatan SOP lokal untuk titik ${selectedPointId} berhasil disimpan dan langsung aktif di pop-up L5a!`);
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-[#1e293b]">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Pengaturan Lembaga, Kebijakan & SOP Lokal
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Konfigurasi Tenant PRD §6 & §13: Identitas, Logo, Penanda Tangan, Aksen Piagam, Persetujuan, Papan Peringkat, Ambang Kelulusan & SOP Lokal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Identitas, Penanda Tangan, Saklar & KKM (Width: 60%) */}
        <div className="lg:col-span-7 bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-5 shadow-xl">
          <div>
            <h2 className="text-base font-bold text-white">
              Identitas Lembaga & Kustomisasi Piagam (PRD §6 & §13)
            </h2>
            <p className="text-xs text-slate-400">
              Data resmi yang tampil di header aplikasi, laporan eksekutif, dan piagam kelulusan
            </p>
          </div>

          <form onSubmit={handleSaveGeneral} className="space-y-4 text-xs">
            {/* Nama Resmi & Logo */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-7">
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1">
                  Nama Resmi Lembaga (Tenant):
                </label>
                <input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="w-full p-2.5 bg-[#0b1120] border border-[#24324d] rounded-xl text-white font-semibold"
                />
              </div>

              <div className="sm:col-span-5">
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1">
                  Logo Lembaga (PNG/SVG):
                </label>
                <div className="p-2 bg-[#0b1120] border border-[#24324d] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="text-slate-300 font-mono text-[11px] truncate">logo_nusantara.svg</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert('Pilih berkas logo resmi baru (PNG / SVG maks 2MB).')}
                    className="text-sky-400 hover:text-sky-300 font-bold text-[10px] shrink-0 hover:underline"
                  >
                    Ganti logo...
                  </button>
                </div>
              </div>
            </div>

            {/* Penanda Tangan Piagam (PRD §6) */}
            <div className="space-y-2 pt-2">
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                Penanda Tangan Piagam (PRD §6):
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Pimpinan Lembaga */}
                <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">1. Pimpinan Lembaga</span>
                    <span className="text-[10px] text-slate-500">Kepala Balai Diklat</span>
                  </div>
                  <input
                    type="text"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    className="w-full p-2 bg-[#0f172a] border border-[#334155] rounded-lg text-white font-semibold text-xs"
                  />
                  <input
                    type="text"
                    value={leaderTitle}
                    onChange={(e) => setLeaderTitle(e.target.value)}
                    className="w-full p-1.5 bg-[#0f172a] border border-[#334155] rounded-lg text-slate-400 text-[11px]"
                  />
                </div>

                {/* 2. Instruktur Penilai */}
                <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">2. Instruktur Penilai</span>
                    <span className="text-[10px] text-slate-500">Instruktur Utama SPAM</span>
                  </div>
                  <input
                    type="text"
                    value={instructorName}
                    onChange={(e) => setInstructorName(e.target.value)}
                    className="w-full p-2 bg-[#0f172a] border border-[#334155] rounded-lg text-white font-semibold text-xs"
                  />
                  <input
                    type="text"
                    value={instructorTitle}
                    onChange={(e) => setInstructorTitle(e.target.value)}
                    className="w-full p-1.5 bg-[#0f172a] border border-[#334155] rounded-lg text-slate-400 text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* Warna Aksen Templat Piagam */}
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                Warna Aksen Templat Piagam (PRD §13):
              </label>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  { name: 'Navy Blue', bg: 'bg-sky-600/30 border-sky-500 text-sky-300' },
                  { name: 'Emerald Green', bg: 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' },
                  { name: 'Classic Gold', bg: 'bg-amber-950/40 border-amber-500/40 text-amber-300' },
                  { name: 'Ruby Burgundy', bg: 'bg-rose-950/40 border-rose-500/40 text-rose-300' },
                ].map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setAccentColor(color.name)}
                    className={`p-2 rounded-xl border font-bold transition-all ${
                      accentColor === color.name ? `${color.bg} ring-1 ring-sky-500 shadow-xs` : 'border-[#1e293b] text-slate-400 bg-[#0b1120]'
                    }`}
                  >
                    <span>{color.name}</span>
                    {accentColor === color.name && <span className="ml-1 text-[10px]">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles: Approval & Leaderboard */}
            <div className="space-y-2 pt-1">
              <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs">Persetujuan instruktur wajib sebelum piagam terbit (PRD §13)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    ON: piagam berstatus menunggu persetujuan di L9 (status L8b). OFF: piagam terbit langsung.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRequireApproval(!requireApproval)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    requireApproval ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {requireApproval ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs">Papan peringkat peserta (FR-21)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Peserta hanya melihat peringkat di lembaga ini. Nonaktifkan bila menurunkan motivasi.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEnableLeaderboard(!enableLeaderboard)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    enableLeaderboard ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {enableLeaderboard ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Ambang Kelulusan Lembaga */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                Ambang Kelulusan Lembaga (PRD §6):
              </label>
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                  <span className="text-[10px] text-slate-400 block">Misi biasa (1★)</span>
                  <span className="text-base font-black text-white font-mono">≥ 70 poin</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                  <span className="text-[10px] text-slate-400 block">Misi Kelulusan</span>
                  <span className="text-base font-black text-amber-400 font-mono">≥ 80 poin</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b]">
                  <span className="text-[10px] text-slate-400 block">Post-test akhir</span>
                  <span className="text-base font-black text-emerald-400 font-mono">≥ 70 poin</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic pt-0.5">
                Bobot skor 40/25/20/15 dan ambang alarm baku diatur Super Admin; tidak dapat diubah lembaga.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-sky-950/50"
            >
              Simpan Pengaturan Lembaga
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Catatan SOP Lokal & Ambang Terkunci (Width: 40%) */}
        <div className="lg:col-span-5 bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-5 shadow-xl">
          <div>
            <h2 className="text-base font-bold text-white">
              Catatan SOP Lokal per Titik Kontrol (PRD §9)
            </h2>
            <p className="text-xs text-slate-400">
              Tambahkan catatan operasional khusus lembaga tanpa mengubah narasi baku Super Admin
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                PILIH TITIK KONTROL UNTUK DITAMBAHKAN CATATAN SOP LOKAL:
              </label>
              <select
                value={selectedPointId}
                onChange={(e) => {
                  const pid = e.target.value;
                  setSelectedPointId(pid);
                  setSopNoteText(currentTenant.config.localSopNotes?.[pid] || '');
                }}
                className="w-full p-2.5 bg-[#0b1120] border border-[#24324d] rounded-xl text-white font-bold text-xs"
              >
                <option value="koagulasi">Flash Mixer Koagulasi (Pembubuhan & Pengaduk Cepat)</option>
                <option value="intake">Intake & Pompa Air Baku</option>
                <option value="filtrasi">Filtrasi Pasir Cepat</option>
                <option value="desinfeksi">Desinfeksi Klorinasi</option>
                <option value="reservoir">Reservoir Air Bersih</option>
                <option value="pompa_distribusi">Pompa Distribusi</option>
                <option value="valve_prv">Katup PRV & Isolasi</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ISI CATATAN SOP LOKAL (LANGSUNG TAMPIL DI POP-UP L5a):
              </label>
              <textarea
                value={sopNoteText}
                onChange={(e) => setSopNoteText(e.target.value)}
                rows={4}
                className="w-full p-3 bg-[#0b1120] border border-[#24324d] rounded-xl text-slate-200 text-xs leading-relaxed"
                placeholder="Tuliskan instruksi SOP lokal instalasi Anda..."
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Catatan ini otomatis muncul pada pop-up narasi titik kontrol L5a bagi semua peserta Balai Nusantara.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSaveSopNote}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Simpan Catatan SOP {selectedPointId.toUpperCase()}
            </button>
          </div>

          {/* Ambang Batas Alarm Baku Terkunci Box */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs space-y-2">
            <div className="font-bold text-rose-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>AMBANG BATAS ALARM BAKU TERKUNCI (PRD SIMSCADA-AIR v1.0 §6):</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Pengeditan ambang alarm baku ditiadakan bagi Admin Lembaga. Ambang batas alarm baku (Permenkes No. 2/2023) ditetapkan terpusat oleh Super Admin platform demi menjamin standarisasi uji kompetensi:
            </p>
            <div className="space-y-1 font-mono text-[10px] text-slate-300 bg-[#0b1120] p-2.5 rounded-lg border border-[#1e293b]">
              <div>• Kekeruhan air olahan: Tinggi bila ≥ 3,0 NTU (Auto-clear ≤ 2,7 NTU)</div>
              <div>• Sisa klor: Kritis bila &lt; 0,2 mg/L</div>
              <div>• Tekanan distribusi: Drop bila &lt; 1,5 bar</div>
            </div>
            <p className="text-[10px] text-rose-400/90 font-medium italic">
              Lembaga tidak dapat mengubah ambang baku ini.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
