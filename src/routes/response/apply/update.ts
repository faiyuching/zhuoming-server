import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Apply } from '../../../models/response/apply';

const router = express.Router();

router.put(
  '/apply/:apply_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const apply = await Apply.findOne({ where: { apply_id: req.params.apply_id } });

    if (!apply) {
      throw new NotFoundError();
    }

    // if (apply.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (apply.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    apply.set({
      status: req.body.status,
    });
    await apply.save();

    res.send(apply);
  }
);

export { router as applyUpdateRouter };
