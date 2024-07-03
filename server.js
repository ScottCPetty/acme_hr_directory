const express = require("express");
const app = express();
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_hr_directory"
);
const port = process.env.PORT || 3000;

async function init() {
  await client.connect();
  const SQL = ``;
  await client.query(SQL);
  console.log("tables created");
  SQL = ``;
  await client.query(SQL);
  console.log("tables seeded");
  app.listen(port, () => console.log(`listening on port ${port}`));
}
init();
