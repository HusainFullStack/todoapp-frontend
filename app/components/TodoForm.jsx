"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "./Button";
import { Axios } from "@/app/lib/Axios";
import { toast } from "sonner";

export default function TodoForm({
  onSubmit,
  initialData = {},
  buttonLabel = "Add Task",
}) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [formInitialized, setFormInitialized] = useState(false); // 👈 Fix Flag

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "",
    file: null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await Axios.get("/users");
        setUsers(data.users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        toast.error("Failed to load users.");
      }
    };
    fetchUsers();
  }, []);

  // Fix: Only run once when users and initialData are ready
  useEffect(() => {
    if (
      !formInitialized &&
      initialData &&
      Object.keys(initialData).length > 0 &&
      users.length > 0
    ) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        assignedTo: initialData.assignedTo?.toString() || "",
        priority: initialData.priority || "",
        file: null,
      });
      setFormInitialized(true); // 👈 So this never repeats
    }
  }, [initialData, users, formInitialized]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const todo = {
      title: form.title,
      description: form.description,
      assigned_to: parseInt(form.assignedTo),
      priority: form.priority.toLowerCase(),
      file_path: form.file,
    };

    onSubmit(todo);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          placeholder="Enter task title"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          rows={3}
          placeholder="Describe the task..."
          className="w-full border border-gray-300 rounded-lg px-4 h-32 py-2"
        />
      </div>

      {/* Assigned To */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Assign To
        </label>
        <div className="relative">
          <select
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10"
            required
          >
            <option disabled value="">
              -- Select User --
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id.toString()}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Priority */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <div className="relative">
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option disabled defaultValue value="">
              -- Select Task Priority --
            </option>
            <option value="High">🔥 High</option>
            <option value="Medium">⚖️ Medium</option>
            <option value="Low">🌱 Low</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
        </div>
      </div>

      {/* File */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Attach File
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.md"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, file: e.target.files[0] }))
          }
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {initialData.file && !form.file && (
          <p className="text-sm text-gray-500 mt-1">
            Existing file: {initialData.file}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        loading={loading}
        text={loading ? "Processing..." : buttonLabel}
        style={`${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      />
    </form>
  );
}
