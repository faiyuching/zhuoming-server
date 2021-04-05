import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Like } from '../../../models/forum/like';
import { User } from '../../../models/user';
import { Responses } from '../../../models/response/responses';

const router = express.Router();

router.get('/like',
    // requireAuth,
    async (req: Request, res: Response) => {

        const like = await Like.findAll();
        res.send(like);

    });

export { router as likeIndexRouter };
