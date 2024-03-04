const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

let dbInitialized = false;

async function initDataBase() {
  await new Promise((resolve) => {
    db.serialize(() => {
      // Create table if not exists to initialize DB with sqlite
      
      db.run("CREATE TABLE IF NOT EXISTS tasks(id INT, title TEXT, description TEXT)");
      const stmt = db.prepare(
        "INSERT INTO tasks (id, title, description) VALUES (?, ?, ?)",
      );
      stmt.finalize(resolve);
    });
  });
}

async function getDataBase() {
  // if the database is not yet initialized, do it now.
  if (!dbInitialized) {
    await initDataBase();
    dbInitialized = true;
  }

  return db;
}

module.exports = {
  getDataBase,
};
