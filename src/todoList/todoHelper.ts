import $ from "jquery";
import store from "./store";
import { Option } from "./types";

export default class TodoHelper {
  static clearInput(id: string) {
    $(`#${id}`).val("");
  }

  static getListMenu() {
    const { selectedListId, todoLists } = store.todoStore;
    let options: Option[] = [{ id: "", value: "" }];
    todoLists.forEach((item) => {
      if (item.id !== selectedListId) {
        options.push({ id: String(item.id), value: item.title });
      }
    });
    return options;
  }
}
