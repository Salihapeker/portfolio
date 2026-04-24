import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Certificate from '../models/Certificate.js';

dotenv.config();

const projects = [
  {
    title: {
      en: 'SRMDB — Movie Discovery Platform',
      tr: 'SRMDB — Film Keşif Platformu',
    },
    role: { en: 'Full-Stack Developer', tr: 'Full-Stack Developer' },
    description: {
      en: 'A modern movie discovery platform with AI-powered recommendations. Users can search, explore, and get personalized movie suggestions.',
      tr: 'AI destekli öneri sistemine sahip modern bir film keşif platformu. Kullanıcılar film arayabilir, keşfedebilir ve kişiselleştirilmiş film önerileri alabilir.',
    },
    highlights: {
      en: [
        'Modern UI built with React.js and TailwindCSS',
        'RESTful APIs using Node.js and Express.js',
        'MongoDB for database operations',
        'JWT-based authentication system',
        'TMDb API integration with AI recommendation engine',
        'Deployed on Vercel',
      ],
      tr: [
        'React.js ve TailwindCSS ile modern kullanıcı arayüzü',
        'Node.js ve Express.js ile RESTful API',
        'MongoDB ile veritabanı yönetimi',
        'JWT tabanlı kimlik doğrulama sistemi',
        'TMDb API entegrasyonu ve AI destekli öneri motoru',
        'Vercel üzerinde deploy edildi',
      ],
    },
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'TailwindCSS', 'TMDb API'],
    images: [],
    order: 1,
  },
  {
    title: {
      en: 'AI-Powered Demand Management System',
      tr: 'AI Destekli Talep Yönetim Sistemi',
    },
    role: { en: 'Backend Developer', tr: 'Backend Developer' },
    description: {
      en: 'Enterprise-grade demand management system with microservices architecture, featuring AI-driven sentiment analysis and automatic prioritization.',
      tr: 'Mikroservis mimarisi, AI destekli duygu analizi ve otomatik önceliklendirme içeren kurumsal seviye talep yönetim sistemi.',
    },
    highlights: {
      en: [
        'Microservices architecture with Spring Boot, FastAPI and React',
        'JWT + RBAC based security layer',
        'NLP-powered sentiment analysis',
        'Automatic request prioritization',
      ],
      tr: [
        'Spring Boot, FastAPI ve React ile mikroservis mimarisi',
        'JWT + RBAC tabanlı güvenlik katmanı',
        'NLP tabanlı duygu analizi',
        'Otomatik talep önceliklendirme',
      ],
    },
    tech: ['Spring Boot', 'FastAPI', 'React', 'NLP', 'JWT', 'Microservices'],
    images: [],
    order: 2,
  },
  {
    title: {
      en: 'All-in-One Service & Appointment Platform',
      tr: 'All-in-One Hizmet ve Randevu Platformu',
    },
    role: { en: 'Frontend Developer', tr: 'Frontend Developer' },
    description: {
      en: 'A comprehensive service booking platform developed with a team of 10 using Agile methodology.',
      tr: '10 kişilik bir ekiple Agile metodolojisi kullanılarak geliştirilen kapsamlı bir hizmet ve randevu platformu.',
    },
    highlights: {
      en: [
        'Team of 10 developers using Agile methodology',
        'Component-based UI architecture with React',
        'REST API integration',
        'Deployed on VPS environment',
      ],
      tr: [
        '10 kişilik ekip, Agile metodoloji',
        'React ile component-based UI mimarisi',
        'REST API entegrasyonu',
        'VPS ortamına deploy edildi',
      ],
    },
    tech: ['React', 'REST API', 'Agile', 'VPS'],
    images: [],
    order: 3,
  },
  {
    title: {
      en: 'Smart Traffic Light Simulation',
      tr: 'Akıllı Trafik Işığı Simülasyonu',
    },
    role: { en: 'Team Lead', tr: 'Team Lead' },
    description: {
      en: 'Intelligent traffic light simulation system using density-based optimization algorithms.',
      tr: 'Yoğunluk tabanlı optimizasyon algoritmaları kullanan akıllı trafik ışığı simülasyon sistemi.',
    },
    highlights: {
      en: [
        'Built with Java and JavaFX',
        'MVC architecture',
        'Density-based optimization algorithms',
        'Led a development team',
      ],
      tr: [
        'Java ve JavaFX ile geliştirildi',
        'MVC mimarisi uygulandı',
        'Trafik yoğunluğuna göre optimizasyon algoritmaları',
        'Ekip liderliği deneyimi',
      ],
    },
    tech: ['Java', 'JavaFX', 'MVC', 'Algorithms'],
    images: [],
    order: 4,
  },
  {
    title: {
      en: 'Electric Vehicle Control System',
      tr: 'Elektromobil Araç Kontrol Sistemi',
    },
    role: { en: 'Embedded Systems Developer', tr: 'Gömülü Sistem Geliştirici' },
    description: {
      en: 'Hardware-software integrated control system for an electric vehicle, covering communication protocols and PCB design.',
      tr: 'Elektrikli araç için donanım-yazılım entegre kontrol sistemi; iletişim protokolleri ve PCB tasarımını kapsar.',
    },
    highlights: {
      en: [
        'System integration using CAN Bus, SPI, and UART',
        'C++ based control software on Arduino',
        'PCB design with Altium',
        'Hardware development experience',
      ],
      tr: [
        'CAN Bus, SPI ve UART protokolleri ile sistem entegrasyonu',
        'Arduino üzerinde C++ tabanlı kontrol yazılımı',
        'Altium ile PCB tasarımı',
        'Donanım geliştirme deneyimi',
      ],
    },
    tech: ['C++', 'Arduino', 'CAN Bus', 'SPI', 'UART', 'Altium PCB'],
    images: [],
    order: 5,
  },
];

const certificates = [
  {
    title: { en: 'Working in a Digital World: Professional Skills', tr: 'Working in a Digital World: Professional Skills' },
    issuer: 'IBM',
    year: '2024',
    order: 1,
  },
  {
    title: { en: 'Huawei Cloud Tech Essentials', tr: 'Huawei Cloud Tech Essentials' },
    issuer: 'Huawei',
    year: '2024',
    order: 2,
  },
  {
    title: { en: 'ISO 9001:2015 Quality Management Systems', tr: 'ISO 9001:2015 Kalite Yönetim Sistemleri' },
    issuer: 'Certified',
    year: '2024',
    order: 3,
  },
  {
    title: { en: 'Machine Learning 101', tr: 'Makine Öğrenmesi 101' },
    issuer: 'Turkcell',
    year: '2024',
    order: 4,
  },
  {
    title: { en: 'Python 101–401', tr: 'Python 101–401' },
    issuer: 'Turkcell',
    year: '2024',
    order: 5,
  },
  {
    title: { en: 'Data Science & AI 101', tr: 'Veri Bilimi ve Yapay Zeka 101' },
    issuer: 'Turkcell',
    year: '2024',
    order: 6,
  },
  {
    title: { en: 'Git and GitHub', tr: 'Git ve GitHub' },
    issuer: 'BTK Academy',
    year: '2025',
    order: 7,
  },
  {
    title: { en: 'Advanced Java', tr: 'İleri Seviye Java' },
    issuer: 'BTK Academy',
    year: '2026',
    order: 8,
  },
  {
    title: { en: 'Entrepreneurship Training', tr: 'KOSGEB Girişimcilik Eğitimi' },
    issuer: 'KOSGEB',
    year: '2026',
    order: 9,
  },
  {
    title: { en: 'Innovation Summit', tr: 'İnovasyon Zirvesi' },
    issuer: 'Anbean',
    year: '2026',
    order: 10,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create admin user if not exists
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    }

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`ℹ️  Admin user already exists: ${adminEmail}`);
    } else {
      await User.create({
        email: adminEmail,
        password: adminPassword,
        name: 'Saliha Peker',
      });
      console.log(`✅ Admin user created: ${adminEmail}`);
    }

    // Seed projects (only if empty)
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(projects);
      console.log(`✅ ${projects.length} projects inserted`);
    } else {
      console.log(`ℹ️  Projects already exist (${projectCount} found), skipping`);
    }

    // Seed certificates (only if empty)
    const certCount = await Certificate.countDocuments();
    if (certCount === 0) {
      await Certificate.insertMany(certificates);
      console.log(`✅ ${certificates.length} certificates inserted`);
    } else {
      console.log(`ℹ️  Certificates already exist (${certCount} found), skipping`);
    }

    console.log('\n🎉 Seed completed successfully!');
    console.log(`\n👤 Login with: ${adminEmail}`);
    console.log('🔐 Use the password you set in ADMIN_PASSWORD\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seed();
