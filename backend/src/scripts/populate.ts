import db from '../db.js';

interface Row {
  id: string;
  name: string;
}

interface RowValue {
  id: string;
  values: { [key: string]: number };
}

const Rows: Row[] = [
  { id: "row1", name: "Product A" },
  { id: "row2", name: "Product B" },
  { id: "row3", name: "Product C" },
];

const rowValues: RowValue[] = [
  {
    id: "value1",
    values: {
      Jan: 100, Feb: 110, Mar: 120, Apr: 130, May: 140, Jun: 150,
      Jul: 160, Aug: 170, Sep: 180, Oct: 190, Nov: 200, Dec: 210,
    },
  },
  {
    id: "value2",
    values: {
      Jan: 50, Feb: 55, Mar: 60, Apr: 65, May: 70, Jun: 75,
      Jul: 80, Aug: 85, Sep: 90, Oct: 95, Nov: 100, Dec: 105,
    },
  },
  {
    id: "value3",
    values: {
      Jan: 20, Feb: 20, Mar: 30, Apr: 30, May: 40, Jun: 40,
      Jul: 50, Aug: 50, Sep: 60, Oct: 60, Nov: 70, Dec: 70,
    },
  },
];

const populate = () => {
    try {
        db.exec(`
            DROP TABLE IF EXISTS row_relations;
            DROP TABLE IF EXISTS row_values;
            DROP TABLE IF EXISTS rows;
            
            CREATE TABLE rows (
                id TEXT PRIMARY KEY,
                name TEXT
            );

            CREATE TABLE row_values (
                id TEXT PRIMARY KEY,
                "values" JSON
            );

            CREATE TABLE row_relations (
                row_id TEXT,
                value_id TEXT,
                FOREIGN KEY(row_id) REFERENCES rows(id),
                FOREIGN KEY(value_id) REFERENCES row_values(id)
            );
        `);

        const insertRow = db.prepare('INSERT INTO rows (id, name) VALUES (?, ?)');
        const insertRowValue = db.prepare('INSERT INTO row_values (id, "values") VALUES (?, ?)');
        const insertRowRelation = db.prepare('INSERT INTO row_relations (row_id, value_id) VALUES (?, ?)');

        const initRows = db.transaction((rows: Row[]) => {
            for (const row of rows) insertRow.run(row.id, row.name);
        });

        const initRowValues = db.transaction((values: RowValue[]) => {
            for (const val of values) insertRowValue.run(val.id, JSON.stringify(val.values));
        });

        const initRowRelations = db.transaction((rows: Row[], values: RowValue[]) => {
             for (let i = 0; i < rows.length; i++) {
                 const val = values[i];
                 if (val) {
                     insertRowRelation.run(rows[i].id, val.id);
                 }
             }
        });

        initRows(Rows);
        initRowValues(rowValues);
        initRowRelations(Rows, rowValues);

        console.log('Database populated successfully');
    } catch (error) {
        console.error('Error populating database:', error);
        process.exit(1);
    }
};

populate();
