import _ from 'lodash';
import './style.css';

let tasks = [
  { description: "Wash the dishes", completed: false, index: 1 },
  { description: "Complete To Do list project", completed: false, index: 2 }
];

// function to iterate over the tasks array and populate an HTML list item element 
function populateTaskList() {
  const taskList = document.getElementById("todo-list");

  taskList.innerHTML = '';

  // sort by index
  tasks.sort((a, b) => a.index - b.index);

  // add array elements into list
  tasks.forEach(task => {
    const li = document.createElement("li"); 
    li.classList.add("todo-item");
    taskList.appendChild(li);

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    li.appendChild(checkbox);

    // task description element
    const taskText = document.createElement("span");
    taskText.textContent = task.description;
    taskText.classList.add("task-text");
    li.appendChild(taskText);

    // options menu
    const options = document.createElement("span");
    options.classList.add("options");
    li.appendChild(options);

    // Three-dot menu icon
    const menuIcon = document.createElement("i");
    menuIcon.classList.add("ri-more-2-fill");
    options.appendChild(menuIcon);  
  });
}

document.addEventListener("DOMContentLoaded", populateTaskList);
