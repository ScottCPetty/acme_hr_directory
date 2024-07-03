const express = require("express");
const app = express()
const pg = require("pg");
const client = new pg.Client(process.env.DATABASE_URL || "postgres://localhost/acme_hr_directory")
