import express from "express";
import connection from "../db.js";
const router = express.Router();

router.get('/movies', (req, res) => {
  connection.query('SELECT * FROM movies', (err, rows) => {
    res.send(rows);
  });
})

router.post('/movies', (req, res) => {
  var sql = 'INSERT INTO movies_users_categories (id_user,id_movie, id_category) VALUES ?'
  var values = [
   [req.body.id_user, req.body.id_movie, req.body.id_category]
  ]
  
  connection.query(sql, [values]);

  connection.query('INSERT INTO movies (id, title, year, synopsis) VALUES ?', [[[req.body.id_movie, req.body.title, req.body.year, req.body.synopsis]]])

  res.send("ok")
})


export default router;
