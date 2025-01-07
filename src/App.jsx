import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [currentShowType, setCurrentShowType] = useState("all");

  // 새로운 할 일 입력 처리
  const handleInputChange = (e) => setNewTodo(e.target.value);

  // 엔터 키 눌렀을 때 새로운 할 일 추가
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), content: newTodo, isCompleted: false },
      ]);
      setNewTodo(""); // 입력창 초기화
    }
  };

  // 할 일 체크(완료/미완료)
  const handleCheckTodo = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // 할 일 삭제
  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  // 전체 완료 처리
  const handleCompleteAll = () => {
    const allCompleted = todos.every((todo) => todo.isCompleted);
    setTodos(todos.map((todo) => ({ ...todo, isCompleted: !allCompleted })));
  };

  // 남은 할 일 개수
  const getLeftItemsCount = () =>
    todos.filter((todo) => !todo.isCompleted).length;

  // 필터 버튼 클릭 시 호출
  const handleShowTodosType = (type) => {
    setCurrentShowType(type);
  };

  // 현재 필터 타입에 맞춰 할 일 렌더링
  const filteredTodos = todos.filter((todo) => {
    switch (currentShowType) {
      case "active":
        return !todo.isCompleted;
      case "completed":
        return todo.isCompleted;
      default:
        return true;
    }
  });

  // 완료된 할 일 삭제
  const handleClearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  return (
    <section className="todo-wrapper">
      <header className="todo-title">todos</header>
      <main className="todo-box">
        <div className="todo-input-box">
          <button className="complete-all-btn" onClick={handleCompleteAll}>
            ✔
          </button>
          <input
            type="text"
            className="todo-input"
            placeholder="해야 할 일을 입력해주세요. Enter"
            value={newTodo}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li
              className={`todo-item ${todo.isCompleted ? "checked" : ""}`}
              key={todo.id}
            >
              <div
                className="checkbox"
                onClick={() => handleCheckTodo(todo.id)}
              >
                {todo.isCompleted ? "✔" : ""}
              </div>
              <div className="todo">{todo.content}</div>
              <button
                className="delBtn"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <div className="todo-bottom">
          <div className="left-items">남은 할 일 {getLeftItemsCount()}</div>
          <div className="button-group">
            <button
              className={`show-all-btn ${
                currentShowType === "all" ? "selected" : ""
              }`}
              onClick={() => handleShowTodosType("all")}
            >
              전체 할 일
            </button>
            <button
              className={`show-active-btn ${
                currentShowType === "active" ? "selected" : ""
              }`}
              onClick={() => handleShowTodosType("active")}
            >
              남은 할 일
            </button>
            <button
              className={`show-completed-btn ${
                currentShowType === "completed" ? "selected" : ""
              }`}
              onClick={() => handleShowTodosType("completed")}
            >
              완료 된 할 일
            </button>
          </div>
          <button
            className="clear-completed-btn"
            onClick={handleClearCompletedTodos}
          >
            완료 된 할 일 삭제
          </button>
        </div>
      </main>
      <footer className="info">더블클릭 시 수정 가능!</footer>
    </section>
  );
}

export default App;
