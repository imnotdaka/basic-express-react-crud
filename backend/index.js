const express = require("express");
var morgan = require('morgan');
const { getAllTasks } = require("./routes/getAllTasks");
const { createNewTask } = require("./routes/createnewtask");
const { deleteTask } = require("./routes/deletetask");
const { updateTask } = require("./routes/updatetask");
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

// ROUTES
app.get("/", getAllTasks);
app.post("/create", createNewTask);
app.delete("/delete/:id", deleteTask);
app.put("/update", updateTask);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
