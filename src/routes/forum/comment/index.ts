import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Comment } from '../../../models/forum/comment';
import { User } from '../../../models/user';
import { Responses } from '../../../models/response/responses';

const router = express.Router();

router.get('/forum/:post_id/comment',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { post_id } = req.params

        const comment = await Comment.findAll({
            include: [User],
            order: [['created_at', 'DESC']],
            where: { post_id: post_id }
        });

        res.send(comment);

    });

export { router as commentIndexRouter };
