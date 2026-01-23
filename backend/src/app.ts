import cors from "cors";
import express from "express";

import db from "./db.js";
import type { Row } from "./Models/Row.js";

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

/** Fetch a specific row with its values
 * Returns 404 if not found
 * @param id - The ID of the row to fetch
 * @return {Row} The row object with its values
 */
app.get("/row/:id", (req, res) => {
  const { id } = req.params;

  const query = `SELECT
   r.id as row_id,
   r.name as row_name,
   rv."values" as values_json
   FROM rows r
   JOIN row_relations rr ON rr.row_id = r.id
   JOIN row_values rv ON rv.id = rr.value_id
   WHERE r.id = ?
   LIMIT 1`;

  const result: any = db.prepare(query).get(id);

  if (!result) {
    return res.status(404).json({ error: "Row not found" });
  }

  const values = JSON.parse(result.values_json);
  return res.json({ id: result.row_id, name: result.row_name, values });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
