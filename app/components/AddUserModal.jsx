"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";
import { Axios } from "@/app/lib/Axios";
import { toast } from "sonner";

export default function AddUserModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await Axios.post("/register", {
        name,
        email,
        password,
      });

      toast.success("User registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.error || error.response.data.message);
      } else {
        toast.error("Failed to register user.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 px-5 backdrop-blur-lg bg-black/20 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 cursor-pointer right-3 text-gray-400 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700 block mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-zinc-300 px-4 py-2 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-zinc-300 px-4 py-2 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-zinc-300 px-4 py-2 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <Button
            loading={loading}
            style={`${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            text={loading ? "Processing..." : "Add User"}
          />
        </form>
      </div>
    </div>
  );
}
