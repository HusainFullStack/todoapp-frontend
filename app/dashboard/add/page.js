"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TodoForm from "@/app/components/TodoForm";
import { useTodos } from "@/app/context/TodoContext";
import { Axios } from "@/app/lib/Axios";
import { toast } from "sonner";

export default function AddTodoPage() {
  const router = useRouter();
  const { fetchTodos } = useTodos();

  const handleAdd = async (newTodo) => {
    const { title, description, priority, assigned_to, file_path } = newTodo;

    if (!title || title.trim().length < 3) {
      toast.error("Title is required and must be at least 3 characters.");
      return;
    }

    if (!description || description.trim().length < 10) {
      toast.error("Description is required and must be at least 10 characters.");
      return;
    }

    if (!priority) {
      toast.error("Priority is required.");
      return;
    }

    if (!assigned_to) {
      toast.error("Assigned user is required.");
      return;
    }

    if (!file_path) {
      toast.error("A valid PDF file is required.");
      return;
    }

    try {
      const { data } = await Axios.post("/tasks", newTodo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchTodos();
      toast.success("Task added successfully");
      router.push("/dashboard");
    } catch (err) {
      console.error("Create failed:", err);
      toast.error(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-3 md:mx-auto my-5 md:my-10 bg-white p-6 rounded-xl border-zinc-200 border">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Add New Task</h1>
        <button
          onClick={() => router.back()}
          className="inline-flex cursor-pointer items-center gap-1 text-sm text-gray-600 hover:text-black transition"
        >
          <ArrowLeft className="size-4" />
          Go Back
        </button>
      </div>
      <TodoForm onSubmit={handleAdd} />
    </div>
  );
}
