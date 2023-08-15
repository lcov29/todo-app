import { Task } from "./Task.js";


class LocalTaskStorage {


   #localStorageKeyName = 'taskList';


   load() {
      let taskList = localStorage.getItem(this.#localStorageKeyName) ?? '[]';
      taskList = JSON.parse(taskList);
      return taskList.map(task => new Task(task));
   }


   save(taskList) {
      let jsonList = taskList.map(task => task.json);
      jsonList = JSON.stringify(jsonList);
      localStorage.setItem(this.#localStorageKeyName, jsonList);
   }


}


export { LocalTaskStorage };
