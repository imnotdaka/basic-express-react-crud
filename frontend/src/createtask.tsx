import { useEffect, useState } from "react";
import { addTask, updateTask, getSingleTask } from "./task";
import { useNavigate, useParams } from "react-router-dom";

export function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { itemid } = useParams();

  // useEffect for title and description to have the original data when updating
  useEffect(() => {
    const setTasks = async () => {
      // If task ITEMID == NULL quit function
      if (itemid == null) return;
      const t = await getSingleTask(itemid);
      setTitle(t.title);
      setDescription(t.description);
    }

    setTasks()
  }, [itemid]);

  async function addNewTask() {
    // If task don't exist, run addTask function
    if (itemid == null) {
      await addTask(title, description)
    }
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
