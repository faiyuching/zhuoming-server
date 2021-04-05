import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Apply } from '../../../models/response/apply';
import { User } from '../../../models/user';
import { Task } from '../../../models/response/task';

const router = express.Router();

router.get('/applies',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { response_id, group_id, job_id, task_id } = req.query

        let applies

        if (response_id && !group_id && !job_id && !task_id) {
            applies = await Apply.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
                where: { response_id: response_id },
            });
        } else if (!response_id && group_id && !job_id && !task_id) {
            applies = await Apply.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
                where: { group_id: group_id },
            });
        } else if (!response_id && !group_id && job_id && !task_id) {
            applies = await Apply.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
                where: { job_id: job_id },
            });
        } else if (!response_id && !group_id && !job_id && task_id) {
            applies = await Apply.findAll({
                include: [User],
                order: [['created_at', 'DESC']],
                where: { task_id: task_id },
            });
        }


        res.send(applies);

    });

export { router as applyIndexRouter };
