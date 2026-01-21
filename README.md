# 🌟 Portfolio Website dengan Admin Dashboard

Website portfolio modern dan profesional untuk Frontend Developer dengan sistem Admin Dashboard (CMS) terintegrasi untuk mengelola semua konten secara dinamis.

## ✨ Apa yang Sudah Dibuat?

### 🎨 Portfolio Publik (Frontend)
Website portfolio lengkap dengan 7 section utama:

1. **Hero Section** - Tampilan pembuka dengan foto profil, status ketersediaan, dan tombol CTA
2. **About Section** - Informasi tentang diri Anda dengan kartu info cepat
3. **Skills Section** - Keahlian dikelompokkan berdasarkan kategori dengan progress bar
4. **Experience Section** - Timeline pengalaman kerja dengan detail lengkap
5. **Certificates Section** - Showcase sertifikat dan penghargaan dalam grid
6. **Projects Section** - Portfolio proyek dengan fitur "Featured"
7. **Contact Section** - Form kontak dan informasi kontak lengkap
8. **Footer** - Links navigasi dan social media

**Fitur Tambahan:**
- ✅ Dark/Light Mode dengan toggle
- ✅ Responsive untuk semua device (mobile, tablet, desktop)
- ✅ Smooth animations dengan Framer Motion
- ✅ Smooth scroll navigation
- ✅ SEO optimized
- ✅ Fast loading dengan lazy loading

### 🔐 Admin Dashboard (CMS)
Dashboard admin lengkap dengan CRUD untuk semua data:

1. **Dashboard Overview** - Statistik dan quick tips
2. **Profile Manager** - Kelola info personal (nama, bio, kontak, foto, resume)
3. **Skills Manager** - Tambah/Edit/Hapus skills dengan level dan kategori
4. **Experience Manager** - Kelola riwayat pekerjaan dengan teknologi yang digunakan
5. **Certificates Manager** - Kelola sertifikat dengan credential ID dan URL
6. **Projects Manager** - Kelola portfolio project dengan demo dan GitHub links
7. **Status Manager** - Update status ketersediaan untuk peluang kerja
8. **Social Links Manager** - Kelola link social media (GitHub, LinkedIn, dll)

**Fitur Admin:**
- ✅ Login system sederhana (Username: "Administrator", Password: "Paulus21")
- ✅ Protected routes dengan redirect otomatis
- ✅ Responsive sidebar navigation
- ✅ Modal forms untuk create/edit
- ✅ Confirmation dialogs untuk delete
- ✅ Real-time updates ke database
- ✅ Toast notifications untuk feedback
- ✅ Session persistence dengan localStorage

## 🚀 Cara Menggunakan

### 1️⃣ Setup Database (WAJIB!)

**Langkah-langkah:**
1. Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Buka tab **SQL Editor**
4. Copy SEMUA code SQL dari file `/DATABASE_SCHEMA.md`
5. Paste dan klik **Run**
6. Verifikasi di **Table Editor** bahwa 7 tabel sudah terbuat

**Tables yang dibuat:**
- `profiles` - Info profil
- `skills` - Daftar keahlian
- `experiences` - Riwayat pekerjaan
- `certificates` - Sertifikat
- `projects` - Portfolio projects
- `status` - Status ketersediaan
- `social_links` - Link social media

### 2️⃣ Akses Website

**Portfolio Publik:**
- Buka browser dan akses: `http://localhost:5173/`
- Lihat portfolio Anda yang sudah jadi!
- Toggle dark/light mode dengan icon sun/moon
- Scroll atau klik navigation untuk berpindah section

**Admin Dashboard:**
1. Akses: `http://localhost:5173/admin/login`
2. Login dengan:
   - **Username**: Administrator
   - **Password**: Paulus21
3. Setelah login, Anda akan masuk ke dashboard
4. Gunakan sidebar untuk navigasi ke section yang ingin dikelola

### 3️⃣ Kelola Konten

**Profile:**
- Klik "Profile" di sidebar
- Update nama, title, bio, email, phone, location
- Tambahkan URL avatar (foto profil)
- Tambahkan URL resume (file PDF resume Anda)
- Klik "Save Changes"

**Skills:**
- Klik "Skills" di sidebar
- Klik "Add Skill" untuk tambah skill baru
- Isi: Nama skill, Kategori (Frontend/Backend/Tools), Level (0-100%)
- Skills akan dikelompokkan otomatis berdasarkan kategori
- Edit atau hapus skill yang sudah ada

**Experience:**
- Klik "Experience" di sidebar
- Klik "Add Experience" untuk tambah pengalaman kerja
- Isi: Company, Position, Description, Start Date
- Centang "Currently working here" jika masih bekerja
- Tambahkan technologies (pisahkan dengan koma)
- Timeline akan muncul otomatis di portfolio

**Certificates:**
- Klik "Certificates" di sidebar
- Tambah sertifikat dengan Title, Issuer, Issue Date
- Optional: Credential ID, URL verifikasi, gambar sertifikat

**Projects:**
- Klik "Projects" di sidebar
- Tambah project dengan Title, Description
- Tambahkan Demo URL dan GitHub URL
- Upload gambar project
- Centang "Featured" untuk project penting
- Tambahkan technologies yang digunakan

**Status:**
- Klik "Status" di sidebar
- Centang checkbox jika tersedia untuk peluang kerja
- Tulis status message (contoh: "Available for new opportunities")
- Status akan muncul di Hero section dengan indicator warna

**Social Links:**
- Klik "Social Links" di sidebar
- Tambah platform (GitHub, LinkedIn, Twitter, dll)
- Masukkan URL lengkap
- Links akan muncul di Hero dan Footer

## 📁 Struktur Project

```
portfolio-website/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── admin/           # Komponen Admin Dashboard
│   │   │   │   ├── DashboardOverview.tsx
│   │   │   │   ├── ProfileManager.tsx
│   │   │   │   ├── SkillsManager.tsx
│   │   │   │   ├── ExperienceManager.tsx
│   │   │   │   ├── CertificatesManager.tsx
│   │   │   │   ├── ProjectsManager.tsx
│   │   │   │   ├── StatusManager.tsx
│   │   │   │   └── SocialLinksManager.tsx
│   │   │   ├── portfolio/       # Komponen Portfolio Publik
│   │   │   │   ├── Navigation.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── About.tsx
│   │   │   │   ├── Skills.tsx
│   │   │   │   ├── Experience.tsx
│   │   │   │   ├── Certificates.tsx
│   │   │   │   ├── Projects.tsx
│   │   │   │   ├── Contact.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── ui/              # UI Components Library
│   │   └── App.tsx              # Main app dengan routing
│   ├── contexts/
│   │   ├── AdminContext.tsx     # Context untuk admin auth
│   │   └── ThemeContext.tsx     # Context untuk dark/light mode
│   ├── lib/
│   │   └── supabase.ts          # Supabase client config
│   ├── pages/
│   │   ├── Portfolio.tsx        # Halaman portfolio publik
│   │   ├── AdminLogin.tsx       # Halaman login admin
│   │   └── AdminDashboard.tsx   # Halaman dashboard admin
│   ├── styles/                  # Global styles
│   └── types/
│       └── database.ts          # TypeScript types untuk database
├── supabase/
│   └── functions/server/        # Backend Edge Functions
├── DATABASE_SCHEMA.md           # SQL untuk setup database
├── SETUP_GUIDE.md              # Panduan setup lengkap (English)
├── ROUTES.md                    # Dokumentasi routing
└── README.md                    # File ini
```

## 🛠️ Tech Stack

**Frontend:**
- React 18.3.1 + TypeScript
- Vite 6.3.5 (Build tool)
- React Router DOM 7.12.0 (Routing)
- Tailwind CSS v4.1.12 (Styling)
- Framer Motion 12.23.24 (Animations)

**Backend & Database:**
- Supabase (PostgreSQL database)
- Supabase Edge Functions (Server)

**UI Libraries:**
- Radix UI (Primitive components)
- Lucide React (Icons)
- Sonner (Toast notifications)
- React Hook Form (Forms)
- date-fns (Date formatting)

## 🔑 Credentials

**Admin Dashboard:**
- Username: `Administrator` (read-only, tidak bisa diubah)
- Password: `Paulus21`

**Database:**
- Menggunakan Supabase credentials yang sudah Anda konfigurasi
- Environment variables: `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`

## 📱 Responsive Design

Website fully responsive untuk:
- **Mobile**: < 768px (Navigation berubah jadi hamburger menu)
- **Tablet**: 768px - 1024px (Layout 2 kolom)
- **Desktop**: > 1024px (Layout penuh dengan sidebar)

## 🎨 Customization

**Warna:**
- Primary: Blue (600-700)
- Secondary: Purple (600-700)
- Success: Green (untuk status available)
- Danger: Red (untuk delete actions)
- Dark mode: Slate (800-900 background)

**Font:**
- Menggunakan system font stack untuk performa terbaik
- Fallback: sans-serif

## ⚠️ Important Notes

1. **Database Setup**: WAJIB menjalankan SQL dari `DATABASE_SCHEMA.md` sebelum menggunakan website
2. **Environment Variables**: Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY sudah diset
3. **Sample Data**: Database schema includes sample data, replace dengan data Anda sendiri
4. **Security**: Password admin disimpan di environment variable, default "Paulus21"
5. **RLS Policies**: Database menggunakan Row Level Security untuk akses publik read-only

## 🐛 Troubleshooting

**"Failed to fetch data":**
- Cek Supabase credentials di environment variables
- Pastikan database tables sudah dibuat
- Verify RLS policies sudah diset

**Admin login tidak bekerja:**
- Password: "Paulus21" (case-sensitive)
- Clear browser cache
- Cek browser console untuk error

**Dark mode tidak persist:**
- Cek localStorage permissions di browser
- Enable JavaScript

**Gambar tidak muncul:**
- Pastikan URL gambar valid dan accessible
- Gunakan direct image URLs (bukan redirect)

## 📚 Resources

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion

## 🎯 Next Steps

1. ✅ Run SQL dari DATABASE_SCHEMA.md
2. ✅ Login ke admin dashboard
3. ✅ Update profile dengan data Anda
4. ✅ Tambahkan skills, experience, certificates
5. ✅ Upload projects dengan screenshots
6. ✅ Update social links
7. ✅ Set availability status
8. ✅ Share portfolio link! 🚀

## 💡 Tips

- Gunakan gambar berkualitas tinggi untuk avatar dan projects
- Tulis bio yang concise dan impactful (2-3 kalimat)
- Tandai hanya 3-5 project terbaik sebagai "Featured"
- Update status secara berkala
- Gunakan naming teknologi yang konsisten
- Backup data Anda secara berkala

## 📞 Support

Jika ada masalah:
1. Cek browser console untuk error messages
2. Verify Supabase connection
3. Pastikan semua SQL migrations sudah dijalankan
4. Review DATABASE_SCHEMA.md dan SETUP_GUIDE.md

---

**Selamat menggunakan portfolio website Anda! 🎉**

Website Anda sudah siap untuk:
- Menampilkan portfolio secara profesional
- Dikelola dengan mudah via admin dashboard
- Di-share ke recruiter dan client
- Diupdate kapan saja tanpa coding

**Good luck dengan portfolio Anda!** 🚀
