import _ from 'lodash';
import './style.css';

let tasks = [
  { description: "Wash the dishes", completed: false, index: 1 },
  { description: "Complete To Do list project", completed: false, index: 2 }
];


function populateTaskList() {
  const taskList = document.getElementById("todo-list");

  if (!taskList) {
      console.error("Element with ID 'todo-list' not found!");
      return;
  }

 
  taskList.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);
  tasks.forEach(task => {
      const li = document.createElement("li"); 
      li.classList.add("todo-item");
      li.textContent = task.description; 
      taskList.appendChild(li); 
  });  
}


document.addEventListener("DOMContentLoaded", populateTaskList);
