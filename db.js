const Database = require("better-sqlite3");

const db = new Database("scans.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS scans (
    id TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    crawled_at INTEGER NOT NULL,
    violation_count INTEGER NOT NULL,
    result_file TEXT NOT NULL
  )
`);

module.exports = db;
