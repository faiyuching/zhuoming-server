import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Topic } from '../../../models/library/topic';

const router = express.Router();

router.put(
  '/topic/:topic_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const topic = await Topic.findOne({ where: { topic_id: req.params.topic_id } });

    if (!topic) {
      throw new NotFoundError();
    }

    // if (topic.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (topic.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    topic.set({
      category_id: req.body.category_id,
      topic_name: req.body.topic_name,
    });
    await topic.save();

    res.send(topic);
  }
);

export { router as topicUpdateRouter };
