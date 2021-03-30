import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Job } from '../../models/job';
import { User } from '../../models/user';
import { Responses } from '../../models/responses';
import { Group } from '../../models/group';

const router = express.Router();

router.get('/jobs',
    // requireAuth,
    async (req: Request, res: Response) => {

        const jobs = await Job.findAll({ include: [User, Responses, Group] });
        res.send(jobs);

    });

export { router as jobIndexRouter };
