import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Resource } from '../../../models/library/resource';

const router = express.Router();

router.delete(
  '/resource/:resource_id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { resource_id } = req.params;

    const resource = await Resource.findOne({ where: { resource_id: resource_id } });

    if (!resource) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Resource.destroy({ where: { resource_id: resource_id } });

    res.status(204).send(resource);
  }
);

export { router as resourceDeleteRouter };
