import { useNavigate } from "react-router-dom";
import { getTasks } from "./task";
import { FaEdit } from "react-icons/fa";
import { GiBombingRun } from "react-icons/gi";
import "./index.css";
import { useEffect, useState } from "react";

export function TaskList() {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskItem[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks()
        setTasks(fetchedTasks)
      } catch (error){
        console.error("Error fetching:", error)
      }
    }
    fetchTasks
  }, [])
  console.log("TaskList variable: ", tasks)


  return (
    <ul>
      {tasks.map((item) => (
        <div key={item.id} className="border-gray-300">
          <li>
            <h3>{item.title}</h3>
          </li>
          <li>{item.description}</li>
          <button onClick={() => navigate(`./edit/${item.id}`)}>
            <FaEdit />
          </button>
          <button
            style={{ backgroundColor: "#ee0000" }}
            onClick={() => navigate(`./delete/${item.id}`)}
          >
            <GiBombingRun />
          </button>
        </div>
      ))}
    </ul>
  );
}
