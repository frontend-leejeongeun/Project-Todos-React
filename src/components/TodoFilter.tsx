import React from "react";

interface TodoFilterProps {
  leftItemsCount: number;
  handleShowTodosType: (showType: string) => void;
  handleClearCompletedTodos: () => void;
  currentShowType: string;
}

const TodoFilter: React.FC<TodoFilterProps> = ({
  leftItemsCount,
  handleShowTodosType,
  handleClearCompletedTodos,
  currentShowType,
}) => {
  return (
    <div className="todo-bottom">
      <span className="left-items">남은 할 일 {leftItemsCount}</span>
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
  );
};

export default TodoFilter;
