import { useNavigate } from "react-router-dom";
import { getTasks } from "./task";
import { FaEdit } from "react-icons/fa";
import { GiBombingRun } from "react-icons/gi";
import "./index.css";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { CreateTaskButton } from "./createTaskButton";

export function TaskList() {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks()
        setTasks(fetchedTasks)
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching:", error)
      }
    }
    fetchTasks()
  }, [])

  if (!isLoading) {
    return (
      <div>
        {tasks.length == 0 ? (
          <div>
            <p>It's empty u mongoloid</p>
            <CreateTaskButton />
          </div>
        ) : (
          <div>
            <CreateTaskButton />
            <ul>
              {tasks.map((item) => (
                <div key={item.id} className="border-gray-300">
                  <li>
                    <h3>{item.title}</h3>
                  </li>
                  <li>{item.description}</li>
                  <button onClick={() => navigate(`./update/${item.id}`)}>
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
          </div>
        )}
      </div>
    );
  } else return (
    <div>
      <p>Loading...</p>
      <Loading />
    </div>
  )
} 