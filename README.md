# 🧠 BrainScan AI Frontend

Frontend aplikasi BrainScan AI untuk deteksi tumor otak berbasis Artificial Intelligence menggunakan Next.js, TypeScript, Tailwind CSS, dan Supabase.

## 🚀 Fitur

- Deteksi Tumor Otak
- Upload Gambar MRI
- Bounding Box Area Tumor
- Riwayat Deteksi
- Login & Register
- Dark Mode
- Download PDF Hasil Analisis
- AI Health Chatbot
- Compare Original vs Detection
- Responsive Design

---

## 📦 Clone Repository

```bash
git clone https://github.com/USERNAME/brainscan-ai-frontend.git
```

Masuk ke folder project:

```bash
cd brainscan-ai-frontend
```

---

## 📥 Install Dependencies

```bash
npm install
```

---

## ⚙️ Konfigurasi Environment

Buat file:

```bash
.env.local
```

Isi dengan:

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_KEY
```

> Backend API dan model AI disediakan secara terpisah oleh pengembang.

---

## ▶️ Menjalankan Project

```bash
npm run dev
```

Aplikasi dapat diakses melalui:

```txt
http://localhost:3000
```

---

## 🛠️ Teknologi yang Digunakan

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Supabase Client
- Framer Motion
- Lucide React
- Sonner
- jsPDF

### Database & Storage

- Supabase Authentication
- Supabase Database
- Supabase Storage

---

## 📂 Struktur Project

```txt
src/
│
├── app/
│   ├── login/
│   ├── register/
│   ├── riwayat/
│   ├── informasi/
│   └── tentang/
│
├── components/
│
├── features/
│   ├── detection/
│   ├── history/
│   ├── auth/
│   └── chatbot/
│
├── lib/
│
└── utils/
```

---

## ⚠️ Catatan

- Repository ini hanya berisi frontend aplikasi.
- Backend API dan model AI tidak disertakan dalam repository.
- Diperlukan konfigurasi Supabase dan Backend URL agar aplikasi berjalan dengan baik.
- Hasil deteksi AI bukan diagnosis medis resmi dan tidak menggantikan konsultasi dokter.

---

## 👨‍💻 Developer

BrainScan AI - Sistem Deteksi Tumor Otak Berbasis AI menggunakan YOLOv8 dan Deep Learning.
