import _ from 'lodash';
import './style.css';
import { updateTaskStatus, clearCompletedTasks } from './statusUpdate.js';

let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { description: "Wash the dishes", completed: false, index: 1 },
  { description: "Complete To Do list project", completed: false, index: 2 },
];


// Function to populate the task list from the tasks array
function populateTaskList() {
  const taskList = document.getElementById("todo-list");
  taskList.innerHTML = '';

  // Sort tasks by index before displaying
  tasks.sort((a, b) => a.index - b.index);

  // Create HTML for each task
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    taskList.appendChild(li);

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      updateTaskStatus(tasks, task.index, checkbox.checked);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
    li.appendChild(checkbox);

    // Task description
    const taskText = document.createElement("span");
    taskText.textContent = task.description;
    taskText.classList.add("task-text");
    li.appendChild(taskText);

    // Options menu
    const options = document.createElement("span");
    options.classList.add("options");
    li.appendChild(options);

    // Three-dot menu icon
    const menuIcon = document.createElement("i");
    menuIcon.classList.add("ri-more-2-fill");
    options.appendChild(menuIcon);
  });
}

// Check if task already exists
function isDuplicateTask(description) {
  return tasks.some(
    task => task.description.trim().toLowerCase() === description.trim().toLowerCase()
  );
}

// Highlight an existing duplicate task in red
function highlightDuplicateTask(description) {
  const taskItems = document.querySelectorAll(".todo-item");

  taskItems.forEach(item => {
    const taskText = item.querySelector(".task-text");
    if (
      taskText.textContent.trim().toLowerCase() === description.trim().toLowerCase()
    ) {
      item.classList.add("duplicate-highlight");

      setTimeout(() => {
        item.classList.remove("duplicate-highlight");
      }, 1500);
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


// Function to add a new task when Enter is pressed
function addTaskOnEnter() {
  const input = document.getElementById("todo-input");

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && input.value.trim() !== "") {
      const newDescription = input.value.trim();

      if (isDuplicateTask(newDescription)) {
        highlightDuplicateTask(newDescription);
        input.value = "";
        return;
      }

      const newTask = {
        description: newDescription,
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

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  populateTaskList();
  addTaskOnEnter();
  setupClearCompleted();
});


