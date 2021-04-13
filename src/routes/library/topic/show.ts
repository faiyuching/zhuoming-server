import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Topic } from '../../../models/library/topic';
import { Category } from '../../../models/library/category';

const router = express.Router();

router.get('/topic/:topic_id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { topic_id } = req.params;
        const topic = await Topic.findOne(
            {
                where: { topic_id: topic_id },
                include: [Category],
            });

        if (!topic) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(topic);
    });

export { router as topicShowRouter };
