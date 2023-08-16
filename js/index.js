import { TaskList } from "./TaskList.js";


const taskList = new TaskList();


function collapseDialogDetailElement() {
   const dialogDetailElement = document.querySelector('#add-task-dialog-form > details');
   dialogDetailElement.removeAttribute('open');
}


// Add Event Listeners

const addTaskButton = document.getElementById('add-task-button');
const addTaskDialog = document.getElementById('add-task-dialog');
const addTaskDialogForm = document.getElementById('add-task-dialog-form');
const clearTaskListButton = document.getElementById('clear-task-list-button');
const clearTaskListDialog = document.getElementById('clear-task-list-dialog');
const clearTaskListYesButton = document.getElementById('clear-task-list-yes-button');
const clearTaskListNoButton = document.getElementById('clear-task-list-no-button');


addTaskButton.addEventListener('click', () => addTaskDialog.showModal());
addTaskDialog.addEventListener('cancel', (e) => { 
   addTaskDialogForm.reset();
   collapseDialogDetailElement();
});

addTaskDialogForm.addEventListener('submit', (e) => {
   const priority = e.target[0].value;
   const title  = e.target[1].value;
   const description = e.target[2].value;
   taskList.addNewTask(title, description, priority);
   addTaskDialogForm.reset();
   collapseDialogDetailElement();
});

clearTaskListButton.addEventListener('click', () => { 
   if (taskList.hasTask) { 
      clearTaskListDialog.showModal();
   }
});

clearTaskListYesButton.addEventListener('click', () => {
   taskList.clear();
   clearTaskListDialog.close();
});

clearTaskListNoButton.addEventListener('click', () => clearTaskListDialog.close());
