"use client";

import TodoForm from "@/app/components/TodoForm";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Axios } from "@/app/lib/Axios";
import { toast } from "sonner";
import { useTodos } from "@/app/context/TodoContext";

export default function EditTodoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [todo, setTodo] = useState(null)
  const { todos, fetchTodos } = useTodos()


  useEffect(() => {
    const found = todos.find((t) => t.id === parseInt(id));
    if (found) {
      setTodo({
        id: found.id,
        title: found.title,
        description: found.description,
        priority: found.priority.charAt(0).toUpperCase() + found.priority.slice(1),
        assignedTo: found.assigned_to,
        file: found.file_path || null,
      });
    }
  }, [id, todos]);


  const handleUpdate = async (updatedTodo) => {
    const { title, description, priority, assigned_to } = updatedTodo;

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

    try {
      await Axios.post(`/tasks/${id}?_method=PUT`, updatedTodo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchTodos();
      toast.success("Task updated successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err?.response?.data?.message || "Failed to update task.");
    }
  };



  if (!todo) {
    return (
      <div className="text-center text-red-600 mt-20">Task not found.</div>
    );
  }

  return (
    <div className="max-w-2xl mx-3 md:mx-auto my-5 md:my-10 bg-white p-6 rounded-xl border-zinc-200 border">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Edit Task</h1>
        <button
          onClick={() => router.back()}
          className="inline-flex cursor-pointer items-center gap-1 text-sm text-gray-600 hover:text-black transition"
        >
          <ArrowLeft className="size-4" />
          Go Back
        </button>
      </div>

      <TodoForm
        initialData={todo}
        onSubmit={handleUpdate}
        buttonLabel="Update Task"
      />
    </div>
  );
}
