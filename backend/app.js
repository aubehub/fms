import express from "express";
import cors from "cors";
import categories from "./routes/categories.js";
import users from "./routes/users.js";
import movies from "./routes/movies.js";
import bodyParser from 'body-parser';
import middleware from './middleware.js'

const app = express()
const port = 4000;

app.use(express.json())
app.use(cors());
app.use(middleware);
app.use(users);
app.use(categories);
app.use(movies);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})