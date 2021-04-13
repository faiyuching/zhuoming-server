import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError,
    NotFoundError
} from '@sgtickets/common';
import { ResourceTopic } from '../../../models/library/resource-topic';
const router = express.Router();

router.post(
    '/resource/topic',
    // requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {

        const { user_id, topic_id, resource_id } = req.body;

        const resource_topic = await ResourceTopic.create({
            user_id,
            topic_id,
            resource_id
        });

        res.status(201).send(resource_topic);
    }
);

export { router as ResourceTopicCreateRouter };