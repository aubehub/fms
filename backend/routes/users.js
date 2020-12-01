import express from "express";
import connection from "../db.js";
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

router.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    res.send(rows);
  });
})

router.post('/users', async(req, res) => {
  var sql = 'INSERT INTO users (email, username, password) VALUES ?'
  const password = await bcrypt.hash(req.body.password, "laksjdlaskjdlasdkj");
  var values = [
  [req.body.email, req.body.username, password]
  ]
  
  connection.query(sql, [values], (err) => {
    if (err) {
      console.log(err)
      res.send("duplicated");
    } else {
      res.send("ok")
    }
  });
})

router.post('/user_login', async (req, res) => {
  var llave = "miclaveultrasecreta123*";
  var email = req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    } else {
      if(results.length > 0){
        const comparision = await bcrypt.compare(password, results[0].password)
        if(comparision){
          const payload = {
            check:  true
           };
           const token = jwt.sign(payload, llave, {
            expiresIn: 1440
           });
           res.json({
            mensaje: 'Autenticación correcta',
            token: token
           });
        } else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":206,
          "success":"Email does not exits"
        });
      }
    }
  });
})

export default router;

