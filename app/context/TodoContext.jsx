"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Axios } from "../lib/Axios";
import { toast } from "sonner";

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      const { data } = await Axios.get("/tasks");
      setTodos(data.data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
      toast.error("Unable to fetch todos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      await Axios.delete(`/tasks/${id}`);
      await fetchTodos();
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, loading, deleteTodo, fetchTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
