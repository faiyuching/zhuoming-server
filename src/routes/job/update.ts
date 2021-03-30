import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Job } from '../../models/job';

const router = express.Router();

router.put(
  '/job/:job_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const job = await Job.findOne({ where: { job_id: req.params.job_id } });

    if (!job) {
      throw new NotFoundError();
    }

    // if (job.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (job.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    job.set({
      job_name: req.body.job_name,
      description: req.body.description,
    });
    await job.save();

    res.send(job);
  }
);

export { router as jobUpdateRouter };
