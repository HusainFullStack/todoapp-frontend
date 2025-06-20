"use client";
import TodoForm from "@/app/components/TodoForm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export default function AddTodoPage() {
  const router = useRouter();

  const handleAdd = (newTodo) => {
    console.log("New todo submitted:", newTodo);
    alert("Todo added (check console)");
    router.push("/dashboard");
  };

  return (

    <div className="max-w-2xl mx-3 lg:mx-auto my-5 md:my-10 bg-white p-6 rounded-xl border-zinc-200 border">
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
