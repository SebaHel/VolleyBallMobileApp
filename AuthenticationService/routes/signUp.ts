import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { addUser, findUserByEmail } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new Error());
    }

    const { email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser !== null) {
      return next(new Error("Choose diffrent Email"));
    } else {
      const user = await addUser({ email, password });
      //Generate JWT
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        String(process.env.JWTKEY)
      );
      res.send({ token });
    }
  }
);

export { router as signupRouter };
