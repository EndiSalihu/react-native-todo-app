import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, fetchTodos, updateTodo, addTodo, toggleTodo } from "../api/todos";

export interface Todo {
  id: string;
  title: string,
  completed: boolean;
  createdAt: string;
}

export const useAddTodo = () => {
  const queryClient = useQueryClient();

    return useMutation({
    mutationFn: (todo: Todo) => addTodo(todo),
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

export const useTodos = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos
  });

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: string) => deleteTodo(todoId),
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, title }: { todoId: string; title: string }) => updateTodo(todoId, title),
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ["todos"] })
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, completed }: { todoId: string; completed: boolean }) => toggleTodo(todoId, completed),
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ["todos"] })
  });
};
