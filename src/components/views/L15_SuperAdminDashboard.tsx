/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  CheckCircle2, 
  Plus, 
  Shield, 
  ShieldAlert, 
  Users, 
  Clock, 
  ExternalLink,
  Edit,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export const L15_SuperAdminDashboard: React.FC = () => {
  const { tenants, users, certificates, updateTenant } = useApp();
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);

  // Form state
  const [tenantName, setTenantName] = useState('');
  const [tenantCode, setTenantCode] = useState('');
  const [quota, setQuota] = useState('50');

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tenant baru "${tenantName}" (${tenantCode}) dengan kuota ${quota} kursi berhasil didaftarkan.`);
    setShowAddTenantModal(false);
  };

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-[#1e293b]">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Konsol Pengelola Lembaga & Lisensi Multi-Tenant
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Super Admin Platform SimSCADA-Air · Monitoring Kapasitas & Peringatan Dini Sistem (PRD §5 & §12)
        </p>
      </div>

      {/* 2 Warning Banners Matching SVG L15 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner 1: Quota >= 90% */}
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/50 text-amber-200 text-xs space-y-1 shadow-md">
          <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-amber-400">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>PERINGATAN SISTEM: KUOTA KURSI MENCAPAI AMBANG TINGGI (≥ 90%)</span>
          </div>
          <p className="text-slate-300 text-[11px]">
            Lembaga <strong className="text-white">Balai Diklat Air Minum Nusantara</strong> telah memakai 46 dari 50 kursi (92%). Tawarkan ekspansi kuota lisensi.
          </p>
        </div>

        {/* Banner 2: Expiry <= 30 Days */}
        <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/50 text-rose-200 text-xs space-y-1 shadow-md">
          <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-rose-400">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>PERINGATAN SISTEM: MASA LISENSI AKAN BERAKHIR (≤ 30 HARI)</span>
          </div>
          <p className="text-slate-300 text-[11px]">
            Lembaga <strong className="text-white">Pusat Pelatihan Tirta Mandiri</strong> berakhir dalam <strong className="text-rose-400">28 Hari</strong>. Kirimkan notifikasi penagihan perpanjangan.
          </p>
        </div>
      </div>

      {/* 4 Global Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0f172a] border border-[#24324d] shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Total Lembaga Aktif</span>
          <div className="text-2xl font-black text-white mt-1">2 Lembaga Pembeli</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0f172a] border border-[#24324d] shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Total Kuota Kursi</span>
          <div className="text-2xl font-black text-sky-400 font-mono mt-1">68 / 100 Kursi (68%)</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0f172a] border border-[#24324d] shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Total Peserta Aktif</span>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">60 Peserta Aktif</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0f172a] border border-[#24324d] shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Total Piagam Terbit</span>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">44 Piagam Sah</div>
        </div>
      </div>

      {/* Main Table Container: Multi-Tenant Management */}
      <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">
              Daftar Lembaga Pembeli (Multi-Tenant Management PRD §5)
            </h2>
            <p className="text-xs text-slate-400">
              Manajemen paket jalur, alokasi kuota kursi, tanggal kontrak, dan status pemakaian
            </p>
          </div>

          <button
            onClick={() => setShowAddTenantModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-indigo-950/50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Daftarkan Tenant</span>
          </button>
        </div>

        {/* Table matching SVG L15 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0b1120] text-slate-400 text-[10px] uppercase tracking-wider border-b border-[#1e293b] font-bold">
              <tr>
                <th className="py-3 px-3">Nama Lembaga (Tenant)</th>
                <th className="py-3 px-2 text-center">Kode</th>
                <th className="py-3 px-2 text-center">Status Lisensi</th>
                <th className="py-3 px-3">Paket Jalur</th>
                <th className="py-3 px-3">Kursi Terpakai / Kuota</th>
                <th className="py-3 px-3 text-center">Peserta Aktif</th>
                <th className="py-3 px-3 text-center">Piagam Terbit</th>
                <th className="py-3 px-3">Sisa Lisensi</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b] font-sans">
              
              {/* NUSANTARA */}
              <tr className="hover:bg-[#1e293b]/40">
                <td className="py-4 px-3">
                  <div className="font-bold text-white text-xs">Balai Diklat Air Minum Nusantara</div>
                  <div className="text-[10px] text-slate-400">Admin: admin.nusantara · Pimpinan: pimpinan.nusantara</div>
                </td>
                <td className="py-3 px-2 text-center font-mono font-bold text-sky-400">NUS</td>
                <td className="py-3 px-2 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    AKTIF ✓
                  </span>
                </td>
                <td className="py-3 px-3 font-semibold text-sky-300">
                  IPA + Distribusi + Terpadu (3 Jalur)
                </td>
                <td className="py-3 px-3">
                  <div className="font-mono font-bold text-amber-400 text-xs">
                    46 / 50 Kursi (92%)
                  </div>
                  <div className="text-[9px] text-amber-400 mt-0.5">⚠️ Peringatan Kuota ≥90%</div>
                </td>
                <td className="py-3 px-2 text-center font-mono font-semibold text-white">42 Peserta</td>
                <td className="py-3 px-2 text-center font-mono font-semibold text-emerald-400">32 Piagam</td>
                <td className="py-3 px-3 font-mono font-semibold text-slate-200">245 Hari</td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => alert('Buka modal penambahan kuota lisensi Balai Diklat Nusantara.')}
                    className="px-3 py-1 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-slate-200 font-semibold text-[11px] rounded-lg transition-all"
                  >
                    Kelola Lisensi
                  </button>
                </td>
              </tr>

              {/* TIRTA MANDIRI */}
              <tr className="hover:bg-[#1e293b]/40">
                <td className="py-4 px-3">
                  <div className="font-bold text-white text-xs">Pusat Pelatihan Tirta Mandiri</div>
                  <div className="text-[10px] text-slate-400">Admin: admin.tirta · Uji Isolasi Multi-Tenant</div>
                </td>
                <td className="py-3 px-2 text-center font-mono font-bold text-teal-400">TRM</td>
                <td className="py-3 px-2 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    AKTIF ✓
                  </span>
                </td>
                <td className="py-3 px-3 font-semibold text-teal-300">
                  Operator IPA (9 Misi)
                </td>
                <td className="py-3 px-3 font-mono font-semibold text-slate-300">
                  22 / 50 Kursi (44%)
                </td>
                <td className="py-3 px-2 text-center font-mono font-semibold text-white">18 Peserta</td>
                <td className="py-3 px-2 text-center font-mono font-semibold text-emerald-400">12 Piagam</td>
                <td className="py-3 px-3 font-mono font-bold text-rose-400">
                  <div>28 Hari Tersisa</div>
                  <div className="text-[9px] text-rose-400 font-normal">⚠️ Berakhir ≤30 Hari</div>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => alert('Kirim surat penawaran perpanjangan lisensi ke Direktur Tirta Mandiri.')}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] rounded-lg transition-all"
                  >
                    Perpanjang
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Tenant */}
      {showAddTenantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0f172a] rounded-2xl border border-[#334155] p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white">Daftarkan Tenant Baru</h3>
            <form onSubmit={handleAddTenant} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Lembaga</label>
                <input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  placeholder="e.g. Akademi Tirta Gemilang"
                  className="w-full p-2.5 bg-[#0b1120] border border-[#334155] rounded-xl text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Kode Tenant (3 Huruf)</label>
                <input
                  type="text"
                  value={tenantCode}
                  onChange={(e) => setTenantCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ATG"
                  maxLength={4}
                  className="w-full p-2.5 bg-[#0b1120] border border-[#334155] rounded-xl text-white font-mono uppercase"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Kuota Kursi Lisensi</label>
                <input
                  type="number"
                  value={quota}
                  onChange={(e) => setQuota(e.target.value)}
                  className="w-full p-2.5 bg-[#0b1120] border border-[#334155] rounded-xl text-white font-mono"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTenantModal(false)}
                  className="px-4 py-2 bg-[#1e293b] text-slate-300 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl"
                >
                  Daftarkan Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
