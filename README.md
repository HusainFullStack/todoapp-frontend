# 📝 Todo App

A fullstack **Todo Management Application** built with:

- 🧠 **Frontend**: Next.js 15 (App Router)
- 🎨 **UI**: Tailwind CSS, Lucide Icons
- 📄 **PDF Viewer**: `@react-pdf-viewer`
- 🔐 **Auth**: Token-based authentication
- 🌐 **API**: Laravel Backend

## 📂 Features

- ✅ User Registration & Login
- 📋 Create, View, Edit, and Delete Todos
- 📎 PDF file viewing in-browser
- 🔐 Token-based authenticated requests
- ⚡ Smooth routing with App Router (`app/`)
- ⚙️ Axios instance with interceptors

## 🧰 Tech Stack

| Layer      | Tech                                   |
| ---------- | -------------------------------------- |
| Frontend   | Next.js, Tailwind CSS, React           |
| PDF Viewer | @react-pdf-viewer/core, default-layout |
| API Client | Axios with interceptors                |
| Icons      | Lucide-react                           |

## 🚀 Getting Started

### 📦 Requirements

- Node.js ≥ 18.x
- npm / yarn
- Laravel backend with APIs
- `.env.local` file setup

### 🔧 Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/todo-next-app.git
   cd todo-next-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**
   Create `.env` file:

   ```env
   NEXT_PUBLIC_API_URI=http://localhost:8000/api
   NEXT_PUBLIC_FILES_URI=http://localhost:8000/files
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔐 Authentication

- Token is stored in `localStorage`
- Axios adds it via request interceptor

## 🗂 Routes Overview

| Route                 | Description            |
| --------------------- | ---------------------- |
| `/`                   | Landing page           |
| `/login`              | Login form             |
| `/register`           | Registration form      |
| `/dashboard`          | Main todo list         |
| `/dashboard/view/:id` | View todo + PDF viewer |
| `/dashboard/edit/:id` | Edit todo form         |

## 📁 Project Structure

```
app/
│
├── components/         # Reusable components (AuthForm, Button, Modals)
├── dashboard/          # View/Edit todo pages
├── (login|register)/   # Auth pages
├── layout.js           # Root layout
├── globals.css         # Tailwind + custom styles
```

## 📦 Packages Used

```json
{
  "next": "15.3.4",
  "react": "^19.0.0",
  "tailwindcss": "^4",
  "@react-pdf-viewer/core": "^3.8.0",
  "lucide-react": "^0.518.0",
  "axios": "^1.10.0"
}
```

## 🔍 Troubleshooting

### ⚠️ Hydration Warning in Development

> **Note:**
> You may see the following warning during development:
>
> ```
> Hydration failed because the server rendered HTML didn't match the client...
> ```
>
> 🔹 This is a known behavior in Next.js during development mode (especially with dynamic values or client-only logic like `localStorage`, `Date.now()`, or `window`).
> 🔹 It does **not** occur in production builds, and is generally safe to ignore while developing.
> 🔹 To avoid it, wrap browser-only logic inside `useEffect()` so it runs only on the client.
>
> ✅ You can safely proceed if this appears only in development.


## 📄 License

This project is open-source and available under the [MIT License](LICENSE).