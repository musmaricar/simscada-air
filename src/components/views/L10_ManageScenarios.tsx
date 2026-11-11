/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  CheckCircle2, 
  Copy, 
  Edit3, 
  Layers, 
  Lock, 
  Plus, 
  Save, 
  ShieldCheck, 
  Sliders, 
  Trash2,
  Sparkles
} from 'lucide-react';

export const L10_ManageScenarios: React.FC = () => {
  const { currentTenant, groups } = useApp();
  
  const [title, setTitle] = useState('Simulasi Kebocoran Pipa Distribusi Zona 2 saat Jam Puncak Pagi');
  const [difficulty, setDifficulty] = useState<'1' | '2' | '3' | '4' | '5'>('3');
  const [track, setTrack] = useState('distribusi');
  const [targetPoint, setTargetPoint] = useState('valve_prv');
  const [triggerSec, setTriggerSec] = useState('90');
  const [targetTimeSec, setTargetTimeSec] = useState('60');
  const [deviationThreshold, setDeviationThreshold] = useState('Tekanan < 1,5 bar & Debit > 160 L/s');
  const [assignedGroup, setAssignedGroup] = useState('grp-nusantara-1');
  const [published, setPublished] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPublished(true);
    alert(`Skenario "${title}" berhasil disimpan dan diterbitkan ke kelompok Angkatan 1!`);
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Title Block */}
      <div className="pb-2 border-b border-[#1e293b]">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Kelola Skenario Gangguan Kustom
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Authoring Tool Skenario Gangguan (FR-23) · Lengkap dengan Isian Tingkat Kesulitan PRD §7
        </p>
      </div>

      {/* Main Grid: Left = Form Authoring (Width: 60%), Right = Skenario List (Width: 40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Authoring Form */}
        <div className="lg:col-span-7 bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-5 shadow-lg">
          <div>
            <h2 className="text-base font-bold text-white">
              Formulir Perancangan Skenario Baru (Authoring Tool FR-23)
            </h2>
            <p className="text-xs text-slate-400">
              Rancang skenario kondisi abnormal berbasis hidrolika dan kimia proses air minum
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Judul Skenario Gangguan:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b1120] border border-[#24324d] rounded-xl text-xs font-semibold text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Tingkat Kesulitan & Pengali XP */}
            <div>
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                ★ Tingkat Kesulitan & Pengali XP (PRD SimSCADA-Air v1.0 §7):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#0b1120] border border-amber-500/50 rounded-xl text-xs font-bold text-amber-300 focus:outline-hidden"
                >
                  <option value="1">Tingkat 1: Mudah (Pengali XP = 1,0x)</option>
                  <option value="2">Tingkat 2: Sedang (Pengali XP = 1,5x)</option>
                  <option value="3">Tingkat 3: Sulit (Pengali XP = 2,0x)</option>
                  <option value="4">Tingkat 4: Sangat Sulit (Pengali XP = 2,5x)</option>
                  <option value="5">Tingkat 5: Ujian (Pengali XP = 3,0x)</option>
                </select>
                <div className="p-2.5 rounded-xl bg-[#0b1120] border border-[#1e293b] text-[10px] text-slate-400 flex items-center">
                  Pilihan: 1 Mudah (1x) · 2 Sedang (1.5x) · 3 Sulit (2x) · 4 Sangat Sulit (2.5x) · 5 Ujian (3x)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Jalur Terkait:
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1120] border border-[#24324d] rounded-xl text-xs text-white focus:outline-hidden"
                >
                  <option value="ipa">Operator IPA</option>
                  <option value="distribusi">Operator Distribusi / Terpadu</option>
                  <option value="terpadu">Air Minum Terpadu</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Titik Kontrol Terdampak:
                </label>
                <select
                  value={targetPoint}
                  onChange={(e) => setTargetPoint(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0b1120] border border-[#24324d] rounded-xl text-xs text-white focus:outline-hidden"
                >
                  <option value="valve_prv">Valve Isolasi Zona 2 & PRV Distribusi</option>
                  <option value="koagulasi">Flash Mixer Koagulasi & Dosing PAC</option>
                  <option value="intake">Intake Pompa Air Baku</option>
                  <option value="filtrasi">Filtrasi Pasir Cepat</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Waktu Pemicu Gangguan:
                </label>
                <input
                  type="text"
                  value={triggerSec}
                  onChange={(e) => setTriggerSec(e.target.value)}
                  placeholder="Detik ke-90 (01:30)"
                  className="w-full px-3 py-2 bg-[#0b1120] border border-[#24324d] rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Ambang Deviasi Alarm:
                </label>
                <input
                  type="text"
                  value={deviationThreshold}
                  onChange={(e) => setDeviationThreshold(e.target.value)}
                  placeholder="Tekanan < 1.5 bar"
                  className="w-full px-3 py-2 bg-[#0b1120] border border-[#24324d] rounded-xl text-xs text-rose-300 font-mono"
                />
              </div>
            </div>

            {/* SOP Scoring Key */}
            <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-2 text-xs">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                Kunci Penilaian SOP & Ketentuan Penalti:
              </span>
              <div className="text-[11px] text-slate-300 space-y-1 font-mono">
                <p>1. Wajib menutup valve isolasi V-Z2 dalam waktu target 60 detik (Bobot Respons 25%).</p>
                <p>2. Mematikan semua pompa distribusi dianggap tindakan tidak aman (-15 poin penalti PRD §8).</p>
                <p>3. Alarm clear otomatis saat tekanan zona pulih di rentang 2,0–3,0 bar selama 10 detik.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Tugaskan ke Kelompok / Angkatan:
              </label>
              <select
                value={assignedGroup}
                onChange={(e) => setAssignedGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#0b1120] border border-[#24324d] rounded-xl text-xs font-bold text-sky-400 focus:outline-hidden"
              >
                <option value="grp-nusantara-1">Angkatan 1 (24 Peserta) · Balai Diklat Air Minum Nusantara</option>
                <option value="grp-nusantara-2">Angkatan 2 (22 Peserta) · Balai Diklat Air Minum Nusantara</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-sky-950/50 flex items-center justify-center gap-2"
            >
              <span>Simpan & Terbitkan Skenario ke Kelas →</span>
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Skenario List */}
        <div className="lg:col-span-5 bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-5 shadow-lg">
          <div>
            <h2 className="text-base font-bold text-white">Daftar Skenario Lembaga</h2>
            <p className="text-xs text-slate-400">Pustaka Baku Super Admin (Read-Only) + Skenario Kustom</p>
          </div>

          <div className="space-y-3">
            {/* Standard Scenario 1: IPA-06 */}
            <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  BAKU SA
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Tingkat 3 Sulit (2,0x)</span>
              </div>
              <div className="text-xs font-bold text-white">IPA-06: Lonjakan Kekeruhan Air Baku</div>
              <div className="text-[10px] text-slate-400">Kekeruhan air baku 185 NTU · Skenario Resmi Demo</div>
              <div className="text-[10px] text-slate-500 italic pt-1 flex items-center justify-between">
                <span>Dipakai di Sesi Latihan Utama</span>
                <span className="text-slate-400">Tidak dapat diubah (Terkunci)</span>
              </div>
            </div>

            {/* Standard Scenario 2: DST-05 */}
            <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  BAKU SA
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Tingkat 3 Sulit (2,0x)</span>
              </div>
              <div className="text-xs font-bold text-white">DST-05: Gangguan Kebocoran Pipa</div>
              <div className="text-[10px] text-slate-400">Tekanan drop & debit melonjak · Jalur Distribusi</div>
              <div className="text-[10px] text-slate-500 italic pt-1 flex items-center justify-between">
                <span>Dipakai di Jalur Distribusi</span>
                <span className="text-slate-400">Tidak dapat diubah</span>
              </div>
            </div>

            {/* Custom Scenario */}
            <div className="p-3.5 rounded-xl bg-sky-950/20 border border-sky-500/40 space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[9px] px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-bold uppercase tracking-wider border border-sky-500/30">
                  KUSTOM NUS
                </span>
                <span className="text-[10px] text-amber-400 font-mono font-bold">Tingkat 3 Sulit (2,0x)</span>
              </div>
              <div className="text-xs font-bold text-white">
                Simulasi Kebocoran Zona 2 Puncak
              </div>
              <div className="text-[10px] text-slate-400">Dibuat oleh Budi Santoso, S.T. · Ditugaskan ke: Angkatan 1 (Aktif)</div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => alert('Buka form edit skenario')}
                  className="px-2.5 py-1 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-slate-300 text-[10px] font-semibold flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => alert('Skenario berhasil diduplikasi')}
                  className="px-2.5 py-1 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-slate-300 text-[10px] font-semibold flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Duplikasi
                </button>
              </div>
            </div>
          </div>

          {/* Tenant Isolation Policy */}
          <div className="p-3.5 rounded-xl bg-[#0b1120] border border-[#1e293b] text-[10px] text-slate-400 space-y-1">
            <span className="font-bold text-sky-400 uppercase tracking-wider text-[10px] block">
              Kebijakan Konten Multi-Tenant (PRD §6):
            </span>
            <p>
              Skenario kustom yang dibuat hanya dapat diakses oleh peserta Balai Diklat Air Minum Nusantara dan tidak akan terlihat oleh lembaga lain (Pusat Tirta Mandiri). Misi baku tetap menjadi acuan kelulusan.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
