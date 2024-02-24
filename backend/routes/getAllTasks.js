const { getDataBase } = require("../sqlite-db");

async function getAllTasks(req, res) {
  const db = await getDataBase();

  const tasks = await new Promise((resolve, reject) => {
    db.all("SELECT * FROM tasks", (err, row) => {
      if (err) {
        reject("Error querying data:, err");
        return;
      }
      resolve(row);
    });
  });

  res.json(tasks);
}

exports.getAllTasks = getAllTasks;
