import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Job } from '../../models/job';
const router = express.Router();

router.post(
    '/job',
    // requireAuth,
    [
        body('job_name')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('job name must be between 2 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const {
            creator,
            response_id,
            group_id,
            job_name,
            description
        } = req.body;

        const existingJob = await Job.findOne({ where: { job_name: job_name } });

        if (existingJob) {
            throw new BadRequestError('Job name in use');
        }

        const job = await Job.create({
            creator,
            response_id,
            group_id,
            job_name,
            description
        });

        res.status(201).send(job);
    }
);

export { router as jobCreateRouter };