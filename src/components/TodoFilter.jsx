export default function TodoFilter({
  getLeftItemsCount,
  handleShowTodosType,
  handleClearCompletedTodos,
  currentShowType,
}) {
  return (
    <div className="todo-bottom">
      <div className="left-items">남은 할 일 {getLeftItemsCount}</div>
      <div className="button-group">
        <button
          className={currentShowType === "all" ? "selected" : ""}
          onClick={() => handleShowTodosType("all")}
        >
          전체 할 일
        </button>
        <button
          className={currentShowType === "active" ? "selected" : ""}
          onClick={() => handleShowTodosType("active")}
        >
          남은 할 일
        </button>
        <button
          className={currentShowType === "completed" ? "selected" : ""}
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
}
