import express from "express";
import { json } from "body-parser";

export const app = express();

app.use(json());

app.listen(3001, () => {
  console.log("listening on port 3001");
});
