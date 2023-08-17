# **TODO App**
<br>
<br>

## **About**
<br>

A simple TODO application written with HTML, CSS and vanilla JavaScript.

<br>

![Screenshot](screenshots/Screenshot%20from%202023-08-17%2001-55-34.png)

<br>
<br>

## **Features**

The application allows you to...
* add tasks with title, priority and optional description
* see all tasks ordered by their priority and completion status
* mark tasks as completed
* delete single task
* delete all tasks

<br>
<br>

## **Data Persistence**
<br>

The application stores its data in the local storage of your browser. Therefore your data should not get lost when you close your browser. 

>Please note that you might have activated browser settings that automatically clear the local storage when the browser or tab is closed.

<br>
<br>

## **Documentation**
<br>
<br>

```mermaid
classDiagram
    direction LR
    class TaskList {
        -taskList: Task[] 
        -localTaskStorage: LocalTaskStorage 
        -nextUnassignedTaskId: number
        -taskListHtmlContainer: HTMLElement 

        +addNewTask(title: string, description: string, priority: number)
        +deleteTask(id: number)
        +clear()
        -calculateNextUnassignedTaskId(): number
        -resetNextUnassignedTaskId()
        -updateHtmlTaskList()
        -sortTaskList()
        -getPendingTaskListSortedByDescendingPriority(): Task[]
        -getDoneTaskListSortedByDescendingPriority(): Task[]
        -clearHtmlTaskList()
    }
    class Task {
        -id: number
        -priority: number
        -title: string
        -description: string
        -done: boolean

        +generateHtml(saveFn: function, deleteFN: function): HTMLElement
        -generateHtmlContainer(): HTMLElement
        -generateHtmlCheckbox(saveFn: function): HTMLElement
        -generateHtmlTaskText(): HTMLElement
        -generateHtmlTaskDeleteButton(deleteFn: function): HTMLElement
    }
    class LocalTaskStorage {
        -localStorageKeyName: string

        +load(): Task[]
        +save(taskList: Task[])
    }
    TaskList --> Task
    TaskList --> LocalTaskStorage


```