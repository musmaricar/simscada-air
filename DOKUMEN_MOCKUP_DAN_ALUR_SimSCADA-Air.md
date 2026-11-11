# DOKUMEN CETAK BIRU & MOCK-UP LENGKAP SISTEM SimSCADA-Air v1.0
*(Arsitektur Desain Konseptual Sesuai Dokumen Kebutuhan Produk PRD SimSCADA-Air v1.0)*

> **Status Dokumen:**  
> Dokumen ini memuat spesifikasi cetak biru (*blueprint*), diagram alur kerja multi-role swimlane berformat standard **Draw.io (`alur_kerja_simscada.drawio`)**, dan 19 berkas mock-up grafis SVG berskala penuh (1920 × 1080 px) yang merepresentasikan desain konseptual **SimSCADA-Air v1.0** sesuai dengan ketentuan dalam *Product Requirements Document* (PRD).

---

## 1. Ringkasan Eksekutif & Struktur Mock-up

Sistem **SimSCADA-Air v1.0** dirancang sebagai platform simulasi SCADA mandiri untuk pelatihan operator Sistem Penyediaan Air Minum (SPAM). Seluruh alur pembelajaran dan operasional disajikan dalam 19 antarmuka visual (L1–L16, termasuk L4a, L5a, dan L8b) yang mencakup 5 peran pengguna: **Super Administrator, Admin Lembaga, Pimpinan Lembaga, Instruktur Pengajar, dan Peserta Operator**, serta akses **Publik**.

### 1.1 Matriks Keselarasan Data Contoh Antar-Layar
Data contoh diselaraskan secara konsisten di seluruh layar:
* **Lembaga Demo:** "Balai Diklat Air Minum Nusantara" (kode `NUS`, kuota 50 kursi) dan "Pusat Pelatihan Tirta Mandiri" (kode `TRM`, kuota 50 kursi).
* **Akun Demo PRD §5 (Sandi: `Demo#2026`):**
  1. `superadmin` — Super Administrator Platform
  2. `admin.nusantara` — Admin Lembaga Balai Diklat Air Minum Nusantara
  3. `pimpinan.nusantara` — Ir. H. Bambang Sutrisno, M.Eng. (Pimpinan Lembaga)
  4. `instruktur.nusantara` — Budi Santoso, S.T. (Instruktur Pengajar)
  5. `peserta.baru` — Budi Baru (Peserta Magang, baru menyelesaikan pre-test 52/100)
  6. `peserta.ipa` — Dimas Wahyu Pratama (Peserta Muda, 820 XP, 14★, 7/9 misi IPA lulus)
  7. `peserta.distribusi` — Siti Rahmawati (Peserta Muda, 750 XP, 12★, 5/7 misi Distribusi)
  8. `peserta.lulus` — Andi Kurniawan (Operator Ahli, 3.820 XP, 48★, Jalur Terpadu 17 misi, Piagam `SSA/NUS/2026/0001` SUDAH TERBIT)
  9. `admin.tirta` — Admin Lembaga Pusat Pelatihan Tirta Mandiri
  10. `peserta.tirta` — Peserta Pelatihan Tirta Mandiri
* **Sesi Contoh Konsisten (L4, L5, L6, L11):** Skenario IPA-06 "Gangguan: Lonjakan Kekeruhan Air Baku" yang dijalankan oleh Dimas Wahyu Pratama:
  - Lonjakan kekeruhan air baku: 15 NTU → 45 NTU pada menit 01:00.
  - Alarm Kekeruhan Tinggi (3,4 NTU ≥ 3,0 NTU) aktif pada menit 01:10.
  - ACK alarm diterima pada menit 01:25 (respons 25 detik < batas 50% × 60s target = lencana Respons Kilat diraih).
  - Intervensi operator: Dosis koagulan dinaikkan dari 25 mg/L ke 48 mg/L pada 01:45, flash mixer disetel ke 100 RPM pada 02:30.
  - Auto-clear alarm: Tercapai otomatis pada menit 06:20 saat kekeruhan stabil pada 1,2 NTU (<1,5 NTU).
  - Selesai pada 08:30 dengan Skor 88/100, Bintang 2 (85–94), XP +176 (88 × 2,0x pengali Sulit).

---

## 2. Katalog 19 Layar Mock-up SimSCADA-Air

| Kode | Nama Layar & Berkas SVG | Peran Pengguna | Ringkasan Fungsi Utama |
| :--- | :--- | :--- | :--- |
| **L1** | `mockup_l1_login.svg`<br>*Portal Autentikasi Multi-Tenant* | Semua Peran | Auto-detect peran dan lembaga dari 10 akun demo PRD §5 tanpa pemilih peran manual. Pilihan lembaga resmi 'Balai Diklat Air Minum Nusantara' dan 'Pusat Pelatihan Tirta Mandiri'. 5 Peran lengkap termasuk Pimpinan Lembaga. Sandi: Demo#2026. |
| **L2** | `mockup_l2_trainee_dashboard.svg`<br>*Beranda Peserta & Roadmap Misi* | Peserta Operator | Dasbor Dimas Wahyu Pratama (peserta.ipa): 7 dari 9 misi IPA lulus, 14 bintang (3,2,2,2,2,2,1,-,-), 820 XP, jenjang Operator Muda (sisa 380 XP ke Madya). Peta 5 tingkat kesulitan misi khusus jalur IPA (IPA-01..IPA-09), grafik tren skor, 3 lencana terbuka, peringkat #2, dan status piagam belum memenuhi. |
| **L3** | `mockup_l3_track_select.svg`<br>*Pemilihan Jalur Pembelajaran* | Peserta Operator | 3 Kartu Jalur PRD §7: Pengolahan IPA (9 misi), Distribusi (7 misi), dan Terpadu (17 misi). Tanpa prasyarat untuk jalur Terpadu; pengakuan otomatis misi yang telah lulus saat berpindah jalur. Catatan isolasi paket lisensi tenant. |
| **L4** | `mockup_l4_module_quiz.svg`<br>*Modul Materi & Kuis Pra-Misi* | Peserta Operator | Sesi contoh konsisten IPA-06 'Lonjakan Kekeruhan Air Baku'. Pengenalan SOP koagulasi darurat, batas Permenkes No. 2/2023 (<1,5 NTU), target batas waktu respons alarm skenario 60 detik, kuis 5 butir soal pemahaman (KKM ≥60%). Kartu poin SOP rapi tanpa penumpukan teks. |
| **L4a** | `mockup_l4a_pre_post_test.svg`<br>*Pre-Test & Post-Test Evaluasi* | Peserta Operator | Instrumen pengukuran Target KPI T1 (Kenaikan Kompetensi ≥25%). Sisi Pre-Test menampilkan baseline awal Dimas Wahyu Pratama (Skor 56/100). Sisi Post-Test menampilkan evaluasi kelulusan Andi Kurniawan (Skor 88/100, kenaikan +32 poin / +57,1%, melampaui target T1 25%). |
| **L5** | `mockup_l5_scada_workspace.svg`<br>*Workspace Simulator SCADA HMI* | Peserta Operator | Mimic HMI interaktif frekuensi 1 Hz. Menit 02:00 saat alarm kekeruhan tinggi diakui (ACK) dan penanganan dosis 48 mg/L berlangsung. Banner alarm menampilkan status Diakui (ACK), tombol Clear dinonaktifkan dengan pesan peringatan 'Penyebab belum selesai: 3,4 NTU ≥ 3,0 NTU'. Kontrol lengkap PRD §9, PRV disembunyikan untuk misi IPA, unit distribusi diredupkan. |
| **L5a** | `mockup_l5a_control_narrative.svg`<br>*Pop-up Narasi Titik Kontrol (Koagulasi)* | Peserta Operator | Modal informasi 'i' 6 bagian lengkap PRD §9: Definisi proses hidrolika/kimia, Parameter dipantau (satuan & rentang normal), Variabel kendali, Dampak ke hilir, Gangguan umum & SOP singkat, serta Referensi belajar. Dilengkapi kotak catatan SOP lokal Balai Nusantara dan tata letak teks berjenjang rapi bebas terpotong. |
| **L6** | `mockup_l6_results_scoring.svg`<br>*Hasil Evaluasi Skor 4 Komponen* | Peserta Operator | Evaluasi terinci sesi Dimas Wahyu Pratama pada misi IPA-06: Skor 88/100, Bintang 2 (85–94), XP +176 (88 × 2,0x). Rincian 4 kartu komponen PRD §8 (Mutu 23/25, Waktu Respons 25/25 [25 dtk < 50% × 60s target], Efisiensi Kimia 22/25, Prosedur Alarm 18/25). Perolehan lencana 'Respons Kilat' dan debriefing mentor Pak Slamet. |
| **L7** | `mockup_l7_badges_leaderboard.svg`<br>*Galeri Lencana & Papan Peringkat* | Peserta Operator | 8 Lencana resmi PRD §8 (Penjelajah Titik Kontrol, Respons Kilat, Tanpa Alarm Terlewat, Penjaga Mutu Air, Penjaga Tekanan, Tiga Bintang IPA, Hulu ke Hilir, Lulus Tanpa Petunjuk) dengan syarat persis PRD. Papan peringkat terisolasi Balai Nusantara (FR-21) dengan filter Kelompok / Seluruh Lembaga dan Mingguan / Sepanjang Waktu. Posisi Dimas #2 (820 XP) di bawah Andi Kurniawan #1 (3.820 XP). |
| **L8** | `mockup_l8_certificate.svg`<br>*Piagam Kelulusan Operator (Terbit)* | Peserta Operator | Piagam Kelulusan sah Andi Kurniawan (peserta.lulus). Nomor Register: SSA/NUS/2026/0001 (SUDAH TERBIT 15 Maret 2026). Jalur Terpadu 17 Misi, Skor Post-Test 96/100, Bintang 3 (Sangat Baik), 3.820 XP, Operator Ahli. Ditandatangani Instruktur Penilai Budi Santoso, S.T. dan Kepala Balai Diklat Ir. H. Bambang Sutrisno, M.Eng. Dilengkapi QR verifikasi. |
| **L8b** | `mockup_l8b_certificate_pending.svg`<br>*Status Piagam: Menunggu Persetujuan* | Peserta Operator | Varian layar L8 versi kedua: Pratinjau draf piagam Rian Hidayat (peserta contoh - Angkatan 1) dengan nomor register dicadangkan SSA/NUS/2026/0002. Tanda air 'DRAFT - MENUNGGU ACC', tombol unduh nonaktif, dan status menunggu validasi sesi replay oleh instruktur. |
| **L9** | `mockup_l9_instructor_dashboard.svg`<br>*Dasbor Pengawasan Kelas Instruktur* | Instruktur SPAM | Dasbor instruktur Budi Santoso, S.T. memantau 42 peserta aktif dalam 2 kelompok binaan (Angkatan 1 & 2). Matriks progres resmi IPA-01 s/d IPA-09 / DST. Data konsisten: Andi (Piagam Terbit, Ahli), Dimas (14★, 820 XP), Siti (12★), Rian (Menunggu ACC), Budi Baru (Magang). Tombol aksi: Tinjau Sesi Replay, Setujui Piagam, Ekspor Portofolio Nilai CSV. |
| **L10** | `mockup_l10_manage_scenarios.svg`<br>*Kelola Skenario Gangguan Kustom* | Instruktur SPAM | Authoring Tool skenario gangguan (FR-23). Form perancangan skenario lengkap dengan dropdown tingkat kesulitan dan pengali XP PRD §7 (1,0x s/d 3,0x), batas toleransi respons alarm (target 60 detik), dan katalog misi bawaan IPA-01..IPA-09, DST-01..DST-07, TRP-01, TRP-02. |
| **L11** | `mockup_l11_session_replay.svg`<br>*Putar Ulang Sesi & Audit Log (Replay)* | Instruktur SPAM | Replay audit sesi IPA-06 Dimas Wahyu Pratama. Log kronologis identik L6: Gangguan 01:00, Alarm 01:10, ACK 01:25 (respons 25 detik < 50% × 60s), Dosis 48 mg/L 01:45, Mixer 100 RPM 02:30, Auto-clear 06:20 (1,2 NTU), Selesai 08:30 (Skor 88). Scrubber interaktif dengan label penanda berjenjang rapi tanpa tabrakan. |
| **L12** | `mockup_l12_manage_users.svg`<br>*Kelola Pengguna, Kelompok & Lisensi* | Admin Lembaga | Manajemen 46 akun terdaftar (kuota 50 kursi lisensi Balai Nusantara, 42 peserta aktif login 14 hari). Menampilkan 7 akun demo PRD §5 dan ringkasan 39 peserta contoh lainnya. Tombol Tambah Pengguna, Impor CSV (FR-20), aksi Ubah/Reset/Nonaktifkan per baris, dan manajemen kelompok belajar Angkatan 1 & 2. |
| **L13** | `mockup_l13_tenant_settings.svg`<br>*Pengaturan Lembaga & Standar Evaluasi* | Admin Lembaga | Konfigurasi standar evaluasi: 3 kartu ambang kelulusan KKM rapi (Latihan ≥70, Kelulusan ≥80, Bintang Tiga ≥95), bobot 4 komponen (30%, 25%, 25%, 20%). Fitur unggah logo lembaga, saklar papan peringkat peserta (FR-21), serta penatausahaan nama dan jabatan instruktur dan kepala balai penanda tangan piagam. |
| **L14** | `mockup_l14_tenant_evaluation.svg`<br>*Dasbor Evaluasi & Utilisasi Lembaga* | Pimpinan Lembaga | Dasbor eksekutif Ir. H. Bambang Sutrisno, M.Eng. memantau target pencapaian PRD §3: T1 Peningkatan Pre-to-Post (+50,5% > target 25%), T2 Penyelesaian Misi (83,3% > target 70%), T3 Waktu Tanggap Darurat (28,4 dtk < target 45s), T4 Tingkat Kelulusan (76,2% > target 60%). Utilisasi lisensi 42 peserta aktif / 46 terdaftar / 50 kuota (92% okupansi). |
| **L15** | `mockup_l15_superadmin.svg`<br>*Konsol Super Admin Multi-Tenant* | Super Admin | Konsol pengawasan pusat platform SimSCADA-Air. Menampilkan 2 lembaga: Balai Diklat Air Minum Nusantara (NUS, 50 kursi, paket lengkap: IPA + Distribusi + Terpadu 3 Jalur) dan Pusat Pelatihan Tirta Mandiri (TRM, 50 kursi, paket: IPA + Distribusi 2 Jalur). Manajemen kuota, isolasi database, dan audit trail pusat. |
| **L16** | `mockup_l16_public_verification.svg`<br>*Portal Publik Verifikasi Piagam* | Publik / Rekruter | Portal terbuka tanpa otentikasi login untuk memeriksa keaslian piagam. Menampilkan data sah nomor SSA/NUS/2026/0001 atas nama Andi Kurniawan (Jalur Terpadu, Skor 96, Predikat Sangat Baik, Operator Ahli 3.820 XP, Terbit 15 Maret 2026 oleh Balai Diklat Air Minum Nusantara). Segel otentikasi digital QR dan formulir pencarian nomor piagam lainnya. |

---

## 3. Diagram Alur Kerja Multi-Peran (Swimlane Draw.io)

Alur kerja operasional SimSCADA-Air dipetakan secara detail dalam berkas standar **`public/alur_kerja_simscada.drawio`**, yang memisahkan tanggung jawab berdasarkan 6 swimlane jalur kerja:
1. **Jalur Super Admin:** Provisioning tenant, alokasi paket jalur lisensi (IPA/Distribus/Terpadu), dan monitoring kesehatan platform.
2. **Jalur Admin Lembaga:** Pengaturan KKM & bobot evaluasi, unggah logo resmi, saklar privasi papan peringkat (FR-21), impor pengguna (CSV), dan pembentukan kelompok belajar.
3. **Jalur Pimpinan Lembaga:** Tinjauan metrik keberhasilan institusi (Target KPI T1–T4 PRD §3), utilisasi kursi lisensi (42 peserta aktif / 46 terdaftar / 50 kuota), dan tanda tangan digital piagam kelulusan.
4. **Jalur Instruktur SPAM:** Perancangan skenario gangguan kustom (Authoring Tool FR-23), pemantauan matriks kompetensi kelas (L9), audit rekaman sesi replay (L11), dan validasi pengajuan piagam peserta (L8b).
5. **Jalur Peserta Operator:** Pre-Test diagnostik (L4a), pemilihan jalur materi (L3), penanganan gangguan HMI SCADA 1 Hz (L5), eksplorasi narasi titik kontrol 6 bagian (L5a), evaluasi skor 4 komponen (L6), pengumpulan 8 lencana & papan peringkat (L7), hingga penerbitan piagam kelulusan resmi (L8).
6. **Jalur Publik / Rekruter:** Verifikasi instan keaslian nomor piagam melalui portal publik (L16) dan pemindaian kode QR tanpa login.

---

## 4. Spesifikasi Perhitungan Gamifikasi & Kelulusan (PRD §8)

* **Aturan Bintang:**
  - Skor < 70 = Belum Lulus (Remedial tanpa batas).
  - Skor 70–84 = 1 Bintang (★☆☆).
  - Skor 85–94 = 2 Bintang (★★☆).
  - Skor ≥ 95 = 3 Bintang (★★★, Predikat Sangat Baik).
  - *Misi Kelulusan Ujian (IPA-09 & TRP-02):* Lulus bila skor ≥ 80.
* **Pengali XP Berdasarkan Tingkat Kesulitan Skenario (PRD §7):**
  - Tingkat 1: Pengenalan / Mudah = 1,0x XP.
  - Tingkat 2: Operasi Normal / Sedang = 1,5x XP.
  - Tingkat 3: Gangguan Tunggal / Sulit = 2,0x XP (contoh: IPA-06 Skor 88 × 2,0 = 176 XP).
  - Tingkat 4: Gangguan Berantai / Sangat Sulit = 2,5x XP.
  - Tingkat 5: Misi Kelulusan / Ujian = 3,0x XP.
* **Tangga Jenjang Jabatan Operator:**
  - **Operator Magang:** 0 – 399 XP
  - **Operator Muda:** 400 – 1.199 XP (Contoh: Dimas Wahyu Pratama, 820 XP)
  - **Operator Madya:** 1.200 – 2.499 XP
  - **Operator Utama:** 2.500 – 3.499 XP
  - **Operator Ahli:** ≥ 3.500 XP (Contoh: Andi Kurniawan, 3.820 XP)
* **8 Lencana Resmi PRD §8:**
  1. *Penjelajah Titik Kontrol:* Buka narasi dan pelajari seluruh titik kontrol IPA dan Distribusi.
  2. *Respons Kilat:* Merespons alarm pertama <50% dari batas waktu target skenario (IPA-06: target 60s, respons 25s < 30s).
  3. *Tanpa Alarm Terlewat:* Menyelesaikan sesi tanpa ada alarm yang terlewat atau tidak diakui.
  4. *Penjaga Mutu Air:* Mempertahankan kekeruhan air olahan <1,5 NTU sepanjang sesi evaluasi.
  5. *Penjaga Tekanan:* Menjaga fluktuasi tekanan zona distribusi dalam toleransi ±0,2 bar.
  6. *Tiga Bintang IPA / Distribusi:* Meraih bintang 3 (skor ≥95) pada seluruh misi jalur aktif.
  7. *Hulu ke Hilir:* Lulus seluruh misi jalur Terpadu dari IPA-01 hingga TRP-02.
  8. *Lulus Tanpa Petunjuk:* Lulus Misi Kelulusan Ujian tanpa menggunakan tombol petunjuk (−5 poin).

---
*Dokumen ini merupakan spesifikasi rujukan resmi desain antarmuka dan logika sistem SimSCADA-Air v1.0.*
