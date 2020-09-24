import express from "express";
import connection from "../db.js";
const router = express.Router();

router.get('/movies', (req, res) => {
  connection.query('SELECT * FROM movies', (err, rows) => {
    res.send(rows);
  });
})

router.post('/movies', (req, res) => {
  connection.query(`INSERT INTO movies_users_categories SET id_user = "${req.body.id_user}", id_movie = ${req.body.id_movie}, id_category = ${req.body.id_category||"NULL"}`);

  connection.query(`INSERT INTO movies SET id = "${req.body.id}", title = "${req.body.title}", year = ${req.body.year}, synopsis = "${req.body.synopsis}"`);

  res.send("ok")
})


export default router;