import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Responses } from '../../models/response/responses';

const router = express.Router();

router.delete(
  '/response/:response_id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { response_id } = req.params;

    const response = await Responses.findOne({ where: { response_id: response_id } });

    if (!response) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Responses.destroy({ where: { response_id: response_id } });

    res.status(204).send(response);
  }
);

export { router as responseDeleteRouter };
