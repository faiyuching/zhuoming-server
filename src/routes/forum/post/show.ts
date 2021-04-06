import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Post } from '../../../models/forum/post';
import { User } from '../../../models/user';
import { Like } from '../../../models/forum/like';
import { Comment } from '../../../models/forum/comment';

const router = express.Router();

router.get('/forum/post/:post_id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { post_id } = req.params;

        const post = await Post.findOne({
            where: { post_id: post_id },
            include: [User],
        });

        if (!post) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(post);
    });

export { router as postShowRouter };
