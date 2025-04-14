
import _ from 'lodash';
import './style.css';
import { updateTaskStatus, clearCompletedTasks } from './statusUpdate.js';

let tasks = [
  { description: "Wash the dishes", completed: false, index: 1 },
  { description: "Complete To Do list project", completed: false, index: 2 }
];

// Function to populate the task list from the tasks array
function populateTaskList() {
  const taskList = document.getElementById("todo-list");
  taskList.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach(task => {
    const li = document.createElement("li"); 
    li.classList.add("todo-item");
    taskList.appendChild(li);

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      updateTaskStatus(tasks, task.index, checkbox.checked);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
    li.appendChild(checkbox);

    const taskText = document.createElement("span");
    taskText.textContent = task.description;
    taskText.classList.add("task-text");
    li.appendChild(taskText);

    const options = document.createElement("span");
    options.classList.add("options");
    li.appendChild(options);

    // menu icon
    const menuIcon = document.createElement("i");
    menuIcon.classList.add("ri-more-2-fill");
    options.appendChild(menuIcon);  
  });
}

// Function to add a new task 
function addTaskOnEnter() {
  const input = document.getElementById("todo-input");

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && input.value.trim() !== "") {
      const newTask = {
        description: input.value.trim(),
        completed: false,
        index: tasks.length + 1,
      };

      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      populateTaskList();
      input.value = "";
    }
  });
}


function setupClearCompleted() {
  const clearButton = document.getElementById("clear-completed");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      tasks = clearCompletedTasks(tasks);
      populateTaskList();
    });
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  populateTaskList();
  addTaskOnEnter();
  setupClearCompleted();
});
