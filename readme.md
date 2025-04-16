
---

# 🐷 Piggytrack – Personal Finance Visualizer

🚀 **Live Demo:** [Piggytrack](https://piggytrack.vercel.app)

---

## 📌 Overview

**Piggytrack** is a modern, interactive personal finance tracking application built with **Next.js**. It empowers users to visualize their transactions, monitor category-wise spending, and set up budgeting goals. With a sleek UI powered by **shadcn/ui** and **Tailwind CSS**, plus insightful analytics using **Recharts**, Piggytrack makes money management intuitive and effective.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (13.5)
- **Language:** TypeScript
- **Styling & UI:** Tailwind CSS, shadcn/ui, clsx, tailwind-merge
- **Database:** MongoDB with Mongoose
- **Visualization:** Recharts
- **Forms & Validation:** React Hook Form, Zod, @hookform/resolvers
- **Utilities:** Date-fns, SWR
- **Animations:** Framer Motion
- **UI Enhancements:** Radix UI, Lucide React, Sonner (for toasts)

---

## 📥 Installation & Setup

### 📦 Clone the Repository
```bash
git clone https://github.com/yourusername/piggytrack.git
cd piggytrack
```

### 🔧 Install Dependencies
```bash
npm install
```

### ⚙️ Environment Variables
Create a `.env.local` file in the root and add:

```env
MONGODB_URI=mongodb+srv://your_mongodb_connection_string
```

---

## ▶️ Running the App

### Development
```bash
npm run dev
```
Visit: `http://localhost:3000`

### Production
```bash
npm run build
npm start
```

---

## 🎯 Features

✅ Add, edit, and delete transactions  
✅ Monthly expense bar chart  
✅ Category-wise pie chart  
✅ Budget vs actual tracking  
✅ Dashboard insights summary  
✅ Fully responsive UI (mobile + desktop)  
✅ Animations with `framer-motion`  
✅ Modular components using `shadcn/ui` + `radix-ui`

---

## 📁 Project Structure Highlights

```
/app             → Next.js App Directory
/components      → Reusable UI components
/context         → Global state and mutation handlers
/hooks           → Custom React Hooks
/lib
  └─ models      → Mongoose schemas (Transaction, Budget, etc.)
  └─ utils       → DB connection, helpers, constants
/public          → Static assets
```

---

## 🌟 Contributing

Want to contribute? Follow these steps:

1. **Fork** the repository to your GitHub account.
2. **Clone** your forked repo locally:
   ```bash
   git clone https://github.com/shk-khalid/piggyTrack.git
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
4. **Make your changes**, test everything works!
5. **Commit** your changes and push:
   ```bash
   git push origin feature-name
   ```
6. **Open a Pull Request** on GitHub and describe what you’ve changed. 🎉

We appreciate your contribution! 💖
---

## 📧 Contact

- **Email:** [shk.khalid18@gmail.com](mailto:shk.khalid18@gmail.com)  
- **GitHub:** [shk-khalid](https://github.com/shk-khalid)  
- **LinkedIn:** [shk-khalid](https://linkedin.com/in/shk-khalid)

---

🧾 Manage smarter. Spend wiser. Save better. With Piggytrack. 🐷💸


---