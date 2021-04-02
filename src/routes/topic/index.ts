import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Topic } from '../../models/library/topic';
import { User } from '../../models/user';
import { Responses } from '../../models/response/responses';

const router = express.Router();

router.get('/topics',
    // requireAuth,
    async (req: Request, res: Response) => {

        const topics = await Topic.findAll();
        res.send(topics);

    });

export { router as topicIndexRouter };
