/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  CheckCircle2, 
  Download, 
  Edit2, 
  FileSpreadsheet, 
  Plus, 
  ShieldAlert, 
  Trash2, 
  Upload, 
  UserPlus, 
  Users,
  Archive,
  Search,
  KeyRound,
  Ban
} from 'lucide-react';

export const L12_ManageUsersGroups: React.FC = () => {
  const { 
    currentTenant, 
    getVisibleUsers, 
    getVisibleGroups, 
    addUser, 
    addGroup, 
    archiveGroup,
    updateUser,
    setCurrentView,
    setVerificationCertNo 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  // Form states for new user
  const [newUsername, setNewUsername] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'peserta' | 'instruktur'>('peserta');
  const [newGroup, setNewGroup] = useState('grp-nusantara-1');

  // Form states for new group
  const [newGroupName, setNewGroupName] = useState('');

  const visibleUsers = getVisibleUsers();
  const visibleGroups = getVisibleGroups();

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newFullName.trim()) return;

    addUser({
      username: newUsername.trim(),
      fullName: newFullName.trim(),
      email: newEmail.trim() || `${newUsername}@diklatnusantara.id`,
      role: newRole,
      tenantId: currentTenant.id,
      groupId: newGroup,
      track: 'ipa',
    });

    setShowAddUserModal(false);
    setNewUsername('');
    setNewFullName('');
    setNewEmail('');
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    addGroup({
      name: newGroupName.trim(),
      tenantId: currentTenant.id,
      instructorId: 'user-instruktur-nusantara',
      track: 'ipa',
    });

    setShowAddGroupModal(false);
    setNewGroupName('');
  };

  const handleImportCsv = () => {
    alert('Simulasi Impor CSV (FR-20): Berkas template data siswa terdeteksi valid. 5 akun baru berhasil ditambahkan.');
  };

  const handleDeactivateUser = (username: string) => {
    if (confirm(`Nonaktifkan akun ${username}? Akun tidak akan dapat login lagi.`)) {
      alert(`Akun ${username} berhasil dinonaktifkan.`);
    }
  };

  const isQuotaCritical = currentTenant.license.seatsUsed >= currentTenant.license.seatQuota * 0.9;

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 font-sans text-slate-100 space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-[#1e293b]">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Kelola Pengguna, Kelompok & Kuota Kursi
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manajemen Akun {currentTenant.name} ({currentTenant.code}) · Kuota {currentTenant.license.seatQuota} Kursi (PRD §5)
        </p>
      </div>

      {/* 3 Top Cards Matching SVG L12 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Seats & License Quota */}
        <div className={`p-4 rounded-2xl border shadow-lg space-y-2 ${
          isQuotaCritical ? 'bg-amber-950/20 border-amber-500/40' : 'bg-[#0f172a] border-[#24324d]'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              ALOKASI KURSI LISENSI (PRD §5):
            </span>
            {isQuotaCritical && (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold text-[9px] border border-amber-500/30">
                KUOTA 92% (≥90%)
              </span>
            )}
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {currentTenant.license.seatsUsed} <span className="text-sm font-normal text-slate-400">/ {currentTenant.license.seatQuota} Kursi Terpakai</span>
          </div>
          <div className="text-[11px] text-amber-400 font-medium">
            Sisa {currentTenant.license.seatQuota - currentTenant.license.seatsUsed} Kursi Kosong · Segera hubungi Super Admin untuk penambahan kursi
          </div>
        </div>

        {/* Card 2: Active Groups */}
        <div className="p-4 rounded-2xl bg-[#0f172a] border border-[#24324d] shadow-lg space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            KELOMPOK AKTIF (PRD §5):
          </span>
          <div className="text-2xl font-black text-sky-400 font-mono">
            2 Kelompok
          </div>
          <div className="text-[11px] text-slate-300">
            Angkatan 1 (24 Peserta) · Angkatan 2 (22 Peserta)
          </div>
        </div>

        {/* Card 3: Faculty & Leadership */}
        <div className="p-4 rounded-2xl bg-[#0f172a] border border-[#24324d] shadow-lg space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            TENAGA PENGAJAR & PIMPINAN:
          </span>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            1 Instruktur · 1 Pimpinan
          </div>
          <div className="text-[11px] text-slate-300 truncate">
            Budi Santoso, S.T. (Instruktur) · Dr. Bambang (Pimpinan Penandatangan)
          </div>
        </div>
      </div>

      {/* Main Table Container: Users List */}
      <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">
              Daftar Akun Pengguna Lembaga Nusantara (PRD SimSCADA-Air v1.0 §5)
            </h2>
            <p className="text-xs text-slate-400">
              7 akun demo lembaga ini + 42 peserta contoh · akun Pusat Pelatihan Tirta Mandiri tidak tampil (isolasi data)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-sky-950/50"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Tambah Pengguna</span>
            </button>

            <button
              onClick={handleImportCsv}
              className="px-3.5 py-1.5 rounded-xl bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Impor CSV (FR-20)</span>
            </button>
          </div>
        </div>

        {/* Users Table matching SVG L12 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0b1120] text-slate-400 text-[10px] uppercase tracking-wider border-b border-[#1e293b] font-bold">
              <tr>
                <th className="py-3 px-3">Username (PRD §5)</th>
                <th className="py-3 px-3">Nama Lengkap</th>
                <th className="py-3 px-3">Peran Sistem</th>
                <th className="py-3 px-3">Kelompok</th>
                <th className="py-3 px-3">Jalur Belajar</th>
                <th className="py-3 px-3">Kondisi Data Awal (PRD §5)</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b] font-sans">
              {/* 1. admin.nusantara */}
              <tr className="hover:bg-[#1e293b]/40">
                <td className="py-3 px-3 font-mono font-bold text-sky-400">admin.nusantara</td>
                <td className="py-3 px-3 font-semibold text-white">Rina Oktaviani</td>
                <td className="py-3 px-3"><span className="text-emerald-400 font-semibold">Admin Lembaga</span></td>
                <td className="py-3 px-3 text-slate-400">Seluruh Lembaga</td>
                <td className="py-3 px-3 text-slate-500">–</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">2 kelompok, 1 instruktur, 4 peserta demo</td>
                <td className="py-3 px-3 text-right">
                  <span className="text-sky-400 font-semibold cursor-pointer hover:underline text-[11px]">Kelola Akun</span>
                </td>
              </tr>

              {/* 2. pimpinan.nusantara */}
              <tr className="hover:bg-[#1e293b]/40">
                <td className="py-3 px-3 font-mono font-bold text-sky-400">pimpinan.nusantara</td>
                <td className="py-3 px-3 font-semibold text-white">Dr. Ir. Bambang Sutrisno, M.Eng.</td>
                <td className="py-3 px-3"><span className="text-purple-400 font-semibold">Pimpinan Lembaga</span></td>
                <td className="py-3 px-3 text-slate-400">Manajemen Eksekutif</td>
                <td className="py-3 px-3 text-slate-500">–</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">Dashboard evaluasi terisi data angkatan contoh (T1–T4)</td>
                <td className="py-3 px-3 text-right space-x-2">
                  <span className="text-sky-400 font-semibold cursor-pointer hover:underline text-[11px]">Lihat Hak</span>
                  <button onClick={() => handleDeactivateUser('pimpinan.nusantara')} className="text-rose-400 hover:underline text-[11px]">Nonaktifkan</button>
                </td>
              </tr>

              {/* 3. instruktur.nusantara */}
              <tr className="hover:bg-[#1e293b]/40">
                <td className="py-3 px-3 font-mono font-bold text-sky-400">instruktur.nusantara</td>
                <td className="py-3 px-3 font-semibold text-white">Budi Santoso, S.T.</td>
                <td className="py-3 px-3"><span className="text-amber-400 font-semibold">Instruktur SPAM</span></td>
                <td className="py-3 px-3 text-slate-300">Angkatan 1</td>
                <td className="py-3 px-3 text-slate-300">Semua Jalur</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">Membina Angkatan 1 (Live Matrix & Approval)</td>
                <td className="py-3 px-3 text-right space-x-2">
                  <span className="text-sky-400 font-semibold cursor-pointer hover:underline text-[11px]">Roster Kelas</span>
                  <button onClick={() => handleDeactivateUser('instruktur.nusantara')} className="text-rose-400 hover:underline text-[11px]">Nonaktifkan</button>
                </td>
              </tr>

              {/* 4. peserta.baru */}
              <tr className="hover:bg-[#1e293b]/40">
                <td className="py-3 px-3 font-mono font-bold text-sky-400">peserta.baru</td>
                <td className="py-3 px-3 font-semibold text-white">Budi Baru</td>
                <td className="py-3 px-3"><span className="text-slate-300 font-semibold">Peserta Operator</span></td>
                <td className="py-3 px-3 text-slate-400">Angkatan 1</td>
                <td className="py-3 px-3 text-indigo-400 font-semibold">Air Minum Terpadu</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">Belum mulai; menampilkan pre-test dan misi pertama</td>
                <td className="py-3 px-3 text-right space-x-2">
                  <span className="text-sky-400 font-semibold cursor-pointer hover:underline text-[11px]">Detail</span>
                  <button onClick={() => handleDeactivateUser('peserta.baru')} className="text-rose-400 hover:underline text-[11px]">Nonaktifkan</button>
                </td>
              </tr>

              {/* 5. peserta.ipa (Dimas) */}
              <tr className="hover:bg-[#1e293b]/40 bg-sky-950/20">
                <td className="py-3 px-3 font-mono font-bold text-sky-400">peserta.ipa</td>
                <td className="py-3 px-3 font-semibold text-white">Dimas Wahyu Pratama</td>
                <td className="py-3 px-3"><span className="text-sky-300 font-semibold">Peserta Operator</span></td>
                <td className="py-3 px-3 text-slate-300">Angkatan 1</td>
                <td className="py-3 px-3 text-sky-400 font-semibold">Operator IPA</td>
                <td className="py-3 px-3 text-[11px] text-sky-300">Di tengah jalur IPA: 7/9 misi lulus, 14★</td>
                <td className="py-3 px-3 text-right space-x-2">
                  <span className="text-sky-400 font-semibold cursor-pointer hover:underline text-[11px]">Lihat Progres</span>
                  <button onClick={() => handleDeactivateUser('peserta.ipa')} className="text-rose-400 hover:underline text-[11px]">Nonaktifkan</button>
                </td>
              </tr>

              {/* 6. peserta.distribusi (Siti) */}
              <tr className="hover:bg-[#1e293b]/40">
                <td className="py-3 px-3 font-mono font-bold text-sky-400">peserta.distribusi</td>
                <td className="py-3 px-3 font-semibold text-white">Siti Rahmawati</td>
                <td className="py-3 px-3"><span className="text-amber-300 font-semibold">Peserta Operator</span></td>
                <td className="py-3 px-3 text-slate-300">Angkatan 1</td>
                <td className="py-3 px-3 text-amber-400 font-semibold">Operator Distribusi</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">Di tengah jalur distribusi (5 misi lulus)</td>
                <td className="py-3 px-3 text-right space-x-2">
                  <span className="text-sky-400 font-semibold cursor-pointer hover:underline text-[11px]">Detail</span>
                  <button onClick={() => handleDeactivateUser('peserta.distribusi')} className="text-rose-400 hover:underline text-[11px]">Nonaktifkan</button>
                </td>
              </tr>

              {/* 7. peserta.lulus (Andi) */}
              <tr className="hover:bg-[#1e293b]/40">
                <td className="py-3 px-3 font-mono font-bold text-emerald-400">peserta.lulus</td>
                <td className="py-3 px-3 font-semibold text-white">Andi Kurniawan</td>
                <td className="py-3 px-3"><span className="text-emerald-400 font-semibold">Peserta Lulus</span></td>
                <td className="py-3 px-3 text-slate-300">Angkatan 1</td>
                <td className="py-3 px-3 text-indigo-400 font-semibold">Air Minum Terpadu</td>
                <td className="py-3 px-3 text-[11px] text-emerald-300">17 misi lulus · piagam SSA/NUS/2026/0001 terbit</td>
                <td className="py-3 px-3 text-right space-x-2">
                  <button 
                    onClick={() => {
                      setVerificationCertNo('SSA/NUS/2026/0001');
                      setCurrentView('certificate');
                    }}
                    className="text-emerald-400 hover:underline font-semibold text-[11px]"
                  >
                    Piagam (L8)
                  </button>
                  <button onClick={() => handleDeactivateUser('peserta.lulus')} className="text-rose-400 hover:underline text-[11px]">Nonaktifkan</button>
                </td>
              </tr>

              {/* Summary Row +42 peserta contoh */}
              <tr className="bg-[#0b1120] border-t-2 border-[#1e293b]">
                <td colSpan={6} className="py-3 px-4 text-slate-400 text-xs">
                  <strong className="text-sky-400">+ 42 peserta contoh</strong>: Angkatan 1: 20 peserta contoh + 4 akun demo (24) · Angkatan 2: 22 peserta contoh · Total <strong className="text-white">46 / 50 kursi</strong> terpakai
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="text-sky-400 font-semibold cursor-pointer hover:underline text-[11px]">Lihat semua (46)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Group Management Section matching SVG L12 */}
      <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Kelompok Belajar Binaan Lembaga (FR-20)</h2>
            <p className="text-xs text-slate-400">Pengelompokan siswa untuk penugasan modul dan pemantauan</p>
          </div>
          <button
            onClick={() => setShowAddGroupModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Buat Kelompok</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Angkatan 1 · 24 peserta · Aktif</span>
              <div className="space-x-2 text-[11px]">
                <span className="text-sky-400 font-semibold cursor-pointer hover:underline">Ubah</span>
                <span className="text-slate-500 cursor-pointer hover:underline" onClick={() => archiveGroup('grp-nusantara-1')}>Arsip</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400">
              Instruktur: <strong className="text-slate-200">Budi Santoso, S.T.</strong> · Jalur ditetapkan per peserta
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1120] border border-[#1e293b] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Angkatan 2 · 22 peserta · Aktif</span>
              <div className="space-x-2 text-[11px]">
                <span className="text-sky-400 font-semibold cursor-pointer hover:underline">Ubah</span>
                <span className="text-slate-500 cursor-pointer hover:underline" onClick={() => archiveGroup('grp-nusantara-2')}>Arsip</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400">
              Instruktur: <strong className="text-slate-200">Budi Santoso, S.T.</strong> · Jalur IPA & Distribusi
            </div>
          </div>
        </div>
      </div>

      {/* Modal Add User */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0f172a] rounded-2xl border border-[#334155] p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white">Tambah Pengguna Baru</h3>
            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="e.g. peserta.g2.23"
                  className="w-full p-2.5 bg-[#0b1120] border border-[#334155] rounded-xl text-white font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="Nama Peserta"
                  className="w-full p-2.5 bg-[#0b1120] border border-[#334155] rounded-xl text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Kelompok</label>
                <select
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
                  className="w-full p-2.5 bg-[#0b1120] border border-[#334155] rounded-xl text-white"
                >
                  <option value="grp-nusantara-1">Angkatan 1</option>
                  <option value="grp-nusantara-2">Angkatan 2</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-[#1e293b] text-slate-300 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white font-bold rounded-xl"
                >
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Group */}
      {showAddGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0f172a] rounded-2xl border border-[#334155] p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white">Buat Kelompok Baru</h3>
            <form onSubmit={handleCreateGroup} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Kelompok</label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Contoh: Angkatan 3 (Spesialisasi Distribusi)"
                  className="w-full p-2.5 bg-[#0b1120] border border-[#334155] rounded-xl text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddGroupModal(false)}
                  className="px-4 py-2 bg-[#1e293b] text-slate-300 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white font-bold rounded-xl"
                >
                  Buat Kelompok
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
