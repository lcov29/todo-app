const localStorageKeyName = 'taskList';


function readTaskListFromLocalStorage() {
   return JSON.parse(localStorage.getItem(localStorageKeyName));
}


function saveTaskListToLocalStorage() {
   localStorage.setItem(localStorageKeyName, JSON.stringify(taskList));
}


function calculateNextUnassignedTaskIdFromList() {
   const assignedIdList = taskList.map((task) => task.id);
   assignedIdList.sort((id1, id2) => id2 - id1);
   const maximumAssignedId = assignedIdList[0] ?? 0;
   return maximumAssignedId + 1;
}


function createTaskObject(submitEvent) {
   const priority = submitEvent.srcElement[0].value;
   const title  = submitEvent.srcElement[1].value;
   const description = submitEvent.srcElement[2].value;
   return {
      id: nextUnassignedTaskId++,
      title,
      description,
      priority,
      done: false
   };
}


function generateFrontendTaskDeleteButton(task, taskFrontendContainer) {
   const element = document.createElement('button');
   element.setAttribute('type', 'button');
   element.textContent = 'X';
   
   element.addEventListener('click', () => {
      taskList = taskList.filter((element) => {
         console.log(`id1: ${element.id}, id2: ${task.id} => ${element.id !== task.id}`);
         return element.id !== task.id
      });
      saveTaskListToLocalStorage();
      taskFrontendContainer.remove();
   })

   return element;
}


function generateFrontendTaskDescription(task) {
   const element = document.createElement('details');
   element.textContent = task.description;

   const summary = document.createElement('summary');
   summary.textContent = task.title;
   element.appendChild(summary);
   return element;
}


function generateFrontendTaskCheckbox(task) {
   const element = document.createElement('input');

   const handleChangeEvent = (e) => {
      const internalTask = taskList.filter((element) => element.id === task.id)[0];
      internalTask.done = e.target.checked;
   }

   element.addEventListener('change', handleChangeEvent);
   element.setAttribute('type', 'checkbox');

   if (task.done) {
      element.setAttribute('checked', '');
   }

   return element;
}


function generateFrontendTaskContainer() {
   const element = document.createElement('section');
   element.classList.add('task');
   return element;
}


function clearFrontendTaskListContainer() {
   const container = document.getElementById('task-list-container');
   container.remove();
}


function generateFrontendTaskListContainer() {
   const taskContainer = document.createElement('section');
   taskContainer.setAttribute('id', 'task-list-container');
   
   const insertionNode = document.querySelector('main > div');
   const taskAddButton = document.getElementById('task-add-button');
   insertionNode.insertBefore(taskContainer, taskAddButton);
   return taskContainer;
}


function addNewTask(submitEvent) {
   taskList.push(createTaskObject(submitEvent));
   saveTaskListToLocalStorage();
   displayFrontendTaskList();
}


function generateFrontendTask(task) {
   const taskContainer = generateFrontendTaskContainer();
   taskContainer.appendChild(generateFrontendTaskCheckbox(task));
   taskContainer.appendChild(generateFrontendTaskDescription(task));
   taskContainer.appendChild(generateFrontendTaskDeleteButton(task, taskContainer));
   return taskContainer;
}


function addClickHandlerToAddTaskButton() {
   const addTaskButton = document.getElementById('task-add-button');
   const addTaskDialog = document.querySelector('dialog');
   addTaskButton.addEventListener('click', () => addTaskDialog.showModal());
}


function addSubmitHandlerToDialogSaveButton() {
   const addTaskDialog = document.getElementById('dialog-input');
   addTaskDialog.addEventListener('submit', (e) => {
      addNewTask(e);
      addTaskDialog.reset();
   });
}


function displayFrontendTaskList() {
   clearFrontendTaskListContainer();
   const taskListContainer = generateFrontendTaskListContainer();
   taskList.forEach((task) => taskListContainer.appendChild(generateFrontendTask(task)));
}


let taskList = readTaskListFromLocalStorage() ?? [];
let nextUnassignedTaskId = calculateNextUnassignedTaskIdFromList();
addClickHandlerToAddTaskButton();
addSubmitHandlerToDialogSaveButton();
displayFrontendTaskList();
