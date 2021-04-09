import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Notice } from '../../models/notice';
import { User } from '../../models/user';
import { Task } from '../../models/response/task';

const router = express.Router();

router.get('/notices',
    // requireAuth,
    async (req: Request, res: Response) => {


        const { user_id } = req.query

        const notices = await Notice.findAll({
            include: [User, Task],
            order: [['created_at', 'DESC']],
            where: { user_id: user_id },
        });

        res.send(notices);

    });

export { router as noticeIndexRouter };
