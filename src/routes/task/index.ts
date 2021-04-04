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


        const { response_id, group_id, job_id } = req.query

        let tasks

        if (response_id && !group_id && !job_id) {
            tasks = await Task.findAll({
                include: [Group, Job],
                order: [['created_at', 'DESC']],
                where: { response_id: response_id },
            });
        } else if (!response_id && group_id && !job_id) {
            tasks = await Task.findAll({
                include: [Group, Job],
                order: [['created_at', 'DESC']],
                where: { group_id: group_id },
            });
        } else if (!response_id && !group_id && job_id) {
            tasks = await Task.findAll({
                include: [Group, Job],
                order: [['created_at', 'DESC']],
                where: { job_id: job_id },
            });
        }

        res.send(tasks);

    });

export { router as taskIndexRouter };
