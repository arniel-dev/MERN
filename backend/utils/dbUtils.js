import { pool } from "../config/db.js";

const createUserTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    fullname VARCHAR(255),
    password VARCHAR(255),
    role ENUM('user', 'admin', 'super-admin'),
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`table ${tableName} was successfully created.`);
  } catch (error) {
    console.log(`something went wrong ${error}`);
  }
};

const createAllTable = async () => {
  try {
    await createTable("users", createUserTableQuery);
    console.log(`all tables created successfully.`);
  } catch (error) {
    console.log(`something went wrong ${error}`);
  }
};

export default createAllTable;
