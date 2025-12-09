# 💼 LoanLink Client

![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react) 
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite) 
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss) 
![Firebase](https://img.shields.io/badge/Firebase-10.14-ffca28?logo=firebase) 
![Stripe](https://img.shields.io/badge/Stripe-Integrated-635bff?logo=stripe)

Modern microloan management platform with role-based dashboards for borrowers, managers, and admins.

## ✨ Features

- Browse and apply for loans
- Stripe payment integration
- Real-time application tracking
- Role-based dashboards (Borrower, Manager, Admin)
- Firebase authentication (Email + Google OAuth)

## 🛠️ Tech Stack

- React 18 + Vite
- Tailwind CSS + DaisyUI
- Firebase Auth
- TanStack Query
- React Router v6
- Stripe Integration
- Framer Motion

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env.local (see below)
# Start dev server
npm run dev
```

## 🔐 Environment Setup

Create `.env.local`:

```env
VITE_API_URL=http://localhost:5000/api

# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key
```

## 👥 User Roles

**Borrower**

- Apply for loans
- Make payments
- Track application status
- Download receipts

**Manager**

- Create loan products
- Approve/reject applications
- View pending applications

**Admin**

- Manage all users
- View all loans and applications
- Assign user roles

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── contexts/        # Context providers
├── pages/           # Page components
│   └── dashboard/   # Role-based dashboards
├── routes/          # Route guards
└── config/          # Firebase config
```

## 📦 Build

```bash
npm run build
```

Output in `dist/` folder.

## 🌐 Deployment

Tested on Netlify.

1. Build the project
2. Set environment variables
3. Deploy `dist` folder

---

Built by [Shamim](https://github.com/shamim0183)
