export default function TodoList({
  handleCheckTodo,
  handleDeleteTodo,
  filteredTodos,
}) {
  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <li
          className={`todo-item ${todo.isCompleted ? "checked" : ""}`}
          key={todo.id}
        >
          <div className="checkbox" onClick={() => handleCheckTodo(todo.id)}>
            {todo.isCompleted ? "✔" : ""}
          </div>
          <div className="todo">{todo.content}</div>
          <button className="delBtn" onClick={() => handleDeleteTodo(todo.id)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
