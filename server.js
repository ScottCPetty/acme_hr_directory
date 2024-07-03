const express = require("express");
const app = express();
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_hr_directory"
);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(require("morgan")("dev"));

async function init() {
  await client.connect();
  const SQL = `
    DROP TABLE IF EXISTS employees;
    DROP TABLE IF EXISTS departments;
    CREATE TABLE departments(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
    CREATE TABLE employees(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        department_id INTEGER REFERENCES departments(id) NOT NULL
    );
  `;
  await client.query(SQL);
  console.log("tables created");
  SQL = `
    INSERT INTO departments(name) VALUES(management);
    INSERT INTO departments(name) VALUES(reception);
    INSERT INTO departments(name) VALUES(sales);
    INSERT INTO employees(name, department_id) VALUES('Phillis Vance', SELECT id FROM departments WHERE name='sales');
    INSERT INTO employees(name, department_id) VALUES('Erin Hannon', SELECT id FROM departments WHERE name='reception');
    INSERT INTO employees(name, department_id) VALUES('Dwight Schrute', SELECT id FROM departments WHERE name='management');
  `;
  await client.query(SQL);
  console.log("tables seeded");
  app.listen(port, () => console.log(`listening on port ${port}`));
}
init();
