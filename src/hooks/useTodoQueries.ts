import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import todoStore from "../store";

const BASE_URL = "http://localhost:5000";
const TODOS_QUERY_KEY = ["todos"];

interface Todo {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
}

function useTodoMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  onSuccess?: (data: TData) => void
) {
  const queryClient = useQueryClient();
  return useMutation<TData, Error, TVariables>({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
}

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
  return useTodoMutation<Todo, { title: string; content: string }>(
    async ({ title, content }) => {
      const newTodo: Todo = {
        id: uuidv4(),
        title,
        content,
        isCompleted: false,
      };
      await axios.post(`${BASE_URL}/todos`, newTodo);
      return newTodo;
    },
    (newTodo) => {
      todoStore.addTodo(newTodo);
    }
  );
}

export function useEditTodo() {
  return useTodoMutation<void, { todoId: string; newContent: string }>(
    async ({ todoId, newContent }) => {
      const todo = todoStore.todos.find((t) => t.id === todoId);
      if (todo) {
        const updatedTodo = { ...todo, content: newContent };
        await axios.put(`${BASE_URL}/todos/${todoId}`, updatedTodo);
        todoStore.updateTodo(updatedTodo);
      }
    }
  );
}

export function useCompleteAll() {
  return useTodoMutation<void, void>(async () => {
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
  });
}

export function useCheckTodo() {
  return useTodoMutation<void, string>(async (todoId) => {
    const todo = todoStore.todos.find((t) => t.id === todoId);
    if (todo) {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      await axios.put(`${BASE_URL}/todos/${todoId}`, updatedTodo);
      todoStore.updateTodo(updatedTodo);
    }
  });
}

export function useDeleteTodo() {
  return useTodoMutation<void, string>(async (todoId) => {
    await axios.delete(`${BASE_URL}/todos/${todoId}`);
    todoStore.deleteTodo(todoId);
  });
}

export function useClearCompletedTodos() {
  return useTodoMutation<void, void>(async () => {
    const completedTodos = todoStore.todos.filter((todo) => todo.isCompleted);
    await Promise.all(
      completedTodos.map((todo) => axios.delete(`${BASE_URL}/todos/${todo.id}`))
    );
    todoStore.clearCompletedTodos();
  });
}
