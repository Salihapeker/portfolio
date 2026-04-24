# ⚡ Quick Start Cheat Sheet

## 🏃 En Hızlı Başlangıç (5 dakika)

### 1. Hesap Aç (hepsi ücretsiz)
- [ ] MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register
- [ ] Cloudinary: https://cloudinary.com/users/register_free
- [ ] Gmail App Password: https://myaccount.google.com/apppasswords

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
# .env dosyasını düzenle (6 değer doldur)
npm run seed      # İlk defa: admin + CV verileri
npm run dev       # Her seferinde
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Aç
- Site: http://localhost:5173
- Admin: http://localhost:5173/admin/login

---

## 🔑 .env Minimum Gerekenler

```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=rastgele_32_karakter
ADMIN_EMAIL=salihapeker3@gmail.com
ADMIN_PASSWORD=GucluBirSifre123
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_USER=salihapeker3@gmail.com
EMAIL_PASS=16_karakter_app_password
```

---

## 🧪 Test Checklist

- [ ] `/` açılıyor, proje ve sertifikalar görünüyor
- [ ] Dil değiştirici (TR/EN) çalışıyor
- [ ] İletişim formu → mail geliyor + admin'de kayıt görünüyor
- [ ] `/admin/login` → giriş yapılıyor
- [ ] Dashboard istatistikleri doğru
- [ ] Yeni proje ekle → sitede görünüyor
- [ ] Projeye resim yükle → Cloudinary'de + sitede görünüyor
- [ ] Mesaj oku → okundu işaretleniyor

---

## 🚢 Production Deploy (3 adım)

1. **Backend → Render.com** (Root: `backend`, Start: `npm start`)
2. **Frontend → Vercel** (Root: `frontend`, env: `VITE_API_URL=https://backend-url/api`)
3. **Backend'de `FRONTEND_URL`'yi Vercel URL'iyle güncelle**

Detay: README.md içinde.

---

## 💡 İpuçları

- Admin'de şifreni ilk girişten sonra `/admin/settings`'ten değiştir
- `profile.jpg` ve `cv.pdf` dosyalarını `frontend/public/` içine koy
- Mobil'de de test et (Chrome DevTools → device mode)
- GitHub'a push etmeden önce `.env` dosyalarının `.gitignore`'da olduğundan emin ol
