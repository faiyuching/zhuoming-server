import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Task } from '../../models/task';
import { User } from '../../models/user';
import { Responses } from '../../models/responses';
import { Group } from '../../models/group';
import { Job } from '../../models/job';

const router = express.Router();

router.get('/tasks',
    // requireAuth,
    async (req: Request, res: Response) => {
        console.log(req.query)
        const tasks = await Task.findAll({
            // where: { response_id: req.query.response_id },
            order: [['task_id', 'DESC']],
            include: [User, Responses, Group, Job],
        });
        res.send(tasks);

    });

export { router as taskIndexRouter };
