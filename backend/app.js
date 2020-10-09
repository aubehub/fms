import express from "express";
import cors from "cors";
import categories from "./routes/categories.js";
import users from "./routes/users.js";
import movies from "./routes/movies.js";

const app = express()
const port = 4000;


app.use(express.json())
app.use(cors());
app.use(users);
app.use(categories);
app.use(movies);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})