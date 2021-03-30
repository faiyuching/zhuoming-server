import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Group } from '../../models/group';

const router = express.Router();

router.delete(
  '/group/:group_id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { group_id } = req.params;

    const group = await Group.findOne({ where: { group_id: group_id } });

    if (!group) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Group.destroy({ where: { group_id: group_id } });

    res.status(204).send(group);
  }
);

export { router as groupDeleteRouter };
