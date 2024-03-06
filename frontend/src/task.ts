export async function addTask(title: string, description: string) {


  const newTask: TaskItem = {
    title,
    description,
  };
  if (newTask.title.length == 0) { newTask.title= "default title" }
  if (newTask.description.length == 0) { newTask.description= "default description" }

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

export async function updateTask<T = unknown>(_id: string, title: string, description: string) {
  const task: TaskItem = {
    _id,
    title,
    description
  }
  return await new Promise<T>((resolve, reject) => {

    fetch("http://localhost:3000/update/" + _id, {
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

export async function deleteTask<T = unknown>(_id: string){
  return await new Promise<T>((resolve, reject) => {

    fetch(`http://localhost:3000/delete/` + _id , {
      headers:{
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      body: JSON.stringify({_id: _id})
    })
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(reject)
  })
}
