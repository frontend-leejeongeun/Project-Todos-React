import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  return (
    <section className="todo-wrapper">
      <Header className="todo-title" text={"todos react"} />
      <Main />
      <Footer className="info" text={"더블클릭 시 수정 가능!"} />
    </section>
  );
}

export default App;
