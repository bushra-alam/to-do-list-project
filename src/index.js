import _ from 'lodash';
import './style.css';

import "./style.css";

// Task list
let tasks = [
  { description: "Morning Walk", completed: false, index: 1 },
  { description: "Practice Coding", completed: false, index: 2 },
];

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const clearCompletedButton = document.getElementById("clear-completed");
  const refreshButton = document.querySelector(".ri-refresh-line");

  // Render tasks
  function renderTasks() {
    todoList.innerHTML = "";
    tasks.sort((a, b) => a.index - b.index);
    tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("todo-item");
      listItem.draggable = true;
      listItem.setAttribute("data-index", index);

      // Drag Events
      listItem.addEventListener("dragstart", (e) => {
        draggedItemIndex = index;
        e.target.classList.add("dragging");
      });

      listItem.addEventListener("dragover", (e) => e.preventDefault());

      listItem.addEventListener("drop", () => {
        if (draggedItemIndex !== null && draggedItemIndex !== index) {
          reorderTasks(draggedItemIndex, index);
        }
      });

      listItem.addEventListener("dragend", () => {
        listItem.classList.remove("dragging");
        draggedItemIndex = null;
      });

      // Checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;

      // Task description
      const taskText = document.createElement("span");
      taskText.classList.add("task-text");
      taskText.textContent = task.description;
      updateTaskUI(taskText, task.completed);

      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        updateTaskUI(taskText, task.completed);
      });

      
      const options = document.createElement("span");
      options.classList.add("options");

      // Three-dot menu icon
      const menuIcon = document.createElement("i");
      menuIcon.classList.add("ri-more-2-fill");
      menuIcon.addEventListener("click", () => {
        menuIcon.style.display = "none";
        deleteIcon.style.display = "inline";
      });

      // Delete icon
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("ri-delete-bin-line", "delete-icon");
      deleteIcon.style.display = "none";
      deleteIcon.addEventListener("click", () => deleteTask(index));

      options.appendChild(menuIcon);
      options.appendChild(deleteIcon);

      listItem.appendChild(checkbox);
      listItem.appendChild(taskText);
      listItem.appendChild(options);
      todoList.appendChild(listItem);
    });
  }

  // Reorder tasks
  let draggedItemIndex = null;

  function reorderTasks(fromIndex, toIndex) {
    const movedTask = tasks.splice(fromIndex, 1)[0];
    tasks.splice(toIndex, 0, movedTask);
    tasks.forEach((task, i) => (task.index = i + 1));
    renderTasks();
  }

  // Update task UI
  function updateTaskUI(taskText, isCompleted) {
    taskText.style.textDecoration = isCompleted ? "line-through" : "none";
  }

  // Add a new task
  function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;
    tasks.push({
      description: taskText,
      completed: false,
      index: tasks.length + 1,
    });
    todoInput.value = "";
    renderTasks();
  }

  // Delete a task
  function deleteTask(index) {
    tasks.splice(index, 1);
    tasks.forEach((task, i) => (task.index = i + 1));
    renderTasks();
  }

  // Remove completed tasks
  function clearCompleted() {
    tasks = tasks.filter((task) => !task.completed);
    renderTasks();
  }

  // Refresh tasks with animation
  function refreshTasks() {
    const refreshIcon = document.querySelector(".ri-refresh-line");
    refreshIcon.classList.add("rotate");
    setTimeout(() => location.reload(), 400);
  }

  // Event Listeners
  if (todoInput) {
    todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTask();
    });
  }

  if (clearCompletedButton) {
    clearCompletedButton.addEventListener("click", clearCompleted);
  }

  if (refreshButton) {
    refreshButton.addEventListener("click", refreshTasks);
  }

  // Initial render
  renderTasks();
});
