import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError
} from '@sgtickets/common';
import { Responses } from '../../../models/response/responses';
import { User } from '../../../models/user';

const router = express.Router();

router.get('/response/:response_id',
  // requireAuth,
  async (req: Request, res: Response) => {

    const { response_id } = req.params;

    let response;

    if (response_id === "current") {
      response = await Responses.findOne({ where: { end_time: null } });
    } else {
      response = await Responses.findOne(
        {
          where: { response_id: response_id },
          include: [User],
        });
    }

    if (!response) {
      throw new NotFoundError();
    }

    // if (response.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    res.send(response);
  });

export { router as responseShowRouter };
