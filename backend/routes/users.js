import express from "express";
import connection from "../db.js";
const router = express.Router();

router.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    res.send(rows);
  });
})

router.put('/users', (req, res) => {
  console.log(req.body);
  res.send("OK");
})

export default router;