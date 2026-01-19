import cors from "cors";
import express from "express";

import db from "./db.js";

const app = express();
const port: number = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.get("/rows", (req, res) => {
  const rows = db.prepare("SELECT * FROM rows").all();
  res.json(rows);
});

app.get("/values", (req, res) => {
  const values = db
    .prepare("SELECT * FROM row_values")
    .all()
    .map((row: any) => ({
      id: row.id,
      values: JSON.parse(row.values),
    }));
  res.json(values);
});

app.get("/row-relations", (req, res) => {
  const rowRelations = db.prepare("SELECT * FROM row_relations").all();
  res.json(rowRelations);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
