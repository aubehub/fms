import express from "express";
import connection from "../db.js";
const router = express.Router();

router.get('/categories', (req, res) => {
  connection.query('SELECT * FROM categories', (err, rows) => {
    res.send(rows);
  });
})

router.post('/categories', (req, res) => {
  if (!req.decoded || req.decoded.userId.toString() !== req.body.userId) { // esto significa que el token llego y fue validado
    res.send("You need to login");
  }

  var sql = 'INSERT INTO categories (name, userId) VALUES ?'
  var values = [
    [req.body.name, req.body.userId]
  ]

  connection.query(sql, [values]);
  res.send("ok")
})



export default router;

