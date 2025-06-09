````markdown
# 📊 Frontend Filter Optimization

A high-performance React + TypeScript dashboard that supports advanced filtering and rendering of large datasets (50k+ rows) using Material UI and `react-window`.

## ✨ Features

- ⚡ Fast filter dropdowns with virtualization
- 📑 Multi-select + search filters for each column
- 📋 Data table with:
  - Pagination (100 rows per page)
  - Vertical scroll (20 visible rows)
  - Row numbering
- 🌐 Responsive and clean UI (light theme)
- 🧠 Optimized for large datasets
- ✅ Deployed on Vercel

## 🧰 Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI)](https://mui.com/)
- [react-window](https://react-window.vercel.app/)
- Context API for filter state management

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yug-sinha/frontend-filter-optimization.git
cd frontend-filter-optimization
````

### 2. Install Dependencies

Ensure Node.js v20+ is installed. Then run:

```bash
npm install
```

### 3. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📦 Build for Production

```bash
npm run build
```

## ▶️ Preview Production Build

```bash
npm run preview
```

---

## ☁️ Deploy on Vercel

This project is optimized for Vercel deployment.

### Notes:

* All test files (`*.test.tsx`) must be excluded or removed.
* Ensure types for optional dependencies are installed:

```bash
npm install --save-dev @types/react-window
```

---

## 🗂️ Folder Structure

```
frontend-filter-optimization/
├── public/
├── src/
│   ├── components/
│   │   ├── DataTable.tsx
│   │   └── FilterDropdown.tsx
│   ├── context/
│   │   └── FilterContext.tsx
│   ├── data/
│   │   └── dataset.csv
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

---

## ⚠️ Common Issues

### 🔹 `Cannot find module 'react-window'`

```bash
npm install react-window
npm install --save-dev @types/react-window
```

### 🔹 Test build errors on Vercel

* Ensure test files are removed or excluded in `tsconfig.json`.

```json
"exclude": ["**/*.test.tsx", "**/*.test.ts"]
```

---

## 👨‍💻 Author

**Yug Sinha**
GitHub: [@yug-sinha](https://github.com/yug-sinha)

---

## 📄 License

This project is licensed under the MIT License.

```

---

Let me know if you want to add badges (e.g., Vercel, GitHub actions) or documentation for CSV file format.
```
