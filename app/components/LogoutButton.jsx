"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { Axios } from "../lib/Axios";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await Axios.post("/logout");
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Logout failed. Please try again."
      );
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center cursor-pointer gap-2 font-bold bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2.5 rounded-lg transition"
    >
      <LogOut className="size-5" />
      <span className="hidden md:inline text-sm">Logout</span>
    </button>
  );
}
