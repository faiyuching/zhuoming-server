import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Task } from '../../models/response//task';
import { User } from '../../models/user';
import { Responses } from '../../models/response/responses';
import { Group } from '../../models/response/group';
import { Job } from '../../models/response/job';

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
