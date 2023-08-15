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
   const maximumAssignedId = assignedIdList[0];
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


function generateFrontendTaskContainer() {
   const element = document.createElement('section');
   element.classList.add('task');
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


function generateFrontendTaskDescription(task) {
   const element = document.createElement('details');
   element.textContent = task.description;

   const summary = document.createElement('summary');
   summary.textContent = task.title;
   element.appendChild(summary);
   
   return element;
}


function generateFrontendTaskDeleteButton(task, taskFrontendContainer) {
   const element = document.createElement('button');
   element.setAttribute('type', 'button');
   element.textContent = 'X';
   
   element.addEventListener('click', () => {
      taskList = taskList.filter((element) => element.id !== task.id);
      saveTaskListToLocalStorage();
      taskFrontendContainer.remove();
   })

   return element;
}


function generateFrontendTaskElement() {
   const element = document.createElement('section');
   element.classList.add('task');
   return element;
}


function generateFrontendTask(task) {
   const taskContainer = generateFrontendTaskElement();

   const checkbox = generateFrontendTaskCheckbox(task);
   taskContainer.appendChild(checkbox);

   const description = generateFrontendTaskDescription(task);
   taskContainer.appendChild(description);

   const deleteButton = generateFrontendTaskDeleteButton(task, taskContainer);
   taskContainer.appendChild(deleteButton);

   return taskContainer;
}


function clearFrontendTaskList() {
   const taskContainer = document.getElementById('task-container');
   taskContainer.remove();
}


function generateFrontendTaskContainer() {
   const taskContainer = document.createElement('section');
   taskContainer.setAttribute('id', 'task-container');

   const taskListContainer = document.getElementById('task-list-container');
   const taskAddButton = document.getElementById('task-add-button');
   taskListContainer.insertBefore(taskContainer, taskAddButton);
   return taskContainer
}


function displayFrontendTaskList() {
   clearFrontendTaskList();
   const taskContainer = generateFrontendTaskContainer();

   taskList.forEach((task) => {
      const taskElement = generateFrontendTask(task);
      taskContainer.appendChild(taskElement);
   })
}


function addNewTask(submitEvent) {
   taskList.push(createTaskObject(submitEvent));
   saveTaskListToLocalStorage();
   displayFrontendTaskList();
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


let taskList = readTaskListFromLocalStorage() ?? [];
let nextUnassignedTaskId = calculateNextUnassignedTaskIdFromList();
addClickHandlerToAddTaskButton();
addSubmitHandlerToDialogSaveButton();
displayFrontendTaskList();
