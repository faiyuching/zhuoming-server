import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Tag } from '../../../models/forum/tag';

const router = express.Router();

router.delete(
  '/tag/:tag_id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { tag_id } = req.params;

    const tag = await Tag.findOne({ where: { tag_id: tag_id } });

    if (!tag) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Tag.destroy({ where: { tag_id: tag_id } });

    res.status(204).send(tag);
  }
);

export { router as tagDeleteRouter };
