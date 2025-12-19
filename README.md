# Situs Penyewaan Sound System — Modes Entertainment

Petunjuk singkat menjalankan dan menambahkan foto ke website lokal ini.

1. Menjalankan situs

- Buka file `index.html` di browser Anda (klik ganda atau gunakan `Live Server` di VS Code).

2. Menambahkan foto peralatan

- Masukkan foto Anda ke folder `img/`.
- Default galeri menampilkan 6 gambar. Untuk mengganti, beri nama file gambar sesuai keinginan dan ganti reference di `index.html` atau ganti file `img/logo.jfif` sementara.
- Contoh nama yang bisa digunakan: `photo1.jpg`, `photo2.jpg`, … `photo6.jpg` dan ubah src pada elemen `<img>` di bagian Galeri.

3. Login (mock)

- Halaman `login.html` menggunakan autentikasi klien sederhana (mock). Kredensial contoh: `admin` / `admin123`.
- Untuk autentikasi nyata, integrasikan backend (mis. PHP/Node/Python) dan ganti `js/auth.js` agar melakukan request ke server.

4. Kustomisasi cepat

- Ubah teks, nomor kontak, dan email di `index.html`.
- Gaya ada di `css/style.css`.

Favicon: situs sekarang menggunakan `img/logo.jpeg` sebagai favicon (ditautkan di `index.html` dan `login.html`).

Jika Anda mau, saya bisa:

- Menambahkan galeri otomatis (preview dari semua file di folder `img/`) — perlu backend atau script build.
- Menambahkan sistem pemesanan sederhana (form + penyimpanan) atau integrasi WhatsApp API.

## VS Code — konfigurasi cepat

- Instal ekstensi yang direkomendasikan (buka Command Palette → `Extensions: Install Extensions` atau gunakan terminal):

  - `ritwickdey.LiveServer` (Live Server)
  - `esbenp.prettier-vscode` (Prettier)
  - `dbaeumer.vscode-eslint` (ESLint)

- File konfigurasi sudah ditambahkan ke proyek:
  - `.vscode/settings.json` — format on save (Prettier) + Live Server port
  - `.vscode/extensions.json` — rekomendasi ekstensi
  - `.prettierrc`, `.prettierignore` — Prettier config
  - `.eslintrc.json` — ESLint config
  - `.editorconfig` — aturan indentasi & newline

Cara cepat memakai:

1. Buka proyek di VS Code.
2. Install ekstensi yang direkomendasikan (ikon Extensions → klik Install Recommended).
3. Buka `index.html` → klik kanan → `Open with Live Server` untuk melihat halaman di localhost.
4. Edit file; Prettier akan otomatis memformat saat simpan.
