import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Apply } from '../../../models/response/apply';
import { User } from '../../../models/user';
import { Task } from '../../../models/response/task';
import { Group } from '../../../models/response/group';
import { Responses } from '../../../models/response/responses';
import { Job } from '../../../models/response/job';

const router = express.Router();

router.get('/applies',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { response_id, group_id, job_id, task_id, user_id, status } = req.query

        let applies

        if (response_id && !group_id && !job_id && !task_id && !user_id) {
            applies = await Apply.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
                where: { response_id: response_id },
            });
        } else if (!response_id && group_id && !job_id && !task_id && !user_id) {
            applies = await Apply.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
                where: { group_id: group_id },
            });
        } else if (!response_id && !group_id && job_id && !task_id && !user_id) {
            applies = await Apply.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
                where: { job_id: job_id },
            });
        } else if (!response_id && !group_id && !job_id && task_id && !user_id) {
            applies = await Apply.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
                where: { task_id: task_id },
            });
        } else if (!response_id && !group_id && !job_id && !task_id && user_id) {
            applies = await Apply.findAll({
                include: [Responses, Group, Job, Task],
                order: [['created_at', 'DESC']],
                where: { user_id: user_id, status: status },
            });
        }


        res.send(applies);

    });

export { router as applyIndexRouter };
