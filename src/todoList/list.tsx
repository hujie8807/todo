import React, { Component } from "react";
import { observer } from "mobx-react";
import { List } from "./types";
import store from "./store";
import "./index.css";
import TodoHelper from "./todoHelper";

@observer
class TodoList extends Component {
  componentDidUpdate() {
    localStorage.setItem("todoStore", JSON.stringify(store.todoStore));
  }

  getLists() {
    const todoLists = store.todoStore.todoLists;
    return todoLists.map((list: List, index: number) => {
      return (
        <li
          key={list.title + index}
          onClick={() => {
            store.selectList(list.id);
          }}
        >
          <span className="todo-list-title">{list.title}</span>
        </li>
      );
    });
  }

  addList(e: any) {
    if (e.keyCode === 13) {
      store.addList(e.target.value);
      TodoHelper.clearInput("addList");
    }
  }

  addNewList() {
    return (
      <div>
        <input
          type="text"
          id="addList"
          className="todo-list-input"
          placeholder="Input title and press Enter to add a new list"
          onKeyDown={(e) => {
            this.addList(e);
          }}
        ></input>
      </div>
    );
  }

  render() {
    return (
      <div className="todo-list-panel">
        <div className="todo-list-content">
          <ul>{this.getLists()}</ul>
        </div>
        <div className="todo-list-bottom">{this.addNewList()}</div>
      </div>
    );
  }
}

export default TodoList;
