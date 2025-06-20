'use client'
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-3xl font-bold">Welcome to the Todo App</h1>
        <p className="text-gray-600">
          A fullstack project using Next.js, Tailwind, and Laravel.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Login
          </Link>
          <Link href="/register" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
