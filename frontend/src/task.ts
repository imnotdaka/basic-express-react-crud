export async function addTask(title: string, description: string) {
  const taskReady = []

  const newTask: TaskItem = {
    id: crypto.randomUUID(),
    title,
    description,
  };
  taskReady.push(newTask);
  saveTasks(taskReady);
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
  return fetchApi<TaskItem[]>('/')
}

async function saveTasks<T = unknown>(task: TaskItem[]) {
  console.log("Saving tasks", task)
  return await new Promise<T>((resolve, reject) => {

    fetch("http://localhost:3000/create", {
      headers:{
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(task)
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(reject)
  })
}

export async function deleteTask<T = unknown>(taskId: string){
  console.log("deleting tasks", taskId)
  return await new Promise<T>((resolve, reject) => {

    fetch(`http://localhost:3000/delete/` + taskId , {
      headers:{
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      body: JSON.stringify({id: taskId})
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(reject)
  })
}
