import "./App.css";
import { Provider } from "mobx-react";
import store from "./todoList/store";
import MyTodoList from "./todoList";

function App() {
  return (
    <Provider {...store} className="App">
      <MyTodoList />
    </Provider>
  );
}

export default App;
