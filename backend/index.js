const express = require("express");
var morgan = require('morgan');
const { getAllTasks } = require("./routes/getAllTasks");
const { getTask } = require("./routes/getTask")
const { createNewTask } = require("./routes/createnewtask");
const { deleteTask } = require("./routes/deletetask");
const { updateTask } = require("./routes/updatetask");
const { initDatabase } = require("./db")
const cors = require("cors")
const app = express();
const port = 3000;

app.use(morgan('tiny'))
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
app.use(express());
initDatabase()
// ROUTES
app.get("/", getAllTasks);
app.get("/:id", getTask);
app.post("/create", createNewTask);
app.delete("/delete/:id", deleteTask);
app.put("/update/:id", updateTask);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
