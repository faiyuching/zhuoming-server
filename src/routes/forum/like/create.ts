import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Like } from '../../../models/forum/like';
const router = express.Router();

router.post(
    '/like',
    // requireAuth,
    [
        body('like_name')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('like name must be between 2 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { user_id, like_name } = req.body;

        const existingLike = await Like.findOne({ where: { like_name: like_name } });

        if (existingLike) {
            throw new BadRequestError('Like name in use');
        }

        const like = await Like.create({ user_id, like_name });

        res.status(201).send(like);
    }
);

export { router as likeCreateRouter };