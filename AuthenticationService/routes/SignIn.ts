import express, { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { findUserByEmail } from "../models/user";
import { Password } from "../auth/passwordManager";

const router = express.Router();

router.post(
  "/api/users/signIn",
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new Error());
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error("Not Provided Valid Credentials"));
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser === null) {
      return next(new Error("Bad Request Error"));
    } else {
      const user = {
        id: existingUser.id,
        email: existingUser.email,
      };

      const passwordMatch = await Password.comparePassword(
        password,
        existingUser.password
      );

      if (!passwordMatch) {
        return next(new Error("Bad Request Error"));
      } else {
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
  }
);

export { router as signInRouter };
