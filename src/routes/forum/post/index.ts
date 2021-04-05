import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Post } from '../../../models/forum/post';
import { Tag } from '../../../models/forum/tag';
import { User } from '../../../models/user';
import { Responses } from '../../../models/response/responses';

const router = express.Router();

router.get('/forum/post',
    // requireAuth,
    async (req: Request, res: Response) => {

        const posts = await Post.findAll({
            include: [User, Tag],
            order: [['created_at', 'DESC']],
        });

        res.send(posts);

    });

export { router as postsIndexRouter };
