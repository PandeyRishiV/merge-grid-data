import express from "express";

const Rows = [
  { id: "row1", name: "Product A" },
  { id: "row2", name: "Product B" },
  { id: "row3", name: "Product C" },
];

const rowValues = [
  {
    id: "value1",
    values: {
      Jan: 100,
      Feb: 110,
      Mar: 120,
      Apr: 130,
      May: 140,
      Jun: 150,
      Jul: 160,
      Aug: 170,
      Sep: 180,
      Oct: 190,
      Nov: 200,
      Dec: 210,
    },
  },
  {
    id: "value2",
    values: {
      Jan: 50,
      Feb: 55,
      Mar: 60,
      Apr: 65,
      May: 70,
      Jun: 75,
      Jul: 80,
      Aug: 85,
      Sep: 90,
      Oct: 95,
      Nov: 100,
      Dec: 105,
    },
  },
  {
    id: "value3",
    values: {
      Jan: 20,
      Feb: 20,
      Mar: 30,
      Apr: 30,
      May: 40,
      Jun: 40,
      Jul: 50,
      Aug: 50,
      Sep: 60,
      Oct: 60,
      Nov: 70,
      Dec: 70,
    },
  },
];

const app = express();
const port: number = 3000;

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
