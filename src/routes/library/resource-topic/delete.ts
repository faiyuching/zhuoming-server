import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { ResourceTopic } from '../../../models/library/resource-topic';

const router = express.Router();

router.delete(
  '/resource/topic',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { topic_id, resource_id } = req.body;

    const resource_topic = await ResourceTopic.findOne({ where: { topic_id: topic_id, resource_id: resource_id } });

    if (!resource_topic) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    // await ResourceTopic.destroy({ where: { resourceTopic_id: resourceTopic } });

    res.status(204).send(resource_topic);
  }
);

export { router as ResourceTopicDeleteRouter };
