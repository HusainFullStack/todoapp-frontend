"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import {
  ArrowLeft,
  CalendarDays,
  User,
  Flag,
  Trash2,
  Edit,
} from "lucide-react";
import ConfirmDeleteModal from "@/app/components/ConfirmDeleteModal";

export default function ViewTodoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [createdAtDisplay, setCreatedAtDisplay] = useState("");

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const dummyTodos = [
      {
        id: 1,
        title: "Finish frontend UI",
        description: "Build the dashboard page and add actions",
        file: "/file/file.pdf",
        assignedTo: "isha@todoapp.com",
        createdAt: "2025-06-18T10:23:00",
        priority: "High",
      },
      {
        id: 2,
        title: "Connect Laravel API",
        description: "Set up backend endpoints for CRUD",
        file: "/file/file.pdf",
        assignedTo: "dev@laravelapi.com",
        createdAt: "2025-06-19T09:45:00",
        priority: "Medium",
      },
    ];

    const found = dummyTodos.find((t) => t.id === parseInt(id));
    setTodo(found || null);
    setLoading(false);


    if (found) {
      const date = new Date(found.createdAt);
      setCreatedAtDisplay(date.toLocaleString()); 
    }
  }, [id]);

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    alert("Task deleted!");
    setDeleteId(null);
    router.push("/dashboard");
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Loading todo...
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Todo not found
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-2 my-5 lg:mx-auto md:my-10 bg-white p-6 rounded-xl border border-zinc-300 space-y-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-black"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">{todo.title}</h1>
            <p className="text-gray-600 text-sm">{todo.description}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/dashboard/edit/${todo.id}`)}
              className="flex items-center cursor-pointer font-bold gap-1 px-3 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              <Edit className="size-4" />
              Edit
            </button>

            <button
              onClick={() => confirmDelete(todo.id)}
              className="flex items-center cursor-pointer font-bold gap-1 px-3 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              <Trash2 className="size-4" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
            <User className="w-5 h-5 mt-1 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Assigned To</p>
              <p className="text-base text-gray-800 font-medium">
                {todo.assignedTo}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
            <CalendarDays className="w-5 h-5 mt-1 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="text-base text-gray-800 font-medium">
                {createdAtDisplay}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
            <Flag className="w-5 h-5 mt-1 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Priority</p>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityStyle(
                  todo.priority
                )}`}
              >
                {todo.priority}
              </span>
            </div>
          </div>
        </div>

        {todo.file && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Attached PDF:</p>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <div className="h-[75vh] border rounded-lg overflow-hidden">
                <Viewer
                  fileUrl={todo.file}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </div>
            </Worker>
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        item="this task"
      />
    </>
  );
}
