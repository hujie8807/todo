export interface TodoStore {
  selectedListId: number;
  todoLists: List[];
}

export interface List {
  id: number;
  title: string;
  todos: Todo[];
  hideCompleted: boolean;
}

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface Option {
  id: string;
  value: string;
}
