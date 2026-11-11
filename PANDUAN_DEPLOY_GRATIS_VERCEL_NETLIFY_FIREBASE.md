# PANDUAN LENGKAP DEPLOY GRATIS APLIKASI SimSCADA-Air
*(Vercel, Netlify, dan Firebase Hosting)*

Panduan ini berisi panduan langkah demi langkah untuk mempublikasikan (*deploy*) aplikasi **SimSCADA-Air** secara **100% gratis** menggunakan tiga penyedia hosting terpopuler: **Vercel**, **Netlify**, dan **Firebase Hosting**.

Aplikasi ini menggunakan arsitektur **React 19 + Vite + TypeScript + Tailwind CSS** (Pure Frontend SPA). Seluruh logika simulasi berjalan di sisi peramban klien (*client-side*), sehingga sangat ringan, cepat, dan kompatibel dengan paket gratis (*Hobby / Free Tier*) di semua platform tersebut.

---

## 📋 Ringkasan Parameter Konfigurasi Build

Gunakan parameter berikut di platform hosting mana pun yang Anda pilih:

| Parameter | Nilai | Catatan |
| :--- | :--- | :--- |
| **Framework Preset** | `Vite` | Dipilih otomatis oleh sebagian besar platform |
| **Root Directory** | `./` (akar proyek) | Lokasi berkas `package.json` |
| **Build Command** | `npm run build` | Menghasilkan folder bundel produksi |
| **Output Directory** | `dist` | Folder tempat hasil kompilasi disimpan |
| **Node.js Version** | `18.x` atau `20.x` | Versi LTS standar yang direkomendasikan |

> **Catatan:** Berkas konfigurasi pendukung routing SPA (`vercel.json`, `public/_redirects`, dan `firebase.json`) sudah disertakan di dalam proyek ini sehingga halaman web tidak akan mengalami *404 Not Found* saat pengguna melakukan *refresh* peramban.

---

## 🛠️ Langkah Awal: Menyiapkan Kode Sumber

Sebelum melakukan deploy, Anda perlu menyiapkan berkas proyek dari Google AI Studio:

### Opsi A: Ekspor ke GitHub (Sangat Disarankan)
1. Pada antarmuka Google AI Studio, klik ikon menu atau opsi **Export to GitHub**.
2. Berikan nama repositori baru di akun GitHub Anda (misal: `simscada-air`).
3. Setelah proses ekspor selesai, repositori GitHub Anda siap dihubungkan ke Vercel atau Netlify untuk *auto-deploy* setiap kali ada pembaruan.

### Opsi B: Unduh Berkas ZIP
1. Klik opsi **Download / Export ZIP** pada Google AI Studio.
2. Ekstrak berkas ZIP tersebut ke komputer lokal Anda.

---

## 🚀 OPSI 1: Deploy ke Vercel (Direkomendasikan - Paling Cepat)

Vercel memberikan performa CDN global terbaik, sertifikat SSL HTTPS gratis otomatis, serta domain kustom tanpa biaya.

### Cara 1.A: Melalui Antarmuka Web Vercel (GitHub Integration)
1. Buka situs [https://vercel.com](https://vercel.com) dan masuk menggunakan akun GitHub Anda.
2. Pada dasbor utama, klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Cari dan pilih repositori `simscada-air` yang telah Anda ekspor ke GitHub, lalu klik **"Import"**.
4. Pada halaman konfigurasi proyek (*Configure Project*):
   - **Project Name:** `simscada-air` (atau nama pilihan Anda).
   - **Framework Preset:** Pastikan terpilih **Vite**.
   - **Root Directory:** Biarkan `./`.
   - **Build and Output Settings:** Biarkan nilai bawaan (*Build Command:* `npm run build`, *Output Directory:* `dist`).
5. Klik tombol **"Deploy"**.
6. Tunggu sekitar 30–60 detik hingga animasi balon udara selesai. Aplikasi Anda kini aktif dengan domain gratis seperti:  
   `https://simscada-air.vercel.app`

### Cara 1.B: Melalui Terminal (Vercel CLI)
Jika Anda memiliki Node.js di komputer:
```bash
# 1. Masuk ke folder proyek
cd simscada-air

# 2. Pasang Vercel CLI secara global (jika belum ada)
npm install -g vercel

# 3. Jalankan perintah deploy
vercel

# 4. Ikuti instruksi di layar (tekan Enter untuk opsi bawaan).
# Untuk merilis ke produksi permanen:
vercel --prod
```

---

## 🌐 OPSI 2: Deploy ke Netlify

Netlify menyediakan dua metode: menghubungkan ke repositori GitHub atau menggunakan fitur **Drag & Drop** folder `dist` secara langsung tanpa perlu akun Git.

### Cara 2.A: Metode Drag & Drop (Tanpa Git / Paling Sederhana)
Metode ini cocok jika Anda hanya ingin mengunggah hasil build dari komputer lokal:
1. Buka terminal di folder proyek Anda di komputer lokal dan jalankan:
   ```bash
   npm install
   npm run build
   ```
2. Perintah di atas akan menghasilkan folder bernama `dist`.
3. Buka [https://app.netlify.com/drop](https://app.netlify.com/drop) dan masuk ke akun Netlify Anda.
4. Tarik (*drag*) folder `dist` dari komputer Anda dan lepaskan (*drop*) ke area kotak browser Netlify.
5. Dalam beberapa detik, Netlify akan langsung menerbitkan aplikasi Anda dengan URL aktif gratis (misal: `https://brave-curie-xxxxxx.netlify.app`).
6. Anda dapat mengubah nama subdomain tersebut di menu **Site configuration** > **Change site name**.

### Cara 2.B: Melalui Antarmuka Web Netlify (GitHub Integration)
1. Buka [https://app.netlify.com](https://app.netlify.com).
2. Klik tombol **"Add new site"** > **"Import an existing project"**.
3. Pilih **GitHub** dan berikan izin akses ke repositori `simscada-air`.
4. Konfigurasikan pengaturan build:
   - **Branch to deploy:** `main` (atau `master`)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Klik **"Deploy site"**. Dalam waktu kurang dari 1 menit, website Anda telah siap diakses secara publik.

---

## 🔥 OPSI 3: Deploy ke Firebase Hosting

Firebase Hosting sangat cocok jika Anda ingin tetap berada di dalam ekosistem Google Cloud dengan kecepatan CDN Google.

### Langkah-langkah:
1. **Buat Proyek di Firebase Console:**
   - Kunjungi [https://console.firebase.google.com](https://console.firebase.google.com).
   - Klik **"Add project"** / **"Tambah proyek"**, beri nama proyek (misal: `simscada-air-diklat`), lalu selesaikan pembuatan proyek.

2. **Pasang Firebase CLI di Komputer Anda:**
   ```bash
   npm install -g firebase-tools
   ```

3. **Login ke Akun Google Anda:**
   ```bash
   firebase login
   ```
   *(Peramban akan terbuka untuk meminta persetujuan login akun Google Anda).*

4. **Inisialisasi Proyek di Folder Aplikasi:**
   Buka terminal di dalam folder proyek Anda, lalu jalankan:
   ```bash
   firebase init hosting
   ```
   Saat muncul pertanyaan di terminal:
   - *Please select an option:* Pilih **Use an existing project**.
   - Pilih proyek Firebase yang tadi Anda buat di Firebase Console.
   - *What do you want to use as your public directory?* Ketik: `dist`
   - *Configure as a single-page app (rewrite all urls to /index.html)?* Ketik: `Yes` (atau tekan `y`)
   - *Set up automatic builds and deploys with GitHub?* Ketik: `No` (opsional)
   - *File dist/index.html already exists. Overwrite?* Ketik: `No` (atau tekan `n`)

5. **Build dan Deploy:**
   ```bash
   # Jalankan build produksi
   npm run build

   # Deploy ke server Firebase
   firebase deploy --only hosting
   ```

6. Setelah proses upload selesai, Firebase akan menampilkan tautan publik aplikasi Anda, misalnya:  
   `https://simscada-air-diklat.web.app` atau `https://simscada-air-diklat.firebaseapp.com`.

---

## 🛡️ Verifikasi Pasca-Deploy (Checklist Pengujian)

Setelah aplikasi berhasil di-deploy ke salah satu layanan di atas, lakukan pengujian singkat berikut:
1. **Buka URL Aplikasi:** Pastikan antarmuka SimSCADA-Air tampil dengan sempurna (warna, tipografi Tailwind, ikon Lucide).
2. **Uji Suara & Interaksi Audio:** Klik tombol speaker di header (Zona 3) dan klik tombol kontrol simulator untuk memastikan audio synthesizer berjalan normal.
3. **Uji Routing / Refresh:** Buka salah satu halaman (misal: Dasbor Instruktur atau Sertifikat), lalu tekan tombol Refresh (`F5`) pada peramban. Halaman harus tetap terbuka normal tanpa muncul error 404.
4. **Uji Simulasi SCADA:** Masuk ke menu Simulasi, jalankan pompa atau ubah parameter dosis koagulan, dan amati grafik tren 10-menit merespons secara real-time.

---

## ❓ FAQ & Troubleshooting

- **Tanya: Mengapa saat di-refresh muncul error 404 Not Found di hosting saya?**  
  *Jawab:* Karena aplikasi berbasis SPA (*Single Page Application*). Pastikan berkas `vercel.json` (untuk Vercel), `public/_redirects` (untuk Netlify), atau aturan rewrite di `firebase.json` (untuk Firebase) tidak terhapus. Berkas-berkas ini mengarahkan semua rute kembali ke `index.html`.

- **Tanya: Apakah saya memerlukan kartu kredit untuk mendaftar di Vercel atau Netlify?**  
  *Jawab:* Tidak. Paket *Hobby / Personal* di Vercel dan Netlify adalah 100% gratis selamanya tanpa perlu memasukkan informasi kartu kredit.
