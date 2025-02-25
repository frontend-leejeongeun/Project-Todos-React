import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Todo } from "../store";

interface TodoListProps {
  handleCheckTodo: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  filteredTodos: Todo[];
  handleEditTodo: (id: string, content: string) => void;
}

export default function TodoList({
  handleCheckTodo,
  handleDeleteTodo,
  filteredTodos,
  handleEditTodo,
}: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  const handleDoubleClick = (todo: Todo) => {
    setEditingId(todo.id);
    setEditContent(todo.content);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value);
  };

  const handleBlur = () => {
    if (editContent.trim() && editingId) {
      handleEditTodo(editingId, editContent);
    }
    setEditingId(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

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
          {editingId === todo.id ? (
            <input
              type="text"
              value={editContent}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <div className="todo" onDoubleClick={() => handleDoubleClick(todo)}>
              {todo.content}
            </div>
          )}
          <button className="delBtn" onClick={() => handleDeleteTodo(todo.id)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
