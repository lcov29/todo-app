import { TaskList } from "./TaskList.js";


const taskList = new TaskList();


// Add Event Listeners

const addTaskDialog = document.getElementById('add-task-dialog');
const addTaskDialogForm = document.getElementById('add-task-dialog-form');
const clearTaskListDialog = document.getElementById('clear-task-list-dialog');

document.getElementById('add-task-button').addEventListener('click', () => addTaskDialog.showModal());

addTaskDialog.addEventListener('cancel', (e) => {
   addTaskDialogForm.reset();
})

addTaskDialogForm.addEventListener('submit', (e) => {
   const priority = e.target[0].value;
   const title  = e.target[1].value;
   const description = e.target[2].value;
   taskList.addNewTask(title, description, priority);
   addTaskDialogForm.reset();
});


document.getElementById('clear-task-list-button').addEventListener('click', () => { 
   if (taskList.hasTask) { 
      clearTaskListDialog.showModal();
   }
});


document.getElementById('clear-task-list-yes-button').addEventListener('click', () => {
   taskList.clear();
   clearTaskListDialog.close();
});


document.getElementById('clear-task-list-no-button').addEventListener(
   'click',
   () => clearTaskListDialog.close()
);
