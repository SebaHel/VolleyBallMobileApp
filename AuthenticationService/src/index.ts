import express from "express";
import { json } from "body-parser";
import { signupRouter } from "../routes/signUp";
import { signInRouter } from "../routes/SignIn";
import { newGroupRouter } from "../routes/groups/newGroup";
import { requireAuth } from "../middlewares/requireAuth";
import { errorHandler } from "../middlewares/error-handler";
export const app = express();

app.use(json());

app.use(signupRouter);
app.use(signInRouter);
app.use(newGroupRouter);
app.use(errorHandler);

app.get("/", requireAuth, (req, res, next) => {
  if (!req.user) {
    return next(new Error("No Active User"));
  }
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3001, "0.0.0.0", () => {
  console.log("listening on port 3001");
});
