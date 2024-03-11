const Task = require("../models/task.model");

async function getTask(req, res) {
  const t = await Task.findById(req.params.id)
  res.json(t)
}

exports.getTask = getTask;
