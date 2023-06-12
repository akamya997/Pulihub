import "dotenv/config";
import express from "express";
import { route } from "./src/router";

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8081, () => {
  console.log("Start on http://127.0.0.1:8081.");
});

route(app);
