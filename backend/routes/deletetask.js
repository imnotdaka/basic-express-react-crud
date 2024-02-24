const { getDataBase } = require("../sqlite-db");

async function deleteTask(req, res) {
  const db = await getDataBase();
  await new Promise((resolve) => {
    db.serialize(() => {
      const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
      stmt.run(req.params.id);
      stmt.finalize(resolve);
    });
  });
  res.json({
    DELETED: "succesfully deleted",
  });
}

exports.deleteTask = deleteTask;
