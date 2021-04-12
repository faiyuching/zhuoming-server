import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { User } from '../../models/user';
import { Responses } from '../../models/response/responses';
import { Task } from '../../models/response/task';
import { Post } from '../../models/forum/post';
import { Moment } from '../../models/moment';

const router = express.Router();

router.get('/moments',
    // requireAuth,
    async (req: Request, res: Response) => {


        const { response_id } = req.query

        const moments = await Moment.findAll({
            include: [User, Task, Post],
            order: [['created_at', 'DESC']],
            where: { response_id: response_id },
        });

        res.send(moments);

    });

export { router as momentIndexRouter };
