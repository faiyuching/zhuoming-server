import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Job } from '../../models/job';

const router = express.Router();

router.delete(
  '/job/:id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const job = await Job.findOne({ where: { id: id } });

    if (!job) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Job.destroy({ where: { id: id } });

    res.status(204).send(job);
  }
);

export { router as jobDeleteRouter };
