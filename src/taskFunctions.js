// Add a new task
export function addTask(tasks, description) {
  const newTask = {
    description: description.trim(),
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
}

// Delete a task by index
export function deleteTask(tasks, index) {
  const updatedTasks = tasks.filter(task => task.index !== index);
  updatedTasks.forEach((task, i) => {
    task.index = i + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  return updatedTasks;
}

// Edit task description
export function editTask(tasks, index, newDescription) {
  const task = tasks.find(task => task.index === index);
  if (task) {
    task.description = newDescription.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  return tasks;
}
