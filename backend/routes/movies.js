import express from "express";
import connection from "../db.js";
const router = express.Router();

router.get('/movies', (req, res) => {
  connection.query('SELECT * FROM movies', (err, rows) => {
    res.send(rows);
  });
})

router.post('/movies', (req, res) => {
  //post para crear una categoria. Considerar cambiar nombre a ruta
  var sql = 'INSERT INTO movies_users_categories (id_user, id_movie, id_category) VALUES ?'
  var values = [
  [req.body.id_user, req.body.id_movie, req.body.id_category]
  ]
  
  connection.query(sql, [values], (err) => {
    if (err) {
      // console.log("ya existe la categoría")
      res.send("duplicated");
    } else {
      res.send("ok")
    }
  });

  connection.query('SELECT * FROM movies WHERE id = ?', [req.body.id_movie], (err, rows) => {
    const nothingWasFound = rows.length === 0;
    if (nothingWasFound) {
      connection.query('INSERT INTO movies (id, title, year, synopsis) VALUES ?', [[[req.body.id_movie, req.body.title, req.body.year, req.body.synopsis]]])
    }
  });

})

router.get('/movies/:movieId/categories', (req, res) => {
  const movieId = req.params.movieId;
  connection.query(`SELECT categories.name, categories.id FROM movies_users_categories 
  LEFT JOIN categories ON categories.id = movies_users_categories.id_category 
  WHERE id_movie  = ?`, [ movieId ],  (err, rows) => {
    res.send(rows);
  });
});


export default router;
