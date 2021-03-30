import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@sgtickets/common';
import { Password } from '../../services/password'
import { User } from '../../models/user';
import { config } from '../../config/config';
const router = express.Router();

router.post(
  '/user/signup',
  [
    // body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ where: { username: username } });

    if (existingUser) {
      throw new BadRequestError('username in use');
    }

    // const user = User.build({ email, password });
    // await user.save();

    const hashedPassword = await Password.toHash(password);
    const user = await User.create({ username, password: hashedPassword });

    // Generate JWT
    const userJwt = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
      },
      config.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };