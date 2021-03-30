import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Task } from '../../models/task';

const router = express.Router();

router.put(
  '/task/:id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const task = await Task.findOne({ where: { id: req.params.id } });

    if (!task) {
      throw new NotFoundError();
    }

    // if (task.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (task.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    task.set({
      task_name: req.body.task_name,
      description: req.body.description,
    });
    await task.save();

    res.send(task);
  }
);

export { router as taskUpdateRouter };
