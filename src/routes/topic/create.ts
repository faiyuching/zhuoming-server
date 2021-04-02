import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Topic } from '../../models/library/topic';
const router = express.Router();

router.post(
    '/topic',
    // requireAuth,
    [
        body('topic_name')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('topic name must be between 2 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { user_id, category_id, topic_name } = req.body;

        const existingTopic = await Topic.findOne({ where: { topic_name: topic_name } });

        if (existingTopic) {
            throw new BadRequestError('Topic name in use');
        }

        const topic = await Topic.create({ user_id, category_id, topic_name });

        res.status(201).send(topic);
    }
);

export { router as topicCreateRouter };