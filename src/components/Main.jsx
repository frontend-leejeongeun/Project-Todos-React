import React, { useState, useCallback, useMemo } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

export default function Main() {
  const [todos, setTodos] = useState([]);
  const [currentShowType, setCurrentShowType] = useState("all");

  // 할 일 추가
  const addTodo = useCallback((content) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), content: content, isCompleted: false },
    ]);
  }, []);

  // 전체 완료 처리
  const handleCompleteAll = useCallback(() => {
    setTodos((prevTodos) => {
      const allCompleted = prevTodos.every((todo) => todo.isCompleted);
      return prevTodos.map((todo) => ({ ...todo, isCompleted: !allCompleted }));
    });
  }, []);

  // 남은 할 일 개수
  const getLeftItemsCount = useMemo(() => {
    return todos.filter((todo) => !todo.isCompleted).length;
  }, [todos]);

  // 필터 버튼 클릭 시 호출
  const handleShowTodosType = (type) => {
    setCurrentShowType(type);
  };

  // 완료된 할 일 삭제
  const handleClearCompletedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted));
  };

  // 할 일 체크(완료/미완료)
  const handleCheckTodo = useCallback((todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }, []);

  // 할 일 삭제
  const handleDeleteTodo = useCallback((todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  }, []);

  // 현재 필터 타입에 맞춰 할 일 렌더링
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (currentShowType) {
        case "active":
          return !todo.isCompleted;
        case "completed":
          return todo.isCompleted;
        default:
          return true;
      }
    });
  }, [todos, currentShowType]);

  return (
    <main className="todo-box">
      <button className="complete-all-btn" onClick={handleCompleteAll}>
        ✔
      </button>
      <TodoInput addTodo={addTodo} />
      <TodoList
        handleCheckTodo={handleCheckTodo}
        handleDeleteTodo={handleDeleteTodo}
        filteredTodos={filteredTodos}
      />
      <TodoFilter
        getLeftItemsCount={getLeftItemsCount}
        handleShowTodosType={handleShowTodosType}
        handleClearCompletedTodos={handleClearCompletedTodos}
        currentShowType={currentShowType}
      />
    </main>
  );
}
