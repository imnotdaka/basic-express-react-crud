import { useEffect, useState } from "react";

const STORAGE_KEY = "tasks";

export function addTask(title: string, description: string) {
  const tasks = getTasks();

  const newTask: TaskItem = {
    id: crypto.randomUUID(),
    title,
    description,
  };

  tasks.push(newTask);
  saveTasks(tasks);
}

export function updateTask(id: string, title: string, description: string) {
  const tasks = getTasks();

  const taskItem = tasks.find((e) => e.id == id);
  if (taskItem == null) return;
  taskItem.title = title;
  taskItem.description = description;

  saveTasks(tasks);
}

export function getTasks(): TaskItem[] {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getTodos()

    console.log(todos)
  }, [])

  const getTodos = () => {
    fetch("http://localhost:3000")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err))
  }

  const t = localStorage.getItem(STORAGE_KEY);
  if (t == null) {
    return [];
  }

  try {
    return JSON.parse(t);
  } catch (error) {
    return [];
  }
}

function saveTasks(tasks: TaskItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function deleteTask(itemid: string) {
  const tasks = getTasks();

  const newTaskList = tasks.filter((task) => task.id != itemid);
  saveTasks(newTaskList);
}
