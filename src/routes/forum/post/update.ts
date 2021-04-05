import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Post } from '../../../models/forum/post';

const router = express.Router();

router.put(
  '/post/:post_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const post = await Post.findOne({ where: { post_id: req.params.post_id } });

    if (!post) {
      throw new NotFoundError();
    }

    // if (post.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (post.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    post.set({
      post_name: req.body.post_name,
    });
    await post.save();

    res.send(post);
  }
);

export { router as postUpdateRouter };
