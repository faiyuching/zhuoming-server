import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Post } from '../../../models/forum/post';
import { User } from '../../../models/user';
import { Responses } from '../../../models/response/responses';

const router = express.Router();

router.get('/forum/post',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { tag } = req.query

        let posts

        if (tag) {
            posts = await Post.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
                where: { tag: tag },
            });
        } else {
            posts = await Post.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
            });
        }

        res.send(posts);

    });

export { router as postsIndexRouter };
