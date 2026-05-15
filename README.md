# BrainScan AI - Frontend

BrainScan AI adalah website deteksi tumor otak berbasis AI.  
Repository ini hanya berisi bagian **frontend** yang dibuat menggunakan Next.js.


---

## Teknologi yang Digunakan

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Framer Motion
- Lucide React
- jsPDF

---

## Cara Clone dan Menjalankan Project

### 1. Clone repository

```bash
git clone https://github.com/USERNAME/brainscan-ai-frontend.git
```

Ganti `USERNAME` dengan username GitHub pemilik repository.

---

### 2. Masuk ke folder project

```bash
cd brainscan-ai-frontend
```

---

### 3. Install dependencies

```bash
npm install
```

---

### 4. Buat file environment

Buat file baru bernama:

```bash
.env.local
```

Lalu isi file `.env.local` seperti berikut:

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SUPABASE_URL=isi_url_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=isi_publishable_key_supabase
```

Contoh:

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxx
```

---

### 5. Jalankan frontend

```bash
npm run dev
```

Buka browser:

```txt
http://localhost:3000
```

---

## Catatan Backend

Agar fitur deteksi berjalan, backend harus aktif terlebih dahulu.

Backend berjalan di:

```txt
http://127.0.0.1:8000
```

Pastikan isi `.env.local` bagian backend sesuai:

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```
