import React, { Component } from "react";
import "./index.css";
import { observer } from "mobx-react";
import TodoList from "./list";
import Todos from "./todos";
import store from "./store";

@observer
class MyTodoList extends Component {
  componentDidMount() {
    let todoStore = localStorage.getItem("todoStore");
    if (todoStore) {
      store.initStore(JSON.parse(todoStore));
    }
  }
  componentWillUnmount() {
    localStorage.setItem("todoStore", JSON.stringify(store.todoStore));
  }
  render() {
    return (
      <div className="todo-panel">
        <div className="todo-list">
          <TodoList />
        </div>
        <div className="todo-todos">
          <Todos />
        </div>
      </div>
    );
  }
}

export default MyTodoList;
