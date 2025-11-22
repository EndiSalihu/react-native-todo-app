import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export const addTodo = async (todo: { title: string }) => {
  const response = await api.post<Todo>("/todos", {
    ...todo,
    completed: false,
    createdAt: new Date().toISOString(),
  });
  return response.data;
};

export const fetchTodos = async () => {
  const response = await api.get<Todo[]>("/todos");
  return response.data;
};

export const deleteTodo = async (todoId: string) => {
  const response = await api.delete(`/todos/${todoId}`);
  return response.data;
};

export const updateTodo = async (todoId: string, title: string) => {
  const response = await api.patch<Todo>(`/todos/${todoId}`, { title });
  return response.data;
};

export const toggleTodo = async (todoId: string, completed: boolean) => {
  const response = await api.patch<Todo>(`/todos/${todoId}`, { completed });
  return response.data;
};
