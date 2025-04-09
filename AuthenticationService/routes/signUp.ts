import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { addUser, findUserByEmail } from "../models/user";
import { RequestValidationError } from "../errors/requestValidationError";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 50 })
      .withMessage("Password must be longer than 8 characters")
      .matches(/\d/)
      .withMessage("Must contain at least one digit")
      .matches(/[A-Z]/)
      .withMessage("Must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Must contain at least one lowercase letter")
      .matches(/[!@#$%^&*]/)
      .withMessage("Must contain at least one special character"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new RequestValidationError(errors.array()));
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
