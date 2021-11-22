import { observable, action, toJS, makeObservable } from "mobx";
import { Todo, List, TodoStore } from "./types";

class TodoListStore {
  constructor() {
    makeObservable(this);
  }

  @observable todoStore: TodoStore = {
    selectedListId: -1,
    todoLists: [
      {
        id: Math.floor(Math.random() * 10000000),
        title: "My Day",
        hideCompleted: false,
        todos: [],
      },
    ],
  };

  @action
  initStore = (store: TodoStore) => {
    this.todoStore = store;
  };

  @action
  selectList = (id: number) => {
    this.todoStore.selectedListId = id;
  };

  @action
  addList = (listTitle: string) => {
    const newList: List = {
      id: Math.floor(Math.random() * 10000000),
      title: listTitle,
      hideCompleted: false,
      todos: [],
    };
    this.todoStore.todoLists.push(newList);
  };

  @action
  deleteList = (id: number) => {
    const newTodoLists = toJS(
      this.todoStore.todoLists.filter((item) => item.id !== id)
    );
    this.todoStore.todoLists = newTodoLists;
  };

  @action
  addTodo = (listId: number, taskTitle: string) => {
    const listIndex = toJS(this.todoStore.todoLists).findIndex(
      (item) => item.id === listId
    );
    if (listIndex !== -1) {
      const newTodo: Todo = {
        id: Math.floor(Math.random() * 10000000),
        title: taskTitle,
        isCompleted: false,
      };
      this.todoStore.todoLists[listIndex].todos.push(newTodo);
    }
  };

  @action
  deleteTodo = (listId: number, taskId: number) => {
    const listIndex = toJS(this.todoStore.todoLists).findIndex(
      (item) => item.id === listId
    );
    if (listIndex !== -1) {
      let todos = this.todoStore.todoLists[listIndex].todos;
      const newTodos = todos.filter((item) => item.id !== taskId);
      this.todoStore.todoLists[listIndex].todos = newTodos;
    }
  };

  @action
  toggleComplete = (listId: number, taskId: number) => {
    let todoLists = toJS(this.todoStore.todoLists);
    const listIndex = todoLists.findIndex((item) => item.id === listId);
    if (listIndex !== -1) {
      const taskIndex = todoLists[listIndex].todos.findIndex(
        (item) => item.id === taskId
      );
      if (taskIndex !== -1) {
        const isCompleted = todoLists[listIndex].todos[taskIndex].isCompleted;
        this.todoStore.todoLists[listIndex].todos[taskIndex].isCompleted =
          !isCompleted;
      }
    }
  };

  @action
  hideCompletedTodo = (isHide: boolean) => {
    let { selectedListId, todoLists } = toJS(this.todoStore);
    const listIndex = todoLists.findIndex((item) => item.id === selectedListId);
    if (listIndex !== -1) {
      this.todoStore.todoLists[listIndex].hideCompleted = isHide;
    }
  };

  @action
  moveTodo = (todo: Todo, targetListId: number) => {
    let { selectedListId, todoLists } = toJS(this.todoStore);
    const targetListIndex = todoLists.findIndex(
      (item) => item.id === targetListId
    );
    if (targetListIndex !== -1) {
      this.todoStore.todoLists[targetListIndex].todos.push(todo);
      const selectedListIndex = todoLists.findIndex(
        (item) => item.id === selectedListId
      );
      if (selectedListIndex !== -1) {
        const todoIndex =
          this.todoStore.todoLists[selectedListIndex].todos.indexOf(todo);
        if (todoIndex !== -1) {
          this.todoStore.todoLists[selectedListIndex].todos.splice(
            todoIndex,
            1
          );
        }
      }
    }
  };
}

const store = new TodoListStore();
export default store;
