import React, { Component } from "react";
import { observer } from "mobx-react";
import { List, Todo } from "./types";
import store from "./store";
import "./index.css";
import TodoHelper from "./todoHelper";

@observer
class Todos extends Component {
  getTitle(todoList?: List) {
    if (todoList) {
      return <h2>{todoList.title}</h2>;
    }
  }
  getTodos(status: boolean, todoList?: List) {
    const todos: Todo[] = todoList ? todoList.todos : [];
    const options = TodoHelper.getListMenu();
    return todos.map((todo: Todo, index: number) => {
      if (status === todo.isCompleted) {
        return (
          <div key={todo.title + index} className="todo-todos-row">
            <div className="todo-todos-isCompleted">
              <input
                type="checkbox"
                defaultChecked={todo.isCompleted}
                onChange={() => {
                  store.toggleComplete(todoList!.id, todo.id);
                }}
              ></input>
            </div>
            <div className="todo-todos-title">
              <span>{todo.title}</span>
            </div>
            {options.length > 1 && (
              <div className="todo-todos-list-menu">
                <span>Move to: </span>
                <select
                  onChange={(e) => {
                    store.moveTodo(todo, Number(e.target.value));
                  }}
                >
                  {options.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.value}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            <div className="todo-todos-button">
              <button
                onClick={() => {
                  store.deleteTodo(todoList!.id, todo.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  }

  getInprogressTodos(todoList?: List) {
    return (
      <div>
        <h4>Working in progress</h4>
        {this.getTodos(false, todoList)}
      </div>
    );
  }

  getCompletedTodos(todoList?: List) {
    if (todoList!.hideCompleted) {
      return null;
    }
    return (
      <div>
        <h4>Completed</h4>
        {this.getTodos(true, todoList)}
      </div>
    );
  }

  DisplayControl(todoList?: List) {
    const hideCompleted = todoList!.hideCompleted;
    return (
      <div>
        <button
          onClick={() => {
            store.hideCompletedTodo(!hideCompleted);
          }}
        >
          {hideCompleted ? "Display All" : "Hide Completed"}
        </button>
      </div>
    );
  }

  addTodo(e: any) {
    if (e.keyCode === 13) {
      store.addTodo(store.todoStore.selectedListId, e.target.value);
      TodoHelper.clearInput("addTodo");
    }
  }

  addNewTodo() {
    return (
      <div>
        <input
          type="text"
          id="addTodo"
          className="todo-todos-input"
          placeholder="Input title and press Enter to add a new task"
          onKeyDown={(e) => {
            this.addTodo(e);
          }}
        ></input>
      </div>
    );
  }

  render() {
    const { selectedListId, todoLists } = store.todoStore;
    const todoList = todoLists.find((item) => item.id === selectedListId);
    if (!todoList) {
      return null;
    }
    return (
      <div className="todo-todos-panel">
        <div className="todo-todos-content">
          {this.getTitle(todoList)}
          {this.DisplayControl(todoList)}
          {this.getInprogressTodos(todoList)}
          {this.getCompletedTodos(todoList)}
        </div>
        <div className="todo-todos-bottom">{this.addNewTodo()}</div>
      </div>
    );
  }
}

export default Todos;
