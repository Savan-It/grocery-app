
# Full-Stack Food Delivery Web App using MERN

A modern and responsive full-stack food delivery application built using **React JS**, **Node.js**, **Express**, **MongoDB**, and **Stripe** for secure payment integration. It features a user-friendly interface, dynamic cart management, and an admin panel for managing orders and products.

---

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT.
- **Dynamic Menu**: Add, view, and manage cart items dynamically.
- **Stripe Integration**: Secure payment gateway for processing transactions.
- **Responsive Design**: Mobile-first layout compatible with all devices.
- **Admin Panel**: Manage products, orders, and view user information.
- **Database**: MongoDB for storing user, product, and order data.
- **Routing**: React Router Dom for navigation.
- **State Management**: Context API for efficient state handling.

---

## 📂 Folder Structure

### Root Directory

```
.
├── admin                 # Admin Panel Frontend
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── public/           # Public assets
│   ├── src/              # Source code
│   │   ├── assets/       # Images and assets
│   │   ├── components/   # Navbar, Sidebar, etc.
│   │   ├── pages/        # Add, List, Orders pages
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── vite.config.js    # Configuration
├── backend               # Backend (Node.js & Express)
│   ├── config/           # Database configuration
│   ├── controllers/      # API Controllers
│   ├── middleware/       # Auth Middleware
│   ├── models/           # Mongoose Models
│   ├── routes/           # API Routes
│   ├── server.js         # Main server file
│   └── uploads/          # File uploads (images, etc.)
└── frontend              # User-Facing Frontend
    ├── README.md
    ├── index.html
    ├── package.json
    ├── public/           # Public assets
    ├── src/              # Source code
    │   ├── assets/       # Images and assets
    │   ├── Context/      # Context API for state management
    │   ├── components/   # Shared components (Navbar, Footer, etc.)
    │   ├── pages/        # Pages (Cart, Home, PlaceOrder, etc.)
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── vite.config.js    # Configuration
```

---

## 🛠️ Setup Instructions

### Prerequisites

- Install **Node.js**: [Download Node.js](https://nodejs.org/en/download/)
- Setup **MongoDB**: Use MongoDB Atlas [Guide](https://www.mongodb.com/cloud/atlas/register)
- Obtain a **Stripe API Key**: Sign up at [Stripe](https://stripe.com/)

---

### Backend Setup

1. Navigate to the `backend` directory in your terminal:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `backend` directory with the following keys:
     ```env
     PORT=5000
     MONGO_URI=<Your MongoDB Connection String>
     STRIPE_SECRET_KEY=<Your Stripe Secret Key>
     JWT_SECRET=<Your JWT Secret>
     ```
4. Start the backend server:
   ```bash
   npm run server
   ```

---

### Frontend Setup (User)

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

---

### Admin Panel Setup

1. Navigate to the `admin` directory:
   ```bash
   cd admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the admin panel:
   ```bash
   npm run dev
   ```
4. Access the admin panel in your browser at [http://localhost:3000](http://localhost:3000).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

