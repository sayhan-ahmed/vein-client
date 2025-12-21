# Vein - Blood Donation Platform

A modern, full-stack blood donation management system connecting donors with those in need. Built with React, Firebase, and MongoDB.

## 🌐 Live URL

**[https://vein-client.vercel.app/](https://vein-client.vercel.app/)**

### Admin Access

- Email: admin@vein.com
- Password: admin911

### Volunteer Access

- Email: volunteer@vein.com
- Password: volunteer911

## 📋 Project Purpose

Vein is a comprehensive blood donation platform designed to bridge the gap between blood donors and recipients. The platform facilitates:

- **Efficient donor-recipient matching** based on blood type and location
- **Real-time donation request management** with status tracking
- **Secure payment processing** for platform funding
- **Role-based access control** for donors, volunteers, and administrators
- **Interactive blood compatibility tools** for education and awareness

## ✨ Key Features

### For Donors

- Create and manage donation requests
- Search for donors by blood group, district, and upazila
- Track donation history and impact statistics
- Update profile information with location details
- View personalized dashboard with activity insights

### For Volunteers

- Manage donation requests in their area
- Update request statuses (pending, in-progress, done, canceled)
- Access volunteer-specific dashboard and analytics
- View funding contributions and statistics

### For Administrators

- Complete platform oversight and user management
- Manage all donation requests across the system
- View comprehensive analytics and statistics
- Monitor funding contributions
- Control user roles and permissions

### General Features

- **Interactive Blood Compatibility Tool**: Learn who you can donate to and receive from
- **Secure Authentication**: Firebase-based authentication with role management
- **Payment Integration**: Stripe-powered funding system
- **Responsive Design**: Mobile-first, fully responsive UI
- **Real-time Updates**: Live data synchronization across the platform
- **Search & Filter**: Advanced donor search with multiple criteria
- **Data Visualization**: Charts and graphs for activity tracking

## 🛠️ Technologies Used

### Frontend

- **React 19** - UI library
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI 5** - Tailwind CSS component library
- **Vite 7** - Build tool and dev server

### Backend & Database

- **Firebase 12** - Authentication and user management
- **Node.js** - Backend server
- **Express.js** - Web framework
- **MongoDB** - Database (via custom backend API)
- **Axios 1.13** - HTTP client for API requests

### State Management & Data Fetching

- **TanStack Query 5** - Server state management and caching
- **React Hook Form 7** - Form validation and management

### UI Components & Libraries

- **React Icons 5** - Icon library
- **SweetAlert2 11** - Beautiful alert modals
- **React Hot Toast 2** - Toast notifications
- **Recharts 3** - Data visualization charts
- **Lottie Animations** - High-quality animations
- **Headless UI 2** - Unstyled, accessible components

### Payment Processing

- **Stripe** - Payment gateway integration
  - `@stripe/stripe-js 8`
  - `@stripe/react-stripe-js 5`

### Development Tools

- **ESLint 9** - Code linting
- **PropTypes 15** - Runtime type checking

## 📦 NPM Packages

```json
{
  "dependencies": {
    "@headlessui/react": "^2.2.9",
    "@lottiefiles/dotlottie-react": "^0.17.10",
    "@stripe/react-stripe-js": "^5.4.1",
    "@stripe/stripe-js": "^8.6.0",
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.12",
    "axios": "^1.13.2",
    "firebase": "^12.6.0",
    "motion": "^12.23.26",
    "prop-types": "^15.8.1",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.68.0",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-router": "^7.9.6",
    "react-spinners": "^0.17.0",
    "recharts": "^3.6.0",
    "sweetalert2": "^11.26.4",
    "tailwindcss": "^4.1.17"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@vitejs/plugin-react": "^5.1.0",
    "daisyui": "^5.5.5",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.2"
  }
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- MongoDB database
- Stripe account (for payment features)

### Installation

1. Clone the repository

```bash
git clone https://github.com/sayhan-ahmed/vein-client.git
cd vein-client
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:

```env
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id
VITE_API_URL=your_backend_api_url
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Start the development server

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Features Highlight

### Authentication & Authorization

- Firebase authentication with email/password
- Role-based access control (Donor, Volunteer, Admin)
- Protected routes with automatic redirects
- Profile management with image upload

### Dashboard

- **Donor Dashboard**: Personal donation history, request management, impact statistics
- **Volunteer Dashboard**: Area-specific request management, status updates
- **Admin Dashboard**: Complete platform analytics, user management, funding overview

### Donation Management

- Create detailed donation requests with location and time
- Real-time status tracking (pending, in-progress, done, canceled)
- Donor-recipient matching system
- Request filtering and search capabilities

### Payment System

- Secure Stripe integration
- One-time and recurring donation options
- Funding goal tracking with progress visualization
- Recent contributions display

### Data Visualization

- Activity trends with Recharts
- Donation statistics and impact metrics
- User ecosystem analytics
- Monthly activity tracking

## 🔒 Security Features

- Firebase Authentication
- Protected API routes
- Role-based authorization
- Secure payment processing with Stripe
- Environment variable protection
- Input validation with React Hook Form

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces
- Adaptive layouts for all screen sizes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Sayhan Ahmed**

- GitHub: [@sayhan-ahmed](https://github.com/sayhan-ahmed)
- Live Site: [https://vein-client.vercel.app/](https://vein-client.vercel.app/)

---

**Made with ❤️ for saving lives**
