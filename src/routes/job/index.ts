import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Job } from '../../models/response/job';
import { User } from '../../models/user';
import { Responses } from '../../models/response/responses';
import { Group } from '../../models/response/group';

const router = express.Router();

router.get('/jobs',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { response_id } = req.query

        const jobs = await Job.findAll({
            include: [User, Responses, Group],
            order: [['created_at', 'DESC']],
            where: { response_id: response_id }
        });

        res.send(jobs);

    });

export { router as jobIndexRouter };
