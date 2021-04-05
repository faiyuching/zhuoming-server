import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Post } from '../../../models/forum/post';
const router = express.Router();

router.post(
    '/forum/post',
    // requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {

        const { user_id, post_content } = req.body;

        const post = await Post.create({ user_id, post_content });

        res.status(201).send(post);
    }
);

export { router as postCreateRouter };