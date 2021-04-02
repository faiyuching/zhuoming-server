import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Apply } from '../../models/response/apply';

const router = express.Router();

router.delete(
  '/apply/:apply_id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { apply_id } = req.params;

    const apply = await Apply.findOne({ where: { apply_id: apply_id } });

    if (!apply) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Apply.destroy({ where: { apply_id: apply_id } });

    res.status(204).send(apply);
  }
);

export { router as applyDeleteRouter };
