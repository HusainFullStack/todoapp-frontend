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
  Loader2,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";

import ConfirmDeleteModal from "@/app/components/ConfirmDeleteModal";
import { Axios } from "@/app/lib/Axios";
import { toast } from "sonner";
import { useTodos } from "@/app/context/TodoContext";
import { getPriorityStyle } from "../../page";

export default function ViewTodoPage() {
  const { id } = useParams();
  const router = useRouter();
  const { deleteTodo } = useTodos();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await Axios.get(`/tasks/${id}`);
        setTodo(res.data.data);
      } catch {
        toast.error("Failed to load task.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      await Axios.put(`/tasks/${todo.id}`, {
        ...todo,
        status: newStatus,
      });
      setTodo({ ...todo, status: newStatus });
      toast.success("Status updated.");
    } catch {
      toast.error("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  const handleConfirmDelete = () => {
    deleteTodo(todo.id);
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="text-center text-red-600 text-lg mt-16">Task not found</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-gray-900 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </button>

      <div className="mt-6 bg-white rounded-2xl p-6 space-y-8 border border-gray-200">

        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{todo.title}</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/dashboard/edit/${todo.id}`)}
              className="bg-green-600 font-bold cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1">
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => setDeleteId(todo.id)}
              className="bg-red-600 cursor-pointer font-bold hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-zinc-300">
            <User className="w-5 h-5 mt-1 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Assigned By</p>
              <p className="text-sm font-medium text-gray-800">
                {todo.user?.email || "Unknown"} ({todo.user?.name || "Unknown"})
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-zinc-300">
            <User className="w-5 h-5 mt-1 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Assigned To</p>
              <p className="text-sm font-medium text-gray-800">
                {todo.assigned_user?.email || "Unknown"} ({todo.assigned_user?.name || "Unknown"})
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-zinc-300">
            <CalendarDays className="w-5 h-5 mt-1 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="text-sm font-medium text-gray-800">
                {new Date(todo.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-zinc-300">
            <Flag className="w-5 h-5 mt-1 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Priority</p>
              <p
                className={`inline-block px-2 py-1 rounded-md text-base mt-2 font-semibold capitalize ${getPriorityStyle(
                  todo.priority
                )}`}
              >
                {todo.priority}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-zinc-300">
            <BadgeCheck className="w-5 h-5 mt-1 text-gray-500" />
            <div className="flex flex-col gap-1 w-full">
              <p className="text-sm text-gray-500">Status</p>
              <div className="relative w-2/3">
                <select
                  value={todo.status}
                  onChange={handleStatusChange}
                  className={`appearance-none cursor-pointer w-full px-3 py-2 pr-10 rounded-md border text-sm font-medium capitalize focus:outline-none focus:ring-2 focus:ring-blue-500 ${{
                    pending: "bg-indigo-100 text-indigo-800 border-indigo-300",
                    in_progress: "bg-purple-100 text-purple-800 border-purple-300",
                    completed: "bg-green-100 text-green-800 border-green-300",
                  }[todo.status]
                    }`}
                  disabled={updating}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
              </div>
            </div>
          </div>


        </div>

        <div className="w-full">
          <h2 className="text-xl font-semibold">Task description</h2>
          <p className="text-gray-500 mt-1">{todo.description}</p>
        </div>

        {todo.file_path && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Attached PDF:</p>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <div className="h-[75vh] border rounded-lg overflow-hidden">
                <Viewer
                  fileUrl={`${process.env.NEXT_PUBLIC_FILES_URI}/${todo.file_path}`}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </div>
            </Worker>
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        item="this task"
      />
    </div>
  );
}
