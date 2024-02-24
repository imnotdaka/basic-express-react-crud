const express = require("express");
const { getAllTasks } = require("./routes/getAllTasks");
const { createNewTask } = require("./routes/createnewtask");
const { deleteTask } = require("./routes/deletetask");
const { updateTask } = require("./routes/updatetask");
const cors = require("cors")
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173/', // Cambia esto por tu dominio
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
}));
app.use(express());

app.get("/", getAllTasks);
app.post("/create", createNewTask);
app.delete("/delete/:id", deleteTask);
app.put("/update", updateTask);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
