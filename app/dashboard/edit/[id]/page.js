"use client";
import TodoForm from "@/app/components/TodoForm";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function EditTodoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [todo, setTodo] = useState(null);


  useEffect(() => {
    const dummyTodos = [
      {
        id: 1,
        title: "Finish frontend UI",
        description: "Build the dashboard page and add actions",
        file: "/file/file.pdf",
        assignedTo: "isha@todoapp.com",
        priority: "High",
      },
      {
        id: 2,
        title: "Connect Laravel API",
        description: "Set up backend endpoints for CRUD",
        file: "/file/file.pdf",
        assignedTo: "dev@laravelapi.com",
        priority: "Medium",
      },
    ];

    const found = dummyTodos.find((t) => t.id === parseInt(id));
    setTodo(found || null);
  }, [id]);

  const handleUpdate = (updatedTodo) => {
    console.log("Updated todo:", updatedTodo);
    alert("Todo updated! (check console)");
    router.push("/dashboard");
  };

  if (!todo) {
    return (
      <div className="text-center text-gray-600 mt-20">Loading todo...</div>
    );
  }

  return (
    <div className="max-w-2xl mx-3 lg:mx-auto my-5 md:my-10 bg-white p-6 rounded-xl border-zinc-200 border">
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
