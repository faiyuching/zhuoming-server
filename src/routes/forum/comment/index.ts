import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Comment } from '../../../models/forum/comment';
import { User } from '../../../models/user';
import { Responses } from '../../../models/response/responses';

const router = express.Router();

router.get('/comment',
    // requireAuth,
    async (req: Request, res: Response) => {

        const comment = await Comment.findAll();
        res.send(comment);

    });

export { router as commentIndexRouter };
