import { Task } from "./Task.js";
import { LocalTaskStorage } from "./LocalTaskStorage.js";


class TaskList {


   #taskList = [];
   #localTaskStorage = new LocalTaskStorage();
   #nextUnassignedTaskId = -1;
   #taskListHtmlContainer = null;


   constructor() {
      this.#taskList = this.#localTaskStorage.load();
      this.#nextUnassignedTaskId = this.#calculateNextUnassignedTaskId();
      this.#taskListHtmlContainer = document.getElementById('task-list-container');
      this.#updateHtmlTaskList();
   }


   get hasTask() {
      return this.#taskList.length > 0;
   }


   addNewTask(title, description, priority) {
      const task = new Task({ id: this.#nextUnassignedTaskId++, title, description, priority, done: false });
      this.#taskList.push(task);
      this.#localTaskStorage.save(this.#taskList);
      this.#updateHtmlTaskList();
   }


   deleteTask(id) {
      this.#taskList = this.#taskList.filter((task) => task.id !== id);
      this.#localTaskStorage.save(this.#taskList);
      this.#updateHtmlTaskList();
   }


   clear() {
      this.#taskList = [];
      this.#localTaskStorage.save(this.#taskList);
      this.#clearHtmlTaskList();
      this.#nextUnassignedTaskId = 1;
   }


   #calculateNextUnassignedTaskId() {
      const assignedIdList = this.#taskList.map((task) => task.id);
      assignedIdList.sort((id1, id2) => id2 - id1);
      const maximumAssignedId = assignedIdList[0] ?? 0;
      return maximumAssignedId + 1;
   }


   #updateHtmlTaskList() {
      this.#clearHtmlTaskList();

      const saveFn = () => this.#localTaskStorage.save(this.#taskList);
      const deleteFn = (id) => this.deleteTask(id);
   
      for (const task of this.#taskList) {
         const taskHtmlElement = task.generateHtml(saveFn, deleteFn);
         this.#taskListHtmlContainer.appendChild(taskHtmlElement);
      }
   }


   #clearHtmlTaskList() {
      while (this.#taskListHtmlContainer.firstChild) {
         const child = this.#taskListHtmlContainer.firstChild;
         this.#taskListHtmlContainer.removeChild(child);
      }
   }


}


export { TaskList };