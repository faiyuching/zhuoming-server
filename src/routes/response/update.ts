import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Responses } from '../../models/responses';

const router = express.Router();

router.put(
  '/response/:response_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const response = await Responses.findOne({ where: { response_id: req.params.response_id } });

    if (!response) {
      throw new NotFoundError();
    }

    // if (response.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (response.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    response.set({
      response_name: req.body.response_name,
      disaster_type: req.body.disaster_type,
      response_level: req.body.response_level,
      needs_time: req.body.needs_time,
      end_time: req.body.end_time,
      join_mode: req.body.join_mode,
      need_people: req.body.need_people,
      statement: req.body.statement
    });
    await response.save();

    res.send(response);
  }
);

export { router as responseUpdateRouter };
