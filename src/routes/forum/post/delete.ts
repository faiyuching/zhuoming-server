import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Post } from '../../../models/forum/post';

const router = express.Router();

router.delete(
  '/forum/post/:post_id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { post_id } = req.params;

    const post = await Post.findOne({ where: { post_id: post_id } });

    if (!post) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Post.destroy({ where: { post_id: post_id } });

    res.status(204).send(post);
  }
);

export { router as postDeleteRouter };
