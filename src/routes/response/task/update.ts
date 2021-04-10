import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Task } from '../../../models/response/task';
import { Moment } from '../../../models/moment';

const router = express.Router();

router.put(
  '/task/:task_id',
  // requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const task = await Task.findOne({ where: { task_id: req.params.task_id } });

    if (!task) {
      throw new NotFoundError();
    }

    if (req.body.end_time) {
      task.set({
        end_time: Date.now()
      });
      await Moment.create({
        type: "task",
        action: "end",
        task_id: task.task_id,
      });
    } else {
      task.set({
        task_name: req.body.task_name,
        description: req.body.description,
      });

      await Moment.create({
        type: "task",
        action: "update",
        task_id: task.task_id,
      });
    }

    await task.save();

    res.send({ task });
  }
);

export { router as taskUpdateRouter };
