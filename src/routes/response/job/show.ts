import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Job } from '../../../models/response/job';

const router = express.Router();

router.get('/job/:job_id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { job_id } = req.params;
        const job = await Job.findOne({ where: { job_id: job_id } });

        if (!job) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(job);
    });

export { router as jobShowRouter };
