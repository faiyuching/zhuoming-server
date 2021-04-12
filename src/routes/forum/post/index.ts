import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Post } from '../../../models/forum/post';
import { User } from '../../../models/user';
import { Responses } from '../../../models/response/responses';
import { Op } from "sequelize"

const router = express.Router();

router.get('/forum/post',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { tag, search } = req.query

        let posts


        if (tag) {
            posts = await Post.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
                where: { tag: tag },
            });
        } else if (search) {
            const content = {
                [Op.like]: '%' + search + '%'
            }
            posts = await Post.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
                where: { content: content },
            });
        } else {
            posts = await Post.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
            });
        }

        res.send(posts);

    });

export { router as postsIndexRouter };
