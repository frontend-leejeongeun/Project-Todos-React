import { observer } from "mobx-react-lite";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import todoStore from "../store";
import {
  useFetchTodos,
  useAddTodo,
  useEditTodo,
  useCompleteAll,
  useCheckTodo,
  useDeleteTodo,
  useClearCompletedTodos,
} from "../hooks/useTodoQueries";

const Main = observer(() => {
  const { isLoading } = useFetchTodos();
  const addTodoMutation = useAddTodo();
  const editTodoMutation = useEditTodo();
  const completeAllMutation = useCompleteAll();
  const checkTodoMutation = useCheckTodo();
  const deleteTodoMutation = useDeleteTodo();
  const clearCompletedTodosMutation = useClearCompletedTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="todo-box">
      <button
        className="complete-all-btn"
        onClick={() => completeAllMutation.mutate()}
      >
        ✔
      </button>
      <TodoInput
        addTodo={(content) =>
          addTodoMutation.mutate({ title: content, content })
        }
      />
      <TodoList
        handleCheckTodo={(id) => checkTodoMutation.mutate(id)}
        handleDeleteTodo={(id) => deleteTodoMutation.mutate(id)}
        filteredTodos={todoStore.filteredTodos}
        handleEditTodo={(id, content) =>
          editTodoMutation.mutate({ todoId: id, newContent: content })
        }
      />
      <TodoFilter
        leftItemsCount={todoStore.leftItemsCount}
        handleShowTodosType={todoStore.setCurrentShowType}
        handleClearCompletedTodos={() => clearCompletedTodosMutation.mutate()}
        currentShowType={todoStore.currentShowType}
      />
    </main>
  );
});

export default Main;
