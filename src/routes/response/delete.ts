import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Responses } from '../../models/responses';

const router = express.Router();

router.delete(
  '/response/:id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await Responses.findOne({ where: { id: id } });

    if (!response) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Responses.destroy({ where: { id: id } });

    res.status(204).send(response);
  }
);

export { router as responseDeleteRouter };
