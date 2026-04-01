<div align="center">
  
  # ⚡ ByteForge
  
  **Next-Gen Tech for Modern Creators**
  
  [![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/muhammad-ahmad-05/ByteForge)
  [![Live Demo](https://img.shields.io/badge/Live-Demo-blue?logo=vercel)](#) </div>

---

## 📖 Project Overview

**ByteForge** is a modern, fully responsive e-commerce front-end application designed for tech enthusiasts and creators. It features a premium UI with a dynamic cinematic hero section, interactive product displays, and a bento-grid inspiration gallery. 

The standout feature of ByteForge is its built-in **Headless CMS-style Admin Panel**. Using React Context and LocalStorage, the application allows site administrators to perform full CRUD (Create, Read, Update, Delete) operations on site assets, products, and global settings without needing a complex backend database.

## ✨ Key Features

* **Dynamic Admin Dashboard:** A tabbed interface to manage Assets (Images), Products, and Global Site Settings (Promo banners, newsletters).
* **Persistent Local Data:** Utilizes the browser's `localStorage` to save all state changes made in the Admin Panel, surviving page refreshes and acting as a local database.
* **Cinematic Hero Carousel:** An immersive, auto-playing full-bleed hero section that scales and fades smoothly.
* **Dark/Light Theme Toggle:** System-preference aware theme toggling with smooth icon animations.
* **Fully Responsive Design:** Optimized for mobile, tablet, and desktop viewing using Tailwind CSS.
* **Interactive UI Elements:** Features product quick-view modals, bento-grid galleries, and custom tooltips.

## 🛠️ Technologies Used

* **Frontend Framework:** [React.js](https://react.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router](https://reactrouter.com/)
* **State Management:** React Context API (`SiteContext`)
* **Storage:** Browser LocalStorage API
* **Build Tool:** Vite (or Create React App)

## 📂 Project Structure

```text
ByteForge/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (Navbar, PromoDeal, etc.)
│   ├── context/            # Global state management (SiteContext.jsx)
│   ├── pages/              # Route pages (Home, AdminPanel, Signin, Signup)
│   ├── App.jsx             # Main application wrapper and router
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles and Tailwind imports
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation

🚀 How to Run the Project
Follow these steps to run ByteForge locally on your machine:

Clone the repository:

Bash
git clone [https://github.com/muhammad-ahmad-05/ByteForge.git](https://github.com/muhammad-ahmad-05/ByteForge.git)
Navigate into the project directory:

Bash
cd ByteForge
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
# Or 'npm start' if you are using Create React App
Open in your browser:
Open http://localhost:5173 (or the port specified in your terminal) to view it in the browser.

📸 Screenshots
(Replace the placeholder links below with actual paths to your images once you upload them to your repo!)

Home Page - Hero Section
Product Gallery & Bento Grid
Admin Control Panel
Dark Mode / Light Mode
Designed and built by Muhammad Ahmad.
