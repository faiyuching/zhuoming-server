import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Job } from '../../models/response/job';

const router = express.Router();

router.delete(
  '/job/:job_id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { job_id } = req.params;

    const job = await Job.findOne({ where: { job_id: job_id } });

    if (!job) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Job.destroy({ where: { job_id: job_id } });

    res.status(204).send(job);
  }
);

export { router as jobDeleteRouter };
