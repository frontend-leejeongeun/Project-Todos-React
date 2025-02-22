import React, { useState } from "react";

export default function TodoList({
  handleCheckTodo,
  handleDeleteTodo,
  filteredTodos,
  handleEditTodo, // 수정 함수 추가
}) {
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleDoubleClick = (todo) => {
    setEditingId(todo.id);
    setEditContent(todo.content);
  };

  const handleChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleBlur = () => {
    if (editContent.trim()) {
      handleEditTodo(editingId, editContent);
    }
    setEditingId(null);
  };

  const handleKeyDown = (e) => {
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
