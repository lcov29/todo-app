import { TaskList } from "./TaskList.js";


const taskList = new TaskList();

const addTaskButton = document.getElementById('task-add-button');
const addTaskDialog = document.getElementById('add-task-dialog');
const addTaskDialogForm = document.getElementById('task-dialog-form');
const clearTaskDialog = document.getElementById('clear-task-dialog');
const clearTaskListButton = document.getElementById('task-clear-button');
const yesButton = document.getElementById('clear-control-button-yes');
const noButton = document.getElementById('clear-control-button-no');


// Add Event Listeners

addTaskButton.addEventListener('click', () => addTaskDialog.showModal());


addTaskDialogForm.addEventListener('submit', (e) => {
   const priority = e.target[0].value;
   const title  = e.target[1].value;
   const description = e.target[2].value;
   taskList.addNewTask(title, description, priority);
   addTaskDialogForm.reset();
});


clearTaskListButton.addEventListener('click', () => {
   if (taskList.hasTask) {
      clearTaskDialog.showModal();
   }
});


yesButton.addEventListener('click', () => {
   taskList.clear();
   clearTaskDialog.close();
});


noButton.addEventListener('click', () => clearTaskDialog.close());
