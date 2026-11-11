/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Badge,
  Certificate,
  ControlPointDef,
  Mission,
  PrePostTestResult,
  QuizQuestion,
  Tenant,
  TrainingGroup,
  User,
  MissionResult,
} from '../types';

// ====================================================================
// A. LEMBAGA (TENANTS) SESUAI PRD §5 & BAGIAN 5 DOKUMEN HTML
// ====================================================================
export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'nusantara',
    code: 'NUS',
    name: 'Balai Diklat Air Minum Nusantara',
    shortName: 'Balai Nusantara',
    address: 'Jl. Tirta Darma No. 45, Kompleks Pengolahan Air, Jakarta Timur',
    contact: '(021) 8892-1200 / info@diklatnusantara.id',
    type: 'balai_pelatihan',
    license: {
      packageTracks: ['ipa', 'distribusi', 'terpadu'],
      seatQuota: 50,
      seatsUsed: 46, // 46 terpakai (92% -> Peringatan Kuota >= 90%)
      startDate: '2026-01-01',
      endDate: '2026-10-31', // Sisa lisensi 245 hari
      isActive: true,
    },
    signers: {
      leaderName: 'Dr. Ir. Bambang Sutrisno, M.Eng.',
      leaderTitle: 'Kepala Balai Diklat Air Minum Nusantara',
      instructorName: 'Budi Santoso, S.T.',
      instructorTitle: 'Instruktur Utama SPAM',
    },
    config: {
      passThresholdScore: 70,
      graduationThresholdScore: 80,
      leaderboardEnabled: true,
      localSopNotes: {
        intake: 'SOP-NUS-01: Pergantian pompa duty/standby wajib dicatat di logsheet harian shift.',
        koagulasi: 'Di instalasi latih IPA Balai Nusantara, injeksi koagulan memakai dosing pump otomatis dengan kalibrasi larutan PAC 10%. Batas minimum tangki harian adalah 20%.',
        filtrasi: 'SOP-NUS-04: Headloss > 2.0 mH2O atau waktu operasi 24 jam memicu backwash bertahap.',
        desinfeksi: 'SOP-NUS-05: Sisa klor di titik reservoir wajib dipertahankan 0.3 - 0.4 mg/L.',
      },
    },
  },
  {
    id: 'tirta',
    code: 'TRM',
    name: 'Pusat Pelatihan Tirta Mandiri',
    shortName: 'Tirta Mandiri',
    address: 'Jl. Rinjani No. 12, Kota Bandung, Jawa Barat',
    contact: '(022) 7201-9988 / diklat@tirtamandiri.co.id',
    type: 'swasta',
    license: {
      packageTracks: ['ipa'], // Hanya paket IPA
      seatQuota: 50,
      seatsUsed: 22,
      startDate: '2026-03-01',
      endDate: '2026-12-08', // Sisa lisensi 28 hari (<= 30 hari -> Peringatan berakhir)
      isActive: true,
    },
    signers: {
      leaderName: 'Hj. Dewi Anggraini, S.T., M.M.',
      leaderTitle: 'Direktur Pusat Pelatihan Tirta Mandiri',
      instructorName: 'Agus Salim, M.T.',
      instructorTitle: 'Instruktur Senior Operasi Hidrolika',
    },
    config: {
      passThresholdScore: 70,
      graduationThresholdScore: 80,
      leaderboardEnabled: true,
      localSopNotes: {
        intake: 'SOP-TRM-01: Verifikasi debit inflow minimum 150 m3/jam saat pompa beroperasi.',
      },
    },
  },
];

// ====================================================================
// B. KELOMPOK BELAJAR (GROUPS)
// ====================================================================
export const INITIAL_GROUPS: TrainingGroup[] = [
  {
    id: 'grp-nusantara-1',
    tenantId: 'nusantara',
    name: 'Angkatan 1 (24 Peserta)',
    instructorId: 'user-instruktur-nusantara',
    track: 'terpadu',
    createdAt: '2026-08-01',
  },
  {
    id: 'grp-nusantara-2',
    tenantId: 'nusantara',
    name: 'Angkatan 2 (22 Peserta)',
    instructorId: 'user-instruktur-nusantara',
    track: 'ipa',
    createdAt: '2026-09-15',
  },
  {
    id: 'grp-tirta-1',
    tenantId: 'tirta',
    name: 'Angkatan 1 Tirta Mandiri (22 Peserta)',
    instructorId: 'user-admin-tirta',
    track: 'ipa',
    createdAt: '2026-10-01',
  },
];

// ====================================================================
// C. 10 AKUN DEMO RESMI PRD §5 (SANDI: Demo#2026) + PESERTA CONTOH
// ====================================================================
// Total Nusantara: 4 akun demo peserta (baru, ipa, distribusi, lulus) + 42 peserta contoh = 46 kursi terpakai
export const INITIAL_USERS: User[] = [
  // 1. Superadmin
  {
    id: 'user-superadmin',
    username: 'superadmin',
    fullName: 'Super Administrator',
    email: 'superadmin@simscada-air.id',
    role: 'superadmin',
    tenantId: 'nusantara',
    createdAt: '2026-01-01',
    lastLoginAt: '2026-10-28T07:30:00Z',
  },
  // 2. Admin Nusantara
  {
    id: 'user-admin-nusantara',
    username: 'admin.nusantara',
    fullName: 'Rina Oktaviani',
    email: 'rina.oktaviani@diklatnusantara.id',
    role: 'admin_lembaga',
    tenantId: 'nusantara',
    createdAt: '2026-01-15',
    lastLoginAt: '2026-10-28T08:15:00Z',
  },
  // 3. Pimpinan Nusantara
  {
    id: 'user-pimpinan-nusantara',
    username: 'pimpinan.nusantara',
    fullName: 'Dr. Ir. Bambang Sutrisno, M.Eng.',
    email: 'bambang.sutrisno@diklatnusantara.id',
    role: 'pimpinan_lembaga',
    tenantId: 'nusantara',
    createdAt: '2026-01-15',
    lastLoginAt: '2026-10-28T09:00:00Z',
  },
  // 4. Instruktur Nusantara
  {
    id: 'user-instruktur-nusantara',
    username: 'instruktur.nusantara',
    fullName: 'Budi Santoso, S.T.',
    email: 'budi.santoso@diklatnusantara.id',
    role: 'instruktur',
    tenantId: 'nusantara',
    groupId: 'grp-nusantara-1',
    createdAt: '2026-01-20',
    lastLoginAt: '2026-10-28T10:05:00Z',
  },
  // 5. Peserta Baru
  {
    id: 'user-peserta-baru',
    username: 'peserta.baru',
    fullName: 'Budi Baru',
    email: 'budi.baru@peserta.diklatnusantara.id',
    role: 'peserta',
    tenantId: 'nusantara',
    groupId: 'grp-nusantara-1',
    track: 'terpadu',
    createdAt: '2026-10-25',
    lastLoginAt: '2026-10-28T11:00:00Z',
  },
  // 6. Peserta IPA (Dimas Wahyu Pratama)
  {
    id: 'user-peserta-ipa',
    username: 'peserta.ipa',
    fullName: 'Dimas Wahyu Pratama',
    email: 'dimas.pratama@peserta.diklatnusantara.id',
    role: 'peserta',
    tenantId: 'nusantara',
    groupId: 'grp-nusantara-1',
    track: 'ipa',
    createdAt: '2026-09-01',
    lastLoginAt: '2026-10-28T08:30:00Z',
  },
  // 7. Peserta Distribusi (Siti Rahmawati)
  {
    id: 'user-peserta-distribusi',
    username: 'peserta.distribusi',
    fullName: 'Siti Rahmawati',
    email: 'siti.rahmawati@peserta.diklatnusantara.id',
    role: 'peserta',
    tenantId: 'nusantara',
    groupId: 'grp-nusantara-1',
    track: 'distribusi',
    createdAt: '2026-09-05',
    lastLoginAt: '2026-10-26T14:20:00Z',
  },
  // 8. Peserta Lulus (Andi Kurniawan)
  {
    id: 'user-peserta-lulus',
    username: 'peserta.lulus',
    fullName: 'Andi Kurniawan',
    email: 'andi.kurniawan@peserta.diklatnusantara.id',
    role: 'peserta',
    tenantId: 'nusantara',
    groupId: 'grp-nusantara-1',
    track: 'terpadu',
    createdAt: '2026-08-01',
    lastLoginAt: '2026-10-28T10:15:00Z',
  },
  // 9. Admin Tirta Mandiri
  {
    id: 'user-admin-tirta',
    username: 'admin.tirta',
    fullName: 'Hj. Dewi Anggraini (Admin Tirta)',
    email: 'dewi.admin@tirtamandiri.co.id',
    role: 'admin_lembaga',
    tenantId: 'tirta',
    createdAt: '2026-03-01',
    lastLoginAt: '2026-10-28T08:30:00Z',
  },
  // 10. Peserta Tirta Mandiri
  {
    id: 'user-peserta-tirta',
    username: 'peserta.tirta',
    fullName: 'Siti Aminah (Peserta Tirta)',
    email: 'siti.aminah@peserta.tirtamandiri.co.id',
    role: 'peserta',
    tenantId: 'tirta',
    groupId: 'grp-tirta-1',
    track: 'ipa',
    createdAt: '2026-10-18',
    lastLoginAt: '2026-10-28T09:00:00Z',
  },

  // --- Peserta Contoh Tambahan Balai Nusantara (bukan akun demo) ---
  // Rian Hidayat (Menunggu Persetujuan Instruktur L8b, SSA/NUS/2026/0002)
  {
    id: 'user-rian-hidayat',
    username: 'rian.hidayat',
    fullName: 'Rian Hidayat',
    email: 'rian.hidayat@peserta.diklatnusantara.id',
    role: 'peserta',
    tenantId: 'nusantara',
    groupId: 'grp-nusantara-1',
    track: 'ipa',
    createdAt: '2026-08-10',
    lastLoginAt: '2026-10-28T09:45:00Z',
  },
  // Eko Prasetyo (Tertinggal, gagal IPA-07 3x)
  {
    id: 'user-eko-prasetyo',
    username: 'eko.prasetyo',
    fullName: 'Eko Prasetyo',
    email: 'eko.prasetyo@peserta.diklatnusantara.id',
    role: 'peserta',
    tenantId: 'nusantara',
    groupId: 'grp-nusantara-1',
    track: 'ipa',
    createdAt: '2026-08-15',
    lastLoginAt: '2026-10-25T11:20:00Z',
  },
];

// Generate 40 additional mock participants for Nusantara to reach exactly 46 users (24 in Grp 1, 22 in Grp 2)
// 42 active (login within 14 days)
(function populateNusantaraParticipants() {
  // Grp 1 already has: baru, ipa, distribusi, lulus, rian, eko (6 users)
  // Grp 1 needs 18 more to make 24
  for (let i = 1; i <= 18; i++) {
    const isInactive = i === 18; // 1 inactive in grp 1
    INITIAL_USERS.push({
      id: `user-nus-grp1-${i}`,
      username: `peserta.g1.${i}`,
      fullName: `Peserta Angkatan 1 - ${String.fromCharCode(64 + i)}`,
      email: `peserta.g1.${i}@diklatnusantara.id`,
      role: 'peserta',
      tenantId: 'nusantara',
      groupId: 'grp-nusantara-1',
      track: i % 2 === 0 ? 'ipa' : 'terpadu',
      createdAt: '2026-08-01',
      lastLoginAt: isInactive ? '2026-09-10T00:00:00Z' : '2026-10-24T10:00:00Z',
    });
  }

  // Grp 2 needs 22 users (Angkatan 2)
  for (let i = 1; i <= 22; i++) {
    const isInactive = i >= 20; // 3 inactive in grp 2 -> Total inactive = 4, Total active = 42!
    INITIAL_USERS.push({
      id: `user-nus-grp2-${i}`,
      username: `peserta.g2.${i}`,
      fullName: `Peserta Angkatan 2 - Nomor ${i}`,
      email: `peserta.g2.${i}@diklatnusantara.id`,
      role: 'peserta',
      tenantId: 'nusantara',
      groupId: 'grp-nusantara-2',
      track: i % 3 === 0 ? 'distribusi' : 'ipa',
      createdAt: '2026-09-15',
      lastLoginAt: isInactive ? '2026-09-20T00:00:00Z' : '2026-10-26T15:00:00Z',
    });
  }

  // Tirta Mandiri: 22 users total in grp-tirta-1 (18 active, 4 inactive)
  for (let i = 1; i <= 21; i++) {
    const isInactive = i >= 18;
    INITIAL_USERS.push({
      id: `user-trm-${i}`,
      username: `peserta.trm.${i}`,
      fullName: `Peserta Tirta Mandiri ${i}`,
      email: `peserta.trm.${i}@tirtamandiri.co.id`,
      role: 'peserta',
      tenantId: 'tirta',
      groupId: 'grp-tirta-1',
      track: 'ipa',
      createdAt: '2026-10-01',
      lastLoginAt: isInactive ? '2026-09-15T00:00:00Z' : '2026-10-27T08:00:00Z',
    });
  }
})();

// ====================================================================
// D. 8 LENCANA RESMI PRD §8
// ====================================================================
export const BADGES_LIST: Badge[] = [
  {
    id: 'b-penjelajah',
    name: 'Penjelajah Titik Kontrol',
    description: 'Membuka narasi edukasi semua titik kontrol di satu jalur simulasi.',
    iconName: 'Compass',
    requirement: 'Buka narasi semua titik kontrol IPA / Distribusi.',
  },
  {
    id: 'b-respons-kilat',
    name: 'Respons Kilat',
    description: 'Tindakan benar pertama dilakukan < 50% waktu target pada skenario gangguan.',
    iconName: 'Zap',
    requirement: 'Atasi gangguan dalam waktu < 30 detik (50% dari target 60 detik di IPA-06).',
  },
  {
    id: 'b-tanpa-alarm-terlewat',
    name: 'Tanpa Alarm Terlewat',
    description: 'Menyelesaikan misi gangguan dengan semua alarm diakui dan clear tanpa kesalahan.',
    iconName: 'ShieldCheck',
    requirement: '100% penanganan alarm berhasil tanpa rejected clear.',
  },
  {
    id: 'b-penjaga-mutu',
    name: 'Penjaga Mutu Air',
    description: 'Kekeruhan (<3 NTU) dan sisa klor (0,2-0,5 mg/L) stabil normal sepanjang sesi evaluasi.',
    iconName: 'Droplets',
    requirement: 'Stabilitas mutu air > 90% waktu misi jalur IPA.',
  },
  {
    id: 'b-penjaga-tekanan',
    name: 'Penjaga Tekanan',
    description: 'Tekanan semua zona pelanggan berada di rentang layanan sepanjang misi.',
    iconName: 'Gauge',
    requirement: 'Tekanan zona 1 dan 2 tidak pernah drop di bawah 1.5 bar.',
  },
  {
    id: 'b-tiga-bintang',
    name: 'Tiga Bintang Sempurna',
    description: 'Meraih skor ≥95 (bintang 3) pada semua misi di jalur aktif.',
    iconName: 'Star',
    requirement: 'Raih 3 bintang pada seluruh misi jalur pelatihan.',
  },
  {
    id: 'b-hulu-ke-hilir',
    name: 'Hulu ke Hilir',
    description: 'Berhasil mengatasi gangguan berantai terpadu dari IPA sampai distribusi (TRP-01).',
    iconName: 'GitFork',
    requirement: 'Lulus misi TRP-01 dengan minimal 1 bintang.',
  },
  {
    id: 'b-tanpa-petunjuk',
    name: 'Lulus Tanpa Petunjuk',
    description: 'Menuntaskan Misi Kelulusan tanpa menggunakan tombol bantuan petunjuk (-5 poin).',
    iconName: 'Award',
    requirement: 'Selesaikan misi ujian kelulusan dengan 0 petunjuk terpakai.',
  },
];

// ====================================================================
// E. TITIK KONTROL DENGAN 6 BAGIAN NARASI RESMI (PRD §9)
// ====================================================================
export const CONTROL_POINTS: ControlPointDef[] = [
  {
    id: 'intake',
    name: 'Intake & Pompa Air Baku',
    category: 'ipa',
    monitoredParams: ['Debit Air Baku (L/s)', 'Kekeruhan Air Baku (NTU)', 'Status Pompa 1 & 2', 'pH Air Baku'],
    controllableParams: ['Start / Stop Pompa 1 & 2', 'Pilih Duty/Standby', 'Atur Debit (L/s)', 'Reset Trip Pompa'],
    normalRanges: {
      debit: { min: 70, max: 120, unit: 'L/s', desc: 'Debit intake optimal pengolahan (100 L/s nominal)' },
      kekeruhan: { min: 15, max: 50, unit: 'NTU', desc: 'Kekeruhan normal air sungai' },
    },
    narrative: {
      apaIni: 'Unit Intake menyadap air baku dari badan air alami (sungai/waduk) menggunakan saringan kasar (bar screen) dan pompa air baku menuju instalasi pengolahan.',
      yangDipantau: 'Debit aliran air baku (L/s), kekeruhan air baku (NTU), status operasi pompa (Run/Stop/Trip), dan level sumur intake.',
      yangBisaDikendalikan: 'Start/stop Pompa 1 dan Pompa 2, pemilihan pompa utama (duty) dan cadangan (standby), pengaturan debit intake, serta reset alarm trip pompa.',
      dampakKeHilir: 'Bila debit intake drop, seluruh bak sedimentasi dan reservoir akan kekurangan pasokan. Bila kekeruhan air baku melonjak tajam tanpa penyesuaian koagulan, air olahan akan keruh.',
      gangguanUmumDanSop: 'Pompa trip akibat beban lebih atau sampah: Segera alihkan ke pompa cadangan, periksa panel, tekan tombol Reset, lalu clear alarm.',
      pelajariLebihLanjut: 'Modul IPA Bab 1: Hidrolika Intake dan Karakteristik Air Baku Sungai Indonesia.',
    },
  },
  {
    id: 'koagulasi',
    name: 'Flash Mixer Koagulasi',
    category: 'ipa',
    monitoredParams: ['Dosis Koagulan PAC (mg/L)', 'Dosis Penyesuai pH Kapur (mg/L)', 'pH Air Koagulasi', 'Kecepatan Flash Mixer (RPM)'],
    controllableParams: ['Setpoint Dosis Koagulan PAC (mg/L)', 'Dosis Penyesuai pH (mg/L)', 'Saklar On/Off Mixer (120 RPM)'],
    normalRanges: {
      dosis: { min: 20, max: 50, unit: 'mg/L', desc: 'Dosis PAC (20-30 mg/L normal, 45-55 mg/L banjir)' },
      ph: { min: 6.5, max: 8.5, unit: 'pH', desc: 'Baku mutu Permenkes No. 2/2023 (Target: 7.20)' },
    },
    narrative: {
      apaIni: 'Unit pengaduk berkecepatan tinggi (Flash Mixer, G > 750 s⁻¹) yang meratakan koagulan PAC ke seluruh aliran air baku dalam waktu < 60 detik untuk mendestabilisasi koloid.',
      yangDipantau: 'Dosis koagulan PAC aktual (mg/L), dosis penyesuai pH (mg/L), pH hasil koagulasi (6.5 - 8.5), dan putaran motor mixer (100 - 150 RPM).',
      yangBisaDikendalikan: 'Setpoint dosis koagulan PAC, setpoint dosis kapur penyesuai pH, dan saklar On/Off motor flash mixer.',
      dampakKeHilir: 'Underdosing: Flok tidak terbentuk sempurna, kekeruhan lolos melewati bak sedimentasi dan membebani filter. Overdosing: Pemborosan kimia, pH anjlok tajam, dan lumpur berlebih meluap ke filter.',
      gangguanUmumDanSop: 'Lonjakan Kekeruhan Baku: Naikkan dosis PAC (misal 20 ke 48 mg/L) sesuai kurva jar-test; Pompa Dosing Macet: Pindahkan ke pompa cadangan lalu lakukan flushing; pH Drop: Tambahkan kapur agar pH tetap 6.5 - 8.5.',
      pelajariLebihLanjut: 'Modul Teori IPA-03 (Koagulasi) & Standar Permenkes No. 2/2023 Bab II.',
    },
  },
  {
    id: 'flokulasi',
    name: 'Flokulator (3 Kompartemen)',
    category: 'ipa',
    monitoredParams: ['Kecepatan Stage 1 (RPM)', 'Kecepatan Stage 2 (RPM)', 'Kecepatan Stage 3 (RPM)', 'Kondisi Pembentukan Flok'],
    controllableParams: ['On/Off Pengaduk Lambat', 'Kecepatan Bertahap'],
    normalRanges: {
      stage1: { min: 35, max: 50, unit: 'RPM', desc: 'Stage 1: Pengadukan cepat-sedang (45 RPM)' },
      stage2: { min: 25, max: 35, unit: 'RPM', desc: 'Stage 2: Pengadukan sedang (30 RPM)' },
      stage3: { min: 10, max: 20, unit: 'RPM', desc: 'Stage 3: Pengadukan lambat (15 RPM)' },
    },
    narrative: {
      apaIni: 'Flokulator 3 kompartemen menggabungkan partikel mikro terdestabilisasi menjadi gumpalan flok makro yang padat dan mudah mengendap secara bertahap (gradien G menurun).',
      yangDipantau: 'Kecepatan putar pengaduk lambat tiap kompartemen dan indeks visual pembentukan flok.',
      yangBisaDikendalikan: 'Saklar On/Off dan regulasi kecepatan pengaduk per stage.',
      dampakKeHilir: 'Pengadukan terlalu lambat membuat flok mengendap prematur di saluran; terlalu kencang menyebabkan flok pecah (floc shear) sehingga lolos ke filter.',
      gangguanUmumDanSop: 'Motor pengaduk macet: Periksa panel proteksi overload, jalankan motor backup kompartemen.',
      pelajariLebihLanjut: 'Modul IPA Bab 3: Desain Kompartemen Flokulasi dan Gradien Kecepatan.',
    },
  },
  {
    id: 'sedimentasi',
    name: 'Sedimentasi (Plate Settler)',
    category: 'ipa',
    monitoredParams: ['Kekeruhan Keluar Bak (NTU)', 'Selimut Lumpur (Meter)', 'Tren Kekeruhan'],
    controllableParams: ['Valve Blowdown Lumpur (Buang)'],
    normalRanges: {
      kekeruhanKeluar: { min: 2.0, max: 15.0, unit: 'NTU', desc: 'Air jernih sebelum masuk filter (nominal 12.4 NTU)' },
      selimutLumpur: { min: 0.5, max: 2.0, unit: 'Meter', desc: 'Tinggi akumulasi lumpur di hopper' },
    },
    narrative: {
      apaIni: 'Bak sedimentasi dengan plate settler mengendapkan flok secara gravitasi dan memisahkan air bersih di permukaan dari endapan lumpur di dasar.',
      yangDipantau: 'Kekeruhan air olahan keluar sedimentasi dan ketebalan selimut lumpur di hopper.',
      yangBisaDikendalikan: 'Membuka valve blowdown lumpur untuk membuang endapan ke bak penampung.',
      dampakKeHilir: 'Bila lumpur menumpuk melebihi 2.0 meter, terjadi sludge carryover yang langsung menyumbat media filter dalam beberapa menit.',
      gangguanUmumDanSop: 'Selimut lumpur tinggi: Lakukan blowdown rutin setiap shift selama 1-2 menit hingga cairan buangan encer kembali.',
      pelajariLebihLanjut: 'Modul IPA Bab 4: Efisiensi Pengendapan Bak Lamella.',
    },
  },
  {
    id: 'filtrasi',
    name: 'Filtrasi (Dual Sand Filter)',
    category: 'ipa',
    monitoredParams: ['Kekeruhan Air Olahan Masuk Reservoir (NTU)', 'Headloss Filter (Meter)', 'Status Filter 1 & 2'],
    controllableParams: ['Pencucian Balik (Backwash Filter)'],
    normalRanges: {
      kekeruhanOlahan: { min: 0.5, max: 2.8, unit: 'NTU', desc: 'Wajib < 3.0 NTU (Permenkes 2/2023)' },
      headloss: { min: 0.5, max: 1.8, unit: 'Meter', desc: 'Kehilangan tekanan media pasir' },
    },
    narrative: {
      apaIni: 'Unit Filtrasi menggunakan media ganda (antrasit dan pasir silika) untuk menyaring sisa partikel halus tak terendapkan.',
      yangDipantau: 'Kekeruhan air olahan (wajib < 3.0 NTU; ≥ 3.0 NTU memicu alarm TINGGI) dan headloss kehilangan tekanan filter.',
      yangBisaDikendalikan: 'Mengaktifkan siklus pencucian balik (backwash) untuk memulihkan kapasitas filtrasi.',
      dampakKeHilir: 'Kekeruhan air olahan ≥ 3.0 NTU melanggar baku mutu Permenkes dan dapat menyebarkan bakteri ke reservoir kota.',
      gangguanUmumDanSop: 'Kekeruhan air olahan melonjak ≥ 3.0 NTU: Akui alarm segera, evaluasi dosis PAC di koagulasi. Bila headloss > 2.0 m, lakukan backwash bergantian.',
      pelajariLebihLanjut: 'Modul IPA Bab 5: Pengoperasian dan Pembersihan Filter Pasir Cepat.',
    },
  },
  {
    id: 'reservoir',
    name: 'Reservoir Air Bersih & Klorinasi',
    category: 'ipa',
    monitoredParams: ['Level Air Reservoir (Meter / %)', 'Sisa Klorin Ujung (mg/L)', 'Katup Masuk/Keluar'],
    controllableParams: ['Setpoint Dosis Klorin (mg/L)', 'Katup Masuk / Keluar'],
    normalRanges: {
      level: { min: 2.0, max: 4.8, unit: 'Meter', desc: 'Level aman tangki (4.2 m = 84%)' },
      sisaKlor: { min: 0.2, max: 0.5, unit: 'mg/L', desc: 'Permenkes: 0.2 - 0.5 mg/L (Target: 0.38)' },
    },
    narrative: {
      apaIni: 'Tangki penyimpanan air olahan bersih yang dilengkapi injeksi klorin untuk membunuh patogen dan menjaga residu desinfektan di jaringan pipa.',
      yangDipantau: 'Ketinggian air reservoir (meter dan %), sisa klor bebas outlet (harus 0.2 - 0.5 mg/L).',
      yangBisaDikendalikan: 'Setpoint dosing klorin (1.20 mg/L) dan valve buka/tutup isolasi.',
      dampakKeHilir: 'Sisa klor < 0.2 mg/L memicu alarm KRITIS karena risiko kontaminasi bakteri di jaringan. Level < 1.0 m membahayakan pompa distribusi karena kavitasi.',
      gangguanUmumDanSop: 'Sisa klor drop < 0.2 mg/L: Segera naikkan dosing klor ke 1.5 - 1.8 mg/L hingga terdeteksi residu stabil 0.38 mg/L.',
      pelajariLebihLanjut: 'Modul IPA Bab 6: Kimia Klorinasi dan Regulasi Permenkes No. 2/2023.',
    },
  },
  {
    id: 'pompa_distribusi',
    name: 'Pompa Distribusi',
    category: 'distribusi',
    monitoredParams: ['Tekanan Keluar (bar)', 'Total Debit Pompa (m3/h)', 'Status Pompa 1 & 2'],
    controllableParams: ['Start / Stop Pompa 1 & 2', 'Jumlah Pompa Jalan', 'Reset Trip Pompa'],
    normalRanges: {
      tekanan: { min: 3.5, max: 4.5, unit: 'bar', desc: 'Tekanan buang stasiun pompa (nominal 4.1 bar)' },
      debit: { min: 140, max: 200, unit: 'm³/h', desc: 'Total aliran ke jaringan pipa' },
    },
    narrative: {
      apaIni: 'Stasiun Pompa Distribusi memompa air minum dari reservoir ke jaringan pipa perpipaan kota dengan tekanan memadai.',
      yangDipantau: 'Tekanan pipa buang stasiun pompa (bar), total debit aliran (m³/h), dan status proteksi motor listrik.',
      yangBisaDikendalikan: 'Start/Stop pompa P-101 dan P-102, memilih jumlah pompa yang jalan, dan reset alarm trip.',
      dampakKeHilir: 'Pompa distribusi trip menyebabkan tekanan seluruh kota drop seketika, pasokan terhenti dan risiko kontaminasi dari air tanah masuk ke pipa.',
      gangguanUmumDanSop: 'Pompa trip: Alarm berbunyi KRITIS! Segera start pompa cadangan, periksa panel proteksi, tekan tombol Reset Pompa, lalu clear alarm.',
      pelajariLebihLanjut: 'Modul Distribusi Bab 2: Kurva Karakteristik Pompa Sentrifugal dan Paralel.',
    },
  },
  {
    id: 'valve_prv',
    name: 'Katup Pengurang Tekanan (PRV) & Isolasi',
    category: 'distribusi',
    monitoredParams: ['Status Valve Zona 1 & 2', 'Setpoint PRV (bar)', 'Status Valve Isolasi Bocor'],
    controllableParams: ['Buka/Tutup Valve Zona 1', 'Buka/Tutup Valve Zona 2', 'Valve Isolasi Kebocoran', 'Setpoint PRV (bar)'],
    normalRanges: {
      prv: { min: 2.0, max: 3.0, unit: 'bar', desc: 'Setpoint reduksi tekanan zona (nominal 2.5 bar)' },
    },
    narrative: {
      apaIni: 'Pressure Reducing Valve (PRV) dan Katup Sekat Zona mengontrol tekanan hidrolika dan mencegah lonjakan water hammer yang merusak meteran pelanggan.',
      yangDipantau: 'Posisi katup zona, setpoint PRV dalam satuan bar, dan status katup isolasi ruas pipa.',
      yangBisaDikendalikan: 'Mengatur setpoint bukaan PRV dalam bar dan menutup valve isolasi saat terjadi kebocoran pipa.',
      dampakKeHilir: 'Kebocoran pipa tidak diisolasi menyebabkan kehilangan air masif dan tekanan zona drop di bawah 1.5 bar.',
      gangguanUmumDanSop: 'Pipa pecah/bocor: Tutup katup isolasi ruas pipa terkait (Valve Isolasi Bocor) dalam waktu target 60 detik untuk melokalisir kebocoran.',
      pelajariLebihLanjut: 'Modul Distribusi Bab 3: Manajemen Tekanan Zona (DMA) dan Operasional PRV.',
    },
  },
  {
    id: 'titik_pantau_jaringan',
    name: 'Titik Pantau Jaringan (Zona 1 & 2)',
    category: 'distribusi',
    monitoredParams: ['Tekanan Zona 1 (bar)', 'Tekanan Zona 2 (bar)', 'Debit Zona (m3/h)', 'Sisa Klor Ujung (mg/L)'],
    controllableParams: ['Pemantauan Telemetri Lapangan'],
    normalRanges: {
      tekananZona1: { min: 2.0, max: 2.8, unit: 'bar', desc: 'Tekanan layanan perumahan (nominal 2.4 bar)' },
      tekananZona2: { min: 1.8, max: 2.5, unit: 'bar', desc: 'Tekanan layanan komersial (nominal 2.1 bar)' },
      sisaKlorUjung: { min: 0.15, max: 0.35, unit: 'mg/L', desc: 'Residu klorin ujung pipa (nominal 0.26 mg/L)' },
    },
    narrative: {
      apaIni: 'Titik Pantau Jaringan telemetri IoT memantau tekanan hidrolika dan kualitas air di titik sambungan terjauh pelanggan.',
      yangDipantau: 'Tekanan pipa dinamis (bar), laju aliran zona (m³/h), dan sisa klorin bebas ujung pipa.',
      yangBisaDikendalikan: 'Unit sensor pantau (read-only) untuk diagnostik ruang kontrol.',
      dampakKeHilir: 'Bila tekanan < 1.5 bar, air tidak naik ke lantai atas pelanggan. Bila sisa klor 0.0 mg/L, air berisiko tercemar bakteri.',
      gangguanUmumDanSop: 'Tekanan drop diiringi debit melonjak: Indikasi kebocoran pipa distribusi. Lakukan isolasi katup zona segera.',
      pelajariLebihLanjut: 'Modul Distribusi Bab 4: Analisis Pola Kebocoran dan Residual Klorin.',
    },
  },
];

// ====================================================================
// F. KATALOG MISI RESMI PRD §7 (IPA-01..09, DST-01..07, TRP-01..02)
// ====================================================================
export const MISSIONS_LIST: Mission[] = [
  // --- JALUR IPA (9 MISI) ---
  {
    code: 'IPA-01',
    name: 'Kenali Ruang Kendali IPA',
    level: 1,
    levelName: 'Tingkat 1: Pengenalan (Mudah · 1,0x XP)',
    track: ['ipa', 'terpadu'],
    trainingFocus: 'Membuka narasi semua titik kontrol IPA, membaca nilai proses dan batas aman.',
    passScore: 70,
    briefing: {
      situation: 'Selamat datang di Ruang Kendali Instalasi Pengolahan Air (IPA). Hari ini Anda memulai shift orientasi pertama.',
      objective: 'Buka narasi edukasi titik kontrol Intake, Koagulasi, Flokulasi, Sedimentasi, Filtrasi, Desinfeksi, dan Reservoir.',
      mentorQuote: '"Pahami setiap unit pengolahan dan batas operasinya sebelum kamu menyentuh saklar kendali." — Pak Slamet',
    },
    debriefing: {
      success: 'Bagus sekali! Anda telah membaca dan menginspeksi seluruh unit pengolahan air bersih.',
      failure: 'Pastikan Anda mengeklik ikon informasi di setiap titik kontrol dan membaca parameter normalnya.',
    },
    disturbances: [],
    hints: ['Klik ikon "i" pada diagram SCADA untuk membuka narasi titik kontrol.'],
    quiz: [
      {
        id: 'q1',
        question: 'Berapa batas maksimal kekeruhan air olahan menurut Permenkes No. 2 Tahun 2023?',
        options: ['10 NTU', '5 NTU', '3 NTU', '15 NTU'],
        correctIndex: 2,
        explanation: 'Menurut Permenkes No. 2 Tahun 2023, standar baku mutu kekeruhan air minum adalah maksimal 3 NTU.',
      },
      {
        id: 'q2',
        question: 'Apa fungsi utama penambahan koagulan (PAC) pada unit pengolahan air?',
        options: ['Membunuh kuman patogen', 'Mendestabilisasi muatan koloid agar dapat menggumpal menjadi flok', 'Menambah rasa manis', 'Mencegah karat pipa'],
        correctIndex: 1,
        explanation: 'Koagulan mendestabilisasi partikel koloid bermuatan negatif.',
      },
      {
        id: 'q3',
        question: 'Rentang sisa klor bebas yang aman di air olahan reservoir adalah...',
        options: ['0,0 - 0,1 mg/L', '0,2 - 0,5 mg/L', '1,5 - 2,5 mg/L', '3,0 - 5,0 mg/L'],
        correctIndex: 1,
        explanation: 'Standar sisa klor bebas yang aman dan efektif adalah 0,2 hingga 0,5 mg/L.',
      },
      {
        id: 'q4',
        question: 'Kapan operator harus menjalankan siklus backwash pada filter pasir cepat?',
        options: ['Setiap jam', 'Saat headloss filter melebihi batas aman (>2.0 m) atau kekeruhan naik', 'Saat reservoir penuh', 'Hanya saat mati lampu'],
        correctIndex: 1,
        explanation: 'Backwash wajib dijalankan saat media filter jenuh kotoran ditandai headloss tinggi.',
      },
      {
        id: 'q5',
        question: 'Bila alarm pompa trip muncul dengan status terkunci (latched), langkah pertama adalah...',
        options: ['Langsung tekan tombol Clear alarm', 'Matikan seluruh instalasi', 'Jalankan pompa cadangan, verifikasi penyebab, tekan Reset, baru Clear', 'Biarkan saja'],
        correctIndex: 2,
        explanation: 'SOP pompa trip: alihkan segera ke pompa cadangan, periksa kelistrikan, tekan Reset, baru Clear alarm.',
      },
    ],
  },
  {
    code: 'IPA-02',
    name: 'Menyalakan Intake & Aliran Baku',
    level: 2,
    levelName: 'Tingkat 2: Operasi Normal (Mudah · 1,0x XP)',
    track: ['ipa', 'terpadu'],
    trainingFocus: 'Menghidupkan pompa intake air baku dan mencapai debit target stabil.',
    passScore: 70,
    briefing: {
      situation: 'Instalasi baru selesai masa perawatan. Nyalakan pompa intake untuk memulai produksi air baku.',
      objective: 'Hidupkan Pompa Intake 1, pastikan flash mixer aktif, dan jaga debit stabil di 70-100 L/s.',
      mentorQuote: '"Nyalakan pompa intake dengan tenang. Pastikan pengaduk cepat aktif agar siap menerima injeksi koagulan." — Pak Slamet',
    },
    debriefing: {
      success: 'Mantap! Pompa intake beroperasi lancar dan debit aliran air baku tercapai stabil sesuai kapasitas.',
      failure: 'Debit air baku belum stabil atau pompa intake tidak dihidupkan dengan benar.',
    },
    disturbances: [],
    hints: ['Pilih titik Intake pada diagram SCADA, lalu klik tombol "Start Pompa 1".'],
    quiz: [
      {
        id: 'q1',
        question: 'Komponen yang berfungsi menyaring sampah kasar di bibir saluran intake adalah...',
        options: ['Venturi meter', 'Bar screen / saringan sampah', 'Clarifier plate', 'Diffuser aerasi'],
        correctIndex: 1,
        explanation: 'Bar screen menahan sampah kasar sebelum hisapan pompa.',
      },
      {
        id: 'q2',
        question: 'Mengapa pompa intake dilengkapi unit cadangan (standby)?',
        options: ['Untuk dijual', 'Menjamin kontinuitas pasokan 24 jam bila satu pompa bermasalah', 'Mengurangi tagihan listrik', 'Sebagai pajangan'],
        correctIndex: 1,
        explanation: 'Prinsip redundansi menjamin keandalan suplai air.',
      },
      {
        id: 'q3',
        question: 'SOP pengoperasian pompa sentrifugal melarang menjalankan pompa dalam keadaan...',
        options: ['Kering tanpa air (dry running)', 'Tersambung listrik PLN', 'Terbuka katup hisap', 'Tekanan stabil'],
        correctIndex: 0,
        explanation: 'Dry running akan merusak mechanical seal pompa seketika.',
      },
      {
        id: 'q4',
        question: 'Apa dampak jika debit intake melebihi kapasitas desain pengolahan?',
        options: ['Air makin jernih', 'Waktu detensi di bak sedimentasi berkurang sehingga flok tidak sempat mengendap', 'Klorinasi tidak perlu', 'Tidak ada dampak'],
        correctIndex: 1,
        explanation: 'Kelebihan debit membuat flok terbawa ke saringan filter.',
      },
      {
        id: 'q5',
        question: 'Debit normal desain intake pada instalasi ini adalah...',
        options: ['10 L/s', '75 - 100 L/s', '500 L/s', '1000 L/s'],
        correctIndex: 1,
        explanation: 'Debit normal adalah 75 - 100 L/s.',
      },
    ],
  },
  {
    code: 'IPA-03',
    name: 'Dosis Koagulan Kondisi Normal',
    level: 2,
    levelName: 'Tingkat 2: Operasi Normal (Sedang · 1,5x XP)',
    track: ['ipa', 'terpadu'],
    trainingFocus: 'Mengatur dosis koagulan PAC dan pengadukan sampai kekeruhan air olahan < 3 NTU.',
    passScore: 70,
    briefing: {
      situation: 'Air baku sungai memiliki kekeruhan 25 NTU. Anda bertugas mengoptimalkan dosis koagulan PAC dan menjaga pH tetap 6.8 - 7.5.',
      objective: 'Atur setpoint dosis koagulan ke 25-30 mg/L dan pastikan pengaduk lambat beroperasi.',
      mentorQuote: '"Dosis koagulan yang pas adalah kunci kebersihan air dan efisiensi bahan kimia." — Pak Slamet',
    },
    debriefing: {
      success: 'Luar biasa! Kekeruhan air olahan stabil di angka 1.2 NTU, memenuhi baku mutu Permenkes.',
      failure: 'Dosis koagulan belum optimal sehingga kekeruhan belum memenuhi syarat.',
    },
    disturbances: [],
    hints: ['Pilih unit Koagulasi, atur setpoint dosis koagulan ke 28 mg/L.'],
    quiz: [
      {
        id: 'q1',
        question: 'Metode laboratorium baku untuk menentukan dosis koagulan optimum adalah...',
        options: ['Titrasi asam', 'Jar test', 'Spektrofotometri', 'Uji Coliform'],
        correctIndex: 1,
        explanation: 'Jar test menentukan dosis optimum koagulan di laboratorium.',
      },
      {
        id: 'q2',
        question: 'Jika dosis koagulan tawas diberikan berlebihan tanpa koreksi kapur, nilai pH air akan...',
        options: ['Naik drastis', 'Turun menjadi asam (<6.5)', 'Tetap netral 7.0', 'Tidak terpengaruh'],
        correctIndex: 1,
        explanation: 'Koagulan mengonsumsi alkalinitas air sehingga menurunkan pH.',
      },
      {
        id: 'q3',
        question: 'Dosis koagulan PAC tipikal untuk kekeruhan air baku 25 NTU adalah...',
        options: ['1 - 5 mg/L', '20 - 30 mg/L', '150 - 200 mg/L', '500 mg/L'],
        correctIndex: 1,
        explanation: 'Dosis tipikal berkisar 20 - 30 mg/L.',
      },
      {
        id: 'q4',
        question: 'Waktu pengadukan cepat pada koagulasi berlangsung selama...',
        options: ['30 - 60 detik', '10 jam', '2 hari', '3 menit'],
        correctIndex: 0,
        explanation: 'Flash mixing adalah reaksi kilat 30-60 detik.',
      },
      {
        id: 'q5',
        question: 'Standar pH air minum yang dipersyaratkan Permenkes adalah...',
        options: ['4.0 - 5.5', '6.5 - 8.5', '9.0 - 11.0', 'Bebas'],
        correctIndex: 1,
        explanation: 'Baku mutu pH air minum adalah 6.5 - 8.5.',
      },
    ],
  },
  {
    code: 'IPA-04',
    name: 'Jaga Filter, Lakukan Backwash',
    level: 2,
    levelName: 'Tingkat 2: Operasi Normal (Sedang · 1,5x XP)',
    track: ['ipa', 'terpadu'],
    trainingFocus: 'Membaca kenaikan headloss filter dan menjalankan backwash bergantian.',
    passScore: 70,
    briefing: {
      situation: 'Filter Pasir 1 telah beroperasi 36 jam. Indikator headloss naik mendekati 1.8 m.',
      objective: 'Jalankan prosedur pencucian balik (Backwash) pada Filter 1 sambil memastikan Filter 2 tetap beroperasi.',
      mentorQuote: '"Jangan pernah mencuci dua filter sekaligus agar aliran produksi air tidak terputus." — Pak Slamet',
    },
    debriefing: {
      success: 'Pencucian filter berjalan sempurna. Headloss kembali normal dan kejernihan air terjaga.',
      failure: 'Headloss filter melebihi batas atau kedua filter dimatikan bersamaan.',
    },
    disturbances: [],
    hints: ['Pilih unit Filtrasi di SCADA panel, lalu klik tombol "Backwash Filter".'],
    quiz: [
      {
        id: 'q1',
        question: 'Tanda fisik utama media filter pasir cepat sudah jenuh adalah...',
        options: ['Warna air jadi merah', 'Kenaikan headloss dan penurunan laju filtrasi', 'Pompa intake mati', 'Air memanas'],
        correctIndex: 1,
        explanation: 'Tersumbatnya pori pasir menyebabkan kehilangan tekanan (headloss) naik.',
      },
      {
        id: 'q2',
        question: 'Media filter ganda (dual media) umumnya terdiri atas...',
        options: ['Pasir silika dan antrasit', 'Tanah liat dan semen', 'Garam dan tawas', 'Batu bata'],
        correctIndex: 0,
        explanation: 'Antrasit (atas) dan pasir silika (bawah) membentuk filter kedalaman.',
      },
      {
        id: 'q3',
        question: 'Mengapa backwash tidak boleh dilakukan serentak pada semua filter?',
        options: ['Hemat listrik saja', 'Menghindari terhentinya pasokan air olahan ke reservoir', 'Pipa pembuangan bisa pecah', 'Boleh saja serentak'],
        correctIndex: 1,
        explanation: 'Sistem staggered backwash menjamin pasokan kontinuitas air.',
      },
      {
        id: 'q4',
        question: 'Tujuan ekspansi media saat backwash adalah...',
        options: ['Melelehkan pasir', 'Menguraikan butiran pasir 20-30% agar kotoran terlepas', 'Menambah berat pasir', 'Membakar kuman'],
        correctIndex: 1,
        explanation: 'Ekspansi membebaskan kotoran yang menempel pada butiran media.',
      },
      {
        id: 'q5',
        question: 'Air bilasan awal hasil backwash sebaiknya...',
        options: ['Langsung dialirkan ke pipa pelanggan', 'Dibuang ke saluran drainase/bak pengolah lumpur', 'Diminum operator', 'Disimpan di botol'],
        correctIndex: 1,
        explanation: 'Air cuci filter mengandung konsentrasi lumpur pekat.',
      },
    ],
  },
  {
    code: 'IPA-05',
    name: 'Klorinasi Tepat & Residu Aman',
    level: 2,
    levelName: 'Tingkat 2: Operasi Normal (Sedang · 1,5x XP)',
    track: ['ipa', 'terpadu'],
    trainingFocus: 'Mengatur dosis klor hingga sisa klor bebas berada di rentang 0.2 - 0.5 mg/L sesuai Permenkes.',
    passScore: 70,
    briefing: {
      situation: 'Air olahan siap masuk ke reservoir penampungan. Pastikan sisa klorin bebas terukur stabil di 0.3 - 0.4 mg/L.',
      objective: 'Atur setpoint dosing klorin pada rentang 1.2 - 1.5 mg/L hingga sisa klor bebas terukur stabil.',
      mentorQuote: '"Klorin adalah benteng terakhir melawan patogen. Dosis kurang berbahaya bagi warga, dosis lebih menimbulkan bau kaporit menyengat." — Pak Slamet',
    },
    debriefing: {
      success: 'Bagus! Sisa klor stabil di 0.38 mg/L, memenuhi ketentuan Permenkes No. 2/2023 secara presisi.',
      failure: 'Sisa klor bebas berada di luar batas 0.2 - 0.5 mg/L.',
    },
    disturbances: [],
    hints: ['Pilih unit Desinfeksi di diagram HMI, atur setpoint dosis klor ke 1.3 mg/L.'],
    quiz: [
      {
        id: 'q1',
        question: 'Dua bentuk senyawa klorin aktif yang berperan sebagai desinfektan utama dalam air adalah...',
        options: ['Asam hipoklorit (HOCl) dan ion hipoklorit (OCl-)', 'Natrium klorida dan asam klorida', 'Karbon monoksida', 'Klorofil'],
        correctIndex: 0,
        explanation: 'HOCl dan OCl- merupakan sisa klor bebas aktif.',
      },
      {
        id: 'q2',
        question: 'Sisa klor bebas di titik terjauh jaringan distribusi disarankan minimal tetap sebesar...',
        options: ['0,0 mg/L', '0,2 mg/L', '5,0 mg/L', '10 mg/L'],
        correctIndex: 1,
        explanation: 'Minimal 0.2 mg/L sisa klor mencegah rekontaminasi bakteri di pipa.',
      },
      {
        id: 'q3',
        question: 'Waktu kontak minimum yang disyaratkan untuk desinfeksi klorin di reservoir adalah...',
        options: ['1 detik', 'Minimal 30 menit', '24 jam', '5 hari'],
        correctIndex: 1,
        explanation: 'Waktu kontak 30 menit disyaratkan untuk membunuh mikroorganisme.',
      },
      {
        id: 'q4',
        question: 'Jika pH air terlalu basa (>8.5), efektivitas desinfeksi klorin akan...',
        options: ['Meningkat', 'Menurun, karena HOCl terdisosiasi menjadi ion OCl- yang lemah daya bunuhnya', 'Tidak berubah', 'Air jadi manis'],
        correctIndex: 1,
        explanation: 'Pada pH tinggi, klorin berubah menjadi OCl- yang kurang efektif membunuh kuman.',
      },
      {
        id: 'q5',
        question: 'Baku mutu rentang sisa klor bebas pada air reservoir adalah...',
        options: ['0,0 - 0,1 mg/L', '0,2 - 0,5 mg/L', '1,0 - 2,0 mg/L', '3,0 - 5,0 mg/L'],
        correctIndex: 1,
        explanation: 'Rentang baku mutu Permenkes No. 2/2023 adalah 0,2 - 0,5 mg/L.',
      },
    ],
  },
  {
    code: 'IPA-06',
    name: 'Gangguan: Lonjakan Kekeruhan Air Baku',
    level: 3,
    levelName: 'Tingkat 3: Gangguan Tunggal (Sulit · 2,0x XP)',
    track: ['ipa', 'terpadu'],
    trainingFocus: 'Menaikkan dosis koagulan PAC dan menyesuaikan pH saat terjadi banjir lumpur di hulu.',
    durationLimitSec: 510, // 8 menit 30 detik
    passScore: 70,
    briefing: {
      situation: 'Hujan lebat di hulu sungai menyebabkan banjir bandang. Kekeruhan air baku melonjak tiba-tiba dari 20 NTU hingga 185 NTU!',
      objective: 'Akui alarm, naikkan dosis koagulan PAC ke 48 mg/L, atur dosis kapur ke 8.5 mg/L (pH 7.20), dan turunkan debit intake ke 75 L/s agar kekeruhan air olahan kembali normal.',
      mentorQuote: '"Alarm akan berbunyi kencang! Segera akui alarm, naikkan dosis koagulan, dan tunggu 10 detik stabil hingga alarm auto-clear." — Pak Slamet',
    },
    debriefing: {
      success: 'Kerja luar biasa, Dimas! Tindakan koreksi pertama Anda datang 25 detik setelah alarm air olahan (< 50% target skenario 60 detik) sehingga berhak atas Lencana Respons Kilat.',
      failure: 'Kekeruhan air olahan melampaui ambang batas 3.0 NTU atau penanganan alarm tidak sesuai urutan SOP.',
    },
    disturbances: [
      {
        id: 'dist-turbidity-spike',
        name: 'Lonjakan Kekeruhan Air Baku (185 NTU)',
        triggerTimeSec: 75, // 01:15
        type: 'kekeruhan_lonjakan',
        description: 'Kekeruhan air baku naik tajam ke 185 NTU memicu alarm sedang, disusul alarm tinggi pada air olahan.',
        expectedActions: [
          'Akui alarm kekeruhan air baku pada 01:25',
          'Akui alarm air olahan pada 01:50',
          'Naikkan dosis PAC dari 20 ke 48 mg/L pada 02:10 (respons 25 detik)',
          'Koreksi pH dengan kapur 8.5 mg/L pada 02:25',
          'Turunkan debit intake ke 75 L/s pada 02:40',
        ],
      },
    ],
    hints: [
      'Segera tekan tombol ACK pada banner alarm begitu muncul.',
      'Buka panel Koagulasi, naikkan setpoint dosis PAC ke 48 mg/L.',
      'Sistem akan otomatis menghapus alarm (Auto-Clear) setelah kekeruhan air olahan <= 2.7 NTU selama 10 detik berturut-turut.',
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Ketika kekeruhan air baku melonjak dari 20 ke 185 NTU, tindakan pertama operator adalah...',
        options: ['Mematikan lampu kontrol', 'Mengakui alarm dan menaikkan pembubuhan dosis koagulan PAC', 'Menutup klorin', 'Meninggalkan ruangan'],
        correctIndex: 1,
        explanation: 'SOP tanggap darurat: acknowledge alarm, evaluasi kenaikan koagulan sesuai kurva jar-test.',
      },
      {
        id: 'q2',
        question: 'Berapa target waktu respons skenario pada misi IPA-06 untuk meraih lencana Respons Kilat?',
        options: ['120 detik', '60 detik (tindakan benar < 30 detik)', '10 menit', '5 detik'],
        correctIndex: 1,
        explanation: 'Target skenario adalah 60 detik, syarat lencana adalah tindakan benar pertama < 50% target (yaitu < 30 detik).',
      },
      {
        id: 'q3',
        question: 'Pada SimSCADA-Air, bagaimana alarm lonjakan kekeruhan akan clear?',
        options: ['Ditekan tombol Clear saat masih keruh', 'Otomatis clear setelah kekeruhan air olahan <= 2.7 NTU dan bertahan stabil 10 detik', 'Tidak pernah clear', 'Restart server'],
        correctIndex: 1,
        explanation: 'Sistem SCADA modern menerapkan auto-clear dengan deadband (2.7 NTU) dan timer stabilisasi 10 detik.',
      },
      {
        id: 'q4',
        question: 'Apa akibatnya jika tombol Manual Clear ditekan saat kekeruhan air olahan masih 3.4 NTU?',
        options: ['Nilai langsung 100', 'Sistem menolak dengan pesan "Penyebab belum ditangani" dan dinilai sebagai kesalahan', 'Alarm hilang', 'Semua pompa mati'],
        correctIndex: 1,
        explanation: 'Manual clear pada kondisi abnormal ditolak dan dicatat sebagai pelanggaran prosedur.',
      },
      {
        id: 'q5',
        question: 'Mengapa menurunkan debit intake dari 100 L/s ke 75 L/s membantu saat banjir lumpur ekstrem?',
        options: ['Menambah waktu tinggal di sedimentasi agar flok punya waktu cukup untuk mengendap', 'Menghemat tagihan air', 'Agar operator bisa tidur', 'Tidak ada manfaat'],
        correctIndex: 0,
        explanation: 'Menurunkan debit menambah hydraulic retention time bak pengendap.',
      },
    ],
  },
  {
    code: 'IPA-07',
    name: 'Gangguan: Pompa Intake Trip',
    level: 3,
    levelName: 'Tingkat 3: Gangguan Tunggal (Sulit · 2,0x XP)',
    track: ['ipa', 'terpadu'],
    trainingFocus: 'Menghadapi trip pompa intake, mengalihkan ke pompa standby, dan mereset proteksi.',
    durationLimitSec: 300,
    passScore: 70,
    briefing: {
      situation: 'Pompa Intake 1 mengalami trip tiba-tiba akibat beban lebih. Aliran air baku berhenti!',
      objective: 'Akui alarm, alihkan operasional ke Pompa Intake 2 (Standby), periksa kelistrikan, tekan tombol Reset Pompa, lalu clear alarm.',
      mentorQuote: '"Pompa trip memiliki alarm berstatus terkunci (latched). Kamu tidak bisa menghapus alarm sebelum menekan tombol Reset Pompa!" — Pak Slamet',
    },
    debriefing: {
      success: 'Respon tepat! Pompa cadangan segera aktif dan sistem proteksi berhasil direset.',
      failure: 'Anda lupa menekan tombol Reset Pompa atau pasokan air baku terhenti terlalu lama.',
    },
    disturbances: [
      {
        id: 'dist-intake-trip',
        name: 'Pompa Intake 1 Trip',
        triggerTimeSec: 20,
        type: 'pompa_trip',
        description: 'Pompa Intake 1 mengalami trip overload kelistrikan.',
        expectedActions: ['Akui alarm kritis', 'Start Pompa Intake 2', 'Tekan Reset Pompa Intake', 'Clear alarm trip'],
      },
    ],
    hints: ['Pilih unit Intake, nyalakan Pompa 2.', 'Tekan tombol "Reset Pompa" di panel Intake sebelum menekan Clear alarm.'],
    quiz: [
      {
        id: 'q1',
        question: 'Apa arti status alarm terkunci (latched alarm) pada kasus pompa trip?',
        options: ['Alarm selamanya hidup', 'Alarm tidak dapat di-clear sebelum operator melakukan tindakan reset fisik pada tombol reset proteksi', 'Alarm tidak berbunyi', 'Panel rusak'],
        correctIndex: 1,
        explanation: 'Latched alarm membutuhkan intervensi reset fisik untuk mencegah pompa rusak dinyalakan kembali tanpa perbaikan.',
      },
      {
        id: 'q2',
        question: 'Langkah pertama saat pompa intake utama mendadak trip adalah...',
        options: ['Akui alarm dan segera start pompa intake cadangan (standby)', 'Pulang ke rumah', 'Matikan saklar PLN utama', 'Bongkar mesin'],
        correctIndex: 0,
        explanation: 'Menghidupkan unit cadangan menjaga kontinuitas aliran sebelum menginvestigasi unit yang rusak.',
      },
      {
        id: 'q3',
        question: 'Urutan SOP penanganan pompa trip di SimSCADA-Air adalah...',
        options: ['Clear -> Reset -> Ganti Pompa', 'Jalankan Pompa Cadangan -> Periksa Penyebab -> Tekan Reset Pompa -> Clear Alarm', 'Reset saja', 'Biarkan'],
        correctIndex: 1,
        explanation: 'SOP resmi: alihkan beban, perbaiki, tekan Reset, baru Clear.',
      },
      {
        id: 'q4',
        question: 'Berapa pengurangan poin bila operator menekan Clear pada alarm pompa trip yang belum di-reset?',
        options: ['0 poin', '-15 poin (tindakan tidak aman / pelanggaran SOP)', '-100 poin', '+50 poin'],
        correctIndex: 1,
        explanation: 'Pelanggaran SOP dikenakan penalti -15 poin per kejadian.',
      },
      {
        id: 'q5',
        question: 'Apa fungsi tombol Reset Pompa pada panel SCADA?',
        options: ['Memformat komputer', 'Mereset relai proteksi overload motor pompa setelah trip', 'Menguras air', 'Mengubah debit'],
        correctIndex: 1,
        explanation: 'Reset melepaskan latching kontak relay proteksi kelistrikan motor.',
      },
    ],
  },
  {
    code: 'IPA-08',
    name: 'Gangguan: Dosis Klor Tidak Sesuai',
    level: 3,
    levelName: 'Tingkat 3: Gangguan Tunggal (Sulit · 2,0x XP)',
    track: ['ipa', 'terpadu'],
    trainingFocus: 'Mengatasi kegagalan pompa injeksi klorin dan memulihkan sisa klor bebas sebelum air masuk ke jaringan pipa.',
    durationLimitSec: 300,
    passScore: 70,
    briefing: {
      situation: 'Sensor telemetri mendeteksi sisa klor bebas anjlok hingga 0.08 mg/L (jauh di bawah batas 0.20 mg/L). Bahaya bakteri coliform!',
      objective: 'Akui alarm klorin kritis, periksa pompa dosing klor, naikkan setpoint dosing klorin ke 1.6 mg/L, dan pantau kenaikan sisa klorin bebas.',
      mentorQuote: '"Sisa klorin adalah indikator keselamatan air minum. Jangan biarkan air tanpa klorin lolos ke pipa pelanggan!" — Pak Slamet',
    },
    debriefing: {
      success: 'Desinfeksi berhasil dipulihkan! Sisa klorin kembali ke 0.35 mg/L, menjamin sterilitas pasokan air.',
      failure: 'Sisa klorin gagal dipulihkan ke rentang aman 0.2 - 0.5 mg/L.',
    },
    disturbances: [
      {
        id: 'dist-chlorine-drop',
        name: 'Sisa Klorin Anjlok',
        triggerTimeSec: 25,
        type: 'klor_salah',
        description: 'Dosing klorin drop memicu alarm kritis sisa klor bebas rendah.',
        expectedActions: ['Akui alarm klor kritis', 'Naikkan setpoint klorin ke 1.6 mg/L', 'Tunggu sisa klor stabil 0.35 mg/L'],
      },
    ],
    hints: ['Pilih unit Desinfeksi/Reservoir, geser setpoint dosis klor ke 1.6 mg/L.'],
    quiz: [
      {
        id: 'q1',
        question: 'Berapa batas minimum sisa klor bebas menurut Permenkes No. 2/2023?',
        options: ['0,0 mg/L', '0,2 mg/L', '1,0 mg/L', '5,0 mg/L'],
        correctIndex: 1,
        explanation: 'Batas minimal adalah 0,2 mg/L.',
      },
      {
        id: 'q2',
        question: 'Prioritas alarm untuk kondisi sisa klorin < 0.2 mg/L adalah...',
        options: ['Info', 'Sedang', 'Tinggi', 'Kritis'],
        correctIndex: 3,
        explanation: 'Sesuai PRD §10, sisa klor < 0,2 mg/L berkategori KRITIS.',
      },
      {
        id: 'q3',
        question: 'Apa bahaya utama jika sisa klorin bebas di reservoir habis (0.0 mg/L)?',
        options: ['Air jadi manis', 'Bakteri patogen dapat berkembang biak di sepanjang pipa distribusi', 'Pipa jadi beku', 'Tekanan air drop'],
        correctIndex: 1,
        explanation: 'Ketiadaan klorin memicu perkembangbiakan mikroorganisme patogen.',
      },
      {
        id: 'q4',
        question: 'Berapa batas maksimal sisa klorin yang diizinkan agar tidak menimbulkan bau menyengat?',
        options: ['0,5 mg/L', '5,0 mg/L', '10 mg/L', '50 mg/L'],
        correctIndex: 0,
        explanation: 'Batas atas yang aman adalah 0,5 mg/L.',
      },
      {
        id: 'q5',
        question: 'Setelah menaikkan dosis klorin, reaksi pemulihan sisa klor bebas memerlukan...',
        options: ['Waktu kontak hidrolika reaksi', 'Mematikan lampu ruang kontrol', 'Membuka kran bak sedimentasi', 'Menutup intake'],
        correctIndex: 0,
        explanation: 'Reaksi kimia desinfeksi memerlukan waktu kontak hidrolis.',
      },
    ],
  },
  {
    code: 'IPA-09',
    name: 'Misi Kelulusan Operator IPA',
    level: 5,
    levelName: 'Tingkat 5: Misi Kelulusan Ujian (Ujian · 3,0x XP)',
    track: ['ipa', 'terpadu'],
    trainingFocus: 'Ujian komprehensif mengendalikan seluruh unit IPA dalam kondisi gangguan tak terduga tanpa tombol petunjuk.',
    durationLimitSec: 600,
    passScore: 80, // KKM Misi Kelulusan adalah 80!
    briefing: {
      situation: 'Ini adalah Ujian Kelulusan Praktik Jalur Operator IPA. Seluruh sistem akan diuji dengan skenario darurat majemuk.',
      objective: 'Atasi semua alarm, pertahankan mutu air < 3 NTU, jaga sisa klor 0.2 - 0.5 mg/L. Skor minimal kelulusan adalah 80!',
      mentorQuote: '"Kamu sendirian di ruang kontrol sekarang. Buktikan kompetensimu dan raih Piagam Kelulusan!" — Pak Slamet',
    },
    debriefing: {
      success: 'SELAMAT! Anda telah lulus Ujian Praktik Operator IPA dengan nilai di atas KKM 80. Berhak atas pengajuan Piagam Kelulusan!',
      failure: 'Skor Anda belum mencapai ambang kelulusan KKM 80. Evaluasi kesalahan Anda dan ulangi ujian.',
    },
    disturbances: [
      {
        id: 'dist-exam-ipa',
        name: 'Ujian Komprehensif IPA',
        triggerTimeSec: 30,
        type: 'kekeruhan_lonjakan',
        description: 'Lonjakan kekeruhan air baku disusul fluktuasi klorinasi.',
        expectedActions: ['Atasi alarm sesuai SOP', 'Jaga mutu air stabil'],
      },
    ],
    hints: [],
    quiz: [
      {
        id: 'q1',
        question: 'Ambang skor minimal (KKM) kelulusan untuk Misi Kelulusan Ujian adalah...',
        options: ['50 poin', '60 poin', '70 poin', '80 poin'],
        correctIndex: 3,
        explanation: 'Sesuai PRD §8, Misi Kelulusan mewajibkan skor minimal 80.',
      },
      {
        id: 'q2',
        question: 'Pengali XP untuk Misi Kelulusan Tingkat 5 adalah...',
        options: ['1,0x', '1,5x', '2,0x', '3,0x (Ujian)'],
        correctIndex: 3,
        explanation: 'Tingkat 5 memberikan pengali XP tertinggi sebesar 3,0x.',
      },
      {
        id: 'q3',
        question: 'Apakah tombol Bantuan Petunjuk (-5 poin) diperbolehkan pada Misi Kelulusan?',
        options: ['Boleh bebas', 'Dilarang / Nonaktif pada misi ujian demi menjaga integritas sertifikasi', 'Boleh asal bayar', 'Wajib dipakai'],
        correctIndex: 1,
        explanation: 'Pada misi ujian kelulusan, tombol petunjuk dinonaktifkan.',
      },
      {
        id: 'q4',
        question: 'Parameter mutu utama air minum yang wajib memenuhi standar Permenkes 2/2023 adalah...',
        options: ['Kekeruhan < 3 NTU, pH 6.5 - 8.5, Sisa klor 0.2 - 0.5 mg/L', 'Warna hitam pekat', 'Rasa asin', 'Suhu mendidih'],
        correctIndex: 0,
        explanation: 'Tiga parameter kunci fisika-kimia mutu air minum instalasi.',
      },
      {
        id: 'q5',
        question: 'Setelah lulus Misi Kelulusan dan Post-Test, piagam akan terbit setelah...',
        options: ['Membayar biaya tambahan', 'Mendapat verifikasi dan persetujuan instruktur (bila kebijakan L13 aktif)', 'Menunggu 1 tahun', 'Otomatis gagal'],
        correctIndex: 1,
        explanation: 'Kebijakan dua tahap memerlukan persetujuan instruktur di L9 sebelum piagam terbit.',
      },
    ],
  },

  // --- JALUR DISTRIBUSI (7 MISI) ---
  {
    code: 'DST-01',
    name: 'Kenali Jaringan Distribusi',
    level: 1,
    levelName: 'Tingkat 1: Pengenalan (Mudah · 1,0x XP)',
    track: ['distribusi', 'terpadu'],
    trainingFocus: 'Membuka narasi telemetri pipa, pompa distribusi, PRV, dan titik pantau zona.',
    passScore: 70,
    briefing: {
      situation: 'Shift orientasi Jaringan Distribusi. Pelajari pembagian zona pipa dan stasiun pompa pendorong kota.',
      objective: 'Buka narasi titik kontrol Pompa Distribusi, Valve PRV, dan Titik Pantau Jaringan.',
      mentorQuote: '"Jaringan pipa adalah labirin di bawah tanah kota. Pahami tekanan dan debit sebelum mengoperasikan pompa distribusi." — Pak Slamet',
    },
    debriefing: {
      success: 'Bagus! Anda memahami skema pembagian zona distribusi dan batasan tekanan pipa.',
      failure: 'Buka narasi semua titik kontrol distribusi untuk menyelesaikan misi ini.',
    },
    disturbances: [],
    hints: ['Klik titik kontrol Pompa Distribusi, PRV, dan Titik Pantau Jaringan.'],
    quiz: [
      {
        id: 'q1',
        question: 'Tujuan utama pembagian area pelayanan menjadi District Metered Area (DMA) adalah...',
        options: ['Mempersulit pemantauan', 'Memudahkan pemantauan kebocoran air (NRW) dan manajemen tekanan zona', 'Menghabiskan anggaran', 'Menutup pipa kota'],
        correctIndex: 1,
        explanation: 'DMA membagi jaringan menjadi zona terukur untuk pengendalian kehilangan air.',
      },
      {
        id: 'q2',
        question: 'Fungsi utama Pressure Reducing Valve (PRV) di jaringan distribusi adalah...',
        options: ['Menaikkan tekanan setinggi mungkin', 'Mereduksi dan menstabilkan tekanan hilir agar pipa tidak pecah', 'Menyaring lumut', 'Menghitung tarif air'],
        correctIndex: 1,
        explanation: 'PRV menjaga tekanan hilir tetap stabil di batas aman.',
      },
      {
        id: 'q3',
        question: 'Rentang tekanan layanan yang ideal pada pipa pelanggan adalah...',
        options: ['0,1 - 0,5 bar', '2,0 - 3,0 bar', '10 - 20 bar', '50 bar'],
        correctIndex: 1,
        explanation: 'Tekanan 2 - 3 bar memadai untuk mengalirkan air hingga lantai 2-3 rumah.',
      },
      {
        id: 'q4',
        question: 'Tekanan di bawah 1.0 bar pada jaringan pipa dapat menyebabkan...',
        options: ['Air menyembur tinggi', 'Aliran mati ke pelanggan dan risiko intrusi kontaminasi air tanah ke pipa', 'Pipa bertambah kuat', 'Klorin berlebih'],
        correctIndex: 1,
        explanation: 'Tekanan negatif/rendah mengundang hisapan air kotor luar pipa.',
      },
      {
        id: 'q5',
        question: 'Kehilangan air yang disebabkan pipa bocor fisik tergolong dalam...',
        options: ['Kehilangan air non-fisik (komersial)', 'Kehilangan air fisik (kehilangan teknis / kebocoran pipa)', 'Pemakaian legal', 'Bukan urusan PDAM'],
        correctIndex: 1,
        explanation: 'Pipa pecah termasuk Real Loss (kehilangan fisik).',
      },
    ],
  },
  {
    code: 'DST-02',
    name: 'Pompa Distribusi & Level Reservoir',
    level: 2,
    levelName: 'Tingkat 2: Operasi Normal (Mudah · 1,0x XP)',
    track: ['distribusi', 'terpadu'],
    trainingFocus: 'Menghidupkan pompa distribusi dan menjaga keseimbangan level reservoir.',
    passScore: 70,
    briefing: {
      situation: 'Pagi hari menjelang jam sibuk warga. Nyalakan pompa distribusi P-101 dan pantau tekanan pipa keluar.',
      objective: 'Hidupkan Pompa Distribusi 1, jaga tekanan buang 3.8 - 4.2 bar, pastikan level reservoir > 50%.',
      mentorQuote: '"Pastikan katup buang terbuka sebelum menyalakan pompa distribusi agar tidak terjadi shut-off head." — Pak Slamet',
    },
    debriefing: {
      success: 'Stasiun pompa distribusi beroperasi optimal menyuplai kebutuhan air warga.',
      failure: 'Tekanan buang pompa belum tercapai atau level reservoir drop.',
    },
    disturbances: [],
    hints: ['Pilih stasiun Pompa Distribusi, klik "Start Pompa 1".'],
    quiz: [
      {
        id: 'q1',
        question: 'Level reservoir di bawah 20% berbahaya bagi pompa distribusi karena...',
        options: ['Pompa jadi kedinginan', 'Dapat menyebabkan kavitasi dan pompa hisap udara (*dry running*)', 'Air jadi manis', 'Pipa meledak'],
        correctIndex: 1,
        explanation: 'Kavitasi merusak impeler pompa akibat tekanan hisap terlalu rendah.',
      },
      {
        id: 'q2',
        question: 'Tekanan normal discharge pompa distribusi pada instalasi ini adalah...',
        options: ['1 bar', '3.8 - 4.2 bar', '15 bar', '0 bar'],
        correctIndex: 1,
        explanation: 'Tekanan buang normal berkisar 3.8 - 4.2 bar.',
      },
      {
        id: 'q3',
        question: 'Ketika kebutuhan pelanggan menurun saat tengah malam, tindakan operator stasiun pompa adalah...',
        options: ['Menambah 5 pompa baru', 'Mengurangi jumlah pompa jalan atau menurunkan kecepatan inverter (VFD)', 'Membuang air ke sungai', 'Mematikan lampu kantor'],
        correctIndex: 1,
        explanation: 'Menyesuaikan kapasitas pompa dengan kurva fluktuasi harian pelanggan.',
      },
      {
        id: 'q4',
        question: 'Gejala *water hammer* pada sistem perpipaan biasanya dipicu oleh...',
        options: ['Penutupan katup secara mendadak atau matinya pompa tanpa check valve yang baik', 'Air terlalu jernih', 'Dosis klorin pas', 'Pipa ditimbun pasir'],
        correctIndex: 0,
        explanation: 'Perubahan momentum aliran mendadak menciptakan gelombang kejut destruktif.',
      },
      {
        id: 'q5',
        question: 'Alat pengaman yang dipasang untuk meredam gelombang pukulan air (water hammer) adalah...',
        options: ['Surge tank / air chamber / bladder tank', 'Bar screen', 'Lamella plate', 'Dosing pump'],
        correctIndex: 0,
        explanation: 'Air chamber / surge tank meredam lonjakan tekanan transien.',
      },
    ],
  },
  {
    code: 'DST-03',
    name: 'Atur Tekanan Jam Puncak',
    level: 2,
    levelName: 'Tingkat 2: Operasi Normal (Sedang · 1,5x XP)',
    track: ['distribusi', 'terpadu'],
    trainingFocus: 'Mengatur 2 pompa distribusi jalan saat jam puncak pagi hari agar tekanan zona stabil.',
    passScore: 70,
    briefing: {
      situation: 'Pukul 06:30 pagi: pemakaian air melonjak tajam (jam puncak aktivitas mandi dan memasak).',
      objective: 'Jalankan 2 pompa distribusi paralel dan setel PRV agar tekanan Zona 1 tetap 2.2 - 2.5 bar.',
      mentorQuote: '"Saat jam puncak, debit aliran berlipat ganda. Tambah pompa yang jalan dan awasi jangan sampai tekanan drop!" — Pak Slamet',
    },
    debriefing: {
      success: 'Pasokan air jam puncak sukses terpenuhi dengan tekanan merata di seluruh sambungan pelanggan.',
      failure: 'Tekanan zona pelanggan drop di bawah batas layanan minimum.',
    },
    disturbances: [],
    hints: ['Pilih stasiun Pompa Distribusi, aktifkan Pompa 1 dan Pompa 2 secara paralel.'],
    quiz: [
      {
        id: 'q1',
        question: 'Kapan jam puncak pemakaian air bersih umumnya terjadi di kawasan perkotaan?',
        options: ['Tengah malam pukul 02:00', 'Pagi hari (06:00 - 08:00) dan sore hari (17:00 - 19:00)', 'Hanya saat hari libur nasional', 'Tidak ada pola'],
        correctIndex: 1,
        explanation: 'Pola kurva diurnal menunjukkan dua puncak: pagi dan petang.',
      },
      {
        id: 'q2',
        question: 'Bila dua pompa yang sama dioperasikan secara paralel, yang meningkat signifikan adalah...',
        options: ['Debit aliran (kapasitas m3/h)', 'Tekanan menjadi 10 kali lipat', 'Kekeruhan air', 'Suhu air'],
        correctIndex: 0,
        explanation: 'Operasi paralel melipatgandakan debit aliran pada head tekanan yang sama.',
      },
      {
        id: 'q3',
        question: 'Dampak tekanan berlebih pada jaringan saat jam non-puncak (malam hari) adalah...',
        options: ['Pipa awet', 'Meningkatnya risiko pipa pecah dan laju kebocoran fisik meningkat drastis', 'Pelanggan gembira', 'Air membeku'],
        correctIndex: 1,
        explanation: 'Tekanan malam hari tinggi memperparah laju kehilangan air (leakage rate).',
      },
      {
        id: 'q4',
        question: 'Untuk mengendalikan tekanan berlebih pada malam hari, operator dapat...',
        options: ['Membakar pipa', 'Menurunkan setpoint PRV atau mematikan pompa tambahan', 'Menambah klorin', 'Membongkar meteran'],
        correctIndex: 1,
        explanation: 'Manajemen tekanan malam hari (Night Flow Management) menekan kebocoran.',
      },
      {
        id: 'q5',
        question: 'Faktor jam puncak (Peak Hour Factor) biasanya berkisar antara...',
        options: ['1.0 - 1.1', '1.5 - 2.5 kali debit rata-rata harian', '10 - 20 kali', '100 kali'],
        correctIndex: 1,
        explanation: 'Fluktuasi jam puncak berkisar 1.5 hingga 2.5 kali kebutuhan rata-rata.',
      },
    ],
  },
  {
    code: 'DST-04',
    name: 'Sisa Klor di Ujung Jaringan',
    level: 2,
    levelName: 'Tingkat 2: Operasi Normal (Sedang · 1,5x XP)',
    track: ['distribusi', 'terpadu'],
    trainingFocus: 'Memastikan residu klorin di sambungan terjauh (dead-end) tidak habis.',
    passScore: 70,
    briefing: {
      situation: 'Laporan telemetri: Sisa klorin di ujung Zona 2 mendekati 0.12 mg/L. Risiko rekontaminasi!',
      objective: 'Naikkan sedikit injeksi klorin di reservoir hingga residu di ujung jaringan terukur minimal 0.20 mg/L.',
      mentorQuote: '"Jarak tempuh pipa yang panjang menghabiskan klorin. Pastikan sampai di kran rumah terakhir klorin tetap tersisa!" — Pak Slamet',
    },
    debriefing: {
      success: 'Residu klorin di seluruh pelosok jaringan aman terlindungi sesuai standar Permenkes.',
      failure: 'Sisa klorin di ujung jaringan masih berada di bawah 0.20 mg/L.',
    },
    disturbances: [],
    hints: ['Pilih unit Desinfeksi/Reservoir, sesuaikan dosing klor ke 1.6 mg/L.'],
    quiz: [
      {
        id: 'q1',
        question: 'Penyebab utama hilangnya residu klorin sepanjang perjalanan pipa distribusi adalah...',
        options: ['Reaksi klorin dengan biofilm dinding pipa, senyawa organik, dan waktu tinggal air yang lama', 'Menguap karena panas matahari di dalam tanah', 'Diminum pipa', 'Tersaring katup'],
        correctIndex: 0,
        explanation: 'Biofilm dan waktu detensi mengonsumsi residu klorin (Chlorine Decay).',
      },
      {
        id: 'q2',
        question: 'Berapa batas minimum sisa klorin di titik keran terjauh pelanggan?',
        options: ['0,0 mg/L', '0,2 mg/L', '5,0 mg/L', '15 mg/L'],
        correctIndex: 1,
        explanation: 'Permenkes mewajibkan minimal 0,2 mg/L di titik pelanggan.',
      },
      {
        id: 'q3',
        question: 'Tindakan yang dapat dilakukan di titik pipa buntu (dead-end) dengan air stagnant adalah...',
        options: ['Flushing rutin melalui hidran pembuangan', 'Membiarkannya selamanya', 'Menutup pipa dengan kayu', 'Menambah pasir'],
        correctIndex: 0,
        explanation: 'Flushing berkala menguras air stagnant di pipa buntu.',
      },
      {
        id: 'q4',
        question: 'Stasiun injeksi klorin sekunder (re-chlorination) biasanya dibangun jika...',
        options: ['Kota terlalu kecil', 'Jaringan distribusi sangat luas sehingga injeksi tunggal di reservoir tidak mencukupi hingga ujung pipa', 'Biaya kaporit gratis', 'Sebagai hiasan'],
        correctIndex: 1,
        explanation: 'Booster chlorination menjaga residu di sistem distribusi raksasa.',
      },
      {
        id: 'q5',
        question: 'Bila sisa klorin 0.0 mg/L terdeteksi di suatu zona, bahaya kesehatan yang mengancam adalah...',
        options: ['Air berubah jadi jus', 'Perkembangbiakan bakteri patogen seperti E. coli penyebab diare massal', 'Gigi menjadi lebih putih', 'Tidak ada bahaya'],
        correctIndex: 1,
        explanation: 'Air tanpa klorin pelindung rentan wabah penyakit bawaan air (waterborne disease).',
      },
    ],
  },
  {
    code: 'DST-05',
    name: 'Gangguan: Kebocoran Pipa Distribusi',
    level: 3,
    levelName: 'Tingkat 3: Gangguan Tunggal (Sulit · 2,0x XP)',
    track: ['distribusi', 'terpadu'],
    trainingFocus: 'Mendeteksi pipa transmisi pecah dari anomali debit-tekanan dan mengisolasi katup ruas bocor.',
    durationLimitSec: 180,
    passScore: 70,
    briefing: {
      situation: 'Alarm Tinggi: Pipa transmisi diameter 300 mm di Zona 1 pecah akibat pekerjaan galian! Debit melonjak drastis, tekanan drop.',
      objective: 'Akui alarm, cari titik kebocoran, dan segera tutup Katup Isolasi Pipa Bocor dalam waktu target 60 detik.',
      mentorQuote: '"Lihat polanya: debit melonjak tapi tekanan jatuh itu pasti pipa pecah! Segera tutup katup isolasi ruas terkait!" — Pak Slamet',
    },
    debriefing: {
      success: 'Pipa bocor berhasil diisolasi dalam tempo kilat! Kehilangan air terminimalisir dan tekanan zona pulih.',
      failure: 'Tekanan jaringan drop terlalu lama atau katup isolasi tidak ditutup dengan benar.',
    },
    disturbances: [
      {
        id: 'dist-pipe-burst',
        name: 'Pipa Pecah Zona 1',
        triggerTimeSec: 15,
        type: 'pipa_bocor',
        description: 'Kebocoran besar pipa memicu lonjakan debit dan drop tekanan.',
        expectedActions: ['Akui alarm pipa pecah', 'Tutup Valve Isolasi Bocor dalam 60s', 'Tunggu tekanan pulih stabil 10s'],
      },
    ],
    hints: ['Pilih unit Valve PRV & Isolasi di SCADA panel.', 'Klik tombol "Tutup Valve Isolasi Bocor".'],
    quiz: [
      {
        id: 'q1',
        question: 'Pola data telemetri yang menandakan terjadinya pipa transmisi pecah secara mendadak adalah...',
        options: ['Tekanan naik dan debit turun', 'Debit aliran melonjak drastis disertai tekanan drop secara serentak', 'Semua sensor mati', 'Suhu air naik drastis'],
        correctIndex: 1,
        explanation: 'Pipa pecah menciptakan lubang besar: aliran keluar bebas (flow naik) tapi resistansi hilang (pressure jatuh).',
      },
      {
        id: 'q2',
        question: 'Tindakan tanggap darurat pertama operator saat pipa pecah terkonfirmasi adalah...',
        options: ['Membeli pipa baru', 'Menutup katup isolasi pada ruas pipa yang bocor untuk membatasi wilayah pemadaman', 'Menyalakan semua pompa', 'Menunggu besok pagi'],
        correctIndex: 1,
        explanation: 'Isolasi sectional mematikan segmen bocor tanpa mengganggu zona lain.',
      },
      {
        id: 'q3',
        question: 'Berapa target waktu skenario penutupan katup isolasi pipa pecah untuk meraih lencana?',
        options: ['60 detik', '2 hari', '30 menit', '1 jam'],
        correctIndex: 0,
        explanation: 'Target waktu skenario darurat adalah 60 detik.',
      },
      {
        id: 'q4',
        question: 'Dampak buruk jika kebocoran besar dibiarkan berlangsung berjam-jam adalah...',
        options: ['Reservoir kering, jalan raya amblas, dan komplain pelanggan meluas', 'Air di reservoir makin penuh', 'Tekanan pipa naik', 'Bahan bakar hemat'],
        correctIndex: 0,
        explanation: 'Kehilangan air masif mengosongkan tangki dan merusak infrastruktur sekitar.',
      },
      {
        id: 'q5',
        question: 'Setelah katup isolasi ditutup dan tekanan kembali normal, alarm akan...',
        options: ['Ditekan paksa', 'Auto-clear otomatis setelah tekanan stabil normal selama 10 detik', 'Meledak', 'Mati selamanya'],
        correctIndex: 1,
        explanation: 'Sistem SCADA auto-clear saat parameter hidrolika pulih stabil.',
      },
    ],
  },
  {
    code: 'DST-06',
    name: 'Gangguan: Tekanan Jaringan Drop',
    level: 3,
    levelName: 'Tingkat 3: Gangguan Tunggal (Sulit · 2,0x XP)',
    track: ['distribusi', 'terpadu'],
    trainingFocus: 'Mengatasi penurunan tekanan zona akibat katup PRV macet menutup.',
    durationLimitSec: 240,
    passScore: 70,
    briefing: {
      situation: 'Alarm Tekanan Rendah: Katup PRV macet separuh menutup. Tekanan Zona 1 drop di bawah 1.5 bar!',
      objective: 'Akui alarm, buka panel PRV, naikkan setpoint PRV kembali ke 2.5 bar, dan verifikasi tekanan layanan pulih.',
      mentorQuote: '"Periksa setpoint katup pengurang tekanan. Pulihkan bukaan pegas PRV agar tekanan pelanggan kembali normal!" — Pak Slamet',
    },
    debriefing: {
      success: 'Tekanan layanan pulih sempurna. Pelanggan kembali menerima aliran air bertekanan stabil.',
      failure: 'Tekanan zona pelanggan masih di bawah batas layanan minimum.',
    },
    disturbances: [
      {
        id: 'dist-prv-fail',
        name: 'Tekanan Drop PRV',
        triggerTimeSec: 20,
        type: 'tekanan_drop',
        description: 'PRV malfunction menurunkan tekanan zona di bawah standar.',
        expectedActions: ['Akui alarm tekanan rendah', 'Setel PRV ke 2.5 bar', 'Tunggu tekanan pulih'],
      },
    ],
    hints: ['Buka panel Valve PRV, geser setpoint PRV ke 2.5 bar.'],
    quiz: [
      {
        id: 'q1',
        question: 'Penyebab mekanis utama katup PRV macet menutup adalah...',
        options: ['Kotoran atau kerak pasir menyumbat pilot valve saringan PRV', 'Kabel internet putus', 'Air terlalu jernih', 'Cat terkelupas'],
        correctIndex: 0,
        explanation: 'Pilot filter PRV yang tersumbat endapan membuat diafragma menutup.',
      },
      {
        id: 'q2',
        question: 'Batas minimal tekanan layanan standar PDAM di sambungan rumah adalah...',
        options: ['0,1 bar', '0,7 - 1,0 bar (minimal air mengalir di keran lantai satu)', '10 bar', '50 bar'],
        correctIndex: 1,
        explanation: 'Standar pelayanan minimal menetapkan tekanan keran 0.7 - 1.0 bar.',
      },
      {
        id: 'q3',
        question: 'Jika tekanan drop berlarut-larut pada jam aktivitas warga, sanksi yang diterima PDAM adalah...',
        options: ['Piala penghargaan', 'Keluhan massal pelanggan dan potensi penalti kompensasi mutu pelayanan', 'Kenaikan tarif otomatis', 'Tidak ada sanksi'],
        correctIndex: 1,
        explanation: 'Penurunan tekanan memicu komplain dan melanggar standar SPM.',
      },
      {
        id: 'q4',
        question: 'Pada panel kendali SCADA, besaran bukaan PRV dikendalikan dalam satuan...',
        options: ['Persen (%)', 'Bar (tekanan hidrolika pegas)', 'Liter', 'Voltase'],
        correctIndex: 1,
        explanation: 'Sesuai PRD §9, setpoint PRV diatur dalam besaran bar.',
      },
      {
        id: 'q5',
        question: 'Untuk membersihkan kotoran yang menyumbat pilot valve PRV, teknisi melakukan...',
        options: ['Flushing strainer saringan pilot PRV secara berkala', 'Mengetuk dengan palu godam', 'Menyiram air panas', 'Membakar pipa'],
        correctIndex: 0,
        explanation: 'Maintenance berkala mencakup pembersihan strainer pilot line.',
      },
    ],
  },
  {
    code: 'DST-07',
    name: 'Misi Kelulusan Operator Distribusi',
    level: 5,
    levelName: 'Tingkat 5: Misi Kelulusan Ujian (Ujian · 3,0x XP)',
    track: ['distribusi', 'terpadu'],
    trainingFocus: 'Ujian komprehensif penanganan hidrolika perpipaan, stasiun pompa, kebocoran pipa, dan manajemen tekanan.',
    durationLimitSec: 600,
    passScore: 80,
    briefing: {
      situation: 'Ujian Kelulusan Praktik Jalur Distribusi: Pipa bocor bertepatan dengan lonjakan jam puncak!',
      objective: 'Kendalikan stasiun pompa paralel, isolasi kebocoran ruas pipa, dan pertahankan tekanan pelanggan di atas 2.0 bar tanpa petunjuk.',
      mentorQuote: '"Ketenangan dan kecepatan pengambilan keputusan adalah tanda operator distribusi sejati. Sukses untuk ujianmu!" — Pak Slamet',
    },
    debriefing: {
      success: 'SELAMAT! Anda lulus Ujian Praktik Operator Distribusi dengan skor di atas KKM 80!',
      failure: 'Skor Anda belum mencapai ambang kelulusan KKM 80.',
    },
    disturbances: [
      {
        id: 'dist-exam-dst',
        name: 'Ujian Praktik Distribusi',
        triggerTimeSec: 25,
        type: 'pipa_bocor',
        description: 'Kebocoran pipa pada jam sibuk.',
        expectedActions: ['Isolasi pipa', 'Atur pompa'],
      },
    ],
    hints: [],
    quiz: [
      {
        id: 'q1',
        question: 'KKM nilai kelulusan untuk Misi Kelulusan Distribusi (DST-07) adalah...',
        options: ['60', '70', '80 poin', '95'],
        correctIndex: 2,
        explanation: 'Seluruh Misi Kelulusan mewajibkan skor minimal 80.',
      },
      {
        id: 'q2',
        question: 'Penalti skor untuk setiap pemakaian tombol petunjuk pada misi latihan adalah...',
        options: ['-1 poin', '-5 poin', '-20 poin', '-50 poin'],
        correctIndex: 1,
        explanation: 'Sesuai PRD §8, penggunaan petunjuk mengurangi 5 poin per petunjuk.',
      },
      {
        id: 'q3',
        question: 'Penalti skor untuk tindakan tidak aman (misal dry running pompa atau clear ilegal) adalah...',
        options: ['-5 poin', '-15 poin per kejadian', '-50 poin', '0 poin'],
        correctIndex: 1,
        explanation: 'Tindakan tidak aman dikenakan penalti berat -15 poin.',
      },
      {
        id: 'q4',
        question: 'Keberhasilan misi kelulusan diukur dari 4 komponen penilaian otomatis yaitu...',
        options: [
          'Ketepatan Tindakan (40%), Waktu Respons (25%), Stabilitas Parameter (20%), Penanganan Alarm (15%)',
          'Kecepatan mengetik saja',
          'Banyaknya alarm yang dibiarkan',
          'Lamanya waktu simulasi',
        ],
        correctIndex: 0,
        explanation: 'Formula 4 komponen resmi PRD §8.',
      },
      {
        id: 'q5',
        question: 'Predikat "Lulus dengan Pujian" diberikan jika rata-rata skor terbaik mencapai...',
        options: ['>= 70', '>= 80', '>= 85', '>= 95 (Bintang 3)'],
        correctIndex: 3,
        explanation: 'Predikat Lulus dengan Pujian mensyaratkan skor rata-rata ≥ 95.',
      },
    ],
  },

  // --- JALUR KHUSUS TERPADU (2 MISI) ---
  {
    code: 'TRP-01',
    name: 'Hulu ke Hilir: Gangguan Berantai',
    level: 4,
    levelName: 'Tingkat 4: Gangguan Berantai (Sangat Sulit · 2,5x XP)',
    track: ['terpadu'],
    trainingFocus: 'Menangani gangguan berantai simultan: banjir lumpur di intake, penurunan level reservoir, dan pipa pecah di kota.',
    durationLimitSec: 480,
    passScore: 70,
    briefing: {
      situation: 'Kondisi krisis total: Badai tropis memicu lonjakan lumpur ekstrem di intake IPA, bersamaan dengan pipa distribusi kota pecah tergerus banjir!',
      objective: 'Kendalikan dosis koagulan di IPA dan segera isolasi katup pipa bocor di jaringan distribusi sebelum reservoir habis.',
      mentorQuote: '"Inilah ujian terpadu sesungguhnya. Jangan panik, tangani sumber air baku dulu lalu secepatnya isolasi kebocoran pipa kota!" — Pak Slamet',
    },
    debriefing: {
      success: 'LUAR BIASA! Anda berhasil menuntaskan skenario gangguan berantai hulu ke hilir dan meraih lencana "Hulu ke Hilir"!',
      failure: 'Sistem kolaps karena salah satu unit pengolahan atau distribusi gagal dikendalikan tepat waktu.',
    },
    disturbances: [
      {
        id: 'dist-cascading',
        name: 'Gangguan Berantai Hulu ke Hilir',
        triggerTimeSec: 20,
        type: 'hulu_hilir',
        description: 'Lonjakan kekeruhan air baku simultan dengan pipa bocor di distribusi.',
        expectedActions: ['Tangani koagulasi', 'Isolasi kebocoran pipa', 'Jaga pasokan reservoir'],
      },
    ],
    hints: ['Tangani lonjakan kekeruhan di unit Koagulasi terlebih dahulu.', 'Beralih ke unit PRV & Isolasi untuk menutup katup pipa bocor.'],
    quiz: [
      {
        id: 'q1',
        question: 'Pada Jalur Terpadu, berapa total jumlah misi yang wajib diselesaikan untuk kelulusan?',
        options: ['9 misi', '7 misi', '17 misi (IPA-01..08 + DST-01..06 + TRP-01 + TRP-02)', '50 misi'],
        correctIndex: 2,
        explanation: 'Jalur Terpadu mencakup 17 misi lengkap.',
      },
      {
        id: 'q2',
        question: 'Pengali XP untuk skenario Tingkat 4 Gangguan Berantai adalah...',
        options: ['1,0x', '1,5x', '2,0x', '2,5x (Sangat Sulit)'],
        correctIndex: 3,
        explanation: 'Tingkat 4 memiliki pengali XP 2,5x.',
      },
      {
        id: 'q3',
        question: 'Apakah ada syarat prasyarat untuk memilih Jalur Terpadu?',
        options: ['Wajib lulus jalur IPA dulu', 'Tidak ada prasyarat; peserta bebas memilih langsung Jalur Terpadu (PRD §7)', 'Wajib punya ijazah S2', 'Harus bayar ekstra'],
        correctIndex: 1,
        explanation: 'Sesuai PRD §7, tidak ada prasyarat untuk memilih Jalur Terpadu.',
      },
      {
        id: 'q4',
        question: 'Bila peserta yang telah lulus IPA-01 s/d IPA-07 pindah ke Jalur Terpadu, status misinya adalah...',
        options: ['Direset dari awal', 'Dihitung otomatis sebagai misi yang sudah lulus (PRD §7)', 'Dihapus', 'Kena penalti'],
        correctIndex: 1,
        explanation: 'Misi yang sudah lulus di jalur lain dihitung otomatis.',
      },
      {
        id: 'q5',
        question: 'Lencana khusus yang didapat setelah menyelesaikan TRP-01 adalah...',
        options: ['Penjaga Mutu', 'Hulu ke Hilir', 'Tiga Bintang', 'Respons Kilat'],
        correctIndex: 1,
        explanation: 'Lencana "Hulu ke Hilir" khusus untuk penyelesaian TRP-01.',
      },
    ],
  },
  {
    code: 'TRP-02',
    name: 'Misi Kelulusan Terpadu Hulu-Hilir',
    level: 5,
    levelName: 'Tingkat 5: Misi Kelulusan Ujian (Ujian · 3,0x XP)',
    track: ['terpadu'],
    trainingFocus: 'Ujian akhir komprehensif mencakup seluruh siklus penyediaan air minum dari air baku hingga kran pelanggan.',
    durationLimitSec: 600,
    passScore: 80,
    briefing: {
      situation: 'Puncak evaluasi: Ujian Praktik Kompetensi Mandiri Operator SPAM Terpadu (IPA & Distribusi).',
      objective: 'Pertahankan kontinuitas, kualitas, kuantitas, dan keterjangkauan air di seluruh sistem SCADA. KKM skor minimal 80!',
      mentorQuote: '"Selamat berjuang. Anda membuktikan bahwa operator air minum Indonesia adalah penjaga kesehatan bangsa!" — Pak Slamet',
    },
    debriefing: {
      success: 'SEMPURNA! Anda lulus Ujian Terpadu Hulu-Hilir. Andi Kurniawan meraih skor 94 dengan predikat Lulus dengan Pujian!',
      failure: 'Skor Anda di bawah 80. Pelajari kembali materi dan ulangi simulasi.',
    },
    disturbances: [
      {
        id: 'dist-exam-trp',
        name: 'Evaluasi Final Terpadu',
        triggerTimeSec: 30,
        type: 'hulu_hilir',
        description: 'Ujian simulasi komprehensif hulu-hilir.',
        expectedActions: ['Kelola proses IPA', 'Kelola hidrolika distribusi'],
      },
    ],
    hints: [],
    quiz: [
      {
        id: 'q1',
        question: 'Berapa skor kelulusan minimal (KKM) untuk TRP-02?',
        options: ['60', '70', '80 poin', '100'],
        correctIndex: 2,
        explanation: 'KKM ujian kelulusan adalah 80 poin.',
      },
      {
        id: 'q2',
        question: 'Predikat tertinggi pada Piagam Kelulusan adalah...',
        options: ['Lulus Cukup', 'Lulus dengan Baik', 'Lulus dengan Pujian (rata-rata skor >= 95)', 'Juara Umum'],
        correctIndex: 2,
        explanation: 'Predikat tertinggi adalah Lulus dengan Pujian.',
      },
      {
        id: 'q3',
        question: 'Level operator tertinggi yang dapat dicapai (>= 3.500 XP) adalah...',
        options: ['Operator Magang', 'Operator Muda', 'Operator Madya', 'Operator Ahli'],
        correctIndex: 3,
        explanation: 'Level tertinggi adalah Operator Ahli.',
      },
      {
        id: 'q4',
        question: 'Nomor piagam resmi yang diterbitkan untuk Andi Kurniawan adalah...',
        options: ['SSA/NUS/2026/0001', 'CERT-999', 'NO-001', 'PIAGAM-XYZ'],
        correctIndex: 0,
        explanation: 'Format resmi: SSA/<kode_lembaga>/<tahun>/<nomor_urut>.',
      },
      {
        id: 'q5',
        question: 'Catatan hukum wajib yang harus tertulis pada setiap piagam simulator adalah...',
        options: ['Berlaku seumur hidup', 'Piagam ini menyatakan penyelesaian pelatihan berbasis simulator dan bukan sertifikat kompetensi resmi', 'Dapat digadaikan', 'Bebas pajak'],
        correctIndex: 1,
        explanation: 'Klausul wajib PRD §13 untuk mencegah kebingungan dengan sertifikasi BNSP.',
      },
    ],
  },
];

// ====================================================================
// G. DATA HISTORIS PRE-SEED SESUAI PRD §5 & DOKUMEN HTML BAGIAN 5
// ====================================================================

// Pre/Post-Test Results
export const INITIAL_TEST_RESULTS: PrePostTestResult[] = [
  // Dimas Wahyu Pratama (peserta.ipa): pre-test 56
  {
    userId: 'user-peserta-ipa',
    tenantId: 'nusantara',
    type: 'pre',
    score: 56,
    completedAt: '2026-09-01T08:00:00Z',
  },
  // Andi Kurniawan (peserta.lulus): pre-test 54, post-test 88 (kenaikan +63%)
  {
    userId: 'user-peserta-lulus',
    tenantId: 'nusantara',
    type: 'pre',
    score: 54,
    completedAt: '2026-08-01T08:00:00Z',
  },
  {
    userId: 'user-peserta-lulus',
    tenantId: 'nusantara',
    type: 'post',
    score: 88,
    completedAt: '2026-10-28T09:30:00Z',
  },
  // Rian Hidayat (peserta contoh): pre-test 54, post-test 82
  {
    userId: 'user-rian-hidayat',
    tenantId: 'nusantara',
    type: 'pre',
    score: 54,
    completedAt: '2026-08-10T08:00:00Z',
  },
  {
    userId: 'user-rian-hidayat',
    tenantId: 'nusantara',
    type: 'post',
    score: 82,
    completedAt: '2026-10-28T10:00:00Z',
  },
];

// Generate test results for other participants in Nusantara so that average Pre = 56.0, Post = 72.0 -> T1 = +28.6%
(function populateTestResults() {
  // Pre-test average 56 across 42 active participants
  // Post-test average 72 across 32 graduates
  for (let i = 1; i <= 39; i++) {
    const uid = i <= 18 ? `user-nus-grp1-${i}` : `user-nus-grp2-${i - 18}`;
    INITIAL_TEST_RESULTS.push({
      userId: uid,
      tenantId: 'nusantara',
      type: 'pre',
      score: 52 + (i % 9), // values around 52-60
      completedAt: '2026-08-05T08:00:00Z',
    });
    // For 30 graduates
    if (i <= 30) {
      INITIAL_TEST_RESULTS.push({
        userId: uid,
        tenantId: 'nusantara',
        type: 'post',
        score: 70 + (i % 12), // values around 70-82
        completedAt: '2026-10-20T08:00:00Z',
      });
    }
  }
})();

// Initial Certificates
export const INITIAL_CERTIFICATES: Certificate[] = [
  // 1. Andi Kurniawan - Piagam Terbit SSA/NUS/2026/0001
  {
    id: 'cert-andi-0001',
    certificateNumber: 'SSA/NUS/2026/0001',
    userId: 'user-peserta-lulus',
    userName: 'Andi Kurniawan',
    tenantId: 'nusantara',
    tenantName: 'Balai Diklat Air Minum Nusantara',
    track: 'terpadu',
    trackName: 'Jalur Operator Air Minum Terpadu',
    predicate: 'Lulus dengan Pujian',
    averageScore: 96,
    starsCount: 48,
    operatorLevel: 'Operator Ahli',
    issueDate: '28 Oktober 2026',
    status: 'valid',
    instructorApproved: true,
    leaderSigned: true,
    qrVerificationUrl: 'https://simscada.id/verifikasi/SSA-NUS-2026-0001',
  },
  // 2. Rian Hidayat - Pending approval SSA/NUS/2026/0002
  {
    id: 'cert-rian-0002',
    certificateNumber: 'SSA/NUS/2026/0002',
    userId: 'user-rian-hidayat',
    userName: 'Rian Hidayat',
    tenantId: 'nusantara',
    tenantName: 'Balai Diklat Air Minum Nusantara',
    track: 'ipa',
    trackName: 'Jalur Operator IPA (9 Misi)',
    predicate: 'Lulus',
    averageScore: 82,
    starsCount: 18,
    operatorLevel: 'Operator Madya',
    issueDate: '28 Oktober 2026',
    status: 'valid',
    instructorApproved: false, // Menunggu persetujuan instruktur di L8b & L9!
    leaderSigned: false,
    qrVerificationUrl: 'https://simscada.id/verifikasi/SSA-NUS-2026-0002',
  },
  // 3. Revoked certificate example for L16 demonstration
  {
    id: 'cert-revoked-0007',
    certificateNumber: 'SSA/NUS/2026/0007',
    userId: 'user-unknown',
    userName: 'Peserta Data Salah',
    tenantId: 'nusantara',
    tenantName: 'Balai Diklat Air Minum Nusantara',
    track: 'ipa',
    trackName: 'Jalur Operator IPA',
    predicate: 'Lulus',
    averageScore: 78,
    starsCount: 14,
    operatorLevel: 'Operator Muda',
    issueDate: '2 November 2026',
    status: 'revoked',
    revokedReason: 'Piagam terbit atas nama peserta yang salah (data diperbaiki, piagam baru diterbitkan).',
    revokedAt: '2026-11-02T10:00:00Z',
    instructorApproved: true,
    leaderSigned: true,
    qrVerificationUrl: 'https://simscada.id/verifikasi/SSA-NUS-2026-0007',
  },
];

// Add mock certificates to reach 32 issued certificates in Nusantara
(function populateNusantaraCertificates() {
  for (let i = 3; i <= 32; i++) {
    const certNo = `SSA/NUS/2026/${String(i).padStart(4, '0')}`;
    INITIAL_CERTIFICATES.push({
      id: `cert-nus-${i}`,
      certificateNumber: certNo,
      userId: `user-nus-grp1-${i}`,
      userName: `Alumni Nusantara ${i}`,
      tenantId: 'nusantara',
      tenantName: 'Balai Diklat Air Minum Nusantara',
      track: i % 2 === 0 ? 'ipa' : 'terpadu',
      trackName: i % 2 === 0 ? 'Jalur Operator IPA' : 'Jalur Operator Air Minum Terpadu',
      predicate: i % 3 === 0 ? 'Lulus dengan Pujian' : 'Lulus dengan Baik',
      averageScore: 84 + (i % 12),
      starsCount: 24 + (i % 15),
      operatorLevel: i % 3 === 0 ? 'Operator Ahli' : 'Operator Madya',
      issueDate: '15 Oktober 2026',
      status: 'valid',
      instructorApproved: true,
      leaderSigned: true,
      qrVerificationUrl: `https://simscada.id/verifikasi/SSA-NUS-2026-${String(i).padStart(4, '0')}`,
    });
  }

  // 12 certificates for Tirta Mandiri (TRM)
  for (let i = 1; i <= 12; i++) {
    const certNo = `SSA/TRM/2026/${String(i).padStart(4, '0')}`;
    INITIAL_CERTIFICATES.push({
      id: `cert-trm-${i}`,
      certificateNumber: certNo,
      userId: `user-trm-${i}`,
      userName: `Alumni Tirta ${i}`,
      tenantId: 'tirta',
      tenantName: 'Pusat Pelatihan Tirta Mandiri',
      track: 'ipa',
      trackName: 'Jalur Operator IPA (9 Misi)',
      predicate: 'Lulus dengan Baik',
      averageScore: 86,
      starsCount: 22,
      operatorLevel: 'Operator Madya',
      issueDate: '20 September 2026',
      status: 'valid',
      instructorApproved: true,
      leaderSigned: true,
      qrVerificationUrl: `https://simscada.id/verifikasi/SSA-TRM-2026-${String(i).padStart(4, '0')}`,
    });
  }
})();

// ====================================================================
// H. SKOR AWAL DIMAS WAHYU PRATAMA (1.465 XP EXACT PRD §5)
// ====================================================================
export const DIMAS_MISSION_RESULTS: MissionResult[] = [
  // IPA-01: 96 (3★) -> Mudah (×1.0) = 96 XP
  {
    id: 'res-dimas-ipa01',
    userId: 'user-peserta-ipa',
    tenantId: 'nusantara',
    missionCode: 'IPA-01',
    track: 'ipa',
    completedAt: '2026-09-02T10:00:00Z',
    durationSec: 150,
    scoreTindakan: 40,
    scoreWaktuRespons: 25,
    scoreStabilitas: 20,
    scoreAlarm: 15,
    scoreDeductions: 4, // 96
    totalScore: 96,
    stars: 3,
    xpEarned: 96,
    hintsUsedCount: 0,
    isPassed: true,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  },
  // IPA-02: 92 (2★) -> Mudah (×1.0) = 92 XP
  {
    id: 'res-dimas-ipa02',
    userId: 'user-peserta-ipa',
    tenantId: 'nusantara',
    missionCode: 'IPA-02',
    track: 'ipa',
    completedAt: '2026-09-05T11:00:00Z',
    durationSec: 180,
    scoreTindakan: 38,
    scoreWaktuRespons: 24,
    scoreStabilitas: 18,
    scoreAlarm: 12,
    scoreDeductions: 0,
    totalScore: 92,
    stars: 2,
    xpEarned: 92,
    hintsUsedCount: 0,
    isPassed: true,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  },
  // IPA-03: 88 (2★) -> Sedang (×1.5) = 132 XP
  {
    id: 'res-dimas-ipa03',
    userId: 'user-peserta-ipa',
    tenantId: 'nusantara',
    missionCode: 'IPA-03',
    track: 'ipa',
    completedAt: '2026-09-12T14:00:00Z',
    durationSec: 210,
    scoreTindakan: 36,
    scoreWaktuRespons: 23,
    scoreStabilitas: 17,
    scoreAlarm: 12,
    scoreDeductions: 0,
    totalScore: 88,
    stars: 2,
    xpEarned: 132,
    hintsUsedCount: 0,
    isPassed: true,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  },
  // IPA-04: 85 (2★) -> Sedang (×1.5) = 128 XP (round 85 * 1.5 = 127.5 -> 128)
  {
    id: 'res-dimas-ipa04',
    userId: 'user-peserta-ipa',
    tenantId: 'nusantara',
    missionCode: 'IPA-04',
    track: 'ipa',
    completedAt: '2026-09-18T09:30:00Z',
    durationSec: 240,
    scoreTindakan: 35,
    scoreWaktuRespons: 22,
    scoreStabilitas: 16,
    scoreAlarm: 12,
    scoreDeductions: 0,
    totalScore: 85,
    stars: 2,
    xpEarned: 128,
    hintsUsedCount: 0,
    isPassed: true,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  },
  // IPA-05: 86 (2★) -> Sedang (×1.5) = 129 XP (86 * 1.5 = 129)
  {
    id: 'res-dimas-ipa05',
    userId: 'user-peserta-ipa',
    tenantId: 'nusantara',
    missionCode: 'IPA-05',
    track: 'ipa',
    completedAt: '2026-09-25T15:00:00Z',
    durationSec: 220,
    scoreTindakan: 36,
    scoreWaktuRespons: 22,
    scoreStabilitas: 16,
    scoreAlarm: 12,
    scoreDeductions: 0,
    totalScore: 86,
    stars: 2,
    xpEarned: 129,
    hintsUsedCount: 0,
    isPassed: true,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  },
  // IPA-06: 88 (2★) -> Sulit (×2.0) = 176 XP
  // Sesi contoh resmi: 01:15 alarm sedang, 01:25 ACK, 01:45 alarm tinggi, 01:50 ACK, 02:10 PAC 48 (respons 25s), 02:25 kapur 8.5, 02:40 debit 75, 06:10 2.4 NTU, 06:20 auto-clear, 08:30 selesai. Skor 38 + 22 + 15 + 13 = 88
  {
    id: 'res-dimas-ipa06',
    userId: 'user-peserta-ipa',
    tenantId: 'nusantara',
    missionCode: 'IPA-06',
    track: 'ipa',
    completedAt: '2026-10-15T08:30:00Z',
    durationSec: 510, // 08:30
    scoreTindakan: 38, // 38/40 (95% SOP Skenario Benar)
    scoreWaktuRespons: 22, // 22/25 (Respons 25s < 50% target 60s)
    scoreStabilitas: 15, // 15/20 (75% Durasi di Rentang Baku)
    scoreAlarm: 13, // 13/15 (Semua Diakui & Auto-Clear)
    scoreDeductions: 0,
    totalScore: 88,
    stars: 2,
    xpEarned: 176,
    hintsUsedCount: 0,
    isPassed: true,
    actionLogs: [
      { timestampSec: 75, controlPointId: 'intake', action: 'Alarm SEDANG muncul: kekeruhan air baku melonjak 20 → 185 NTU', value: 185, isCorrect: true },
      { timestampSec: 85, controlPointId: 'intake', action: 'ACK alarm air baku dalam 10 detik', value: 'ACK', isCorrect: true },
      { timestampSec: 105, controlPointId: 'filtrasi', action: 'Alarm TINGGI muncul: kekeruhan air olahan 3,4 NTU (≥ 3,0 NTU)', value: 3.4, isCorrect: true },
      { timestampSec: 110, controlPointId: 'filtrasi', action: 'ACK alarm air olahan dalam 5 detik', value: 'ACK', isCorrect: true },
      { timestampSec: 130, controlPointId: 'koagulasi', action: 'Dosis PAC 20 → 48 mg/L (tindakan benar pertama: 25 detik setelah alarm Tinggi)', value: 48, isCorrect: true },
      { timestampSec: 145, controlPointId: 'koagulasi', action: 'Dosis kapur 8,5 mg/L, pH dijaga 7,20', value: 8.5, isCorrect: true },
      { timestampSec: 160, controlPointId: 'intake', action: 'Debit intake 100 → 75 L/s', value: 75, isCorrect: true },
      { timestampSec: 370, controlPointId: 'filtrasi', action: 'Kekeruhan air olahan 2,4 NTU (≤ 2,7 NTU)', value: 2.4, isCorrect: true },
      { timestampSec: 380, controlPointId: 'filtrasi', action: 'Alarm Tinggi clear otomatis setelah stabil 10 detik', value: 'CLEAR', isCorrect: true },
      { timestampSec: 510, controlPointId: 'simulasi', action: 'Simulasi selesai. Skor 38 + 22 + 15 + 13 = 88', value: 88, isCorrect: true },
    ],
    alarmLogs: [
      {
        id: 'alm-sedang-01',
        timestamp: '01:15',
        timestampSec: 75,
        priority: 'sedang',
        controlPointId: 'intake',
        controlPointName: 'Intake Air Baku',
        message: 'Kekeruhan air baku tinggi (185 NTU, masih di atas ambang)',
        status: 'clear',
        clearMethod: 'auto',
      },
      {
        id: 'alm-tinggi-02',
        timestamp: '01:45',
        timestampSec: 105,
        priority: 'tinggi',
        controlPointId: 'filtrasi',
        controlPointName: 'Filtrasi (Air Olahan)',
        message: 'Kekeruhan air olahan ≥ 3 NTU (Terukur: 3,4 NTU)',
        status: 'clear',
        clearMethod: 'auto',
      },
    ],
    trendHistory: [
      { timeSec: 0, turbidity: 20, settledTurbidity: 3.5, freeChlorine: 0.35, reservoirLevel: 4.2, zonePressure: 2.4, zoneFlow: 100 },
      { timeSec: 75, turbidity: 185, settledTurbidity: 3.5, freeChlorine: 0.35, reservoirLevel: 4.2, zonePressure: 2.4, zoneFlow: 100 },
      { timeSec: 105, turbidity: 185, settledTurbidity: 12.0, freeChlorine: 0.35, reservoirLevel: 4.2, zonePressure: 2.4, zoneFlow: 100 },
      { timeSec: 130, turbidity: 185, settledTurbidity: 10.5, freeChlorine: 0.35, reservoirLevel: 4.2, zonePressure: 2.4, zoneFlow: 100 },
      { timeSec: 370, turbidity: 185, settledTurbidity: 4.0, freeChlorine: 0.35, reservoirLevel: 4.2, zonePressure: 2.4, zoneFlow: 100 },
      { timeSec: 510, turbidity: 185, settledTurbidity: 2.4, freeChlorine: 0.38, reservoirLevel: 4.2, zonePressure: 2.4, zoneFlow: 100 },
    ],
  },
  // IPA-07: 76 (1★) -> Sulit (×2.0) = 152 XP
  {
    id: 'res-dimas-ipa07',
    userId: 'user-peserta-ipa',
    tenantId: 'nusantara',
    missionCode: 'IPA-07',
    track: 'ipa',
    completedAt: '2026-10-22T10:00:00Z',
    durationSec: 280,
    scoreTindakan: 30,
    scoreWaktuRespons: 18,
    scoreStabilitas: 15,
    scoreAlarm: 13,
    scoreDeductions: 0,
    totalScore: 76,
    stars: 1,
    xpEarned: 152,
    hintsUsedCount: 0,
    isPassed: true,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  },
];
// Total misi Dimas = 96 + 92 + 132 + 128 + 129 + 176 + 152 = 905 XP
// Tambah 7 kuis bernilai 80 (7 * 80 = 560 XP)
// Total XP Dimas = 905 + 560 = 1.465 XP! Level = Operator Madya (1.200 - 2.499 XP). Sisa 1.035 ke Utama (2.500 XP)!

// Pre-seeded results for Andi Kurniawan (17 missions, 48 stars, 3.820 XP, Operator Ahli)
export const ANDI_MISSION_RESULTS: MissionResult[] = [
  'IPA-01', 'IPA-02', 'IPA-03', 'IPA-04', 'IPA-05', 'IPA-06', 'IPA-07', 'IPA-08',
  'DST-01', 'DST-02', 'DST-03', 'DST-04', 'DST-05', 'DST-06',
  'TRP-01', 'TRP-02'
].map((code, idx) => {
  const isTrp2 = code === 'TRP-02';
  const score = isTrp2 ? 94 : 96;
  const stars = isTrp2 ? 3 : (idx % 5 === 0 ? 2 : 3);
  return {
    id: `res-andi-${code}`,
    userId: 'user-peserta-lulus',
    tenantId: 'nusantara',
    missionCode: code,
    track: 'terpadu' as any,
    completedAt: '2026-10-26T16:00:00Z',
    durationSec: 200,
    scoreTindakan: 38,
    scoreWaktuRespons: 24,
    scoreStabilitas: 19,
    scoreAlarm: 15,
    scoreDeductions: 0,
    totalScore: score,
    stars: 3,
    xpEarned: score * (code.startsWith('TRP') ? 3 : 2),
    hintsUsedCount: 0,
    isPassed: true,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  };
});

// Pre-seeded results for Siti Rahmawati (DST-01..05 lulus, 11★, 1.010 XP, Operator Muda)
export const SITI_MISSION_RESULTS: MissionResult[] = ['DST-01', 'DST-02', 'DST-03', 'DST-04', 'DST-05'].map((code, idx) => {
  const score = 82 + (idx * 2);
  return {
    id: `res-siti-${code}`,
    userId: 'user-peserta-distribusi',
    tenantId: 'nusantara',
    missionCode: code,
    track: 'distribusi' as any,
    completedAt: '2026-10-24T14:00:00Z',
    durationSec: 220,
    scoreTindakan: 34,
    scoreWaktuRespons: 21,
    scoreStabilitas: 16,
    scoreAlarm: 13,
    scoreDeductions: 0,
    totalScore: score,
    stars: idx === 0 ? 3 : 2,
    xpEarned: score * 1.5,
    hintsUsedCount: 0,
    isPassed: true,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  };
});

// Pre-seeded results for Rian Hidayat (9/9 IPA passed, IPA-09 score 82, waiting for approval)
export const RIAN_MISSION_RESULTS: MissionResult[] = [
  'IPA-01', 'IPA-02', 'IPA-03', 'IPA-04', 'IPA-05', 'IPA-06', 'IPA-07', 'IPA-08', 'IPA-09'
].map((code) => {
  const is9 = code === 'IPA-09';
  const score = is9 ? 82 : 80;
  return {
    id: `res-rian-${code}`,
    userId: 'user-rian-hidayat',
    tenantId: 'nusantara',
    missionCode: code,
    track: 'ipa' as any,
    completedAt: '2026-10-27T10:00:00Z',
    durationSec: 260,
    scoreTindakan: 32,
    scoreWaktuRespons: 20,
    scoreStabilitas: 16,
    scoreAlarm: 14,
    scoreDeductions: 0,
    totalScore: score,
    stars: 2,
    xpEarned: score * 1.5,
    hintsUsedCount: 0,
    isPassed: true,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  };
});

// Pre-seeded results for Eko Prasetyo (gagal IPA-07 3x berturut-turut -> lagging alert in L9)
export const EKO_MISSION_RESULTS: MissionResult[] = [
  'IPA-01', 'IPA-02', 'IPA-03', 'IPA-04', 'IPA-05', 'IPA-06'
].map((code) => ({
  id: `res-eko-${code}`,
  userId: 'user-eko-prasetyo',
  tenantId: 'nusantara',
  missionCode: code,
  track: 'ipa' as any,
  completedAt: '2026-10-10T10:00:00Z',
  durationSec: 280,
  scoreTindakan: 30,
  scoreWaktuRespons: 18,
  scoreStabilitas: 15,
  scoreAlarm: 12,
  scoreDeductions: 0,
  totalScore: 75,
  stars: 1,
  xpEarned: 100,
  hintsUsedCount: 0,
  isPassed: true,
  actionLogs: [],
  alarmLogs: [],
  trendHistory: [],
})).concat([
  // 3 failed attempts on IPA-07
  {
    id: 'res-eko-ipa07-1',
    userId: 'user-eko-prasetyo',
    tenantId: 'nusantara',
    missionCode: 'IPA-07',
    track: 'ipa' as any,
    completedAt: '2026-10-22T09:00:00Z',
    durationSec: 300,
    scoreTindakan: 22,
    scoreWaktuRespons: 12,
    scoreStabilitas: 14,
    scoreAlarm: 10,
    scoreDeductions: 0,
    totalScore: 58,
    stars: 0,
    xpEarned: 20,
    hintsUsedCount: 0,
    isPassed: false,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  },
  {
    id: 'res-eko-ipa07-2',
    userId: 'user-eko-prasetyo',
    tenantId: 'nusantara',
    missionCode: 'IPA-07',
    track: 'ipa' as any,
    completedAt: '2026-10-23T11:00:00Z',
    durationSec: 300,
    scoreTindakan: 24,
    scoreWaktuRespons: 13,
    scoreStabilitas: 13,
    scoreAlarm: 10,
    scoreDeductions: 0,
    totalScore: 60,
    stars: 0,
    xpEarned: 24,
    hintsUsedCount: 0,
    isPassed: false,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  },
  {
    id: 'res-eko-ipa07-3',
    userId: 'user-eko-prasetyo',
    tenantId: 'nusantara',
    missionCode: 'IPA-07',
    track: 'ipa' as any,
    completedAt: '2026-10-25T14:00:00Z',
    durationSec: 300,
    scoreTindakan: 22,
    scoreWaktuRespons: 12,
    scoreStabilitas: 14,
    scoreAlarm: 10,
    scoreDeductions: 0,
    totalScore: 58,
    stars: 0,
    xpEarned: 22,
    hintsUsedCount: 0,
    isPassed: false,
    actionLogs: [],
    alarmLogs: [],
    trendHistory: [],
  },
]);
