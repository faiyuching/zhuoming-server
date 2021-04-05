import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Like } from '../../../models/forum/like';

const router = express.Router();

router.put(
  '/like/:post_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const like = await Like.findOne({ where: { post_id: req.params.post_id } });

    if (!like) {
      throw new NotFoundError();
    }

    // if (like.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (like.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    like.set({
      like_name: req.body.like_name,
    });
    await like.save();

    res.send(like);
  }
);

export { router as likeUpdateRouter };
