export async function addTask(title: string, description: string) {

  const newTask: TaskItem = {
    id: crypto.randomUUID(),
    title,
    description,
  };

  await saveTasks(newTask);
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

async function saveTasks<T = unknown>(task: TaskItem) {
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

export async function updateTask<T = unknown>(id: string, title: string, description: string) {
  const task: TaskItem = {
    id,
    title,
    description
  }
  console.log("updating task", task)
  return await new Promise<T>((resolve, reject) => {

    fetch("http://localhost:3000/update", {
      headers:{
        'Content-Type': 'application/json'
      },
      method: "PUT",
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
