import _ from 'lodash';
import './style.css';
import { updateTaskStatus, clearCompletedTasks } from './statusUpdate.js';
import { addTask, deleteTask, editTask } from './taskFunctions.js';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to populate the task list from the tasks array
function populateTaskList() {
  const taskList = document.getElementById('todo-list');
  taskList.innerHTML = '';

  // Sort tasks by index before displaying
  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    taskList.appendChild(li);

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      updateTaskStatus(tasks, task.index, checkbox.checked);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    li.appendChild(checkbox);

    // Task description
    const taskText = document.createElement('span');
    taskText.textContent = task.description;
    taskText.classList.add('task-text');
    li.appendChild(taskText);

    // Options menu
    const options = document.createElement('span');
    options.classList.add('options');
    li.appendChild(options);

    // Three-dot menu icon
    const menuIcon = document.createElement('i');
    menuIcon.classList.add('ri-more-2-fill');
    options.appendChild(menuIcon);

    // Delete icon (initially hidden)
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('ri-delete-bin-line', 'delete-icon');
    deleteIcon.style.display = 'none';
    options.appendChild(deleteIcon);

    // Show delete icon + enable editing when menu icon is clicked
    menuIcon.addEventListener('click', () => {
      deleteIcon.style.display = 'inline-block';
      menuIcon.style.display = 'none';

      // Create input for editing
      const input = document.createElement('input');
      input.type = 'text';
      input.value = task.description;
      input.classList.add('edit-input');

      li.replaceChild(input, taskText);
      input.focus();

      const saveEdit = () => {
        if (input.value.trim() !== '') {
          tasks = editTask(tasks, task.index, input.value);
          populateTaskList();
        }
      };

      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          saveEdit();
        }
      });

      input.addEventListener('blur', saveEdit);
    });

    // Delete task on delete icon click
    deleteIcon.addEventListener('click', () => {
      tasks = deleteTask(tasks, task.index);
      populateTaskList();
    });
  });
}

// Function to add a new task when Enter is pressed
function addTaskOnEnter() {
  const input = document.getElementById('todo-input');

  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && input.value.trim() !== '') {
      const newDescription = input.value.trim();
      tasks = addTask(tasks, newDescription);
      populateTaskList();
      input.value = '';
    }
  });
}

// Clear completed tasks
function setupClearCompleted() {
  const clearButton = document.getElementById('clear-completed');
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      tasks = clearCompletedTasks(tasks);
      populateTaskList();
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  populateTaskList();
  addTaskOnEnter();
  setupClearCompleted();
});
