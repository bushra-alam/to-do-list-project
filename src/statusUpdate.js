

export function updateTaskStatus(tasks, index, completed) {
  const task = tasks.find((task) => task.index === index);
  if (task) {
    task.completed = completed;
  }
}

// clearCompleted task
export function clearCompletedTasks(tasks) {
  const updatedTasks = tasks.filter((task) => !task.completed);
  updatedTasks.forEach((task, i) => {
    task.index = i + 1;
  });

  // add local storage
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  return updatedTasks;
}
