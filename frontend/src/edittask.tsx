import { getTasks } from "./task";
import { useParams } from "react-router-dom";

export function EditTask() {
  const { itemid } = useParams();
  console.log(itemid);
  const t = getTasks();
  const task = t.find((e) => e.id == itemid);
  console.log(task);
  return null;
}
