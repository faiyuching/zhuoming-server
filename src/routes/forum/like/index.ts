import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Like } from '../../../models/forum/like';
import { User } from '../../../models/user';
import { Responses } from '../../../models/response/responses';

const router = express.Router();

router.get('/forum/like/:post_id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { post_id } = req.params

        const like = await Like.findAll({
            include: [User],
            order: [['created_at', 'DESC']],
            where: { post_id: post_id }
        });

        res.send(like);

    });

export { router as likeIndexRouter };
