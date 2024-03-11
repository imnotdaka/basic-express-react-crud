import { useNavigate } from "react-router-dom";
import { getTasks } from "./task";
import { FaEdit } from "react-icons/fa";
import { GiBombingRun } from "react-icons/gi";
import "./index.css";
import Loading from "./Loading";
import { CreateTaskButton } from "./createTaskButton";
import { useQuery } from "@tanstack/react-query";

export function TaskList() {

  const navigate = useNavigate();

  const { isLoading, data, isError, error} = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks
  })

  if (!isLoading && !isError) {
    return (
      <div>
        {data!.length == 0 ? (
          <div>
            <p>It's empty u mongoloid</p>
            <CreateTaskButton />
          </div>
        ) : (
          <div>
            <CreateTaskButton />
            <ul>
              {data!.map((item) => (
                <div key={item._id} className="border-gray-300">
                  <li>
                    <h3>{item.title}</h3>
                  </li>
                  <li>{item.description}</li>
                  <button onClick={() => navigate(`./update/${item._id}`)}>
                    <FaEdit />
                  </button>
                  <button
                    style={{ backgroundColor: "#ee0000" }}
                    onClick={() => navigate(`./delete/${item._id}`)}
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
  } else if (isError) 
  {
    console.error(error)
  }
  else return (
    <div>
      <p>Loading...</p>
      <Loading />
    </div>
  )
} 