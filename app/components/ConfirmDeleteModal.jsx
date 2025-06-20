"use client";

import { X, Trash2 } from "lucide-react";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-lg px-5 bg-black/20 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center mb-4">
          <Trash2 className="w-10 h-10 text-red-500" />
        </div>

        <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
          Confirm Delete
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>

        <div className="flex justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 font-bold cursor-pointer border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 font-bold py-2 cursor-pointer bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
