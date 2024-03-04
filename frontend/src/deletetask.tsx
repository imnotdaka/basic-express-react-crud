import { useParams, useNavigate } from "react-router-dom";
import { deleteTask } from "./task";

export function DeleteTask() {
  const navigate = useNavigate();
  const { itemid } = useParams();
  async function deleteT() {
    await deleteTask(itemid!);
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
