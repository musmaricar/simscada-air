/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  BookOpen, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Droplets, 
  FileCheck2, 
  FileText, 
  Gauge, 
  HelpCircle, 
  Play, 
  ShieldCheck, 
  Sliders, 
  Trophy, 
  UserCheck, 
  Users, 
  X 
} from 'lucide-react';

interface UserGuideModalProps {
  onClose: () => void;
}

export const UserGuideModal: React.FC<UserGuideModalProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<'peran' | 'peserta' | 'simulator' | 'alarm' | 'instruktur' | 'evaluasi' | 'verifikasi'>('simulator');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 font-sans animate-fade-in text-slate-900">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full h-[88vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Buku Panduan Fitur &amp; Penggunaan SimSCADA-Air
              </h2>
              <span className="text-[11px] text-sky-400 font-medium">
                Dokumentasi Narasi Interaktif Komprehensif
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto shrink-0 text-xs font-bold">
          <button
            onClick={() => setActiveSection('simulator')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'simulator' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Simulator SCADA
          </button>
          <button
            onClick={() => setActiveSection('alarm')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'alarm' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Sistem Alarm &amp; SOP
          </button>
          <button
            onClick={() => setActiveSection('peserta')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'peserta' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Alur Belajar Peserta
          </button>
          <button
            onClick={() => setActiveSection('instruktur')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'instruktur' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Instruktur &amp; Skenario
          </button>
          <button
            onClick={() => setActiveSection('evaluasi')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'evaluasi' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Evaluasi Lembaga (T1–T4)
          </button>
          <button
            onClick={() => setActiveSection('verifikasi')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'verifikasi' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Piagam &amp; Verifikasi
          </button>
          <button
            onClick={() => setActiveSection('peran')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeSection === 'peran' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Daftar Akun Demo
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700 leading-relaxed">
          {/* SECTION: SIMULATOR */}
          {activeSection === 'simulator' && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Play className="w-4 h-4 text-sky-600" />
                  Pengoperasian Simulator SCADA Interaktif (Layar 5)
                </h3>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Diagram HMI proses fisik dari intake air baku hingga jaringan pipa perkotaan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <strong className="text-slate-900 block font-bold text-sm">Komponen Diagram HMI (Kiri):</strong>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
                    <li><strong>Intake:</strong> Pompa air baku P1 &amp; P2 dengan animasi aliran air berkedip saat beroperasi.</li>
                    <li><strong>Koagulasi:</strong> Flash mixer injeksi Poly Aluminium Chloride (PAC) dan pembacaan pH.</li>
                    <li><strong>Flokulasi:</strong> Agitator lambat bertahap untuk membentuk flok stabil.</li>
                    <li><strong>Sedimentasi:</strong> Bak clarifier lamella plate dengan indikator selimut lumpur &amp; katup blowdown.</li>
                    <li><strong>Filtrasi:</strong> Filter Pasir 1 &amp; 2 dengan pembacaan headloss (mH2O) dan siklus backwash.</li>
                    <li><strong>Desinfeksi:</strong> Pompa klorinasi dengan standar sisa klor bebas (0,2–0,5 mg/L).</li>
                    <li><strong>Reservoir:</strong> Tangki air bersih dengan ketinggian air dinamis (meter dan %).</li>
                    <li><strong>Pompa Distribusi:</strong> Stasiun pompa transmisi P-101 &amp; P-102 bertekanan 4.1 bar.</li>
                    <li><strong>Katup PRV &amp; Isolasi:</strong> Katup pengatur tekanan zona dan katup isolasi ruas pipa pecah.</li>
                    <li><strong>Titik Pantau Jaringan:</strong> Sensor telemetri tekanan zona 1 (residensial) &amp; zona 2 (komersial/ujung).</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <strong className="text-slate-900 block font-bold text-sm">Cara Melakukan Kontrol (Kanan):</strong>
                  <ol className="space-y-2 pl-4 list-decimal text-slate-600">
                    <li>Klik titik kontrol manapun pada diagram mimic (atau klik alarm di tabel bawah).</li>
                    <li>Panel kendali di sisi kanan akan otomatis memuat tombol saklar unit tersebut.</li>
                    <li>Gunakan tombol Start/Stop pompa, penggeser dosis kimia, pengatur RPM, atau katup isolasi.</li>
                    <li>Setiap perubahan kendali langsung dihitung oleh mesin simulasi fisika secara real-time (langkah 1 detik).</li>
                    <li>Klik tombol info <strong>"i"</strong> untuk membuka narasi SOP titik kontrol tanpa mengurangi nilai.</li>
                    <li>Setelah parameter stabil dan misi terselesaikan, tekan tombol <strong>Selesai &amp; Evaluasi</strong> di bilah atas.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: ALARM */}
          {activeSection === 'alarm' && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Sistem Alarm &amp; Prosedur Penanganan Gangguan
                </h3>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Mekanisme akui (acknowledge), clear otomatis, clear manual bersyarat, dan alarm terkunci (latched).
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1.5">
                  <span className="font-bold block text-sm">1. Hirarki Prioritas Alarm:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                    <span className="p-2 bg-rose-100 text-rose-800 rounded-lg font-bold">▲ KRITIS (Merah)</span>
                    <span className="p-2 bg-amber-100 text-amber-800 rounded-lg font-bold">● TINGGI (Oranye)</span>
                    <span className="p-2 bg-yellow-100 text-yellow-800 rounded-lg font-bold">■ SEDANG (Kuning)</span>
                    <span className="p-2 bg-sky-100 text-sky-800 rounded-lg font-bold">◆ INFO (Biru)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block text-sm">2. Aturan Penyelesaian Alarm (Clear Rules):</span>
                  <ul className="space-y-2 pl-4 list-disc text-slate-600">
                    <li>
                      <strong>Akui Alarm (Acknowledge):</strong> Klik tombol <em>Akui</em> pada banner atau baris alarm untuk menghentikan sirine audio dan mengubah status menjadi *Sedang Ditangani*.
                    </li>
                    <li>
                      <strong>Clear Otomatis (10 Detik Stabil):</strong> Pada alarm seperti lonjakan kekeruhan air baku atau anomali dosis klorin, begitu dosis disesuaikan dan parameter air kembali normal dalam batas aman selama 10 detik berturut-turut, alarm otomatis berpindah ke status *Clear*.
                    </li>
                    <li>
                      <strong>Clear Manual Bersyarat:</strong> Tombol <em>Clear</em> hanya dapat ditekan jika penyebab abnormal telah tertangani. Jika ditekan saat air masih keruh atau pipa masih bocor, sistem menolak dan mencatat penalti kesalahan SOP.
                    </li>
                    <li>
                      <strong>Alarm Terkunci (*Latched* - Pompa Trip):</strong> Alarm kerusakan mekanikal/kelistrikan seperti pompa trip tidak akan pernah clear otomatis. Operator wajib mengalihkan ke pompa cadangan, menekan tombol <strong>Reset Trip Pompa</strong> di panel kendali, baru tombol <em>Clear</em> manual diizinkan.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PESERTA */}
          {activeSection === 'peserta' && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-sky-600" />
                  Alur Pembelajaran &amp; Gamifikasi Peserta (Layar 2, 3, 4, 6, 7)
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <strong className="text-slate-900 block text-sm">Urutan Belajar Peserta:</strong>
                  <ol className="space-y-1.5 pl-4 list-decimal text-slate-600">
                    <li><strong>Pre-Test:</strong> Ambil pre-test 5 soal di beranda untuk mencatat baseline kompetensi awal Anda.</li>
                    <li><strong>Pilih Jalur:</strong> Tentukan kurikulum (IPA Saja 9 misi, Distribusi Saja 7 misi, atau Terpadu 17 misi).</li>
                    <li><strong>Peta Misi:</strong> Klik misi terbuka berikutnya. Selesaikan modul materi dan kuis 5 soal (minimal 3 benar).</li>
                    <li><strong>Simulasi SCADA:</strong> Kendalikan instalasi dan atasi gangguan sesuai briefing skenario.</li>
                    <li><strong>Layar Hasil:</strong> Peroleh evaluasi 4 komponen (Tindakan 40%, Waktu Respons 25%, Stabilitas 20%, Alarm 15%), 1–3 bintang, dan XP kumulatif.</li>
                    <li><strong>Koleksi Lencana:</strong> Buka 8 lencana keahlian dan bandingkan posisi di papan peringkat lembaga.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: INSTRUKTUR */}
          {activeSection === 'instruktur' && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-600" />
                  Fitur Instruktur &amp; Pengelolaan Pelatihan (Layar 9, 10, 11)
                </h3>
              </div>

              <div className="space-y-3 text-slate-600">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <strong className="text-slate-900 block text-sm">Monitoring Binaan:</strong>
                  <p>Pantau kemajuan misi seluruh peserta per kelompok angkatan, deteksi peserta yang tertinggal, periksa matriks sebaran bintang, dan berikan izin buka kunci misi secara manual.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <strong className="text-slate-900 block text-sm">Kelola Skenario:</strong>
                  <p>Rancang skenario gangguan baru dengan menentukan jenis dari 5 gangguan utama, detik kemunculan, tingkat kesulitan, dan kelompok sasaran.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <strong className="text-slate-900 block text-sm">Putar Ulang Log (Session Replay):</strong>
                  <p>Audit rekaman sesi simulator peserta detik demi detik menggunakan bilah scrubber dan playback 3x speed.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: EVALUASI */}
          {activeSection === 'evaluasi' && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-sky-600" />
                  Dashboard Evaluasi Lembaga Pembeli (Layar 14)
                </h3>
              </div>

              <div className="space-y-3 text-slate-600">
                <p>Dashboard ini mengukur langsung 4 indikator keberhasilan investasi pelatihan:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">T1. Kenaikan Kompetensi (≥ 25%):</strong>
                    <span>Membandingkan nilai rata-rata Pre-Test dengan Post-Test per angkatan.</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">T2. Penguasaan 5 Gangguan (≥ 80%):</strong>
                    <span>Persentase kelulusan skenario kekeruhan, pompa trip, klor, pipa bocor, dan tekanan drop.</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">T3. Waktu Menuju Lulus (~2 Bulan):</strong>
                    <span>Mempercepat masa orientasi operator baru dari ±3 bulan menjadi ±2 bulan.</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block">T4. Tingkat Kelulusan (≥ 70%):</strong>
                    <span>Rasio piagam resmi yang berhasil diterbitkan dibanding peserta aktif.</span>
                  </div>
                </div>
                <p>Dilengkapi tombol <strong>Ekspor CSV Excel</strong> dan <strong>Cetak Ringkasan Eksekutif PDF</strong> berkop lembaga.</p>
              </div>
            </div>
          )}

          {/* SECTION: VERIFIKASI */}
          {activeSection === 'verifikasi' && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  Penerbitan Piagam &amp; Layanan Verifikasi Publik (Layar 8 &amp; 16)
                </h3>
              </div>

              <div className="space-y-3 text-slate-600">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <strong className="text-slate-900 block text-sm">Piagam Kelulusan Resmi:</strong>
                  <p>Terbit otomatis setelah peserta lulus semua misi pada jalurnya, lulus ujian kelulusan (skor ≥ 80), lulus post-test (≥ 70), dan disetujui instruktur. Memuat kop resmi lembaga, nomor unik, tanda tangan pimpinan &amp; instruktur, predikat, dan kode QR.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <strong className="text-slate-900 block text-sm">Halaman Verifikasi Publik (L16):</strong>
                  <p>Dapat diakses masyarakat umum tanpa login. Memasukkan nomor piagam (contoh: <code>SSA/BDAN/2026/001</code>) akan menampilkan status keabsahan dokumen (Sah atau Telah Dicabut).</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PERAN & DEMO */}
          {activeSection === 'peran' && (
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  Daftar 10 Akun Demo &amp; Kata Sandi
                </h3>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Semua akun demo menggunakan kata sandi bersama: <code className="font-mono font-bold text-sky-700">Demo#2026</code>.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200">
                  <thead className="bg-slate-50 font-semibold text-slate-600 border-b">
                    <tr>
                      <th className="p-2.5">Username</th>
                      <th className="p-2.5">Peran</th>
                      <th className="p-2.5">Lembaga Tenant</th>
                      <th className="p-2.5">Tujuan Pengujian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-slate-800">peserta.baru</td>
                      <td className="p-2.5">Peserta Operator</td>
                      <td className="p-2.5">Balai Diklat Nusantara</td>
                      <td className="p-2.5">Alur awal (Pre-Test &amp; Misi IPA-01).</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-slate-800">peserta.ipa</td>
                      <td className="p-2.5">Peserta Operator</td>
                      <td className="p-2.5">Balai Diklat Nusantara</td>
                      <td className="p-2.5">Misi gangguan kekeruhan (IPA-06) &amp; trip (IPA-07).</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-slate-800">peserta.distribusi</td>
                      <td className="p-2.5">Peserta Operator</td>
                      <td className="p-2.5">Balai Diklat Nusantara</td>
                      <td className="p-2.5">Kurikulum hidrolika &amp; kebocoran pipa.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-emerald-700">peserta.lulus</td>
                      <td className="p-2.5">Peserta Operator</td>
                      <td className="p-2.5">Balai Diklat Nusantara</td>
                      <td className="p-2.5">Cetak piagam resmi &amp; uji verifikasi QR.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-slate-800">instruktur.nusantara</td>
                      <td className="p-2.5">Instruktur (Pak Budi)</td>
                      <td className="p-2.5">Balai Diklat Nusantara</td>
                      <td className="p-2.5">Monitoring binaan, buka kunci, putar ulang log.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-slate-800">admin.nusantara</td>
                      <td className="p-2.5">Admin Lembaga (Rina)</td>
                      <td className="p-2.5">Balai Diklat Nusantara</td>
                      <td className="p-2.5">Kelola pengguna, alokasi kursi, SOP lokal.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-slate-800">pimpinan.nusantara</td>
                      <td className="p-2.5">Pimpinan (Dr. Bambang)</td>
                      <td className="p-2.5">Balai Diklat Nusantara</td>
                      <td className="p-2.5">Dashboard evaluasi eksekutif &amp; ekspor laporan.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-purple-800">admin.tirta</td>
                      <td className="p-2.5">Admin Lembaga</td>
                      <td className="p-2.5">Pusat Diklat Tirta Mandiri</td>
                      <td className="p-2.5">Uji isolasi data lembaga kedua.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-purple-800">peserta.tirta</td>
                      <td className="p-2.5">Peserta Operator</td>
                      <td className="p-2.5">Pusat Diklat Tirta Mandiri</td>
                      <td className="p-2.5">Uji isolasi data peserta lembaga kedua.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-slate-900">superadmin</td>
                      <td className="p-2.5">Super Admin Platform</td>
                      <td className="p-2.5">Platform SimSCADA-Air</td>
                      <td className="p-2.5">Kelola lisensi semua tenant dan kuota kursi.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Tutup Buku Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
