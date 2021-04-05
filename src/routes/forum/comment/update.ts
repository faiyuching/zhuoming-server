import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Comment } from '../../../models/forum/comment';

const router = express.Router();

router.put(
  '/comment/:comment_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const comment = await Comment.findOne({ where: { comment_id: req.params.comment_id } });

    if (!comment) {
      throw new NotFoundError();
    }

    // if (comment.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (comment.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    comment.set({
      comment_name: req.body.comment_name,
    });
    await comment.save();

    res.send(comment);
  }
);

export { router as commentUpdateRouter };
