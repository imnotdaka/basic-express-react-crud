import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask } from "./task";
import { useNavigate, useParams } from "react-router-dom";

export function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { itemid } = useParams();
  useEffect(() => {
    if (itemid == null) return;
    const t = getTasks();
    const taskItem = t.find((e) => e.id == itemid);
    if (taskItem == null) return;

    setTitle(taskItem.title);
    setDescription(taskItem.description);
  }, [itemid]);

  function addNewTask() {
    if (itemid == null) addTask(title, description);
    else updateTask(itemid, title, description);
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
