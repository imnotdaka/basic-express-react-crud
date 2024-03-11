import axios from "axios"

export async function addTask(title: string, description: string) {

  const newTask: TaskItem = {
    title,
    description,
  };
  if (newTask.title.length == 0) { newTask.title= "default title" }
  if (newTask.description.length == 0) { newTask.description= "default description" }

  await saveTasks(newTask);
}


export async function fetchApi(){
  const res = await axios.get("http://localhost:3000")
  return res.data

} 
  
export async function getTasks(): Promise<TaskItem[]> {
  return fetchApi()
}

export async function getSingleTask(_id: string) {
  const res = await axios.get("http://localhost:3000/" + _id)
  return res.data
}

async function saveTasks(task: TaskItem) {
  const res = await axios.post("http://localhost:3000/create", task)
  return res.data
}

export async function updateTask(_id: string, title: string, description: string) {
  const task: TaskItem = {
    _id,
    title,
    description
  }
  const res = await axios.put("http://localhost:3000/update/" + _id, task)
  return res.data
}

export async function deleteTask(_id: string){
  const res = await axios.delete("http://localhost:3000/delete/" + _id)
  return res.data
}
