const { getDataBase } = require("../sqlite-db");

async function createNewTask(req, res) {
  const db = await getDataBase();
  await new Promise((resolve) => {
    db.serialize(() => {
      const stmt = db.prepare(
        "INSERT INTO tasks (id, title, description) VALUES (?, ?, ?)",
      );
      stmt.run(req.body.id, req.body.title, req.body.description);
      stmt.finalize(resolve);
    });
    res.json({
      CREATED: "succesfully created",
    });
  });
}

exports.createNewTask = createNewTask;
