# 🏦 LoanLink Client

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646cff?logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-10.14.1-ffca28?logo=firebase)
![Stripe](https://img.shields.io/badge/Stripe-Integrated-635bff?logo=stripe)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.15-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**A modern, feature-rich microloan management platform with role-based access control**

[Live Demo](#) • [Server Repository](https://github.com/shamim0183/LoanLink-Server) • [Report Bug](https://github.com/shamim0183/LoanLink-Client/issues)

</div>

---

## 📖 About The Project

LoanLink is a comprehensive microloan management system that streamlines the loan application and approval process. Built with modern web technologies, it provides a seamless experience for borrowers, loan managers, and administrators. The platform features secure payment processing through Stripe, real-time application tracking, and an intuitive dashboard for all user roles.

## 🚀 Features

### Public Features

- **Home Page**: Featured loans, statistics, and loan categories
- **All Loans**: Browse and search available loans with pagination
- **Loan Details**: View comprehensive loan information
- **About**: Company information and mission
- **Contact**: Get in touch with support

### Authentication

- Firebase Authentication (Email/Password & Google OAuth)
- JWT-based session management
- Protected routes with role-based access control

### User Roles & Dashboards

#### 👤 Borrower

- Apply for loans
- View loan applications status
- Make payments via Stripe
- Download payment receipts
- Track payment history
- Manage profile

#### 👨‍💼 Manager

- Add new loan products
- Manage existing loans
- Review and approve/reject applications
- View pending and approved applications
- Monitor loan portfolio

#### 👑 Admin

- Manage all users (promote/demote roles)
- View all loans in the system
- Monitor all loan applications
- Full system oversight

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: React Router DOM v6
- **State Management**: React Context API + TanStack Query
- **Styling**: Tailwind CSS + DaisyUI
- **Authentication**: Firebase Auth
- **Payments**: Stripe (@stripe/react-stripe-js)
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **UI Components**:
  - React Icons
  - SweetAlert2
  - React Hot Toast
  - Swiper (carousels)
  - React Confetti
  - Canvas Confetti
- **PDF Generation**: jsPDF + html2canvas
- **Print**: React to Print
- **HTTP Client**: Axios

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Stripe account

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shamim0183/LoanLink-Client.git
   cd LoanLink-Client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   Create a `.env.local` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:5000/api

   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

   # Stripe
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

Build output will be in the `dist` directory.

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── shared/          # Shared components (Header, Footer, etc.)
│   ├── config/              # Configuration files (Firebase)
│   ├── contexts/            # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── layouts/             # Layout components (Main, Dashboard)
│   ├── pages/               # Page components
│   │   └── dashboard/       # Dashboard pages (Admin, Manager, Borrower)
│   ├── routes/              # Route guards (PrivateRoute, AdminRoute, ManagerRoute)
│   ├── App.jsx              # Root component with routing
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .env.local               # Environment variables (not in git)
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## 🔑 Key Routes

### Public Routes

- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/all-loans` - Browse all loans
- `/about` - About page
- `/contact` - Contact page

### Protected Routes

- `/loan-details/:id` - View loan details
- `/apply-loan/:id` - Apply for a loan
- `/payment-success` - Payment confirmation
- `/payment-cancel` - Payment cancellation
- `/receipt/:applicationId` - Download receipt

### Dashboard Routes

- `/dashboard` - Dashboard home
- `/dashboard/my-loans` - Borrower's loans
- `/dashboard/payment-history` - Payment history
- `/dashboard/profile` - User profile

### Admin Routes

- `/dashboard/manage-users` - Manage users
- `/dashboard/all-loans` - View all loans
- `/dashboard/loan-applications` - View all applications

### Manager Routes

- `/dashboard/add-loan` - Add new loan product
- `/dashboard/manage-loans` - Manage loans
- `/dashboard/pending-applications` - Review pending applications
- `/dashboard/approved-applications` - View approved applications

## 🎨 Features in Detail

### Payment System

- Integrated Stripe payment gateway
- Secure payment processing
- Automatic receipt generation
- Payment history tracking
- Downloadable PDF receipts

### User Experience

- Responsive design (mobile, tablet, desktop)
- Dark mode support (via DaisyUI)
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications for user feedback
- Confetti celebrations for successful actions

### Security

- Protected routes with authentication
- Role-based access control
- Secure API communication with JWT
- Firebase authentication

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📸 Screenshots

<div align="center">

### Landing Page

_Coming Soon - Add screenshot here_

### Dashboard

_Coming Soon - Add screenshot here_

### Payment Integration

_Coming Soon - Add screenshot here_

</div>

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/shamim0183/LoanLink-Client/issues).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Shamim**

- GitHub: [@shamim0183](https://github.com/shamim0183)
- Project Link: [LoanLink Client](https://github.com/shamim0183/LoanLink-Client)
- Server Repository: [LoanLink Server](https://github.com/shamim0183/LoanLink-Server)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The amazing UI library
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Firebase](https://firebase.google.com/) - Authentication and backend services
- [Stripe](https://stripe.com/) - Secure payment processing
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Beautiful component library

---

<div align="center">

Made with ❤️ by [Shamim](https://github.com/shamim0183)

**[⬆ Back to Top](#-loanlink-client)**

</div>
