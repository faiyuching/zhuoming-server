import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Topic } from '../../../models/library/topic';

const router = express.Router();

router.delete(
  '/topic/:topic_id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { topic_id } = req.params;

    const topic = await Topic.findOne({ where: { topic_id: topic_id } });

    if (!topic) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Topic.destroy({ where: { topic_id: topic_id } });

    res.status(204).send(topic);
  }
);

export { router as topicDeleteRouter };
