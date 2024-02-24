import { useNavigate } from "react-router-dom";
import { getTasks } from "./task";
import { FaEdit } from "react-icons/fa";
import { GiBombingRun } from "react-icons/gi";
import "./index.css";

export function TaskList() {

  const navigate = useNavigate();
  const tasks = getTasks();

  if (tasks.length === 0) {
    return (
      <div>
        <h1>It's fucking empty, u moron</h1>
        <p>
          <a href="/add">Click here to create your first task</a>
        </p>
      </div>
    );
  }

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
