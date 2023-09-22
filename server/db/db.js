import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;
dotenv.config();

const { types } = pg;

// Parser number 1700 is the for floating point types. Here we’re overriding it to use the vanilla JavaScript parseFloat() function
types.setTypeParser(1700, (x) => parseFloat(x));

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

export default pool;
