const Task = require("../models/task.model");


async function createNewTask(req, res) {
  const { title, description } = req.body

  const newTask = new Task({
    title,
    description,
  })
  const savedTask = await newTask.save()
  res.json(savedTask)
}

exports.createNewTask = createNewTask;
