import { getTasks } from "./task";
import { useParams } from "react-router-dom";

export async function EditTask() {
  const { itemid } = useParams();
  console.log(itemid);
  const t = await getTasks();
  const task = t.find((e) => e.id == itemid);
  console.log(task);
  return null;
}
