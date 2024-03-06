import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask } from "./task";
import { useNavigate, useParams } from "react-router-dom";

export function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { itemid } = useParams();

  useEffect(() => {
    const setTasks = async () => {
      // If task ITEMID == NULL quit function
      if (itemid == null) return;
      const t = await getTasks();
      const taskItem = t.find((e) => e._id == itemid);
      // If task ITEMID exists quit function
      if (taskItem == null) return;
      setTitle(taskItem.title);
      setDescription(taskItem.description);
    }

    setTasks()
  }, [itemid]);

  async function addNewTask() {
    // If task don't exist, run addTask function
    if (itemid == null) await addTask(title, description);
    // If task exists, run updateTask function
    else await updateTask(itemid, title, description);
    navigate("/");
  }
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div>
        <span>Task Title: </span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <span>Task description: </span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={addNewTask}>Save</button>
    </div>
  );
}
