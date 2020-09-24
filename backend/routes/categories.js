import express from "express";
import connection from "../db.js";
const router = express.Router();

router.get('/categories', (req, res) => {
  connection.query('SELECT * FROM categories', (err, rows) => {
    res.send(rows);
  });
})

router.put("/categories", (req, res) => {
  connection.query(`INSERT INTO categories SET name = "${req.body.name}", userId = ${req.body.userId}`);
  res.send("OK");
})

export default router;