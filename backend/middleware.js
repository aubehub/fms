const rutasProtegidas = express.Router();
import jwt from 'jsonwebtoken';
import express from "express";

rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
    const llave = "miclaveultrasecreta123";
 
    if (token) {
      jwt.verify(token, llave, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

 export default rutasProtegidas;