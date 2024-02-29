export async function addTask(title: string, description: string) {
  const tasks = await getTasks();

  const newTask: TaskItem = {
    id: crypto.randomUUID(),
    title,
    description,
  };
  tasks.push(newTask);
  console.log(saveTasks(tasks));
}

export async function updateTask(id: string, title: string, description: string) {
  const tasks = await getTasks();

  const taskItem = tasks.find((e) => e.id == id);
  if (taskItem == null) return;
  taskItem.title = title;
  taskItem.description = description;

  saveTasks(tasks);
}

export async function fetchApi<T = unknown>(path: string){
  return await new Promise<T>((resolve, reject) => {
    const url = new URL(path, 'http://localhost:3000');
    fetch(url.toString())
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(reject)
  })

} 
  
export async function getTasks(): Promise<TaskItem[]> {
  console.log("succesfully fetched")
  return fetchApi<TaskItem[]>('/')
}

async function saveTasks<T = unknown>(task: TaskItem[]) {
  return await new Promise<T>((resolve, reject) => {
    fetch("http://localhost:3000/create", {
      method: "POST",
      body: JSON.stringify(task)
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(reject)
  })
}

export async function deleteTask(itemid: string) {
  const tasks = await getTasks();

  const newTaskList = tasks.filter((task) => task.id != itemid);
  saveTasks(newTaskList);
}
