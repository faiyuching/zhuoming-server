import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Tag } from '../../../models/forum/tag';
const router = express.Router();

router.post(
    '/tag',
    // requireAuth,
    [
        body('tag_name')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('tag name must be between 2 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { user_id, tag_name } = req.body;

        const existingTag = await Tag.findOne({ where: { tag_name: tag_name } });

        if (existingTag) {
            throw new BadRequestError('Tag name in use');
        }

        const tag = await Tag.create({ user_id, tag_name });

        res.status(201).send(tag);
    }
);

export { router as tagCreateRouter };