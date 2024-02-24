import { Routes, Route } from "react-router-dom";
import { CreateTask } from "./createtask";
import { TaskList } from "./tasklist";
import { DeleteTask } from "./deletetask";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<TaskList />} />
        <Route path="add" element={<CreateTask />} />
        <Route path="edit/:itemid" element={<CreateTask />} />
        <Route path="delete/:itemid" element={<DeleteTask />} />
      </Route>
    </Routes>
  );
}

export default App;
