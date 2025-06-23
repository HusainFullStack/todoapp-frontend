"use client";

import { useRouter } from "next/navigation";
import {
  Trash2,
  Edit,
  Eye,
  FileText,
  UserRoundPlus,
  ClipboardPlus,
  ClipboardList,
} from "lucide-react";

import { useTodos } from "../context/TodoContext";
import AddUserModal from "../components/AddUserModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import LogoutButton from "../components/LogoutButton";
import { useState } from "react";


export const getPriorityStyle = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const { todos, deleteTodo, loading } = useTodos();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleAddUser = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  const confirmDelete = (id) => setDeleteId(id);

  const handleConfirmDelete = () => {
    deleteTodo(deleteId);
    setDeleteId(null);
  };



  return (
    <div className="py-6 md:py-8 px-5 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-y-3 mb-8">
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

          <LogoutButton />
        </div>
      </div>


      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-20 space-y-4">
          <ClipboardList className="size-12 text-gray-400" />
          <p className="text-xl font-medium mb-1">No tasks available</p>
          <p className="text-sm text-gray-400">
            You haven’t added any tasks yet. Click “Add Task” to get started.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white border border-zinc-300 rounded-xl p-5 flex flex-col justify-between"
            >
              <div className="space-y-1 mb-3">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="text-lg line-clamp-1 font-semibold leading-[1.1] text-gray-900">
                    {todo.title}
                  </h3>
                  <span
                    className={`text-md font-medium px-2 py-1 capitalize rounded ${getPriorityStyle(
                      todo.priority
                    )}`}
                  >
                    {todo.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-1 w-4/5">{todo.description}</p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-800">Assigned To:</span>{" "}
                  {todo.assigned_user.email}
                </p>
              </div>

              <hr className="my-3 border-zinc-300" />

              <div className="flex items-center justify-between">
                {!!todo.file_path && (<div className="inline-flex items-center gap-1 text-sm font-semibold bg-blue-100 text-blue-500 border border-blue-500 rounded px-2 py-1">
                  <FileText className="size-4 text-blue-500" />
                  <span>{(todo.file_path.split('/')[1]).split('_')[0]}.pdf</span>
                </div>)}


                <div className="flex items-center gap-3">
                  {["view", "edit"].map((action) => (
                    <div key={action} className="relative group">
                      <button
                        onClick={() => router.push(`/dashboard/${action}/${todo.id}`)}
                        className={`${action === "view"
                          ? "text-purple-600 hover:text-purple-800"
                          : "text-green-600 hover:text-green-800"
                          } cursor-pointer transition`}
                      >
                        {action === "view" ? <Eye className="size-5" /> : <Edit className="size-5" />}
                      </button>
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-xl bg-zinc-700 text-zinc-100 text-xs shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-20">
                        {action === "view" ? "View" : "Edit"}
                      </div>
                    </div>
                  ))}

                  <div className="relative group">
                    <button
                      onClick={() => confirmDelete(todo.id)}
                      className="text-red-500 cursor-pointer hover:text-red-700 transition"
                    >
                      <Trash2 className="size-5" />
                    </button>
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-xl bg-zinc-700 text-zinc-100 text-xs shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-20">
                      Delete
                    </div>
                  </div>
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
