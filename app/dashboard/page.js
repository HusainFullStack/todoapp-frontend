"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Edit,
  Eye,
  File,
  FileText,
  UserRoundPlus,
  ClipboardPlus,
} from "lucide-react";
import AddUserModal from "../components/AddUserModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";


export default function DashboardPage() {
  const router = useRouter();

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish frontend UI",
      description: "Build the dashboard page and add actions",
      file: "dummy.pdf",
      assignedTo: "isha@todoapp.com",
      priority: "High",
    },
    {
      id: 2,
      title: "Connect Laravel API",
      description: "Set up backend endpoints for CRUD",
      file: "dummy2.pdf",
      assignedTo: "dev@laravelapi.com",
      priority: "Medium",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [users, setUsers] = useState([
    { email: "isha@todoapp.com", name: "Isha" },
    { email: "dev@laravelapi.com", name: "Dev" },
  ]);

  const handleAddUser = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    setTodos((prev) => prev.filter((todo) => todo.id !== deleteId));
    setDeleteId(null);
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

  return (
    <div className="py-6 md:py-8 px-5 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">Your Tasks</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center cursor-pointer gap-2 font-bold bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg"
          >
            <UserRoundPlus className="size-5" />
            <span className="hidden md:inline text-sm">Add User</span>
          </button>

          <button
            onClick={() => router.push("/dashboard/add")}
            className="flex items-center cursor-pointer font-bold gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg"
          >
            <ClipboardPlus className="size-5" />
            <span className="hidden md:inline text-sm">Add Task</span>
          </button>
        </div>
      </div>

      {/* Task List */}
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-20 space-y-4">
          <ClipboardList className="size-12 text-gray-400" />
          <p className="text-xl font-medium mb-1">No tasks available</p>
          <p className="text-sm text-gray-400">
            You haven’t added any tasks yet. Click “Add Task” to get started.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white border border-zinc-300 rounded-xl p-5 flex flex-col justify-between"
            >
              {/* Top */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {todo.title}
                  </h3>
                  <span
                    className={`text-md font-medium px-2 py-1 rounded ${getPriorityStyle(
                      todo.priority
                    )}`}
                  >
                    {todo.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{todo.description}</p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-800">Assigned To:</span>{" "}
                  {todo.assignedTo}
                </p>
              </div>

              <hr className="my-3 border-zinc-300" />

              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1 text-sm text-gray-700 bg-gray-100 rounded px-2 py-1">
                  <FileText className="size-4 text-red-500" />
                  <span>{todo.file}</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => router.push(`/dashboard/view/${todo.id}`)}
                    className="text-purple-600 cursor-pointer hover:text-purple-800  transition"
                    title="View"
                  >
                    <Eye className="size-5" />
                  </button>

                  <button
                    onClick={() => router.push(`/dashboard/edit/${todo.id}`)}
                    className="text-green-600 cursor-pointer hover:text-green-800 transition"
                    title="Edit"
                  >
                    <Edit className="size-5" />
                  </button>

                  <button
                    onClick={() => confirmDelete(todo.id)}
                    className="text-red-500 cursor-pointer hover:text-red-700 transition"
                    title="Delete"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
      />

      <ConfirmDeleteModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
