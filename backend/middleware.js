//credencial/autorizacion para login

const rutasProtegidas = express.Router();
import jwt from 'jsonwebtoken';
import express from "express";

rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
    const llave = "miclaveultrasecreta123*";

    if (token) {
      jwt.verify(token, llave, (err, decoded) => {      
        if (err) {
          res.status(403);
          res.json({ mensaje: 'Token inválida' });
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      next();
    }
 });

 export default rutasProtegidas;