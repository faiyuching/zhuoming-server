import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Task } from '../../models/task';

const router = express.Router();

router.delete(
  '/task/:task_id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { task_id } = req.params;

    const task = await Task.findOne({ where: { task_id: task_id } });

    if (!task) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Task.destroy({ where: { task_id: task_id } });

    res.status(204).send(task);
  }
);

export { router as taskDeleteRouter };
