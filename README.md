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
client/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── dashboard/      # Dashboard specific components
│   │   │   ├── ApplicationModal.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   └── index.js    # Barrel export
│   │   ├── forms/          # Form components
│   │   │   ├── FormInput.jsx
│   │   │   ├── FormSelect.jsx
│   │   │   ├── FormTextarea.jsx
│   │   │   └── index.js
│   │   ├── home/           # Home page components
│   │   │   ├── Hero.jsx
│   │   │   ├── AvailableLoans.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── WhyChooseUs.jsx
│   │   ├── modals/         # Modal components
│   │   └── shared/         # Shared components
│   │       ├── Footer.jsx
│   │       ├── Navbar.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── ReceiptCard.jsx
│   ├── contexts/           # Context providers
│   │   └── AuthContext.jsx # Firebase authentication
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useDocumentTitle.js
│   │   └── useImageUpload.js
│   ├── layouts/            # Layout components
│   │   ├── MainLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── AllLoans.jsx
│   │   ├── LoanDetails.jsx
│   │   ├── ApplyLoan.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── PaymentSuccess.jsx
│   │   ├── PaymentCancel.jsx
│   │   ├── Receipt.jsx
│   │   ├── NotFound.jsx
│   │   ├── index.js        # Barrel export for main pages
│   │   └── dashboard/      # Dashboard pages
│   │       ├── DashboardHome.jsx
│   │       ├── MyLoans.jsx
│   │       ├── PaymentHistory.jsx
│   │       ├── Profile.jsx  # Dynamic role-based title
│   │       ├── index.js     # Barrel export
│   │       ├── admin/       # Admin-only pages
│   │       │   ├── AddLoan.jsx
│   │       │   ├── AllLoans.jsx
│   │       │   ├── LoanApplications.jsx
│   │       │   ├── ManageUsers.jsx
│   │       │   └── index.js # Barrel export
│   │       └── manager/     # Manager-only pages
│   │           ├── AddLoan.jsx
│   │           ├── ManageLoans.jsx
│   │           ├── PendingApplications.jsx
│   │           ├── ApprovedApplications.jsx
│   │           ├── ManageBorrowers.jsx
│   │           └── index.js # Barrel export
│   ├── routes/             # Route guards
│   │   ├── PrivateRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   └── ManagerRoute.jsx
│   ├── utils/              # Utility functions
│   │   ├── avatar.js
│   │   └── dateUtils.js
│   ├── config/             # Configuration files
│   │   ├── firebase.config.js
│   │   └── api.config.js
│   ├── constants/          # Constants and enums
│   │   └── index.js
│   ├── App.jsx             # Main app with barrel imports
│   └── main.jsx            # App entry point
├── .env.local              # Environment variables
└── package.json
```

### Key Architecture Features

- **Barrel Exports**: All page groups use `index.js` for clean imports
- **Role-Based Routing**: Separate routes for Borrower, Manager, and Admin
- **Dynamic Titles**: `useDocumentTitle` hook for SEO-friendly page titles
- **Protected Routes**: Route guards ensure role-based access control
- **Component Organization**: Grouped by feature and reusability

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
