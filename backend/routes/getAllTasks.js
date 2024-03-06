const Task = require("../models/task.model");

async function getAllTasks(req, res) {
  const tasks = await Task.find()
  res.json(tasks)
}

exports.getAllTasks = getAllTasks;
