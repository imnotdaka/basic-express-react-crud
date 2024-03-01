import { useParams, useNavigate } from "react-router-dom";
import { deleteTask } from "./task";

export function DeleteTask() {
  const navigate = useNavigate();
  const { itemid } = useParams();
  function deleteT() {
    console.log(`itemid: ${itemid}`)
    deleteTask(itemid!);
    navigate("/");
  }

  return (
    <div>
      <p>Are you sure you want to delete the task?</p>
      <div>
        <button onClick={deleteT}>Confirm</button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
}
