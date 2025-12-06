# 🏦 LoanLink - Microloan Management System (Frontend)

A modern, full-featured microloan request and approval management system built with React, featuring real-time loan applications, Stripe payment integration, and role-based dashboards.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)
![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12-green)

## 🌟 Features

### 🔐 Authentication & Authorization

- **Firebase Authentication** with Email/Password
- **Social Login** (Google & GitHub OAuth)
- **JWT Token Management** with httpOnly cookies
- **Role-Based Access Control** (Admin, Manager, Borrower)
- **Protected Routes** with automatic redirects
- **Persistent Sessions** across page reloads

### 💰 Loan Management

- **Browse Available Loans** with search and category filtering
- **Detailed Loan Information** with images, requirements, EMI plans
- **Apply for Loans** with comprehensive application forms
- **Track Application Status** (Pending, Approved, Rejected)
- **Cancel Pending Applications**
- **Responsive Loan Cards** with hover animations

### 💳 Payment Integration

- **Stripe Payment Processing** for $10 application fee
- **Secure Card Payments** with Stripe Elements
- **Payment Confirmation** with transaction IDs
- **Success Animations** (Confetti & SweetAlert)
- **Payment History Tracking**

### 📊 Dashboard System

- **Role-Based Dashboards** for all user types
- **Responsive Sidebar Navigation** with mobile support
- **Real-time Statistics** and analytics
- **Quick Actions** based on user role
- **Activity Timeline**

### 🎨 UI/UX Features

- **Modern Design** with Easilon color scheme (#FF6B2C)
- **Dark/Light Theme Toggle** with DaisyUI
- **Smooth Animations** using Framer Motion
- **Responsive Design** for all devices
- **Toast Notifications** for user feedback
- **Loading States** with spinners
- **404 Page** with animated GIF

## 🛠️ Tech Stack

### Core

- **React 18.3** - UI Library
- **Vite 5.4** - Build Tool & Dev Server
- **React Router v6** - Client-side Routing

### Styling

- **Tailwind CSS 3.4** - Utility-first CSS
- **DaisyUI 4.12** - Component Library & Theming
- **Framer Motion 11.11** - Animation Library

### State & Forms

- **React Hook Form 7.53** - Form Management
- **Axios 1.7** - HTTP Client

### Authentication & Payments

- **Firebase 10.14** - Authentication
- **Stripe.js 4.8** - Payment Processing
- **@stripe/react-stripe-js 2.9** - React Components

### UI Feedback

- **React Hot Toast 2.4** - Toast Notifications
- **SweetAlert2 11.14** - Beautiful Alerts
- **React Confetti 6.1** - Success Animations
- **React Icons 5.3** - Icon Library

## 📁 Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   └── shared/
│   │       ├── Footer.jsx
│   │       ├── LoanCard.jsx
│   │       ├── LoadingSpinner.jsx
│   │       ├── Navbar.jsx
│   │       └── ThemeToggle.jsx
│   ├── config/
│   │   └── firebase.config.js
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── layouts/
│   │   ├── DashboardLayout.jsx
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── dashboard/
│   │   │   ├── DashboardHome.jsx
│   │   │   └── MyLoans.jsx
│   │   ├── AllLoans.jsx
│   │   ├── ApplyLoan.jsx
│   │   ├── Home.jsx
│   │   ├── LoanDetails.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   └── Register.jsx
│   ├── routes/
│   │   ├── AdminRoute.jsx
│   │   ├── ManagerRoute.jsx
│   │   └── PrivateRoute.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.local.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase Account
- Stripe Account (for payments)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/shamim0183/LoanLink-Client.git
cd LoanLink-Client
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup Environment Variables**

Create `.env.local` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API URL
VITE_API_URL=http://localhost:5000/api

# Stripe Publishable Key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

4. **Configure Firebase**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing
   - Enable Authentication → Email/Password + Google
   - Get configuration from Project Settings
   - Update `.env.local` with your values

5. **Run Development Server**

```bash
npm run dev
```

Visit `http://localhost:5173`

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Color Palette (Easilon Theme)

```css
Primary Orange:   #FF6B2C
Primary Hover:    #E55A1F
Primary Light:    #FFE5DB
Dark:             #1A1A2E
Dark Light:       #2A2A3E
Blue Primary:     #0F3460
Success:          #28A745
Error:            #DC3545
Warning:          #FFC107
Info:             #17A2B8
```

## 🔑 User Roles

### 👤 Borrower

- Browse and search loans
- View loan details
- Apply for loans with payment
- Track application status
- Cancel pending applications
- View application history

### 👨‍💼 Manager

- All Borrower permissions
- Add new loan products
- Manage own loans
- View pending applications for own loans
- Approve/Reject applications
- View approved applications

### 👑 Admin

- All permissions
- Manage all users (roles, suspension)
- View all loans
- Manage all applications
- Toggle loan visibility on homepage
- System-wide analytics

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
2. **Configure Environment Variables**
   - Add all variables from `.env.local`
3. **Deploy**
   - Vercel will auto-deploy on push to main

### Build for Production

```bash
npm run build
```

Output in `dist/` folder ready for deployment.

## 🔒 Security Features

- ✅ Environment variables for sensitive data
- ✅ JWT tokens stored in httpOnly cookies
- ✅ CORS protection
- ✅ Input validation on all forms
- ✅ Protected routes with authentication checks
- ✅ Role-based authorization
- ✅ Secure Stripe payment processing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Shamim**

- GitHub: [@shamim0183](https://github.com/shamim0183)

## 🙏 Acknowledgments

- Design inspired by Easilon template
- Icons from React Icons
- UI components from DaisyUI
- Payment processing by Stripe
- Authentication by Firebase

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Made with ❤️ using React + Vite + TailwindCSS + DaisyUI**
