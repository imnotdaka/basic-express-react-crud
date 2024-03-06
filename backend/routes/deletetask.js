const Task = require("../models/task.model")

async function deleteTask(req, res) {
  const task = await Task.findByIdAndDelete(req.params.id)
  if (!task) return res.status(404).json({message: "Task not found"})
  res.json(task)
}

exports.deleteTask = deleteTask;
