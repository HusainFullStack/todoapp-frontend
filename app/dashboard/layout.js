"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TodoProvider } from "../context/TodoContext";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

if (loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 text-sm tracking-wide">Authenticating your session...</p>
    </div>
  );
}


  return <TodoProvider>{children}</TodoProvider>;
}
