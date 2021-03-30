import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Task } from '../../models/task';
import { User } from '../../models/user';
import { Responses } from '../../models/responses';
import { Group } from '../../models/group';
import { Job } from '../../models/job';

const router = express.Router();

router.get('/:resId/tasks',
    // requireAuth,
    async (req: Request, res: Response) => {

        const tasks = await Task.findAll({
            where: { response_id: req.params.resId },
            order: [['id', 'DESC']],
            include: [User, Responses, Group, Job],
        });
        res.send(tasks);

    });

export { router as taskIndexRouter };
