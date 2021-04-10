import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError } from '@sgtickets/common';
import { User } from '../../models/user';
const router = express.Router();

router.put(
  '/user/:user_id',
  validateRequest,
  async (req: Request, res: Response) => {

    const { key, value } = req.body;

    req.body[key] = value

    const user = await User.findOne({ where: { user_id: req.params.user_id } });

    if (!user) {
      throw new NotFoundError();
    }

    user.set(req.body);
    await user.save();

    res.status(201).send(user);
  }
);

export { router as userUpdateRouter };