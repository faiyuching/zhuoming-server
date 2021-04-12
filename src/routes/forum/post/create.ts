import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Post } from '../../../models/forum/post';
import { Responses } from '../../../models/response/responses';
import { Moment } from '../../../models/moment';
const router = express.Router();

router.post(
    '/forum/post',
    // requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {

        let { user_id, content, tag } = req.body;

        if (tag === "") {
            tag = "unlabeled"
        }

        const post = await Post.create({ user_id, content, tag });

        const existingResponse = await Responses.findOne({ where: { response_name: tag } });
        if (existingResponse) {
            const moment = await Moment.create({
                user_id,
                response_id: existingResponse.response_id,
                type: "post",
                action: "create",
                post_id: post.post_id,
            });
        }

        res.status(201).send(post);
    }
);

export { router as postCreateRouter };