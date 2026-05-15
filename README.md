# BrainScan AI - Frontend

BrainScan AI adalah website deteksi tumor otak berbasis AI.  
Repository ini hanya berisi bagian **frontend** yang dibuat menggunakan Next.js.

Backend Python/FastAPI dan model YOLO tidak disertakan di repository ini.

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

## Cara Clone Project

### 1. Clone repository

```bash
git clone https://github.com/USERNAME/brainscan-ai-frontend.git

### 2. Masuk ke folder project
```bash
cd brainscan-ai-frontend

### 3. Install dependencies
```bash
npm install

### 4. Buat file environment
```bash
.env.local
Lalu isi seperti berikut:
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
NEXT_PUBLIC_SUPABASE_URL=isi_url_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=isi_publishable_key_supabase

### 5. Jalankan Frontend
```bash
npm run dev
http://localhost:3000

