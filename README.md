# 🛍️ E-Commerce Dashboard | Premium SaaS Experience

A modern, high-performance E-Commerce Dashboard built with **React**, **Vite**, and **Tailwind CSS**. This application features a cinematic UI, full responsiveness, and robust state management for a seamless shopping and management experience.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Key Features

### 📊 Dynamic Dashboard
- **Live Overview**: Real-time sales charts and statistics using custom-built components.
- **Popular Products**: Automatically fetches and displays trending items with live ratings and stock status.

### 📦 Advanced Product Discovery
- **Infinite Scrolling**: High-performance scrolling for large product catalogs.
- **Smart Filtering**: Seamless category filtering and instant search with URL synchronization.
- **Mobile Filter Drawer**: A premium slide-out drawer optimized for mobile users.

### 🛒 Complete Shopping Flow
- **Interactive Cart**: Manage quantities, move items to wishlist, and simulate credit card checkouts.
- **Persistent Wishlist**: Save your favorite items across sessions.
- **Real-time Calculations**: Automatic subtotal, tax, and shipping calculations.

### 👤 User & Security
- **Authentication**: Secure login/register flow with session persistence.
- **Session Timer**: Visible countdown timer with automatic logout for security.
- **Profile Management**: Update user details and security settings in a responsive layout.

### 🌙 Premium UI/UX
- **Dark Mode Support**: Fully integrated dark theme with automatic preference detection.
- **Glassmorphism**: Elegant backdrop blurs and rounded aesthetics.
- **Mobile-First Design**: Optimized for everything from 320px mobile screens to ultra-wide monitors.

---

## 🚀 Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Premium Palette)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Navigation**: [React Router Dom](https://reactrouter.com/)
- **Animation**: Tailwind CSS Keyframes & Lucide Icons
- **Utility**: [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for State Persistence

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vaibhav5418/Ecommerce.git
   cd Ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
src/
├── components/      # UI, Layout, Product, Cart, Wishlist items
├── context/         # Auth, Cart, Theme, Wishlist Context providers
├── hooks/           # Custom React hooks (useTheme, useDebounce, etc.)
├── pages/           # Main route views (Dashboard, Products, Cart, Profile)
├── services/        # API and Data fetching logic
├── utils/           # Currency formatting, Storage helpers, etc.
└── App.jsx          # Route definitions & Global providers
```

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed by [Vaibhav](https://github.com/Vaibhav5418)
