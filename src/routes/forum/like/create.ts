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
    '/forum/:post_id/like',
    // requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {

        const { post_id } = req.params;
        const { user_id } = req.body;

        const existingLike = await Like.findOne({ where: { post_id: post_id, user_id: user_id } });

        if (existingLike) {
            await Like.destroy({ where: { post_id: post_id, user_id: user_id } });
            throw new BadRequestError('Already like');
        } else {
            await Like.create({ user_id, post_id });
        }

        res.status(201).send();
    }
);

export { router as likeCreateRouter };