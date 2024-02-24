const { getDataBase } = require("../sqlite-db");

async function updateTask(req, res) {
  const db = await getDataBase();
  await new Promise((resolve) => {
    db.serialize(() => {
      const stmt = db.prepare(
        `UPDATE tasks
        SET title = ?, description = ?
        WHERE id = ?`,
      );
      stmt.run(req.body.title, req.body.description, req.body.id);
      stmt.finalize(resolve);
    });
    res.json({
      updated: "Succesfully updated",
    });
  });
}

exports.updateTask = updateTask;
