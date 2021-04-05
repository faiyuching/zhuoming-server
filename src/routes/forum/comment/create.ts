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
    '/comment',
    // requireAuth,
    [
        body('comment_name')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('comment name must be between 2 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { user_id, comment_name } = req.body;

        const existingComment = await Comment.findOne({ where: { comment_name: comment_name } });

        if (existingComment) {
            throw new BadRequestError('Comment name in use');
        }

        const comment = await Comment.create({ user_id, comment_name });

        res.status(201).send(comment);
    }
);

export { router as commentCreateRouter };