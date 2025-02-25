import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import todoStore from "../store";

interface Todo {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
}

const BASE_URL = "http://localhost:5000";
const TODOS_QUERY_KEY = ["todos"];

export function useFetchTodos() {
  return useQuery<Todo[]>({
    queryKey: TODOS_QUERY_KEY,
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/todos`);
      todoStore.setTodos(response.data);
      return response.data;
    },
  });
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, { title: string; content: string }>({
    mutationFn: async ({
      title,
      content,
    }: {
      title: string;
      content: string;
    }) => {
      const newTodo: Todo = {
        id: uuidv4(),
        title,
        content,
        isCompleted: false,
      };
      await axios.post(`${BASE_URL}/todos`, newTodo);
      return newTodo;
    },
    onSuccess: (newTodo: Todo) => {
      todoStore.addTodo(newTodo);
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}

export function useEditTodo() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { todoId: string; newContent: string }>({
    mutationFn: async ({ todoId, newContent }) => {
      const todo = todoStore.todos.find((t) => t.id === todoId);
      if (todo) {
        const updatedTodo = { ...todo, content: newContent };
        await axios.put(`${BASE_URL}/todos/${todoId}`, updatedTodo);
        todoStore.updateTodo(updatedTodo);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}

export function useCompleteAll() {
  const queryClient = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: async () => {
      const allCompleted = todoStore.todos.every((todo) => todo.isCompleted);
      const updatedTodos = todoStore.todos.map((todo) => ({
        ...todo,
        isCompleted: !allCompleted,
      }));
      await Promise.all(
        updatedTodos.map((todo) =>
          axios.put(`${BASE_URL}/todos/${todo.id}`, todo)
        )
      );
      todoStore.completeAll();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}

export function useCheckTodo() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (todoId: string) => {
      const todo = todoStore.todos.find((t) => t.id === todoId);
      if (todo) {
        const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
        await axios.put(`${BASE_URL}/todos/${todoId}`, updatedTodo);
        todoStore.updateTodo(updatedTodo);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (todoId: string) => {
      await axios.delete(`${BASE_URL}/todos/${todoId}`);
      todoStore.deleteTodo(todoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}

export function useClearCompletedTodos() {
  const queryClient = useQueryClient();
  return useMutation<void, Error>({
    mutationFn: async () => {
      const completedTodos = todoStore.todos.filter((todo) => todo.isCompleted);
      await Promise.all(
        completedTodos.map((todo) =>
          axios.delete(`${BASE_URL}/todos/${todo.id}`)
        )
      );
      todoStore.clearCompletedTodos();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
}
