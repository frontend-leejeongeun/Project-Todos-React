import { makeAutoObservable, configure } from "mobx";

configure({
  enforceActions: "always",
});

export interface Todo {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
}

class TodoStore {
  todos: Todo[] = [];
  currentShowType: string = "all";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get filteredTodos() {
    switch (this.currentShowType) {
      case "active":
        return this.todos.filter((todo) => !todo.isCompleted);
      case "completed":
        return this.todos.filter((todo) => todo.isCompleted);
      default:
        return this.todos;
    }
  }

  get leftItemsCount() {
    return this.todos.filter((todo) => !todo.isCompleted).length;
  }

  setTodos(todos: Todo[]) {
    this.todos = todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  updateTodo(updatedTodo: Todo) {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
    }
  }

  deleteTodo(todoId: string) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  clearCompletedTodos() {
    this.todos = this.todos.filter((todo) => !todo.isCompleted);
  }

  completeAll() {
    const allCompleted = this.todos.every((todo) => todo.isCompleted);
    this.todos = this.todos.map((todo) => ({
      ...todo,
      isCompleted: !allCompleted,
    }));
  }

  setCurrentShowType(showType: string) {
    this.currentShowType = showType;
  }
}

const todoStore = new TodoStore();
export default todoStore;
