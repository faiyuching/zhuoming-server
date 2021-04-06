import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Comment } from '../../../models/forum/comment';
const router = express.Router();

router.post(
    '/forum/comment/:post_id',
    // requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {

        const { post_id } = req.params;
        const { user_id, content } = req.body;

        const comment = await Comment.create({ content, post_id, user_id });

        res.status(201).send(comment);
    }
);

export { router as commentCreateRouter };