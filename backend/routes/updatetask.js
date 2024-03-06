const Task = require("../models/task.model")

async function updateTask(req, res) {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true})
  if (!task) return res.status(404).json({message: "Task not found"})
  res.json(task)
}

exports.updateTask = updateTask;
