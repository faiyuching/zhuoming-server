import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Task } from '../../../models/response/task';
import { User } from '../../../models/user';
import { Responses } from '../../../models/response/responses';
import { Group } from '../../../models/response/group';
import { Job } from '../../../models/response/job';
import { Op } from 'sequelize';

const router = express.Router();

router.get('/tasks',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { response_id, group_id, job_id, end } = req.query

        let tasks

        let end_time

        if (end === "false") {
            end_time = null
        } else if (end === "true") {
            end_time = { [Op.ne]: null }
        }

        if (response_id && !group_id && !job_id) {
            tasks = await Task.findAll({
                include: [Group, Job],
                order: [['created_at', 'DESC']],
                where: { response_id: response_id, end_time: end_time },
            });
        } else if (!response_id && group_id && !job_id) {
            tasks = await Task.findAll({
                include: [Group, Job],
                order: [['created_at', 'DESC']],
                where: { group_id: group_id, end_time: end_time },
            });
        } else if (!response_id && !group_id && job_id) {
            tasks = await Task.findAll({
                include: [Group, Job],
                order: [['created_at', 'DESC']],
                where: { job_id: job_id, end_time: end_time },
            });
        }



        res.send(tasks);

    });

export { router as taskIndexRouter };
