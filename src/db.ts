import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

// Open or create database file
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database - create table if it doesn't exist
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS issues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      modelName TEXT NOT NULL,
      imagePath TEXT NOT NULL,
      expectedBehavior TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Issues table ready');
    }
  });
}

// Export database instance
export default db;