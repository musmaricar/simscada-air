# Panduan Pengguna & Narasi Fitur SimSCADA-Air
### Simulator SCADA Gamifikasi untuk Pelatihan Operator Air Minum dari IPA hingga Jaringan Distribusi

---

## 1. Pendahuluan & Gambaran Umum Produk

**SimSCADA-Air** adalah sistem pembelajaran berbasis simulator Supervisory Control and Data Acquisition (SCADA) dengan pendekatan gamifikasi yang dirancang khusus untuk melatih operator air minum. Aplikasi ini mencakup siklus proses lengkap, mulai dari **Instalasi Pengolahan Air (IPA)** hingga **Jaringan Pipa Distribusi Kota**, tanpa menyentuh instalasi fisik yang sedang beroperasi sehingga aman dari risiko kegagalan pasokan nyata.

Aplikasi ini mengadopsi model multi-lembaga (*multi-tenant*), memungkinkan lembaga diklat atau perusahaan air minum (PDAM) menjalankan pelatihan mandiri dengan identitas lembaga, logo, penanda tangan piagam, dan data peserta yang terisolasi secara aman.

---

## 2. Struktur Peran & Akun Pengguna Demo

Aplikasi menyediakan 5 peran pengguna dengan hak akses yang berbeda sesuai matriks kewenangan:

| Peran | Username Demo | Kata Sandi | Deskripsi & Fungsi Utama |
|---|---|---|---|
| **Peserta (Baru)** | `peserta.baru` | `Demo#2026` | Operator baru pada Jalur Terpadu; menampilkan alur dari pre-test dan misi pertama. |
| **Peserta (IPA)** | `peserta.ipa` | `Demo#2026` | Operator pada Jalur IPA yang sudah menyelesaikan sebagian misi (memiliki skor dan bintang). |
| **Peserta (Distribusi)** | `peserta.distribusi` | `Demo#2026` | Operator pada Jalur Distribusi di pertengahan kurikulum. |
| **Peserta (Lulus)** | `peserta.lulus` | `Demo#2026` | Operator yang telah menuntaskan seluruh 17 misi Jalur Terpadu dan piagam kelulusan resminya telah terbit. |
| **Instruktur** | `instruktur.nusantara` | `Demo#2026` | Instruktur senior (Pak Budi) pembina angkatan; memantau nilai peserta, membuka kunci misi, memutar ulang log, dan menyetujui kelulusan. |
| **Admin Lembaga** | `admin.nusantara` | `Demo#2026` | Staf diklat (Rina); mengelola akun pengguna, alokasi kursi lisensi, kelompok, dan pengaturan profil lembaga. |
| **Pimpinan Lembaga** | `pimpinan.nusantara` | `Demo#2026` | Kepala balai diklat (Dr. Bambang); memantau indikator efektivitas pelatihan (T1–T4) dan menandatangani piagam secara digital. |
| **Admin Tirta** | `admin.tirta` | `Demo#2026` | Pengelola Pusat Pelatihan Tirta Mandiri (untuk menguji isolasi data antar-lembaga). |
| **Peserta Tirta** | `peserta.tirta` | `Demo#2026` | Peserta di lembaga Tirta Mandiri yang tidak dapat melihat data dari Balai Diklat Nusantara. |
| **Super Admin** | `superadmin` | `Demo#2026` | Tim pengembang platform; mengelola kuota kursi, masa aktif lisensi, dan paket jalur lembaga. |

---

## 3. Fitur Utama Aplikasi & Cara Menggunakannya

### A. Layar Masuk & Pemilih Akun Cepat (Layar 1 - Login)
- **Fitur:**
  - Pemilih lembaga (*tenant*) untuk menguji isolasi data antara Balai Diklat Air Minum Nusantara dan Pusat Pelatihan Tirta Mandiri.
  - Formulir login manual menggunakan username dan kata sandi.
  - Tombol **1-Click Quick Demo Login** untuk semua 10 akun demo tanpa perlu mengetik kata sandi.
  - Tautan cepat menuju halaman verifikasi piagam publik.
- **Cara Menggunakan:**
  1. Buka halaman utama aplikasi.
  2. Klik salah satu tombol akun demo yang diinginkan (misal: `peserta.baru` atau `instruktur.nusantara`).
  3. Sistem akan langsung mengarahkan Anda ke beranda yang sesuai dengan peran akun tersebut.

---

### B. Beranda Peserta & Dashboard Capaian Belajar (Layar 2)
- **Fitur:**
  - **Kartu Profil & Level:** Menampilkan foto inisial, nama lengkap, nama lembaga, jalur aktif, level operator (Magang, Muda, Madya, Utama, Ahli), total perolehan XP, dan jumlah bintang.
  - **Bilah Kemajuan Level:** Menunjukkan sisa XP yang dibutuhkan untuk naik ke level operator berikutnya.
  - **Rekomendasi Belajar Personal Otomatis:** Sistem menganalisis riwayat kelemahan peserta dan memberikan saran tindakan spesifik (misal: anjuran mengambil Pre-Test, mengulang misi gangguan tertentu karena respons lambat, atau membuka Post-Test).
  - **Ringkasan Kemajuan:** Persentase misi yang telah lulus, nilai perbandingan Pre-Test vs Post-Test, serta status piagam kelulusan.
  - **Peta Misi Berjenjang:** Menyusun seluruh misi dalam 5 tingkat kesulitan secara berurutan. Misi yang belum memenuhi syarat kelulusan misi sebelumnya akan berstatus **Terkunci** (berlambang gembok).
- **Cara Menggunakan:**
  1. Klik tombol **Mulai Pre-Test Sekarang** jika belum mengambil tes awal.
  2. Pada peta misi, klik kartu misi yang berstatus terbuka untuk menuju modul materi dan kuis.
  3. Tinjau perkembangan bintang dan skor terbaik Anda pada masing-masing kartu misi.

---

### C. Pemilihan Jalur Pembelajaran (Layar 3 - Pilih Jalur)
- **Fitur:**
  - Tersedia 3 pilihan jalur:
    1. **Jalur IPA Saja (9 Misi):** Mempelajari unit intake, koagulasi, flokulasi, sedimentasi, filtrasi, dan desinfeksi klorin hingga reservoir.
    2. **Jalur Distribusi Saja (7 Misi):** Mempelajari stasiun pompa distribusi, reservoir, katup PRV, DMA, dan penanganan pipa bocor.
    3. **Jalur Terpadu (17 Misi):** Menggabungkan seluruh unit pengolahan dan distribusi, ditambah skenario gangguan berantai hulu ke hilir (TRP-01) dan Grand Final Ujian (TRP-02).
  - Validasi lisensi lembaga: Jalur yang tidak termasuk dalam paket lembaga akan otomatis dinonaktifkan.
- **Cara Menggunakan:**
  1. Klik menu navigasi **Pilih Jalur** di header atas.
  2. Pelajari silabus dan estimasi durasi pada setiap kartu jalur.
  3. Klik **Pilih Jalur Ini** untuk mengaktifkan kurikulum yang diinginkan. Misi yang sudah lulus sebelumnya akan otomatis diakui nilainya.

---

### D. Modul Materi Teori, Kuis Prasyarat, & Briefing Misi (Layar 4)
- **Fitur:**
  - **Tab 1 - Modul Materi Teori:** Ringkasan prinsip operasional, standar Permenkes No. 2 Tahun 2023 (kekeruhan < 3 NTU, sisa klor 0,2–0,5 mg/L), dan pedoman SOP darurat.
  - **Tab 2 - Kuis Prasyarat (5 Soal):** Kuis pilihan ganda yang wajib diselesaikan sebelum simulator terbuka. Nilai minimal 60 (minimal 3 dari 5 benar) diperlukan untuk membuka akses simulasi. Pembahasan kunci jawaban ditampilkan setelah pengiriman kuis.
  - **Tab 3 - Briefing Misi & Dialog Mentor:** Tokoh mentor senior (Pak Budi) memaparkan situasi lapangan, sasaran operasi, ambang batas kelulusan, dan batas waktu pengerjaan.
- **Cara Menggunakan:**
  1. Baca ringkasan teori pada Tab 1, lalu klik tombol **Lanjut ke Kuis Prasyarat**.
  2. Pilih jawaban pada ke-5 pertanyaan kuis, lalu klik **Kirim Jawaban Kuis**.
  3. Jika nilai ≥ 60, klik **Lanjut ke Briefing Misi**.
  4. Baca instruksi dari Pak Budi, kemudian tekan tombol hijau **Mulai Simulasi SCADA Sekarang**.

---

### E. Simulator SCADA Interaktif (Layar 5)
Simulator merupakan inti dari aplikasi dan terdiri dari beberapa panel terintegrasi:

1. **Bilah Header Simulator:**
   - Menampilkan kode dan nama misi, logo lembaga, penunjuk waktu berjalan (*timer*), tombol **Petunjuk (Hint)**, tombol **Selesai & Evaluasi**, serta tombol batal.

2. **Diagram HMI Mimic SVG Real-Time (Bagian Kiri-Tengah):**
   - **Intake:** Menampilkan sumur hisap air baku sungai, Pompa Intake 1 & 2 dengan animasi aliran air berkedip, status jalan/berhenti/trip, serta pembacaan debit (m³/h) dan kekeruhan (NTU).
   - **Koagulasi:** Injeksi bahan kimia PAC, mixer cepat, pembacaan dosis aktual, dan pH air.
   - **Flokulasi:** Bak bersekat dengan 3 agitator lambat berputar dan indeks flok.
   - **Sedimentasi:** Bak lamella dengan ketebalan selimut lumpur (*sludge level*), kekeruhan air limpasan, dan katup blowdown.
   - **Filtrasi:** Dua unit saringan pasir cepat (Filter 1 & Filter 2) dengan indikator kehilangan tekanan (*headloss*) dan animasi proses pencucian balik (*backwash*).
   - **Desinfeksi:** Injeksi klorin dan pembacaan sisa klor bebas (*free residual chlorine*).
   - **Reservoir:** Tangki penampung air bersih dengan visualisasi ketinggian air dinamis (meter dan persentase).
   - **Pompa Distribusi:** Stasiun pompa transmisi P-101 dan P-102 dengan proteksi trip dan tekanan buang (*discharge pressure*).
   - **Valve & PRV:** Katup pengurang tekanan (PRV) dan katup sekat isolasi darurat pipa bocor.
   - **Titik Pantau Jaringan:** Sensor telemetri tekanan zona perumahan (Zona 1), zona komersial (Zona 2), laju debit aliran, dan residu klorin di ujung pipa terjauh.
   - **Ikon "i" (Informasi):** Berada pada setiap titik kontrol untuk membuka narasi SOP 6 bagian tanpa mengurangi nilai.

3. **Panel Kendali Unit (Bagian Kanan):**
   - Menampilkan tombol operasi sesuai unit yang dipilih: Start/Stop pompa, penggeser setpoint dosis kimia (PAC dan Klorin), pengatur RPM pengaduk, katup kuras lumpur (*blowdown*), tombol pemicu backwash filter, pengaturan setpoint PRV, katup isolasi ruas pipa bocor, serta tombol **Reset Trip Pompa**.

4. **Sistem Alarm Industri (Bagian Bawah):**
   - **Banner Alarm Prioritas Tertinggi:** Menampilkan alarm teratas yang sedang aktif dengan warna prioritas (Kritis: Merah berkedip; Tinggi: Oranye; Sedang: Kuning).
   - **Tabel Daftar Alarm:** Menampilkan stempel waktu kemunculan, prioritas, nama unit, pesan kondisi abnormal, dan tombol **Akui (Acknowledge)** serta **Clear**.
   - **Aturan Auto-Clear:** Alarm otomatis hilang dengan status *Clear* setelah parameter proses kembali ke rentang aman dan bertahan stabil selama 10 detik.
   - **Aturan Manual Clear Bersyarat:** Tombol *Clear* akan ditolak oleh sistem jika ditekan saat penyebab abnormal belum diperbaiki (tindakan ditolak dan dinilai sebagai kesalahan SOP).
   - **Alarm Terkunci (*Latched*):** Pada gangguan pompa trip, alarm tidak bisa di-clear sebelum operator menekan tombol **Reset Trip Pompa** di panel kontrol.

5. **Panel Tren Real-Time (Dapat Dilipat):**
   - Menampilkan grafik garis (*sparkline*) riwayat parameter kunci: Kekeruhan air olahan, sisa klor bebas, level reservoir, dan tekanan jaringan zona pelanggan.

- **Cara Menggunakan Simulator Saat Menangani Gangguan:**
  - *Skenario Lonjakan Kekeruhan:*
    1. Alarm berbunyi dan banner merah muncul. Klik **Akui**.
    2. Klik unit **Koagulasi**, naikkan setpoint dosis PAC (misal: ke 55–60 mg/L).
    3. Periksa **Sedimentasi** dan **Filtrasi**. Tunggu nilai kekeruhan air olahan turun di bawah 3.0 NTU.
    4. Setelah parameter bertahan stabil selama 10 detik, alarm akan *auto-clear*.
  - *Skenario Pompa Trip:*
    1. Alarm Kritis berbunyi. Klik **Akui**.
    2. Pada unit pompa terkait, klik **Start Pompa Cadangan (P2)** agar aliran air tidak kosong.
    3. Tekan tombol merah **Reset Trip Pompa** di panel kendali untuk memulihkan proteksi elektrikal.
    4. Setelah status alarm berubah menjadi *Kondisi Pulih*, tekan tombol **Clear** manual pada tabel alarm.
  - *Skenario Kebocoran Pipa:*
    1. Telemetri menunjukkan debit melonjak drastis dan tekanan Zona 1 drop. Klik **Akui**.
    2. Klik unit **Valve Zona & PRV**, lalu klik tombol merah **Tutup Valve Isolasi Bocor**.
    3. Kebocoran akan terisolasi, semburan air berhenti, dan tekanan zona kembali pulih normal.
  - *Mengakhiri Simulasi:*
    - Setelah kondisi instalasi terkendali dan stabil, klik tombol hijau **Selesai & Evaluasi** di header atas.

---

### F. Layar Hasil & Umpan Balik (Layar 6)
- **Fitur:**
  - **Banner Skor & Bintang:** Menampilkan status kelulusan, total nilai (0–100), perolehan bintang (1–3 bintang), dan tambahan XP.
  - **Rincian Nilai 4 Komponen:**
    1. *Ketepatan Tindakan (Bobot 40%):* Rasio tindakan korektif yang benar sesuai SOP.
    2. *Waktu Respons (Bobot 25%):* Kecepatan penanganan sejak alarm pertama muncul.
    3. *Stabilitas Parameter (Bobot 20%):* Persentase durasi parameter berada di batas aman.
    4. *Penanganan Alarm (Bobot 15%):* Pengakuan alarm, perbaikan, dan ketiadaan penolakan clear.
  - **Pengurang Skor (*Deductions*):** Pemakaian petunjuk (*hint*) mengurangi -5 poin per penggunaan; tindakan tidak aman (*unsafe action*) mengurangi -15 poin per kejadian.
  - **Debriefing Mentor:** Catatan evaluasi langsung dari Pak Budi mengenai performa operator.
  - **Audit Log Tindakan:** Daftar kronologis setiap klik dan perubahan parameter beserta indikasi benar/salah.
- **Cara Menggunakan:**
  1. Evaluasi komponen nilai yang masih rendah.
  2. Klik **Ulangi Misi** jika ingin memperbaiki perolehan bintang, atau klik **Misi Berikutnya** untuk melanjutkan pembelajaran.

---

### G. Koleksi Lencana & Papan Peringkat (Layar 7)
- **Fitur:**
  - **Galeri 8 Lencana Prestasi:**
    1. *Penjelajah Titik Kontrol:* Membuka narasi edukasi semua unit kontrol.
    2. *Respons Kilat:* Bertindak tepat dalam waktu < 20 detik setelah alarm muncul.
    3. *Tanpa Alarm Terlewat:* Menyelesaikan misi gangguan tanpa penolakan clear.
    4. *Penjaga Mutu Air:* Parameter kekeruhan dan sisa klorin stabil sepanjang sesi IPA.
    5. *Penjaga Tekanan:* Tekanan semua zona berada di rentang layanan sepanjang sesi distribusi.
    6. *Tiga Bintang Sempurna:* Mencapai nilai ≥ 95 pada misi evaluasi.
    7. *Ahli Hulu ke Hilir:* Berhasil menuntaskan misi gangguan berantai TRP-01.
    8. *Lulus Tanpa Petunjuk:* Lulus misi tingkat sulit/ujian dengan 0 pemakaian hint.
  - **Papan Peringkat (*Leaderboard*):** Menampilkan urutan peringkat peserta di lembaga yang sama berdasarkan perolehan total XP, dengan filter *Sepanjang Waktu* dan *Minggu Ini*.
- **Cara Menggunakan:**
  1. Klik tab **Lencana Saya** untuk melihat lencana yang telah didapatkan dan syarat membuka lencana yang masih terkunci.
  2. Klik tab **Papan Peringkat** untuk membandingkan posisi prestasi Anda di antara rekan satu angkatan.

---

### H. Piagam Kelulusan Resmi & Cetak PDF (Layar 8)
- **Fitur:**
  - **Daftar Periksa Syarat Kelulusan:**
    1. Semua misi wajib di jalur telah berstatus lulus (minimal 1 bintang).
    2. Misi kelulusan (IPA-09, DST-07, atau TRP-02) lulus dengan skor ≥ 80.
    3. Post-test kelulusan diselesaikan dengan nilai ≥ 70.
    4. Persetujuan instruktur pembina.
  - **Pratinjau Piagam Resmi:** Format A4 mendatar berkop lembaga resmi pembeli, nomor unik piagam (`SSA/<KODE>/<TAHUN>/<URUT>`), predikat kelulusan (*Lulus*, *Lulus dengan Baik*, *Lulus dengan Pujian*), tanda tangan digital Pimpinan Lembaga dan Instruktur Penilai, kode QR verifikasi publik, serta catatan kaki penegasan kompetensi simulator.
  - **Tombol Cetak / Simpan PDF:** Mengaktifkan stylesheet cetak browser beresolusi tinggi tanpa elemen navigasi aplikasi.
- **Cara Menggunakan:**
  1. Jika seluruh syarat terpenuhi, klik tombol hijau **Terbitkan Piagam Kelulusan Resmi**.
  2. Piagam akan terbit seketika. Klik tombol **Cetak / Simpan PDF** untuk mengunduh dokumen piagam resmi dalam format PDF.

---

### I. Konsol Monitoring Instruktur (Layar 9)
- **Fitur:**
  - Daftar seluruh peserta binaan dengan indikator jumlah misi selesai, total bintang, dan status keaktifan.
  - **Penanda Peserta Tertinggal:** Label peringatan otomatis bagi peserta yang mengalami kegagalan berulang agar mendapatkan pendampingan kelas.
  - **Matriks Peserta × Misi:** Tabel sebaran perolehan bintang (1★, 2★, 3★) dari setiap peserta pada masing-masing kode misi.
  - **Aksi Buka Kunci Misi Manual:** Memungkinkan instruktur membuka gembok misi tertentu untuk peserta binaannya tanpa harus menunggu kelulusan misi sebelumnya.
  - **Persetujuan Piagam:** Tombol verifikasi kelulusan sebelum piagam peserta dapat diterbitkan.
- **Cara Menggunakan:**
  1. Masuk sebagai `instruktur.nusantara`.
  2. Gunakan bilah pencarian atau filter kelompok angkatan untuk memilah peserta.
  3. Klik tombol **Buka Kunci Misi** pada baris peserta yang memerlukan izin khusus.
  4. Klik tombol **Log Replay** untuk memeriksa kronologi tindakan sesi peserta.

---

### J. Kelola & Tugaskan Skenario Khusus (Layar 10)
- **Fitur:**
  - Formulir pembuatan skenario gangguan kustom: judul skenario, pilihan jenis dari 5 gangguan utama, waktu picu kemunculan (detik), tingkat kesulitan, pilihan kelompok sasaran, dan deskripsi pengantar situasi.
  - Daftar arsip skenario aktif milik lembaga.
- **Cara Menggunakan:**
  1. Masuk sebagai Instruktur atau Admin Lembaga, lalu buka menu **Kelola Skenario**.
  2. Isi formulir parameter gangguan, lalu klik **Simpan & Tugaskan Skenario**. Skenario baru akan langsung tercatat dan ditugaskan ke kelompok binaan.

---

### K. Putar Ulang Sesi Simulasi / Session Replay (Layar 11)
- **Fitur:**
  - Bilah geser linimasa (*timeline scrubber*) yang dapat digeser manual dari detik 0 hingga akhir misi.
  - Tombol putar otomatis (*playback speed 3x*) dan tombol jeda.
  - Peninjauan sinkron antara aksi yang dilakukan operator pada detik tertentu dengan kemunculan dan penanganan alarm.
- **Cara Menggunakan:**
  1. Pilih nama peserta yang ingin diaudit pada menu dropdown di sudut kanan atas.
  2. Geser bilah *scrubber* ke detik terjadinya gangguan, atau tekan tombol **Putar Sesi (3x Speed)**.
  3. Amati urutan tindakan operator pada kolom sebelah kiri dan respons alarm pada kolom sebelah kanan.

---

### L. Kelola Pengguna & Kelompok (Layar 12)
- **Fitur:**
  - Pemantauan alokasi lisensi: Total kursi lisensi, kursi yang telah digunakan oleh peserta, dan sisa kuota yang tersedia.
  - Daftar seluruh akun pengguna terdaftar di lembaga beserta peran dan waktu login terakhir.
  - Formulir penambahan akun pengguna baru (*Peserta*, *Instruktur*, atau *Admin Lembaga*).
  - Manajemen kelompok/angkatan pelatihan.
- **Cara Menggunakan:**
  1. Masuk sebagai `admin.nusantara`. Buka menu **Pengguna & Kelompok**.
  2. Klik **Tambah Akun Pengguna** untuk mendaftarkan operator baru ke dalam kelompok angkatan.
  3. Perhatikan sisa kuota kursi peserta agar tidak melampaui batas lisensi.

---

### M. Pengaturan Lembaga Pembeli (Layar 13)
- **Fitur:**
  - Pengaturan identitas lembaga: Nama resmi lembaga, singkatan, alamat kantor, dan kontak resmi.
  - Pengaturan penanda tangan piagam: Nama dan jabatan pimpinan lembaga serta instruktur penilai.
  - Pengaturan ambang batas kelulusan misi biasa dan misi kelulusan.
  - Saklar pengaktifan/penonaktifan fitur papan peringkat (*leaderboard*).
  - **Editor Catatan SOP Lokal Lembaga (FR-30):** Mengisi instruksi SOP khusus instalasi milik lembaga (pada unit Intake, Koagulasi, dan Filtrasi) yang akan otomatis disisipkan ke dalam jendela pop-up narasi edukasi simulator.
- **Cara Menggunakan:**
  1. Masuk sebagai `admin.nusantara`, lalu buka menu **Pengaturan Lembaga**.
  2. Ubah data profil, nama pejabat penanda tangan, atau tambahkan catatan SOP lokal.
  3. Klik **Simpan Konfigurasi Lembaga** untuk menerapkan perubahan ke seluruh sistem.

---

### N. Dashboard Evaluasi Eksekutif (Layar 14)
- **Fitur:**
  - **Pengukuran Langsung Indikator Target PRD:**
    - **T1 - Peningkatan Kompetensi:** Kenaikan rata-rata nilai dari Pre-Test ke Post-Test (Target: ≥ 25%).
    - **T2 - Penguasaan 5 Gangguan Utama:** Persentase kelulusan skenario lonjakan kekeruhan, pompa trip, dosis klor, kebocoran pipa, dan tekanan drop (Target: ≥ 80%).
    - **T3 - Waktu Menuju Lulus:** Rata-rata hari orientasi peserta hingga siap bertugas (Target: ~2 bulan).
    - **T4 - Tingkat Kelulusan:** Rasio penerbitan piagam kelulusan dibanding total peserta aktif (Target: ≥ 70%).
  - **Bilah Pemakaian Lisensi:** Persentase kursi yang terpakai dan masa berlaku paket.
  - **Daftar 5 Misi Paling Sulit:** Menganalisis misi dengan tingkat kegagalan percobaan pertama tertinggi sebagai bahan evaluasi instruktur.
  - **Daftar Kesalahan Operasional Terbanyak:** Menginventarisasi tindakan tidak aman dan kekeliruan penanganan alarm untuk perbaikan SOP kerja nyata.
  - **Ekspor Dokumen:** Tombol ekspor data rincian peserta ke format **Excel (CSV)** dan tombol cetak **Ringkasan Eksekutif PDF** berkop resmi lembaga.
- **Cara Menggunakan:**
  1. Masuk sebagai `pimpinan.nusantara` atau `admin.nusantara`, lalu buka menu **Dashboard Evaluasi (T1-T4)**.
  2. Gunakan dropdown filter kelompok atau jalur untuk melihat analisis spesifik.
  3. Klik **Ekspor Data Excel (CSV)** untuk mengunduh laporan mentah, atau klik **Cetak Ringkasan Eksekutif** untuk mencetak laporan ke pimpinan.

---

### O. Konsol Super Admin Platform (Layar 15)
- **Fitur:**
  - Tinjauan seluruh lembaga pembeli yang terdaftar di platform SimSCADA-Air.
  - Pemantauan alokasi kuota kursi per lembaga disertai tanda peringatan otomatis bila pemakaian kursi mencapai ≥ 90%.
  - Modal pengubahan alokasi lisensi: Menambah/mengurangi kuota kursi, mengubah tanggal masa berlaku lisensi, dan mengaktifkan/menonaktifkan paket jalur (IPA, Distribusi, Terpadu).
- **Cara Menggunakan:**
  1. Masuk sebagai `superadmin`. Buka menu **Kelola Lembaga & Lisensi**.
  2. Pada kartu lembaga yang dituju, klik **Ubah Alokasi Lisensi**.
  3. Sesuaikan kuota kursi atau perpanjang tanggal masa berlaku, lalu klik **Simpan Perubahan**.

---

### P. Verifikasi Keaslian Piagam Publik (Layar 16)
- **Fitur:**
  - Halaman publik mandiri yang dapat diakses oleh siapa saja tanpa perlu login ke dalam aplikasi.
  - Kotak pencarian nomor registrasi piagam resmi (format: `SSA/<KODE>/<TAHUN>/<URUT>`).
  - **Status Validitas:**
    - Jika nomor sah: Menampilkan lencana hijau **PIAGAM SAH & TERVERIFIKASI**, nama peserta, lembaga penerbit, jalur kompetensi, predikat kelulusan, nilai rata-rata, dan tanggal terbit.
    - Jika piagam telah dicabut: Menampilkan lencana merah **PIAGAM TELAH DICABUT** disertai tanggal pencabutan dan alasan resmi pencabutan.
    - Jika nomor tidak terdaftar: Menampilkan peringatan bahwa nomor piagam tidak ditemukan dalam basis data resmi.
  - **Aksi Pencabutan (*Revocation*):** Pengguna dengan peran Admin Lembaga atau Super Admin dapat mencabut piagam yang salah terbit dengan mencantumkan alasan resmi yang akan tersimpan dalam jejak audit publik.
- **Cara Menggunakan:**
  1. Klik tautan **Cek Piagam Publik (L16)** pada bilah navigasi header.
  2. Masukkan nomor piagam (misal: `SSA/BDAN/2026/001`) pada kolom pencarian, lalu klik **Verifikasi Sekarang**.
  3. Tinjau hasil keabsahan data kelulusan yang ditampilkan di layar.

---

## 4. Alur Demonstrasi Cepat (Rekomendasi 15 Menit)

Untuk menguji seluruh alur kerja sistem secara menyeluruh, disarankan mengikuti urutan berikut:

1. **Masuk sebagai Operator Baru (`peserta.baru`):**
   - Ambil Pre-Test singkat (5 soal).
   - Buka misi pertama `IPA-01`, pelajari materi, jawab kuis prasyarat, dan dengarkan briefing mentor.
   - Di simulator, klik ikon **i** pada setiap titik kontrol untuk membuka narasi SOP dan mendapatkan lencana *Penjelajah Titik Kontrol*.
2. **Masuk sebagai Operator Jalur IPA (`peserta.ipa`):**
   - Jalankan misi gangguan `IPA-06` (lonjakan kekeruhan air baku 180 NTU). Amati alarm, akui alarm, naikkan dosis PAC, dan perhatikan alarm *auto-clear* setelah kondisi jernih stabil selama 10 detik.
   - Lanjutkan ke misi `IPA-07` (pompa intake trip). Alihkan ke pompa cadangan, klik tombol *Reset Trip Pompa*, lalu *clear* alarm secara manual.
3. **Masuk sebagai Peserta Lulus (`peserta.lulus`):**
   - Buka menu **Piagam Kelulusan**, lalu lihat piagam resmi yang telah terbit.
   - Buka halaman **Verifikasi Publik (L16)** dan buktikan nomor piagam terdaftar sah.
4. **Masuk sebagai Instruktur (`instruktur.nusantara`):**
   - Buka menu **Putar Ulang Log**, pilih peserta, dan putar rekaman sesi simulasi dengan fitur *scrubber* linimasa.
   - Buat skenario gangguan baru di menu **Kelola Skenario**.
5. **Masuk sebagai Pimpinan Lembaga (`pimpinan.nusantara`):**
   - Buka **Dashboard Evaluasi** dan amati pencapaian indikator T1 (kenaikan kompetensi), T2 (penguasaan 5 gangguan), T3, dan T4.
   - Coba ekspor laporan ringkasan eksekutif dan lembar kerja CSV.
6. **Masuk sebagai Admin Tirta (`admin.tirta`):**
   - Buktikan bahwa data Balai Diklat Nusantara sama sekali tidak tampak pada akun lembaga Tirta Mandiri (terisolasi penuh).
