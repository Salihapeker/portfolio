# Saliha Peker — Portfolio with Admin Panel

Modern, iki dilli (TR/EN) full-stack portfolyo sitesi. Kendi admin panelinle projeler, sertifikalar ve resimler ekleyebilir, gelen mesajları görüntüleyebilirsin.

## 🚀 Stack

**Frontend:**
- React 18 + Vite
- TailwindCSS + Framer Motion
- React Router (admin routing için)
- Axios (API client)
- React Hot Toast (bildirimler)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (resim depolama)
- Nodemailer (email)
- bcrypt (şifre hash'leme)
- express-rate-limit + express-validator (güvenlik)

## ✨ Özellikler

### Public Site
- 🌗 Dark mode, minimalist tasarım, mavi aksan renk
- 🌍 Türkçe / İngilizce dil geçişi
- 📱 Tam responsive (mobil/tablet/desktop)
- 🎨 Framer Motion ile akıcı animasyonlar
- 📄 CV indirme
- ✍️ Medium entegrasyonu
- 📧 Çalışan iletişim formu

### Admin Panel (`/admin`)
- 🔐 JWT ile güvenli giriş (brute-force koruması)
- 📊 Dashboard — istatistikler ve son mesajlar
- 📁 **Proje yönetimi:** ekle, düzenle, sil, resim yükle (Cloudinary)
- 🏆 **Sertifika yönetimi:** ekle, düzenle, sil
- 📬 **Mesaj gelen kutusu:** gelen mesajları oku, yanıtla (mailto), sil
- ⚙️ **Ayarlar:** şifre değiştir
- 📝 İki dilli içerik düzenleme (her alan için TR ve EN)

## 📁 Proje Yapısı

```
portfolio/
├── backend/
│   ├── config/           # MongoDB + Cloudinary bağlantıları
│   ├── models/           # User, Project, Certificate, Message
│   ├── routes/           # auth, projects, certificates, contact
│   ├── middleware/       # JWT auth
│   ├── scripts/seed.js   # İlk kurulum: admin + CV verisi
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── api/          # Axios client (JWT auto-attach)
    │   ├── context/      # Auth + Language contexts
    │   ├── components/   # Public + admin UI components
    │   ├── pages/        # HomePage + admin sayfaları
    │   ├── locales/      # TR/EN çeviriler
    │   └── App.jsx       # React Router config
    ├── public/
    │   ├── favicon.svg
    │   ├── profile.jpg   # <- Fotoğrafını buraya koy
    │   └── cv.pdf        # <- CV'ni buraya koy
    ├── vercel.json       # SPA routing fix
    └── package.json
```

## 🛠️ Local Kurulum (Geliştirme)

### 1. Ön Hazırlık — Ücretsiz Hesaplar Aç

Üç tane ücretsiz hesap açman gerekiyor:

**MongoDB Atlas:** https://www.mongodb.com/cloud/atlas/register
1. Kaydol → Ücretsiz cluster oluştur (M0 Free tier)
2. "Database Access" → yeni kullanıcı oluştur (kullanıcı adı + güçlü şifre)
3. "Network Access" → "Add IP Address" → `0.0.0.0/0` (her yerden erişim — development için)
4. "Connect" → "Drivers" → Connection string'i kopyala
   - Örnek: `mongodb+srv://saliha:YOUR_PASSWORD@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority`

**Cloudinary:** https://cloudinary.com/users/register_free
1. Kaydol
2. Dashboard'dan şu 3 değeri al:
   - Cloud Name
   - API Key
   - API Secret

**Gmail App Password:** https://myaccount.google.com/apppasswords
1. Google hesabında 2FA aç (önce): https://myaccount.google.com/security
2. App Passwords sayfasına git → "Mail" + "Other (Custom name)" seç → "Portfolio" yaz
3. 16 haneli şifreyi kaydet (tek sefer gösterilir)

### 2. Backend Kurulumu

```bash
cd backend
npm install
cp .env.example .env
```

`.env` dosyasını aç ve doldur:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

MONGODB_URI=mongodb+srv://saliha:PASSWORD@cluster0.xxx.mongodb.net/portfolio

JWT_SECRET=super_random_string_at_least_32_chars_change_this_in_production
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=salihapeker3@gmail.com
ADMIN_PASSWORD=ChooseAStrongPassword123!

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=salihapeker3@gmail.com
EMAIL_PASS=your16charappp asswordhere
```

> 💡 **JWT_SECRET için:** https://generate-secret.vercel.app/64 adresinden rastgele güçlü bir string al.

**İlk kurulum — admin kullanıcı + CV verilerini yükle:**

```bash
npm run seed
```

Çıktı şöyle görünmeli:
```
✅ Connected to MongoDB
✅ Admin user created: salihapeker3@gmail.com
✅ 5 projects inserted
✅ 10 certificates inserted
🎉 Seed completed successfully!
```

**Backend'i başlat:**
```bash
npm run dev
```

✅ Backend çalışıyor: `http://localhost:5000`

### 3. Frontend Kurulumu

**Yeni bir terminal aç:**

```bash
cd frontend
npm install
npm run dev
```

✅ Site açılıyor: `http://localhost:5173`
✅ Admin paneli: `http://localhost:5173/admin/login`

### 4. İlk Giriş

1. `http://localhost:5173/admin/login` adresine git
2. `.env` içindeki `ADMIN_EMAIL` ve `ADMIN_PASSWORD` ile giriş yap
3. Dashboard'a yönlendirileceksin 🎉

### 5. Kişiselleştirme

**Profil Fotoğrafı:**
- Fotoğrafını `frontend/public/profile.jpg` olarak kaydet
- Kare format, min 500x500px önerilir

**CV Dosyası:**
- CV PDF'ini `frontend/public/cv.pdf` olarak kaydet
- Navbar'daki "CV İndir" butonu bunu indirir

**Proje Resimleri:**
- Admin paneline gir → Projects → bir projenin "Images" butonuna tıkla
- "Click to upload" → resim(ler) seç (5MB max)
- Resim otomatik Cloudinary'e yüklenir → herkes görebilir ✨

## 🚢 Production Deployment

### Adım 1: Backend → Render.com (Ücretsiz)

1. https://render.com adresinde kaydol
2. Kod'u GitHub'a push et (`portfolio/` klasörünü repo olarak yükle)
3. Render Dashboard → "New +" → "Web Service" → GitHub repo'nu bağla
4. Ayarlar:
   - **Name:** `saliha-portfolio-api`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. "Environment" sekmesinde tüm `.env` değişkenlerini tek tek ekle:
   - `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLOUDINARY_*`, `EMAIL_USER`, `EMAIL_PASS`
   - `FRONTEND_URL` → şimdilik `https://yourdomain.com` yaz (sonra güncelleyeceğiz)
   - `NODE_ENV=production`
6. "Create Web Service" → deploy bekle (~3-5 dk)
7. URL'yi kopyala: `https://saliha-portfolio-api.onrender.com`

**Seed çalıştır (production DB için):**
- Render Shell sekmesi → `npm run seed`

### Adım 2: Frontend → Vercel (Ücretsiz)

1. https://vercel.com adresinde kaydol (GitHub ile giriş kolay)
2. "Add New" → "Project" → GitHub repo'nu bağla
3. Ayarlar:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (otomatik algılar)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Environment Variables:
   - `VITE_API_URL` → `https://saliha-portfolio-api.onrender.com/api`
5. "Deploy" → tamamlanmasını bekle (~2 dk)
6. URL'yi kopyala: `https://your-portfolio.vercel.app`

### Adım 3: Backend CORS Güncelle

Render Dashboard → Backend → Environment → `FRONTEND_URL`'ı frontend URL'ıyla güncelle:
- `FRONTEND_URL=https://your-portfolio.vercel.app`

Backend otomatik yeniden başlar.

### Adım 4: Domain Bağla (Opsiyonel)

**Domain satın al** (~10$/yıl):
- Namecheap, GoDaddy, Google Domains, Turhost, Natro

**Vercel'de bağla:**
1. Vercel Project → Settings → Domains → "Add"
2. `salihapeker.com` yaz (veya ne aldıysan)
3. Vercel'in verdiği DNS kayıtlarını domain panelinde ekle (A ve CNAME)
4. 5-10 dakika içinde aktif olur + otomatik SSL (HTTPS) ✅

**Backend için de subdomain önerim:**
- `api.salihapeker.com` → Render'daki backend'ine bağla
- Daha profesyonel görünür, CORS ayarlarını güncelle

## 🧪 Test: İletişim Formu Gerçekten Çalışıyor mu?

Local'de test:

1. Backend çalışıyor (`npm run dev`)
2. Frontend çalışıyor (`npm run dev`)
3. `http://localhost:5173/#contact` adresine git
4. Formu doldur, "Mesaj Gönder"e tıkla
5. Kontrol noktaları:
   - ✅ Yeşil "Mesajınız başarıyla gönderildi" bildirimi görmelisin
   - ✅ Gmail'ine `[Portfolio] ...` konulu mail gelmeli
   - ✅ Gönderen (form'a yazdığın email) de otomatik "Thank you" maili almalı
   - ✅ Admin panelde `/admin/messages` → mesaj kayıtlı görünmeli
6. **Bonus:** Backend'i durdurup dene — bu sefer kırmızı hata mesajı görmelisin

**Eğer mail gelmezse:**
- `.env` içinde `EMAIL_PASS` doğru mu? (normal Gmail şifresi ÇALIŞMAZ, App Password lazım)
- Gmail'de 2FA açık mı?
- Backend konsoluna bak, hata yazıyor mu?

**Önemli:** Mail gönderimi başarısız olsa bile, mesaj veritabanına kaydedilir (admin panelden görebilirsin). Yani email config unutulsa bile form asla işlevsiz kalmaz.

## 📝 Admin Paneli Kullanım Senaryoları

### Yeni proje ekleme
1. `/admin/projects` → "Add Project"
2. İngilizce ve Türkçe içerikleri doldur
3. Tech stack'i virgülle ayır: `React, Node.js, MongoDB`
4. Her dil için highlight'ları ekle (+ Add highlight)
5. "Create Project"
6. Proje listesine dönünce → "Images" butonu ile screenshot'ları yükle

### Yeni sertifika ekleme
1. `/admin/certificates` → "Add Certificate"
2. Title (EN/TR), Issuer, Year doldur
3. "Create" → site anasayfasında görünecek ✨

### Gelen mesajları yönetme
- `/admin/messages` → listede oku
- Okununca otomatik "okundu" işaretlenir (nokta kaybolur)
- "Reply" butonu → mail uygulaması açılır, direkt yanıt verebilirsin

### Şifre değiştirme
- `/admin/settings` → "Change Password"
- Güvenlik için ilk seed sonrası bunu yapmanı öneririm

## 🔒 Güvenlik Özellikleri

- ✅ Şifreler bcrypt ile hash'lenmiş (12 round salt)
- ✅ JWT token 7 gün geçerli, localStorage'da saklanır
- ✅ Login endpoint rate-limit (15 dk'da 5 deneme)
- ✅ Contact form rate-limit (15 dk'da 5 submission)
- ✅ Input validation (express-validator)
- ✅ XSS koruması (HTML escape)
- ✅ CORS sadece tanımlı frontend URL'ine açık
- ✅ Cloudinary otomatik resim optimizasyonu + boyut limiti (5MB)

## 🆘 Sık Karşılaşılan Sorunlar

**"Cannot connect to MongoDB":**
- `.env`'deki `MONGODB_URI` doğru mu? Şifreyi URL-encode ettin mi? (özel karakter varsa)
- Atlas'ta IP whitelist'e `0.0.0.0/0` ekledin mi?

**Login çalışmıyor:**
- `npm run seed` çalıştırdın mı?
- `.env`'deki `ADMIN_PASSWORD` ile mi deniyorsun?

**Resim yüklenmiyor:**
- Cloudinary credentials doğru mu?
- Dosya 5MB'tan küçük mü, JPG/PNG/WebP/GIF mi?

**Mail gönderilmiyor:**
- Gmail App Password kullanıyor musun? (2FA açık olmalı)
- `.env`'deki `EMAIL_USER` ile `EMAIL_PASS` tutarlı mı?

## 🎨 Özelleştirme

### Renk paletini değiştir
`frontend/tailwind.config.js` → `primary` rengi güncelle (şu an `#3b82f6` mavi).

### Hakkımda / Skills / Hero metinlerini değiştir
`frontend/src/locales/translations.js` dosyasını düzenle.

### Yeni Medium makalesi ekle
Medium'a yeni makale yazınca otomatik profil sayfasında görünecek. Bloga tıklayan direkt Medium'a gider.

## 📮 İletişim

Saliha Peker
- 📧 salihapeker3@gmail.com
- 🐙 https://github.com/Salihapeker
- ✍️ https://medium.com/@salihapeker

---

**Made with ⚡ by Saliha Peker** · 2026
