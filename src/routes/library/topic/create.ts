import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError,
    NotFoundError
} from '@sgtickets/common';
import { Topic } from '../../../models/library/topic';
import { Category } from '../../../models/library/category';
const router = express.Router();

router.post(
    '/topic',
    // requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {

        const { user_id, topic_name, picture_url, description, categoryValue } = req.body;

        const category = await Category.findOne({ where: { category_name: categoryValue } });
        const existingTopic = await Topic.findOne({ where: { topic_name: topic_name } });

        if (!category) {
            throw new NotFoundError();
        }

        if (existingTopic) {
            throw new BadRequestError('Topic name in use');
        }

        const topic = await Topic.create({
            user_id,
            topic_name,
            picture_url,
            description,
            category_id: category.category_id,
        });

        res.status(201).send(topic);
    }
);

export { router as topicCreateRouter };