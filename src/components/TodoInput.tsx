import React, { useState, ChangeEvent, KeyboardEvent } from "react";

interface TodoInputProps {
  addTodo: (content: string) => void;
}

export default function TodoInput({ addTodo }: TodoInputProps) {
  const [newTodo, setNewTodo] = useState<string>("");

  // 새로운 할 일 입력 처리
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTodo(e.target.value);

  // 엔터 키 눌렀을 때 새로운 할 일 추가
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo.trim() !== "") {
      addTodo(newTodo);
      setNewTodo(""); // 입력창 초기화
    }
  };

  return (
    <div className="todo-input-box">
      <input
        type="text"
        className="todo-input"
        placeholder="해야 할 일을 입력해주세요. Enter"
        value={newTodo}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
